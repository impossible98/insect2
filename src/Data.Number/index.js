// Generated by purs version 0.13.6
"use strict";

let Data_Maybe = require("../Data.Maybe/index.js");


let nan = NaN;
let $$isNaN = isNaN;
let $$isFinite = isFinite;
let infinity = Infinity;
let fromString = (function () {
    let check = function (num) {
        if ($$isFinite(num)) {
            return new Data_Maybe.Just(num);
        };
        if (true) {
            return Data_Maybe.Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Number (line 45, column 5 - line 46, column 39): " + [ num.constructor.name ]);
    };
    return function ($1) {
        return check(parseFloat($1));
    };
})();
module.exports = {
    fromString: fromString,
    nan: nan,
    "isNaN": $$isNaN,
    infinity: infinity,
    "isFinite": $$isFinite
};
