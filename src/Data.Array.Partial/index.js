// Generated by purs version 0.13.6
"use strict";
let Data_Array = require("../Data.Array/index.js");
let tail = function (dictPartial) {
    return function (xs) {
        return Data_Array.slice(1)(Data_Array.length(xs))(xs);
    };
};
let last = function (dictPartial) {
    return function (xs) {
        return xs[Data_Array.length(xs) - 1 | 0];
    };
};
let init = function (dictPartial) {
    return function (xs) {
        return Data_Array.slice(0)(Data_Array.length(xs) - 1 | 0)(xs);
    };
};
let head = function (dictPartial) {
    return function (xs) {
        return xs[0];
    };
};
module.exports = {
    head: head,
    tail: tail,
    last: last,
    init: init
};
