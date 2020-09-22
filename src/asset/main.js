// Load KeyboardEvent polyfill for old browsers
keyboardeventKeyPolyfill.polyfill();

var insectEnv = Insect.initialEnvironment;
var clearCommands = ["clear", "cls", "quit", "exit"];

function updateUrl(url) {
	history.replaceState(null, null, url);
}

function interpret(line) {
	// Skip empty lines or line comments
	var lineTrimmed = line.trim();
	if (lineTrimmed === "" || lineTrimmed[0] === "#") {
		return;
	}

	// Run insect
	var res = Insect.repl(Insect.fmtJqueryTerminal)(insectEnv)(line);
	insectEnv = res.newEnv;

	// Handle shell commands
	if (clearCommands.indexOf(res.msgType) >= 0) {
		updateUrl("");
	}

	if (res.msgType == "clear") {
		// Clear screen:
		this.clear();
		return "";
	} else if (res.msgType == "quit") {
		// Treat as reset:
		this.clear();
		insectEnv = Insect.initialEnvironment;
		return "";
	}

	if (res.msgType === "error") {
	}

	updateUrl("?q=" + encodeURIComponent(line));

	return res.msg;
}

function emph(str) {
	return "[[;;;hl-emphasized]" + str + "]";
}

function colored(col, str) {
	return "[[;#" + col + ";]" + str + "]";
}

var visitedBefore = localStorage.getItem("visitedBefore") === "yes";
var greeting = "";
if (!visitedBefore) {
	greeting = colored("75715E", "Welcome to insect. Type '?' if this is your first visit.");
	localStorage.setItem("visitedBefore", "yes");
} else {
	greeting = colored("75715E", "Welcome to insect. Enter '?' for help.");
}

$(document).ready(function () {
	var term = $('#terminal').terminal(interpret, {
		greetings: greeting,
		name: "terminal",
		height: 550,
		prompt: "[[;;;prompt]&#8811; ]>>> ",
		clear: false, // do not include 'clear' command
		exit: false, // do not include 'exit' command
		checkArity: false,
		historySize: 200,
		historyFilter: function (line) {
			return line.trim() !== '';
		},
		completion: function (inp, cb) {
			var identifiers = Insect.identifiers(insectEnv);

			var keywords =
				identifiers.concat(Insect.functions(insectEnv))
					.concat(Insect.supportedUnits)
					.concat(Insect.commands);

			cb(keywords.sort());
		},
		completionEscape: false,
		keymap: {
			"CTRL+L": function () {
				updateUrl("");
				term.clear();
			}
		}
	});

	if (location.search) {
		var queryParams = {};
		location.search.replace(/\?([^=&]+)=([^&]*)/g, function (match, paramName, paramValue) {
			queryParams[paramName] = paramValue;
		});
		if (queryParams.q) {
			var cmd = decodeURIComponent(queryParams.q.replace(/\+/g, " "));
			term.exec(cmd);
		}
	}
});