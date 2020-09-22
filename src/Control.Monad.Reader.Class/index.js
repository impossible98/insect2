const control = require("../control");
const data = require('../data');


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

function identity(dict) {
	return dict.identity;
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(function () {
	return semigroupoidFn;
}, function (x) {
	return x;
});


function compose(dict) {
	return dict.compose;
}

function composeFlipped(dictCnotrol) {
	return function (f) {
		return function (g) {
			return compose(dictCnotrol)(g)(f);
		};
	};
}

let MonadAsk = function (Monad0, ask) {
    this.Monad0 = Monad0;
    this.ask = ask;
};
let MonadReader = function (MonadAsk0, local) {
    this.MonadAsk0 = MonadAsk0;
    this.local = local;
};
let monadAskFun = new MonadAsk(function () {
    return control.monadFn;
}, identity(categoryFn));
let monadReaderFun = new MonadReader(function () {
    return monadAskFun;
}, composeFlipped(semigroupoidFn));
let local = function (dict) {
    return dict.local;
};
let ask = function (dict) {
    return dict.ask;
};
let asks = function (dictMonadAsk) {
    return function (f) {
        return data.map((((dictMonadAsk.Monad0()).Bind1()).Apply0()).Functor0())(f)(ask(dictMonadAsk));
    };
};
module.exports = {
    ask: ask,
    local: local,
    MonadAsk: MonadAsk,
    asks: asks,
    MonadReader: MonadReader,
    monadAskFun: monadAskFun,
    monadReaderFun: monadReaderFun
};
