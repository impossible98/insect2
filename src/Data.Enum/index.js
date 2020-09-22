const control = require("../control");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Either = require("../Data.Either/index.js");
let data = require("../data");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


function refEq(r1) {
	return function (r2) {
		return r1 === r2;
	};
}

let eqIntImpl = refEq;

class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let eqInt = new Eq(eqIntImpl);

function eq(dict) {
	return dict.eq;
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}


let applyFn = new Apply(function () {
	return data.functorFn;
}, function (f) {
	return function (g) {
		return function (x) {
			return f(x)(g(x));
		};
	};
});


let apply = function (dict) {
	return dict.apply;
};


let toCharCode = function (c) {
	return c.charCodeAt(0);
};

let fromCharCode = function (c) {
	return String.fromCharCode(c);
};


let Cardinality = function (x) {
	return x;
};
let Enum = function (Ord0, pred, succ) {
	this.Ord0 = Ord0;
	this.pred = pred;
	this.succ = succ;
};
let BoundedEnum = function (Bounded0, Enum1, cardinality, fromEnum, toEnum) {
	this.Bounded0 = Bounded0;
	this.Enum1 = Enum1;
	this.cardinality = cardinality;
	this.fromEnum = fromEnum;
	this.toEnum = toEnum;
};
let toEnum = function (dict) {
	return dict.toEnum;
};
let succ = function (dict) {
	return dict.succ;
};
let upFromIncluding = function (dictEnum) {
	return function (dictUnfoldable1) {
		return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(apply(applyFn)(Data_Tuple.Tuple.create)(succ(dictEnum)));
	};
};
let showCardinality = new Data_Show.Show(function (v) {
	return "(Cardinality " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let pred = function (dict) {
	return dict.pred;
};
let ordCardinality = Data_Ord.ordInt;
let newtypeCardinality = new Data_Newtype.Newtype(function (n) {
	return n;
}, Cardinality);
let fromEnum = function (dict) {
	return dict.fromEnum;
};
let toEnumWithDefaults = function (dictBoundedEnum) {
	return function (low) {
		return function (high) {
			return function (x) {
				let v = toEnum(dictBoundedEnum)(x);
				if (v instanceof Data_Maybe.Just) {
					return v.value0;
				};
				if (v instanceof Data_Maybe.Nothing) {
					let $54 = x < fromEnum(dictBoundedEnum)(Data_Bounded.bottom(dictBoundedEnum.Bounded0()));
					if ($54) {
						return low;
					};
					return high;
				};
				throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
			};
		};
	};
};
let eqCardinality = eqInt;
let enumUnit = new Enum(function () {
	return Data_Ord.ordUnit;
}, data._const(Data_Maybe.Nothing.value), data._const(Data_Maybe.Nothing.value));
let enumTuple = function (dictEnum) {
	return function (dictBoundedEnum) {
		return new Enum(function () {
			return Data_Tuple.ordTuple(dictEnum.Ord0())((dictBoundedEnum.Enum1()).Ord0());
		}, function (v) {
			return Data_Maybe.maybe(data.map(Data_Maybe.functorMaybe)(data.flip(Data_Tuple.Tuple.create)(Data_Bounded.top(dictBoundedEnum.Bounded0())))(pred(dictEnum)(v.value0)))((function () {
				let $96 = Data_Tuple.Tuple.create(v.value0);
				return function ($97) {
					return Data_Maybe.Just.create($96($97));
				};
			})())(pred(dictBoundedEnum.Enum1())(v.value1));
		}, function (v) {
			return Data_Maybe.maybe(data.map(Data_Maybe.functorMaybe)(data.flip(Data_Tuple.Tuple.create)(Data_Bounded.bottom(dictBoundedEnum.Bounded0())))(succ(dictEnum)(v.value0)))((function () {
				let $98 = Data_Tuple.Tuple.create(v.value0);
				return function ($99) {
					return Data_Maybe.Just.create($98($99));
				};
			})())(succ(dictBoundedEnum.Enum1())(v.value1));
		});
	};
};
let enumOrdering = new Enum(function () {
	return Data_Ord.ordOrdering;
}, function (v) {
	if (v instanceof Data_Ordering.LT) {
		return Data_Maybe.Nothing.value;
	};
	if (v instanceof Data_Ordering.EQ) {
		return new Data_Maybe.Just(Data_Ordering.LT.value);
	};
	if (v instanceof Data_Ordering.GT) {
		return new Data_Maybe.Just(Data_Ordering.EQ.value);
	};
	throw new Error("Failed pattern match at Data.Enum (line 72, column 1 - line 78, column 20): " + [v.constructor.name]);
}, function (v) {
	if (v instanceof Data_Ordering.LT) {
		return new Data_Maybe.Just(Data_Ordering.EQ.value);
	};
	if (v instanceof Data_Ordering.EQ) {
		return new Data_Maybe.Just(Data_Ordering.GT.value);
	};
	if (v instanceof Data_Ordering.GT) {
		return Data_Maybe.Nothing.value;
	};
	throw new Error("Failed pattern match at Data.Enum (line 72, column 1 - line 78, column 20): " + [v.constructor.name]);
});
let enumMaybe = function (dictBoundedEnum) {
	return new Enum(function () {
		return Data_Maybe.ordMaybe((dictBoundedEnum.Enum1()).Ord0());
	}, function (v) {
		if (v instanceof Data_Maybe.Nothing) {
			return Data_Maybe.Nothing.value;
		};
		if (v instanceof Data_Maybe.Just) {
			return new Data_Maybe.Just(pred(dictBoundedEnum.Enum1())(v.value0));
		};
		throw new Error("Failed pattern match at Data.Enum (line 80, column 1 - line 84, column 32): " + [v.constructor.name]);
	}, function (v) {
		if (v instanceof Data_Maybe.Nothing) {
			return new Data_Maybe.Just(new Data_Maybe.Just(Data_Bounded.bottom(dictBoundedEnum.Bounded0())));
		};
		if (v instanceof Data_Maybe.Just) {
			return data.map(Data_Maybe.functorMaybe)(Data_Maybe.Just.create)(succ(dictBoundedEnum.Enum1())(v.value0));
		};
		throw new Error("Failed pattern match at Data.Enum (line 80, column 1 - line 84, column 32): " + [v.constructor.name]);
	});
};
let enumInt = new Enum(function () {
	return Data_Ord.ordInt;
}, function (n) {
	let $67 = n > Data_Bounded.bottom(Data_Bounded.boundedInt);
	if ($67) {
		return new Data_Maybe.Just(n - 1 | 0);
	};
	return Data_Maybe.Nothing.value;
}, function (n) {
	let $68 = n < Data_Bounded.top(Data_Bounded.boundedInt);
	if ($68) {
		return new Data_Maybe.Just(n + 1 | 0);
	};
	return Data_Maybe.Nothing.value;
});
let enumFromTo = function (dictEnum) {
	return function (dictUnfoldable1) {
		let go = function (step) {
			return function (op) {
				return function (to) {
					return function (a) {
						return new Data_Tuple.Tuple(a, control.bind(Data_Maybe.bindMaybe)(step(a))(function (a$prime) {
							return data.voidLeft(Data_Maybe.functorMaybe)(Control_MonadZero.guard(Data_Maybe.monadZeroMaybe)(op(a$prime)(to)))(a$prime);
						}));
					};
				};
			};
		};
		return function (v) {
			return function (v1) {
				if (eq((dictEnum.Ord0()).Eq0())(v)(v1)) {
					return Data_Unfoldable1.singleton(dictUnfoldable1)(v);
				};
				if (Data_Ord.lessThan(dictEnum.Ord0())(v)(v1)) {
					return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go(succ(dictEnum))(Data_Ord.lessThanOrEq(dictEnum.Ord0()))(v1))(v);
				};
				if (true) {
					return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go(pred(dictEnum))(Data_Ord.greaterThanOrEq(dictEnum.Ord0()))(v1))(v);
				};
				throw new Error("Failed pattern match at Data.Enum (line 183, column 14 - line 187, column 51): " + [v.constructor.name, v1.constructor.name]);
			};
		};
	};
};
let enumFromThenTo = function (dictUnfoldable) {
	return function (dictFunctor) {
		return function (dictBoundedEnum) {
			let go = function (step) {
				return function (to) {
					return function (e) {
						if (e <= to) {
							return new Data_Maybe.Just(new Data_Tuple.Tuple(e, e + step | 0));
						};
						if (true) {
							return Data_Maybe.Nothing.value;
						};
						throw new Error("Failed pattern match at Data.Enum (line 214, column 5 - line 216, column 28): " + [step.constructor.name, to.constructor.name, e.constructor.name]);
					};
				};
			};
			return function (a) {
				return function (b) {
					return function (c) {
						let c$prime = fromEnum(dictBoundedEnum)(c);
						let b$prime = fromEnum(dictBoundedEnum)(b);
						let a$prime = fromEnum(dictBoundedEnum)(a);
						return data.map(dictFunctor)((function () {
							let $100 = Data_Maybe.fromJust();
							let $101 = toEnum(dictBoundedEnum);
							return function ($102) {
								return $100($101($102));
							};
						})())(Data_Unfoldable.unfoldr(dictUnfoldable)(go(b$prime - a$prime | 0)(c$prime))(a$prime));
					};
				};
			};
		};
	};
};
let enumEither = function (dictBoundedEnum) {
	return function (dictBoundedEnum1) {
		return new Enum(function () {
			return Data_Either.ordEither((dictBoundedEnum.Enum1()).Ord0())((dictBoundedEnum1.Enum1()).Ord0());
		}, function (v) {
			if (v instanceof Data_Either.Left) {
				return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($103) {
					return Data_Maybe.Just.create(Data_Either.Left.create($103));
				})(pred(dictBoundedEnum.Enum1())(v.value0));
			};
			if (v instanceof Data_Either.Right) {
				return Data_Maybe.maybe(new Data_Maybe.Just(new Data_Either.Left(Data_Bounded.top(dictBoundedEnum.Bounded0()))))(function ($104) {
					return Data_Maybe.Just.create(Data_Either.Right.create($104));
				})(pred(dictBoundedEnum1.Enum1())(v.value0));
			};
			throw new Error("Failed pattern match at Data.Enum (line 86, column 1 - line 90, column 69): " + [v.constructor.name]);
		}, function (v) {
			if (v instanceof Data_Either.Left) {
				return Data_Maybe.maybe(new Data_Maybe.Just(new Data_Either.Right(Data_Bounded.bottom(dictBoundedEnum1.Bounded0()))))(function ($105) {
					return Data_Maybe.Just.create(Data_Either.Left.create($105));
				})(succ(dictBoundedEnum.Enum1())(v.value0));
			};
			if (v instanceof Data_Either.Right) {
				return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($106) {
					return Data_Maybe.Just.create(Data_Either.Right.create($106));
				})(succ(dictBoundedEnum1.Enum1())(v.value0));
			};
			throw new Error("Failed pattern match at Data.Enum (line 86, column 1 - line 90, column 69): " + [v.constructor.name]);
		});
	};
};
let enumBoolean = new Enum(function () {
	return Data_Ord.ordBoolean;
}, function (v) {
	if (v) {
		return new Data_Maybe.Just(false);
	};
	return Data_Maybe.Nothing.value;
}, function (v) {
	if (!v) {
		return new Data_Maybe.Just(true);
	};
	return Data_Maybe.Nothing.value;
});
let downFromIncluding = function (dictEnum) {
	return function (dictUnfoldable1) {
		return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(apply(applyFn)(Data_Tuple.Tuple.create)(pred(dictEnum)));
	};
};
let diag = function (a) {
	return new Data_Tuple.Tuple(a, a);
};
let downFrom = function (dictEnum) {
	return function (dictUnfoldable) {
		return Data_Unfoldable.unfoldr(dictUnfoldable)((function () {
			let $107 = data.map(Data_Maybe.functorMaybe)(diag);
			let $108 = pred(dictEnum);
			return function ($109) {
				return $107($108($109));
			};
		})());
	};
};
let upFrom = function (dictEnum) {
	return function (dictUnfoldable) {
		return Data_Unfoldable.unfoldr(dictUnfoldable)((function () {
			let $110 = data.map(Data_Maybe.functorMaybe)(diag);
			let $111 = succ(dictEnum);
			return function ($112) {
				return $110($111($112));
			};
		})());
	};
};
let defaultToEnum = function (dictBounded) {
	return function (dictEnum) {
		return function (i$prime) {
			let go = function ($copy_i) {
				return function ($copy_x) {
					let $tco_var_i = $copy_i;
					let $tco_done = false;
					let $tco_result;
					function $tco_loop(i, x) {
						let $82 = i === 0;
						if ($82) {
							$tco_done = true;
							return new Data_Maybe.Just(x);
						};
						let v = succ(dictEnum)(x);
						if (v instanceof Data_Maybe.Just) {
							$tco_var_i = i - 1 | 0;
							$copy_x = v.value0;
							return;
						};
						if (v instanceof Data_Maybe.Nothing) {
							$tco_done = true;
							return Data_Maybe.Nothing.value;
						};
						throw new Error("Failed pattern match at Data.Enum (line 293, column 12 - line 295, column 33): " + [v.constructor.name]);
					};
					while (!$tco_done) {
						$tco_result = $tco_loop($tco_var_i, $copy_x);
					};
					return $tco_result;
				};
			};
			let $85 = i$prime < 0;
			if ($85) {
				return Data_Maybe.Nothing.value;
			};
			return go(i$prime)(Data_Bounded.bottom(dictBounded));
		};
	};
};
let defaultSucc = function (toEnum$prime) {
	return function (fromEnum$prime) {
		return function (a) {
			return toEnum$prime(fromEnum$prime(a) + 1 | 0);
		};
	};
};
let defaultPred = function (toEnum$prime) {
	return function (fromEnum$prime) {
		return function (a) {
			return toEnum$prime(fromEnum$prime(a) - 1 | 0);
		};
	};
};
let defaultFromEnum = function (dictEnum) {
	let go = function ($copy_i) {
		return function ($copy_x) {
			let $tco_var_i = $copy_i;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(i, x) {
				let v = pred(dictEnum)(x);
				if (v instanceof Data_Maybe.Just) {
					$tco_var_i = i + 1 | 0;
					$copy_x = v.value0;
					return;
				};
				if (v instanceof Data_Maybe.Nothing) {
					$tco_done = true;
					return i;
				};
				throw new Error("Failed pattern match at Data.Enum (line 306, column 5 - line 308, column 19): " + [v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_i, $copy_x);
			};
			return $tco_result;
		};
	};
	return go(0);
};
let defaultCardinality = function (dictBounded) {
	return function (dictEnum) {
		let go = function ($copy_i) {
			return function ($copy_x) {
				let $tco_var_i = $copy_i;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(i, x) {
					let v = succ(dictEnum)(x);
					if (v instanceof Data_Maybe.Just) {
						$tco_var_i = i + 1 | 0;
						$copy_x = v.value0;
						return;
					};
					if (v instanceof Data_Maybe.Nothing) {
						$tco_done = true;
						return i;
					};
					throw new Error("Failed pattern match at Data.Enum (line 273, column 5 - line 275, column 19): " + [v.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_i, $copy_x);
				};
				return $tco_result;
			};
		};
		return Cardinality(go(1)(Data_Bounded.bottom(dictBounded)));
	};
};
let charToEnum = function (v) {
	if (v >= Data_Bounded.bottom(Data_Bounded.boundedInt) && v <= Data_Bounded.top(Data_Bounded.boundedInt)) {
		return new Data_Maybe.Just(fromCharCode(v));
	};
	return Data_Maybe.Nothing.value;
};
let enumChar = new Enum(function () {
	return Data_Ord.ordChar;
}, defaultPred(charToEnum)(toCharCode), defaultSucc(charToEnum)(toCharCode));
let cardinality = function (dict) {
	return dict.cardinality;
};
let boundedEnumUnit = new BoundedEnum(function () {
	return Data_Bounded.boundedUnit;
}, function () {
	return enumUnit;
}, 1, data._const(0), function (v) {
	if (v === 0) {
		return new Data_Maybe.Just();
	};
	return Data_Maybe.Nothing.value;
});
let boundedEnumOrdering = new BoundedEnum(function () {
	return Data_Bounded.boundedOrdering;
}, function () {
	return enumOrdering;
}, 3, function (v) {
	if (v instanceof Data_Ordering.LT) {
		return 0;
	};
	if (v instanceof Data_Ordering.EQ) {
		return 1;
	};
	if (v instanceof Data_Ordering.GT) {
		return 2;
	};
	throw new Error("Failed pattern match at Data.Enum (line 137, column 1 - line 145, column 18): " + [v.constructor.name]);
}, function (v) {
	if (v === 0) {
		return new Data_Maybe.Just(Data_Ordering.LT.value);
	};
	if (v === 1) {
		return new Data_Maybe.Just(Data_Ordering.EQ.value);
	};
	if (v === 2) {
		return new Data_Maybe.Just(Data_Ordering.GT.value);
	};
	return Data_Maybe.Nothing.value;
});
let boundedEnumChar = new BoundedEnum(function () {
	return Data_Bounded.boundedChar;
}, function () {
	return enumChar;
}, toCharCode(Data_Bounded.top(Data_Bounded.boundedChar)) - toCharCode(Data_Bounded.bottom(Data_Bounded.boundedChar)) | 0, toCharCode, charToEnum);
let boundedEnumBoolean = new BoundedEnum(function () {
	return Data_Bounded.boundedBoolean;
}, function () {
	return enumBoolean;
}, 2, function (v) {
	if (!v) {
		return 0;
	};
	if (v) {
		return 1;
	};
	throw new Error("Failed pattern match at Data.Enum (line 118, column 1 - line 124, column 20): " + [v.constructor.name]);
}, function (v) {
	if (v === 0) {
		return new Data_Maybe.Just(false);
	};
	if (v === 1) {
		return new Data_Maybe.Just(true);
	};
	return Data_Maybe.Nothing.value;
});
module.exports = {
	Enum: Enum,
	succ: succ,
	pred: pred,
	BoundedEnum: BoundedEnum,
	cardinality: cardinality,
	toEnum: toEnum,
	fromEnum: fromEnum,
	toEnumWithDefaults: toEnumWithDefaults,
	Cardinality: Cardinality,
	enumFromTo: enumFromTo,
	enumFromThenTo: enumFromThenTo,
	upFrom: upFrom,
	upFromIncluding: upFromIncluding,
	downFrom: downFrom,
	downFromIncluding: downFromIncluding,
	defaultSucc: defaultSucc,
	defaultPred: defaultPred,
	defaultCardinality: defaultCardinality,
	defaultToEnum: defaultToEnum,
	defaultFromEnum: defaultFromEnum,
	enumBoolean: enumBoolean,
	enumInt: enumInt,
	enumChar: enumChar,
	enumUnit: enumUnit,
	enumOrdering: enumOrdering,
	enumMaybe: enumMaybe,
	enumEither: enumEither,
	enumTuple: enumTuple,
	boundedEnumBoolean: boundedEnumBoolean,
	boundedEnumChar: boundedEnumChar,
	boundedEnumUnit: boundedEnumUnit,
	boundedEnumOrdering: boundedEnumOrdering,
	newtypeCardinality: newtypeCardinality,
	eqCardinality: eqCardinality,
	ordCardinality: ordCardinality,
	showCardinality: showCardinality
};
