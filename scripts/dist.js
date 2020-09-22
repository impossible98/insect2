const fs = require('fs');

class Dist {
	main() {
		fs.renameSync('dist/index.js', 'dist/main.js')
	}
}

function main() {
	const dist = new Dist();
	dist.main();
	console.log('\x1b[32mAll has been done.\x1b[0m');
}

main()
