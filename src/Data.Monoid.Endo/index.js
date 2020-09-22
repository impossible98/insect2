let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}


function identity(dict) {
	return dict.identity;
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});


function compose(dict) {
	return dict.compose;
}

let Endo = function (x) {
    return x;
};
let showEndo = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Endo " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let semigroupEndo = function (dictSemigroupoid) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return compose(dictSemigroupoid)(v)(v1);
        };
    });
};
let ordEndo = function (dictOrd) {
    return dictOrd;
};
let monoidEndo = function (dictCategory) {
    return new Data_Monoid.Monoid(function () {
        return semigroupEndo(dictCategory.Semigroupoid0());
    }, identity(dictCategory));
};
let eqEndo = function (dictEq) {
    return dictEq;
};
let boundedEndo = function (dictBounded) {
    return dictBounded;
};
module.exports = {
    Endo: Endo,
    eqEndo: eqEndo,
    ordEndo: ordEndo,
    boundedEndo: boundedEndo,
    showEndo: showEndo,
    semigroupEndo: semigroupEndo,
    monoidEndo: monoidEndo
};
