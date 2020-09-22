const control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Either = require("../Data.Either/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");



class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

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

let Product = function (x) {
    return x;
};

let showProduct = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(product " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
        });
    };
};
let product = function (fa) {
    return function (ga) {
        return new Data_Tuple.Tuple(fa, ga);
    };
};
let newtypeProduct = new Data_Newtype.Newtype(function (n) {
    return n;
}, Product);
let functorProduct = function (dictFunctor) {
    return function (dictFunctor1) {
        return new data.Functor(function (f) {
            return function (v) {
                return Data_Bifunctor.bimap(Data_Tuple.bifunctorTuple)(data.map(dictFunctor)(f))(data.map(dictFunctor1)(f))(v);
            };
        });
    };
};
let functorWithIndexProduct = function (dictFunctorWithIndex) {
    return function (dictFunctorWithIndex1) {
        return new Data_FunctorWithIndex.FunctorWithIndex(function () {
            return functorProduct(dictFunctorWithIndex.Functor0())(dictFunctorWithIndex1.Functor0());
        }, function (f) {
            return function (v) {
                return Data_Bifunctor.bimap(Data_Tuple.bifunctorTuple)(Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex)(function ($136) {
                    return f(Data_Either.Left.create($136));
                }))(Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex1)(function ($137) {
                    return f(Data_Either.Right.create($137));
                }))(v);
            };
        });
    };
};
let foldableProduct = function (dictFoldable) {
    return function (dictFoldable1) {
        return new Data_Foldable.Foldable(function (dictMonoid) {
            return function (f) {
                return function (v) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f)(v.value0))(Data_Foldable.foldMap(dictFoldable1)(dictMonoid)(f)(v.value1));
                };
            };
        }, function (f) {
            return function (z) {
                return function (v) {
                    return Data_Foldable.foldl(dictFoldable1)(f)(Data_Foldable.foldl(dictFoldable)(f)(z)(v.value0))(v.value1);
                };
            };
        }, function (f) {
            return function (z) {
                return function (v) {
                    return Data_Foldable.foldr(dictFoldable)(f)(Data_Foldable.foldr(dictFoldable1)(f)(z)(v.value1))(v.value0);
                };
            };
        });
    };
};
let foldableWithIndexProduct = function (dictFoldableWithIndex) {
    return function (dictFoldableWithIndex1) {
        return new Data_FoldableWithIndex.FoldableWithIndex(function () {
            return foldableProduct(dictFoldableWithIndex.Foldable0())(dictFoldableWithIndex1.Foldable0());
        }, function (dictMonoid) {
            return function (f) {
                return function (v) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(function ($138) {
                        return f(Data_Either.Left.create($138));
                    })(v.value0))(Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex1)(dictMonoid)(function ($139) {
                        return f(Data_Either.Right.create($139));
                    })(v.value1));
                };
            };
        }, function (f) {
            return function (z) {
                return function (v) {
                    return Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex1)(function ($140) {
                        return f(Data_Either.Right.create($140));
                    })(Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(function ($141) {
                        return f(Data_Either.Left.create($141));
                    })(z)(v.value0))(v.value1);
                };
            };
        }, function (f) {
            return function (z) {
                return function (v) {
                    return Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex)(function ($142) {
                        return f(Data_Either.Left.create($142));
                    })(Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex1)(function ($143) {
                        return f(Data_Either.Right.create($143));
                    })(z)(v.value1))(v.value0);
                };
            };
        });
    };
};
let traversableProduct = function (dictTraversable) {
    return function (dictTraversable1) {
        return new Data_Traversable.Traversable(function () {
            return foldableProduct(dictTraversable.Foldable1())(dictTraversable1.Foldable1());
        }, function () {
            return functorProduct(dictTraversable.Functor0())(dictTraversable1.Functor0());
        }, function (dictApplicative) {
            return function (v) {
                return lift2(dictApplicative.Apply0())(product)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value0))(Data_Traversable.sequence(dictTraversable1)(dictApplicative)(v.value1));
            };
        }, function (dictApplicative) {
            return function (f) {
                return function (v) {
                    return lift2(dictApplicative.Apply0())(product)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value0))(Data_Traversable.traverse(dictTraversable1)(dictApplicative)(f)(v.value1));
                };
            };
        });
    };
};
let traversableWithIndexProduct = function (dictTraversableWithIndex) {
    return function (dictTraversableWithIndex1) {
        return new Data_TraversableWithIndex.TraversableWithIndex(function () {
            return foldableWithIndexProduct(dictTraversableWithIndex.FoldableWithIndex1())(dictTraversableWithIndex1.FoldableWithIndex1());
        }, function () {
            return functorWithIndexProduct(dictTraversableWithIndex.FunctorWithIndex0())(dictTraversableWithIndex1.FunctorWithIndex0());
        }, function () {
            return traversableProduct(dictTraversableWithIndex.Traversable2())(dictTraversableWithIndex1.Traversable2());
        }, function (dictApplicative) {
            return function (f) {
                return function (v) {
                    return lift2(dictApplicative.Apply0())(product)(Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(function ($144) {
                        return f(Data_Either.Left.create($144));
                    })(v.value0))(Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex1)(dictApplicative)(function ($145) {
                        return f(Data_Either.Right.create($145));
                    })(v.value1));
                };
            };
        });
    };
};
let eq1Product = function (dictEq1) {
    return function (dictEq11) {
        return new data.Eq1(function (dictEq) {
            return function (v) {
                return function (v1) {
                    return data.eq1(dictEq1)(dictEq)(v.value0)(v1.value0) && data.eq1(dictEq11)(dictEq)(v.value1)(v1.value1);
                };
            };
        });
    };
};
let eqProduct = function (dictEq1) {
    return function (dictEq11) {
        return function (dictEq) {
            return new data.Eq(data.eq1(eq1Product(dictEq1)(dictEq11))(dictEq));
        };
    };
};
let ord1Product = function (dictOrd1) {
    return function (dictOrd11) {
        return new Data_Ord.Ord1(function () {
            return eq1Product(dictOrd1.Eq10())(dictOrd11.Eq10());
        }, function (dictOrd) {
            return function (v) {
                return function (v1) {
                    let v2 = Data_Ord.compare1(dictOrd1)(dictOrd)(v.value0)(v1.value0);
                    if (v2 instanceof Data_Ordering.EQ) {
                        return Data_Ord.compare1(dictOrd11)(dictOrd)(v.value1)(v1.value1);
                    };
                    return v2;
                };
            };
        });
    };
};
let ordProduct = function (dictOrd1) {
    return function (dictOrd11) {
        return function (dictOrd) {
            return new Data_Ord.Ord(function () {
                return eqProduct(dictOrd1.Eq10())(dictOrd11.Eq10())(dictOrd.Eq0());
            }, Data_Ord.compare1(ord1Product(dictOrd1)(dictOrd11))(dictOrd));
        };
    };
};
let bihoistProduct = function (natF) {
    return function (natG) {
        return function (v) {
            return Data_Bifunctor.bimap(Data_Tuple.bifunctorTuple)(natF)(natG)(v);
        };
    };
};
let applyProduct = function (dictApply) {
    return function (dictApply1) {
        return new Apply(function () {
            return functorProduct(dictApply.Functor0())(dictApply1.Functor0());
        }, function (v) {
            return function (v1) {
                return product(apply(dictApply)(v.value0)(v1.value0))(apply(dictApply1)(v.value1)(v1.value1));
            };
        });
    };
};
let bindProduct = function (dictBind) {
    return function (dictBind1) {
        return new control.Bind(function () {
            return applyProduct(dictBind.Apply0())(dictBind1.Apply0());
        }, function (v) {
            return function (f) {
                return product(control.bind(dictBind)(v.value0)((function () {
                    let $146 = Data_Newtype.unwrap(newtypeProduct);
                    return function ($147) {
                        return Data_Tuple.fst($146(f($147)));
                    };
                })()))(control.bind(dictBind1)(v.value1)((function () {
                    let $148 = Data_Newtype.unwrap(newtypeProduct);
                    return function ($149) {
                        return Data_Tuple.snd($148(f($149)));
                    };
                })()));
            };
        });
    };
};
let applicativeProduct = function (dictApplicative) {
    return function (dictApplicative1) {
        return new control.Applicative(function () {
            return applyProduct(dictApplicative.Apply0())(dictApplicative1.Apply0());
        }, function (a) {
            return product(control.pure(dictApplicative)(a))(control.pure(dictApplicative1)(a));
        });
    };
};
let monadProduct = function (dictMonad) {
    return function (dictMonad1) {
        return new control.Monad(function () {
            return applicativeProduct(dictMonad.Applicative0())(dictMonad1.Applicative0());
        }, function () {
            return bindProduct(dictMonad.Bind1())(dictMonad1.Bind1());
        });
    };
};
module.exports = {
    Product: Product,
    product: product,
    bihoistProduct: bihoistProduct,
    newtypeProduct: newtypeProduct,
    eqProduct: eqProduct,
    eq1Product: eq1Product,
    ordProduct: ordProduct,
    ord1Product: ord1Product,
    showProduct: showProduct,
    functorProduct: functorProduct,
    foldableProduct: foldableProduct,
    traversableProduct: traversableProduct,
    functorWithIndexProduct: functorWithIndexProduct,
    foldableWithIndexProduct: foldableWithIndexProduct,
    traversableWithIndexProduct: traversableWithIndexProduct,
    applyProduct: applyProduct,
    applicativeProduct: applicativeProduct,
    bindProduct: bindProduct,
    monadProduct: monadProduct
};
