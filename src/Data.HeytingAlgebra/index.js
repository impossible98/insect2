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

let boolConj = function (b1) {
	return function (b2) {
		return b1 && b2;
	};
};

let boolDisj = function (b1) {
	return function (b2) {
		return b1 || b2;
	};
};

let boolNot = function (b) {
	return !b;
};


let HeytingAlgebraRecord = function (conjRecord, disjRecord, ffRecord, impliesRecord, notRecord, ttRecord) {
	this.conjRecord = conjRecord;
	this.disjRecord = disjRecord;
	this.ffRecord = ffRecord;
	this.impliesRecord = impliesRecord;
	this.notRecord = notRecord;
	this.ttRecord = ttRecord;
};
let HeytingAlgebra = function (conj, disj, ff, implies, not, tt) {
	this.conj = conj;
	this.disj = disj;
	this.ff = ff;
	this.implies = implies;
	this.not = not;
	this.tt = tt;
};
let ttRecord = function (dict) {
	return dict.ttRecord;
};
let tt = function (dict) {
	return dict.tt;
};
let notRecord = function (dict) {
	return dict.notRecord;
};
let not = function (dict) {
	return dict.not;
};
let impliesRecord = function (dict) {
	return dict.impliesRecord;
};
let implies = function (dict) {
	return dict.implies;
};
let heytingAlgebraUnit = new HeytingAlgebra(function (v) {
	return function (v1) {
		return {};
	};
}, function (v) {
	return function (v1) {
		return {};
	};
}, {}, function (v) {
	return function (v1) {
		return {};
	};
}, function (v) {
	return {};
}, {});
let heytingAlgebraRecordNil = new HeytingAlgebraRecord(function (v) {
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
let ffRecord = function (dict) {
	return dict.ffRecord;
};
let ff = function (dict) {
	return dict.ff;
};
let disjRecord = function (dict) {
	return dict.disjRecord;
};
let disj = function (dict) {
	return dict.disj;
};
let heytingAlgebraBoolean = new HeytingAlgebra(boolConj, boolDisj, false, function (a) {
	return function (b) {
		return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
	};
}, boolNot, true);
let conjRecord = function (dict) {
	return dict.conjRecord;
};
let heytingAlgebraRecord = function (dictRowToList) {
	return function (dictHeytingAlgebraRecord) {
		return new HeytingAlgebra(conjRecord(dictHeytingAlgebraRecord)(type.RLProxy.value), disjRecord(dictHeytingAlgebraRecord)(type.RLProxy.value), ffRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(type.RProxy.value), impliesRecord(dictHeytingAlgebraRecord)(type.RLProxy.value), notRecord(dictHeytingAlgebraRecord)(type.RLProxy.value), ttRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(type.RProxy.value));
	};
};
let conj = function (dict) {
	return dict.conj;
};
let heytingAlgebraFunction = function (dictHeytingAlgebra) {
	return new HeytingAlgebra(function (f) {
		return function (g) {
			return function (a) {
				return conj(dictHeytingAlgebra)(f(a))(g(a));
			};
		};
	}, function (f) {
		return function (g) {
			return function (a) {
				return disj(dictHeytingAlgebra)(f(a))(g(a));
			};
		};
	}, function (v) {
		return ff(dictHeytingAlgebra);
	}, function (f) {
		return function (g) {
			return function (a) {
				return implies(dictHeytingAlgebra)(f(a))(g(a));
			};
		};
	}, function (f) {
		return function (a) {
			return not(dictHeytingAlgebra)(f(a));
		};
	}, function (v) {
		return tt(dictHeytingAlgebra);
	});
};
let heytingAlgebraRecordCons = function (dictIsSymbol) {
	return function (dictCons) {
		return function (dictHeytingAlgebraRecord) {
			return function (dictHeytingAlgebra) {
				return new HeytingAlgebraRecord(function (v) {
					return function (ra) {
						return function (rb) {
							let tail = conjRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(ra)(rb);
							let key = reflectSymbol(dictIsSymbol)(SProxy.value);
							let insert = record.unsafeSet(key);
							let get = record.unsafeGet(key);
							return insert(conj(dictHeytingAlgebra)(get(ra))(get(rb)))(tail);
						};
					};
				}, function (v) {
					return function (ra) {
						return function (rb) {
							let tail = disjRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(ra)(rb);
							let key = reflectSymbol(dictIsSymbol)(SProxy.value);
							let insert = record.unsafeSet(key);
							let get = record.unsafeGet(key);
							return insert(disj(dictHeytingAlgebra)(get(ra))(get(rb)))(tail);
						};
					};
				}, function (v) {
					return function (row) {
						let tail = ffRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(row);
						let key = reflectSymbol(dictIsSymbol)(SProxy.value);
						let insert = record.unsafeSet(key);
						return insert(ff(dictHeytingAlgebra))(tail);
					};
				}, function (v) {
					return function (ra) {
						return function (rb) {
							let tail = impliesRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(ra)(rb);
							let key = reflectSymbol(dictIsSymbol)(SProxy.value);
							let insert = record.unsafeSet(key);
							let get = record.unsafeGet(key);
							return insert(implies(dictHeytingAlgebra)(get(ra))(get(rb)))(tail);
						};
					};
				}, function (v) {
					return function (row) {
						let tail = notRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(row);
						let key = reflectSymbol(dictIsSymbol)(SProxy.value);
						let insert = record.unsafeSet(key);
						let get = record.unsafeGet(key);
						return insert(not(dictHeytingAlgebra)(get(row)))(tail);
					};
				}, function (v) {
					return function (row) {
						let tail = ttRecord(dictHeytingAlgebraRecord)(type.RLProxy.value)(row);
						let key = reflectSymbol(dictIsSymbol)(SProxy.value);
						let insert = record.unsafeSet(key);
						return insert(tt(dictHeytingAlgebra))(tail);
					};
				});
			};
		};
	};
};
module.exports = {
	HeytingAlgebra: HeytingAlgebra,
	tt: tt,
	ff: ff,
	implies: implies,
	conj: conj,
	disj: disj,
	not: not,
	HeytingAlgebraRecord: HeytingAlgebraRecord,
	ffRecord: ffRecord,
	ttRecord: ttRecord,
	impliesRecord: impliesRecord,
	conjRecord: conjRecord,
	disjRecord: disjRecord,
	notRecord: notRecord,
	heytingAlgebraBoolean: heytingAlgebraBoolean,
	heytingAlgebraUnit: heytingAlgebraUnit,
	heytingAlgebraFunction: heytingAlgebraFunction,
	heytingAlgebraRecord: heytingAlgebraRecord,
	heytingAlgebraRecordNil: heytingAlgebraRecordNil,
	heytingAlgebraRecordCons: heytingAlgebraRecordCons
};
