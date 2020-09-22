let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Eq = require("../Data.Eq/index.js");
let Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
const data = require("../data");
let Data_Show = require("../Data.Show/index.js");


const base36 = 36;
const binary = 2;
const decimal = 10;
const hexadecimal = 16;
const octal = 8;

class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Control2 {
	constructor(kw, kw2) {
		this.kw = kw;
		this.kw2 = kw2;
	}
}

class Control4 {
	constructor(kw, kw2, kw3, kw4) {
		this.kw = kw;
		this.kw2 = kw2;
		this.kw3 = kw3;
		this.kw4 = kw4;
	}
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Control2(function () {
	return semigroupoidFn;
}, function (x) {
	return x;
});

function dict(arg) {
	return arg.dict;
}

function fromNumberImpl(just) {
	return function (nothing) {
		return function (n) {
			return (n | 0) === n ? just(n) : nothing;
		};
	};
}

function toNumber(n) {
	return n;
}

function fromStringAsImpl(just) {
	return function (nothing) {
		return function (radix) {
			let digits;
			if (radix < 11) {
				digits = "[0-" + (radix - 1).toString() + "]";
			} else if (radix === 11) {
				digits = "[0-9a]";
			} else {
				digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
			}
			let pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");

			return function (s) {
				if (pattern.test(s)) {
					let i = parseInt(s, radix);
					return (i | 0) === i ? just(i) : nothing;
				} else {
					return nothing;
				}
			};
		};
	};
}

function odd(arg) {
	return (arg & 1) !== 0;
}

function pow(arg) {
	return (arg2) => {
		return Math.pow(arg, arg2) | 0;
	};
}
function quot(arg) {
	return (arg2) => {
		return arg / arg2 | 0;
	};
}

function rem(arg) {
	return (arg2) => {
		return arg % arg2;
	};
}

function toStringAs(arg) {
	return (arg2) => {
		return arg2.toStringa(arg);
	};
}

let Even = (function () {
	function Even() {

	};
	Even.value = new Even();
	return Even;
})();

let Odd = (function () {
	function Odd() {

	};
	Odd.value = new Odd();
	return Odd;
})();

let showParity = new Data_Show.Show(function (v) {
	if (v instanceof Even) {
		return "Even";
	};
	if (v instanceof Odd) {
		return "Odd";
	};
	throw new Error("Failed pattern match at Data.Int (line 112, column 1 - line 114, column 19): " + [v.constructor.name]);
});

function radix(arg) {
	if (arg >= 2 && arg <= 36) {
		return new Data_Maybe.Just(n);
	}

	if (true) {
		return Data_Maybe.Nothing.value;
	}

	throw new Error("Failed pattern match at Data.Int (line 193, column 1 - line 193, column 28): " + [arg.constructor.name]);
}


let fromStringAs = fromStringAsImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let fromString = fromStringAs(10);
let fromNumber = fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

function unsafeClamp(arg) {
	if (arg === Infinity) {
		return 0;
	};
	if (arg === -Infinity) {
		return 0;
	};
	if (arg >= toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
		return Data_Bounded.top(Data_Bounded.boundedInt);
	};
	if (arg <= toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
		return Data_Bounded.bottom(Data_Bounded.boundedInt);
	};
	if (true) {
		return Data_Maybe.fromMaybe(0)(fromNumber(arg));
	};
	throw new Error("Failed pattern match at Data.Int (line 66, column 1 - line 66, column 29): " + [arg.constructor.name]);
}

function ceil(arg) {
	return unsafeClamp(Math.ceil(arg));
}

function even(arg) {
	return (arg & 1) === 0;
}

function floor(arg) {
	return unsafeClamp(Math.floor(arg));
}

function parity(arg) {
	let arg2 = even(arg);

	if (arg2) {
		return Even.value;
	};

	return Odd.value;
}

function round(arg) {
	return unsafeClamp(Math.round(arg));
}

let eqParity = new Data_Eq.Eq(function (x) {
	return function (y) {
		if (x instanceof Even && y instanceof Even) {
			return true;
		};
		if (x instanceof Odd && y instanceof Odd) {
			return true;
		};
		return false;
	};
});

let ordParity = new Data_Ord.Ord(function () {
	return eqParity;
}, function (x) {
	return function (y) {
		if (x instanceof Even && y instanceof Even) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Even) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Even) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Odd && y instanceof Odd) {
			return Data_Ordering.EQ.value;
		};
		throw new Error("Failed pattern match at Data.Int (line 110, column 1 - line 110, column 40): " + [x.constructor.name, y.constructor.name]);
	};
});

let semiringParity = new Control4(function (x) {
	return function (y) {
		let $19 = Data_Eq.eq(eqParity)(x)(y);
		if ($19) {
			return Even.value;
		};
		return Odd.value;
	};
}, function (v) {
	return function (v1) {
		if (v instanceof Odd && v1 instanceof Odd) {
			return Odd.value;
		};
		return Even.value;
	};
}, Odd.value, Even.value);

let ringParity = new data.Ring(function () {
	return semiringParity;
}, dict(semiringParity));

let divisionRingParity = new data.DivisionRing(function () {
	return ringParity;
}, dict(categoryFn));

let commutativeRingParity = new data.CommutativeRing(function () {
	return ringParity;
});

let euclideanRingParity = new Data_EuclideanRing.EuclideanRing(function () {
	return commutativeRingParity;
}, function (v) {
	if (v instanceof Even) {
		return 0;
	};
	if (v instanceof Odd) {
		return 1;
	};
	throw new Error("Failed pattern match at Data.Int (line 132, column 1 - line 136, column 17): " + [v.constructor.name]);
}, function (x) {
	return function (v) {
		return x;
	};
}, function (v) {
	return function (v1) {
		return Even.value;
	};
});


let boundedParity = new Data_Bounded.Bounded(function () {
	return ordParity;
}, Even.value, Odd.value);


module.exports = {
	fromNumber: fromNumber,
	ceil: ceil,
	floor: floor,
	round: round,
	fromString: fromString,
	radix: radix,
	binary: binary,
	octal: octal,
	decimal: decimal,
	hexadecimal: hexadecimal,
	base36: base36,
	fromStringAs: fromStringAs,
	Even: Even,
	Odd: Odd,
	parity: parity,
	even: even,
	odd: odd,
	eqParity: eqParity,
	ordParity: ordParity,
	showParity: showParity,
	boundedParity: boundedParity,
	semiringParity: semiringParity,
	ringParity: ringParity,
	commutativeRingParity: commutativeRingParity,
	euclideanRingParity: euclideanRingParity,
	divisionRingParity: divisionRingParity,
	toNumber: toNumber,
	toStringAs: toStringAs,
	quot: quot,
	rem: rem,
	pow: pow
};
