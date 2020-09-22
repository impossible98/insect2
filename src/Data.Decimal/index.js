let $foreign = require("./foreign.js");
let Data_CommutativeRing = require("../Data.CommutativeRing/index.js");
let Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Ring = require("../Data.Ring/index.js");
let Data_Show = require("../Data.Show/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let zero = function (dict) {
	return dict.zero;
};

let one = function (dict) {
	return dict.one;
};


let add = function (dict) {
	return dict.add;
};

let showDecimal = new Data_Show.Show(function (x) {
    return "(fromString \"" + ($foreign.toString(x) + "\")");
});

let semiringDecimal = new Semiring($foreign.dAdd, $foreign.dMul, $foreign.fromInt(1), $foreign.fromInt(0));

let ringDecimal = new Data_Ring.Ring(function () {
    return semiringDecimal;
}, $foreign.dSub);

let fromString = $foreign["fromString'"](Data_Maybe.Nothing.value)(Data_Maybe.Just.create);

let eqDecimal = new Eq($foreign.dEquals);
let ordDecimal = new Data_Ord.Ord(function () {
    return eqDecimal;
}, function (x) {
    return function (y) {
        let v = $foreign.dCompare(x)(y);
        if (v === 1) {
            return Data_Ordering.GT.value;
        };
        if (v === 0) {
            return Data_Ordering.EQ.value;
        };
        return Data_Ordering.LT.value;
    };
});

let commutativeRingDecimal = new Data_CommutativeRing.CommutativeRing(function () {
    return ringDecimal;
});

let euclideanRingDecimal = new Data_EuclideanRing.EuclideanRing(function () {
    return commutativeRingDecimal;
}, function (v) {
    return 1;
}, $foreign.dDiv, function (v) {
    return function (v1) {
        return zero(semiringDecimal);
    };
});

function factorial (n) {
    if (Data_Ord.lessThan(ordDecimal)(n)(zero(semiringDecimal))) {
        return Data_EuclideanRing.div(euclideanRingDecimal)(one(semiringDecimal))(zero(semiringDecimal));
    };
    if (true) {
        return $foreign.gamma($foreign.ceil(add(semiringDecimal)(n)(one(semiringDecimal))));
    };
    throw new Error("Failed pattern match at Data.Decimal (line 231, column 1 - line 231, column 30): " + [ n.constructor.name ]);
}

module.exports = {
    fromString: fromString,
    factorial: factorial,
    eqDecimal: eqDecimal,
    ordDecimal: ordDecimal,
    showDecimal: showDecimal,
    semiringDecimal: semiringDecimal,
    ringDecimal: ringDecimal,
    commutativeRingDecimal: commutativeRingDecimal,
    euclideanRingDecimal: euclideanRingDecimal,
    fromInt: $foreign.fromInt,
    fromNumber: $foreign.fromNumber,
    toNumber: $foreign.toNumber,
    toString: $foreign.toString,
    toPrecision: $foreign.toPrecision,
    toFixed: $foreign.toFixed,
    "isFinite": $foreign["isFinite"],
    isInteger: $foreign.isInteger,
    toSignificantDigits: $foreign.toSignificantDigits,
    abs: $foreign.abs,
    acos: $foreign.acos,
    acosh: $foreign.acosh,
    asin: $foreign.asin,
    asinh: $foreign.asinh,
    atan: $foreign.atan,
    atan2: $foreign.atan2,
    atanh: $foreign.atanh,
    ceil: $foreign.ceil,
    cos: $foreign.cos,
    cosh: $foreign.cosh,
    exp: $foreign.exp,
    floor: $foreign.floor,
    ln: $foreign.ln,
    log2: $foreign.log2,
    log10: $foreign.log10,
    max: $foreign.max,
    min: $foreign.min,
    modulo: $foreign.modulo,
    pow: $foreign.pow,
    round: $foreign.round,
    sin: $foreign.sin,
    sinh: $foreign.sinh,
    sqrt: $foreign.sqrt,
    tan: $foreign.tan,
    tanh: $foreign.tanh,
    truncated: $foreign.truncated,
    e: $foreign.e,
    pi: $foreign.pi,
    gamma: $foreign.gamma
};
