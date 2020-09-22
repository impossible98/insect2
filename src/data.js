let record = require("./record");
let type = require("./type");



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

let SProxy = (() => {
	function SProxy() { };

	SProxy.value = new SProxy();

	return SProxy;
})();

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
	ringRecordCons: ringRecordCons
};
