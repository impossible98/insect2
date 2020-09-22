let Data_Tuple = require("../Data.Tuple/index.js");


let MonadState = function (Monad0, state) {
    this.Monad0 = Monad0;
    this.state = state;
};
let state = function (dict) {
    return dict.state;
};
let put = function (dictMonadState) {
    return function (s) {
        return state(dictMonadState)(function (v) {
            return new Data_Tuple.Tuple({}, s);
        });
    };
};
let modify_ = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            return new Data_Tuple.Tuple({}, f(s));
        });
    };
};
let modify = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            let s$prime = f(s);
            return new Data_Tuple.Tuple(s$prime, s$prime);
        });
    };
};
let gets = function (dictMonadState) {
    return function (f) {
        return state(dictMonadState)(function (s) {
            return new Data_Tuple.Tuple(f(s), s);
        });
    };
};
let get = function (dictMonadState) {
    return state(dictMonadState)(function (s) {
        return new Data_Tuple.Tuple(s, s);
    });
};
module.exports = {
    state: state,
    MonadState: MonadState,
    get: get,
    gets: gets,
    put: put,
    modify: modify,
    modify_: modify_
};
