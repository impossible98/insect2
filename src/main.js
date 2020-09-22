const os = require('os');
const path = require('path');
const readline = require('readline');

const fs = require('fs-extra');

const Insect = require('./Insect/index');


function createInterface(options) {
	fs.createFileSync(options['path']);

	let history = fs.readFileSync(options['path'], 'utf8').toString().split('\n').slice(0, -1).reverse().slice(0, options['maxLength']);

	readline.kHistorySize = Math.max(readline.kHistorySize, options['maxLength']);

	let rl = readline.createInterface(options);

	if (options.prompt) {
		rl.setPrompt(options.prompt);
	}

	let oldAddHistory = rl._addHistory;

	rl._addHistory = () => {
		let last = rl.history[0];
		let line = oldAddHistory.call(rl);

		if (line.length > 0 && line != last) {
			fs.appendFileSync(options['path'], line + '\n');
		}

		return line;
	}

	if (rl.history instanceof Array) {
		rl.history.push.apply(rl.history, history);
	}

	options['next'](rl);
}

let insectEnv = Insect.initialEnvironment;

function usage() {
	console.log('Usage: insect [EXPR]');
	process.exit(1);
}

function runInsect(fmt, line) {
	if (line.trim() === '' || line.trim()[0] === '#') {
		return undefined;
	}

	let res = Insect.repl(fmt)(insectEnv)(line);
	insectEnv = res.newEnv;

	return res;
}

if (process.argv.length >= 4) {
	usage();
} else if (process.argv.length == 3) {
	const arg = process.argv[2];

	if (arg === '-h' || arg === '--help') {
		usage();
	} else {
		let res = runInsect(Insect.fmtPlain, arg);

		if (res.msgType === 'value' || res.msgType === 'info') {
			console.log(res.msg);
		} else if (res.msgType === 'error') {
			console.error(res.msg);
		}

		process.exit(0);
	}
}

if (process.stdin.isTTY) {
	createInterface({
		input: process.stdin,
		output: process.stdout,
		path: path.join(os.homedir(), '.config', 'insect', 'insect_history.txt'),
		completer: (line) => {
			let keywords = Insect.identifiers(insectEnv)
				.concat(Insect.functions(insectEnv))
				.concat(Insect.supportedUnits)
				.concat(Insect.commands);

			if (line.trim() !== '') {
				let words = line.split(/\b/);
				line = words[words.length - 1];
				keywords = keywords.filter((i) => {
					return i.indexOf(line) === 0;
				});
			}

			return [keywords, line];
		},
		next: (rl) => {
			rl.setPrompt('\x1b[33m>>>\x1b[0m ');
			rl.prompt();
			rl.on('line', (line) => {
				const res = runInsect(Insect.fmtConsole, line);

				if (res) {
					if (res.msgType == 'quit') {
						process.exit(0);
					} else if (res.msgType == 'clear') {
						process.stdout.write('\x1Bc');
					} else {
						console.log(res.msg + '\n');
					}
				}

				rl.prompt();
			}).on('close', () => {
				process.exit(0);
			});
		}
	});
} else {
	const lineReader = require('line-reader');


	lineReader.eachLine(process.stdin, (line) => {
		let res = runInsect(Insect.fmtPlain, line);
		if (res) {
			if (res.msgType === 'value') {
				console.log(res.msg);
			} else if (res.msgType == 'error') {
				console.error(res.msg);
				process.exit(1);
			} else if (res.msgType == 'quit') {
				process.exit(0);
			}
		}
	});
}