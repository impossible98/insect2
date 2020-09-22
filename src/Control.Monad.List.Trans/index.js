const control = require("../control");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let data = require("../data");
let Data_Lazy = require("../Data.Lazy/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");
let Effect_Class = require("../Effect.Class/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
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

function pure(dict) {
	return dict.pure;
}

let Yield = (function () {
	function Yield(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Yield.create = function (value0) {
		return function (value1) {
			return new Yield(value0, value1);
		};
	};
	return Yield;
})();
let Skip = (function () {
	function Skip(value0) {
		this.value0 = value0;
	};
	Skip.create = function (value0) {
		return new Skip(value0);
	};
	return Skip;
})();
let Done = (function () {
	function Done() {

	};
	Done.value = new Done();
	return Done;
})();
let ListT = function (x) {
	return x;
};
let wrapLazy = function (dictApplicative) {
	return function (v) {
		return ListT(pure(dictApplicative)(new Skip(v)));
	};
};
let wrapEffect = function (dictFunctor) {
	return function (v) {
		return ListT(data.map(dictFunctor)(function ($183) {
			return Skip.create(Data_Lazy.defer(data._const($183)));
		})(v));
	};
};
let unfold = function (dictMonad) {
	return function (f) {
		return function (z) {
			let g = function (v) {
				if (v instanceof Data_Maybe.Just) {
					return new Yield(v.value0.value1, Data_Lazy.defer(function (v1) {
						return unfold(dictMonad)(f)(v.value0.value0);
					}));
				};
				if (v instanceof Data_Maybe.Nothing) {
					return Done.value;
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 130, column 3 - line 130, column 60): " + [v.constructor.name]);
			};
			return ListT(data.map(((dictMonad.Bind1()).Apply0()).Functor0())(g)(f(z)));
		};
	};
};
let uncons = function (dictMonad) {
	return function (v) {
		let g = function (v1) {
			if (v1 instanceof Yield) {
				return pure(dictMonad.Applicative0())(Data_Maybe.Just.create(new Data_Tuple.Tuple(v1.value0, Data_Lazy.force(v1.value1))));
			};
			if (v1 instanceof Skip) {
				return uncons(dictMonad)(Data_Lazy.force(v1.value0));
			};
			if (v1 instanceof Done) {
				return pure(dictMonad.Applicative0())(Data_Maybe.Nothing.value);
			};
			throw new Error("Failed pattern match at Control.Monad.List.Trans (line 195, column 3 - line 195, column 50): " + [v1.constructor.name]);
		};
		return control.bind(dictMonad.Bind1())(v)(g);
	};
};
let tail = function (dictMonad) {
	return function (l) {
		return data.map(((dictMonad.Bind1()).Apply0()).Functor0())(data.map(Data_Maybe.functorMaybe)(Data_Tuple.snd))(uncons(dictMonad)(l));
	};
};
let stepMap = function (dictFunctor) {
	return function (f) {
		return function (v) {
			return ListT(data.map(dictFunctor)(f)(v));
		};
	};
};
let takeWhile = function (dictApplicative) {
	return function (f) {
		let g = function (v) {
			if (v instanceof Yield) {
				let $99 = f(v.value0);
				if ($99) {
					return new Yield(v.value0, data.map(Data_Lazy.functorLazy)(takeWhile(dictApplicative)(f))(v.value1));
				};
				return Done.value;
			};
			if (v instanceof Skip) {
				return Skip.create(data.map(Data_Lazy.functorLazy)(takeWhile(dictApplicative)(f))(v.value0));
			};
			if (v instanceof Done) {
				return Done.value;
			};
			throw new Error("Failed pattern match at Control.Monad.List.Trans (line 154, column 3 - line 154, column 68): " + [v.constructor.name]);
		};
		return stepMap((dictApplicative.Apply0()).Functor0())(g);
	};
};
let scanl = function (dictMonad) {
	return function (f) {
		return function (b) {
			return function (l) {
				let g = function (v) {
					let h = function (v1) {
						if (v1 instanceof Yield) {
							let b$prime$prime = f(v.value0)(v1.value0);
							return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(b$prime$prime, Data_Lazy.force(v1.value1)), v.value0));
						};
						if (v1 instanceof Skip) {
							return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0, Data_Lazy.force(v1.value0)), v.value0));
						};
						if (v1 instanceof Done) {
							return Data_Maybe.Nothing.value;
						};
						throw new Error("Failed pattern match at Control.Monad.List.Trans (line 248, column 5 - line 248, column 78): " + [v1.constructor.name]);
					};
					return data.map(((dictMonad.Bind1()).Apply0()).Functor0())(h)(v.value1);
				};
				return unfold(dictMonad)(g)(new Data_Tuple.Tuple(b, l));
			};
		};
	};
};
let prepend$prime = function (dictApplicative) {
	return function (h) {
		return function (t) {
			return ListT(pure(dictApplicative)(new Yield(h, t)));
		};
	};
};
let prepend = function (dictApplicative) {
	return function (h) {
		return function (t) {
			return prepend$prime(dictApplicative)(h)(Data_Lazy.defer(data._const(t)));
		};
	};
};
let nil = function (dictApplicative) {
	return ListT(pure(dictApplicative)(Done.value));
};
let singleton = function (dictApplicative) {
	return function (a) {
		return prepend(dictApplicative)(a)(nil(dictApplicative));
	};
};
let take = function (dictApplicative) {
	return function (v) {
		return function (fa) {
			if (v === 0) {
				return nil(dictApplicative);
			};
			let f = function (v1) {
				if (v1 instanceof Yield) {
					return new Yield(v1.value0, data.map(Data_Lazy.functorLazy)(take(dictApplicative)(v - 1 | 0))(v1.value1));
				};
				if (v1 instanceof Skip) {
					return new Skip(data.map(Data_Lazy.functorLazy)(take(dictApplicative)(v))(v1.value0));
				};
				if (v1 instanceof Done) {
					return Done.value;
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 147, column 3 - line 147, column 47): " + [v1.constructor.name]);
			};
			return stepMap((dictApplicative.Apply0()).Functor0())(f)(fa);
		};
	};
};
let zipWith$prime = function (dictMonad) {
	return function (f) {
		let g = function (v) {
			return function (v1) {
				if (v1 instanceof Data_Maybe.Nothing) {
					return pure(dictMonad.Applicative0())(nil(dictMonad.Applicative0()));
				};
				if (v instanceof Data_Maybe.Nothing) {
					return pure(dictMonad.Applicative0())(nil(dictMonad.Applicative0()));
				};
				if (v instanceof Data_Maybe.Just && v1 instanceof Data_Maybe.Just) {
					return data.map(((dictMonad.Bind1()).Apply0()).Functor0())(data.flip(prepend$prime(dictMonad.Applicative0()))(Data_Lazy.defer(function (v2) {
						return zipWith$prime(dictMonad)(f)(v.value0.value1)(v1.value0.value1);
					})))(f(v.value0.value0)(v1.value0.value0));
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 260, column 3 - line 260, column 25): " + [v.constructor.name, v1.constructor.name]);
			};
		};
		let loop = function (fa) {
			return function (fb) {
				return wrapEffect(((dictMonad.Bind1()).Apply0()).Functor0())(control.bind(dictMonad.Bind1())(uncons(dictMonad)(fa))(function (ua) {
					return control.bind(dictMonad.Bind1())(uncons(dictMonad)(fb))(function (ub) {
						return g(ua)(ub);
					});
				}));
			};
		};
		return loop;
	};
};
let zipWith = function (dictMonad) {
	return function (f) {
		let g = function (a) {
			return function (b) {
				return pure(dictMonad.Applicative0())(f(a)(b));
			};
		};
		return zipWith$prime(dictMonad)(g);
	};
};
let newtypeListT = new Data_Newtype.Newtype(function (n) {
	return n;
}, ListT);
let mapMaybe = function (dictFunctor) {
	return function (f) {
		let g = function (v) {
			if (v instanceof Yield) {
				return Data_Maybe.fromMaybe(Skip.create)(data.map(Data_Maybe.functorMaybe)(Yield.create)(f(v.value0)))(data.map(Data_Lazy.functorLazy)(mapMaybe(dictFunctor)(f))(v.value1));
			};
			if (v instanceof Skip) {
				return Skip.create(data.map(Data_Lazy.functorLazy)(mapMaybe(dictFunctor)(f))(v.value0));
			};
			if (v instanceof Done) {
				return Done.value;
			};
			throw new Error("Failed pattern match at Control.Monad.List.Trans (line 183, column 3 - line 183, column 72): " + [v.constructor.name]);
		};
		return stepMap(dictFunctor)(g);
	};
};
let iterate = function (dictMonad) {
	return function (f) {
		return function (a) {
			let g = function (x) {
				return pure(dictMonad.Applicative0())(new Data_Maybe.Just(new Data_Tuple.Tuple(f(x), x)));
			};
			return unfold(dictMonad)(g)(a);
		};
	};
};
let repeat = function (dictMonad) {
	return iterate(dictMonad)(identity(categoryFn));
};
let head = function (dictMonad) {
	return function (l) {
		return data.map(((dictMonad.Bind1()).Apply0()).Functor0())(data.map(Data_Maybe.functorMaybe)(Data_Tuple.fst))(uncons(dictMonad)(l));
	};
};
let functorListT = function (dictFunctor) {
	return new data.Functor(function (f) {
		let g = function (v) {
			if (v instanceof Yield) {
				return new Yield(f(v.value0), data.map(Data_Lazy.functorLazy)(data.map(functorListT(dictFunctor))(f))(v.value1));
			};
			if (v instanceof Skip) {
				return new Skip(data.map(Data_Lazy.functorLazy)(data.map(functorListT(dictFunctor))(f))(v.value0));
			};
			if (v instanceof Done) {
				return Done.value;
			};
			throw new Error("Failed pattern match at Control.Monad.List.Trans (line 280, column 5 - line 280, column 48): " + [v.constructor.name]);
		};
		return stepMap(dictFunctor)(g);
	});
};
let fromEffect = function (dictApplicative) {
	return function (fa) {
		return ListT(data.map((dictApplicative.Apply0()).Functor0())(data.flip(Yield.create)(Data_Lazy.defer(function (v) {
			return nil(dictApplicative);
		})))(fa));
	};
};
let monadTransListT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
	return fromEffect(dictMonad.Applicative0());
});
let foldlRec$prime = function (dictMonadRec) {
	return function (f) {
		let loop = function (b) {
			return function (l) {
				let g = function (v) {
					if (v instanceof Data_Maybe.Nothing) {
						return pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(b));
					};
					if (v instanceof Data_Maybe.Just) {
						return control.bind((dictMonadRec.Monad0()).Bind1())(f(b)(v.value0.value0))(function (b$prime) {
							return pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop({
								a: b$prime,
								b: v.value0.value1
							}));
						});
					};
					throw new Error("Failed pattern match at Control.Monad.List.Trans (line 221, column 5 - line 221, column 45): " + [v.constructor.name]);
				};
				return control.bind((dictMonadRec.Monad0()).Bind1())(uncons(dictMonadRec.Monad0())(l))(g);
			};
		};
		return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(loop);
	};
};
let runListTRec = function (dictMonadRec) {
	return foldlRec$prime(dictMonadRec)(function (v) {
		return function (v1) {
			return pure((dictMonadRec.Monad0()).Applicative0())({});
		};
	})({});
};
let foldlRec = function (dictMonadRec) {
	return function (f) {
		let loop = function (b) {
			return function (l) {
				let g = function (v) {
					if (v instanceof Data_Maybe.Nothing) {
						return pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(b));
					};
					if (v instanceof Data_Maybe.Just) {
						return pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop({
							a: f(b)(v.value0.value0),
							b: v.value0.value1
						}));
					};
					throw new Error("Failed pattern match at Control.Monad.List.Trans (line 239, column 7 - line 239, column 47): " + [v.constructor.name]);
				};
				return control.bind((dictMonadRec.Monad0()).Bind1())(uncons(dictMonadRec.Monad0())(l))(g);
			};
		};
		return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(loop);
	};
};
let foldl$prime = function (dictMonad) {
	return function (f) {
		let loop = function (b) {
			return function (l) {
				let g = function (v) {
					if (v instanceof Data_Maybe.Nothing) {
						return pure(dictMonad.Applicative0())(b);
					};
					if (v instanceof Data_Maybe.Just) {
						return control.bind(dictMonad.Bind1())(f(b)(v.value0.value0))(data.flip(loop)(v.value0.value1));
					};
					throw new Error("Failed pattern match at Control.Monad.List.Trans (line 212, column 5 - line 212, column 35): " + [v.constructor.name]);
				};
				return control.bind(dictMonad.Bind1())(uncons(dictMonad)(l))(g);
			};
		};
		return loop;
	};
};
let runListT = function (dictMonad) {
	return foldl$prime(dictMonad)(function (v) {
		return function (v1) {
			return pure(dictMonad.Applicative0())({});
		};
	})({});
};
let foldl = function (dictMonad) {
	return function (f) {
		let loop = function (b) {
			return function (l) {
				let g = function (v) {
					if (v instanceof Data_Maybe.Nothing) {
						return pure(dictMonad.Applicative0())(b);
					};
					if (v instanceof Data_Maybe.Just) {
						return loop(f(b)(v.value0.value0))(v.value0.value1);
					};
					throw new Error("Failed pattern match at Control.Monad.List.Trans (line 229, column 5 - line 229, column 35): " + [v.constructor.name]);
				};
				return control.bind(dictMonad.Bind1())(uncons(dictMonad)(l))(g);
			};
		};
		return loop;
	};
};
let filter = function (dictFunctor) {
	return function (f) {
		let g = function (v) {
			if (v instanceof Yield) {
				let s$prime = data.map(Data_Lazy.functorLazy)(filter(dictFunctor)(f))(v.value1);
				let $150 = f(v.value0);
				if ($150) {
					return new Yield(v.value0, s$prime);
				};
				return new Skip(s$prime);
			};
			if (v instanceof Skip) {
				let s$prime = data.map(Data_Lazy.functorLazy)(filter(dictFunctor)(f))(v.value0);
				return new Skip(s$prime);
			};
			if (v instanceof Done) {
				return Done.value;
			};
			throw new Error("Failed pattern match at Control.Monad.List.Trans (line 176, column 3 - line 176, column 80): " + [v.constructor.name]);
		};
		return stepMap(dictFunctor)(g);
	};
};
let dropWhile = function (dictApplicative) {
	return function (f) {
		let g = function (v) {
			if (v instanceof Yield) {
				let $155 = f(v.value0);
				if ($155) {
					return new Skip(data.map(Data_Lazy.functorLazy)(dropWhile(dictApplicative)(f))(v.value1));
				};
				return new Yield(v.value0, v.value1);
			};
			if (v instanceof Skip) {
				return Skip.create(data.map(Data_Lazy.functorLazy)(dropWhile(dictApplicative)(f))(v.value0));
			};
			if (v instanceof Done) {
				return Done.value;
			};
			throw new Error("Failed pattern match at Control.Monad.List.Trans (line 169, column 3 - line 169, column 70): " + [v.constructor.name]);
		};
		return stepMap((dictApplicative.Apply0()).Functor0())(g);
	};
};
let drop = function (dictApplicative) {
	return function (v) {
		return function (fa) {
			if (v === 0) {
				return fa;
			};
			let f = function (v1) {
				if (v1 instanceof Yield) {
					return new Skip(data.map(Data_Lazy.functorLazy)(drop(dictApplicative)(v - 1 | 0))(v1.value1));
				};
				if (v1 instanceof Skip) {
					return new Skip(data.map(Data_Lazy.functorLazy)(drop(dictApplicative)(v))(v1.value0));
				};
				if (v1 instanceof Done) {
					return Done.value;
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 162, column 3 - line 162, column 44): " + [v1.constructor.name]);
			};
			return stepMap((dictApplicative.Apply0()).Functor0())(f)(fa);
		};
	};
};
let cons = function (dictApplicative) {
	return function (lh) {
		return function (t) {
			return ListT(pure(dictApplicative)(new Yield(Data_Lazy.force(lh), t)));
		};
	};
};
let unfoldable1ListT = function (dictMonad) {
	return new Data_Unfoldable1.Unfoldable1(function (f) {
		return function (b) {
			let go = function (v) {
				if (v.value1 instanceof Data_Maybe.Nothing) {
					return singleton(dictMonad.Applicative0())(v.value0);
				};
				if (v.value1 instanceof Data_Maybe.Just) {
					return cons(dictMonad.Applicative0())(pure(Data_Lazy.applicativeLazy)(v.value0))(Data_Lazy.defer(function (v1) {
						return go(f(v.value1.value0));
					}));
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 294, column 12 - line 296, column 67): " + [v.constructor.name]);
			};
			return go(f(b));
		};
	});
};
let unfoldableListT = function (dictMonad) {
	return new Data_Unfoldable.Unfoldable(function () {
		return unfoldable1ListT(dictMonad);
	}, function (f) {
		return function (b) {
			let go = function (v) {
				if (v instanceof Data_Maybe.Nothing) {
					return nil(dictMonad.Applicative0());
				};
				if (v instanceof Data_Maybe.Just) {
					return cons(dictMonad.Applicative0())(pure(Data_Lazy.applicativeLazy)(v.value0.value0))(Data_Lazy.defer(function (v1) {
						return go(f(v.value0.value1));
					}));
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 287, column 12 - line 289, column 67): " + [v.constructor.name]);
			};
			return go(f(b));
		};
	});
};
let semigroupListT = function (dictApplicative) {
	return new Data_Semigroup.Semigroup(concat(dictApplicative));
};
let concat = function (dictApplicative) {
	return function (x) {
		return function (y) {
			let f = function (v) {
				if (v instanceof Yield) {
					return new Yield(v.value0, data.map(Data_Lazy.functorLazy)(function (v1) {
						return Data_Semigroup.append(semigroupListT(dictApplicative))(v1)(y);
					})(v.value1));
				};
				if (v instanceof Skip) {
					return new Skip(data.map(Data_Lazy.functorLazy)(function (v1) {
						return Data_Semigroup.append(semigroupListT(dictApplicative))(v1)(y);
					})(v.value0));
				};
				if (v instanceof Done) {
					return new Skip(Data_Lazy.defer(data._const(y)));
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 106, column 3 - line 106, column 43): " + [v.constructor.name]);
			};
			return stepMap((dictApplicative.Apply0()).Functor0())(f)(x);
		};
	};
};
let monoidListT = function (dictApplicative) {
	return new Data_Monoid.Monoid(function () {
		return semigroupListT(dictApplicative);
	}, nil(dictApplicative));
};
let catMaybes = function (dictFunctor) {
	return mapMaybe(dictFunctor)(identity(categoryFn));
};
let monadListT = function (dictMonad) {
	return new control.Monad(function () {
		return applicativeListT(dictMonad);
	}, function () {
		return bindListT(dictMonad);
	});
};
let bindListT = function (dictMonad) {
	return new control.Bind(function () {
		return applyListT(dictMonad);
	}, function (fa) {
		return function (f) {
			let g = function (v) {
				if (v instanceof Yield) {
					let h = function (s$prime) {
						return Data_Semigroup.append(semigroupListT(dictMonad.Applicative0()))(f(v.value0))(control.bind(bindListT(dictMonad))(s$prime)(f));
					};
					return new Skip(data.map(Data_Lazy.functorLazy)(h)(v.value1));
				};
				if (v instanceof Skip) {
					return new Skip(data.map(Data_Lazy.functorLazy)(function (v1) {
						return control.bind(bindListT(dictMonad))(v1)(f);
					})(v.value0));
				};
				if (v instanceof Done) {
					return Done.value;
				};
				throw new Error("Failed pattern match at Control.Monad.List.Trans (line 306, column 5 - line 308, column 31): " + [v.constructor.name]);
			};
			return stepMap(((dictMonad.Bind1()).Apply0()).Functor0())(g)(fa);
		};
	});
};
let applyListT = function (dictMonad) {
	return new Apply(function () {
		return functorListT(((dictMonad.Bind1()).Apply0()).Functor0());
	}, control.ap(monadListT(dictMonad)));
};
let applicativeListT = function (dictMonad) {
	return new Applicative(function () {
		return applyListT(dictMonad);
	}, singleton(dictMonad.Applicative0()));
};
let monadEffectListT = function (dictMonadEffect) {
	return new Effect_Class.MonadEffect(function () {
		return monadListT(dictMonadEffect.Monad0());
	}, (function () {
		let $184 = Control_Monad_Trans_Class.lift(monadTransListT)(dictMonadEffect.Monad0());
		let $185 = Effect_Class.liftEffect(dictMonadEffect);
		return function ($186) {
			return $184($185($186));
		};
	})());
};
let altListT = function (dictApplicative) {
	return new Alt(function () {
		return functorListT((dictApplicative.Apply0()).Functor0());
	}, concat(dictApplicative));
};
let plusListT = function (dictMonad) {
	return new control.Plus(function () {
		return altListT(dictMonad.Applicative0());
	}, nil(dictMonad.Applicative0()));
};
let alternativeListT = function (dictMonad) {
	return new Alternative(function () {
		return applicativeListT(dictMonad);
	}, function () {
		return plusListT(dictMonad);
	});
};
let monadZeroListT = function (dictMonad) {
	return new Control_MonadZero.MonadZero(function () {
		return alternativeListT(dictMonad);
	}, function () {
		return monadListT(dictMonad);
	});
};
let monadPlusListT = function (dictMonad) {
	return new Control_MonadPlus.MonadPlus(function () {
		return monadZeroListT(dictMonad);
	});
};

module.exports = {
	ListT: ListT,
	Yield: Yield,
	Skip: Skip,
	Done: Done,
	catMaybes: catMaybes,
	cons: cons,
	drop: drop,
	dropWhile: dropWhile,
	filter: filter,
	foldl: foldl,
	foldlRec: foldlRec,
	"foldl'": foldl$prime,
	"foldlRec'": foldlRec$prime,
	fromEffect: fromEffect,
	head: head,
	iterate: iterate,
	mapMaybe: mapMaybe,
	nil: nil,
	prepend: prepend,
	"prepend'": prepend$prime,
	repeat: repeat,
	runListT: runListT,
	runListTRec: runListTRec,
	scanl: scanl,
	singleton: singleton,
	tail: tail,
	take: take,
	takeWhile: takeWhile,
	uncons: uncons,
	unfold: unfold,
	wrapEffect: wrapEffect,
	wrapLazy: wrapLazy,
	zipWith: zipWith,
	"zipWith'": zipWith$prime,
	newtypeListT: newtypeListT,
	semigroupListT: semigroupListT,
	monoidListT: monoidListT,
	functorListT: functorListT,
	unfoldableListT: unfoldableListT,
	unfoldable1ListT: unfoldable1ListT,
	applyListT: applyListT,
	applicativeListT: applicativeListT,
	bindListT: bindListT,
	monadListT: monadListT,
	monadTransListT: monadTransListT,
	altListT: altListT,
	plusListT: plusListT,
	alternativeListT: alternativeListT,
	monadZeroListT: monadZeroListT,
	monadPlusListT: monadPlusListT,
	monadEffectListT: monadEffectListT
};
