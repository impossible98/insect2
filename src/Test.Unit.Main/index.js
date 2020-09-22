let control = require("../control");
let Data_Either = require("../Data.Either/index.js");
let Data_List = require("../Data.List/index.js");
let Effect = require("../Effect/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Class = require("../Effect.Class/index.js");
let Test_Unit = require("../Test.Unit/index.js");
let Test_Unit_Console = require("../Test.Unit.Console/index.js");
let Test_Unit_Output_Fancy = require("../Test.Unit.Output.Fancy/index.js");
let Test_Unit_Output_Simple = require("../Test.Unit.Output.Simple/index.js");
let Test_Unit_Output_TAP = require("../Test.Unit.Output.TAP/index.js");


function exit(rv) {
	return () => {
		try {
			process.exit(rv);
		} catch (error) { }
	};
}

function runTestWith(runner) {
	return function (suite) {
		return control.bind(Effect_Aff.bindAff)(control.bind(Effect_Aff.bindAff)(runner(Test_Unit.filterTests(suite)))(Test_Unit.collectResults))(function (results) {
			let errs = Test_Unit.keepErrors(results);
			let $2 = Data_List.length(errs) > 0;
			if ($2) {
				return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(exit(1));
			};
			return control.pure(Effect_Aff.applicativeAff)({});
		});
	};
}

function run(e) {
	function successHandler(v) {
		return control.pure(Effect.applicativeEffect)({});
	}

	function errorHandler(v) {
		return exit(1);
	}

	return function __do() {
		Effect_Aff.runAff(Data_Either.either(errorHandler)(successHandler))(e)();
		return {};
	};
}

function runTest(suite) {
	let runner = (function () {
		if (Test_Unit_Output_TAP.requested) {
			return Test_Unit_Output_TAP.runTest;
		};
		let $4 = Test_Unit_Console.hasStderr && Test_Unit_Console.hasColours;
		if ($4) {
			return Test_Unit_Output_Fancy.runTest;
		};
		return Test_Unit_Output_Simple.runTest;
	})();

	return run(runTestWith(runner)(suite));
}

module.exports = {
	runTest: runTest,
	runTestWith: runTestWith,
	run: run,
	exit: exit
};
