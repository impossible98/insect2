const control = require("../control");
let Control_Monad_Gen = require("../Control.Monad.Gen/index.js");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");
let Data_Either = require("../Data.Either/index.js");
const data = require('../data');
let Data_Identity = require("../Data.Identity/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");


function lift2(dictApply) {
	return function (f) {
		return function (a) {
			return function (b) {
				return apply(dictApply)(data.map(dictApply.Functor0())(f)(a))(b);
			};
		};
	};
}

function pure(dict) {
	return dict.pure;
}

function genTuple(dictApply) {
	return lift2(dictApply)(Data_Tuple.Tuple.create);
}

function genNonEmpty(dictMonadRec) {
	return function (dictMonadGen) {
		return function (dictUnfoldable) {
			return function (gen) {
				return apply(((dictMonadGen.Monad0()).Bind1()).Apply0())(data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_NonEmpty.NonEmpty.create)(gen))(Control_Monad_Gen_Class.resize(dictMonadGen)((function () {
					let $12 = Data_Ord.max(Data_Ord.ordInt)(0);
					return function ($13) {
						return $12((function (v) {
							return v - 1 | 0;
						})($13));
					};
				})())(Control_Monad_Gen.unfoldable(dictMonadRec)(dictMonadGen)(dictUnfoldable)(gen)));
			};
		};
	};
}

function genMaybe$prime(dictMonadGen) {
	return function (bias) {
		return function (gen) {
			return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseFloat(dictMonadGen)(0.0)(1.0))(function (n) {
				let $10 = n < bias;
				if ($10) {
					return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Maybe.Just.create)(gen);
				};
				return pure((dictMonadGen.Monad0()).Applicative0())(Data_Maybe.Nothing.value);
			});
		};
	};
}

function genMaybe(dictMonadGen) {
	return genMaybe$prime(dictMonadGen)(0.75);
}

function genIdentity(dictFunctor) {
	return data.map(dictFunctor)(Data_Identity.Identity);
}

function genEither$prime(dictMonadGen) {
	return function (bias) {
		return function (genA) {
			return function (genB) {
				return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseFloat(dictMonadGen)(0.0)(1.0))(function (n) {
					let $11 = n < bias;
					if ($11) {
						return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Either.Left.create)(genA);
					};
					return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Either.Right.create)(genB);
				});
			};
		};
	};
}

function genEither(dictMonadGen) {
	return genEither$prime(dictMonadGen)(0.5);
}

module.exports = {
	genEither: genEither,
	"genEither'": genEither$prime,
	genIdentity: genIdentity,
	genMaybe: genMaybe,
	"genMaybe'": genMaybe$prime,
	genTuple: genTuple,
	genNonEmpty: genNonEmpty
};
