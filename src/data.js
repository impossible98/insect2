const record = require('./record');
const type = require('./type');


class Data {
	constructor(compose) {
		this.compose = compose;
	}
}

class Functor {
	constructor(map) {
		this.map = map;
	}
}
let semigroupoidFn = new Data(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let functorFn = new Functor(compose(semigroupoidFn));
let functorArray = new Functor(arrayMap);

function on(f) {
	return function (g) {
		return function (x) {
			return function (y) {
				return f(g(x))(g(y));
			};
		};
	};
}

function flip(f) {
	return function (b) {
		return function (a) {
			return f(a)(b);
		};
	};
}

function _const(a) {
	return function (v) {
		return a;
	};
}

function applyN(f) {
	function go($copy_n) {
		return function ($copy_acc) {
			let $tco_var_n = $copy_n;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(n, acc) {
				if (n <= 0) {
					$tco_done = true;
					return acc;
				};
				if (true) {
					$tco_var_n = n - 1 | 0;
					$copy_acc = f(acc);
					return;
				};
				throw new Error("Failed pattern match at Data.Function (line 94, column 3 - line 96, column 37): " + [n.constructor.name, acc.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_n, $copy_acc);
			};
			return $tco_result;
		};
	};
	return go;
}

function applyFlipped(x) {
	return function (f) {
		return f(x);
	};
}

function apply(f) {
	return function (x) {
		return f(x);
	};
}

function compose(dict) {
	return dict.compose;
}

function arrayMap(f) {
	return function (arr) {
		let l = arr.length;
		let result = new Array(l);
		for (let i = 0; i < l; i++) {
			result[i] = f(arr[i]);
		}
		return result;
	};
}

function map(dict) {
	return dict.map;
}

function mapFlipped(dictFunctor) {
	return function (fa) {
		return function (f) {
			return map(dictFunctor)(f)(fa);
		};
	};
}

function _void(dictFunctor) {
	return map(dictFunctor)(_const());
}

function voidLeft(dictFunctor) {
	return function (f) {
		return function (x) {
			return map(dictFunctor)(_const(x))(f);
		};
	};
}

function voidRight(dictFunctor) {
	return function (x) {
		return map(dictFunctor)(_const(x));
	};
}

function flap(dictFunctor) {
	return function (ff) {
		return function (x) {
			return map(dictFunctor)(function (f) {
				return f(x);
			})(ff);
		};
	};
}

function zero (dict) {
	return dict.zero;
};

function mul(dict) {
	return dict.mul;
};

function intDegree(x) {
	return Math.min(Math.abs(x), 2147483647);
}

function intDiv(x) {
	return function (y) {
		if (y === 0) return 0;
		return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
	};
}

function intMod  (x) {
	return function (y) {
		if (y === 0) return 0;
		let yy = Math.abs(y);
		return ((x % yy) + yy) % yy;
	};
}

function numDiv(n1) {
	return function (n2) {
		return n1 / n2;
	};
}

let EuclideanRing = function (CommutativeRing0, degree, div, mod) {
	this.CommutativeRing0 = CommutativeRing0;
	this.degree = degree;
	this.div = div;
	this.mod = mod;
};

function mod (dict) {
	return dict.mod;
}

function gcd($copy_dictEq) {
	return function ($copy_dictEuclideanRing) {
		return function ($copy_a) {
			return function ($copy_b) {
				let $tco_var_dictEq = $copy_dictEq;
				let $tco_var_dictEuclideanRing = $copy_dictEuclideanRing;
				let $tco_var_a = $copy_a;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(dictEq, dictEuclideanRing, a, b) {
					let $7 = eq(dictEq)(b)(zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0()));
					if ($7) {
						$tco_done = true;
						return a;
					};
					$tco_var_dictEq = dictEq;
					$tco_var_dictEuclideanRing = dictEuclideanRing;
					$tco_var_a = b;
					$copy_b = mod(dictEuclideanRing)(a)(b);
					return;
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_dictEq, $tco_var_dictEuclideanRing, $tco_var_a, $copy_b);
				};
				return $tco_result;
			};
		};
	};
}

let euclideanRingNumber = new EuclideanRing(function () {
	return commutativeRingNumber;
}, function (v) {
	return 1;
}, numDiv, function (v) {
	return function (v1) {
		return 0.0;
	};
});

let euclideanRingInt = new EuclideanRing(function () {
	return commutativeRingInt;
}, intDegree, intDiv, intMod);
let div = function (dict) {
	return dict.div;
};

function lcm(dictEq) {
	return function (dictEuclideanRing) {
		return function (a) {
			return function (b) {
				let $8 = eq(dictEq)(a)(zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0())) || data.eq(dictEq)(b)(zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0()));
				if ($8) {
					return zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0());
				};
				return div(dictEuclideanRing)(mul(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0())(a)(b))(gcd(dictEq)(dictEuclideanRing)(a)(b));
			};
		};
	};
}

function degree (dict) {
	return dict.degree;
}


let SProxy = (function () {
	function SProxy() { };
	SProxy.value = new SProxy();
	return SProxy;
})();


function reflectSymbol(dict) {
	return dict.reflectSymbol;
}

function refEq(r1) {
	return (r2) => {
		return r1 === r2;
	};
}

let eqBooleanImpl = refEq;
let eqIntImpl = refEq;
let eqNumberImpl = refEq;
let eqCharImpl = refEq;
let eqStringImpl = refEq;


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}


class Eq1 {
	constructor(eq1) {
		this.eq1 = eq1;
	}
}

class EqRecord {
	constructor(eqRecord) {
		this.eqRecord = eqRecord;
	}
}

let eqVoid = new Eq(function (v) {
	return function (v1) {
		return true;
	};
});
let eqUnit = new Eq(function (v) {
	return function (v1) {
		return true;
	};
});

let eqString = new Eq(eqStringImpl);
let eqNumber = new Eq(eqNumberImpl);
let eqInt = new Eq(eqIntImpl);
let eqChar = new Eq(eqCharImpl);
let eqBoolean = new Eq(eqBooleanImpl);
let eqRowNil = new EqRecord(function (v) {
	return function (v1) {
		return function (v2) {
			return true;
		};
	};
});
let eq1Array = new Eq1(function (dictEq) {
	return eq(eqArray(dictEq));
});

function eqArrayImpl(f) {
	return function (xs) {
		return function (ys) {
			if (xs === ys) return true;
			if (xs.length !== ys.length) return false;
			for (let i = 0; i < xs.length; i++) {
				if (!f(xs[i])(ys[i])) return false;
			}
			return true;
		};
	};
}

function eqRecord(dict) {
	return dict.eqRecord;
}

function eqRec() {
	return function (dictEqRecord) {
		return new Eq(eqRecord(dictEqRecord)(type.RLProxy.value));
	};
}

function eq1(dict) {
	return dict.eq1;
}

function eq(dict) {
	return dict.eq;
}

function eqArray(dictEq) {
	return new Eq(eqArrayImpl(eq(dictEq)));
}

function eqRowCons(dictEqRecord) {
	return function (dictCons) {
		return function (dictIsSymbol) {
			return function (dictEq) {
				return new EqRecord(function (v) {
					return function (ra) {
						return function (rb) {
							let tail = eqRecord(dictEqRecord)(type.RLProxy.value)(ra)(rb);
							let key = reflectSymbol(dictIsSymbol)(SProxy.value);
							let get = record.unsafeGet(key);
							return eq(dictEq)(get(ra))(get(rb)) && tail;
						};
					};
				});
			};
		};
	};
}

function notEq(dictEq) {
	return function (x) {
		return function (y) {
			return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
		};
	};
};

function notEq1(dictEq1) {
	return function (dictEq) {
		return function (x) {
			return function (y) {
				return eq(eqBoolean)(eq1(dictEq1)(dictEq)(x)(y))(false);
			};
		};
	};
}

let DivisionRing = function (Ring0, recip) {
	this.Ring0 = Ring0;
	this.recip = recip;
};

function recip(dict) {
	return dict.recip;
}

function rightDiv (dictDivisionRing) {
	return function (a) {
		return function (b) {
			return mul((dictDivisionRing.Ring0()).Semiring0())(a)(recip(dictDivisionRing)(b));
		};
	};
}

function leftDiv (dictDivisionRing) {
	return function (a) {
		return function (b) {
			return mul((dictDivisionRing.Ring0()).Semiring0())(recip(dictDivisionRing)(b))(a);
		};
	};
}

let divisionringNumber = new DivisionRing(function () {
	return ringNumber;
}, function (x) {
	return 1.0 / x;
});

let CommutativeRingRecord = function (RingRecord0) {
	this.RingRecord0 = RingRecord0;
};
let CommutativeRing = function (Ring0) {
	this.Ring0 = Ring0;
};
let commutativeRingUnit = new CommutativeRing(function () {
	return ringUnit;
});
let commutativeRingRecordNil = new CommutativeRingRecord(function () {
	return ringRecordNil;
});
let commutativeRingRecordCons = function (dictIsSymbol) {
	return function (dictCons) {
		return function (dictCommutativeRingRecord) {
			return function (dictCommutativeRing) {
				return new CommutativeRingRecord(function () {
					return ringRecordCons(dictIsSymbol)()(dictCommutativeRingRecord.RingRecord0())(dictCommutativeRing.Ring0());
				});
			};
		};
	};
};
let commutativeRingRecord = function (dictRowToList) {
	return function (dictCommutativeRingRecord) {
		return new CommutativeRing(function () {
			return ringRecord()(dictCommutativeRingRecord.RingRecord0());
		});
	};
};
let commutativeRingNumber = new CommutativeRing(function () {
	return ringNumber;
});
let commutativeRingInt = new CommutativeRing(function () {
	return ringInt;
});
let commutativeRingFn = function (dictCommutativeRing) {
	return new CommutativeRing(function () {
		return ringFn(dictCommutativeRing.Ring0());
	});
};


class Data4 {
	constructor(arg, arg2, arg3, arg4) {
		this.arg = arg;
		this.arg2 = arg2;
		this.arg3 = arg3;
		this.arg4 = arg4;
	}
}

function dict(arg) {
	return arg.dict;
}


function intAdd(x) {
	return function (y) {
		return x + y | 0;
	};
}

function intMul(x) {
	return function (y) {
		return x * y | 0;
	};
}

function numAdd(n1) {
	return function (n2) {
		return n1 + n2;
	};
}

function numMul(n1) {
	return function (n2) {
		return n1 * n2;
	};
}

let semiringUnit = new Data4(function (v) {
	return () => {
		return {};
	};
}, () => {
	return () => {
		return {};
	};
}, {}, {});

let semiringRecordNil = new Data4(() => {
	return () => {
		return () => {
			return {};
		};
	};
}, () => {
	return () => {
		return () => {
			return {};
		};
	};
}, () => {
	return () => {
		return {};
	};
}, () => {
	return () => {
		return {};
	};
});

let semiringNumber = new Data4(numAdd, numMul, 1.0, 0.0);
let semiringInt = new Data4(intAdd, intMul, 1, 0);

let semiringRecord = () => {
	return function (dictSemiringRecord) {
		return new Data4(dict(dictSemiringRecord)(type.RLProxy.value), dict(dictSemiringRecord)(type.RLProxy.value), dict(dictSemiringRecord)(type.RLProxy.value)(type.RProxy.value), dict(dictSemiringRecord)(type.RLProxy.value)(type.RProxy.value));
	};
};

function semiringFn(dictSemiring) {
	return new Data4(function (f) {
		return function (g) {
			return function (x) {
				return dict(dictSemiring)(f(x))(g(x));
			};
		};
	}, function (f) {
		return function (g) {
			return function (x) {
				return dict(dictSemiring)(f(x))(g(x));
			};
		};
	}, () => {
		return dict(dictSemiring);
	}, () => {
		return dict(dictSemiring);
	});
}

let intSub = function (x) {
	return function (y) {
		return x - y | 0;
	};
};

let numSub = function (n1) {
	return function (n2) {
		return n1 - n2;
	};
};

let RingRecord = function (SemiringRecord0, subRecord) {
	this.SemiringRecord0 = SemiringRecord0;
	this.subRecord = subRecord;
};

let Ring = function (Semiring0, sub) {
	this.Semiring0 = Semiring0;
	this.sub = sub;
};

let subRecord = function (dict) {
	return dict.subRecord;
};

let sub = function (dict) {
	return dict.sub;
};

let ringUnit = new Ring(() => {
	return semiringUnit;
}, function (v) {
	return function (v1) {
		return;
	};
});

let ringRecordNil = new RingRecord(() => {
	return semiringRecordNil;
}, function (v) {
	return function (v1) {
		return function (v2) {
			return {};
		};
	};
});

let ringRecordCons = function (dictIsSymbol) {
	return () => {
		return function (dictRingRecord) {
			return function (dictRing) {
				return new RingRecord(() => {
					return semiringRecordCons(dictIsSymbol)()(dictRingRecord.SemiringRecord0())(dictRing.Semiring0());
				}, () => {
					return function (ra) {
						return function (rb) {
							let tail = subRecord(dictRingRecord)(type.RLProxy.value)(ra)(rb);
							let key = dict(dictIsSymbol)(SProxy.value);
							let insert = record.unsafeSet(key);
							let get = record.unsafeGet(key);
							return insert(sub(dictRing)(get(ra))(get(rb)))(tail);
						};
					};
				});
			};
		};
	};
};

let ringRecord = () => {
	return function (dictRingRecord) {
		return new Ring(() => {
			return semiringRecord()(dictRingRecord.SemiringRecord0());
		}, subRecord(dictRingRecord)(type.RLProxy.value));
	};
};

let ringNumber = new Ring(() => {
	return semiringNumber;
}, numSub);

let ringInt = new Ring(() => {
	return semiringInt;
}, intSub);

let ringFn = function (dictRing) {
	return new Ring(() => {
		return semiringFn(dictRing.Semiring0());
	}, function (f) {
		return function (g) {
			return function (x) {
				return sub(dictRing)(f(x))(g(x));
			};
		};
	});
};

let negate = function (dictRing) {
	return function (a) {
		return sub(dictRing)(dict(dictRing.Semiring0()))(a);
	};
};

module.exports = {
	Ring: Ring,
	sub: sub,
	negate: negate,
	RingRecord: RingRecord,
	subRecord: subRecord,
	ringInt: ringInt,
	ringNumber: ringNumber,
	ringUnit: ringUnit,
	ringFn: ringFn,
	ringRecord: ringRecord,
	ringRecordNil: ringRecordNil,
	ringRecordCons: ringRecordCons,
	CommutativeRing: CommutativeRing,
	CommutativeRingRecord: CommutativeRingRecord,
	commutativeRingInt: commutativeRingInt,
	commutativeRingNumber: commutativeRingNumber,
	commutativeRingUnit: commutativeRingUnit,
	commutativeRingFn: commutativeRingFn,
	commutativeRingRecord: commutativeRingRecord,
	commutativeRingRecordNil: commutativeRingRecordNil,
	commutativeRingRecordCons: commutativeRingRecordCons,
	DivisionRing: DivisionRing,
	recip: recip,
	leftDiv: leftDiv,
	rightDiv: rightDiv,
	divisionringNumber: divisionringNumber,
	Eq: Eq,
	eq: eq,
	notEq: notEq,
	Eq1: Eq1,
	eq1: eq1,
	notEq1: notEq1,
	EqRecord: EqRecord,
	eqRecord: eqRecord,
	eqBoolean: eqBoolean,
	eqInt: eqInt,
	eqNumber: eqNumber,
	eqChar: eqChar,
	eqString: eqString,
	eqUnit: eqUnit,
	eqVoid: eqVoid,
	eqArray: eqArray,
	eqRec: eqRec,
	eq1Array: eq1Array,
	eqRowNil: eqRowNil,
	eqRowCons: eqRowCons,
	EuclideanRing: EuclideanRing,
	degree: degree,
	div: div,
	mod: mod,
	gcd: gcd,
	lcm: lcm,
	euclideanRingInt: euclideanRingInt,
	euclideanRingNumber: euclideanRingNumber,

	Functor: Functor,
	map: map,
	mapFlipped: mapFlipped,
	_void: _void,
	voidRight: voidRight,
	voidLeft: voidLeft,
	flap: flap,
	functorFn: functorFn,
	functorArray: functorArray,
	flip: flip,
	_const: _const,
	apply: apply,
	applyFlipped: applyFlipped,
	applyN: applyN,
	on: on
};
