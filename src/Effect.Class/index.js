let Effect = require("../Effect/index.js");

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

let categoryFn = new Category(() => {
	return semigroupoidFn;
}, function (x) {
	return x;
});

let MonadEffect = function (Monad0, liftEffect) {
    this.Monad0 = Monad0;
    this.liftEffect = liftEffect;
};
let monadEffectEffect = new MonadEffect(() => {
    return Effect.monadEffect;
}, identity(categoryFn));
let liftEffect = function (dict) {
    return dict.liftEffect;
};
module.exports = {
    liftEffect: liftEffect,
    MonadEffect: MonadEffect,
    monadEffectEffect: monadEffectEffect
};
