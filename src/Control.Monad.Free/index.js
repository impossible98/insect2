const control = require("../control");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Data_CatList = require("../Data.CatList/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
const data = require('../data');
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Applicative {
	constructor(Apply0, pure) {
		this.Apply0 = Apply0;
		this.pure = pure;
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

class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}


class Eq1 {
	constructor(eq1) {
		this.eq1 = eq1;
	}
}

function eq1(dict) {
	return dict.eq1;
}

function eq(dict) {
	return dict.eq;
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

let categoryFn = new Category(() => {
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
				return apply(dictApply)(data.map(dictApply.Functor0())(f)(a))(b);
			};
		};
	};
};

function identity(dict) {
	return dict.identity;
}

let pure = function (dict) {
	return dict.pure;
};

let Free = (() => {
	function Free(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Free.create = function (value0) {
		return function (value1) {
			return new Free(value0, value1);
		};
	};
	return Free;
})();
let Return = (() => {
	function Return(value0) {
		this.value0 = value0;
	};
	Return.create = function (value0) {
		return new Return(value0);
	};
	return Return;
})();
let Bind = (() => {
	function Bind(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Bind.create = function (value0) {
		return function (value1) {
			return new Bind(value0, value1);
		};
	};
	return Bind;
})();
let toView = function ($copy_v) {
	let $tco_done = false;
	let $tco_result;
	function $tco_loop(v) {
		let runExpF = function (v2) {
			return v2;
		};
		let concatF = function (v2) {
			return function (r) {
				return new Free(v2.value0, Data_Semigroup.append(Data_CatList.semigroupCatList)(v2.value1)(r));
			};
		};
		if (v.value0 instanceof Return) {
			let v2 = Data_CatList.uncons(v.value1);
			if (v2 instanceof Data_Maybe.Nothing) {
				$tco_done = true;
				return new Return(v.value0.value0);
			};
			if (v2 instanceof Data_Maybe.Just) {
				$copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
				return;
			};
			throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
		};
		if (v.value0 instanceof Bind) {
			$tco_done = true;
			return new Bind(v.value0.value0, function (a) {
				return concatF(v.value0.value1(a))(v.value1);
			});
		};
		throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
	};
	while (!$tco_done) {
		$tco_result = $tco_loop($copy_v);
	};
	return $tco_result;
};
let runFreeM = function (dictFunctor) {
	return function (dictMonadRec) {
		return function (k) {
			let go = function (f) {
				let v = toView(f);
				if (v instanceof Return) {
					return data.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(Control_Monad_Rec_Class.Done.create)(pure((dictMonadRec.Monad0()).Applicative0())(v.value0));
				};
				if (v instanceof Bind) {
					return data.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(Control_Monad_Rec_Class.Loop.create)(k(data.map(dictFunctor)(v.value1)(v.value0)));
				};
				throw new Error("Failed pattern match at Control.Monad.Free (line 194, column 10 - line 196, column 37): " + [v.constructor.name]);
			};
			return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go);
		};
	};
};
let runFree = function (dictFunctor) {
	return function (k) {
		let go = function ($copy_f) {
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(f) {
				let v = toView(f);
				if (v instanceof Return) {
					$tco_done = true;
					return v.value0;
				};
				if (v instanceof Bind) {
					$copy_f = k(data.map(dictFunctor)(v.value1)(v.value0));
					return;
				};
				throw new Error("Failed pattern match at Control.Monad.Free (line 178, column 10 - line 180, column 33): " + [v.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($copy_f);
			};
			return $tco_result;
		};
		return go;
	};
};
let resume$prime = function (k) {
	return function (j) {
		return function (f) {
			let v = toView(f);
			if (v instanceof Return) {
				return j(v.value0);
			};
			if (v instanceof Bind) {
				return k(v.value0)(v.value1);
			};
			throw new Error("Failed pattern match at Control.Monad.Free (line 213, column 17 - line 215, column 20): " + [v.constructor.name]);
		};
	};
};
let resume = function (dictFunctor) {
	return resume$prime(function (g) {
		return function (i) {
			return new Data_Either.Left(data.map(dictFunctor)(i)(g));
		};
	})(Data_Either.Right.create);
};
let fromView = function (f) {
	return new Free(f, Data_CatList.empty);
};
let wrap = function (f) {
	return fromView(new Bind(f, (arg) => { return arg; }));
};
let suspendF = function (dictApplicative) {
	return function (f) {
		return wrap(pure(dictApplicative)(f));
	};
};
let freeMonad = new control.Monad(() => {
	return freeApplicative;
}, () => {
	return freeBind;
});
let freeFunctor = new data.Functor(function (k) {
	return function (f) {
		return control.bindFlipped(freeBind)((() => {
			let $120 = pure(freeApplicative);
			return function ($121) {
				return $120(k($121));
			};
		})())(f);
	};
});
let freeBind = new control.Bind(() => {
	return freeApply;
}, function (v) {
	return function (k) {
		return new Free(v.value0, Data_CatList.snoc(v.value1)(k));
	};
});
let freeApply = new Apply(() => {
	return freeFunctor;
}, control.ap(freeMonad));
let freeApplicative = new Applicative(() => {
	return freeApply;
}, function ($122) {
	return fromView(Return.create($122));
});
let semigroupFree = function (dictSemigroup) {
	return new Data_Semigroup.Semigroup(lift2(freeApply)(Data_Semigroup.append(dictSemigroup)));
};
let freeMonadRec = new Control_Monad_Rec_Class.MonadRec(() => {
	return freeMonad;
}, function (k) {
	return function (a) {
		return control.bind(freeBind)(k(a))(function (v) {
			if (v instanceof Control_Monad_Rec_Class.Loop) {
				return Control_Monad_Rec_Class.tailRecM(freeMonadRec)(k)(v.value0);
			};
			if (v instanceof Control_Monad_Rec_Class.Done) {
				return pure(freeApplicative)(v.value0);
			};
			throw new Error("Failed pattern match at Control.Monad.Free (line 86, column 26 - line 88, column 21): " + [v.constructor.name]);
		});
	};
});
let liftF = function (f) {
	return fromView(new Bind(f, (() => {
		let $123 = pure(freeApplicative);
		return function ($124) {
			return $123($124);
		};
	})()));
};
let freeMonadTrans = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
	return liftF;
});
let monoidFree = function (dictMonoid) {
	return new Data_Monoid.Monoid(() => {
		return semigroupFree(dictMonoid.Semigroup0());
	}, pure(freeApplicative)(Data_Monoid.mempty(dictMonoid)));
};
let substFree = function (k) {
	let go = function (f) {
		let v = toView(f);
		if (v instanceof Return) {
			return pure(freeApplicative)(v.value0);
		};
		if (v instanceof Bind) {
			return control.bind(freeBind)(k(v.value0))(data.map(data.functorFn)(go)(v.value1));
		};
		throw new Error("Failed pattern match at Control.Monad.Free (line 168, column 10 - line 170, column 33): " + [v.constructor.name]);
	};
	return go;
};
let hoistFree = function (k) {
	return substFree(function ($125) {
		return liftF(k($125));
	});
};
let foldableFree = function (dictFunctor) {
	return function (dictFoldable) {
		return new Data_Foldable.Foldable(function (dictMonoid) {
			return function (f) {
				let go = (() => {
					let $126 = resume(dictFunctor);
					return function ($127) {
						return (function (v) {
							if (v instanceof Data_Either.Left) {
								return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(go)(v.value0);
							};
							if (v instanceof Data_Either.Right) {
								return f(v.value0);
							};
							throw new Error("Failed pattern match at Control.Monad.Free (line 93, column 21 - line 95, column 21): " + [v.constructor.name]);
						})($126($127));
					};
				})();
				return go;
			};
		}, function (f) {
			let go = function (r) {
				let $128 = resume(dictFunctor);
				return function ($129) {
					return (function (v) {
						if (v instanceof Data_Either.Left) {
							return Data_Foldable.foldl(dictFoldable)(go)(r)(v.value0);
						};
						if (v instanceof Data_Either.Right) {
							return f(r)(v.value0);
						};
						throw new Error("Failed pattern match at Control.Monad.Free (line 98, column 23 - line 100, column 23): " + [v.constructor.name]);
					})($128($129));
				};
			};
			return go;
		}, function (f) {
			let go = function (r) {
				let $130 = resume(dictFunctor);
				return function ($131) {
					return (function (v) {
						if (v instanceof Data_Either.Left) {
							return Data_Foldable.foldr(dictFoldable)(data.flip(go))(r)(v.value0);
						};
						if (v instanceof Data_Either.Right) {
							return f(v.value0)(r);
						};
						throw new Error("Failed pattern match at Control.Monad.Free (line 103, column 23 - line 105, column 23): " + [v.constructor.name]);
					})($130($131));
				};
			};
			return go;
		});
	};
};
let traversableFree = function (dictTraversable) {
	return new Data_Traversable.Traversable(() => {
		return foldableFree(dictTraversable.Functor0())(dictTraversable.Foldable1());
	}, () => {
		return freeFunctor;
	}, function (dictApplicative) {
		return function (tma) {
			return Data_Traversable.traverse(traversableFree(dictTraversable))(dictApplicative)(identity(categoryFn))(tma);
		};
	}, function (dictApplicative) {
		return function (f) {
			let go = (() => {
				let $132 = resume(dictTraversable.Functor0());
				return function ($133) {
					return (function (v) {
						if (v instanceof Data_Either.Left) {
							return data.map((dictApplicative.Apply0()).Functor0())((() => {
								let $134 = control.join(freeBind);
								return function ($135) {
									return $134(liftF($135));
								};
							})())(Data_Traversable.traverse(dictTraversable)(dictApplicative)(go)(v.value0));
						};
						if (v instanceof Data_Either.Right) {
							return data.map((dictApplicative.Apply0()).Functor0())(pure(freeApplicative))(f(v.value0));
						};
						throw new Error("Failed pattern match at Control.Monad.Free (line 110, column 21 - line 112, column 30): " + [v.constructor.name]);
					})($132($133));
				};
			})();
			return go;
		};
	});
};
let foldFree = function (dictMonadRec) {
	return function (k) {
		let go = function (f) {
			let v = toView(f);
			if (v instanceof Return) {
				return data.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(Control_Monad_Rec_Class.Done.create)(pure((dictMonadRec.Monad0()).Applicative0())(v.value0));
			};
			if (v instanceof Bind) {
				return data.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(function ($136) {
					return Control_Monad_Rec_Class.Loop.create(v.value1($136));
				})(k(v.value0));
			};
			throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
		};
		return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go);
	};
};
let eqFree = function (dictFunctor) {
	return function (dictEq1) {
		return function (dictEq) {
			return new Eq(function (x) {
				return function (y) {
					let v = resume(dictFunctor)(y);
					let v1 = resume(dictFunctor)(x);
					if (v1 instanceof Data_Either.Left && v instanceof Data_Either.Left) {
						return eq1(dictEq1)(eqFree(dictFunctor)(dictEq1)(dictEq))(v1.value0)(v.value0);
					};
					if (v1 instanceof Data_Either.Right && v instanceof Data_Either.Right) {
						return eq(dictEq)(v1.value0)(v.value0);
					};
					return false;
				};
			});
		};
	};
};
let ordFree = function (dictFunctor) {
	return function (dictOrd1) {
		return function (dictOrd) {
			return new Data_Ord.Ord(() => {
				return eqFree(dictFunctor)(dictOrd1.Eq10())(dictOrd.Eq0());
			}, function (x) {
				return function (y) {
					let v = resume(dictFunctor)(y);
					let v1 = resume(dictFunctor)(x);
					if (v1 instanceof Data_Either.Left && v instanceof Data_Either.Left) {
						return Data_Ord.compare1(dictOrd1)(ordFree(dictFunctor)(dictOrd1)(dictOrd))(v1.value0)(v.value0);
					};
					if (v1 instanceof Data_Either.Left) {
						return Data_Ordering.LT.value;
					};
					if (v instanceof Data_Either.Left) {
						return Data_Ordering.GT.value;
					};
					if (v1 instanceof Data_Either.Right && v instanceof Data_Either.Right) {
						return Data_Ord.compare(dictOrd)(v1.value0)(v.value0);
					};
					throw new Error("Failed pattern match at Control.Monad.Free (line 56, column 17 - line 60, column 36): " + [v1.constructor.name, v.constructor.name]);
				};
			});
		};
	};
};
let eq1Free = function (dictFunctor) {
	return function (dictEq1) {
		return new Eq1(function (dictEq) {
			return eq(eqFree(dictFunctor)(dictEq1)(dictEq));
		});
	};
};
let ord1Free = function (dictFunctor) {
	return function (dictOrd1) {
		return function (dictOrd) {
			return new Data_Ord.Ord1(() => {
				return eq1Free(dictFunctor)(dictOrd1.Eq10());
			}, function (dictOrd2) {
				return Data_Ord.compare(ordFree(dictFunctor)(dictOrd1)(dictOrd2));
			});
		};
	};
};
module.exports = {
	suspendF: suspendF,
	wrap: wrap,
	liftF: liftF,
	hoistFree: hoistFree,
	foldFree: foldFree,
	substFree: substFree,
	runFree: runFree,
	runFreeM: runFreeM,
	resume: resume,
	"resume'": resume$prime,
	eqFree: eqFree,
	eq1Free: eq1Free,
	ordFree: ordFree,
	ord1Free: ord1Free,
	freeFunctor: freeFunctor,
	freeBind: freeBind,
	freeApplicative: freeApplicative,
	freeApply: freeApply,
	freeMonad: freeMonad,
	freeMonadTrans: freeMonadTrans,
	freeMonadRec: freeMonadRec,
	foldableFree: foldableFree,
	traversableFree: traversableFree,
	semigroupFree: semigroupFree,
	monoidFree: monoidFree
};
