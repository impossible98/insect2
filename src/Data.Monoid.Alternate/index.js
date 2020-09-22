const control = require('../control');
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
const data = require('../data');
let Data_Semigroup = require("../Data.Semigroup/index.js");

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

let Alternate = function (x) {
    return x;
};
let showAlternate = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Alternate " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let semigroupAlternate = function (dictAlt) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return alt(dictAlt)(v)(v1);
        };
    });
};
let plusAlternate = function (dictPlus) {
    return dictPlus;
};
let ordAlternate = function (dictOrd) {
    return dictOrd;
};
let ord1Alternate = function (dictOrd1) {
    return dictOrd1;
};
let newtypeAlternate = new Data_Newtype.Newtype(function (n) {
    return n;
}, Alternate);
let monoidAlternate = function (dictPlus) {
    return new Data_Monoid.Monoid(function () {
        return semigroupAlternate(dictPlus.Alt0());
    }, control.empty(dictPlus));
};
let monadAlternate = function (dictMonad) {
    return dictMonad;
};
let functorAlternate = function (dictFunctor) {
    return dictFunctor;
};
let extendAlternate = function (dictExtend) {
    return dictExtend;
};
let eqAlternate = function (dictEq) {
    return dictEq;
};
let eq1Alternate = function (dictEq1) {
    return dictEq1;
};
let comonadAlternate = function (dictComonad) {
    return dictComonad;
};
let boundedAlternate = function (dictBounded) {
    return dictBounded;
};
let bindAlternate = function (dictBind) {
    return dictBind;
};
let applyAlternate = function (dictApply) {
    return dictApply;
};
let applicativeAlternate = function (dictApplicative) {
    return dictApplicative;
};
let alternativeAlternate = function (dictAlternative) {
    return dictAlternative;
};
let altAlternate = function (dictAlt) {
    return dictAlt;
};
module.exports = {
    Alternate: Alternate,
    newtypeAlternate: newtypeAlternate,
    eqAlternate: eqAlternate,
    eq1Alternate: eq1Alternate,
    ordAlternate: ordAlternate,
    ord1Alternate: ord1Alternate,
    boundedAlternate: boundedAlternate,
    functorAlternate: functorAlternate,
    applyAlternate: applyAlternate,
    applicativeAlternate: applicativeAlternate,
    altAlternate: altAlternate,
    plusAlternate: plusAlternate,
    alternativeAlternate: alternativeAlternate,
    bindAlternate: bindAlternate,
    monadAlternate: monadAlternate,
    extendAlternate: extendAlternate,
    comonadAlternate: comonadAlternate,
    showAlternate: showAlternate,
    semigroupAlternate: semigroupAlternate,
    monoidAlternate: monoidAlternate
};
