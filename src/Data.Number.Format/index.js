// Generated by purs version 0.13.6
"use strict";
let $foreign = require("./foreign.js");
let Data_Ord = require("../Data.Ord/index.js");
let Precision = (function () {
    function Precision(value0) {
        this.value0 = value0;
    };
    Precision.create = function (value0) {
        return new Precision(value0);
    };
    return Precision;
})();
let Fixed = (function () {
    function Fixed(value0) {
        this.value0 = value0;
    };
    Fixed.create = function (value0) {
        return new Fixed(value0);
    };
    return Fixed;
})();
let Exponential = (function () {
    function Exponential(value0) {
        this.value0 = value0;
    };
    Exponential.create = function (value0) {
        return new Exponential(value0);
    };
    return Exponential;
})();
let toStringWith = function (v) {
    if (v instanceof Precision) {
        return $foreign.toPrecisionNative(v.value0);
    };
    if (v instanceof Fixed) {
        return $foreign.toFixedNative(v.value0);
    };
    if (v instanceof Exponential) {
        return $foreign.toExponentialNative(v.value0);
    };
    throw new Error("Failed pattern match at Data.Number.Format (line 59, column 1 - line 59, column 40): " + [ v.constructor.name ]);
};
let precision = (function () {
    let $5 = Data_Ord.clamp(Data_Ord.ordInt)(1)(21);
    return function ($6) {
        return Precision.create($5($6));
    };
})();
let fixed = (function () {
    let $7 = Data_Ord.clamp(Data_Ord.ordInt)(0)(20);
    return function ($8) {
        return Fixed.create($7($8));
    };
})();
let exponential = (function () {
    let $9 = Data_Ord.clamp(Data_Ord.ordInt)(0)(20);
    return function ($10) {
        return Exponential.create($9($10));
    };
})();
module.exports = {
    precision: precision,
    fixed: fixed,
    exponential: exponential,
    toStringWith: toStringWith,
    toString: $foreign.toString
};
