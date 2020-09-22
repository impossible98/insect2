let Data_Either = require("../Data.Either/index.js");

let Data_Maybe = require("../Data.Maybe/index.js");


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


let Inject = function (inj, prj) {
    this.inj = inj;
    this.prj = prj;
};
let prj = function (dict) {
    return dict.prj;
};

let injectReflexive = new Inject(identity(categoryFn), Data_Maybe.Just.create);

let injectLeft = new Inject(Data_Either.Left.create, Data_Either.either(Data_Maybe.Just.create)(Data_Functor._const(Data_Maybe.Nothing.value)));

let inj = function (dict) {
    return dict.inj;
};

let injectRight = function (dictInject) {
    return new Inject((function () {
        let $1 = inj(dictInject);
        return function ($2) {
            return Data_Either.Right.create($1($2));
        };
    })(), Data_Either.either(Data_Functor._const(Data_Maybe.Nothing.value))(prj(dictInject)));
};

module.exports = {
    inj: inj,
    prj: prj,
    Inject: Inject,
    injectReflexive: injectReflexive,
    injectLeft: injectLeft,
    injectRight: injectRight
};
