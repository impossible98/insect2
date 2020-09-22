const control = require("../control");
let Control_Plus = require("../Control.Plus/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


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

let NonEmpty = (function () {
    function NonEmpty(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    NonEmpty.create = function (value0) {
        return function (value1) {
            return new NonEmpty(value0, value1);
        };
    };
    return NonEmpty;
})();
let unfoldable1NonEmpty = function (dictUnfoldable) {
    return new Data_Unfoldable1.Unfoldable1(function (f) {
        return function (b) {
            return Data_Tuple.uncurry(NonEmpty.create)(Data_Functor.map(Data_Tuple.functorTuple)(Data_Unfoldable.unfoldr(dictUnfoldable)(Data_Functor.map(Data_Maybe.functorMaybe)(f)))(f(b)));
        };
    });
};
let tail = function (v) {
    return v.value1;
};
let singleton = function (dictPlus) {
    return function (a) {
        return new NonEmpty(a, Control_Plus.empty(dictPlus));
    };
};
let showNonEmpty = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(NonEmpty " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
let oneOf = function (dictAlternative) {
    return function (v) {
        return alt((dictAlternative.Plus1()).Alt0())(control.pure(dictAlternative.Applicative0())(v.value0))(v.value1);
    };
};
let head = function (v) {
    return v.value0;
};
let functorNonEmpty = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return function (m) {
            return new NonEmpty(f(m.value0), Data_Functor.map(dictFunctor)(f)(m.value1));
        };
    });
};
let functorWithIndex = function (dictFunctorWithIndex) {
    return new Data_FunctorWithIndex.FunctorWithIndex(function () {
        return functorNonEmpty(dictFunctorWithIndex.Functor0());
    }, function (f) {
        return function (v) {
            return new NonEmpty(f(Data_Maybe.Nothing.value)(v.value0), Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex)(function ($146) {
                return f(Data_Maybe.Just.create($146));
            })(v.value1));
        };
    });
};
let fromNonEmpty = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
let foldl1 = function (dictFoldable) {
    return function (f) {
        return function (v) {
            return Data_Foldable.foldl(dictFoldable)(f)(v.value0)(v.value1);
        };
    };
};
let foldableNonEmpty = function (dictFoldable) {
    return new Data_Foldable.Foldable(function (dictMonoid) {
        return function (f) {
            return function (v) {
                return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f)(v.value1));
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return Data_Foldable.foldl(dictFoldable)(f)(f(b)(v.value0))(v.value1);
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return f(v.value0)(Data_Foldable.foldr(dictFoldable)(f)(b)(v.value1));
            };
        };
    });
};
let foldableWithIndexNonEmpty = function (dictFoldableWithIndex) {
    return new Data_FoldableWithIndex.FoldableWithIndex(function () {
        return foldableNonEmpty(dictFoldableWithIndex.Foldable0());
    }, function (dictMonoid) {
        return function (f) {
            return function (v) {
                return Data_Semigroup.append(dictMonoid.Semigroup0())(f(Data_Maybe.Nothing.value)(v.value0))(Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(function ($147) {
                    return f(Data_Maybe.Just.create($147));
                })(v.value1));
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(function ($148) {
                    return f(Data_Maybe.Just.create($148));
                })(f(Data_Maybe.Nothing.value)(b)(v.value0))(v.value1);
            };
        };
    }, function (f) {
        return function (b) {
            return function (v) {
                return f(Data_Maybe.Nothing.value)(v.value0)(Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex)(function ($149) {
                    return f(Data_Maybe.Just.create($149));
                })(b)(v.value1));
            };
        };
    });
};
let traversableNonEmpty = function (dictTraversable) {
    return new Data_Traversable.Traversable(function () {
        return foldableNonEmpty(dictTraversable.Foldable1());
    }, function () {
        return functorNonEmpty(dictTraversable.Functor0());
    }, function (dictApplicative) {
        return function (v) {
            return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(NonEmpty.create)(v.value0))(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value1));
        };
    }, function (dictApplicative) {
        return function (f) {
            return function (v) {
                return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(NonEmpty.create)(f(v.value0)))(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value1));
            };
        };
    });
};
let traversableWithIndexNonEmpty = function (dictTraversableWithIndex) {
    return new Data_TraversableWithIndex.TraversableWithIndex(function () {
        return foldableWithIndexNonEmpty(dictTraversableWithIndex.FoldableWithIndex1());
    }, function () {
        return functorWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    }, function () {
        return traversableNonEmpty(dictTraversableWithIndex.Traversable2());
    }, function (dictApplicative) {
        return function (f) {
            return function (v) {
                return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(NonEmpty.create)(f(Data_Maybe.Nothing.value)(v.value0)))(Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(function ($150) {
                    return f(Data_Maybe.Just.create($150));
                })(v.value1));
            };
        };
    });
};
let foldable1NonEmpty = function (dictFoldable) {
    return new Data_Semigroup_Foldable.Foldable1(function () {
        return foldableNonEmpty(dictFoldable);
    }, function (dictSemigroup) {
        return Data_Semigroup_Foldable.foldMap1(foldable1NonEmpty(dictFoldable))(dictSemigroup)(identity(categoryFn));
    }, function (dictSemigroup) {
        return function (f) {
            return function (v) {
                return Data_Foldable.foldl(dictFoldable)(function (s) {
                    return function (a1) {
                        return Data_Semigroup.append(dictSemigroup)(s)(f(a1));
                    };
                })(f(v.value0))(v.value1);
            };
        };
    });
};
let eqNonEmpty = function (dictEq1) {
    return function (dictEq) {
        return new data.Eq(function (x) {
            return function (y) {
                return data.eq(dictEq)(x.value0)(y.value0) && data.eq1(dictEq1)(dictEq)(x.value1)(y.value1);
            };
        });
    };
};
let ordNonEmpty = function (dictOrd1) {
    return function (dictOrd) {
        return new Data_Ord.Ord(function () {
            return eqNonEmpty(dictOrd1.Eq10())(dictOrd.Eq0());
        }, function (x) {
            return function (y) {
                let v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                if (v instanceof Data_Ordering.LT) {
                    return Data_Ordering.LT.value;
                };
                if (v instanceof Data_Ordering.GT) {
                    return Data_Ordering.GT.value;
                };
                return Data_Ord.compare1(dictOrd1)(dictOrd)(x.value1)(y.value1);
            };
        });
    };
};
let eq1NonEmpty = function (dictEq1) {
    return new data.Eq1(function (dictEq) {
        return data.eq(eqNonEmpty(dictEq1)(dictEq));
    });
};
let ord1NonEmpty = function (dictOrd1) {
    return new Data_Ord.Ord1(function () {
        return eq1NonEmpty(dictOrd1.Eq10());
    }, function (dictOrd) {
        return Data_Ord.compare(ordNonEmpty(dictOrd1)(dictOrd));
    });
};
module.exports = {
    NonEmpty: NonEmpty,
    singleton: singleton,
    foldl1: foldl1,
    fromNonEmpty: fromNonEmpty,
    oneOf: oneOf,
    head: head,
    tail: tail,
    showNonEmpty: showNonEmpty,
    eqNonEmpty: eqNonEmpty,
    eq1NonEmpty: eq1NonEmpty,
    ordNonEmpty: ordNonEmpty,
    ord1NonEmpty: ord1NonEmpty,
    functorNonEmpty: functorNonEmpty,
    functorWithIndex: functorWithIndex,
    foldableNonEmpty: foldableNonEmpty,
    foldableWithIndexNonEmpty: foldableWithIndexNonEmpty,
    traversableNonEmpty: traversableNonEmpty,
    traversableWithIndexNonEmpty: traversableWithIndexNonEmpty,
    foldable1NonEmpty: foldable1NonEmpty,
    unfoldable1NonEmpty: unfoldable1NonEmpty
};
