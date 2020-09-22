let control = require("../control");
let Data_Foldable = require("../Data.Foldable/index.js");
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


let Bifoldable = function (bifoldMap, bifoldl, bifoldr) {
    this.bifoldMap = bifoldMap;
    this.bifoldl = bifoldl;
    this.bifoldr = bifoldr;
};
let bifoldr = function (dict) {
    return dict.bifoldr;
};
let bitraverse_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return function (f) {
            return function (g) {
                return bifoldr(dictBifoldable)((function () {
                    let $97 = applySecond(dictApplicative.Apply0());
                    return function ($98) {
                        return $97(f($98));
                    };
                })())((function () {
                    let $99 = applySecond(dictApplicative.Apply0());
                    return function ($100) {
                        return $99(g($100));
                    };
                })())(control.pure(dictApplicative)({}));
            };
        };
    };
};
let bifor_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return function (t) {
            return function (f) {
                return function (g) {
                    return bitraverse_(dictBifoldable)(dictApplicative)(f)(g)(t);
                };
            };
        };
    };
};
let bisequence_ = function (dictBifoldable) {
    return function (dictApplicative) {
        return bitraverse_(dictBifoldable)(dictApplicative)(identity(categoryFn))(identity(categoryFn));
    };
};
let bifoldl = function (dict) {
    return dict.bifoldl;
};
let bifoldableJoker = function (dictFoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (v) {
            return function (r) {
                return function (v1) {
                    return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(r)(v1);
                };
            };
        };
    }, function (v) {
        return function (r) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldl(dictFoldable)(r)(u)(v1);
                };
            };
        };
    }, function (v) {
        return function (r) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldr(dictFoldable)(r)(u)(v1);
                };
            };
        };
    });
};
let bifoldableClown = function (dictFoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (l) {
            return function (v) {
                return function (v1) {
                    return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(l)(v1);
                };
            };
        };
    }, function (l) {
        return function (v) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldl(dictFoldable)(l)(u)(v1);
                };
            };
        };
    }, function (l) {
        return function (v) {
            return function (u) {
                return function (v1) {
                    return Data_Foldable.foldr(dictFoldable)(l)(u)(v1);
                };
            };
        };
    });
};
let bifoldMapDefaultR = function (dictBifoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (g) {
                return bifoldr(dictBifoldable)((function () {
                    let $101 = Data_Semigroup.append(dictMonoid.Semigroup0());
                    return function ($102) {
                        return $101(f($102));
                    };
                })())((function () {
                    let $103 = Data_Semigroup.append(dictMonoid.Semigroup0());
                    return function ($104) {
                        return $103(g($104));
                    };
                })())(Data_Monoid.mempty(dictMonoid));
            };
        };
    };
};
let bifoldMapDefaultL = function (dictBifoldable) {
    return function (dictMonoid) {
        return function (f) {
            return function (g) {
                return bifoldl(dictBifoldable)(function (m) {
                    return function (a) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(f(a));
                    };
                })(function (m) {
                    return function (b) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(g(b));
                    };
                })(Data_Monoid.mempty(dictMonoid));
            };
        };
    };
};
let bifoldMap = function (dict) {
    return dict.bifoldMap;
};
let bifoldableFlip = function (dictBifoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (r) {
            return function (l) {
                return function (v) {
                    return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
                };
            };
        };
    }, function (r) {
        return function (l) {
            return function (u) {
                return function (v) {
                    return bifoldl(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    }, function (r) {
        return function (l) {
            return function (u) {
                return function (v) {
                    return bifoldr(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    });
};
let bifoldableWrap = function (dictBifoldable) {
    return new Bifoldable(function (dictMonoid) {
        return function (l) {
            return function (r) {
                return function (v) {
                    return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
                };
            };
        };
    }, function (l) {
        return function (r) {
            return function (u) {
                return function (v) {
                    return bifoldl(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    }, function (l) {
        return function (r) {
            return function (u) {
                return function (v) {
                    return bifoldr(dictBifoldable)(l)(r)(u)(v);
                };
            };
        };
    });
};
let bifoldlDefault = function (dictBifoldable) {
    return function (f) {
        return function (g) {
            return function (z) {
                return function (p) {
                    return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(Data_Newtype.unwrap(Data_Newtype.newtypeDual)(bifoldMap(dictBifoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo(categoryFn)))((function () {
                        let $105 = Data_Functor.flip(f);
                        return function ($106) {
                            return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($105($106)));
                        };
                    })())((function () {
                        let $107 = Data_Functor.flip(g);
                        return function ($108) {
                            return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo($107($108)));
                        };
                    })())(p)))(z);
                };
            };
        };
    };
};
let bifoldrDefault = function (dictBifoldable) {
    return function (f) {
        return function (g) {
            return function (z) {
                return function (p) {
                    return Data_Newtype.unwrap(Data_Newtype.newtypeEndo)(bifoldMap(dictBifoldable)(Data_Monoid_Endo.monoidEndo(categoryFn))(function ($109) {
                        return Data_Monoid_Endo.Endo(f($109));
                    })(function ($110) {
                        return Data_Monoid_Endo.Endo(g($110));
                    })(p))(z);
                };
            };
        };
    };
};
let bifoldableProduct = function (dictBifoldable) {
    return function (dictBifoldable1) {
        return new Bifoldable(function (dictMonoid) {
            return function (l) {
                return function (r) {
                    return function (v) {
                        return Data_Semigroup.append(dictMonoid.Semigroup0())(bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v.value0))(bifoldMap(dictBifoldable1)(dictMonoid)(l)(r)(v.value1));
                    };
                };
            };
        }, function (l) {
            return function (r) {
                return function (u) {
                    return function (m) {
                        return bifoldlDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
                    };
                };
            };
        }, function (l) {
            return function (r) {
                return function (u) {
                    return function (m) {
                        return bifoldrDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
                    };
                };
            };
        });
    };
};
let bifold = function (dictBifoldable) {
    return function (dictMonoid) {
        return bifoldMap(dictBifoldable)(dictMonoid)(identity(categoryFn))(identity(categoryFn));
    };
};
let biany = function (dictBifoldable) {
    return function (dictBooleanAlgebra) {
        return function (p) {
            return function (q) {
                let $111 = Data_Newtype.unwrap(Data_Newtype.newtypeDisj);
                let $112 = bifoldMap(dictBifoldable)(Data_Monoid_Disj.monoidDisj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($114) {
                    return Data_Monoid_Disj.Disj(p($114));
                })(function ($115) {
                    return Data_Monoid_Disj.Disj(q($115));
                });
                return function ($113) {
                    return $111($112($113));
                };
            };
        };
    };
};
let biall = function (dictBifoldable) {
    return function (dictBooleanAlgebra) {
        return function (p) {
            return function (q) {
                let $116 = Data_Newtype.unwrap(Data_Newtype.newtypeConj);
                let $117 = bifoldMap(dictBifoldable)(Data_Monoid_Conj.monoidConj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($119) {
                    return Data_Monoid_Conj.Conj(p($119));
                })(function ($120) {
                    return Data_Monoid_Conj.Conj(q($120));
                });
                return function ($118) {
                    return $116($117($118));
                };
            };
        };
    };
};
module.exports = {
    bifoldMap: bifoldMap,
    bifoldl: bifoldl,
    bifoldr: bifoldr,
    Bifoldable: Bifoldable,
    bifoldrDefault: bifoldrDefault,
    bifoldlDefault: bifoldlDefault,
    bifoldMapDefaultR: bifoldMapDefaultR,
    bifoldMapDefaultL: bifoldMapDefaultL,
    bifold: bifold,
    bitraverse_: bitraverse_,
    bifor_: bifor_,
    bisequence_: bisequence_,
    biany: biany,
    biall: biall,
    bifoldableClown: bifoldableClown,
    bifoldableJoker: bifoldableJoker,
    bifoldableFlip: bifoldableFlip,
    bifoldableProduct: bifoldableProduct,
    bifoldableWrap: bifoldableWrap
};
