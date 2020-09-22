let control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");
let Flip = function (x) {
    return x;
};
let showFlip = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Flip " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let ordFlip = function (dictOrd) {
    return dictOrd;
};
let newtypeFlip = new Data_Newtype.Newtype(function (n) {
    return n;
}, Flip);
let functorFlip = function (dictBifunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return Data_Bifunctor.lmap(dictBifunctor)(f)(v);
        };
    });
};
let eqFlip = function (dictEq) {
    return dictEq;
};
let bifunctorFlip = function (dictBifunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (g) {
            return function (v) {
                return Data_Bifunctor.bimap(dictBifunctor)(g)(f)(v);
            };
        };
    });
};
let biapplyFlip = function (dictBiapply) {
    return new control.Biapply(function () {
        return bifunctorFlip(dictBiapply.Bifunctor0());
    }, function (v) {
        return function (v1) {
            return control.biapply(dictBiapply)(v)(v1);
        };
    });
};
let biapplicativeFlip = function (dictBiapplicative) {
    return new control.Biapplicative(function () {
        return biapplyFlip(dictBiapplicative.Biapply0());
    }, function (a) {
        return function (b) {
            return control.bipure(dictBiapplicative)(b)(a);
        };
    });
};
module.exports = {
    Flip: Flip,
    newtypeFlip: newtypeFlip,
    eqFlip: eqFlip,
    ordFlip: ordFlip,
    showFlip: showFlip,
    functorFlip: functorFlip,
    bifunctorFlip: bifunctorFlip,
    biapplyFlip: biapplyFlip,
    biapplicativeFlip: biapplicativeFlip
};
