let control = require("../control");

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

let Conj = function (x) {
    return x;
};
let showConj = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Conj " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let semiringConj = function (dictHeytingAlgebra) {
    return new Semiring(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    }, Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
let semigroupConj = function (dictHeytingAlgebra) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    });
};
let ordConj = function (dictOrd) {
    return dictOrd;
};
let monoidConj = function (dictHeytingAlgebra) {
    return new Data_Monoid.Monoid(function () {
        return semigroupConj(dictHeytingAlgebra);
    }, Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
let functorConj = new Data_Functor.Functor(function (f) {
    return function (m) {
        return f(m);
    };
});
let eqConj = function (dictEq) {
    return dictEq;
};
let eq1Conj = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqConj(dictEq));
});
let ord1Conj = new Data_Ord.Ord1(function () {
    return eq1Conj;
}, function (dictOrd) {
    return Data_Ord.compare(ordConj(dictOrd));
});
let boundedConj = function (dictBounded) {
    return dictBounded;
};
let applyConj = new Apply(function () {
    return functorConj;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
let bindConj = new control.Bind(function () {
    return applyConj;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
let applicativeConj = new control.Applicative(function () {
    return applyConj;
}, Conj);
let monadConj = new control.Monad(function () {
    return applicativeConj;
}, function () {
    return bindConj;
});
module.exports = {
    Conj: Conj,
    eqConj: eqConj,
    eq1Conj: eq1Conj,
    ordConj: ordConj,
    ord1Conj: ord1Conj,
    boundedConj: boundedConj,
    showConj: showConj,
    functorConj: functorConj,
    applyConj: applyConj,
    applicativeConj: applicativeConj,
    bindConj: bindConj,
    monadConj: monadConj,
    semigroupConj: semigroupConj,
    monoidConj: monoidConj,
    semiringConj: semiringConj
};
