const control = require('../control');
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Data_Either = require("../Data.Either/index.js");
const data = require("../data");
let Data_Show = require("../Data.Show/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");
let Test_Unit = require("../Test.Unit/index.js");


let expectFailure = function (reason) {
    return function (t) {
        return control.bind(Effect_Aff.bindAff)(Effect_Aff.attempt(t))(function (r) {
            return Data_Either.either(Data_Functor._const(Test_Unit.success))(Data_Functor._const(Test_Unit.failure(reason)))(r);
        });
    };
};
let equal$prime = function (dictEq) {
    return function (reason) {
        return function (expected) {
            return function (actual) {
                let $12 = data.eq(dictEq)(expected)(actual);
                if ($12) {
                    return Test_Unit.success;
                };
                return Test_Unit.failure(reason);
            };
        };
    };
};
let equal = function (dictEq) {
    return function (dictShow) {
        return function (expected) {
            return function (actual) {
                let $13 = data.eq(dictEq)(expected)(actual);
                if ($13) {
                    return Test_Unit.success;
                };
                return Test_Unit.failure("expected " + (Data_Show.show(dictShow)(expected) + (", got " + Data_Show.show(dictShow)(actual))));
            };
        };
    };
};
let equal$prime$prime = function (dictEq) {
    return function (dictShow) {
        return function (name) {
            return function (a) {
                return function (b) {
                    return Control_Monad_Error_Class.catchError(Effect_Aff.monadErrorAff)(equal(dictEq)(dictShow)(a)(b))((function () {
                        let $18 = Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff);
                        return function ($19) {
                            return $18(Effect_Exception.error((function (v) {
                                return name + " " + v;
                            })(Effect_Exception.message($19))));
                        };
                    })());
                };
            };
        };
    };
};
let shouldEqual = function (dictEq) {
    return function (dictShow) {
        return Data_Functor.flip(equal(dictEq)(dictShow));
    };
};
let assertFalse = function (v) {
    return function (v1) {
        if (!v1) {
            return Test_Unit.success;
        };
        if (v1) {
            return Test_Unit.failure(v);
        };
        throw new Error("Failed pattern match at Test.Unit.Assert (line 26, column 1 - line 26, column 41): " + [ v.constructor.name, v1.constructor.name ]);
    };
};
let assert = function (v) {
    return function (v1) {
        if (v1) {
            return Test_Unit.success;
        };
        if (!v1) {
            return Test_Unit.failure(v);
        };
        throw new Error("Failed pattern match at Test.Unit.Assert (line 20, column 1 - line 20, column 36): " + [ v.constructor.name, v1.constructor.name ]);
    };
};

module.exports = {
    assert: assert,
    assertFalse: assertFalse,
    expectFailure: expectFailure,
    equal: equal,
    "equal'": equal$prime,
    shouldEqual: shouldEqual
};
