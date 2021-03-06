const control = require('../control');
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Either = require("../Data.Either/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");


let Coproduct = function (x) {
	return x;
};
let showCoproduct = function (dictShow) {
	return function (dictShow1) {
		return new Data_Show.Show(function (v) {
			if (v instanceof Data_Either.Left) {
				return "(left " + (Data_Show.show(dictShow)(v.value0) + ")");
			};
			if (v instanceof Data_Either.Right) {
				return "(right " + (Data_Show.show(dictShow1)(v.value0) + ")");
			};
			throw new Error("Failed pattern match at Data.Functor.Coproduct (line 67, column 1 - line 69, column 60): " + [v.constructor.name]);
		});
	};
};
let right = function (ga) {
	return new Data_Either.Right(ga);
};
let newtypeCoproduct = new Data_Newtype.Newtype(function (n) {
	return n;
}, Coproduct);
let left = function (fa) {
	return new Data_Either.Left(fa);
};
let functorCoproduct = function (dictFunctor) {
	return function (dictFunctor1) {
		return new data.Functor(function (f) {
			return function (v) {
				return Data_Bifunctor.bimap(Data_Either.bifunctorEither)(data.map(dictFunctor)(f))(data.map(dictFunctor1)(f))(v);
			};
		});
	};
};
let functorWithIndexCoproduct = function (dictFunctorWithIndex) {
	return function (dictFunctorWithIndex1) {
		return new Data_FunctorWithIndex.FunctorWithIndex(function () {
			return functorCoproduct(dictFunctorWithIndex.Functor0())(dictFunctorWithIndex1.Functor0());
		}, function (f) {
			return function (v) {
				return Data_Bifunctor.bimap(Data_Either.bifunctorEither)(Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex)(function ($82) {
					return f(Data_Either.Left.create($82));
				}))(Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex1)(function ($83) {
					return f(Data_Either.Right.create($83));
				}))(v);
			};
		});
	};
};
let eq1Coproduct = function (dictEq1) {
	return function (dictEq11) {
		return new data.Eq1(function (dictEq) {
			return function (v) {
				return function (v1) {
					if (v instanceof Data_Either.Left && v1 instanceof Data_Either.Left) {
						return data.eq1(dictEq1)(dictEq)(v.value0)(v1.value0);
					};
					if (v instanceof Data_Either.Right && v1 instanceof Data_Either.Right) {
						return data.eq1(dictEq11)(dictEq)(v.value0)(v1.value0);
					};
					return false;
				};
			};
		});
	};
};
let eqCoproduct = function (dictEq1) {
	return function (dictEq11) {
		return function (dictEq) {
			return new data.Eq(data.eq1(eq1Coproduct(dictEq1)(dictEq11))(dictEq));
		};
	};
};
let ord1Coproduct = function (dictOrd1) {
	return function (dictOrd11) {
		return new Data_Ord.Ord1(function () {
			return eq1Coproduct(dictOrd1.Eq10())(dictOrd11.Eq10());
		}, function (dictOrd) {
			return function (v) {
				return function (v1) {
					if (v instanceof Data_Either.Left && v1 instanceof Data_Either.Left) {
						return Data_Ord.compare1(dictOrd1)(dictOrd)(v.value0)(v1.value0);
					};
					if (v instanceof Data_Either.Left) {
						return Data_Ordering.LT.value;
					};
					if (v1 instanceof Data_Either.Left) {
						return Data_Ordering.GT.value;
					};
					if (v instanceof Data_Either.Right && v1 instanceof Data_Either.Right) {
						return Data_Ord.compare1(dictOrd11)(dictOrd)(v.value0)(v1.value0);
					};
					throw new Error("Failed pattern match at Data.Functor.Coproduct (line 61, column 5 - line 65, column 43): " + [v.constructor.name, v1.constructor.name]);
				};
			};
		});
	};
};
let ordCoproduct = function (dictOrd1) {
	return function (dictOrd11) {
		return function (dictOrd) {
			return new Data_Ord.Ord(function () {
				return eqCoproduct(dictOrd1.Eq10())(dictOrd11.Eq10())(dictOrd.Eq0());
			}, Data_Ord.compare1(ord1Coproduct(dictOrd1)(dictOrd11))(dictOrd));
		};
	};
};
let coproduct = function (v) {
	return function (v1) {
		return function (v2) {
			if (v2 instanceof Data_Either.Left) {
				return v(v2.value0);
			};
			if (v2 instanceof Data_Either.Right) {
				return v1(v2.value0);
			};
			throw new Error("Failed pattern match at Data.Functor.Coproduct (line 31, column 1 - line 31, column 78): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
};
let extendCoproduct = function (dictExtend) {
	return function (dictExtend1) {
		return new control.Extend(function () {
			return functorCoproduct(dictExtend.Functor0())(dictExtend1.Functor0());
		}, function (f) {
			let $84 = coproduct((function () {
				let $86 = control.extend(dictExtend)(function ($88) {
					return f(Coproduct(Data_Either.Left.create($88)));
				});
				return function ($87) {
					return Data_Either.Left.create($86($87));
				};
			})())((function () {
				let $89 = control.extend(dictExtend1)(function ($91) {
					return f(Coproduct(Data_Either.Right.create($91)));
				});
				return function ($90) {
					return Data_Either.Right.create($89($90));
				};
			})());
			return function ($85) {
				return Coproduct($84($85));
			};
		});
	};
};
let foldableCoproduct = function (dictFoldable) {
	return function (dictFoldable1) {
		return new Data_Foldable.Foldable(function (dictMonoid) {
			return function (f) {
				return coproduct(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f))(Data_Foldable.foldMap(dictFoldable1)(dictMonoid)(f));
			};
		}, function (f) {
			return function (z) {
				return coproduct(Data_Foldable.foldl(dictFoldable)(f)(z))(Data_Foldable.foldl(dictFoldable1)(f)(z));
			};
		}, function (f) {
			return function (z) {
				return coproduct(Data_Foldable.foldr(dictFoldable)(f)(z))(Data_Foldable.foldr(dictFoldable1)(f)(z));
			};
		});
	};
};
let foldableWithIndexCoproduct = function (dictFoldableWithIndex) {
	return function (dictFoldableWithIndex1) {
		return new Data_FoldableWithIndex.FoldableWithIndex(function () {
			return foldableCoproduct(dictFoldableWithIndex.Foldable0())(dictFoldableWithIndex1.Foldable0());
		}, function (dictMonoid) {
			return function (f) {
				return coproduct(Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(function ($92) {
					return f(Data_Either.Left.create($92));
				}))(Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex1)(dictMonoid)(function ($93) {
					return f(Data_Either.Right.create($93));
				}));
			};
		}, function (f) {
			return function (z) {
				return coproduct(Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(function ($94) {
					return f(Data_Either.Left.create($94));
				})(z))(Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex1)(function ($95) {
					return f(Data_Either.Right.create($95));
				})(z));
			};
		}, function (f) {
			return function (z) {
				return coproduct(Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex)(function ($96) {
					return f(Data_Either.Left.create($96));
				})(z))(Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex1)(function ($97) {
					return f(Data_Either.Right.create($97));
				})(z));
			};
		});
	};
};
let traversableCoproduct = function (dictTraversable) {
	return function (dictTraversable1) {
		return new Data_Traversable.Traversable(function () {
			return foldableCoproduct(dictTraversable.Foldable1())(dictTraversable1.Foldable1());
		}, function () {
			return functorCoproduct(dictTraversable.Functor0())(dictTraversable1.Functor0());
		}, function (dictApplicative) {
			return coproduct((function () {
				let $98 = data.map((dictApplicative.Apply0()).Functor0())(function ($101) {
					return Coproduct(Data_Either.Left.create($101));
				});
				let $99 = Data_Traversable.sequence(dictTraversable)(dictApplicative);
				return function ($100) {
					return $98($99($100));
				};
			})())((function () {
				let $102 = data.map((dictApplicative.Apply0()).Functor0())(function ($105) {
					return Coproduct(Data_Either.Right.create($105));
				});
				let $103 = Data_Traversable.sequence(dictTraversable1)(dictApplicative);
				return function ($104) {
					return $102($103($104));
				};
			})());
		}, function (dictApplicative) {
			return function (f) {
				return coproduct((function () {
					let $106 = data.map((dictApplicative.Apply0()).Functor0())(function ($109) {
						return Coproduct(Data_Either.Left.create($109));
					});
					let $107 = Data_Traversable.traverse(dictTraversable)(dictApplicative)(f);
					return function ($108) {
						return $106($107($108));
					};
				})())((function () {
					let $110 = data.map((dictApplicative.Apply0()).Functor0())(function ($113) {
						return Coproduct(Data_Either.Right.create($113));
					});
					let $111 = Data_Traversable.traverse(dictTraversable1)(dictApplicative)(f);
					return function ($112) {
						return $110($111($112));
					};
				})());
			};
		});
	};
};
let traversableWithIndexCoproduct = function (dictTraversableWithIndex) {
	return function (dictTraversableWithIndex1) {
		return new Data_TraversableWithIndex.TraversableWithIndex(function () {
			return foldableWithIndexCoproduct(dictTraversableWithIndex.FoldableWithIndex1())(dictTraversableWithIndex1.FoldableWithIndex1());
		}, function () {
			return functorWithIndexCoproduct(dictTraversableWithIndex.FunctorWithIndex0())(dictTraversableWithIndex1.FunctorWithIndex0());
		}, function () {
			return traversableCoproduct(dictTraversableWithIndex.Traversable2())(dictTraversableWithIndex1.Traversable2());
		}, function (dictApplicative) {
			return function (f) {
				return coproduct((function () {
					let $114 = data.map((dictApplicative.Apply0()).Functor0())(function ($117) {
						return Coproduct(Data_Either.Left.create($117));
					});
					let $115 = Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(function ($118) {
						return f(Data_Either.Left.create($118));
					});
					return function ($116) {
						return $114($115($116));
					};
				})())((function () {
					let $119 = data.map((dictApplicative.Apply0()).Functor0())(function ($122) {
						return Coproduct(Data_Either.Right.create($122));
					});
					let $120 = Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex1)(dictApplicative)(function ($123) {
						return f(Data_Either.Right.create($123));
					});
					return function ($121) {
						return $119($120($121));
					};
				})());
			};
		});
	};
};
let comonadCoproduct = function (dictComonad) {
	return function (dictComonad1) {
		return new control.Comonad(function () {
			return extendCoproduct(dictComonad.Extend0())(dictComonad1.Extend0());
		}, coproduct(control.extract(dictComonad))(control.extract(dictComonad1)));
	};
};
let bihoistCoproduct = function (natF) {
	return function (natG) {
		return function (v) {
			return Data_Bifunctor.bimap(Data_Either.bifunctorEither)(natF)(natG)(v);
		};
	};
};
module.exports = {
	Coproduct: Coproduct,
	left: left,
	right: right,
	coproduct: coproduct,
	bihoistCoproduct: bihoistCoproduct,
	newtypeCoproduct: newtypeCoproduct,
	eqCoproduct: eqCoproduct,
	eq1Coproduct: eq1Coproduct,
	ordCoproduct: ordCoproduct,
	ord1Coproduct: ord1Coproduct,
	showCoproduct: showCoproduct,
	functorCoproduct: functorCoproduct,
	functorWithIndexCoproduct: functorWithIndexCoproduct,
	extendCoproduct: extendCoproduct,
	comonadCoproduct: comonadCoproduct,
	foldableCoproduct: foldableCoproduct,
	foldableWithIndexCoproduct: foldableWithIndexCoproduct,
	traversableCoproduct: traversableCoproduct,
	traversableWithIndexCoproduct: traversableWithIndexCoproduct
};
