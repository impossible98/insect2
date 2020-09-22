const control = require("../control");

let Data_Eq = require("../Data.Eq/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let Disj = function (x) {
	return x;
};
let showDisj = function (dictShow) {
	return new Data_Show.Show(function (v) {
		return "(Disj " + (Data_Show.show(dictShow)(v) + ")");
	});
};
let semiringDisj = function (dictHeytingAlgebra) {
	return new Semiring(function (v) {
		return function (v1) {
			return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
		};
	}, function (v) {
		return function (v1) {
			return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
		};
	}, Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};
let semigroupDisj = function (dictHeytingAlgebra) {
	return new Data_Semigroup.Semigroup(function (v) {
		return function (v1) {
			return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
		};
	});
};
let ordDisj = function (dictOrd) {
	return dictOrd;
};
let monoidDisj = function (dictHeytingAlgebra) {
	return new Data_Monoid.Monoid(function () {
		return semigroupDisj(dictHeytingAlgebra);
	}, Data_HeytingAlgebra.ff(dictHeytingAlgebra));
};
let functorDisj = new Data_Functor.Functor(function (f) {
	return function (m) {
		return f(m);
	};
});
let eqDisj = function (dictEq) {
	return dictEq;
};
let eq1Disj = new Data_Eq.Eq1(function (dictEq) {
	return Data_Eq.eq(eqDisj(dictEq));
});
let ord1Disj = new Data_Ord.Ord1(function () {
	return eq1Disj;
}, function (dictOrd) {
	return Data_Ord.compare(ordDisj(dictOrd));
});
let boundedDisj = function (dictBounded) {
	return dictBounded;
};
let applyDisj = new Apply(function () {
	return functorDisj;
}, function (v) {
	return function (v1) {
		return v(v1);
	};
});
let bindDisj = new control.Bind(function () {
	return applyDisj;
}, function (v) {
	return function (f) {
		return f(v);
	};
});
let applicativeDisj = new control.Applicative(function () {
	return applyDisj;
}, Disj);
let monadDisj = new control.Monad(function () {
	return applicativeDisj;
}, function () {
	return bindDisj;
});

module.exports = {
	Disj: Disj,
	eqDisj: eqDisj,
	eq1Disj: eq1Disj,
	ordDisj: ordDisj,
	ord1Disj: ord1Disj,
	boundedDisj: boundedDisj,
	showDisj: showDisj,
	functorDisj: functorDisj,
	applyDisj: applyDisj,
	applicativeDisj: applicativeDisj,
	bindDisj: bindDisj,
	monadDisj: monadDisj,
	semigroupDisj: semigroupDisj,
	monoidDisj: monoidDisj,
	semiringDisj: semiringDisj
};
