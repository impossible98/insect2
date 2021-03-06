const type = require('./type');



class EqualFields {
	constructor(equalFields) {
		this.equalFields = equalFields;
	}
}

function equalFields(arg) {
	return arg.equalFields;
}

function unsafeHas(arg) {
	return (arg2) => {
		return {}.hasOwnProperty.call(arg2, arg);
	};
}

function unsafeGet(arg) {
	return (arg2) => {
		return arg2[arg];
	};
}

function unsafeSet(arg) {
	return (value) => {
		return (arg2) => {
			let copy = {};

			for (let key in arg2) {
				if ({}.hasOwnProperty.call(arg2, key)) {
					copy[key] = arg2[key];
				}
			}

			copy[arg] = value;

			return copy;
		};
	};
}

function unsafeDelete(arg) {
	return (arg2) => {
		let copy = {};

		for (let key in arg2) {
			if (key !== arg && {}.hasOwnProperty.call(arg2, key)) {
				copy[key] = arg2[key];
			}
		}

		return copy;
	};
}

let SProxy = (() => {
	function SProxy() { };

	SProxy.value = new SProxy();

	return SProxy;
})();

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

function union() {
	return function (l) {
		return function (r) {
			return unsafeUnionFn(l, r);
		};
	};
}

function set(arg) {
	return () => {
		return () => {
			return function (l) {
				return function (b) {
					return function (r) {
						return unsafeSet(equalFields(arg)(l))(b)(r);
					};
				};
			};
		};
	};
};

function nub() {
	return (arg) => { return arg; };
}

function merge() {
	return () => {
		return function (l) {
			return function (r) {
				return unsafeUnionFn(l, r);
			};
		};
	};
}

function insert(arg) {
	return () => {
		return () => {
			return function (l) {
				return function (a) {
					return function (r) {
						return unsafeSet(equalFields(arg)(l))(a)(r);
					};
				};
			};
		};
	};
}

function get(arg) {
	return () => {
		return function (l) {
			return function (r) {
				return unsafeGet(equalFields(arg)(l))(r);
			};
		};
	};
}

function modify(arg) {
	return () => {
		return () => {
			return function (l) {
				return function (f) {
					return function (r) {
						return set(arg)()()(l)(f(get(arg)()(l)(r)))(r);
					};
				};
			};
		};
	};
}

let equalFieldsNil = new EqualFields((v) => {
	return () => {
		return () => {
			return true;
		};
	};
});

function equalFieldsCons(arg) {
	return function (dictEq) {
		return () => {
			return function (dictEqualFields) {
				return new EqualFields((v) => {
					return (a) => {
						return (b) => {
							let get$prime = get(arg)()(SProxy.value);
							let equalRest = equalFields(dictEqualFields)(type.RLProxy.value);

							return equalFields(dictEq)(get$prime(a))(get$prime(b)) && equalRest(a)(b);
						};
					};
				});
			};
		};
	};
}

function equal() {
	return function (dictEqualFields) {
		return function (a) {
			return function (b) {
				return equalFields(dictEqualFields)(type.RLProxy.value)(a)(b);
			};
		};
	};
}

function disjointUnion() {
	return () => {
		return function (l) {
			return function (r) {
				return unsafeUnionFn(l, r);
			};
		};
	};
}

function $$delete(arg) {
	return () => {
		return () => {
			return function (l) {
				return function (r) {
					return unsafeDelete(equalFields(arg)(l))(r);
				};
			};
		};
	};
}

function rename(arg) {
	return (dictIsSymbol1) => {
		return () => {
			return () => {
				return () => {
					return () => {
						return function (prev) {
							return function (next) {
								return function (record) {
									return insert(dictIsSymbol1)()()(next)(get(arg)()(prev)(record))($$delete(arg)()()(prev)(record));
								};
							};
						};
					};
				};
			};
		};
	};
}

module.exports = {
	get: get,
	set: set,
	modify: modify,
	insert: insert,
	'delete': $$delete,
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
