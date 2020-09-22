let $foreign = require("./foreign.js");

let control = require("../control");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");
let Test_Unit = require("../Test.Unit/index.js");
let Test_Unit_Console = require("../Test.Unit.Console/index.js");



let printStack = function (err) {
    let v = Effect_Exception.stack(err);
    if (v instanceof Data_Maybe.Nothing) {
        return control.pure(Effect_Aff.applicativeAff)();
    };
    if (v instanceof Data_Maybe.Just) {
        return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)("  stack: |-"))(function () {
            return Test_Unit_Console.log(Effect_Aff.monadEffectAff)(Data_String_Common.joinWith("\x0a")(Data_Functor.map(Data_Functor.functorArray)(Data_Semigroup.append(Data_Semigroup.semigroupString)("    "))(Data_String_Common.split("\x0a")(v.value0))));
        });
    };
    throw new Error("Failed pattern match at Test.Unit.Output.TAP (line 22, column 18 - line 26, column 67): " + [ v.constructor.name ]);
};
let runTest = function (suite) {
    let run = function (v) {
        return function (v1) {
            return Data_Tuple.Tuple.create(v.value0 + 1 | 0)(Data_List.snoc(v.value1)((function () {
                let label = Data_String_Common.joinWith(" / ")(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray)(v1.value0));
                return control.bind(Effect_Aff.bindAff)(Effect_Aff.attempt(v1.value1))(function (result) {
                    if (result instanceof Data_Either.Left) {
                        return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)("not ok " + (Data_Show.show(Data_Show.showInt)(v.value0) + (" " + label))))(function () {
                            return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)("  ---"))(function () {
                                return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)("  message: " + Effect_Exception.message(result.value0)))(function () {
                                    return control.discard(control.discardUnit)(Effect_Aff.bindAff)(printStack(result.value0))(function () {
                                        return Test_Unit_Console.log(Effect_Aff.monadEffectAff)("  ...");
                                    });
                                });
                            });
                        });
                    };
                    if (result instanceof Data_Either.Right) {
                        return Test_Unit_Console.log(Effect_Aff.monadEffectAff)("ok " + (Data_Show.show(Data_Show.showInt)(v.value0) + (" " + label)));
                    };
                    throw new Error("Failed pattern match at Test.Unit.Output.TAP (line 39, column 7 - line 46, column 63): " + [ result.constructor.name ]);
                });
            })()));
        };
    };
    return control.bind(Effect_Aff.bindAff)(Test_Unit.collectTests(suite))(function (tests) {
        return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Test_Unit_Console.log(Effect_Aff.monadEffectAff)("1.." + Data_Show.show(Data_Show.showInt)(Data_List.length(tests))))(function () {
            let acts = Data_Foldable.foldl(Data_List_Types.foldableList)(run)(new Data_Tuple.Tuple(1, Data_List_Types.Nil.value))(tests);
            return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Data_Foldable.sequence_(Effect_Aff.applicativeAff)(Data_List_Types.foldableList)(Data_Tuple.snd(acts)))(function () {
                return control.pure(Effect_Aff.applicativeAff)(tests);
            });
        });
    });
};
module.exports = {
    runTest: runTest,
    requested: $foreign.requested
};
