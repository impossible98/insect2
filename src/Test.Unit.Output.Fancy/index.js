const control = require('../control');
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
const data = require('../data');
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Show = require("../Data.Show/index.js");
let Effect = require("../Effect/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Class = require("../Effect.Class/index.js");
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
                return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
                    Test_Unit_Console.print(indent$prime(path))();
                    Test_Unit_Console.print("\u2192 Suite: ")();
                    Test_Unit_Console.printLabel(v.value0)();
                    return data._void(Effect.functorEffect)(Test_Unit_Console.print("\x0a"))();
                });
            };
            if (v instanceof Data_Either.Right) {
                return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
                    Test_Unit_Console.print(indent$prime(path))();
                    Test_Unit_Console.savePos();
                    Test_Unit_Console.print("\u2192 Running: ")();
                    Test_Unit_Console.printLabel(v.value0.value0)();
                    return Test_Unit_Console.restorePos();
                }))(function () {
                    return control.bind(Effect_Aff.bindAff)(Effect_Aff.attempt(v.value0.value1))(function (result) {
                        return data._void(Effect_Aff.functorAff)((function () {
                            if (result instanceof Data_Either.Right) {
                                return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
                                    Test_Unit_Console.eraseLine();
                                    Test_Unit_Console.printPass("\u2713 Passed: ")();
                                    Test_Unit_Console.printLabel(v.value0.value0)();
                                    return Test_Unit_Console.print("\x0a")();
                                });
                            };
                            if (result instanceof Data_Either.Left) {
                                return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(function __do() {
                                    Test_Unit_Console.eraseLine();
                                    Test_Unit_Console.printFail("\u2620 Failed: ")();
                                    Test_Unit_Console.printLabel(v.value0.value0)();
                                    Test_Unit_Console.print(" because ")();
                                    Test_Unit_Console.printFail(Effect_Exception.message(result.value0))();
                                    return Test_Unit_Console.print("\x0a")();
                                });
                            };
                            throw new Error("Failed pattern match at Test.Unit.Output.Fancy (line 42, column 14 - line 54, column 21): " + [ result.constructor.name ]);
                        })());
                    });
                });
            };
            throw new Error("Failed pattern match at Test.Unit.Output.Fancy (line 28, column 5 - line 33, column 26): " + [ path.constructor.name, v.constructor.name ]);
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
                    return Test_Unit_Console.print(indent(level));
                };
                if (v instanceof Data_Maybe.Just) {
                    return function __do() {
                        Test_Unit_Console.print(indent(level) + ("In \"" + (v.value0.head + "\":\x0a")))();
                        return printHeader(level + 1 | 0)(v.value0.tail)();
                    };
                };
                throw new Error("Failed pattern match at Test.Unit.Output.Fancy (line 79, column 34 - line 83, column 41): " + [ v.constructor.name ]);
            };
        };
        let printError = function (err) {
            return function __do() {
                Data_Maybe.maybe(Test_Unit_Console.printFail(Effect_Exception.message(err)))(Test_Unit_Console.printFail)(Effect_Exception.stack(err))();
                return Test_Unit_Console.print("\x0a")();
            };
        };
        let printItem = function (v) {
            return function __do() {
                printHeader(0)(v.value0)();
                printError(v.value1)();
                return Test_Unit_Console.print("\x0a")();
            };
        };
        let list = Data_Foldable.traverse_(Effect.applicativeEffect)(Data_List_Types.foldableList)(printItem);
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
            return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)((function () {
                let v = Data_List.length(errors);
                if (v === 0) {
                    return Test_Unit_Console.printPass("\x0aAll " + (Data_Show.show(Data_Show.showInt)(Data_List.length(results)) + (" tests passed" + (skMsg + "! \ud83c\udf89\x0a"))));
                };
                if (v === 1) {
                    return function __do() {
                        Test_Unit_Console.printFail("\x0a1 test failed" + (skMsg + ":\x0a\x0a"))();
                        return list(errors)();
                    };
                };
                return function __do() {
                    Test_Unit_Console.printFail("\x0a" + (Data_Show.show(Data_Show.showInt)(v) + (" tests failed" + (skMsg + ":\x0a\x0a"))))();
                    return list(errors)();
                };
            })());
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
