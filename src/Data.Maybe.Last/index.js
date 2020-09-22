let Control_MonadZero = require("../Control.MonadZero/index.js");
const control = require("../control");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let data = require("../data");


class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}
let altArray = new Alt(function () {
	return data.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));


function alt(dict) {
	return dict.alt;
}


class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}
let alternativeArray = new Alternative(function () {
    return control.applicativeArray;
}, function () {
    return control.plusArray;
});

let Last = function (x) {
    return x;
};
let showLast = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Last " + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
    });
};
let semigroupLast = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v1 instanceof Data_Maybe.Just) {
            return v1;
        };
        if (v1 instanceof Data_Maybe.Nothing) {
            return v;
        };
        throw new Error("Failed pattern match at Data.Maybe.Last (line 52, column 1 - line 54, column 36): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let ordLast = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
let ord1Last = Data_Maybe.ord1Maybe;
let newtypeLast = new Data_Newtype.Newtype(function (n) {
    return n;
}, Last);
let monoidLast = new Data_Monoid.Monoid(function () {
    return semigroupLast;
}, Data_Maybe.Nothing.value);
let monadLast = Data_Maybe.monadMaybe;
let invariantLast = Data_Maybe.invariantMaybe;
let functorLast = Data_Maybe.functorMaybe;
let extendLast = Data_Maybe.extendMaybe;
let eqLast = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
let eq1Last = Data_Maybe.eq1Maybe;
let boundedLast = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
let bindLast = Data_Maybe.bindMaybe;
let applyLast = Data_Maybe.applyMaybe;
let applicativeLast = Data_Maybe.applicativeMaybe;
let altLast = new Alt(function () {
    return functorLast;
}, Data_Semigroup.append(semigroupLast));
let plusLast = new control.Plus(function () {
    return altLast;
}, Data_Monoid.mempty(monoidLast));
let alternativeLast = new Alternative(function () {
    return applicativeLast;
}, function () {
    return plusLast;
});
let monadZeroLast = new Control_MonadZero.MonadZero(function () {
    return alternativeLast;
}, function () {
    return monadLast;
});
module.exports = {
    Last: Last,
    newtypeLast: newtypeLast,
    eqLast: eqLast,
    eq1Last: eq1Last,
    ordLast: ordLast,
    ord1Last: ord1Last,
    boundedLast: boundedLast,
    functorLast: functorLast,
    invariantLast: invariantLast,
    applyLast: applyLast,
    applicativeLast: applicativeLast,
    bindLast: bindLast,
    monadLast: monadLast,
    extendLast: extendLast,
    showLast: showLast,
    semigroupLast: semigroupLast,
    monoidLast: monoidLast,
    altLast: altLast,
    plusLast: plusLast,
    alternativeLast: alternativeLast,
    monadZeroLast: monadZeroLast
};
