let $foreign = require("./foreign.js");

const data = require('../data');
let Effect = require("../Effect/index.js");


let modify = function (f) {
    return $foreign["modify'"](function (s) {
        let s$prime = f(s);
        return {
            state: s$prime,
            value: s$prime
        };
    });
};
let modify_ = function (f) {
    return function (s) {
        return data._void(Effect.functorEffect)(modify(f)(s));
    };
};
module.exports = {
    modify: modify,
    modify_: modify_,
    "new": $foreign["new"],
    read: $foreign.read,
    "modify'": $foreign["modify'"],
    write: $foreign.write
};
