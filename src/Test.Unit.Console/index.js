let Effect = require("../Effect/index.js");
let Effect_Class = require("../Effect.Class/index.js");


let hasStderr;

try {
	hasStderr = !!process.stderr;
} catch (error) {
	hasStderr = false;
}

let hasColours = (() => {
	if (typeof process === "undefined") {
		return false;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === "win32" || "COLORTERM" in process.env) {
		return true;
	}

	if (process.env.TERM === "dumb") {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();


function consoleLog(s) {
	return () => {
		console.log(s);
	};
}

function consoleError(s) {
	return () => {
		console.error(s);
	};
}

function savePos() {
	process.stderr.write("\x1b[s");
}

function restorePos() {
	process.stderr.write("\x1b[u");
}

function eraseLine() {
	process.stderr.write("\x1b[K");
}

function print(s) {
	return () => {
		process.stderr.write("\x1b[33m" + s + "\x1b[0m");
	};
}

function printLabel(s) {
	return () => {
		process.stderr.write("\x1b[33;1m" + s + "\x1b[0m");
	};
}

function printFail(s) {
	return () => {
		process.stderr.write("\x1b[31;1m" + s + "\x1b[0m");
	};
}

function printPass(s) {
	return () => {
		process.stderr.write("\x1b[32m" + s + "\x1b[0m");
	};
}

function log(dictMonadEffect) {
	let $1 = Effect_Class.liftEffect(dictMonadEffect);
	return ($2) => {
		return $1(Effect.log($2));
	};
};

module.exports = {
	log: log,
	hasStderr: hasStderr,
	hasColours: hasColours,
	consoleLog: consoleLog,
	consoleError: consoleError,
	savePos: savePos,
	restorePos: restorePos,
	eraseLine: eraseLine,
	print: print,
	printLabel: printLabel,
	printFail: printFail,
	printPass: printPass
};
