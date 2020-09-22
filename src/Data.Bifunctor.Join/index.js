const control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let Join = function (x) {
    return x;
};
let showJoin = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Join " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let ordJoin = function (dictOrd) {
    return dictOrd;
};
let newtypeJoin = new Data_Newtype.Newtype(function (n) {
    return n;
}, Join);
let eqJoin = function (dictEq) {
    return dictEq;
};
let bifunctorJoin = function (dictBifunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (v) {
            return Data_Bifunctor.bimap(dictBifunctor)(f)(f)(v);
        };
    });
};
let biapplyJoin = function (dictBiapply) {
    return new Apply(function () {
        return bifunctorJoin(dictBiapply.Bifunctor0());
    }, function (v) {
        return function (v1) {
            return control.biapply(dictBiapply)(v)(v1);
        };
    });
};
let biapplicativeJoin = function (dictBiapplicative) {
    return new control.Applicative(function () {
        return biapplyJoin(dictBiapplicative.Biapply0());
    }, function (a) {
        return control.bipure(dictBiapplicative)(a)(a);
    });
};
module.exports = {
    Join: Join,
    newtypeJoin: newtypeJoin,
    eqJoin: eqJoin,
    ordJoin: ordJoin,
    showJoin: showJoin,
    bifunctorJoin: bifunctorJoin,
    biapplyJoin: biapplyJoin,
    biapplicativeJoin: biapplicativeJoin
};
