const control = require("../control");
const data = require("../data");
let Data_Functor = require("../Data.Functor/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
let Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
let Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
let Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

function identity(dict) {
	return dict.identity;
}

let zero = function (dict) {
	return dict.zero;
};


let one = function (dict) {
	return dict.one;
};

let mul = function (dict) {
	return dict.mul;
};


let add = function (dict) {
	return dict.add;
};

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(function () {
	return semigroupoidFn;
}, function (x) {
	return x;
});

let apply = function (dict) {
	return dict.apply;
};


let applySecond = function (dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Functor._const(identity(categoryFn)))(a))(b);
		};
	};
};

function alt(dict) {
	return dict.alt;
}


let foldrArray = function (f) {
	return function (init) {
		return function (xs) {
			let acc = init;
			let len = xs.length;
			for (let i = len - 1; i >= 0; i--) {
				acc = f(xs[i])(acc);
			}
			return acc;
		};
	};
};

let foldlArray = function (f) {
	return function (init) {
		return function (xs) {
			let acc = init;
			let len = xs.length;
			for (let i = 0; i < len; i++) {
				acc = f(acc)(xs[i]);
			}
			return acc;
		};
	};
};


let Foldable = function (foldMap, foldl, foldr) {
	this.foldMap = foldMap;
	this.foldl = foldl;
	this.foldr = foldr;
};

let foldr = function (dict) {
	return dict.foldr;
};
let indexr = function (dictFoldable) {
	return function (idx) {
		let go = function (a) {
			return function (cursor) {
				if (cursor.elem instanceof Data_Maybe.Just) {
					return cursor;
				};
				let $106 = cursor.pos === idx;
				if ($106) {
					return {
						elem: new Data_Maybe.Just(a),
						pos: cursor.pos
					};
				};
				return {
					pos: cursor.pos + 1 | 0,
					elem: cursor.elem
				};
			};
		};
		let $193 = foldr(dictFoldable)(go)({
			elem: Data_Maybe.Nothing.value,
			pos: 0
		});
		return function ($194) {
			return (function (v) {
				return v.elem;
			})($193($194));
		};
	};
};
let $$null = function (dictFoldable) {
	return foldr(dictFoldable)(function (v) {
		return function (v1) {
			return false;
		};
	})(true);
};
let oneOf = function (dictFoldable) {
	return function (dictPlus) {
		return foldr(dictFoldable)(alt(dictPlus.Alt0()))(control.empty(dictPlus));
	};
};
let oneOfMap = function (dictFoldable) {
	return function (dictPlus) {
		return function (f) {
			return foldr(dictFoldable)((function () {
				let $195 = alt(dictPlus.Alt0());
				return function ($196) {
					return $195(f($196));
				};
			})())(control.empty(dictPlus));
		};
	};
};
let traverse_ = function (dictApplicative) {
	return function (dictFoldable) {
		return function (f) {
			return foldr(dictFoldable)((function () {
				let $197 = applySecond(dictApplicative.Apply0());
				return function ($198) {
					return $197(f($198));
				};
			})())(control.pure(dictApplicative)());
		};
	};
};
let for_ = function (dictApplicative) {
	return function (dictFoldable) {
		return Data_Functor.flip(traverse_(dictApplicative)(dictFoldable));
	};
};
let sequence_ = function (dictApplicative) {
	return function (dictFoldable) {
		return traverse_(dictApplicative)(dictFoldable)(identity(categoryFn));
	};
};
let foldl = function (dict) {
	return dict.foldl;
};
let indexl = function (dictFoldable) {
	return function (idx) {
		let go = function (cursor) {
			return function (a) {
				if (cursor.elem instanceof Data_Maybe.Just) {
					return cursor;
				};
				let $109 = cursor.pos === idx;
				if ($109) {
					return {
						elem: new Data_Maybe.Just(a),
						pos: cursor.pos
					};
				};
				return {
					pos: cursor.pos + 1 | 0,
					elem: cursor.elem
				};
			};
		};
		let $199 = foldl(dictFoldable)(go)({
			elem: Data_Maybe.Nothing.value,
			pos: 0
		});
		return function ($200) {
			return (function (v) {
				return v.elem;
			})($199($200));
		};
	};
};
let intercalate = function (dictFoldable) {
	return function (dictMonoid) {
		return function (sep) {
			return function (xs) {
				let go = function (v) {
					return function (x) {
						if (v.init) {
							return {
								init: false,
								acc: x
							};
						};
						return {
							init: false,
							acc: Data_Semigroup.append(dictMonoid.Semigroup0())(v.acc)(Data_Semigroup.append(dictMonoid.Semigroup0())(sep)(x))
						};
					};
				};
				return (foldl(dictFoldable)(go)({
					init: true,
					acc: Data_Monoid.mempty(dictMonoid)
				})(xs)).acc;
			};
		};
	};
};
let length = function (dictFoldable) {
	return function (dictSemiring) {
		return foldl(dictFoldable)(function (c) {
			return function (v) {
				return add(dictSemiring)(one(dictSemiring))(c);
			};
		})(zero(dictSemiring));
	};
};
let maximumBy = function (dictFoldable) {
	return function (cmp) {
		let max$prime = function (v) {
			return function (v1) {
				if (v instanceof Data_Maybe.Nothing) {
					return new Data_Maybe.Just(v1);
				};
				if (v instanceof Data_Maybe.Just) {
					return new Data_Maybe.Just((function () {
						let $116 = data.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.GT.value);
						if ($116) {
							return v.value0;
						};
						return v1;
					})());
				};
				throw new Error("Failed pattern match at Data.Foldable (line 389, column 3 - line 389, column 27): " + [v.constructor.name, v1.constructor.name]);
			};
		};
		return foldl(dictFoldable)(max$prime)(Data_Maybe.Nothing.value);
	};
};
let maximum = function (dictOrd) {
	return function (dictFoldable) {
		return maximumBy(dictFoldable)(Data_Ord.compare(dictOrd));
	};
};
let minimumBy = function (dictFoldable) {
	return function (cmp) {
		let min$prime = function (v) {
			return function (v1) {
				if (v instanceof Data_Maybe.Nothing) {
					return new Data_Maybe.Just(v1);
				};
				if (v instanceof Data_Maybe.Just) {
					return new Data_Maybe.Just((function () {
						let $120 = data.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.LT.value);
						if ($120) {
							return v.value0;
						};
						return v1;
					})());
				};
				throw new Error("Failed pattern match at Data.Foldable (line 402, column 3 - line 402, column 27): " + [v.constructor.name, v1.constructor.name]);
			};
		};
		return foldl(dictFoldable)(min$prime)(Data_Maybe.Nothing.value);
	};
};
let minimum = function (dictOrd) {
	return function (dictFoldable) {
		return minimumBy(dictFoldable)(Data_Ord.compare(dictOrd));
	};
};
let product = function (dictFoldable) {
	return function (dictSemiring) {
		return foldl(dictFoldable)(mul(dictSemiring))(one(dictSemiring));
	};
};
let sum = function (dictFoldable) {
	return function (dictSemiring) {
		return foldl(dictFoldable)(add(dictSemiring))(zero(dictSemiring));
	};
};
let foldableMultiplicative = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return f(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(v)(z);
		};
	};
});
let foldableMaybe = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			if (v instanceof Data_Maybe.Nothing) {
				return Data_Monoid.mempty(dictMonoid);
			};
			if (v instanceof Data_Maybe.Just) {
				return f(v.value0);
			};
			throw new Error("Failed pattern match at Data.Foldable (line 129, column 1 - line 135, column 27): " + [f.constructor.name, v.constructor.name]);
		};
	};
}, function (v) {
	return function (z) {
		return function (v1) {
			if (v1 instanceof Data_Maybe.Nothing) {
				return z;
			};
			if (v1 instanceof Data_Maybe.Just) {
				return v(z)(v1.value0);
			};
			throw new Error("Failed pattern match at Data.Foldable (line 129, column 1 - line 135, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
		};
	};
}, function (v) {
	return function (z) {
		return function (v1) {
			if (v1 instanceof Data_Maybe.Nothing) {
				return z;
			};
			if (v1 instanceof Data_Maybe.Just) {
				return v(v1.value0)(z);
			};
			throw new Error("Failed pattern match at Data.Foldable (line 129, column 1 - line 135, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
		};
	};
});
let foldableDual = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return f(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(v)(z);
		};
	};
});
let foldableDisj = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return f(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(v)(z);
		};
	};
});
let foldableConj = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return f(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(v)(z);
		};
	};
});
let foldableAdditive = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return f(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return f(v)(z);
		};
	};
});
let foldMapDefaultR = function (dictFoldable) {
	return function (dictMonoid) {
		return function (f) {
			return foldr(dictFoldable)(function (x) {
				return function (acc) {
					return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
				};
			})(Data_Monoid.mempty(dictMonoid));
		};
	};
};
let foldableArray = new Foldable(function (dictMonoid) {
	return foldMapDefaultR(foldableArray)(dictMonoid);
}, foldlArray, foldrArray);
let foldMapDefaultL = function (dictFoldable) {
	return function (dictMonoid) {
		return function (f) {
			return foldl(dictFoldable)(function (acc) {
				return function (x) {
					return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(x));
				};
			})(Data_Monoid.mempty(dictMonoid));
		};
	};
};
let foldMap = function (dict) {
	return dict.foldMap;
};
let foldableFirst = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return foldMap(foldableMaybe)(dictMonoid)(f)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return foldl(foldableMaybe)(f)(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return foldr(foldableMaybe)(f)(z)(v);
		};
	};
});
let foldableLast = new Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			return foldMap(foldableMaybe)(dictMonoid)(f)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return foldl(foldableMaybe)(f)(z)(v);
		};
	};
}, function (f) {
	return function (z) {
		return function (v) {
			return foldr(foldableMaybe)(f)(z)(v);
		};
	};
});
let foldlDefault = function (dictFoldable) {
	return function (c) {
		return function (u) {
			return function (xs) {
				return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(Data_Newtype.unwrap(Data_Newtype.newtypeDual)(foldMap(dictFoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo(categoryFn)))((function () {
					let $201 = Data_Functor.flip(c);
					return function ($202) {
						return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($201($202)));
					};
				})())(xs)))(u);
			};
		};
	};
};
let foldrDefault = function (dictFoldable) {
	return function (c) {
		return function (u) {
			return function (xs) {
				return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo(categoryFn))(function ($203) {
					return Data_Monoid_Endo.Endo(c($203));
				})(xs))(u);
			};
		};
	};
};
let surroundMap = function (dictFoldable) {
	return function (dictSemigroup) {
		return function (d) {
			return function (t) {
				return function (f) {
					let joined = function (a) {
						return function (m) {
							return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(a))(m));
						};
					};
					return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo(categoryFn))(joined)(f))(d);
				};
			};
		};
	};
};
let surround = function (dictFoldable) {
	return function (dictSemigroup) {
		return function (d) {
			return surroundMap(dictFoldable)(dictSemigroup)(d)(identity(categoryFn));
		};
	};
};
let foldM = function (dictFoldable) {
	return function (dictMonad) {
		return function (f) {
			return function (a0) {
				return foldl(dictFoldable)(function (ma) {
					return function (b) {
						return control.bind(dictMonad.Bind1())(ma)(Data_Functor.flip(f)(b));
					};
				})(control.pure(dictMonad.Applicative0())(a0));
			};
		};
	};
};
let fold = function (dictFoldable) {
	return function (dictMonoid) {
		return foldMap(dictFoldable)(dictMonoid)(identity(categoryFn));
	};
};
let findMap = function (dictFoldable) {
	return function (p) {
		let go = function (v) {
			return function (v1) {
				if (v instanceof Data_Maybe.Nothing) {
					return p(v1);
				};
				return v;
			};
		};
		return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
	};
};
let find = function (dictFoldable) {
	return function (p) {
		let go = function (v) {
			return function (v1) {
				if (v instanceof Data_Maybe.Nothing && p(v1)) {
					return new Data_Maybe.Just(v1);
				};
				return v;
			};
		};
		return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
	};
};
let any = function (dictFoldable) {
	return function (dictHeytingAlgebra) {
		return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Newtype.newtypeDisj)(Data_Newtype.newtypeDisj)(Data_Monoid_Disj.Disj)(foldMap(dictFoldable)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra)));
	};
};
let elem = function (dictFoldable) {
	return function (dictEq) {
		let $204 = any(dictFoldable)(Data_HeytingAlgebra.heytingAlgebraBoolean);
		let $205 = data.eq(dictEq);
		return function ($206) {
			return $204($205($206));
		};
	};
};
let notElem = function (dictFoldable) {
	return function (dictEq) {
		return function (x) {
			let $207 = Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean);
			let $208 = elem(dictFoldable)(dictEq)(x);
			return function ($209) {
				return $207($208($209));
			};
		};
	};
};
let or = function (dictFoldable) {
	return function (dictHeytingAlgebra) {
		return any(dictFoldable)(dictHeytingAlgebra)(identity(categoryFn));
	};
};
let all = function (dictFoldable) {
	return function (dictHeytingAlgebra) {
		return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Newtype.newtypeConj)(Data_Newtype.newtypeConj)(Data_Monoid_Conj.Conj)(foldMap(dictFoldable)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra)));
	};
};
let and = function (dictFoldable) {
	return function (dictHeytingAlgebra) {
		return all(dictFoldable)(dictHeytingAlgebra)(identity(categoryFn));
	};
};
module.exports = {
	Foldable: Foldable,
	foldr: foldr,
	foldl: foldl,
	foldMap: foldMap,
	foldrDefault: foldrDefault,
	foldlDefault: foldlDefault,
	foldMapDefaultL: foldMapDefaultL,
	foldMapDefaultR: foldMapDefaultR,
	fold: fold,
	foldM: foldM,
	traverse_: traverse_,
	for_: for_,
	sequence_: sequence_,
	oneOf: oneOf,
	oneOfMap: oneOfMap,
	intercalate: intercalate,
	surroundMap: surroundMap,
	surround: surround,
	and: and,
	or: or,
	all: all,
	any: any,
	sum: sum,
	product: product,
	elem: elem,
	notElem: notElem,
	indexl: indexl,
	indexr: indexr,
	find: find,
	findMap: findMap,
	maximum: maximum,
	maximumBy: maximumBy,
	minimum: minimum,
	minimumBy: minimumBy,
	"null": $$null,
	length: length,
	foldableArray: foldableArray,
	foldableMaybe: foldableMaybe,
	foldableFirst: foldableFirst,
	foldableLast: foldableLast,
	foldableAdditive: foldableAdditive,
	foldableDual: foldableDual,
	foldableDisj: foldableDisj,
	foldableConj: foldableConj,
	foldableMultiplicative: foldableMultiplicative
};
