// Generated by purs version 0.13.6
"use strict";
let $foreign = require("./foreign.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let unsafeCompare = function (dictWarn) {
    return $foreign.unsafeCompareImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
};
module.exports = {
    unsafeCompare: unsafeCompare
};