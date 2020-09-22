let Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");
let Data_Array_ST = require("../Data.Array.ST/index.js");
const data = require('../data');
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");


let Iterator = (function () {
    function Iterator(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Iterator.create = function (value0) {
        return function (value1) {
            return new Iterator(value0, value1);
        };
    };
    return Iterator;
})();
let peek = function (v) {
    return function __do() {
        let i = Control_Monad_ST_Internal.read(v.value1)();
        return v.value0(i);
    };
};
let next = function (v) {
    return function __do() {
        let i = Control_Monad_ST_Internal.read(v.value1)();
        Control_Monad_ST_Internal.modify(function (v1) {
            return v1 + 1 | 0;
        })(v.value1)();
        return v.value0(i);
    };
};
let pushWhile = function (p) {
    return function (iter) {
        return function (array) {
            return function __do() {
                let $$break = Control_Monad_ST_Internal["new"](false)();
                while (data.map(Control_Monad_ST_Internal.functorST)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST_Internal.read($$break))()) {
                    (function __do() {
                        let mx = peek(iter)();
                        if (mx instanceof Data_Maybe.Just && p(mx.value0)) {
                            Data_Array_ST.push(mx.value0)(array)();
                            return data._void(Control_Monad_ST_Internal.functorST)(next(iter))();
                        };
                        return data._void(Control_Monad_ST_Internal.functorST)(Control_Monad_ST_Internal.write(true)($$break))();
                    })();
                };
                return {};
            };
        };
    };
};
let pushAll = pushWhile(data._const(true));
let iterator = function (f) {
    return data.map(Control_Monad_ST_Internal.functorST)(Iterator.create(f))(Control_Monad_ST_Internal["new"](0));
};
let iterate = function (iter) {
    return function (f) {
        return function __do() {
            let $$break = Control_Monad_ST_Internal["new"](false)();
            while (data.map(Control_Monad_ST_Internal.functorST)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST_Internal.read($$break))()) {
                (function __do() {
                    let mx = next(iter)();
                    if (mx instanceof Data_Maybe.Just) {
                        return f(mx.value0)();
                    };
                    if (mx instanceof Data_Maybe.Nothing) {
                        return data._void(Control_Monad_ST_Internal.functorST)(Control_Monad_ST_Internal.write(true)($$break))();
                    };
                    throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [ mx.constructor.name ]);
                })();
            };
            return {};
        };
    };
};
let exhausted = (function () {
    let $13 = data.map(Control_Monad_ST_Internal.functorST)(Data_Maybe.isNothing);
    return function ($14) {
        return $13(peek($14));
    };
})();
module.exports = {
    iterator: iterator,
    iterate: iterate,
    next: next,
    peek: peek,
    exhausted: exhausted,
    pushWhile: pushWhile,
    pushAll: pushAll
};
