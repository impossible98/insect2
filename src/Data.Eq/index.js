let record = require("../record");
let type = require("../type");


let SProxy = (function () {
	function SProxy() { };
	SProxy.value = new SProxy();
	return SProxy;
})();


function reflectSymbol(dict) {
	return dict.reflectSymbol;
}

function refEq(r1) {
	return function (r2) {
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

module.exports = {
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
	eqRowCons: eqRowCons
};
