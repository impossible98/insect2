const control = require("../control");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_CatQueue = require("../Data.CatQueue/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
const data = require('../data');
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


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

let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let semiringInt = new Semiring(intAdd, intMul, 1, 0);

class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}
class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let apply = function (dict) {
	return dict.apply;
};

let CatNil = (function () {
	function CatNil() {

	};
	CatNil.value = new CatNil();
	return CatNil;
})();

let CatCons = (function () {
	function CatCons(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	CatCons.create = function (value0) {
		return function (value1) {
			return new CatCons(value0, value1);
		};
	};
	return CatCons;
})();

let showCatList = function (dictShow) {
	return new Data_Show.Show(function (v) {
		if (v instanceof CatNil) {
			return "CatNil";
		};
		if (v instanceof CatCons) {
			return "(CatList " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(Data_CatQueue.showCatQueue(showCatList(dictShow)))(v.value1) + ")")));
		};
		throw new Error("Failed pattern match at Data.CatList (line 148, column 1 - line 150, column 71): " + [v.constructor.name]);
	});
};

let $$null = function (v) {
	if (v instanceof CatNil) {
		return true;
	};
	return false;
};

let link = function (v) {
	return function (v1) {
		if (v instanceof CatNil) {
			return v1;
		};
		if (v1 instanceof CatNil) {
			return v;
		};
		if (v instanceof CatCons) {
			return new CatCons(v.value0, Data_CatQueue.snoc(v.value1)(v1));
		};
		throw new Error("Failed pattern match at Data.CatList (line 109, column 1 - line 109, column 54): " + [v.constructor.name, v1.constructor.name]);
	};
};

let foldr = function (k) {
	return function (b) {
		return function (q) {
			let foldl = function ($copy_v) {
				return function ($copy_c) {
					return function ($copy_v1) {
						let $tco_var_v = $copy_v;
						let $tco_var_c = $copy_c;
						let $tco_done = false;
						let $tco_result;
						function $tco_loop(v, c, v1) {
							if (v1 instanceof Data_List_Types.Nil) {
								$tco_done = true;
								return c;
							};
							if (v1 instanceof Data_List_Types.Cons) {
								$tco_var_v = v;
								$tco_var_c = v(c)(v1.value0);
								$copy_v1 = v1.value1;
								return;
							};
							throw new Error("Failed pattern match at Data.CatList (line 125, column 3 - line 125, column 59): " + [v.constructor.name, c.constructor.name, v1.constructor.name]);
						};
						while (!$tco_done) {
							$tco_result = $tco_loop($tco_var_v, $tco_var_c, $copy_v1);
						};
						return $tco_result;
					};
				};
			};
			let go = function ($copy_xs) {
				return function ($copy_ys) {
					let $tco_var_xs = $copy_xs;
					let $tco_done = false;
					let $tco_result;
					function $tco_loop(xs, ys) {
						let v = Data_CatQueue.uncons(xs);
						if (v instanceof Data_Maybe.Nothing) {
							$tco_done = true;
							return foldl(function (x) {
								return function (i) {
									return i(x);
								};
							})(b)(ys);
						};
						if (v instanceof Data_Maybe.Just) {
							$tco_var_xs = v.value0.value1;
							$copy_ys = new Data_List_Types.Cons(k(v.value0.value0), ys);
							return;
						};
						throw new Error("Failed pattern match at Data.CatList (line 121, column 14 - line 123, column 67): " + [v.constructor.name]);
					};
					while (!$tco_done) {
						$tco_result = $tco_loop($tco_var_xs, $copy_ys);
					};
					return $tco_result;
				};
			};
			return go(q)(Data_List_Types.Nil.value);
		};
	};
};

let uncons = function (v) {
	if (v instanceof CatNil) {
		return Data_Maybe.Nothing.value;
	};
	if (v instanceof CatCons) {
		return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0, (function () {
			let $44 = Data_CatQueue["null"](v.value1);
			if ($44) {
				return CatNil.value;
			};
			return foldr(link)(CatNil.value)(v.value1);
		})()));
	};
	throw new Error("Failed pattern match at Data.CatList (line 100, column 1 - line 100, column 61): " + [v.constructor.name]);
};
let foldableCatList = new Data_Foldable.Foldable(function (dictMonoid) {
	return Data_Foldable.foldMapDefaultL(foldableCatList)(dictMonoid);
}, function (f) {
	let go = function ($copy_acc) {
		return function ($copy_q) {
			let $tco_var_acc = $copy_acc;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(acc, q) {
				let v = uncons(q);
				if (v instanceof Data_Maybe.Just) {
					$tco_var_acc = f(acc)(v.value0.value0);
					$copy_q = v.value0.value1;
					return;
				};
				if (v instanceof Data_Maybe.Nothing) {
					$tco_done = true;
					return acc;
				};
				throw new Error("Failed pattern match at Data.CatList (line 157, column 16 - line 159, column 22): " + [v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_acc, $copy_q);
			};
			return $tco_result;
		};
	};
	return go;
}, function (f) {
	return function (s) {
		return function (l) {
			return Data_Foldable.foldrDefault(foldableCatList)(f)(s)(l);
		};
	};
});
let length = Data_Foldable.length(foldableCatList)(semiringInt);
let foldMap = function (dictMonoid) {
	return function (f) {
		return function (v) {
			if (v instanceof CatNil) {
				return Data_Monoid.mempty(dictMonoid);
			};
			if (v instanceof CatCons) {
				let d = (function () {
					let $53 = Data_CatQueue["null"](v.value1);
					if ($53) {
						return CatNil.value;
					};
					return foldr(link)(CatNil.value)(v.value1);
				})();
				return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(foldMap(dictMonoid)(f)(d));
			};
			throw new Error("Failed pattern match at Data.CatList (line 135, column 1 - line 135, column 62): " + [f.constructor.name, v.constructor.name]);
		};
	};
};
let empty = CatNil.value;
let append = link;
let cons = function (a) {
	return function (cat) {
		return append(new CatCons(a, Data_CatQueue.empty))(cat);
	};
};
let functorCatList = new data.Functor(function (v) {
	return function (v1) {
		if (v1 instanceof CatNil) {
			return CatNil.value;
		};
		if (v1 instanceof CatCons) {
			let d = (function () {
				let $58 = Data_CatQueue["null"](v1.value1);
				if ($58) {
					return CatNil.value;
				};
				return foldr(link)(CatNil.value)(v1.value1);
			})();
			return cons(v(v1.value0))(data.map(functorCatList)(v)(d));
		};
		throw new Error("Failed pattern match at Data.CatList (line 185, column 1 - line 189, column 26): " + [v.constructor.name, v1.constructor.name]);
	};
});
let singleton = function (a) {
	return cons(a)(CatNil.value);
};
let traversableCatList = new Data_Traversable.Traversable(function () {
	return foldableCatList;
}, function () {
	return functorCatList;
}, function (dictApplicative) {
	return function (v) {
		if (v instanceof CatNil) {
			return control.pure(dictApplicative)(CatNil.value);
		};
		if (v instanceof CatCons) {
			let d = (function () {
				let $62 = Data_CatQueue["null"](v.value1);
				if ($62) {
					return CatNil.value;
				};
				return foldr(link)(CatNil.value)(v.value1);
			})();
			return apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(cons)(v.value0))(Data_Traversable.sequence(traversableCatList)(dictApplicative)(d));
		};
		throw new Error("Failed pattern match at Data.CatList (line 175, column 1 - line 183, column 33): " + [v.constructor.name]);
	};
}, function (dictApplicative) {
	return function (v) {
		return function (v1) {
			if (v1 instanceof CatNil) {
				return control.pure(dictApplicative)(CatNil.value);
			};
			if (v1 instanceof CatCons) {
				let d = (function () {
					let $67 = Data_CatQueue["null"](v1.value1);
					if ($67) {
						return CatNil.value;
					};
					return foldr(link)(CatNil.value)(v1.value1);
				})();
				return apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(cons)(v(v1.value0)))(Data_Traversable.traverse(traversableCatList)(dictApplicative)(v)(d));
			};
			throw new Error("Failed pattern match at Data.CatList (line 175, column 1 - line 183, column 33): " + [v.constructor.name, v1.constructor.name]);
		};
	};
});
let semigroupCatList = new Data_Semigroup.Semigroup(append);
let monoidCatList = new Data_Monoid.Monoid(function () {
	return semigroupCatList;
}, CatNil.value);
let monadCatList = new control.Monad(function () {
	return applicativeCatList;
}, function () {
	return bindCatList;
});
let bindCatList = new control.Bind(function () {
	return applyCatList;
}, data.flip(foldMap(monoidCatList)));
let applyCatList = new Apply(function () {
	return functorCatList;
}, control.ap(monadCatList));
let applicativeCatList = new control.Applicative(function () {
	return applyCatList;
}, singleton);
let fromFoldable = function (dictFoldable) {
	return function (f) {
		return Data_Foldable.foldMap(dictFoldable)(monoidCatList)(singleton)(f);
	};
};
let snoc = function (cat) {
	return function (a) {
		return append(cat)(new CatCons(a, Data_CatQueue.empty));
	};
};
let unfoldable1CatList = new Data_Unfoldable1.Unfoldable1(function (f) {
	return function (b) {
		let go = function ($copy_source) {
			return function ($copy_memo) {
				let $tco_var_source = $copy_source;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(source, memo) {
					let v = f(source);
					if (v.value1 instanceof Data_Maybe.Nothing) {
						$tco_done = true;
						return snoc(memo)(v.value0);
					};
					if (v.value1 instanceof Data_Maybe.Just) {
						$tco_var_source = v.value1.value0;
						$copy_memo = snoc(memo)(v.value0);
						return;
					};
					throw new Error("Failed pattern match at Data.CatList (line 171, column 24 - line 173, column 57): " + [v.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_source, $copy_memo);
				};
				return $tco_result;
			};
		};
		return go(b)(CatNil.value);
	};
});
let unfoldableCatList = new Data_Unfoldable.Unfoldable(function () {
	return unfoldable1CatList;
}, function (f) {
	return function (b) {
		let go = function ($copy_source) {
			return function ($copy_memo) {
				let $tco_var_source = $copy_source;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(source, memo) {
					let v = f(source);
					if (v instanceof Data_Maybe.Nothing) {
						$tco_done = true;
						return memo;
					};
					if (v instanceof Data_Maybe.Just) {
						$tco_var_source = v.value0.value1;
						$copy_memo = snoc(memo)(v.value0.value0);
						return;
					};
					throw new Error("Failed pattern match at Data.CatList (line 164, column 24 - line 166, column 57): " + [v.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_source, $copy_memo);
				};
				return $tco_result;
			};
		};
		return go(b)(CatNil.value);
	};
});
let altCatList = new Alt(function () {
	return functorCatList;
}, append);
let plusCatList = new control.Plus(function () {
	return altCatList;
}, empty);
let alternativeCatList = new Control_Alternative.Alternative(function () {
	return applicativeCatList;
}, function () {
	return plusCatList;
});
let monadZeroCatList = new Control_MonadZero.MonadZero(function () {
	return alternativeCatList;
}, function () {
	return monadCatList;
});
let monadPlusCatList = new Control_MonadPlus.MonadPlus(function () {
	return monadZeroCatList;
});

module.exports = {
	CatNil: CatNil,
	CatCons: CatCons,
	empty: empty,
	"null": $$null,
	singleton: singleton,
	length: length,
	append: append,
	cons: cons,
	snoc: snoc,
	uncons: uncons,
	fromFoldable: fromFoldable,
	semigroupCatList: semigroupCatList,
	monoidCatList: monoidCatList,
	showCatList: showCatList,
	foldableCatList: foldableCatList,
	unfoldableCatList: unfoldableCatList,
	unfoldable1CatList: unfoldable1CatList,
	traversableCatList: traversableCatList,
	functorCatList: functorCatList,
	applyCatList: applyCatList,
	applicativeCatList: applicativeCatList,
	bindCatList: bindCatList,
	monadCatList: monadCatList,
	altCatList: altCatList,
	plusCatList: plusCatList,
	alternativeCatList: alternativeCatList,
	monadZeroCatList: monadZeroCatList,
	monadPlusCatList: monadPlusCatList
};
