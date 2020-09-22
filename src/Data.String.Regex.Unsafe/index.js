// Generated by purs version 0.13.6
"use strict";
let Data_Either = require("../Data.Either/index.js");
let Data_String_Regex = require("../Data.String.Regex/index.js");
let unsafeRegex = function (s) {
    return function (f) {
        return Data_Either.fromRight()(Data_String_Regex.regex(s)(f));
    };
};
module.exports = {
    unsafeRegex: unsafeRegex
};
