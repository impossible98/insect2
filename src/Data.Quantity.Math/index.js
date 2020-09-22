let control = require("../control");
let Data_Decimal = require("../Data.Decimal/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Quantity = require("../Data.Quantity/index.js");


let tau = Data_Quantity["scalar'"](mul(Data_Decimal.semiringDecimal)(Data_Decimal.fromNumber(2.0))(Data_Decimal.pi));
let max2 = lift2(Data_Decimal.max);
let min2 = lift2(Data_Decimal.min);
let modulo = lift2(Data_Decimal.modulo);
let ln = lift(Data_Decimal.ln);
let log10 = lift(Data_Decimal.log10);
let round = lift(Data_Decimal.round);
let sin = lift(Data_Decimal.sin);
let sinh = lift(Data_Decimal.sinh);
let tan = lift(Data_Decimal.tan);
let tanh = lift(Data_Decimal.tanh);
let gamma = lift(Data_Decimal.gamma);
let floor = lift(Data_Decimal.floor);
let factorial = lift(Data_Decimal.factorial);
let exp = lift(Data_Decimal.exp);
let e = Data_Quantity["scalar'"](Data_Decimal.e);
let cosh = lift(Data_Decimal.cosh);
let cos = lift(Data_Decimal.cos);
let ceil = lift(Data_Decimal.ceil);
let atanh = lift(Data_Decimal.atanh);
let atan = lift(Data_Decimal.atan);
let asinh = lift(Data_Decimal.asinh);
let asin = lift(Data_Decimal.asin);
let acosh = lift(Data_Decimal.acosh);
let acos = lift(Data_Decimal.acos);
let pi = Data_Quantity["scalar'"](Data_Decimal.pi);

function mul(dict) {
	return dict.mul;
}

function mean(xs) {
	let n = Data_Quantity["scalar'"](Data_Decimal.fromInt(Data_List_NonEmpty.length(xs)));
	return Data_Functor.map(Data_Either.functorEither)(function (v) {
		return Data_Quantity.qDivide(v)(n);
	})(Data_Foldable.foldM(Data_List_Types.foldableList)(Data_Either.monadEither)(Data_Quantity.qAdd)(Data_List_NonEmpty.head(xs))(Data_List_NonEmpty.tail(xs)));
}

function lift2(f) {
	return function (q1) {
		return function (q2) {
			let u = Data_Quantity.derivedUnit(q1);
			return control.bind(Data_Either.bindEither)(Data_Quantity["asValueIn'"](q1)(u))(function (v1) {
				return control.bind(Data_Either.bindEither)(Data_Quantity["asValueIn'"](q2)(u))(function (v2) {
					return control.pure(Data_Either.applicativeEither)(Data_Quantity["quantity'"](f(v1)(v2))(u));
				});
			});
		};
	};
}

function max(xs) {
	return Data_Foldable.foldM(Data_List_Types.foldableList)(Data_Either.monadEither)(max2)(Data_List_NonEmpty.head(xs))(Data_List_NonEmpty.tail(xs));
}

function min(xs) {
	return Data_Foldable.foldM(Data_List_Types.foldableList)(Data_Either.monadEither)(min2)(Data_List_NonEmpty.head(xs))(Data_List_NonEmpty.tail(xs));
}

function lift(fn) {
	return function (q) {
		return Data_Functor.map(Data_Either.functorEither)(function ($1) {
			return Data_Quantity["scalar'"](fn($1));
		})(Data_Quantity["toScalar'"](q));
	};
}

function atan2(x) {
	return function (y) {
		let removeDims = function (q) {
			return Data_Quantity.qDivide(q)(Data_Quantity.quantity(1.0)(Data_Quantity.derivedUnit(q)));
		};
		return Data_Functor.map(Data_Either.functorEither)(removeDims)(lift2(Data_Decimal.atan2)(x)(y));
	};
}

module.exports = {
	acos: acos,
	asin: asin,
	atan: atan,
	atan2: atan2,
	cos: cos,
	exp: exp,
	ln: ln,
	sin: sin,
	tan: tan,
	sinh: sinh,
	cosh: cosh,
	tanh: tanh,
	asinh: asinh,
	acosh: acosh,
	atanh: atanh,
	ceil: ceil,
	floor: floor,
	log10: log10,
	max2: max2,
	max: max,
	min2: min2,
	min: min,
	mean: mean,
	modulo: modulo,
	round: round,
	gamma: gamma,
	factorial: factorial,
	pi: pi,
	e: e,
	tau: tau
};
