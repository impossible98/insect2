const control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
const data = require('../data');
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");


let apply = function (dict) {
	return dict.apply;
};

let Joker = function (x) {
	return x;
};

let showJoker = function (dictShow) {
	return new Data_Show.Show(function (v) {
		return "(Joker " + (Data_Show.show(dictShow)(v) + ")");
	});
};

let ordJoker = function (dictOrd) {
	return dictOrd;
};

let newtypeJoker = new Data_Newtype.Newtype(function (n) {
	return n;
}, Joker);
let functorJoker = function (dictFunctor) {
	return new data.Functor(function (g) {
		return function (v) {
			return data.map(dictFunctor)(g)(v);
		};
	});
};

let eqJoker = function (dictEq) {
	return dictEq;
};

let bifunctorJoker = function (dictFunctor) {
	return new Data_Bifunctor.Bifunctor(function (v) {
		return function (g) {
			return function (v1) {
				return data.map(dictFunctor)(g)(v1);
			};
		};
	});
};

let biapplyJoker = function (dictApply) {
	return new control.Biapply(function () {
		return bifunctorJoker(dictApply.Functor0());
	}, function (v) {
		return function (v1) {
			return apply(dictApply)(v)(v1);
		};
	});

};

let biapplicativeJoker = function (dictApplicative) {
	return new control.Biapplicative(function () {
		return biapplyJoker(dictApplicative.Apply0());
	}, function (v) {
		return function (b) {
			return control.pure(dictApplicative)(b);
		};
	});
};

module.exports = {
	Joker: Joker,
	newtypeJoker: newtypeJoker,
	eqJoker: eqJoker,
	ordJoker: ordJoker,
	showJoker: showJoker,
	functorJoker: functorJoker,
	bifunctorJoker: bifunctorJoker,
	biapplyJoker: biapplyJoker,
	biapplicativeJoker: biapplicativeJoker
};
