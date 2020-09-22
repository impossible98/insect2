let Data_Bifunctor = require("./Data.Bifunctor/index.js");
const data = require('./data');
let Data_Semigroup = require("./Data.Semigroup/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Control2 {
	constructor(kw, kw2) {
		this.kw = kw;
		this.kw2 = kw2;
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

class Biapplicative {
	constructor(Biapply0, bipure) {
		this.Biapply0 = Biapply0;
		this.bipure = bipure;
	}
}

class Biapply {
	constructor(Bifunctor0, biapply) {
		this.Bifunctor0 = Bifunctor0;
		this.biapply = biapply;
	}
}

class Bind {
	constructor(Apply0, bind) {
		this.Apply0 = Apply0;
		this.bind = bind;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

class Comonad {
	constructor(Extend0, extract) {
		this.Extend0 = Extend0;
		this.extract = extract;
	}
}

class Discard {
	constructor(discard) {
		this.discard = discard;
	}
}

class Extend {
	constructor(Functor0, extend) {
		this.Functor0 = Functor0;
		this.extend = extend;
	}
}

class Lazy {
	constructor(defer) {
		this.defer = defer;
	}
}

class Monad {
	constructor(Applicative0, Bind1) {
		this.Applicative0 = Applicative0;
		this.Bind1 = Bind1;
	}
}


class Plus {
	constructor(Alt0, empty) {
		this.Alt0 = Alt0;
		this.empty = empty;
	}
}

function arrayApply(fs) {
	return function (xs) {
		let l = fs.length;
		let k = xs.length;
		let result = new Array(l * k);
		let n = 0;
		for (let i = 0; i < l; i++) {
			let f = fs[i];
			for (let j = 0; j < k; j++) {
				result[n++] = f(xs[j]);
			}
		}
		return result;
	};
}

let altArray = new Control2(() => {
	return data.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));

let plusArray = new Plus(() => {
	return altArray;
}, []);

function empty(dict) {
	return dict.empty;
}

let applyFn = new Apply(() => {
	return data.functorFn;
}, function (f) {
	return function (g) {
		return function (x) {
			return f(x)(g(x));
		};
	};
});

let applyArray = new Apply(() => {
	return data.functorArray;
}, arrayApply);


function unless(dictApplicative) {
	return function (v) {
		return function (v1) {
			if (!v) {
				return v1;
			};
			if (v) {
				return pure(dictApplicative)({});
			};
			throw new Error("Failed pattern match at Control.Applicative (line 62, column 1 - line 62, column 65): " + [v.constructor.name, v1.constructor.name]);
		};
	};
}

function when(dictApplicative) {
	return function (v) {
		return function (v1) {
			if (v) {
				return v1;
			};
			if (!v) {
				return pure(dictApplicative)({});
			};
			throw new Error("Failed pattern match at Control.Applicative (line 57, column 1 - line 57, column 63): " + [v.constructor.name, v1.constructor.name]);
		};
	};
}

let applicativeFn = new Applicative(() => {
	return applyFn;
}, function (x) {
	return function (v) {
		return x;
	};
});

let applicativeArray = new Applicative(() => {
	return applyArray;
}, function (x) {
	return [x];
});

function whenM(dictMonad) {
	return function (mb) {
		return function (m) {
			return bind(dictMonad.Bind1())(mb)(function (b) {
				return when(dictMonad.Applicative0())(b)(m);
			});
		};
	};
}

function unlessM(dictMonad) {
	return function (mb) {
		return function (m) {
			return bind(dictMonad.Bind1())(mb)(function (b) {
				return unless(dictMonad.Applicative0())(b)(m);
			});
		};
	};
}

let monadFn = new Monad(() => {
	return applicativeFn;
}, () => {
	return bindFn;
});

let monadArray = new Monad(() => {
	return applicativeArray;
}, () => {
	return bindArray;
});

function liftM1(dictMonad) {
	return function (f) {
		return function (a) {
			return bind(dictMonad.Bind1())(a)(function (a$prime) {
				return pure(dictMonad.Applicative0())(f(a$prime));
			});
		};
	};
}

function ap(dictMonad) {
	return function (f) {
		return function (a) {
			return bind(dictMonad.Bind1())(f)(function (f$prime) {
				return bind(dictMonad.Bind1())(a)(function (a$prime) {
					return pure(dictMonad.Applicative0())(f$prime(a$prime));
				});
			});
		};
	};
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


function biapplyFirst(dictBiapply) {
	return function (a) {
		return function (b) {
			return biapply(dictBiapply)(identity(categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(data._const(identity(categoryFn)))(data._const(identity(categoryFn))))(a))(b);
		};
	};
}

function biapplySecond(dictBiapply) {
	return function (a) {
		return function (b) {
			return biapply(dictBiapply)(identity(categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(data._const)(data._const))(a))(b);
		};
	};
}

function bilift2(dictBiapply) {
	return function (f) {
		return function (g) {
			return function (a) {
				return function (b) {
					return biapply(dictBiapply)(identity(categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b);
				};
			};
		};
	};
}

function bilift3(dictBiapply) {
	return function (f) {
		return function (g) {
			return function (a) {
				return function (b) {
					return function (c) {
						return biapply(dictBiapply)(biapply(dictBiapply)(identity(categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b))(c);
					};
				};
			};
		};
	};
}

function arrayApply(fs) {
	return function (xs) {
		let l = fs.length;
		let k = xs.length;
		let result = new Array(l * k);
		let n = 0;
		for (let i = 0; i < l; i++) {
			let f = fs[i];
			for (let j = 0; j < k; j++) {
				result[n++] = f(xs[j]);
			}
		}
		return result;
	};
}

function dict(arg) {
	return arg.dict;
}

function apply(dict) {
	return dict.apply;
}

function bind(dict) {
	return dict.bind;
}

function bipure(dict) {
	return dict.bipure;
}

function defer(dict) {
	return dict.defer;
}

function extract(dict) {
	return dict.extract;
}

function discard(dict) {
	return dict.discard;
}

function extend(dict) {
	return dict.extend;
}

function identity(dict) {
	return dict.identity;
}

function pure(dict) {
	return dict.pure;
}

let lazyUnit = new Lazy(function (v) {
	return {};
});
let lazyFn = new Lazy(function (f) {
	return function (x) {
		return f({})(x);
	};
});

function fix(dictLazy) {
	return function (f) {
		let go = defer(dictLazy)(function (v) {
			return f(go);
		});
		return go;
	};
}

function liftA1(dictApplicative) {
	return function (f) {
		return function (a) {
			return apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
		};
	};
}

let bindFn = new Bind(() => {
	return applyFn;
}, function (m) {
	return function (f) {
		return function (x) {
			return f(m(x))(x);
		};
	};
});

let bindArray = new Bind(() => {
	return applyArray;
}, arrayBind);


let discardUnit = new Discard(function (dictBind) {
	return bind(dictBind);
});

let extendArray = new Extend(() => {
	return data.functorArray;
}, arrayExtend);


function arrayBind(arr) {
	return function (f) {
		let result = [];
		for (let i = 0, l = arr.length; i < l; i++) {
			Array.prototype.push.apply(result, f(arr[i]));
		}
		return result;
	};
}

function bindFlipped(dictBind) {
	return data.flip(bind(dictBind));
}

function composeKleisliFlipped(dictBind) {
	return function (f) {
		return function (g) {
			return function (a) {
				return bindFlipped(dictBind)(f)(g(a));
			};
		};
	};
}

function composeKleisli(dictBind) {
	return function (f) {
		return function (g) {
			return function (a) {
				return bind(dictBind)(f(a))(g);
			};
		};
	};
}

function ifM(dictBind) {
	return function (cond) {
		return function (t) {
			return function (f) {
				return bind(dictBind)(cond)(function (cond$prime) {
					if (cond$prime) {
						return t;
					};
					return f;
				});
			};
		};
	};
}

function join(dictBind) {
	return function (m) {
		return bind(dictBind)(m)(identity(categoryFn));
	};
}


function arrayExtend(f) {
	return function (xs) {
		return xs.map(function (_, i, xs) {
			return f(xs.slice(i));
		});
	};
}

function extendFn(dictSemigroup) {
	return new Extend(() => {
		return data.functorFn;
	}, function (f) {
		return function (g) {
			return function (w) {
				return f(function (w$prime) {
					return g(Data_Semigroup.append(dictSemigroup)(w)(w$prime));
				});
			};
		};
	});
}

function extendFlipped(dictExtend) {
	return function (w) {
		return function (f) {
			return extend(dictExtend)(f)(w);
		};
	};
}

function duplicate(dictExtend) {
	return extend(dictExtend)(dict(categoryFn));
}

function composeCoKleisliFlipped(dictExtend) {
	return function (f) {
		return function (g) {
			return function (w) {
				return f(extend(dictExtend)(g)(w));
			};
		};
	};
}

function composeCoKleisli(dictExtend) {
	return function (f) {
		return function (g) {
			return function (w) {
				return g(extend(dictExtend)(f)(w));
			};
		};
	};
}

module.exports = {
	Applicative: Applicative,
	Bind: Bind,
	Biapplicative: Biapplicative,
	Biapply: Biapply,
	Comonad: Comonad,
	Discard: Discard,
	Extend: Extend,
	Lazy: Lazy,
	Monad: Monad,
	ap: ap,
	applicativeFn: applicativeFn,
	applicativeArray: applicativeArray,
	biapplyFirst: biapplyFirst,
	biapplySecond: biapplySecond,
	bilift2: bilift2,
	bilift3: bilift3,
	bind: bind,
	bindArray: bindArray,
	bindFlipped: bindFlipped,
	bindFn: bindFn,
	bipure: bipure,
	composeCoKleisli: composeCoKleisli,
	composeCoKleisliFlipped: composeCoKleisliFlipped,
	composeKleisli: composeKleisli,
	composeKleisliFlipped: composeKleisliFlipped,
	defer: defer,
	discard: discard,
	dict: dict,
	discardUnit: discardUnit,
	duplicate: duplicate,
	extend: extend,
	extendArray: extendArray,
	extendFlipped: extendFlipped,
	extendFn: extendFn,
	extract: extract,
	fix: fix,
	ifM: ifM,
	join: join,
	lazyFn: lazyFn,
	lazyUnit: lazyUnit,
	liftA1: liftA1,
	liftM1: liftM1,
	monadFn: monadFn,
	monadArray: monadArray,
	pure: pure,
	unless: unless,
	unlessM: unlessM,
	when: when,
	whenM: whenM,

	Plus: Plus,
	empty: empty,
	plusArray: plusArray

};
