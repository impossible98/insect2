let Control_MonadZero = require("../Control.MonadZero/index.js");
const control = require("../control");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Functor = require("../Data.Functor/index.js");


class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}
let altArray = new Alt(function () {
	return Data_Functor.functorArray;
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
let First = function (x) {
    return x;
};
let showFirst = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "First (" + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
    });
};
let semigroupFirst = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v instanceof Data_Maybe.Just) {
            return v;
        };
        return v1;
    };
});
let ordFirst = function (dictOrd) {
    return Data_Maybe.ordMaybe(dictOrd);
};
let ord1First = Data_Maybe.ord1Maybe;
let newtypeFirst = new Data_Newtype.Newtype(function (n) {
    return n;
}, First);
let monoidFirst = new Data_Monoid.Monoid(function () {
    return semigroupFirst;
}, Data_Maybe.Nothing.value);
let monadFirst = Data_Maybe.monadMaybe;
let invariantFirst = Data_Maybe.invariantMaybe;
let functorFirst = Data_Maybe.functorMaybe;
let extendFirst = Data_Maybe.extendMaybe;
let eqFirst = function (dictEq) {
    return Data_Maybe.eqMaybe(dictEq);
};
let eq1First = Data_Maybe.eq1Maybe;
let boundedFirst = function (dictBounded) {
    return Data_Maybe.boundedMaybe(dictBounded);
};
let bindFirst = Data_Maybe.bindMaybe;
let applyFirst = Data_Maybe.applyMaybe;
let applicativeFirst = Data_Maybe.applicativeMaybe;
let altFirst = new Alt(function () {
    return functorFirst;
}, Data_Semigroup.append(semigroupFirst));
let plusFirst = new control.Plus(function () {
    return altFirst;
}, Data_Monoid.mempty(monoidFirst));
let alternativeFirst = new Alternative(function () {
    return applicativeFirst;
}, function () {
    return plusFirst;
});
let monadZeroFirst = new Control_MonadZero.MonadZero(function () {
    return alternativeFirst;
}, function () {
    return monadFirst;
});
module.exports = {
    First: First,
    newtypeFirst: newtypeFirst,
    eqFirst: eqFirst,
    eq1First: eq1First,
    ordFirst: ordFirst,
    ord1First: ord1First,
    boundedFirst: boundedFirst,
    functorFirst: functorFirst,
    invariantFirst: invariantFirst,
    applyFirst: applyFirst,
    applicativeFirst: applicativeFirst,
    bindFirst: bindFirst,
    monadFirst: monadFirst,
    extendFirst: extendFirst,
    showFirst: showFirst,
    semigroupFirst: semigroupFirst,
    monoidFirst: monoidFirst,
    altFirst: altFirst,
    plusFirst: plusFirst,
    alternativeFirst: alternativeFirst,
    monadZeroFirst: monadZeroFirst
};
