let record = require("../record");
let type = require("../type");


let SProxy = (function () {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();

let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};

let intAdd = function (x) {
	return function (y) {
		return x + y | 0;
	};
};

let intMul = function (x) {
	return function (y) {
		return x * y | 0;
	};
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


let SemiringRecord = function (addRecord, mulRecord, oneRecord, zeroRecord) {
	this.addRecord = addRecord;
	this.mulRecord = mulRecord;
	this.oneRecord = oneRecord;
	this.zeroRecord = zeroRecord;
};
let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};
let zeroRecord = function (dict) {
	return dict.zeroRecord;
};
let zero = function (dict) {
	return dict.zero;
};
let semiringUnit = new Semiring(function (v) {
	return function (v1) {
		return {};
	};
}, function (v) {
	return function (v1) {
		return {};
	};
}, {}, {});
let semiringRecordNil = new SemiringRecord(function (v) {
	return function (v1) {
		return function (v2) {
			return {};
		};
	};
}, function (v) {
	return function (v1) {
		return function (v2) {
			return {};
		};
	};
}, function (v) {
	return function (v1) {
		return {};
	};
}, function (v) {
	return function (v1) {
		return {};
	};
});
let semiringNumber = new Semiring(numAdd, numMul, 1.0, 0.0);
let semiringInt = new Semiring(intAdd, intMul, 1, 0);
let oneRecord = function (dict) {
	return dict.oneRecord;
};
let one = function (dict) {
	return dict.one;
};
let mulRecord = function (dict) {
	return dict.mulRecord;
};
let mul = function (dict) {
	return dict.mul;
};
let addRecord = function (dict) {
	return dict.addRecord;
};
let semiringRecord = function (dictRowToList) {
	return function (dictSemiringRecord) {
		return new Semiring(addRecord(dictSemiringRecord)(type.RLProxy.value), mulRecord(dictSemiringRecord)(type.RLProxy.value), oneRecord(dictSemiringRecord)(type.RLProxy.value)(type.RProxy.value), zeroRecord(dictSemiringRecord)(type.RLProxy.value)(type.RProxy.value));
	};
};
let add = function (dict) {
	return dict.add;
};
let semiringFn = function (dictSemiring) {
	return new Semiring(function (f) {
		return function (g) {
			return function (x) {
				return add(dictSemiring)(f(x))(g(x));
			};
		};
	}, function (f) {
		return function (g) {
			return function (x) {
				return mul(dictSemiring)(f(x))(g(x));
			};
		};
	}, function (v) {
		return one(dictSemiring);
	}, function (v) {
		return zero(dictSemiring);
	});
};

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

let ringUnit = new Ring(function () {
	return semiringUnit;
}, function (v) {
	return function (v1) {
		return;
	};
});

let ringRecordNil = new RingRecord(function () {
	return semiringRecordNil;
}, function (v) {
	return function (v1) {
		return function (v2) {
			return {};
		};
	};
});

let ringRecordCons = function (dictIsSymbol) {
	return function (dictCons) {
		return function (dictRingRecord) {
			return function (dictRing) {
				return new RingRecord(function () {
					return semiringRecordCons(dictIsSymbol)()(dictRingRecord.SemiringRecord0())(dictRing.Semiring0());
				}, function (v) {
					return function (ra) {
						return function (rb) {
							let tail = subRecord(dictRingRecord)(type.RLProxy.value)(ra)(rb);
							let key = reflectSymbol(dictIsSymbol)(SProxy.value);
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
let ringRecord = function (dictRowToList) {
	return function (dictRingRecord) {
		return new Ring(function () {
			return semiringRecord()(dictRingRecord.SemiringRecord0());
		}, subRecord(dictRingRecord)(type.RLProxy.value));
	};
};
let ringNumber = new Ring(function () {
	return semiringNumber;
}, numSub);
let ringInt = new Ring(function () {
	return semiringInt;
}, intSub);
let ringFn = function (dictRing) {
	return new Ring(function () {
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
		return sub(dictRing)(zero(dictRing.Semiring0()))(a);
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
	ringRecordCons: ringRecordCons
};
