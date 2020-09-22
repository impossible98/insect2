let control = require("../control");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
let Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
let Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
let Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Functor = require("../Data.Functor/index.js");


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


let applySecond = function (dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Functor._const(identity(categoryFn)))(a))(b);
		};
	};
};

let Tuple = (function () {
    function Tuple(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Tuple.create = function (value0) {
        return function (value1) {
            return new Tuple(value0, value1);
        };
    };
    return Tuple;
})();

let FoldableWithIndex = function (Foldable0, foldMapWithIndex, foldlWithIndex, foldrWithIndex) {
    this.Foldable0 = Foldable0;
    this.foldMapWithIndex = foldMapWithIndex;
    this.foldlWithIndex = foldlWithIndex;
    this.foldrWithIndex = foldrWithIndex;
};
let foldrWithIndex = function (dict) {
    return dict.foldrWithIndex;
};

let traverseWithIndex_ = function (dictApplicative) {
    return function (dictFoldableWithIndex) {
        return function (f) {
            return foldrWithIndex(dictFoldableWithIndex)(function (i) {
                let $46 = applySecond(dictApplicative.Apply0());
                let $47 = f(i);
                return function ($48) {
                    return $46($47($48));
                };
            })(control.pure(dictApplicative)({}));
        };
    };
};

let forWithIndex_ = function (dictApplicative) {
    return function (dictFoldableWithIndex) {
        return Data_Functor.flip(traverseWithIndex_(dictApplicative)(dictFoldableWithIndex));
    };
};

let foldrDefault = function (dictFoldableWithIndex) {
    return function (f) {
        return foldrWithIndex(dictFoldableWithIndex)(Data_Functor._const(f));
    };
};

let foldlWithIndex = function (dict) {
    return dict.foldlWithIndex;
};

let foldlDefault = function (dictFoldableWithIndex) {
    return function (f) {
        return foldlWithIndex(dictFoldableWithIndex)(Data_Functor._const(f));
    };
};
let foldableWithIndexMultiplicative = new FoldableWithIndex(function () {
    return Data_Foldable.foldableMultiplicative;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableMultiplicative)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableMultiplicative)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableMultiplicative)(f({}));
});
let foldableWithIndexMaybe = new FoldableWithIndex(function () {
    return Data_Foldable.foldableMaybe;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableMaybe)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableMaybe)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableMaybe)(f({}));
});
let foldableWithIndexLast = new FoldableWithIndex(function () {
    return Data_Foldable.foldableLast;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableLast)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableLast)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableLast)(f({}));
});
let foldableWithIndexFirst = new FoldableWithIndex(function () {
    return Data_Foldable.foldableFirst;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableFirst)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableFirst)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableFirst)(f({}));
});
let foldableWithIndexDual = new FoldableWithIndex(function () {
    return Data_Foldable.foldableDual;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableDual)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableDual)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableDual)(f({}));
});
let foldableWithIndexDisj = new FoldableWithIndex(function () {
    return Data_Foldable.foldableDisj;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableDisj)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableDisj)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableDisj)(f({}));
});
let foldableWithIndexConj = new FoldableWithIndex(function () {
    return Data_Foldable.foldableConj;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableConj)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableConj)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableConj)(f({}));
});
let foldableWithIndexAdditive = new FoldableWithIndex(function () {
    return Data_Foldable.foldableAdditive;
}, function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldMap(Data_Foldable.foldableAdditive)(dictMonoid)(f({}));
    };
}, function (f) {
    return Data_Foldable.foldl(Data_Foldable.foldableAdditive)(f({}));
}, function (f) {
    return Data_Foldable.foldr(Data_Foldable.foldableAdditive)(f({}));
});
let foldWithIndexM = function (dictFoldableWithIndex) {
    return function (dictMonad) {
        return function (f) {
            return function (a0) {
                return foldlWithIndex(dictFoldableWithIndex)(function (i) {
                    return function (ma) {
                        return function (b) {
                            return control.bind(dictMonad.Bind1())(ma)(Data_Functor.flip(f(i))(b));
                        };
                    };
                })(control.pure(dictMonad.Applicative0())(a0));
            };
        };
    };
};
let foldMapWithIndexDefaultR = function (dictFoldableWithIndex) {
    return function (dictMonoid) {
        return function (f) {
            return foldrWithIndex(dictFoldableWithIndex)(function (i) {
                return function (x) {
                    return function (acc) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(f(i)(x))(acc);
                    };
                };
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
let foldableWithIndexArray = new FoldableWithIndex(function () {
    return Data_Foldable.foldableArray;
}, function (dictMonoid) {
    return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
}, function (f) {
    return function (z) {
        let $49 = Data_Foldable.foldl(Data_Foldable.foldableArray)(function (y) {
            return function (v) {
                return f(v.value0)(y)(v.value1);
            };
        })(z);
        let $50 = Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create);
        return function ($51) {
            return $49($50($51));
        };
    };
}, function (f) {
    return function (z) {
        let $52 = Data_Foldable.foldr(Data_Foldable.foldableArray)(function (v) {
            return function (y) {
                return f(v.value0)(v.value1)(y);
            };
        })(z);
        let $53 = Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create);
        return function ($54) {
            return $52($53($54));
        };
    };
});
let foldMapWithIndexDefaultL = function (dictFoldableWithIndex) {
    return function (dictMonoid) {
        return function (f) {
            return foldlWithIndex(dictFoldableWithIndex)(function (i) {
                return function (acc) {
                    return function (x) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(i)(x));
                    };
                };
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
let foldMapWithIndex = function (dict) {
    return dict.foldMapWithIndex;
};
let foldlWithIndexDefault = function (dictFoldableWithIndex) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(Data_Newtype.unwrap(Data_Newtype.newtypeDual)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo(categoryFn)))(function (i) {
                    let $55 = Data_Functor.flip(c(i));
                    return function ($56) {
                        return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($55($56)));
                    };
                })(xs)))(u);
            };
        };
    };
};
let foldrWithIndexDefault = function (dictFoldableWithIndex) {
    return function (c) {
        return function (u) {
            return function (xs) {
                return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo(categoryFn))(function (i) {
                    let $57 = c(i);
                    return function ($58) {
                        return Data_Monoid_Endo.Endo($57($58));
                    };
                })(xs))(u);
            };
        };
    };
};
let surroundMapWithIndex = function (dictFoldableWithIndex) {
    return function (dictSemigroup) {
        return function (d) {
            return function (t) {
                return function (f) {
                    let joined = function (i) {
                        return function (a) {
                            return function (m) {
                                return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(i)(a))(m));
                            };
                        };
                    };
                    return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo(categoryFn))(joined)(f))(d);
                };
            };
        };
    };
};
let foldMapDefault = function (dictFoldableWithIndex) {
    return function (dictMonoid) {
        return function (f) {
            return foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(Data_Functor._const(f));
        };
    };
};
let findWithIndex = function (dictFoldableWithIndex) {
    return function (p) {
        let go = function (v) {
            return function (v1) {
                return function (v2) {
                    if (v1 instanceof Data_Maybe.Nothing && p(v)(v2)) {
                        return new Data_Maybe.Just({
                            index: v,
                            value: v2
                        });
                    };
                    return v1;
                };
            };
        };
        return foldlWithIndex(dictFoldableWithIndex)(go)(Data_Maybe.Nothing.value);
    };
};
let anyWithIndex = function (dictFoldableWithIndex) {
    return function (dictHeytingAlgebra) {
        return function (t) {
            let $59 = Data_Newtype.unwrap(Data_Newtype.newtypeDisj);
            let $60 = foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra))(function (i) {
                let $62 = t(i);
                return function ($63) {
                    return Data_Monoid_Disj.Disj($62($63));
                };
            });
            return function ($61) {
                return $59($60($61));
            };
        };
    };
};
let allWithIndex = function (dictFoldableWithIndex) {
    return function (dictHeytingAlgebra) {
        return function (t) {
            let $64 = Data_Newtype.unwrap(Data_Newtype.newtypeConj);
            let $65 = foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra))(function (i) {
                let $67 = t(i);
                return function ($68) {
                    return Data_Monoid_Conj.Conj($67($68));
                };
            });
            return function ($66) {
                return $64($65($66));
            };
        };
	};
};

module.exports = {
    FoldableWithIndex: FoldableWithIndex,
    foldrWithIndex: foldrWithIndex,
    foldlWithIndex: foldlWithIndex,
    foldMapWithIndex: foldMapWithIndex,
    foldrWithIndexDefault: foldrWithIndexDefault,
    foldlWithIndexDefault: foldlWithIndexDefault,
    foldMapWithIndexDefaultR: foldMapWithIndexDefaultR,
    foldMapWithIndexDefaultL: foldMapWithIndexDefaultL,
    foldWithIndexM: foldWithIndexM,
    traverseWithIndex_: traverseWithIndex_,
    forWithIndex_: forWithIndex_,
    surroundMapWithIndex: surroundMapWithIndex,
    allWithIndex: allWithIndex,
    anyWithIndex: anyWithIndex,
    findWithIndex: findWithIndex,
    foldrDefault: foldrDefault,
    foldlDefault: foldlDefault,
    foldMapDefault: foldMapDefault,
    foldableWithIndexArray: foldableWithIndexArray,
    foldableWithIndexMaybe: foldableWithIndexMaybe,
    foldableWithIndexFirst: foldableWithIndexFirst,
    foldableWithIndexLast: foldableWithIndexLast,
    foldableWithIndexAdditive: foldableWithIndexAdditive,
    foldableWithIndexDual: foldableWithIndexDual,
    foldableWithIndexDisj: foldableWithIndexDisj,
    foldableWithIndexConj: foldableWithIndexConj,
    foldableWithIndexMultiplicative: foldableWithIndexMultiplicative
};
