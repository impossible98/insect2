const control = require("../control");
let Data_BooleanAlgebra = require("../Data.BooleanAlgebra/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_CommutativeRing = require("../Data.CommutativeRing/index.js");
let Data_Eq = require("../Data.Eq/index.js");
let Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
const data = require("../data");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");


let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

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

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let apply = function (dict) {
	return dict.apply;
};

let defer = function (thunk) {
	let v = null;
	return function () {
		if (thunk === undefined) return v;

		v = thunk();
		thunk = undefined;
		return v;
	};
};

let force = function (l) {
	return l();
};

let showLazy = function (dictShow) {
	return new Data_Show.Show(function (x) {
		return "(defer \\_ -> " + (Data_Show.show(dictShow)(force(x)) + ")");
	});
};
let semiringLazy = function (dictSemiring) {
	return new Semiring(function (a) {
		return function (b) {
			return defer(function (v) {
				return add(dictSemiring)(force(a))(force(b));
			});
		};
	}, function (a) {
		return function (b) {
			return defer(function (v) {
				return mul(dictSemiring)(force(a))(force(b));
			});
		};
	}, defer(function (v) {
		return one(dictSemiring);
	}), defer(function (v) {
		return zero(dictSemiring);
	}));
};

let semigroupLazy = function (dictSemigroup) {
	return new Data_Semigroup.Semigroup(function (a) {
		return function (b) {
			return defer(function (v) {
				return Data_Semigroup.append(dictSemigroup)(force(a))(force(b));
			});
		};
	});
};
let ringLazy = function (dictRing) {
	return new data.Ring(function () {
		return semiringLazy(dictRing.Semiring0());
	}, function (a) {
		return function (b) {
			return defer(function (v) {
				return data.sub(dictRing)(force(a))(force(b));
			});
		};
	});
};
let monoidLazy = function (dictMonoid) {
	return new Data_Monoid.Monoid(function () {
		return semigroupLazy(dictMonoid.Semigroup0());
	}, defer(function (v) {
		return Data_Monoid.mempty(dictMonoid);
	}));
};
let lazyLazy = new control.Lazy(function (f) {
	return defer(function (v) {
		return force(f({}));
	});
});
let functorLazy = new Data_Functor.Functor(function (f) {
	return function (l) {
		return defer(function (v) {
			return f(force(l));
		});
	};
});
let functorWithIndexLazy = new Data_FunctorWithIndex.FunctorWithIndex(function () {
	return functorLazy;
}, function (f) {
	return Data_Functor.map(functorLazy)(f({}));
});
let invariantLazy = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorLazy));
let foldableLazy = new Data_Foldable.Foldable(function (dictMonoid) {
	return function (f) {
		return function (l) {
			return f(force(l));
		};
	};
}, function (f) {
	return function (z) {
		return function (l) {
			return f(z)(force(l));
		};
	};
}, function (f) {
	return function (z) {
		return function (l) {
			return f(force(l))(z);
		};
	};
});
let foldableWithIndexLazy = new Data_FoldableWithIndex.FoldableWithIndex(function () {
	return foldableLazy;
}, function (dictMonoid) {
	return function (f) {
		return Data_Foldable.foldMap(foldableLazy)(dictMonoid)(f({}));
	};
}, function (f) {
	return Data_Foldable.foldl(foldableLazy)(f({}));
}, function (f) {
	return Data_Foldable.foldr(foldableLazy)(f({}));
});
let traversableLazy = new Data_Traversable.Traversable(function () {
	return foldableLazy;
}, function () {
	return functorLazy;
}, function (dictApplicative) {
	return function (l) {
		return Data_Functor.map((dictApplicative.Apply0()).Functor0())(function ($42) {
			return defer(Data_Functor._const($42));
		})(force(l));
	};
}, function (dictApplicative) {
	return function (f) {
		return function (l) {
			return Data_Functor.map((dictApplicative.Apply0()).Functor0())(function ($43) {
				return defer(Data_Functor._const($43));
			})(f(force(l)));
		};
	};
});
let traversableWithIndexLazy = new Data_TraversableWithIndex.TraversableWithIndex(function () {
	return foldableWithIndexLazy;
}, function () {
	return functorWithIndexLazy;
}, function () {
	return traversableLazy;
}, function (dictApplicative) {
	return function (f) {
		return Data_Traversable.traverse(traversableLazy)(dictApplicative)(f({}));
	};
});
let foldable1Lazy = new Data_Semigroup_Foldable.Foldable1(function () {
	return foldableLazy;
}, function (dictSemigroup) {
	return Data_Semigroup_Foldable.fold1Default(foldable1Lazy)(dictSemigroup);
}, function (dictSemigroup) {
	return function (f) {
		return function (l) {
			return f(force(l));
		};
	};
});
let traversable1Lazy = new Data_Semigroup_Traversable.Traversable1(function () {
	return foldable1Lazy;
}, function () {
	return traversableLazy;
}, function (dictApply) {
	return function (l) {
		return Data_Functor.map(dictApply.Functor0())(function ($44) {
			return defer(Data_Functor._const($44));
		})(force(l));
	};
}, function (dictApply) {
	return function (f) {
		return function (l) {
			return Data_Functor.map(dictApply.Functor0())(function ($45) {
				return defer(Data_Functor._const($45));
			})(f(force(l)));
		};
	};
});
let extendLazy = new control.Extend(function () {
	return functorLazy;
}, function (f) {
	return function (x) {
		return defer(function (v) {
			return f(x);
		});
	};
});
let eqLazy = function (dictEq) {
	return new Data_Eq.Eq(function (x) {
		return function (y) {
			return Data_Eq.eq(dictEq)(force(x))(force(y));
		};
	});
};
let ordLazy = function (dictOrd) {
	return new Data_Ord.Ord(function () {
		return eqLazy(dictOrd.Eq0());
	}, function (x) {
		return function (y) {
			return Data_Ord.compare(dictOrd)(force(x))(force(y));
		};
	});
};
let eq1Lazy = new Data_Eq.Eq1(function (dictEq) {
	return Data_Eq.eq(eqLazy(dictEq));
});
let ord1Lazy = new Data_Ord.Ord1(function () {
	return eq1Lazy;
}, function (dictOrd) {
	return Data_Ord.compare(ordLazy(dictOrd));
});
let comonadLazy = new control.Comonad(function () {
	return extendLazy;
}, force);
let commutativeRingLazy = function (dictCommutativeRing) {
	return new Data_CommutativeRing.CommutativeRing(function () {
		return ringLazy(dictCommutativeRing.Ring0());
	});
};
let euclideanRingLazy = function (dictEuclideanRing) {
	return new Data_EuclideanRing.EuclideanRing(function () {
		return commutativeRingLazy(dictEuclideanRing.CommutativeRing0());
	}, (function () {
		let $46 = Data_EuclideanRing.degree(dictEuclideanRing);
		return function ($47) {
			return $46(force($47));
		};
	})(), function (a) {
		return function (b) {
			return defer(function (v) {
				return Data_EuclideanRing.div(dictEuclideanRing)(force(a))(force(b));
			});
		};
	}, function (a) {
		return function (b) {
			return defer(function (v) {
				return Data_EuclideanRing.mod(dictEuclideanRing)(force(a))(force(b));
			});
		};
	});
};
let boundedLazy = function (dictBounded) {
	return new Data_Bounded.Bounded(function () {
		return ordLazy(dictBounded.Ord0());
	}, defer(function (v) {
		return Data_Bounded.bottom(dictBounded);
	}), defer(function (v) {
		return Data_Bounded.top(dictBounded);
	}));
};
let applyLazy = new Apply(function () {
	return functorLazy;
}, function (f) {
	return function (x) {
		return defer(function (v) {
			return force(f)(force(x));
		});
	};
});
let bindLazy = new control.Bind(function () {
	return applyLazy;
}, function (l) {
	return function (f) {
		return defer(function (v) {
			return force(f(force(l)));
		});
	};
});
let heytingAlgebraLazy = function (dictHeytingAlgebra) {
	return new Data_HeytingAlgebra.HeytingAlgebra(function (a) {
		return function (b) {
			return apply(applyLazy)(Data_Functor.map(functorLazy)(Data_HeytingAlgebra.conj(dictHeytingAlgebra))(a))(b);
		};
	}, function (a) {
		return function (b) {
			return apply(applyLazy)(Data_Functor.map(functorLazy)(Data_HeytingAlgebra.disj(dictHeytingAlgebra))(a))(b);
		};
	}, defer(function (v) {
		return Data_HeytingAlgebra.ff(dictHeytingAlgebra);
	}), function (a) {
		return function (b) {
			return apply(applyLazy)(Data_Functor.map(functorLazy)(Data_HeytingAlgebra.implies(dictHeytingAlgebra))(a))(b);
		};
	}, function (a) {
		return Data_Functor.map(functorLazy)(Data_HeytingAlgebra.not(dictHeytingAlgebra))(a);
	}, defer(function (v) {
		return Data_HeytingAlgebra.tt(dictHeytingAlgebra);
	}));
};
let booleanAlgebraLazy = function (dictBooleanAlgebra) {
	return new Data_BooleanAlgebra.BooleanAlgebra(function () {
		return heytingAlgebraLazy(dictBooleanAlgebra.HeytingAlgebra0());
	});
};
let applicativeLazy = new control.Applicative(function () {
	return applyLazy;
}, function (a) {
	return defer(function (v) {
		return a;
	});
});
let monadLazy = new control.Monad(function () {
	return applicativeLazy;
}, function () {
	return bindLazy;
});

module.exports = {
	semiringLazy: semiringLazy,
	ringLazy: ringLazy,
	commutativeRingLazy: commutativeRingLazy,
	euclideanRingLazy: euclideanRingLazy,
	eqLazy: eqLazy,
	eq1Lazy: eq1Lazy,
	ordLazy: ordLazy,
	ord1Lazy: ord1Lazy,
	boundedLazy: boundedLazy,
	semigroupLazy: semigroupLazy,
	monoidLazy: monoidLazy,
	heytingAlgebraLazy: heytingAlgebraLazy,
	booleanAlgebraLazy: booleanAlgebraLazy,
	functorLazy: functorLazy,
	functorWithIndexLazy: functorWithIndexLazy,
	foldableLazy: foldableLazy,
	foldableWithIndexLazy: foldableWithIndexLazy,
	foldable1Lazy: foldable1Lazy,
	traversableLazy: traversableLazy,
	traversableWithIndexLazy: traversableWithIndexLazy,
	traversable1Lazy: traversable1Lazy,
	invariantLazy: invariantLazy,
	applyLazy: applyLazy,
	applicativeLazy: applicativeLazy,
	bindLazy: bindLazy,
	monadLazy: monadLazy,
	extendLazy: extendLazy,
	comonadLazy: comonadLazy,
	showLazy: showLazy,
	lazyLazy: lazyLazy,
	defer: defer,
	force: force
};
