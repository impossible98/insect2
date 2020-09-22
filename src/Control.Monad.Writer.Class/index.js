const control = require("../control");
let Data_Tuple = require("../Data.Tuple/index.js");


let MonadTell = function (Monad0, tell) {
    this.Monad0 = Monad0;
    this.tell = tell;
};
let MonadWriter = function (MonadTell0, listen, pass) {
    this.MonadTell0 = MonadTell0;
    this.listen = listen;
    this.pass = pass;
};
let tell = function (dict) {
    return dict.tell;
};
let pass = function (dict) {
    return dict.pass;
};
let listen = function (dict) {
    return dict.listen;
};
let listens = function (dictMonadWriter) {
    return function (f) {
        return function (m) {
            return control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(listen(dictMonadWriter)(m))(function (v) {
                return control.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(new Data_Tuple.Tuple(v.value0, f(v.value1)));
            });
        };
    };
};
let censor = function (dictMonadWriter) {
    return function (f) {
        return function (m) {
            return pass(dictMonadWriter)(control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(m)(function (a) {
                return control.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(new Data_Tuple.Tuple(a, f));
            }));
        };
    };
};

module.exports = {
    listen: listen,
    pass: pass,
    tell: tell,
    MonadTell: MonadTell,
    MonadWriter: MonadWriter,
    listens: listens,
    censor: censor
};
