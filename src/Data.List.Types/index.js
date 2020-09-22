const control = require("../control");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Control_Plus = require("../Control.Plus/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


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

let addRecord = function (dict) {
	return dict.addRecord;
};

let add = function (dict) {
	return dict.add;
};

class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}

class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
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


let lift2 = function (dictApply) {
	return function (f) {
		return function (a) {
			return function (b) {
				return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b);
			};
		};
	};
};

let Nil = (function () {
	function Nil() {

	};
	Nil.value = new Nil();
	return Nil;
})();
let Cons = (function () {
	function Cons(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Cons.create = function (value0) {
		return function (value1) {
			return new Cons(value0, value1);
		};
	};
	return Cons;
})();
let NonEmptyList = function (x) {
	return x;
};
let toList = function (v) {
	return new Cons(v.value0, v.value1);
};
let newtypeNonEmptyList = new Data_Newtype.Newtype(function (n) {
	return n;
}, NonEmptyList);
let nelCons = function (a) {
	return function (v) {
		return new Data_NonEmpty.NonEmpty(a, new Cons(v.value0, v.value1));
	};
};
let listMap = function (f) {
	let chunkedRevMap = function ($copy_chunksAcc) {
		return function ($copy_v) {
			let $tco_var_chunksAcc = $copy_chunksAcc;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(chunksAcc, v) {
				if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
					$tco_var_chunksAcc = new Cons(v, chunksAcc);
					$copy_v = v.value1.value1.value1;
					return;
				};
				let unrolledMap = function (v1) {
					if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
						return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
					};
					if (v1 instanceof Cons && v1.value1 instanceof Nil) {
						return new Cons(f(v1.value0), Nil.value);
					};
					return Nil.value;
				};
				let reverseUnrolledMap = function ($copy_v1) {
					return function ($copy_acc) {
						let $tco_var_v1 = $copy_v1;
						let $tco_done = false;
						let $tco_result;
						function $tco_loop(v1, acc) {
							if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
								$tco_var_v1 = v1.value1;
								$copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
								return;
							};
							$tco_done = true;
							return acc;
						};
						while (!$tco_done) {
							$tco_result = $tco_loop($tco_var_v1, $copy_acc);
						};
						return $tco_result;
					};
				};
				$tco_done = true;
				return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
			};
			return $tco_result;
		};
	};
	return chunkedRevMap(Nil.value);
};
let functorList = new Data_Functor.Functor(listMap);
let functorNonEmptyList = Data_NonEmpty.functorNonEmpty(functorList);
let foldableList = new Data_Foldable.Foldable(function (dictMonoid) {
	return function (f) {
		return Data_Foldable.foldl(foldableList)(function (acc) {
			let $202 = Data_Semigroup.append(dictMonoid.Semigroup0())(acc);
			return function ($203) {
				return $202(f($203));
			};
		})(Data_Monoid.mempty(dictMonoid));
	};
}, function (f) {
	let go = function ($copy_b) {
		return function ($copy_v) {
			let $tco_var_b = $copy_b;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(b, v) {
				if (v instanceof Nil) {
					$tco_done = true;
					return b;
				};
				if (v instanceof Cons) {
					$tco_var_b = f(b)(v.value0);
					$copy_v = v.value1;
					return;
				};
				throw new Error("Failed pattern match at Data.List.Types (line 109, column 12 - line 111, column 30): " + [v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_b, $copy_v);
			};
			return $tco_result;
		};
	};
	return go;
}, function (f) {
	return function (b) {
		let rev = Data_Foldable.foldl(foldableList)(Data_Functor.flip(Cons.create))(Nil.value);
		let $204 = Data_Foldable.foldl(foldableList)(Data_Functor.flip(f))(b);
		return function ($205) {
			return $204(rev($205));
		};
	};
});
let foldableNonEmptyList = Data_NonEmpty.foldableNonEmpty(foldableList);
let foldableWithIndexList = new Data_FoldableWithIndex.FoldableWithIndex(function () {
	return foldableList;
}, function (dictMonoid) {
	return function (f) {
		return Data_FoldableWithIndex.foldlWithIndex(foldableWithIndexList)(function (i) {
			return function (acc) {
				let $206 = Data_Semigroup.append(dictMonoid.Semigroup0())(acc);
				let $207 = f(i);
				return function ($208) {
					return $206($207($208));
				};
			};
		})(Data_Monoid.mempty(dictMonoid));
	};
}, function (f) {
	return function (acc) {
		let $209 = Data_Foldable.foldl(foldableList)(function (v) {
			return function (a) {
				return new Data_Tuple.Tuple(v.value0 + 1 | 0, f(v.value0)(v.value1)(a));
			};
		})(new Data_Tuple.Tuple(0, acc));
		return function ($210) {
			return Data_Tuple.snd($209($210));
		};
	};
}, function (f) {
	return function (b) {
		return function (xs) {
			let v = (function () {
				let rev = Data_Foldable.foldl(foldableList)(function (v1) {
					return function (a) {
						return new Data_Tuple.Tuple(v1.value0 + 1 | 0, new Cons(a, v1.value1));
					};
				});
				return rev(new Data_Tuple.Tuple(0, Nil.value))(xs);
			})();
			return Data_Tuple.snd(Data_Foldable.foldl(foldableList)(function (v1) {
				return function (a) {
					return new Data_Tuple.Tuple(v1.value0 - 1 | 0, f(v1.value0 - 1 | 0)(a)(v1.value1));
				};
			})(new Data_Tuple.Tuple(v.value0, b))(v.value1));
		};
	};
});
let foldableWithIndexNonEmptyList = new Data_FoldableWithIndex.FoldableWithIndex(function () {
	return foldableNonEmptyList;
}, function (dictMonoid) {
	return function (f) {
		return function (v) {
			return Data_FoldableWithIndex.foldMapWithIndex(Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList))(dictMonoid)((function () {
				let $211 = Data_Maybe.maybe(0)(add(semiringInt)(1));
				return function ($212) {
					return f($211($212));
				};
			})())(v);
		};
	};
}, function (f) {
	return function (b) {
		return function (v) {
			return Data_FoldableWithIndex.foldlWithIndex(Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList))((function () {
				let $213 = Data_Maybe.maybe(0)(add(semiringInt)(1));
				return function ($214) {
					return f($213($214));
				};
			})())(b)(v);
		};
	};
}, function (f) {
	return function (b) {
		return function (v) {
			return Data_FoldableWithIndex.foldrWithIndex(Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList))((function () {
				let $215 = Data_Maybe.maybe(0)(add(semiringInt)(1));
				return function ($216) {
					return f($215($216));
				};
			})())(b)(v);
		};
	};
});
let functorWithIndexList = new Data_FunctorWithIndex.FunctorWithIndex(function () {
	return functorList;
}, function (f) {
	return Data_FoldableWithIndex.foldrWithIndex(foldableWithIndexList)(function (i) {
		return function (x) {
			return function (acc) {
				return new Cons(f(i)(x), acc);
			};
		};
	})(Nil.value);
});
let functorWithIndexNonEmptyList = new Data_FunctorWithIndex.FunctorWithIndex(function () {
	return functorNonEmptyList;
}, function (fn) {
	return function (v) {
		return NonEmptyList(Data_FunctorWithIndex.mapWithIndex(Data_NonEmpty.functorWithIndex(functorWithIndexList))((function () {
			let $217 = Data_Maybe.maybe(0)(add(semiringInt)(1));
			return function ($218) {
				return fn($217($218));
			};
		})())(v));
	};
});
let semigroupList = new Data_Semigroup.Semigroup(function (xs) {
	return function (ys) {
		return Data_Foldable.foldr(foldableList)(Cons.create)(ys)(xs);
	};
});
let monoidList = new Data_Monoid.Monoid(function () {
	return semigroupList;
}, Nil.value);
let semigroupNonEmptyList = new Data_Semigroup.Semigroup(function (v) {
	return function (as$prime) {
		return new Data_NonEmpty.NonEmpty(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(toList(as$prime)));
	};
});
let showList = function (dictShow) {
	return new Data_Show.Show(function (v) {
		if (v instanceof Nil) {
			return "Nil";
		};
		return "(" + (Data_Foldable.intercalate(foldableList)(Data_Monoid.monoidString)(" : ")(Data_Functor.map(functorList)(Data_Show.show(dictShow))(v)) + " : Nil)");
	});
};
let showNonEmptyList = function (dictShow) {
	return new Data_Show.Show(function (v) {
		return "(NonEmptyList " + (Data_Show.show(Data_NonEmpty.showNonEmpty(dictShow)(showList(dictShow)))(v) + ")");
	});
};
let traversableList = new Data_Traversable.Traversable(function () {
	return foldableList;
}, function () {
	return functorList;
}, function (dictApplicative) {
	return Data_Traversable.traverse(traversableList)(dictApplicative)(identity(categoryFn));
}, function (dictApplicative) {
	return function (f) {
		let $219 = Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Foldable.foldl(foldableList)(Data_Functor.flip(Cons.create))(Nil.value));
		let $220 = Data_Foldable.foldl(foldableList)(function (acc) {
			let $222 = lift2(dictApplicative.Apply0())(Data_Functor.flip(Cons.create))(acc);
			return function ($223) {
				return $222(f($223));
			};
		})(control.pure(dictApplicative)(Nil.value));
		return function ($221) {
			return $219($220($221));
		};
	};
});
let traversableNonEmptyList = Data_NonEmpty.traversableNonEmpty(traversableList);
let traversableWithIndexList = new Data_TraversableWithIndex.TraversableWithIndex(function () {
	return foldableWithIndexList;
}, function () {
	return functorWithIndexList;
}, function () {
	return traversableList;
}, function (dictApplicative) {
	return function (f) {
		let rev = Data_Foldable.foldl(foldableList)(Data_Functor.flip(Cons.create))(Nil.value);
		let $224 = Data_Functor.map((dictApplicative.Apply0()).Functor0())(rev);
		let $225 = Data_FoldableWithIndex.foldlWithIndex(foldableWithIndexList)(function (i) {
			return function (acc) {
				let $227 = lift2(dictApplicative.Apply0())(Data_Functor.flip(Cons.create))(acc);
				let $228 = f(i);
				return function ($229) {
					return $227($228($229));
				};
			};
		})(control.pure(dictApplicative)(Nil.value));
		return function ($226) {
			return $224($225($226));
		};
	};
});
let traversableWithIndexNonEmptyList = new Data_TraversableWithIndex.TraversableWithIndex(function () {
	return foldableWithIndexNonEmptyList;
}, function () {
	return functorWithIndexNonEmptyList;
}, function () {
	return traversableNonEmptyList;
}, function (dictApplicative) {
	return function (f) {
		return function (v) {
			return Data_Functor.map((dictApplicative.Apply0()).Functor0())(NonEmptyList)(Data_TraversableWithIndex.traverseWithIndex(Data_NonEmpty.traversableWithIndexNonEmpty(traversableWithIndexList))(dictApplicative)((function () {
				let $230 = Data_Maybe.maybe(0)(add(semiringInt)(1));
				return function ($231) {
					return f($230($231));
				};
			})())(v));
		};
	};
});
let unfoldable1List = new Data_Unfoldable1.Unfoldable1(function (f) {
	return function (b) {
		let go = function ($copy_source) {
			return function ($copy_memo) {
				let $tco_var_source = $copy_source;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(source, memo) {
					let v = f(source);
					if (v.value1 instanceof Data_Maybe.Just) {
						$tco_var_source = v.value1.value0;
						$copy_memo = new Cons(v.value0, memo);
						return;
					};
					if (v.value1 instanceof Data_Maybe.Nothing) {
						$tco_done = true;
						return Data_Foldable.foldl(foldableList)(Data_Functor.flip(Cons.create))(Nil.value)(new Cons(v.value0, memo));
					};
					throw new Error("Failed pattern match at Data.List.Types (line 133, column 22 - line 135, column 61): " + [v.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_source, $copy_memo);
				};
				return $tco_result;
			};
		};
		return go(b)(Nil.value);
	};
});
let unfoldableList = new Data_Unfoldable.Unfoldable(function () {
	return unfoldable1List;
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
						return Data_Foldable.foldl(foldableList)(Data_Functor.flip(Cons.create))(Nil.value)(memo);
					};
					if (v instanceof Data_Maybe.Just) {
						$tco_var_source = v.value0.value1;
						$copy_memo = new Cons(v.value0.value0, memo);
						return;
					};
					throw new Error("Failed pattern match at Data.List.Types (line 140, column 22 - line 142, column 52): " + [v.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_source, $copy_memo);
				};
				return $tco_result;
			};
		};
		return go(b)(Nil.value);
	};
});
let unfoldable1NonEmptyList = Data_NonEmpty.unfoldable1NonEmpty(unfoldableList);
let foldable1NonEmptyList = Data_NonEmpty.foldable1NonEmpty(foldableList);
let extendNonEmptyList = new control.Extend(function () {
	return functorNonEmptyList;
}, function (f) {
	return function (v) {
		let go = function (a) {
			return function (v1) {
				return {
					val: new Cons(f(new Data_NonEmpty.NonEmpty(a, v1.acc)), v1.val),
					acc: new Cons(a, v1.acc)
				};
			};
		};
		return new Data_NonEmpty.NonEmpty(f(v), (Data_Foldable.foldr(foldableList)(go)({
			val: Nil.value,
			acc: Nil.value
		})(v.value1)).val);
	};
});
let extendList = new control.Extend(function () {
	return functorList;
}, function (f) {
	return function (v) {
		if (v instanceof Nil) {
			return Nil.value;
		};
		if (v instanceof Cons) {
			let go = function (a$prime) {
				return function (v1) {
					let acc$prime = new Cons(a$prime, v1.acc);
					return {
						val: new Cons(f(acc$prime), v1.val),
						acc: acc$prime
					};
				};
			};
			return new Cons(f(v), (Data_Foldable.foldr(foldableList)(go)({
				val: Nil.value,
				acc: Nil.value
			})(v.value1)).val);
		};
		throw new Error("Failed pattern match at Data.List.Types (line 180, column 1 - line 187, column 42): " + [f.constructor.name, v.constructor.name]);
	};
});
let eq1List = new data.Eq1(function (dictEq) {
	return function (xs) {
		return function (ys) {
			let go = function ($copy_v) {
				return function ($copy_v1) {
					return function ($copy_v2) {
						let $tco_var_v = $copy_v;
						let $tco_var_v1 = $copy_v1;
						let $tco_done = false;
						let $tco_result;
						function $tco_loop(v, v1, v2) {
							if (!v2) {
								$tco_done = true;
								return false;
							};
							if (v instanceof Nil && v1 instanceof Nil) {
								$tco_done = true;
								return v2;
							};
							if (v instanceof Cons && v1 instanceof Cons) {
								$tco_var_v = v.value1;
								$tco_var_v1 = v1.value1;
								$copy_v2 = v2 && data.eq(dictEq)(v1.value0)(v.value0);
								return;
							};
							$tco_done = true;
							return false;
						};
						while (!$tco_done) {
							$tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
						};
						return $tco_result;
					};
				};
			};
			return go(xs)(ys)(true);
		};
	};
});
let eqList = function (dictEq) {
	return new data.Eq(data.eq1(eq1List)(dictEq));
};
let eqNonEmptyList = function (dictEq) {
	return Data_NonEmpty.eqNonEmpty(eq1List)(dictEq);
};
let ord1List = new Data_Ord.Ord1(function () {
	return eq1List;
}, function (dictOrd) {
	return function (xs) {
		return function (ys) {
			let go = function ($copy_v) {
				return function ($copy_v1) {
					let $tco_var_v = $copy_v;
					let $tco_done = false;
					let $tco_result;
					function $tco_loop(v, v1) {
						if (v instanceof Nil && v1 instanceof Nil) {
							$tco_done = true;
							return Data_Ordering.EQ.value;
						};
						if (v instanceof Nil) {
							$tco_done = true;
							return Data_Ordering.LT.value;
						};
						if (v1 instanceof Nil) {
							$tco_done = true;
							return Data_Ordering.GT.value;
						};
						if (v instanceof Cons && v1 instanceof Cons) {
							let v2 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
							if (v2 instanceof Data_Ordering.EQ) {
								$tco_var_v = v.value1;
								$copy_v1 = v1.value1;
								return;
							};
							$tco_done = true;
							return v2;
						};
						throw new Error("Failed pattern match at Data.List.Types (line 61, column 5 - line 61, column 20): " + [v.constructor.name, v1.constructor.name]);
					};
					while (!$tco_done) {
						$tco_result = $tco_loop($tco_var_v, $copy_v1);
					};
					return $tco_result;
				};
			};
			return go(xs)(ys);
		};
	};
});
let ordList = function (dictOrd) {
	return new Data_Ord.Ord(function () {
		return eqList(dictOrd.Eq0());
	}, Data_Ord.compare1(ord1List)(dictOrd));
};
let ordNonEmptyList = function (dictOrd) {
	return Data_NonEmpty.ordNonEmpty(ord1List)(dictOrd);
};
let comonadNonEmptyList = new control.Comonad(function () {
	return extendNonEmptyList;
}, function (v) {
	return v.value0;
});
let applyList = new Apply(function () {
	return functorList;
}, function (v) {
	return function (v1) {
		if (v instanceof Nil) {
			return Nil.value;
		};
		if (v instanceof Cons) {
			return Data_Semigroup.append(semigroupList)(Data_Functor.map(functorList)(v.value0)(v1))(apply(applyList)(v.value1)(v1));
		};
		throw new Error("Failed pattern match at Data.List.Types (line 155, column 1 - line 157, column 48): " + [v.constructor.name, v1.constructor.name]);
	};
});
let applyNonEmptyList = new Apply(function () {
	return functorNonEmptyList;
}, function (v) {
	return function (v1) {
		return new Data_NonEmpty.NonEmpty(v.value0(v1.value0), Data_Semigroup.append(semigroupList)(apply(applyList)(v.value1)(new Cons(v1.value0, Nil.value)))(apply(applyList)(new Cons(v.value0, v.value1))(v1.value1)));
	};
});
let bindList = new control.Bind(function () {
	return applyList;
}, function (v) {
	return function (v1) {
		if (v instanceof Nil) {
			return Nil.value;
		};
		if (v instanceof Cons) {
			return Data_Semigroup.append(semigroupList)(v1(v.value0))(control.bind(bindList)(v.value1)(v1));
		};
		throw new Error("Failed pattern match at Data.List.Types (line 162, column 1 - line 164, column 37): " + [v.constructor.name, v1.constructor.name]);
	};
});
let bindNonEmptyList = new control.Bind(function () {
	return applyNonEmptyList;
}, function (v) {
	return function (f) {
		let v1 = f(v.value0);
		return new Data_NonEmpty.NonEmpty(v1.value0, Data_Semigroup.append(semigroupList)(v1.value1)(control.bind(bindList)(v.value1)(function ($232) {
			return toList(f($232));
		})));
	};
});
let applicativeList = new control.Applicative(function () {
	return applyList;
}, function (a) {
	return new Cons(a, Nil.value);
});
let monadList = new control.Monad(function () {
	return applicativeList;
}, function () {
	return bindList;
});
let altNonEmptyList = new Alt(function () {
	return functorNonEmptyList;
}, Data_Semigroup.append(semigroupNonEmptyList));
let altList = new Alt(function () {
	return functorList;
}, Data_Semigroup.append(semigroupList));
let plusList = new Control_Plus.Plus(function () {
	return altList;
}, Nil.value);
let alternativeList = new Alternative(function () {
	return applicativeList;
}, function () {
	return plusList;
});
let monadZeroList = new Control_MonadZero.MonadZero(function () {
	return alternativeList;
}, function () {
	return monadList;
});
let monadPlusList = new Control_MonadPlus.MonadPlus(function () {
	return monadZeroList;
});
let applicativeNonEmptyList = new control.Applicative(function () {
	return applyNonEmptyList;
}, (function () {
	let $233 = Data_NonEmpty.singleton(plusList);
	return function ($234) {
		return NonEmptyList($233($234));
	};
})());
let monadNonEmptyList = new control.Monad(function () {
	return applicativeNonEmptyList;
}, function () {
	return bindNonEmptyList;
});
let traversable1NonEmptyList = new Data_Semigroup_Traversable.Traversable1(function () {
	return foldable1NonEmptyList;
}, function () {
	return traversableNonEmptyList;
}, function (dictApply) {
	return Data_Semigroup_Traversable.traverse1(traversable1NonEmptyList)(dictApply)(identity(categoryFn));
}, function (dictApply) {
	return function (f) {
		return function (v) {
			return Data_Functor.mapFlipped(dictApply.Functor0())(Data_Foldable.foldl(foldableList)(function (acc) {
				let $235 = lift2(dictApply)(Data_Functor.flip(nelCons))(acc);
				return function ($236) {
					return $235(f($236));
				};
			})(Data_Functor.map(dictApply.Functor0())(control.pure(applicativeNonEmptyList))(f(v.value0)))(v.value1))(function (v1) {
				return Data_Foldable.foldl(foldableList)(Data_Functor.flip(nelCons))(control.pure(applicativeNonEmptyList)(v1.value0))(v1.value1);
			});
		};
	};
});
module.exports = {
	Nil: Nil,
	Cons: Cons,
	NonEmptyList: NonEmptyList,
	toList: toList,
	nelCons: nelCons,
	showList: showList,
	eqList: eqList,
	eq1List: eq1List,
	ordList: ordList,
	ord1List: ord1List,
	semigroupList: semigroupList,
	monoidList: monoidList,
	functorList: functorList,
	functorWithIndexList: functorWithIndexList,
	foldableList: foldableList,
	foldableWithIndexList: foldableWithIndexList,
	unfoldable1List: unfoldable1List,
	unfoldableList: unfoldableList,
	traversableList: traversableList,
	traversableWithIndexList: traversableWithIndexList,
	applyList: applyList,
	applicativeList: applicativeList,
	bindList: bindList,
	monadList: monadList,
	altList: altList,
	plusList: plusList,
	alternativeList: alternativeList,
	monadZeroList: monadZeroList,
	monadPlusList: monadPlusList,
	extendList: extendList,
	newtypeNonEmptyList: newtypeNonEmptyList,
	eqNonEmptyList: eqNonEmptyList,
	ordNonEmptyList: ordNonEmptyList,
	showNonEmptyList: showNonEmptyList,
	functorNonEmptyList: functorNonEmptyList,
	applyNonEmptyList: applyNonEmptyList,
	applicativeNonEmptyList: applicativeNonEmptyList,
	bindNonEmptyList: bindNonEmptyList,
	monadNonEmptyList: monadNonEmptyList,
	altNonEmptyList: altNonEmptyList,
	extendNonEmptyList: extendNonEmptyList,
	comonadNonEmptyList: comonadNonEmptyList,
	semigroupNonEmptyList: semigroupNonEmptyList,
	foldableNonEmptyList: foldableNonEmptyList,
	traversableNonEmptyList: traversableNonEmptyList,
	foldable1NonEmptyList: foldable1NonEmptyList,
	unfoldable1NonEmptyList: unfoldable1NonEmptyList,
	functorWithIndexNonEmptyList: functorWithIndexNonEmptyList,
	foldableWithIndexNonEmptyList: foldableWithIndexNonEmptyList,
	traversableWithIndexNonEmptyList: traversableWithIndexNonEmptyList,
	traversable1NonEmptyList: traversable1NonEmptyList
};
