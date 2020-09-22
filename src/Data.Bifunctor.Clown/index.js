let control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");


let apply = function (dict) {
	return dict.apply;
};

let Clown = function (x) {
    return x;
};
let showClown = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Clown " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let ordClown = function (dictOrd) {
    return dictOrd;
};
let newtypeClown = new Data_Newtype.Newtype(function (n) {
    return n;
}, Clown);
let functorClown = new Data_Functor.Functor(function (v) {
    return function (v1) {
        return v1;
    };
});
let eqClown = function (dictEq) {
    return dictEq;
};
let bifunctorClown = function (dictFunctor) {
    return new Data_Bifunctor.Bifunctor(function (f) {
        return function (v) {
            return function (v1) {
                return Data_Functor.map(dictFunctor)(f)(v1);
            };
        };
    });
};
let biapplyClown = function (dictApply) {
    return new control.Biapply(function () {
        return bifunctorClown(dictApply.Functor0());
    }, function (v) {
        return function (v1) {
            return apply(dictApply)(v)(v1);
        };
    });
};
let biapplicativeClown = function (dictApplicative) {
    return new control.Biapplicative(function () {
        return biapplyClown(dictApplicative.Apply0());
    }, function (a) {
        return function (v) {
            return control.pure(dictApplicative)(a);
        };
    });
};
module.exports = {
    Clown: Clown,
    newtypeClown: newtypeClown,
    eqClown: eqClown,
    ordClown: ordClown,
    showClown: showClown,
    functorClown: functorClown,
    bifunctorClown: bifunctorClown,
    biapplyClown: biapplyClown,
    biapplicativeClown: biapplicativeClown
};
