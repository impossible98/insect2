const control = require("../control");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Show = require("../Data.Show/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");
let Test_Unit = require("../Test.Unit/index.js");
let Test_Unit_Console = require("../Test.Unit.Console/index.js");


let indent = function (v) {
    if (v === 0) {
        return Data_Monoid.mempty(Data_Monoid.monoidString);
    };
    return "  " + indent(v - 1 | 0);
};
let indent$prime = function ($24) {
    return indent(Data_List.length($24));
};
let printLive = function (tst) {
    let runSuiteItem = function (path) {
        return function (v) {
            if (v instanceof Data_Either.Left) {
                return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)(indent$prime(path) + ("- Suite: " + v.value0)))(function () {
                    return control.pure(Effect_Aff.applicativeAff)({});
                });
            };
            if (v instanceof Data_Either.Right) {
                return control.bind(Effect_Aff.bindAff)(Effect_Aff.attempt(v.value0.value1))(function (result) {
                    return control.discard(control.discardUnit)(Effect_Aff.bindAff)((function () {
                        if (result instanceof Data_Either.Right) {
                            return Test_Unit_Console.log(Effect_Aff.monadEffectAff)(indent$prime(path) + ("\u2713 Passed: " + v.value0.value0));
                        };
                        if (result instanceof Data_Either.Left) {
                            return Test_Unit_Console.log(Effect_Aff.monadEffectAff)(indent$prime(path) + ("\u2620 Failed: " + (v.value0.value0 + (" because " + Effect_Exception.message(result.value0)))));
                        };
                        throw new Error("Failed pattern match at Test.Unit.Output.Simple (line 32, column 7 - line 36, column 59): " + [ result.constructor.name ]);
                    })())(function () {
                        return control.pure(Effect_Aff.applicativeAff)({});
                    });
                });
            };
            throw new Error("Failed pattern match at Test.Unit.Output.Simple (line 27, column 5 - line 29, column 16): " + [ path.constructor.name, v.constructor.name ]);
        };
    };
    return Test_Unit.walkSuite(runSuiteItem)(tst);
};
let printErrors = function (tests) {
    return function (skCount) {
        let printHeader = function (level) {
            return function (path) {
                let v = Data_List.uncons(path);
                if (v instanceof Data_Maybe.Nothing) {
                    return control.pure(Effect_Aff.applicativeAff)({});
                };
                if (v instanceof Data_Maybe.Just) {
                    return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)(indent(level) + ("In \"" + (v.value0.head + "\":"))))(function () {
                        return printHeader(level + 1 | 0)(v.value0.tail);
                    });
                };
                throw new Error("Failed pattern match at Test.Unit.Output.Simple (line 61, column 34 - line 65, column 41): " + [ v.constructor.name ]);
            };
        };
        let printError = function (err) {
            return Test_Unit_Console.log(Effect_Aff.monadEffectAff)("Error: " + Data_Maybe.fromMaybe(Effect_Exception.message(err))(Effect_Exception.stack(err)));
        };
        let print = function (v) {
            return control.discard(control.discardUnit)(Effect_Aff.bindAff)(printHeader(0)(v.value0))(function () {
                return control.discard(control.discardUnit)(Effect_Aff.bindAff)(printError(v.value1))(function () {
                    return Test_Unit_Console.log(Effect_Aff.monadEffectAff)("");
                });
            });
        };
        let list = Data_Foldable.traverse_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList)(print);
        return control.bind(Effect_Aff.bindAff)(Test_Unit.collectResults(tests))(function (results) {
            let skMsg = (function () {
                if (skCount === 0) {
                    return "";
                };
                if (skCount === 1) {
                    return " (1 test skipped)";
                };
                return " (" + (Data_Show.show(Data_Show.showInt)(skCount) + " tests skipped)");
            })();
            let errors = Test_Unit.keepErrors(results);
            return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)(""))(function () {
                let v = Data_List.length(errors);
                if (v === 0) {
                    return Test_Unit_Console.log(Effect_Aff.monadEffectAff)("All " + (Data_Show.show(Data_Show.showInt)(Data_List.length(results)) + (" tests passed" + (skMsg + "!"))));
                };
                if (v === 1) {
                    return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)("1 test failed" + (skMsg + ":\x0a")))(function () {
                        return list(errors);
                    });
                };
                return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)(Data_Show.show(Data_Show.showInt)(v) + (" tests failed" + (skMsg + ":\x0a"))))(function () {
                    return list(errors);
                });
            });
        });
    };
};
let runTest = function (suite) {
    return control.bind(Effect_Aff.bindAff)(printLive(suite))(function (tests) {
        return control.discard(control.discardUnit)(Effect_Aff.bindAff)(printErrors(tests)(Test_Unit.countSkippedTests(suite)))(function () {
            return control.pure(Effect_Aff.applicativeAff)(tests);
        });
    });
};
module.exports = {
    runTest: runTest
};
