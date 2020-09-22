const fs = require('fs');
const readline = require('readline');


class Version {
	rl() {
		return readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
	}

	main() {
		const data = fs.readFileSync('VERSION', { encoding: 'utf-8' });

		this.rl().question(`\x1b[33mPlease input the tag: (eg: 0.0.1)\x1b[0m
\x1b[32mThe tag now is v${data.trim()}.
\x1b[33m>>>\x1b[0m `, tag => {
			const tags = tag.split('.');

			if (!data.startsWith('')) {
				console.log('The tag is v' + 'data');
			}

			for (let x in tags) {
				if (isNaN(Number(tags[x])) || tags.length !== 3) {
					console.log('\x1b[31mPlease input the right tag.\x1b[0m');
					process.exit();
				}
			}

			this.rl().close();
			fs.writeFileSync('VERSION', tag + '\n');
			console.log(`\x1b[32mThe tag changes to v${tag}.\x1b[0m`);
			console.log('\x1b[32mAll has been done.\x1b[0m');
		});
	}
}

function main() {
	const version = new Version();
	version.main();
}

main()
