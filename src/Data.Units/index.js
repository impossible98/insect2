let Data_Decimal = require("../Data.Decimal/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Pair = require("../Data.Pair/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");


let refEq = function (r1) {
	return function (r2) {
		return r1 === r2;
	};
};

let eqNumberImpl = refEq;


let Eq = function (eq) {
	this.eq = eq;
};

let eqRecord = function (dict) {
	return dict.eqRecord;
};

let eqNumber = new Eq(eqNumberImpl);

let eq = function (dict) {
	return dict.eq;
};


let numAdd = function (n1) {
	return function (n2) {
		return n1 + n2;
	};
};

let numMul = function (n1) {
	return function (n2) {
		return n1 * n2;
	};
};


let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let zero = function (dict) {
	return dict.zero;
};


let semiringNumber = new Semiring(numAdd, numMul, 1.0, 0.0);

let one = function (dict) {
	return dict.one;
};

let mul = function (dict) {
	return dict.mul;
};


let add = function (dict) {
	return dict.add;
};


let Decimal = (function () {
    function Decimal() {

    };
    Decimal.value = new Decimal();
    return Decimal;
})();
let Binary = (function () {
    function Binary() {

    };
    Binary.value = new Binary();
    return Binary;
})();
let Prefix = (function () {
    function Prefix(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Prefix.create = function (value0) {
        return function (value1) {
            return new Prefix(value0, value1);
        };
    };
    return Prefix;
})();
let BaseUnit = function (x) {
    return x;
};
let Standard = (function () {
    function Standard() {

    };
    Standard.value = new Standard();
    return Standard;
})();
let NonStandard = (function () {
    function NonStandard(value0) {
        this.value0 = value0;
    };
    NonStandard.create = function (value0) {
        return new NonStandard(value0);
    };
    return NonStandard;
})();
let DerivedUnit = (function () {
    function DerivedUnit(value0) {
        this.value0 = value0;
    };
    DerivedUnit.create = function (value0) {
        return new DerivedUnit(value0);
    };
    return DerivedUnit;
})();
let unity$prime = {
    "short": "unity",
    "long": "unity",
    unitType: Standard.value
};
let unity = new DerivedUnit(Data_List_Types.Nil.value);
let split = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return {
                yes: Data_List_Types.Nil.value,
                no: Data_List_Types.Nil.value
            };
        };
        if (v1 instanceof Data_List_Types.Cons) {
            let res = split(v)(v1.value1);
            let $72 = v(v1.value0);
            if ($72) {
                return {
                    yes: new Data_List_Types.Cons(v1.value0, res.yes),
                    no: res.no
                };
            };
            return {
                yes: res.yes,
                no: new Data_List_Types.Cons(v1.value0, res.no)
            };
        };
        throw new Error("Failed pattern match at Data.Units (line 199, column 1 - line 199, column 69): " + [ v.constructor.name, v1.constructor.name ]);
    };
};
let sortBy$prime = function (f) {
    return function (v) {
        let sorted = Data_List.sortBy(f)(new Data_List_Types.Cons(v.value0, v.value1));
        let nel = (function () {
            let v1 = Data_List.uncons(sorted);
            if (v1 instanceof Data_Maybe.Just) {
                return new Data_NonEmpty.NonEmpty(v1.value0.head, v1.value0.tail);
            };
            if (v1 instanceof Data_Maybe.Nothing) {
                return new Data_NonEmpty.NonEmpty(v.value0, v.value1);
            };
            throw new Error("Failed pattern match at Data.Units (line 222, column 11 - line 224, column 45): " + [ v1.constructor.name ]);
        })();
        return nel;
    };
};
let shortName = function (v) {
    return v["short"];
};
let runDerivedUnit = function (v) {
    return v.value0;
};
let prettyExponent = function (v) {
    if (v === -5.0) {
        return "\u207b\u2075";
    };
    if (v === -4.0) {
        return "\u207b\u2074";
    };
    if (v === -3.0) {
        return "\u207b\xb3";
    };
    if (v === -2.0) {
        return "\u207b\xb2";
    };
    if (v === -1.0) {
        return "\u207b\xb9";
    };
    if (v === 1.0) {
        return "";
    };
    if (v === 2.0) {
        return "\xb2";
    };
    if (v === 3.0) {
        return "\xb3";
    };
    if (v === 4.0) {
        return "\u2074";
    };
    if (v === 5.0) {
        return "\u2075";
    };
    return "^(" + (Data_Show.show(Data_Show.showNumber)(v) + ")");
};
let prefixName = function (v) {
    if (v.value0 instanceof Decimal) {
        let pn = function (v1) {
            if (v1 === -18.0) {
                return new Data_Maybe.Just("a");
            };
            if (v1 === -12.0) {
                return new Data_Maybe.Just("p");
            };
            if (v1 === -15.0) {
                return new Data_Maybe.Just("f");
            };
            if (v1 === -9.0) {
                return new Data_Maybe.Just("n");
            };
            if (v1 === -6.0) {
                return new Data_Maybe.Just("\xb5");
            };
            if (v1 === -3.0) {
                return new Data_Maybe.Just("m");
            };
            if (v1 === -2.0) {
                return new Data_Maybe.Just("c");
            };
            if (v1 === -1.0) {
                return new Data_Maybe.Just("d");
            };
            if (v1 === 0.0) {
                return new Data_Maybe.Just("");
            };
            if (v1 === 2.0) {
                return new Data_Maybe.Just("h");
            };
            if (v1 === 3.0) {
                return new Data_Maybe.Just("k");
            };
            if (v1 === 6.0) {
                return new Data_Maybe.Just("M");
            };
            if (v1 === 9.0) {
                return new Data_Maybe.Just("G");
            };
            if (v1 === 12.0) {
                return new Data_Maybe.Just("T");
            };
            if (v1 === 15.0) {
                return new Data_Maybe.Just("P");
            };
            if (v1 === 18.0) {
                return new Data_Maybe.Just("E");
            };
            return Data_Maybe.Nothing.value;
        };
        return pn(Data_Decimal.toNumber(v.value1));
    };
    if (v.value0 instanceof Binary) {
        let pn = function (v1) {
            if (v1 === 0.0) {
                return new Data_Maybe.Just("");
            };
            if (v1 === 10.0) {
                return new Data_Maybe.Just("Ki");
            };
            if (v1 === 20.0) {
                return new Data_Maybe.Just("Mi");
            };
            if (v1 === 30.0) {
                return new Data_Maybe.Just("Gi");
            };
            if (v1 === 40.0) {
                return new Data_Maybe.Just("Ti");
            };
            if (v1 === 50.0) {
                return new Data_Maybe.Just("Pi");
            };
            if (v1 === 60.0) {
                return new Data_Maybe.Just("Ei");
            };
            if (v1 === 70.0) {
                return new Data_Maybe.Just("Zi");
            };
            if (v1 === 80.0) {
                return new Data_Maybe.Just("Yi");
            };
            return Data_Maybe.Nothing.value;
        };
        return pn(Data_Decimal.toNumber(v.value1));
    };
    throw new Error("Failed pattern match at Data.Units (line 415, column 1 - line 415, column 35): " + [ v.constructor.name ]);
};
let toString = function (v) {
    let usSorted = Data_List.sortBy(Data_Ord.comparing(Data_Ord.ordNumber)(function (rec) {
        return -rec.exponent;
    }))(v.value0);
    let toNum = function (v1) {
        if (v1 instanceof Decimal) {
            return 10;
        };
        if (v1 instanceof Binary) {
            return 2;
        };
        throw new Error("Failed pattern match at Data.Units (line 466, column 5 - line 466, column 23): " + [ v1.constructor.name ]);
    };
    let splitted = Data_List.span(function (rec) {
        return rec.exponent >= 0.0;
    })(usSorted);
    let reverseExp = function (rec) {
        return {
            exponent: -rec.exponent,
            baseUnit: rec.baseUnit,
            prefix: rec.prefix
        };
    };
    let prefixName$prime = function (v1) {
        return Data_Maybe.fromMaybe(Data_Show.show(Data_Show.showInt)(toNum(v1.value0)) + ("^" + (Data_Show.show(Data_Decimal.showDecimal)(v1.value1) + "\xb7")))(prefixName(v1));
    };
    let withExp = function (v1) {
        return prefixName$prime(v1.prefix) + (shortName(v1.baseUnit) + prettyExponent(v1.exponent));
    };
    let positiveUsStr = Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)("\xb7")(Data_Functor.map(Data_List_Types.functorList)(withExp)(splitted.init));
    let negativeUs = Data_List.sortBy(Data_Ord.comparing(Data_Ord.ordNumber)(function (v1) {
        return v1.exponent;
    }))(splitted.rest);
    let negativeUsStr = Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)("\xb7")(Data_Functor.map(Data_List_Types.functorList)(withExp)(negativeUs));
    let negativeUsStr$prime = Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)("\xb7")(Data_Functor.map(Data_List_Types.functorList)(function ($219) {
        return withExp(reverseExp($219));
    })(negativeUs));
    let unitString = (function () {
        if (splitted.init instanceof Data_List_Types.Nil) {
            return negativeUsStr;
        };
        if (negativeUs instanceof Data_List_Types.Nil) {
            return positiveUsStr;
        };
        if (negativeUs instanceof Data_List_Types.Cons && negativeUs.value1 instanceof Data_List_Types.Nil) {
            return positiveUsStr + ("/" + negativeUsStr$prime);
        };
        return positiveUsStr + ("/(" + (negativeUsStr$prime + ")"));
    })();
    return unitString;
};
let power = function (u) {
    return function (n) {
        let update = function (rec) {
            return {
                exponent: rec.exponent * n,
                baseUnit: rec.baseUnit,
                prefix: rec.prefix
            };
        };
        return DerivedUnit.create(Data_Functor.map(Data_List_Types.functorList)(update)(runDerivedUnit(u)));
    };
};
let noPrefix = new Prefix(Decimal.value, zero(Data_Decimal.semiringDecimal));
let removePrefix = function (v) {
    return DerivedUnit.create(Data_Functor.map(Data_List_Types.functorList)(function (v1) {
        return {
            prefix: noPrefix,
            baseUnit: v1.baseUnit,
            exponent: v1.exponent
        };
    })(v.value0));
};
let longName = function (v) {
    return v["long"];
};
let showBaseUnit = new Data_Show.Show(longName);
let showDerivedUnit = new Data_Show.Show(function (v) {
    let decPrf = function (v1) {
        return function (str) {
            if (v1 === -18.0) {
                return "(atto " + (str + ")");
            };
            if (v1 === -15.0) {
                return "(femto " + (str + ")");
            };
            if (v1 === -12.0) {
                return "(pico " + (str + ")");
            };
            if (v1 === -9.0) {
                return "(nano " + (str + ")");
            };
            if (v1 === -6.0) {
                return "(micro " + (str + ")");
            };
            if (v1 === -3.0) {
                return "(milli " + (str + ")");
            };
            if (v1 === 0.0) {
                return str;
            };
            if (v1 === 3.0) {
                return "(kilo " + (str + ")");
            };
            if (v1 === 6.0) {
                return "(mega " + (str + ")");
            };
            if (v1 === 9.0) {
                return "(giga " + (str + ")");
            };
            if (v1 === 12.0) {
                return "(tera " + (str + ")");
            };
            if (v1 === 15.0) {
                return "(peta " + (str + ")");
            };
            if (v1 === 18.0) {
                return "(exa " + (str + ")");
            };
            return "(decimalPrefix (" + (Data_Show.show(Data_Show.showNumber)(v1) + (") (" + (str + "))")));
        };
    };
    let binPrf = function (prefix) {
        return function (str) {
            return "(binaryPrefix (" + (Data_Show.show(Data_Show.showNumber)(prefix) + (") (" + (str + "))")));
        };
    };
    let addPrf = function (v1) {
        if (v1 instanceof Decimal) {
            return decPrf;
        };
        if (v1 instanceof Binary) {
            return binPrf;
        };
        throw new Error("Failed pattern match at Data.Units (line 345, column 7 - line 345, column 30): " + [ v1.constructor.name ]);
    };
    let show$prime = function (v1) {
        if (v1.exponent === 1.0) {
            return addPrf(v1.prefix.value0)(Data_Decimal.toNumber(v1.prefix.value1))(Data_Show.show(showBaseUnit)(v1.baseUnit));
        };
        if (eq(Data_Decimal.eqDecimal)(v1.prefix.value1)(zero(Data_Decimal.semiringDecimal))) {
            return Data_Show.show(showBaseUnit)(v1.baseUnit) + (" .^ (" + (Data_Show.show(Data_Show.showNumber)(v1.exponent) + ")"));
        };
        if (true) {
            return addPrf(v1.prefix.value0)(Data_Decimal.toNumber(v1.prefix.value1))(Data_Show.show(showBaseUnit)(v1.baseUnit)) + (" .^ (" + (Data_Show.show(Data_Show.showNumber)(v1.exponent) + ")"));
        };
        throw new Error("Failed pattern match at Data.Units (line 365, column 7 - line 366, column 49): " + [ v1.constructor.name ]);
    };
    let listString = function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return "unity";
        };
        if (v1 instanceof Data_List_Types.Cons && v1.value1 instanceof Data_List_Types.Nil) {
            return show$prime(v1.value0);
        };
        return "(" + (Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidString)(" <> ")(Data_Functor.map(Data_List_Types.functorList)(show$prime)(v1)) + ")");
    };
    return listString(v.value0);
});
let isStandardUnit = function (v) {
    if (v.unitType instanceof Standard) {
        return true;
    };
    return false;
};
let groupBy$prime = function (v) {
    return function (v1) {
        if (v1 instanceof Data_List_Types.Nil) {
            return Data_List_Types.Nil.value;
        };
        if (v1 instanceof Data_List_Types.Cons) {
            let v2 = split(v(v1.value0))(v1.value1);
            return new Data_List_Types.Cons(new Data_NonEmpty.NonEmpty(v1.value0, v2.yes), groupBy$prime(v)(v2.no));
        };
        throw new Error("Failed pattern match at Data.Units (line 212, column 1 - line 212, column 67): " + [ v.constructor.name, v1.constructor.name ]);
    };
};
let fromBaseUnit = function ($220) {
    return DerivedUnit.create(Data_List.singleton((function (v) {
        return {
            prefix: noPrefix,
            baseUnit: v,
            exponent: 1.0
        };
    })($220)));
};
let makeNonStandard = function ($$long) {
    return function ($$short) {
        return function (factor) {
            return function (standardUnit) {
                return fromBaseUnit({
                    "short": $$short,
                    "long": $$long,
                    unitType: new NonStandard({
                        standardUnit: standardUnit,
                        factor: Data_Decimal.fromNumber(factor)
                    })
                });
            };
        };
    };
};
let makeStandard = function ($$long) {
    return function ($$short) {
        return fromBaseUnit({
            "short": $$short,
            "long": $$long,
            unitType: Standard.value
        });
    };
};
let eqPrefixBase = new Eq(function (x) {
    return function (y) {
        if (x instanceof Decimal && y instanceof Decimal) {
            return true;
        };
        if (x instanceof Binary && y instanceof Binary) {
            return true;
        };
        return false;
    };
});
let withPrefix = function (base) {
    return function (p) {
        return function (v) {
            if (v.value0 instanceof Data_List_Types.Nil) {
                return DerivedUnit.create(Data_List.singleton({
                    prefix: new Prefix(base, Data_Decimal.fromNumber(p)),
                    baseUnit: unity$prime,
                    exponent: 1.0
                }));
            };
            let isPlaceholder = function (v1) {
                return v1.exponent === 1.0 && (eq(eqPrefixBase)(base)(v1.prefix.value0) || eq(Data_Decimal.eqDecimal)(v1.prefix.value1)(zero(Data_Decimal.semiringDecimal)));
            };
            let addPrefixExp = function (du) {
                return {
                    prefix: new Prefix(base, add(Data_Decimal.semiringDecimal)(Data_Decimal.fromNumber(p))(du.prefix.value1)),
                    baseUnit: du.baseUnit,
                    exponent: du.exponent
                };
            };
            return DerivedUnit.create((function () {
                let v1 = Data_List.findIndex(isPlaceholder)(v.value0);
                if (v1 instanceof Data_Maybe.Just) {
                    return Data_Maybe.fromMaybe(v.value0)(Data_List.modifyAt(v1.value0)(addPrefixExp)(v.value0));
                };
                if (v1 instanceof Data_Maybe.Nothing) {
                    return new Data_List_Types.Cons({
                        prefix: new Prefix(base, Data_Decimal.fromNumber(p)),
                        baseUnit: unity$prime,
                        exponent: 1.0
                    }, v.value0);
                };
                throw new Error("Failed pattern match at Data.Units (line 172, column 3 - line 175, column 91): " + [ v1.constructor.name ]);
            })());
        };
    };
};
let eqPrefix = new Eq(function (v) {
    return function (v1) {
        return eq(Data_Decimal.eqDecimal)(v.value1)(zero(Data_Decimal.semiringDecimal)) && eq(Data_Decimal.eqDecimal)(v1.value1)(zero(Data_Decimal.semiringDecimal)) || eq(eqPrefixBase)(v.value0)(v1.value0) && eq(Data_Decimal.eqDecimal)(v.value1)(v1.value1);
    };
});
let simplify = function (v) {
    let merge = function (units) {
        return {
            prefix: (Data_List_NonEmpty.head(units)).prefix,
            baseUnit: (Data_List_NonEmpty.head(units)).baseUnit,
            exponent: Data_Foldable.sum(Data_List_Types.foldableNonEmptyList)(semiringNumber)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(function (v1) {
                return v1.exponent;
            })(units))
        };
    };
    let go = (function () {
        let $221 = Data_List.filter(function (x) {
            return !(x.exponent === 0.0);
        });
        let $222 = Data_Functor.map(Data_List_Types.functorList)(merge);
        let $223 = groupBy$prime(function (u1) {
            return function (u2) {
                return eq(eqBaseUnit)(u1.baseUnit)(u2.baseUnit) && eq(eqPrefix)(u1.prefix)(u2.prefix);
            };
        });
        let $224 = Data_Functor.map(Data_List_Types.functorList)(Data_List_NonEmpty.toList);
        let $225 = groupBy$prime(function (u1) {
            return function (u2) {
                return eq(eqBaseUnit)(u1.baseUnit)(u2.baseUnit);
            };
        });
        return function ($226) {
            return $221($222($223(Data_List.concat($224($225($226))))));
        };
    })();
    return new DerivedUnit(go(v.value0));
};
let eqUnitType = new Eq(function (v) {
    return function (v1) {
        if (v instanceof Standard && v1 instanceof Standard) {
            return true;
        };
        if (v instanceof NonStandard && v1 instanceof NonStandard) {
            return eq(eqDerivedUnit)(v.value0.standardUnit)(v1.value0.standardUnit) && eq(Data_Decimal.eqDecimal)(v.value0.factor)(v1.value0.factor);
        };
        return false;
    };
});
let eqDerivedUnit = new Eq(function (u1) {
    return function (u2) {
        let removeUnity = Data_List.filter(function (u) {
            return longName(u.baseUnit) !== "unity";
        });
        let prepare = (function () {
            let $227 = Data_List.sortBy(Data_Ord.comparing(Data_Ord.ordString)(function ($229) {
                return shortName((function (v) {
                    return v.baseUnit;
                })($229));
            }));
            return function ($228) {
                return $227(runDerivedUnit(simplify($228)));
            };
        })();
        let list2 = prepare(u2);
        let list2$prime = removeUnity(list2);
        let list1 = prepare(u1);
        let list1$prime = removeUnity(list1);
        let globalPrefix = function (us) {
            let toPair = function (v) {
                if (v.value0 instanceof Decimal) {
                    return new Data_Pair.Pair(v.value1, zero(Data_Decimal.semiringDecimal));
                };
                if (v.value0 instanceof Binary) {
                    return new Data_Pair.Pair(zero(Data_Decimal.semiringDecimal), v.value1);
                };
                throw new Error("Failed pattern match at Data.Units (line 335, column 11 - line 335, column 50): " + [ v.constructor.name ]);
            };
            let prefixPair = function (v) {
                return Data_Functor.map(Data_Pair.functorPair)(function (v1) {
                    return mul(Data_Decimal.semiringDecimal)(v1)(Data_Decimal.fromNumber(v.exponent));
                })(toPair(v.prefix));
            };
            return Data_Functor.map(Data_Pair.functorPair)(Data_Newtype.un(Data_Newtype.newtypeAdditive)(Data_Monoid_Additive.Additive))(Data_Foldable.fold(Data_List_Types.foldableList)(Data_Pair.monoidPair(Data_Monoid_Additive.monoidAdditive(Data_Decimal.semiringDecimal)))(Data_Functor.map(Data_List_Types.functorList)((function () {
                let $230 = Data_Functor.map(Data_Pair.functorPair)(Data_Monoid_Additive.Additive);
                return function ($231) {
                    return $230(prefixPair($231));
                };
            })())(us)));
        };
        return eq(Data_List_Types.eqList(eqBaseUnit))(Data_Functor.map(Data_List_Types.functorList)(function (v) {
            return v.baseUnit;
        })(list1$prime))(Data_Functor.map(Data_List_Types.functorList)(function (v) {
            return v.baseUnit;
        })(list2$prime)) && (eq(Data_List_Types.eqList(eqNumber))(Data_Functor.map(Data_List_Types.functorList)(function (v) {
            return v.exponent;
        })(list1$prime))(Data_Functor.map(Data_List_Types.functorList)(function (v) {
            return v.exponent;
        })(list2$prime)) && eq(Data_Pair.eqPair(Data_Decimal.eqDecimal))(globalPrefix(list1))(globalPrefix(list2)));
    };
});
let eqBaseUnit = new Eq(function (v) {
    return function (v1) {
        return v["long"] === v1["long"] && (v["short"] === v1["short"] && eq(eqUnitType)(v.unitType)(v1.unitType));
    };
});
let semigroupDerivedUnit = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return simplify(new DerivedUnit(Data_Semigroup.append(Data_List_Types.semigroupList)(v.value0)(v1.value0)));
    };
});
let monoidDerivedUnit = new Data_Monoid.Monoid(function () {
    return semigroupDerivedUnit;
}, unity);
let divideUnits = function (du1) {
    return function (du2) {
        return Data_Semigroup.append(semigroupDerivedUnit)(du1)(power(du2)(-1.0));
    };
};
let decimalPrefix = withPrefix(Decimal.value);
let exa = decimalPrefix(18.0);
let femto = decimalPrefix(-15.0);
let giga = decimalPrefix(9.0);
let hecto = decimalPrefix(2.0);
let kilo = decimalPrefix(3.0);
let mega = decimalPrefix(6.0);
let micro = decimalPrefix(-6.0);
let milli = decimalPrefix(-3.0);
let nano = decimalPrefix(-9.0);
let peta = decimalPrefix(15.0);
let pico = decimalPrefix(-12.0);
let tera = decimalPrefix(12.0);
let deci = decimalPrefix(-1.0);
let conversionFactor = function (v) {
    if (v.unitType instanceof Standard) {
        return one(Data_Decimal.semiringDecimal);
    };
    if (v.unitType instanceof NonStandard) {
        return v.unitType.value0.factor;
    };
    throw new Error("Failed pattern match at Data.Units (line 123, column 3 - line 125, column 50): " + [ v.unitType.constructor.name ]);
};
let centi = decimalPrefix(-2.0);
let binaryPrefix = withPrefix(Binary.value);
let exbi = binaryPrefix(60.0);
let gibi = binaryPrefix(30.0);
let kibi = binaryPrefix(10.0);
let mebi = binaryPrefix(20.0);
let pebi = binaryPrefix(50.0);
let tebi = binaryPrefix(40.0);
let yobi = binaryPrefix(80.0);
let zebi = binaryPrefix(70.0);
let baseToStandard = function (v) {
    if (v.unitType instanceof Standard) {
        return fromBaseUnit(v);
    };
    if (v.unitType instanceof NonStandard) {
        return v.unitType.value0.standardUnit;
    };
    throw new Error("Failed pattern match at Data.Units (line 117, column 3 - line 119, column 56): " + [ v.unitType.constructor.name ]);
};
let splitByDimension = function (v) {
    let standardUnit = function ($232) {
        return baseToStandard((function (v1) {
            return v1.baseUnit;
        })($232));
    };
    let removeExponent = function (v1) {
        if (v1.value0 instanceof Data_List_Types.Cons && v1.value0.value1 instanceof Data_List_Types.Nil) {
            return DerivedUnit.create(Data_List.singleton({
                exponent: 1.0,
                baseUnit: v1.value0.value0.baseUnit,
                prefix: v1.value0.value0.prefix
            }));
        };
        return v1;
    };
    let standardUnitWithoutExponent = function ($233) {
        return removeExponent(standardUnit($233));
    };
    let heuristic = function (b1) {
        return function (b2) {
            return Data_Semigroup.append(Data_Ordering.semigroupOrdering)(Data_Ord.compare(Data_Ord.ordBoolean)(isStandardUnit(b1.baseUnit))(isStandardUnit(b2.baseUnit)))(Data_Ord.compare(Data_Ord.ordNumber)(b2.exponent)(b1.exponent));
        };
    };
    let exponentWRT = function (base) {
        return function (u) {
            let removedExponent = function (u$prime) {
                let v1 = standardUnit(u$prime);
                if (v1.value0 instanceof Data_List_Types.Cons && v1.value0.value1 instanceof Data_List_Types.Nil) {
                    return v1.value0.value0.exponent;
                };
                return 1.0;
            };
            return (u.exponent * removedExponent(u)) / removedExponent(base);
        };
    };
    let reduce = function (us$prime) {
        let us = sortBy$prime(Data_Functor.flip(heuristic))(us$prime);
        let first = Data_List_NonEmpty.head(us);
        let exp = Data_Foldable.sum(Data_List_Types.foldableNonEmptyList)(semiringNumber)(Data_Functor.map(Data_List_Types.functorNonEmptyList)(exponentWRT(first))(us));
        let convertTo = DerivedUnit.create(Data_List.singleton({
            exponent: exp,
            baseUnit: first.baseUnit,
            prefix: first.prefix
        }));
        return new Data_Tuple.Tuple(convertTo, DerivedUnit.create(Data_List_NonEmpty.toList(us)));
    };
    let transform = (function () {
        let $234 = Data_Functor.map(Data_List_Types.functorList)(reduce);
        let $235 = groupBy$prime(Data_Functor.on(eq(eqDerivedUnit))(standardUnitWithoutExponent));
        return function ($236) {
            return $234($235($236));
        };
    })();
    return transform(v.value0);
};
let toStandardUnit = function (v) {
    let convert = function (v1) {
        let toNum = function (v2) {
            if (v2 instanceof Decimal) {
                return Data_Decimal.fromNumber(10.0);
            };
            if (v2 instanceof Binary) {
                return Data_Decimal.fromNumber(2.0);
            };
            throw new Error("Failed pattern match at Data.Units (line 408, column 11 - line 408, column 42): " + [ v2.constructor.name ]);
        };
        let standardUnit = baseToStandard(v1.baseUnit);
        let factor = conversionFactor(v1.baseUnit);
        let exponent$prime = Data_Decimal.fromNumber(v1.exponent);
        return new Data_Tuple.Tuple(power(standardUnit)(v1.exponent), Data_Decimal.pow(mul(Data_Decimal.semiringDecimal)(Data_Decimal.pow(toNum(v1.prefix.value0))(v1.prefix.value1))(factor))(exponent$prime));
    };
    let converted = Data_Functor.map(Data_List_Types.functorList)(convert)(v.value0);
    let units$prime = Data_Foldable.foldMap(Data_List_Types.foldableList)(monoidDerivedUnit)(Data_Tuple.fst)(converted);
    let conv = Data_Foldable.product(Data_List_Types.foldableList)(Data_Decimal.semiringDecimal)(Data_Functor.map(Data_List_Types.functorList)(Data_Tuple.snd)(converted));
    return new Data_Tuple.Tuple(units$prime, conv);
};
let baseRepresentation = function (du) {
    if (eq(eqDerivedUnit)(du)(unity)) {
        return Data_List.singleton(du);
    };
    if (true) {
        let replace = function (u) {
            let v = runDerivedUnit(u);
            if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
                let b$prime = (function () {
                    let $216 = v["value0"]["baseUnit"]["long"] === "gram";
                    if ($216) {
                        return {
                            baseUnit: {
                                "long": "kilogram",
                                "short": "kg",
                                unitType: v.value0.baseUnit.unitType
                            },
                            exponent: v.value0.exponent,
                            prefix: v.value0.prefix
                        };
                    };
                    return v.value0;
                })();
                return new DerivedUnit(Data_List.singleton(b$prime));
            };
            return u;
        };
        let du$prime = Data_Tuple.fst(toStandardUnit(du));
        let us = Data_Functor.map(Data_List_Types.functorList)(function ($237) {
            return replace(Data_Tuple.snd($237));
        })(splitByDimension(du$prime));
        return us;
    };
    throw new Error("Failed pattern match at Data.Units (line 291, column 1 - line 291, column 52): " + [ du.constructor.name ]);
};
let atto = decimalPrefix(-18.0);
module.exports = {
    decimalPrefix: decimalPrefix,
    binaryPrefix: binaryPrefix,
    removePrefix: removePrefix,
    simplify: simplify,
    splitByDimension: splitByDimension,
    baseRepresentation: baseRepresentation,
    makeStandard: makeStandard,
    makeNonStandard: makeNonStandard,
    toStandardUnit: toStandardUnit,
    prefixName: prefixName,
    toString: toString,
    power: power,
    divideUnits: divideUnits,
    unity: unity,
    atto: atto,
    femto: femto,
    pico: pico,
    nano: nano,
    micro: micro,
    centi: centi,
    deci: deci,
    hecto: hecto,
    milli: milli,
    kilo: kilo,
    mega: mega,
    giga: giga,
    tera: tera,
    peta: peta,
    exa: exa,
    kibi: kibi,
    mebi: mebi,
    gibi: gibi,
    tebi: tebi,
    pebi: pebi,
    exbi: exbi,
    zebi: zebi,
    yobi: yobi,
    eqPrefix: eqPrefix,
    eqDerivedUnit: eqDerivedUnit,
    showDerivedUnit: showDerivedUnit,
    semigroupDerivedUnit: semigroupDerivedUnit,
    monoidDerivedUnit: monoidDerivedUnit
};
