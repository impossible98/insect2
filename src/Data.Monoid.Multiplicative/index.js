const control = require("../control");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let one = function (dict) {
	return dict.one;
};

let mul = function (dict) {
	return dict.mul;
};

let Multiplicative = function (x) {
	return x;
};
let showMultiplicative = function (dictShow) {
	return new Data_Show.Show(function (v) {
		return "(Multiplicative " + (Data_Show.show(dictShow)(v) + ")");
	});
};
let semigroupMultiplicative = function (dictSemiring) {
	return new Data_Semigroup.Semigroup(function (v) {
		return function (v1) {
			return mul(dictSemiring)(v)(v1);
		};
	});
};
let ordMultiplicative = function (dictOrd) {
	return dictOrd;
};
let monoidMultiplicative = function (dictSemiring) {
	return new Data_Monoid.Monoid(function () {
		return semigroupMultiplicative(dictSemiring);
	}, one(dictSemiring));
};
let functorMultiplicative = new Data_Functor.Functor(function (f) {
	return function (m) {
		return f(m);
	};
});
let eqMultiplicative = function (dictEq) {
	return dictEq;
};
let eq1Multiplicative = new Data_Eq.Eq1(function (dictEq) {
	return Data_Eq.eq(eqMultiplicative(dictEq));
});
let ord1Multiplicative = new Data_Ord.Ord1(function () {
	return eq1Multiplicative;
}, function (dictOrd) {
	return Data_Ord.compare(ordMultiplicative(dictOrd));
});
let boundedMultiplicative = function (dictBounded) {
	return dictBounded;
};
let applyMultiplicative = new Apply(function () {
	return functorMultiplicative;
}, function (v) {
	return function (v1) {
		return v(v1);
	};
});
let bindMultiplicative = new control.Bind(function () {
	return applyMultiplicative;
}, function (v) {
	return function (f) {
		return f(v);
	};
});
let applicativeMultiplicative = new control.Applicative(function () {
	return applyMultiplicative;
}, Multiplicative);
let monadMultiplicative = new control.Monad(function () {
	return applicativeMultiplicative;
}, function () {
	return bindMultiplicative;
});

module.exports = {
	Multiplicative: Multiplicative,
	eqMultiplicative: eqMultiplicative,
	eq1Multiplicative: eq1Multiplicative,
	ordMultiplicative: ordMultiplicative,
	ord1Multiplicative: ord1Multiplicative,
	boundedMultiplicative: boundedMultiplicative,
	showMultiplicative: showMultiplicative,
	functorMultiplicative: functorMultiplicative,
	applyMultiplicative: applyMultiplicative,
	applicativeMultiplicative: applicativeMultiplicative,
	bindMultiplicative: bindMultiplicative,
	monadMultiplicative: monadMultiplicative,
	semigroupMultiplicative: semigroupMultiplicative,
	monoidMultiplicative: monoidMultiplicative
};
