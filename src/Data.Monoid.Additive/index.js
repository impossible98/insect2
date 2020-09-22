const control = require("../control");
const data = require("../data");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


let zero = function (dict) {
	return dict.zero;
};


let add = function (dict) {
	return dict.add;
};

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let Additive = function (x) {
    return x;
};
let showAdditive = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Additive " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let semigroupAdditive = function (dictSemiring) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return add(dictSemiring)(v)(v1);
        };
    });
};
let ordAdditive = function (dictOrd) {
    return dictOrd;
};
let monoidAdditive = function (dictSemiring) {
    return new Data_Monoid.Monoid(function () {
        return semigroupAdditive(dictSemiring);
    }, zero(dictSemiring));
};
let functorAdditive = new Data_Functor.Functor(function (f) {
    return function (m) {
        return f(m);
    };
});
let eqAdditive = function (dictEq) {
    return dictEq;
};
let eq1Additive = new data.Eq1(function (dictEq) {
    return data.eq(eqAdditive(dictEq));
});
let ord1Additive = new Data_Ord.Ord1(function () {
    return eq1Additive;
}, function (dictOrd) {
    return Data_Ord.compare(ordAdditive(dictOrd));
});
let boundedAdditive = function (dictBounded) {
    return dictBounded;
};
let applyAdditive = new Apply(function () {
    return functorAdditive;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
let bindAdditive = new control.Bind(function () {
    return applyAdditive;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
let applicativeAdditive = new control.Applicative(function () {
    return applyAdditive;
}, Additive);
let monadAdditive = new control.Monad(function () {
    return applicativeAdditive;
}, function () {
    return bindAdditive;
});
module.exports = {
    Additive: Additive,
    eqAdditive: eqAdditive,
    eq1Additive: eq1Additive,
    ordAdditive: ordAdditive,
    ord1Additive: ord1Additive,
    boundedAdditive: boundedAdditive,
    showAdditive: showAdditive,
    functorAdditive: functorAdditive,
    applyAdditive: applyAdditive,
    applicativeAdditive: applicativeAdditive,
    bindAdditive: bindAdditive,
    monadAdditive: monadAdditive,
    semigroupAdditive: semigroupAdditive,
    monoidAdditive: monoidAdditive
};
