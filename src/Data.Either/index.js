const control = require("../control");
let Data_Bifoldable = require("../Data.Bifoldable/index.js");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Bitraversable = require("../Data.Bitraversable/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}


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

class Eq1 {
	constructor(eq1) {
		this.eq1 = eq1;
	}
}

function eq(dict) {
	return dict.eq;
}


let apply = function (dict) {
	return dict.apply;
};

function alt(dict) {
	return dict.alt;
}

let Left = (function () {
	function Left(value0) {
		this.value0 = value0;
	};
	Left.create = function (value0) {
		return new Left(value0);
	};
	return Left;
})();

let Right = (function () {
	function Right(value0) {
		this.value0 = value0;
	};
	Right.create = function (value0) {
		return new Right(value0);
	};
	return Right;
})();

let showEither = function (dictShow) {
	return function (dictShow1) {
		return new Data_Show.Show(function (v) {
			if (v instanceof Left) {
				return "(Left " + (Data_Show.show(dictShow)(v.value0) + ")");
			};
			if (v instanceof Right) {
				return "(Right " + (Data_Show.show(dictShow1)(v.value0) + ")");
			};
			throw new Error("Failed pattern match at Data.Either (line 163, column 1 - line 165, column 46): " + [v.constructor.name]);
		});
	};
};

let note$prime = function (f) {
	return Data_Maybe["maybe'"](function ($198) {
		return Left.create(f($198));
	})(Right.create);
};
let note = function (a) {
	return Data_Maybe.maybe(new Left(a))(Right.create);
};
let functorEither = new Data_Functor.Functor(function (f) {
	return function (m) {
		if (m instanceof Left) {
			return new Left(m.value0);
		};
		if (m instanceof Right) {
			return new Right(f(m.value0));
		};
		throw new Error("Failed pattern match at Data.Either (line 38, column 1 - line 38, column 52): " + [m.constructor.name]);
	};
});
let functorWithIndexEither = new Data_FunctorWithIndex.FunctorWithIndex(function () {
	return functorEither;
}, function (f) {
	return Data_Functor.map(functorEither)(f({}));
});
let invariantEither = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorEither));
let fromRight = function (dictPartial) {
	return function (v) {
		if (v instanceof Right) {
			return v.value0;
		};
		throw new Error("Failed pattern match at Data.Either (line 261, column 1 - line 261, column 52): " + [v.constructor.name]);
	};
};
let fromLeft = function (dictPartial) {
	return function (v) {
		if (v instanceof Left) {
			return v.value0;
		};
		throw new Error("Failed pattern match at Data.Either (line 256, column 1 - line 256, column 51): " + [v.constructor.name]);
	};
};
let foldableEither = new Data_Foldable.Foldable(function (dictMonoid) {
	return function (f) {
		return function (v) {
			if (v instanceof Left) {
				return Data_Monoid.mempty(dictMonoid);
			};
			if (v instanceof Right) {
				return f(v.value0);
			};
			throw new Error("Failed pattern match at Data.Either (line 187, column 1 - line 193, column 28): " + [f.constructor.name, v.constructor.name]);
		};
	};
}, function (v) {
	return function (z) {
		return function (v1) {
			if (v1 instanceof Left) {
				return z;
			};
			if (v1 instanceof Right) {
				return v(z)(v1.value0);
			};
			throw new Error("Failed pattern match at Data.Either (line 187, column 1 - line 193, column 28): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
		};
	};
}, function (v) {
	return function (z) {
		return function (v1) {
			if (v1 instanceof Left) {
				return z;
			};
			if (v1 instanceof Right) {
				return v(v1.value0)(z);
			};
			throw new Error("Failed pattern match at Data.Either (line 187, column 1 - line 193, column 28): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
		};
	};
});
let foldableWithIndexEither = new Data_FoldableWithIndex.FoldableWithIndex(function () {
	return foldableEither;
}, function (dictMonoid) {
	return function (f) {
		return function (v) {
			if (v instanceof Left) {
				return Data_Monoid.mempty(dictMonoid);
			};
			if (v instanceof Right) {
				return f({})(v.value0);
			};
			throw new Error("Failed pattern match at Data.Either (line 195, column 1 - line 201, column 42): " + [f.constructor.name, v.constructor.name]);
		};
	};
}, function (v) {
	return function (z) {
		return function (v1) {
			if (v1 instanceof Left) {
				return z;
			};
			if (v1 instanceof Right) {
				return v({})(z)(v1.value0);
			};
			throw new Error("Failed pattern match at Data.Either (line 195, column 1 - line 201, column 42): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
		};
	};
}, function (v) {
	return function (z) {
		return function (v1) {
			if (v1 instanceof Left) {
				return z;
			};
			if (v1 instanceof Right) {
				return v()(v1.value0)(z);
			};
			throw new Error("Failed pattern match at Data.Either (line 195, column 1 - line 201, column 42): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
		};
	};
});
let traversableEither = new Data_Traversable.Traversable(function () {
	return foldableEither;
}, function () {
	return functorEither;
}, function (dictApplicative) {
	return function (v) {
		if (v instanceof Left) {
			return control.pure(dictApplicative)(new Left(v.value0));
		};
		if (v instanceof Right) {
			return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v.value0);
		};
		throw new Error("Failed pattern match at Data.Either (line 211, column 1 - line 215, column 36): " + [v.constructor.name]);
	};
}, function (dictApplicative) {
	return function (v) {
		return function (v1) {
			if (v1 instanceof Left) {
				return control.pure(dictApplicative)(new Left(v1.value0));
			};
			if (v1 instanceof Right) {
				return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v(v1.value0));
			};
			throw new Error("Failed pattern match at Data.Either (line 211, column 1 - line 215, column 36): " + [v.constructor.name, v1.constructor.name]);
		};
	};
});
let traversableWithIndexEither = new Data_TraversableWithIndex.TraversableWithIndex(function () {
	return foldableWithIndexEither;
}, function () {
	return functorWithIndexEither;
}, function () {
	return traversableEither;
}, function (dictApplicative) {
	return function (v) {
		return function (v1) {
			if (v1 instanceof Left) {
				return control.pure(dictApplicative)(new Left(v1.value0));
			};
			if (v1 instanceof Right) {
				return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v()(v1.value0));
			};
			throw new Error("Failed pattern match at Data.Either (line 217, column 1 - line 219, column 53): " + [v.constructor.name, v1.constructor.name]);
		};
	};
});
let extendEither = new control.Extend(function () {
	return functorEither;
}, function (v) {
	return function (v1) {
		if (v1 instanceof Left) {
			return new Left(v1.value0);
		};
		return new Right(v(v1));
	};
});
let eqEither = function (dictEq) {
	return function (dictEq1) {
		return new Eq(function (x) {
			return function (y) {
				if (x instanceof Left && y instanceof Left) {
					return eq(dictEq)(x.value0)(y.value0);
				};
				if (x instanceof Right && y instanceof Right) {
					return eq(dictEq1)(x.value0)(y.value0);
				};
				return false;
			};
		});
	};
};
let ordEither = function (dictOrd) {
	return function (dictOrd1) {
		return new Data_Ord.Ord(function () {
			return eqEither(dictOrd.Eq0())(dictOrd1.Eq0());
		}, function (x) {
			return function (y) {
				if (x instanceof Left && y instanceof Left) {
					return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
				};
				if (x instanceof Left) {
					return Data_Ordering.LT.value;
				};
				if (y instanceof Left) {
					return Data_Ordering.GT.value;
				};
				if (x instanceof Right && y instanceof Right) {
					return Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
				};
				throw new Error("Failed pattern match at Data.Either (line 179, column 1 - line 179, column 64): " + [x.constructor.name, y.constructor.name]);
			};
		});
	};
};
let eq1Either = function (dictEq) {
	return new Eq1(function (dictEq1) {
		return eq(eqEither(dictEq)(dictEq1));
	});
};
let ord1Either = function (dictOrd) {
	return new Data_Ord.Ord1(function () {
		return eq1Either(dictOrd.Eq0());
	}, function (dictOrd1) {
		return Data_Ord.compare(ordEither(dictOrd)(dictOrd1));
	});
};
let either = function (v) {
	return function (v1) {
		return function (v2) {
			if (v2 instanceof Left) {
				return v(v2.value0);
			};
			if (v2 instanceof Right) {
				return v1(v2.value0);
			};
			throw new Error("Failed pattern match at Data.Either (line 238, column 1 - line 238, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
};
let hush = either(Data_Functor._const(Data_Maybe.Nothing.value))(Data_Maybe.Just.create);
let isLeft = either(Data_Functor._const(true))(Data_Functor._const(false));
let isRight = either(Data_Functor._const(false))(Data_Functor._const(true));
let choose = function (dictAlt) {
	return function (a) {
		return function (b) {
			return alt(dictAlt)(Data_Functor.map(dictAlt.Functor0())(Left.create)(a))(Data_Functor.map(dictAlt.Functor0())(Right.create)(b));
		};
	};
};
let boundedEither = function (dictBounded) {
	return function (dictBounded1) {
		return new Data_Bounded.Bounded(function () {
			return ordEither(dictBounded.Ord0())(dictBounded1.Ord0());
		}, new Left(Data_Bounded.bottom(dictBounded)), new Right(Data_Bounded.top(dictBounded1)));
	};
};
let bifunctorEither = new Data_Bifunctor.Bifunctor(function (v) {
	return function (v1) {
		return function (v2) {
			if (v2 instanceof Left) {
				return new Left(v(v2.value0));
			};
			if (v2 instanceof Right) {
				return new Right(v1(v2.value0));
			};
			throw new Error("Failed pattern match at Data.Either (line 46, column 1 - line 48, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
});
let bifoldableEither = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
	return function (v) {
		return function (v1) {
			return function (v2) {
				if (v2 instanceof Left) {
					return v(v2.value0);
				};
				if (v2 instanceof Right) {
					return v1(v2.value0);
				};
				throw new Error("Failed pattern match at Data.Either (line 203, column 1 - line 209, column 32): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
			};
		};
	};
}, function (v) {
	return function (v1) {
		return function (z) {
			return function (v2) {
				if (v2 instanceof Left) {
					return v(z)(v2.value0);
				};
				if (v2 instanceof Right) {
					return v1(z)(v2.value0);
				};
				throw new Error("Failed pattern match at Data.Either (line 203, column 1 - line 209, column 32): " + [v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name]);
			};
		};
	};
}, function (v) {
	return function (v1) {
		return function (z) {
			return function (v2) {
				if (v2 instanceof Left) {
					return v(v2.value0)(z);
				};
				if (v2 instanceof Right) {
					return v1(v2.value0)(z);
				};
				throw new Error("Failed pattern match at Data.Either (line 203, column 1 - line 209, column 32): " + [v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name]);
			};
		};
	};
});
let bitraversableEither = new Data_Bitraversable.Bitraversable(function () {
	return bifoldableEither;
}, function () {
	return bifunctorEither;
}, function (dictApplicative) {
	return function (v) {
		if (v instanceof Left) {
			return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Left.create)(v.value0);
		};
		if (v instanceof Right) {
			return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v.value0);
		};
		throw new Error("Failed pattern match at Data.Either (line 221, column 1 - line 225, column 37): " + [v.constructor.name]);
	};
}, function (dictApplicative) {
	return function (v) {
		return function (v1) {
			return function (v2) {
				if (v2 instanceof Left) {
					return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Left.create)(v(v2.value0));
				};
				if (v2 instanceof Right) {
					return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Right.create)(v1(v2.value0));
				};
				throw new Error("Failed pattern match at Data.Either (line 221, column 1 - line 225, column 37): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
			};
		};
	};
});
let applyEither = new Apply(function () {
	return functorEither;
}, function (v) {
	return function (v1) {
		if (v instanceof Left) {
			return new Left(v.value0);
		};
		if (v instanceof Right) {
			return Data_Functor.map(functorEither)(v.value0)(v1);
		};
		throw new Error("Failed pattern match at Data.Either (line 82, column 1 - line 84, column 30): " + [v.constructor.name, v1.constructor.name]);
	};
});
let bindEither = new control.Bind(function () {
	return applyEither;
}, either(function (e) {
	return function (v) {
		return new Left(e);
	};
})(function (a) {
	return function (f) {
		return f(a);
	};
}));
let semigroupEither = function (dictSemigroup) {
	return new Data_Semigroup.Semigroup(function (x) {
		return function (y) {
			return apply(applyEither)(Data_Functor.map(functorEither)(Data_Semigroup.append(dictSemigroup))(x))(y);
		};
	});
};
let applicativeEither = new control.Applicative(function () {
	return applyEither;
}, Right.create);
let monadEither = new control.Monad(function () {
	return applicativeEither;
}, function () {
	return bindEither;
});
let altEither = new Alt(function () {
	return functorEither;
}, function (v) {
	return function (v1) {
		if (v instanceof Left) {
			return v1;
		};
		return v;
	};
});

module.exports = {
	Left: Left,
	Right: Right,
	either: either,
	choose: choose,
	isLeft: isLeft,
	isRight: isRight,
	fromLeft: fromLeft,
	fromRight: fromRight,
	note: note,
	"note'": note$prime,
	hush: hush,
	functorEither: functorEither,
	functorWithIndexEither: functorWithIndexEither,
	invariantEither: invariantEither,
	bifunctorEither: bifunctorEither,
	applyEither: applyEither,
	applicativeEither: applicativeEither,
	altEither: altEither,
	bindEither: bindEither,
	monadEither: monadEither,
	extendEither: extendEither,
	showEither: showEither,
	eqEither: eqEither,
	eq1Either: eq1Either,
	ordEither: ordEither,
	ord1Either: ord1Either,
	boundedEither: boundedEither,
	foldableEither: foldableEither,
	foldableWithIndexEither: foldableWithIndexEither,
	bifoldableEither: bifoldableEither,
	traversableEither: traversableEither,
	traversableWithIndexEither: traversableWithIndexEither,
	bitraversableEither: bitraversableEither,
	semigroupEither: semigroupEither
};
