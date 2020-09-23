const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const url = require('url');

const connect = require('connect');
const serveIndex = require('serve-index');
const logger = require('morgan');
const WebSocket = require('faye-websocket');
const send = require('send');
const open = require('open');
const es = require("event-stream");
const chokidar = require('chokidar');
const colors = require('colors');

const INJECTED_CODE = fs.readFileSync(path.join(__dirname, "injected.html"), "utf8");

const LiveServer = {
    server: null,
    watcher: null,
    logLevel: 2
};

function escape(html) {
    return String(html)
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function staticServer(root) {
    let isFile = false;
    try {
        isFile = fs.statSync(root).isFile();
    } catch (e) {
        if (e.code !== "ENOENT") throw e;
    }
    return (req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const reqpath = isFile ? "" : url.parse(req.url).pathname;
        const hasNoOrigin = !req.headers.origin;
        const injectCandidates = [new RegExp("</body>", "i"), new RegExp("</svg>"), new RegExp("</head>", "i")];
        let injectTag = null;

        function directory() {
            const pathname = url.parse(req.originalUrl).pathname;
            res.statusCode = 301;
            res.setHeader('Location', `${pathname}/`);
            res.end(`Redirecting to ${escape(pathname)}/`);
        }

        function file(filepath /*, stat*/) {
            const x = path.extname(filepath).toLocaleLowerCase();
            let match;
            const possibleExtensions = ["", ".html", ".htm", ".xhtml", ".php", ".svg"];
            if (hasNoOrigin && (possibleExtensions.includes(x))) {
                // TODO: Sync file read here is not nice, but we need to determine if the html should be injected or not
                const contents = fs.readFileSync(filepath, "utf8");
                for (let i = 0; i < injectCandidates.length; ++i) {
                    match = injectCandidates[i].exec(contents);
                    if (match) {
                        injectTag = match[0];
                        break;
                    }
                }
                if (injectTag === null && LiveServer.logLevel >= 3) {
                    console.warn("Failed to inject refresh script!".yellow,
                        "Couldn't find any of the tags ", injectCandidates, "from", filepath);
                }
            }
        }

        function error(err) {
            if (err.status === 404) return next();
            next(err);
        }

        function inject(stream) {
            if (injectTag) {
                // We need to modify the length given to browser
                const len = INJECTED_CODE.length + res.getHeader('Content-Length');
                res.setHeader('Content-Length', len);
                const originalPipe = stream.pipe;
                stream.pipe = resp => {
                    originalPipe.call(stream, es.replace(new RegExp(injectTag, "i"), INJECTED_CODE + injectTag)).pipe(resp);
                };
            }
        }

        send(req, reqpath, { root })
            .on('error', error)
            .on('directory', directory)
            .on('file', file)
            .on('stream', inject)
            .pipe(res);
    };
}

function entryPoint(staticHandler, file) {
    if (!file) return (req, res, next) => { next(); };

    return (req, res, next) => {
        req.url = `/${file}`;
        staticHandler(req, res, next);
    };
}

LiveServer.start = (options = {}) => {
    const host = options.host || '0.0.0.0';
    const port = options.port !== undefined ? options.port : 8080; // 0 means random
    const root = options.root || process.cwd();
    const mount = options.mount || [];
    const watchPaths = options.watch || [root];
    LiveServer.logLevel = options.logLevel === undefined ? 2 : options.logLevel;
    let openPath = (options.open === undefined || options.open === true) ?
        "" : ((options.open === null || options.open === false) ? null : options.open);
    if (options.noBrowser) openPath = null; // Backwards compatibility with 0.7.0
    const file = options.file;
    const staticServerHandler = staticServer(root);
    const wait = options.wait === undefined ? 100 : options.wait;
    const browser = options.browser || null;
    const htpasswd = options.htpasswd || null;
    const cors = options.cors || false;
    const https = options.https || null;
    const proxy = options.proxy || [];
    const middleware = options.middleware || [];
    const noCssInject = options.noCssInject;
    let httpsModule = options.httpsModule;

    if (httpsModule) {
        try {
            require.resolve(httpsModule);
        } catch (e) {
            console.error((`HTTPS module "${httpsModule}" you've provided was not found.`).red);
            console.error("Did you do", `"npm install ${httpsModule}"?`);
            return;
        }
    } else {
        httpsModule = "https";
    }

    const app = connect();

    if (LiveServer.logLevel === 2) {
        app.use(logger('dev', {
            skip(req, { statusCode }) { return statusCode < 400; }
        }));
        // Level 2 or above logs all requests
    } else if (LiveServer.logLevel > 2) {
        app.use(logger('dev'));
    }
    if (options.spa) {
        middleware.push("spa");
    }
    middleware.map(mw => {
        if (typeof mw === "string") {
            const ext = path.extname(mw).toLocaleLowerCase();
            if (ext !== ".js") {
                mw = require(path.join(__dirname, "middleware", `${mw}.js`));
            } else {
                mw = require(mw);
            }
        }
        app.use(mw);
    });

    if (htpasswd !== null) {
        const auth = require('http-auth');
        const basic = auth.basic({
            realm: "Please authorize",
            file: htpasswd
        });
        app.use(auth.connect(basic));
    }
    if (cors) {
        app.use(require("cors")({
            origin: true,
            credentials: true
        }));
    }
    mount.forEach(mountRule => {
        const mountPath = path.resolve(process.cwd(), mountRule[1]);
        if (!options.watch) // Auto add mount paths to wathing but only if exclusive path option is not given
            watchPaths.push(mountPath);
        app.use(mountRule[0], staticServer(mountPath));
        if (LiveServer.logLevel >= 1)
            console.log('Mapping %s to "%s"', mountRule[0], mountPath);
    });
    proxy.forEach(proxyRule => {
        const proxyOpts = url.parse(proxyRule[1]);
        proxyOpts.via = true;
        proxyOpts.preserveHost = true;
        app.use(proxyRule[0], require('proxy-middleware')(proxyOpts));
        if (LiveServer.logLevel >= 1)
            console.log('Mapping %s to "%s"', proxyRule[0], proxyRule[1]);
    });
    app.use(staticServerHandler) // Custom static server
        .use(entryPoint(staticServerHandler, file))
        .use(serveIndex(root, { icons: true }));

    let server;
    let protocol;
    if (https !== null) {
        let httpsConfig = https;
        if (typeof https === "string") {
            httpsConfig = require(path.resolve(process.cwd(), https));
        }
        server = require(httpsModule).createServer(httpsConfig, app);
        protocol = "https";
    } else {
        server = http.createServer(app);
        protocol = "http";
    }

    server.addListener('error', e => {
        if (e.code === 'EADDRINUSE') {
            const serveURL = `${protocol}://${host}:${port}`;
            console.log('%s is already in use. Trying another port.'.yellow, serveURL);
            setTimeout(() => {
                server.listen(0, host);
            }, 1000);
        } else {
            console.error(e.toString().red);
            LiveServer.shutdown();
        }
    });

    server.addListener('listening', () => {
        LiveServer.server = server;

        const address = server.address();
        const serveHost = address.address === "0.0.0.0" ? "127.0.0.1" : address.address;
        const openHost = host === "0.0.0.0" ? "127.0.0.1" : host;

        const serveURL = `${protocol}://${serveHost}:${address.port}`;
        const openURL = `${protocol}://${openHost}:${address.port}`;

        let serveURLs = [serveURL];
        if (LiveServer.logLevel > 2 && address.address === "0.0.0.0") {
            const ifaces = os.networkInterfaces();
            serveURLs = Object.keys(ifaces)
                .map(iface => {
                    return ifaces[iface];
                })
                // flatten address data, use only IPv4
                .reduce((data, addresses) => {
                    addresses.filter(({ family }) => {
                        return family === "IPv4";
                    }).forEach(addr => {
                        data.push(addr);
                    });
                    return data;
                }, [])
                .map(addr => {
                    return `${protocol}://${addr.address}:${address.port}`;
                });
        }

        if (LiveServer.logLevel >= 1) {
            if (serveURL === openURL)
                if (serveURLs.length === 1) {
                    console.log(("Serving \"%s\" at %s").green, root, serveURLs[0]);
                } else {
                    console.log(("Serving \"%s\" at\n\t%s").green, root, serveURLs.join("\n\t"));
                }
            else
                console.log(("Serving \"%s\" at %s (%s)").green, root, openURL, serveURL);
        }

        if (openPath !== null)
            if (typeof openPath === "object") {
                openPath.forEach(p => {
                    open(openURL + p, { app: browser });
                });
            } else {
                open(openURL + openPath, { app: browser });
            }
    });

    server.listen(port, host);

    let clients = [];
    server.addListener('upgrade', (request, socket, head) => {
        const ws = new WebSocket(request, socket, head);
        ws.onopen = () => { ws.send('connected'); };

        if (wait > 0) {
            (() => {
                const wssend = ws.send;
                let waitTimeout;
                ws.send = function () {
                    const args = arguments;
                    if (waitTimeout) clearTimeout(waitTimeout);
                    waitTimeout = setTimeout(() => {
                        wssend.apply(ws, args);
                    }, wait);
                };
            })();
        }

        ws.onclose = () => {
            clients = clients.filter(x => {
                return x !== ws;
            });
        };

        clients.push(ws);
    });

    let ignored = [
        testPath => { // Always ignore dotfiles (important e.g. because editor hidden temp files)
            return testPath !== "." && /(^[.#]|(?:__|~)$)/.test(path.basename(testPath));
        }
    ];
    if (options.ignore) {
        ignored = ignored.concat(options.ignore);
    }
    if (options.ignorePattern) {
        ignored.push(options.ignorePattern);
    }
    // Setup file watcher
    LiveServer.watcher = chokidar.watch(watchPaths, {
        ignored,
        ignoreInitial: true
    });
    function handleChange(changePath) {
        const cssChange = path.extname(changePath) === ".css" && !noCssInject;
        if (LiveServer.logLevel >= 1) {
            if (cssChange)
                console.log("CSS change detected".magenta, changePath);
            else console.log("Change detected".cyan, changePath);
        }
        clients.forEach(ws => {
            if (ws)
                ws.send(cssChange ? 'refreshcss' : 'reload');
        });
    }
    LiveServer.watcher
        .on("change", handleChange)
        .on("add", handleChange)
        .on("unlink", handleChange)
        .on("addDir", handleChange)
        .on("unlinkDir", handleChange)
        .on("ready", () => {
            if (LiveServer.logLevel >= 1)
                console.log("Ready for changes".cyan);
        })
        .on("error", err => {
            console.log("ERROR:".red, err);
        });

    return server;
};

LiveServer.shutdown = () => {
    const watcher = LiveServer.watcher;
    if (watcher) {
        watcher.close();
    }
    const server = LiveServer.server;
    if (server)
        server.close();
};

module.exports = LiveServer;
