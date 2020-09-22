const control = require('../control');
let Data_Decimal = require("../Data.Decimal/index.js");
let Data_Either = require("../Data.Either/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Number_Approximate = require("../Data.Number.Approximate/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Units = require("../Data.Units/index.js");
let Data_Units_SI_Accepted = require("../Data.Units.SI.Accepted/index.js");
let Data_Units_SI_Derived = require("../Data.Units.SI.Derived/index.js");


let zero = function (dict) {
	return dict.zero;
};

let one = function (dict) {
	return dict.one;
};

let mul = function (dict) {
	return dict.mul;
};


let add = function (dict) {
	return dict.add;
};

let Quantity = (function () {
    function Quantity(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Quantity.create = function (value0) {
        return function (value1) {
            return new Quantity(value0, value1);
        };
    };
    return Quantity;
})();
let ConversionError = (function () {
    function ConversionError(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    ConversionError.create = function (value0) {
        return function (value1) {
            return new ConversionError(value0, value1);
        };
    };
    return ConversionError;
})();
let value = function (v) {
    return v.value0;
};
let showQuantity = new Data_Show.Show(function (v) {
    return Data_Show.show(Data_Decimal.showDecimal)(v.value0) + (" .* " + Data_Show.show(Data_Units.showDerivedUnit)(v.value1));
});
let showConversionError = new Data_Show.Show(function (v) {
    return "ConversionError (" + (Data_Show.show(Data_Units.showDerivedUnit)(v.value0) + (")" + (" (" + (Data_Show.show(Data_Units.showDerivedUnit)(v.value1) + ")"))));
});
let quantity$prime = function (n) {
    return function (du) {
        return new Quantity(n, du);
    };
};
let scalar$prime = function (factor) {
    return quantity$prime(factor)(Data_Units.unity);
};
let toStandard = function (v) {
    let v1 = Data_Units.toStandardUnit(v.value1);
    return quantity$prime(mul(Data_Decimal.semiringDecimal)(v1.value1)(v.value0))(v1.value0);
};
let quantity = function (n) {
    return function (du) {
        return new Quantity(Data_Decimal.fromNumber(n), du);
    };
};
let scalar = function (factor) {
    return quantity(factor)(Data_Units.unity);
};
let qNegate = function (v) {
    return new Quantity(data.negate(Data_Decimal.ringDecimal)(v.value0), v.value1);
};
let qMultiply = function (v) {
    return function (v1) {
        return quantity$prime(mul(Data_Decimal.semiringDecimal)(v.value0)(v1.value0))(Data_Semigroup.append(Data_Units.semigroupDerivedUnit)(v.value1)(v1.value1));
    };
};
let qDivide = function (v) {
    return function (v1) {
        return quantity$prime(data.div(Data_Decimal.euclideanRingDecimal)(v.value0)(v1.value0))(Data_Units.divideUnits(v.value1)(v1.value1));
    };
};
let prettyDecimal = function (d) {
    let $63 = Data_Decimal.isInteger(d) && Data_Ord.lessThan(Data_Decimal.ordDecimal)(d)(Data_Decimal.fromNumber(1.0e18));
    if ($63) {
        return Data_Decimal.toString(d);
    };
    return Data_Decimal.toString(Data_Decimal.toSignificantDigits(6)(d));
};
let prettyPrint$prime = function (v) {
    if (data.eq(Data_Units.eqDerivedUnit)(v.value1)(Data_Units.unity)) {
        return {
            number: prettyDecimal(v.value0),
            space: false,
            unit: ""
        };
    };
    if (true) {
        let space = data.notEq(Data_Units.eqDerivedUnit)(v.value1)(Data_Units_SI_Accepted.degree);
        return {
            number: prettyDecimal(v.value0),
            space: space,
            unit: Data_Units.toString(v.value1)
        };
    };
    throw new Error("Failed pattern match at Data.Quantity (line 105, column 1 - line 105, column 78): " + [ v.constructor.name ]);
};
let prettyPrint = function (q) {
    let v = prettyPrint$prime(q);
    let space = (function () {
        if (v.space) {
            return " ";
        };
        return "";
    })();
    return v.number + (space + v.unit);
};
let pow = function (v) {
    return function (exp) {
        return quantity$prime(Data_Decimal.pow(v.value0)(exp))(Data_Units.power(v.value1)(Data_Decimal.toNumber(exp)));
    };
};
let sqrt = function (q) {
    return pow(q)(Data_Decimal.fromNumber(0.5));
};
let $$isFinite = function (v) {
    return Data_Decimal["isFinite"](v.value0);
};
let errorMessage = function (v) {
    let baseRep = function (u) {
        let u$prime = Data_Tuple.fst(Data_Units.toStandardUnit(u));
        let $77 = data.eq(Data_Units.eqDerivedUnit)(u$prime)(Data_Units.unity);
        if ($77) {
            return "";
        };
        return " (SI: '" + (Data_Units.toString(u$prime) + "')");
    };
    let $78 = data.eq(Data_Units.eqDerivedUnit)(v.value0)(Data_Units.unity);
    if ($78) {
        return "Cannot convert quantity of unit '" + (Data_Units.toString(v.value1) + "' to a scalar");
    };
    let $79 = data.eq(Data_Units.eqDerivedUnit)(v.value1)(Data_Units.unity);
    if ($79) {
        return "Cannot convert quantity of unit '" + (Data_Units.toString(v.value0) + "' to a scalar");
    };
    return "Cannot convert unit '" + (Data_Units.toString(v.value0) + ("'" + (baseRep(v.value0) + ("\x0a" + ("            to unit '" + (Data_Units.toString(v.value1) + ("'" + (baseRep(v.value1) + ""))))))));
};
let showResult = function (v) {
    if (v instanceof Data_Either.Left) {
        return errorMessage(v.value0);
    };
    if (v instanceof Data_Either.Right) {
        return prettyPrint(v.value0);
    };
    throw new Error("Failed pattern match at Data.Quantity (line 120, column 1 - line 120, column 54): " + [ v.constructor.name ]);
};
let eqConversionError = new data.Eq(function (x) {
    return function (y) {
        return data.eq(Data_Units.eqDerivedUnit)(x.value0)(y.value0) && data.eq(Data_Units.eqDerivedUnit)(x.value1)(y.value1);
    };
});
let derivedUnit = function (v) {
    return v.value1;
};
let eqQuantity = new data.Eq(function (q1) {
    return function (q2) {
        let q2$prime = toStandard(q2);
        let u2 = derivedUnit(q2$prime);
        let v2 = value(q2$prime);
        let q1$prime = toStandard(q1);
        let u1 = derivedUnit(q1$prime);
        let v1 = value(q1$prime);
        return data.eq(Data_Decimal.eqDecimal)(v1)(v2) && data.eq(Data_Units.eqDerivedUnit)(u1)(u2) || data.eq(Data_Decimal.eqDecimal)(v1)(zero(Data_Decimal.semiringDecimal)) && data.eq(Data_Decimal.eqDecimal)(v2)(zero(Data_Decimal.semiringDecimal));
    };
});
let convert = function (to) {
    return function (v) {
        if (data.eq(Data_Units.eqDerivedUnit)(to)(v.value1)) {
            return new Data_Either.Right(new Quantity(v.value0, to));
        };
        if (data.eq(Data_Decimal.eqDecimal)(v.value0)(zero(Data_Decimal.semiringDecimal))) {
            return new Data_Either.Right(new Quantity(zero(Data_Decimal.semiringDecimal), to));
        };
        if (true) {
            let v1 = Data_Units.toStandardUnit(to);
            let q$prime = toStandard(v);
            let from$prime = derivedUnit(q$prime);
            let $97 = data.eq(Data_Units.eqDerivedUnit)(from$prime)(v1.value0);
            if ($97) {
                return Data_Either.Right.create(new Quantity(data.div(Data_Decimal.euclideanRingDecimal)(q$prime.value0)(v1.value1), to));
            };
            return Data_Either.Left.create(new ConversionError(v.value1, to));
        };
        throw new Error("Failed pattern match at Data.Quantity (line 215, column 1 - line 215, column 67): " + [ to.constructor.name, v.constructor.name ]);
    };
};
let convertTo = data.flip(convert);
let qAdd = function (v) {
    return function (v1) {
        if (data.eq(Data_Decimal.eqDecimal)(v.value0)(zero(Data_Decimal.semiringDecimal))) {
            return control.pure(Data_Either.applicativeEither)(v1);
        };
        if (data.eq(Data_Decimal.eqDecimal)(v1.value0)(zero(Data_Decimal.semiringDecimal))) {
            return control.pure(Data_Either.applicativeEither)(v);
        };
        if (true) {
            return control.bind(Data_Either.bindEither)(convertTo(v1)(v.value1))(function (q2$prime) {
                return control.pure(Data_Either.applicativeEither)(quantity$prime(add(Data_Decimal.semiringDecimal)(v.value0)(q2$prime.value0))(v.value1));
            });
        };
        throw new Error("Failed pattern match at Data.Quantity (line 262, column 1 - line 262, column 61): " + [ v.constructor.name, v1.constructor.name ]);
    };
};
let qSubtract = function (q1) {
    return function (v) {
        return qAdd(q1)(new Quantity(data.negate(Data_Decimal.ringDecimal)(v.value0), v.value1));
    };
};
let asValueIn$prime = function (u) {
    return control.composeKleisli(Data_Either.bindEither)(convertTo(u))((function () {
        let $136 = control.pure(Data_Either.applicativeEither);
        return function ($137) {
            return $136(value($137));
        };
    })());
};
let toScalar$prime = function (q) {
    return asValueIn$prime(q)(Data_Units.unity);
};
let fullSimplify = function (v) {
    let v1 = toScalar$prime(v);
    if (v1 instanceof Data_Either.Right) {
        let $120 = data.notEq(Data_Units.eqDerivedUnit)(Data_Units.removePrefix(v.value1))(Data_Units_SI_Accepted.degree) && data.notEq(Data_Units.eqDerivedUnit)(Data_Units.removePrefix(v.value1))(Data_Units_SI_Derived.radian);
        if ($120) {
            return new Quantity(v1.value0, Data_Units.unity);
        };
        return quantity$prime(v.value0)(v.value1);
    };
    if (v1 instanceof Data_Either.Left) {
        let toTuple = function (v2) {
            let v3 = convertTo(quantity(1)(v2.value1))(v2.value0);
            if (v3 instanceof Data_Either.Right) {
                return new Data_Tuple.Tuple(v3.value0.value0, v3.value0.value1);
            };
            if (v3 instanceof Data_Either.Left) {
                return new Data_Tuple.Tuple(one(Data_Decimal.semiringDecimal), v2.value0);
            };
            throw new Error("Failed pattern match at Data.Quantity (line 151, column 13 - line 153, column 55): " + [ v3.constructor.name ]);
        };
        let list = Data_Units.splitByDimension(v.value1);
        let list$prime = data.map(Data_List_Types.functorList)(toTuple)(list);
        let factor = Data_Foldable.product(Data_List_Types.foldableList)(Data_Decimal.semiringDecimal)(data.map(Data_List_Types.functorList)(Data_Tuple.fst)(list$prime));
        let du$prime = Data_Foldable.foldMap(Data_List_Types.foldableList)(Data_Units.monoidDerivedUnit)(Data_Tuple.snd)(list$prime);
        return new Quantity(mul(Data_Decimal.semiringDecimal)(v.value0)(factor), du$prime);
    };
    throw new Error("Failed pattern match at Data.Quantity (line 142, column 3 - line 160, column 32): " + [ v1.constructor.name ]);
};
let asValueIn = function (q) {
    return function (u) {
        return data.map(Data_Either.functorEither)(Data_Decimal.toNumber)(asValueIn$prime(q)(u));
    };
};
let toScalar = function (q) {
    return asValueIn(q)(Data_Units.unity);
};
let approximatelyEqual = function (tol) {
    return function (q1$prime) {
        return function (q2$prime) {
            let q2 = toStandard(q2$prime);
            let v2 = Data_Decimal.toNumber(value(q2));
            let q1 = toStandard(q1$prime);
            let v1 = Data_Decimal.toNumber(value(q1));
            return data.eq(Data_Units.eqDerivedUnit)(derivedUnit(q1))(derivedUnit(q2)) && Data_Number_Approximate.eqRelative(tol)(v1)(v2);
        };
    };
};
let abs = function (v) {
    return quantity$prime(Data_Decimal.abs(v.value0))(v.value1);
};
module.exports = {
    quantity: quantity,
    "quantity'": quantity$prime,
    "prettyPrint'": prettyPrint$prime,
    prettyPrint: prettyPrint,
    showResult: showResult,
    derivedUnit: derivedUnit,
    toStandard: toStandard,
    fullSimplify: fullSimplify,
    approximatelyEqual: approximatelyEqual,
    ConversionError: ConversionError,
    errorMessage: errorMessage,
    scalar: scalar,
    "scalar'": scalar$prime,
    convert: convert,
    convertTo: convertTo,
    asValueIn: asValueIn,
    "asValueIn'": asValueIn$prime,
    toScalar: toScalar,
    "toScalar'": toScalar$prime,
    "isFinite": $$isFinite,
    qNegate: qNegate,
    qAdd: qAdd,
    qSubtract: qSubtract,
    qMultiply: qMultiply,
    qDivide: qDivide,
    pow: pow,
    abs: abs,
    sqrt: sqrt,
    eqQuantity: eqQuantity,
    showQuantity: showQuantity,
    eqConversionError: eqConversionError,
    showConversionError: showConversionError
};
