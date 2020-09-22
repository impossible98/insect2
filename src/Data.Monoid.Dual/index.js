let control = require("../control");
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

let Dual = function (x) {
    return x;
};
let showDual = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Dual " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let semigroupDual = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semigroup.append(dictSemigroup)(v1)(v);
        };
    });
};
let ordDual = function (dictOrd) {
    return dictOrd;
};
let monoidDual = function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
        return semigroupDual(dictMonoid.Semigroup0());
    }, Data_Monoid.mempty(dictMonoid));
};
let functorDual = new Data_Functor.Functor(function (f) {
    return function (m) {
        return f(m);
    };
});
let eqDual = function (dictEq) {
    return dictEq;
};
let eq1Dual = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqDual(dictEq));
});
let ord1Dual = new Data_Ord.Ord1(function () {
    return eq1Dual;
}, function (dictOrd) {
    return Data_Ord.compare(ordDual(dictOrd));
});
let boundedDual = function (dictBounded) {
    return dictBounded;
};
let applyDual = new Apply(function () {
    return functorDual;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
let bindDual = new control.Bind(function () {
    return applyDual;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
let applicativeDual = new control.Applicative(function () {
    return applyDual;
}, Dual);
let monadDual = new control.Monad(function () {
    return applicativeDual;
}, function () {
    return bindDual;
});
module.exports = {
    Dual: Dual,
    eqDual: eqDual,
    eq1Dual: eq1Dual,
    ordDual: ordDual,
    ord1Dual: ord1Dual,
    boundedDual: boundedDual,
    showDual: showDual,
    functorDual: functorDual,
    applyDual: applyDual,
    applicativeDual: applicativeDual,
    bindDual: bindDual,
    monadDual: monadDual,
    semigroupDual: semigroupDual,
    monoidDual: monoidDual
};
