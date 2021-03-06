
const data = require('../data');
let Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
let Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");

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

let Traversable1 = function (Foldable10, Traversable1, sequence1, traverse1) {
    this.Foldable10 = Foldable10;
    this.Traversable1 = Traversable1;
    this.sequence1 = sequence1;
    this.traverse1 = traverse1;
};
let traverse1 = function (dict) {
    return dict.traverse1;
};
let sequence1Default = function (dictTraversable1) {
    return function (dictApply) {
        return traverse1(dictTraversable1)(dictApply)(identity(categoryFn));
    };
};
let traversableDual = new Traversable1(function () {
    return Data_Semigroup_Foldable.foldableDual;
}, function () {
    return Data_Traversable.traversableDual;
}, function (dictApply) {
    return sequence1Default(traversableDual)(dictApply);
}, function (dictApply) {
    return function (f) {
        return function (v) {
            return data.map(dictApply.Functor0())(Data_Monoid_Dual.Dual)(f(v));
        };
    };
});
let traversableMultiplicative = new Traversable1(function () {
    return Data_Semigroup_Foldable.foldableMultiplicative;
}, function () {
    return Data_Traversable.traversableMultiplicative;
}, function (dictApply) {
    return sequence1Default(traversableMultiplicative)(dictApply);
}, function (dictApply) {
    return function (f) {
        return function (v) {
            return data.map(dictApply.Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
        };
    };
});
let sequence1 = function (dict) {
    return dict.sequence1;
};
let traverse1Default = function (dictTraversable1) {
    return function (dictApply) {
        return function (f) {
            return function (ta) {
                return sequence1(dictTraversable1)(dictApply)(data.map((dictTraversable1.Traversable1()).Functor0())(f)(ta));
            };
        };
    };
};
module.exports = {
    sequence1: sequence1,
    traverse1: traverse1,
    Traversable1: Traversable1,
    traverse1Default: traverse1Default,
    sequence1Default: sequence1Default,
    traversableDual: traversableDual,
    traversableMultiplicative: traversableMultiplicative
};
