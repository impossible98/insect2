const control = require('../control');
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
const data = require('../data');
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");


let Wrap = function (x) {
    return x;
};
let showWrap = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Wrap " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let ordWrap = function (dictOrd) {
    return dictOrd;
};
let newtypeWrap = new Data_Newtype.Newtype(function (n) {
    return n;
}, Wrap);
let functorWrap = function (dictBifunctor) {
    return new data.Functor(function (f) {
        return function (v) {
            return Data_Bifunctor.rmap(dictBifunctor)(f)(v);
        };
    });
};
let eqWrap = function (dictEq) {
    return dictEq;
};
let bifunctorWrap = function (dictBifunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (g) {
            return function (v) {
                return Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v);
            };
        };
    });
};
let biapplyWrap = function (dictBiapply) {
    return new control.Biapply(function () {
        return bifunctorWrap(dictBiapply.Bifunctor0());
    }, function (v) {
        return function (v1) {
            return control.dict(dictBiapply)(v)(v1);
        };
    });
};
let biapplicativeWrap = function (dictBiapplicative) {
    return new control.Biapplicative(function () {
        return biapplyWrap(dictBiapplicative.Biapply0());
    }, function (a) {
        return function (b) {
            return control.bipure(dictBiapplicative)(a)(b);
        };
    });
};
module.exports = {
    Wrap: Wrap,
    newtypeWrap: newtypeWrap,
    eqWrap: eqWrap,
    ordWrap: ordWrap,
    showWrap: showWrap,
    functorWrap: functorWrap,
    bifunctorWrap: bifunctorWrap,
    biapplyWrap: biapplyWrap,
    biapplicativeWrap: biapplicativeWrap
};
