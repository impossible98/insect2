let type = require("./type");


function eq(dict) {
	return dict.eq;
}

let unsafeHas = function (label) {
	return function (rec) {
		return {}.hasOwnProperty.call(rec, label);
	};
};

let unsafeGet = function (label) {
	return function (rec) {
		return rec[label];
	};
};

let unsafeSet = function (label) {
	return function (value) {
		return function (rec) {
			let copy = {};
			for (let key in rec) {
				if ({}.hasOwnProperty.call(rec, key)) {
					copy[key] = rec[key];
				}
			}
			copy[label] = value;
			return copy;
		};
	};
};

let unsafeDelete = function (label) {
	return function (rec) {
		let copy = {};
		for (let key in rec) {
			if (key !== label && {}.hasOwnProperty.call(rec, key)) {
				copy[key] = rec[key];
			}
		}
		return copy;
	};
};

let SProxy = (() => {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();

let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};


let EqualFields = function (equalFields) {
	this.equalFields = equalFields;
};

function unsafeUnionFn(r1, r2) {
	let copy = {};
	for (let k1 in r2) {
		if ({}.hasOwnProperty.call(r2, k1)) {
			copy[k1] = r2[k1];
		}
	}
	for (let k2 in r1) {
		if ({}.hasOwnProperty.call(r1, k2)) {
			copy[k2] = r1[k2];
		}
	}
	return copy;
}

let union = ()=> {
	return function (l) {
		return function (r) {
			return unsafeUnionFn(l, r);
		};
	};
};
let set = function (dictIsSymbol) {
	return ()=> {
		return ()=> {
			return function (l) {
				return function (b) {
					return function (r) {
						return unsafeSet(reflectSymbol(dictIsSymbol)(l))(b)(r);
					};
				};
			};
		};
	};
};

function nub() {
	return (arg) => { return arg; };
}

let merge = function (dictUnion) {
	return function (dictNub) {
		return function (l) {
			return function (r) {
				return unsafeUnionFn(l, r);
			};
		};
	};
};
let insert = function (dictIsSymbol) {
	return ()=> {
		return ()=> {
			return function (l) {
				return function (a) {
					return function (r) {
						return unsafeSet(reflectSymbol(dictIsSymbol)(l))(a)(r);
					};
				};
			};
		};
	};
};
let get = function (dictIsSymbol) {
	return ()=> {
		return function (l) {
			return function (r) {
				return unsafeGet(reflectSymbol(dictIsSymbol)(l))(r);
			};
		};
	};
};
let modify = function (dictIsSymbol) {
	return ()=> {
		return ()=> {
			return function (l) {
				return function (f) {
					return function (r) {
						return set(dictIsSymbol)()()(l)(f(get(dictIsSymbol)()(l)(r)))(r);
					};
				};
			};
		};
	};
};
let equalFieldsNil = new EqualFields(function (v) {
	return function (v1) {
		return function (v2) {
			return true;
		};
	};
});
let equalFields = function (dict) {
	return dict.equalFields;
};
let equalFieldsCons = function (dictIsSymbol) {
	return function (dictEq) {
		return function (dictCons) {
			return function (dictEqualFields) {
				return new EqualFields(function (v) {
					return function (a) {
						return function (b) {
							let get$prime = get(dictIsSymbol)()(SProxy.value);
							let equalRest = equalFields(dictEqualFields)(type.RLProxy.value);
							return eq(dictEq)(get$prime(a))(get$prime(b)) && equalRest(a)(b);
						};
					};
				});
			};
		};
	};
};
let equal = function (dictRowToList) {
	return function (dictEqualFields) {
		return function (a) {
			return function (b) {
				return equalFields(dictEqualFields)(type.RLProxy.value)(a)(b);
			};
		};
	};
};
let disjointUnion = function (dictUnion) {
	return function (dictNub) {
		return function (l) {
			return function (r) {
				return unsafeUnionFn(l, r);
			};
		};
	};
};
let $$delete = function (dictIsSymbol) {
	return function (dictLacks) {
		return function (dictCons) {
			return function (l) {
				return function (r) {
					return unsafeDelete(reflectSymbol(dictIsSymbol)(l))(r);
				};
			};
		};
	};
};
let rename = function (dictIsSymbol) {
	return function (dictIsSymbol1) {
		return ()=> {
			return ()=> {
				return ()=> {
					return ()=> {
						return function (prev) {
							return function (next) {
								return function (record) {
									return insert(dictIsSymbol1)()()(next)(get(dictIsSymbol)()(prev)(record))($$delete(dictIsSymbol)()()(prev)(record));
								};
							};
						};
					};
				};
			};
		};
	};
};

module.exports = {
	get: get,
	set: set,
	modify: modify,
	insert: insert,
	"delete": $$delete,
	rename: rename,
	equal: equal,
	merge: merge,
	union: union,
	disjointUnion: disjointUnion,
	nub: nub,
	EqualFields: EqualFields,
	equalFields: equalFields,
	equalFieldsCons: equalFieldsCons,
	equalFieldsNil: equalFieldsNil,
	unsafeHas: unsafeHas,
	unsafeGet: unsafeGet,
	unsafeSet: unsafeSet,
	unsafeDelete: unsafeDelete
};
