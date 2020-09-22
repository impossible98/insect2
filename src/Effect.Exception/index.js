let $foreign = require("./foreign.js");

const control = require("../control");
let Data_Either = require("../Data.Either/index.js");
const data = require('../data');
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Show = require("../Data.Show/index.js");
let Effect = require("../Effect/index.js");


let $$try = function (action) {
    return $foreign.catchException((() => {
        let $0 = control.pure(Effect.applicativeEffect);
        return function ($1) {
            return $0(Data_Either.Left.create($1));
        };
    })())(data.map(Effect.functorEffect)(Data_Either.Right.create)(action));
};
let $$throw = function ($2) {
    return $foreign.throwException($foreign.error($2));
};
let stack = $foreign.stackImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let showError = new Data_Show.Show($foreign.showErrorImpl);
module.exports = {
    stack: stack,
    "throw": $$throw,
    "try": $$try,
    showError: showError,
    error: $foreign.error,
    message: $foreign.message,
    name: $foreign.name,
    throwException: $foreign.throwException,
    catchException: $foreign.catchException
};
