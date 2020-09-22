const control = require('../control');
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");

let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");


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

function alt(dict) {
	return dict.alt;
}
let Pattern = function (x) {
	return x;
};
let updateAt = function (v) {
	return function (v1) {
		return function (v2) {
			if (v === 0 && v2 instanceof Data_List_Types.Cons) {
				return new Data_Maybe.Just(new Data_List_Types.Cons(v1, v2.value1));
			};
			if (v2 instanceof Data_List_Types.Cons) {
				return data.map(Data_Maybe.functorMaybe)(function (v3) {
					return new Data_List_Types.Cons(v2.value0, v3);
				})(updateAt(v - 1 | 0)(v1)(v2.value1));
			};
			return Data_Maybe.Nothing.value;
		};
	};
};
let unzip = Data_Foldable.foldr(Data_List_Types.foldableList)(function (v) {
	return function (v1) {
		return new Data_Tuple.Tuple(new Data_List_Types.Cons(v.value0, v1.value0), new Data_List_Types.Cons(v.value1, v1.value1));
	};
})(new Data_Tuple.Tuple(Data_List_Types.Nil.value, Data_List_Types.Nil.value));
let uncons = function (v) {
	if (v instanceof Data_List_Types.Nil) {
		return Data_Maybe.Nothing.value;
	};
	if (v instanceof Data_List_Types.Cons) {
		return new Data_Maybe.Just({
			head: v.value0,
			tail: v.value1
		});
	};
	throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
};
let toUnfoldable = function (dictUnfoldable) {
	return Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
		return data.map(Data_Maybe.functorMaybe)(function (rec) {
			return new Data_Tuple.Tuple(rec.head, rec.tail);
		})(uncons(xs));
	});
};
let tail = function (v) {
	if (v instanceof Data_List_Types.Nil) {
		return Data_Maybe.Nothing.value;
	};
	if (v instanceof Data_List_Types.Cons) {
		return new Data_Maybe.Just(v.value1);
	};
	throw new Error("Failed pattern match at Data.List (line 245, column 1 - line 245, column 43): " + [v.constructor.name]);
};
let stripPrefix = function (dictEq) {
	return function (v) {
		return function (s) {
			let go = function (prefix) {
				return function (input) {
					if (prefix instanceof Data_List_Types.Cons && (input instanceof Data_List_Types.Cons && data.eq(dictEq)(prefix.value0)(input.value0))) {
						return Data_Maybe.Just.create(new Control_Monad_Rec_Class.Loop({
							a: prefix.value1,
							b: input.value1
						}));
					};
					if (prefix instanceof Data_List_Types.Nil) {
						return Data_Maybe.Just.create(new Control_Monad_Rec_Class.Done(input));
					};
					return Data_Maybe.Nothing.value;
				};
			};
			return Control_Monad_Rec_Class.tailRecM2(Control_Monad_Rec_Class.monadRecMaybe)(go)(v)(s);
		};
	};
};
let span = function (v) {
	return function (v1) {
		if (v1 instanceof Data_List_Types.Cons && v(v1.value0)) {
			let v2 = span(v)(v1.value1);
			return {
				init: new Data_List_Types.Cons(v1.value0, v2.init),
				rest: v2.rest
			};
		};
		return {
			init: Data_List_Types.Nil.value,
			rest: v1
		};
	};
};
let snoc = function (xs) {
	return function (x) {
		return Data_Foldable.foldr(Data_List_Types.foldableList)(Data_List_Types.Cons.create)(new Data_List_Types.Cons(x, Data_List_Types.Nil.value))(xs);
	};
};
let singleton = function (a) {
	return new Data_List_Types.Cons(a, Data_List_Types.Nil.value);
};
let sortBy = function (cmp) {
	let merge = function (v) {
		return function (v1) {
			if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
				if (data.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1.value0))(Data_Ordering.GT.value)) {
					return new Data_List_Types.Cons(v1.value0, merge(v)(v1.value1));
				};
				if (true) {
					return new Data_List_Types.Cons(v.value0, merge(v.value1)(v1));
				};
			};
			if (v instanceof Data_List_Types.Nil) {
				return v1;
			};
			if (v1 instanceof Data_List_Types.Nil) {
				return v;
			};
			throw new Error("Failed pattern match at Data.List (line 473, column 3 - line 473, column 38): " + [v.constructor.name, v1.constructor.name]);
		};
	};
	let mergePairs = function (v) {
		if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Cons) {
			return new Data_List_Types.Cons(merge(v.value0)(v.value1.value0), mergePairs(v.value1.value1));
		};
		return v;
	};
	let mergeAll = function ($copy_v) {
		let $tco_done = false;
		let $tco_result;
		function $tco_loop(v) {
			if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
				$tco_done = true;
				return v.value0;
			};
			$copy_v = mergePairs(v);
			return;
		};
		while (!$tco_done) {
			$tco_result = $tco_loop($copy_v);
		};
		return $tco_result;
	};
	let sequences = function (v) {
		if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Cons) {
			if (data.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v.value1.value0))(Data_Ordering.GT.value)) {
				return descending(v.value1.value0)(singleton(v.value0))(v.value1.value1);
			};
			if (true) {
				return ascending(v.value1.value0)(function (v1) {
					return new Data_List_Types.Cons(v.value0, v1);
				})(v.value1.value1);
			};
		};
		return singleton(v);
	};
	let descending = function ($copy_a) {
		return function ($copy_as) {
			return function ($copy_v) {
				let $tco_var_a = $copy_a;
				let $tco_var_as = $copy_as;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(a, as, v) {
					if (v instanceof Data_List_Types.Cons && data.eq(Data_Ordering.eqOrdering)(cmp(a)(v.value0))(Data_Ordering.GT.value)) {
						$tco_var_a = v.value0;
						$tco_var_as = new Data_List_Types.Cons(a, as);
						$copy_v = v.value1;
						return;
					};
					$tco_done = true;
					return new Data_List_Types.Cons(new Data_List_Types.Cons(a, as), sequences(v));
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_a, $tco_var_as, $copy_v);
				};
				return $tco_result;
			};
		};
	};
	let ascending = function ($copy_a) {
		return function ($copy_as) {
			return function ($copy_v) {
				let $tco_var_a = $copy_a;
				let $tco_var_as = $copy_as;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(a, as, v) {
					if (v instanceof Data_List_Types.Cons && data.notEq(Data_Ordering.eqOrdering)(cmp(a)(v.value0))(Data_Ordering.GT.value)) {
						$tco_var_a = v.value0;
						$tco_var_as = function (ys) {
							return as(new Data_List_Types.Cons(a, ys));
						};
						$copy_v = v.value1;
						return;
					};
					$tco_done = true;
					return new Data_List_Types.Cons(as(singleton(a)), sequences(v));
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_a, $tco_var_as, $copy_v);
				};
				return $tco_result;
			};
		};
	};
	return function ($331) {
		return mergeAll(sequences($331));
	};
};
let sort = function (dictOrd) {
	return function (xs) {
		return sortBy(Data_Ord.compare(dictOrd))(xs);
	};
};
let tails = function (v) {
	if (v instanceof Data_List_Types.Nil) {
		return singleton(Data_List_Types.Nil.value);
	};
	if (v instanceof Data_List_Types.Cons) {
		return new Data_List_Types.Cons(v, tails(v.value1));
	};
	throw new Error("Failed pattern match at Data.List (line 626, column 1 - line 626, column 43): " + [v.constructor.name]);
};
let showPattern = function (dictShow) {
	return new Data_Show.Show(function (v) {
		return "(Pattern " + (Data_Show.show(Data_List_Types.showList(dictShow))(v) + ")");
	});
};
let reverse = (function () {
	let go = function ($copy_acc) {
		return function ($copy_v) {
			let $tco_var_acc = $copy_acc;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(acc, v) {
				if (v instanceof Data_List_Types.Nil) {
					$tco_done = true;
					return acc;
				};
				if (v instanceof Data_List_Types.Cons) {
					$tco_var_acc = new Data_List_Types.Cons(v.value0, acc);
					$copy_v = v.value1;
					return;
				};
				throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_acc, $copy_v);
			};
			return $tco_result;
		};
	};
	return go(Data_List_Types.Nil.value);
})();
let take = (function () {
	let go = function ($copy_acc) {
		return function ($copy_v) {
			return function ($copy_v1) {
				let $tco_var_acc = $copy_acc;
				let $tco_var_v = $copy_v;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(acc, v, v1) {
					if (v < 1) {
						$tco_done = true;
						return reverse(acc);
					};
					if (v1 instanceof Data_List_Types.Nil) {
						$tco_done = true;
						return reverse(acc);
					};
					if (v1 instanceof Data_List_Types.Cons) {
						$tco_var_acc = new Data_List_Types.Cons(v1.value0, acc);
						$tco_var_v = v - 1 | 0;
						$copy_v1 = v1.value1;
						return;
					};
					throw new Error("Failed pattern match at Data.List (line 520, column 3 - line 520, column 35): " + [acc.constructor.name, v.constructor.name, v1.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_acc, $tco_var_v, $copy_v1);
				};
				return $tco_result;
			};
		};
	};
	return go(Data_List_Types.Nil.value);
})();
let takeWhile = function (p) {
	let go = function ($copy_acc) {
		return function ($copy_v) {
			let $tco_var_acc = $copy_acc;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(acc, v) {
				if (v instanceof Data_List_Types.Cons && p(v.value0)) {
					$tco_var_acc = new Data_List_Types.Cons(v.value0, acc);
					$copy_v = v.value1;
					return;
				};
				$tco_done = true;
				return reverse(acc);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_acc, $copy_v);
			};
			return $tco_result;
		};
	};
	return go(Data_List_Types.Nil.value);
};
let unsnoc = function (lst) {
	let go = function ($copy_v) {
		return function ($copy_acc) {
			let $tco_var_v = $copy_v;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(v, acc) {
				if (v instanceof Data_List_Types.Nil) {
					$tco_done = true;
					return Data_Maybe.Nothing.value;
				};
				if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
					$tco_done = true;
					return new Data_Maybe.Just({
						revInit: acc,
						last: v.value0
					});
				};
				if (v instanceof Data_List_Types.Cons) {
					$tco_var_v = v.value1;
					$copy_acc = new Data_List_Types.Cons(v.value0, acc);
					return;
				};
				throw new Error("Failed pattern match at Data.List (line 270, column 3 - line 270, column 23): " + [v.constructor.name, acc.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_v, $copy_acc);
			};
			return $tco_result;
		};
	};
	return data.map(Data_Maybe.functorMaybe)(function (h) {
		return {
			init: reverse(h.revInit),
			last: h.last
		};
	})(go(lst)(Data_List_Types.Nil.value));
};
let zipWith = function (f) {
	return function (xs) {
		return function (ys) {
			let go = function ($copy_v) {
				return function ($copy_v1) {
					return function ($copy_acc) {
						let $tco_var_v = $copy_v;
						let $tco_var_v1 = $copy_v1;
						let $tco_done = false;
						let $tco_result;
						function $tco_loop(v, v1, acc) {
							if (v instanceof Data_List_Types.Nil) {
								$tco_done = true;
								return acc;
							};
							if (v1 instanceof Data_List_Types.Nil) {
								$tco_done = true;
								return acc;
							};
							if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
								$tco_var_v = v.value1;
								$tco_var_v1 = v1.value1;
								$copy_acc = new Data_List_Types.Cons(f(v.value0)(v1.value0), acc);
								return;
							};
							throw new Error("Failed pattern match at Data.List (line 718, column 3 - line 718, column 21): " + [v.constructor.name, v1.constructor.name, acc.constructor.name]);
						};
						while (!$tco_done) {
							$tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_acc);
						};
						return $tco_result;
					};
				};
			};
			return reverse(go(xs)(ys)(Data_List_Types.Nil.value));
		};
	};
};
let zip = zipWith(Data_Tuple.Tuple.create);
let zipWithA = function (dictApplicative) {
	return function (f) {
		return function (xs) {
			return function (ys) {
				return Data_Traversable.sequence(Data_List_Types.traversableList)(dictApplicative)(zipWith(f)(xs)(ys));
			};
		};
	};
};
let range = function (start) {
	return function (end) {
		if (start === end) {
			return singleton(start);
		};
		if (true) {
			let go = function ($copy_s) {
				return function ($copy_e) {
					return function ($copy_step) {
						return function ($copy_rest) {
							let $tco_var_s = $copy_s;
							let $tco_var_e = $copy_e;
							let $tco_var_step = $copy_step;
							let $tco_done = false;
							let $tco_result;
							function $tco_loop(s, e, step, rest) {
								if (s === e) {
									$tco_done = true;
									return new Data_List_Types.Cons(s, rest);
								};
								if (true) {
									$tco_var_s = s + step | 0;
									$tco_var_e = e;
									$tco_var_step = step;
									$copy_rest = new Data_List_Types.Cons(s, rest);
									return;
								};
								throw new Error("Failed pattern match at Data.List (line 148, column 3 - line 149, column 65): " + [s.constructor.name, e.constructor.name, step.constructor.name, rest.constructor.name]);
							};
							while (!$tco_done) {
								$tco_result = $tco_loop($tco_var_s, $tco_var_e, $tco_var_step, $copy_rest);
							};
							return $tco_result;
						};
					};
				};
			};
			return go(end)(start)((function () {
				let $220 = start > end;
				if ($220) {
					return 1;
				};
				return -1 | 0;
			})())(Data_List_Types.Nil.value);
		};
		throw new Error("Failed pattern match at Data.List (line 144, column 1 - line 144, column 32): " + [start.constructor.name, end.constructor.name]);
	};
};
let partition = function (p) {
	return function (xs) {
		let select = function (x) {
			return function (v) {
				let $223 = p(x);
				if ($223) {
					return {
						no: v.no,
						yes: new Data_List_Types.Cons(x, v.yes)
					};
				};
				return {
					no: new Data_List_Types.Cons(x, v.no),
					yes: v.yes
				};
			};
		};
		return Data_Foldable.foldr(Data_List_Types.foldableList)(select)({
			no: Data_List_Types.Nil.value,
			yes: Data_List_Types.Nil.value
		})(xs);
	};
};
let $$null = function (v) {
	if (v instanceof Data_List_Types.Nil) {
		return true;
	};
	return false;
};
let newtypePattern = new Data_Newtype.Newtype(function (n) {
	return n;
}, Pattern);
let mapWithIndex = Data_FunctorWithIndex.mapWithIndex(Data_List_Types.functorWithIndexList);
let mapMaybe = function (f) {
	let go = function ($copy_acc) {
		return function ($copy_v) {
			let $tco_var_acc = $copy_acc;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(acc, v) {
				if (v instanceof Data_List_Types.Nil) {
					$tco_done = true;
					return reverse(acc);
				};
				if (v instanceof Data_List_Types.Cons) {
					let v1 = f(v.value0);
					if (v1 instanceof Data_Maybe.Nothing) {
						$tco_var_acc = acc;
						$copy_v = v.value1;
						return;
					};
					if (v1 instanceof Data_Maybe.Just) {
						$tco_var_acc = new Data_List_Types.Cons(v1.value0, acc);
						$copy_v = v.value1;
						return;
					};
					throw new Error("Failed pattern match at Data.List (line 419, column 5 - line 421, column 32): " + [v1.constructor.name]);
				};
				throw new Error("Failed pattern match at Data.List (line 417, column 3 - line 417, column 27): " + [acc.constructor.name, v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_acc, $copy_v);
			};
			return $tco_result;
		};
	};
	return go(Data_List_Types.Nil.value);
};
let manyRec = function (dictMonadRec) {
	return function (dictAlternative) {
		return function (p) {
			let go = function (acc) {
				return control.bind((dictMonadRec.Monad0()).Bind1())(alt((dictAlternative.Plus1()).Alt0())(data.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Control_Monad_Rec_Class.Loop.create)(p))(control.pure(dictAlternative.Applicative0())(new Control_Monad_Rec_Class.Done())))(function (aa) {
					return control.pure(dictAlternative.Applicative0())(Data_Bifunctor.bimap(Control_Monad_Rec_Class.bifunctorStep)(function (v) {
						return new Data_List_Types.Cons(v, acc);
					})(function (v) {
						return reverse(acc);
					})(aa));
				});
			};
			return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)(Data_List_Types.Nil.value);
		};
	};
};
let someRec = function (dictMonadRec) {
	return function (dictAlternative) {
		return function (v) {
			return apply((dictAlternative.Applicative0()).Apply0())(data.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Data_List_Types.Cons.create)(v))(manyRec(dictMonadRec)(dictAlternative)(v));
		};
	};
};
let some = function (dictAlternative) {
	return function (dictLazy) {
		return function (v) {
			return apply((dictAlternative.Applicative0()).Apply0())(data.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Data_List_Types.Cons.create)(v))(control.defer(dictLazy)(function (v1) {
				return many(dictAlternative)(dictLazy)(v);
			}));
		};
	};
};
let many = function (dictAlternative) {
	return function (dictLazy) {
		return function (v) {
			return alt((dictAlternative.Plus1()).Alt0())(some(dictAlternative)(dictLazy)(v))(control.pure(dictAlternative.Applicative0())(Data_List_Types.Nil.value));
		};
	};
};
let length = Data_Foldable.foldl(Data_List_Types.foldableList)(function (acc) {
	return function (v) {
		return acc + 1 | 0;
	};
})(0);
let last = function ($copy_v) {
	let $tco_done = false;
	let $tco_result;
	function $tco_loop(v) {
		if (v instanceof Data_List_Types.Cons && v.value1 instanceof Data_List_Types.Nil) {
			$tco_done = true;
			return new Data_Maybe.Just(v.value0);
		};
		if (v instanceof Data_List_Types.Cons) {
			$copy_v = v.value1;
			return;
		};
		$tco_done = true;
		return Data_Maybe.Nothing.value;
	};
	while (!$tco_done) {
		$tco_result = $tco_loop($copy_v);
	};
	return $tco_result;
};
let insertBy = function (v) {
	return function (x) {
		return function (v1) {
			if (v1 instanceof Data_List_Types.Nil) {
				return singleton(x);
			};
			if (v1 instanceof Data_List_Types.Cons) {
				let v2 = v(x)(v1.value0);
				if (v2 instanceof Data_Ordering.GT) {
					return new Data_List_Types.Cons(v1.value0, insertBy(v)(x)(v1.value1));
				};
				return new Data_List_Types.Cons(x, v1);
			};
			throw new Error("Failed pattern match at Data.List (line 216, column 1 - line 216, column 68): " + [v.constructor.name, x.constructor.name, v1.constructor.name]);
		};
	};
};
let insertAt = function (v) {
	return function (v1) {
		return function (v2) {
			if (v === 0) {
				return new Data_Maybe.Just(new Data_List_Types.Cons(v1, v2));
			};
			if (v2 instanceof Data_List_Types.Cons) {
				return data.map(Data_Maybe.functorMaybe)(function (v3) {
					return new Data_List_Types.Cons(v2.value0, v3);
				})(insertAt(v - 1 | 0)(v1)(v2.value1));
			};
			return Data_Maybe.Nothing.value;
		};
	};
};
let insert = function (dictOrd) {
	return insertBy(Data_Ord.compare(dictOrd));
};
let init = function (lst) {
	return data.map(Data_Maybe.functorMaybe)(function (v) {
		return v.init;
	})(unsnoc(lst));
};
let index = function ($copy_v) {
	return function ($copy_v1) {
		let $tco_var_v = $copy_v;
		let $tco_done = false;
		let $tco_result;
		function $tco_loop(v, v1) {
			if (v instanceof Data_List_Types.Nil) {
				$tco_done = true;
				return Data_Maybe.Nothing.value;
			};
			if (v instanceof Data_List_Types.Cons && v1 === 0) {
				$tco_done = true;
				return new Data_Maybe.Just(v.value0);
			};
			if (v instanceof Data_List_Types.Cons) {
				$tco_var_v = v.value1;
				$copy_v1 = v1 - 1 | 0;
				return;
			};
			throw new Error("Failed pattern match at Data.List (line 281, column 1 - line 281, column 44): " + [v.constructor.name, v1.constructor.name]);
		};
		while (!$tco_done) {
			$tco_result = $tco_loop($tco_var_v, $copy_v1);
		};
		return $tco_result;
	};
};
let head = function (v) {
	if (v instanceof Data_List_Types.Nil) {
		return Data_Maybe.Nothing.value;
	};
	if (v instanceof Data_List_Types.Cons) {
		return new Data_Maybe.Just(v.value0);
	};
	throw new Error("Failed pattern match at Data.List (line 230, column 1 - line 230, column 22): " + [v.constructor.name]);
};
let transpose = function (v) {
	if (v instanceof Data_List_Types.Nil) {
		return Data_List_Types.Nil.value;
	};
	if (v instanceof Data_List_Types.Cons && v.value0 instanceof Data_List_Types.Nil) {
		return transpose(v.value1);
	};
	if (v instanceof Data_List_Types.Cons && v.value0 instanceof Data_List_Types.Cons) {
		return new Data_List_Types.Cons(new Data_List_Types.Cons(v.value0.value0, mapMaybe(head)(v.value1)), transpose(new Data_List_Types.Cons(v.value0.value1, mapMaybe(tail)(v.value1))));
	};
	throw new Error("Failed pattern match at Data.List (line 752, column 1 - line 752, column 54): " + [v.constructor.name]);
};
let groupBy = function (v) {
	return function (v1) {
		if (v1 instanceof Data_List_Types.Nil) {
			return Data_List_Types.Nil.value;
		};
		if (v1 instanceof Data_List_Types.Cons) {
			let v2 = span(v(v1.value0))(v1.value1);
			return new Data_List_Types.Cons(new Data_NonEmpty.NonEmpty(v1.value0, v2.init), groupBy(v)(v2.rest));
		};
		throw new Error("Failed pattern match at Data.List (line 605, column 1 - line 605, column 80): " + [v.constructor.name, v1.constructor.name]);
	};
};
let group = function (dictEq) {
	return groupBy(data.eq(dictEq));
};
let group$prime = function (dictOrd) {
	let $332 = group(dictOrd.Eq0());
	let $333 = sort(dictOrd);
	return function ($334) {
		return $332($333($334));
	};
};
let fromFoldable = function (dictFoldable) {
	return Data_Foldable.foldr(dictFoldable)(Data_List_Types.Cons.create)(Data_List_Types.Nil.value);
};
let foldM = function (dictMonad) {
	return function (v) {
		return function (a) {
			return function (v1) {
				if (v1 instanceof Data_List_Types.Nil) {
					return control.pure(dictMonad.Applicative0())(a);
				};
				if (v1 instanceof Data_List_Types.Cons) {
					return control.bind(dictMonad.Bind1())(v(a)(v1.value0))(function (a$prime) {
						return foldM(dictMonad)(v)(a$prime)(v1.value1);
					});
				};
				throw new Error("Failed pattern match at Data.List (line 763, column 1 - line 763, column 72): " + [v.constructor.name, a.constructor.name, v1.constructor.name]);
			};
		};
	};
};
let findIndex = function (fn) {
	let go = function ($copy_v) {
		return function ($copy_v1) {
			let $tco_var_v = $copy_v;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(v, v1) {
				if (v1 instanceof Data_List_Types.Cons) {
					if (fn(v1.value0)) {
						$tco_done = true;
						return new Data_Maybe.Just(v);
					};
					if (true) {
						$tco_var_v = v + 1 | 0;
						$copy_v1 = v1.value1;
						return;
					};
				};
				if (v1 instanceof Data_List_Types.Nil) {
					$tco_done = true;
					return Data_Maybe.Nothing.value;
				};
				throw new Error("Failed pattern match at Data.List (line 301, column 3 - line 301, column 35): " + [v.constructor.name, v1.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_v, $copy_v1);
			};
			return $tco_result;
		};
	};
	return go(0);
};
let findLastIndex = function (fn) {
	return function (xs) {
		return data.map(Data_Maybe.functorMaybe)(function (v) {
			return (length(xs) - 1 | 0) - v | 0;
		})(findIndex(fn)(reverse(xs)));
	};
};
let filterM = function (dictMonad) {
	return function (v) {
		return function (v1) {
			if (v1 instanceof Data_List_Types.Nil) {
				return control.pure(dictMonad.Applicative0())(Data_List_Types.Nil.value);
			};
			if (v1 instanceof Data_List_Types.Cons) {
				return control.bind(dictMonad.Bind1())(v(v1.value0))(function (b) {
					return control.bind(dictMonad.Bind1())(filterM(dictMonad)(v)(v1.value1))(function (xs$prime) {
						return control.pure(dictMonad.Applicative0())((function () {
							if (b) {
								return new Data_List_Types.Cons(v1.value0, xs$prime);
							};
							return xs$prime;
						})());
					});
				});
			};
			throw new Error("Failed pattern match at Data.List (line 403, column 1 - line 403, column 75): " + [v.constructor.name, v1.constructor.name]);
		};
	};
};
let filter = function (p) {
	let go = function ($copy_acc) {
		return function ($copy_v) {
			let $tco_var_acc = $copy_acc;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(acc, v) {
				if (v instanceof Data_List_Types.Nil) {
					$tco_done = true;
					return reverse(acc);
				};
				if (v instanceof Data_List_Types.Cons) {
					if (p(v.value0)) {
						$tco_var_acc = new Data_List_Types.Cons(v.value0, acc);
						$copy_v = v.value1;
						return;
					};
					if (true) {
						$tco_var_acc = acc;
						$copy_v = v.value1;
						return;
					};
				};
				throw new Error("Failed pattern match at Data.List (line 390, column 3 - line 390, column 27): " + [acc.constructor.name, v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_acc, $copy_v);
			};
			return $tco_result;
		};
	};
	return go(Data_List_Types.Nil.value);
};
let intersectBy = function (v) {
	return function (v1) {
		return function (v2) {
			if (v1 instanceof Data_List_Types.Nil) {
				return Data_List_Types.Nil.value;
			};
			if (v2 instanceof Data_List_Types.Nil) {
				return Data_List_Types.Nil.value;
			};
			return filter(function (x) {
				return Data_Foldable.any(Data_List_Types.foldableList)(Data_HeytingAlgebra.heytingAlgebraBoolean)(v(x))(v2);
			})(v1);
		};
	};
};
let intersect = function (dictEq) {
	return intersectBy(data.eq(dictEq));
};
let nubBy = function (v) {
	return function (v1) {
		if (v1 instanceof Data_List_Types.Nil) {
			return Data_List_Types.Nil.value;
		};
		if (v1 instanceof Data_List_Types.Cons) {
			return new Data_List_Types.Cons(v1.value0, nubBy(v)(filter(function (y) {
				return !v(v1.value0)(y);
			})(v1.value1)));
		};
		throw new Error("Failed pattern match at Data.List (line 644, column 1 - line 644, column 59): " + [v.constructor.name, v1.constructor.name]);
	};
};
let nub = function (dictEq) {
	return nubBy(data.eq(dictEq));
};
let eqPattern = function (dictEq) {
	return new data.Eq(function (x) {
		return function (y) {
			return data.eq(Data_List_Types.eqList(dictEq))(x)(y);
		};
	});
};
let ordPattern = function (dictOrd) {
	return new Data_Ord.Ord(function () {
		return eqPattern(dictOrd.Eq0());
	}, function (x) {
		return function (y) {
			return Data_Ord.compare(Data_List_Types.ordList(dictOrd))(x)(y);
		};
	});
};
let elemLastIndex = function (dictEq) {
	return function (x) {
		return findLastIndex(function (v) {
			return data.eq(dictEq)(v)(x);
		});
	};
};
let elemIndex = function (dictEq) {
	return function (x) {
		return findIndex(function (v) {
			return data.eq(dictEq)(v)(x);
		});
	};
};
let dropWhile = function (p) {
	let go = function ($copy_v) {
		let $tco_done = false;
		let $tco_result;
		function $tco_loop(v) {
			if (v instanceof Data_List_Types.Cons && p(v.value0)) {
				$copy_v = v.value1;
				return;
			};
			$tco_done = true;
			return v;
		};
		while (!$tco_done) {
			$tco_result = $tco_loop($copy_v);
		};
		return $tco_result;
	};
	return go;
};
let dropEnd = function (n) {
	return function (xs) {
		return take(length(xs) - n | 0)(xs);
	};
};
let drop = function ($copy_v) {
	return function ($copy_v1) {
		let $tco_var_v = $copy_v;
		let $tco_done = false;
		let $tco_result;
		function $tco_loop(v, v1) {
			if (v < 1) {
				$tco_done = true;
				return v1;
			};
			if (v1 instanceof Data_List_Types.Nil) {
				$tco_done = true;
				return Data_List_Types.Nil.value;
			};
			if (v1 instanceof Data_List_Types.Cons) {
				$tco_var_v = v - 1 | 0;
				$copy_v1 = v1.value1;
				return;
			};
			throw new Error("Failed pattern match at Data.List (line 543, column 1 - line 543, column 42): " + [v.constructor.name, v1.constructor.name]);
		};
		while (!$tco_done) {
			$tco_result = $tco_loop($tco_var_v, $copy_v1);
		};
		return $tco_result;
	};
};
let slice = function (start) {
	return function (end) {
		return function (xs) {
			return take(end - start | 0)(drop(start)(xs));
		};
	};
};
let takeEnd = function (n) {
	return function (xs) {
		return drop(length(xs) - n | 0)(xs);
	};
};
let deleteBy = function (v) {
	return function (v1) {
		return function (v2) {
			if (v2 instanceof Data_List_Types.Nil) {
				return Data_List_Types.Nil.value;
			};
			if (v2 instanceof Data_List_Types.Cons && v(v1)(v2.value0)) {
				return v2.value1;
			};
			if (v2 instanceof Data_List_Types.Cons) {
				return new Data_List_Types.Cons(v2.value0, deleteBy(v)(v1)(v2.value1));
			};
			throw new Error("Failed pattern match at Data.List (line 671, column 1 - line 671, column 67): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
};
let unionBy = function (eq) {
	return function (xs) {
		return function (ys) {
			return Data_Semigroup.append(Data_List_Types.semigroupList)(xs)(Data_Foldable.foldl(Data_List_Types.foldableList)(data.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
		};
	};
};
let union = function (dictEq) {
	return unionBy(data.eq(dictEq));
};
let deleteAt = function (v) {
	return function (v1) {
		if (v === 0 && v1 instanceof Data_List_Types.Cons) {
			return new Data_Maybe.Just(v1.value1);
		};
		if (v1 instanceof Data_List_Types.Cons) {
			return data.map(Data_Maybe.functorMaybe)(function (v2) {
				return new Data_List_Types.Cons(v1.value0, v2);
			})(deleteAt(v - 1 | 0)(v1.value1));
		};
		return Data_Maybe.Nothing.value;
	};
};
let $$delete = function (dictEq) {
	return deleteBy(data.eq(dictEq));
};
let difference = function (dictEq) {
	return Data_Foldable.foldl(Data_List_Types.foldableList)(data.flip($$delete(dictEq)));
};
let concatMap = data.flip(control.bind(Data_List_Types.bindList));
let concat = function (v) {
	return control.bind(Data_List_Types.bindList)(v)(identity(categoryFn));
};
let catMaybes = mapMaybe(identity(categoryFn));
let alterAt = function (v) {
	return function (v1) {
		return function (v2) {
			if (v === 0 && v2 instanceof Data_List_Types.Cons) {
				return Data_Maybe.Just.create((function () {
					let v3 = v1(v2.value0);
					if (v3 instanceof Data_Maybe.Nothing) {
						return v2.value1;
					};
					if (v3 instanceof Data_Maybe.Just) {
						return new Data_List_Types.Cons(v3.value0, v2.value1);
					};
					throw new Error("Failed pattern match at Data.List (line 352, column 3 - line 354, column 23): " + [v3.constructor.name]);
				})());
			};
			if (v2 instanceof Data_List_Types.Cons) {
				return data.map(Data_Maybe.functorMaybe)(function (v3) {
					return new Data_List_Types.Cons(v2.value0, v3);
				})(alterAt(v - 1 | 0)(v1)(v2.value1));
			};
			return Data_Maybe.Nothing.value;
		};
	};
};
let modifyAt = function (n) {
	return function (f) {
		return alterAt(n)(function ($335) {
			return Data_Maybe.Just.create(f($335));
		});
	};
};
module.exports = {
	toUnfoldable: toUnfoldable,
	fromFoldable: fromFoldable,
	singleton: singleton,
	range: range,
	some: some,
	someRec: someRec,
	many: many,
	manyRec: manyRec,
	"null": $$null,
	length: length,
	snoc: snoc,
	insert: insert,
	insertBy: insertBy,
	head: head,
	last: last,
	tail: tail,
	init: init,
	uncons: uncons,
	unsnoc: unsnoc,
	index: index,
	elemIndex: elemIndex,
	elemLastIndex: elemLastIndex,
	findIndex: findIndex,
	findLastIndex: findLastIndex,
	insertAt: insertAt,
	deleteAt: deleteAt,
	updateAt: updateAt,
	modifyAt: modifyAt,
	alterAt: alterAt,
	reverse: reverse,
	concat: concat,
	concatMap: concatMap,
	filter: filter,
	filterM: filterM,
	mapMaybe: mapMaybe,
	catMaybes: catMaybes,
	mapWithIndex: mapWithIndex,
	sort: sort,
	sortBy: sortBy,
	Pattern: Pattern,
	stripPrefix: stripPrefix,
	slice: slice,
	take: take,
	takeEnd: takeEnd,
	takeWhile: takeWhile,
	drop: drop,
	dropEnd: dropEnd,
	dropWhile: dropWhile,
	span: span,
	group: group,
	"group'": group$prime,
	groupBy: groupBy,
	partition: partition,
	nub: nub,
	nubBy: nubBy,
	union: union,
	unionBy: unionBy,
	"delete": $$delete,
	deleteBy: deleteBy,
	difference: difference,
	intersect: intersect,
	intersectBy: intersectBy,
	zipWith: zipWith,
	zipWithA: zipWithA,
	zip: zip,
	unzip: unzip,
	transpose: transpose,
	foldM: foldM,
	eqPattern: eqPattern,
	ordPattern: ordPattern,
	newtypePattern: newtypePattern,
	showPattern: showPattern
};
