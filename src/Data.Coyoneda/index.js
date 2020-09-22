const control = require('../control');
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_Distributive = require("../Data.Distributive/index.js");
let Data_Exists = require("../Data.Exists/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
const data = require('../data');
let Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");


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

class Control {
	constructor(kw) {
		this.kw = kw;
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

let categoryFn = new Category(() => {
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

let CoyonedaF = (() => {
	function CoyonedaF(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	CoyonedaF.create = function (value0) {
		return function (value1) {
			return new CoyonedaF(value0, value1);
		};
	};
	return CoyonedaF;
})();

let Coyoneda = function (x) {
	return x;
};

let unCoyoneda = function (f) {
	return function (v) {
		return Data_Exists.runExists(function (v1) {
			return f(v1.value0)(v1.value1);
		})(v);
	};
};

let lowerCoyoneda = function (dictFunctor) {
	return unCoyoneda(data.map(dictFunctor));
};

let foldableCoyoneda = function (dictFoldable) {
	return new Data_Foldable.Foldable(function (dictMonoid) {
		return function (f) {
			return unCoyoneda(function (k) {
				return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(function ($80) {
					return f(k($80));
				});
			});
		};
	}, function (f) {
		return function (z) {
			return unCoyoneda(function (k) {
				return Data_Foldable.foldl(dictFoldable)(function (x) {
					let $81 = f(x);
					return function ($82) {
						return $81(k($82));
					};
				})(z);
			});
		};
	}, function (f) {
		return function (z) {
			return unCoyoneda(function (k) {
				return Data_Foldable.foldr(dictFoldable)(function ($83) {
					return f(k($83));
				})(z);
			});
		};
	});
};
let foldable1Coyoneda = function (dictFoldable1) {
	return new Data_Semigroup_Foldable.Foldable1(() => {
		return foldableCoyoneda(dictFoldable1.Foldable0());
	}, function (dictSemigroup) {
		return unCoyoneda(function (k) {
			return Data_Semigroup_Foldable.foldMap1(dictFoldable1)(dictSemigroup)(k);
		});
	}, function (dictSemigroup) {
		return function (f) {
			return unCoyoneda(function (k) {
				return Data_Semigroup_Foldable.foldMap1(dictFoldable1)(dictSemigroup)(function ($84) {
					return f(k($84));
				});
			});
		};
	});
};
let eqCoyoneda = function (dictFunctor) {
	return function (dictEq1) {
		return function (dictEq) {
			return new Eq(function (x) {
				return function (y) {
					return eq1(dictEq1)(dictEq)(lowerCoyoneda(dictFunctor)(x))(lowerCoyoneda(dictFunctor)(y));
				};
			});
		};
	};
};
let ordCoyoneda = function (dictFunctor) {
	return function (dictOrd1) {
		return function (dictOrd) {
			return new Data_Ord.Ord(() => {
				return eqCoyoneda(dictFunctor)(dictOrd1.Eq10())(dictOrd.Eq0());
			}, function (x) {
				return function (y) {
					return Data_Ord.compare1(dictOrd1)(dictOrd)(lowerCoyoneda(dictFunctor)(x))(lowerCoyoneda(dictFunctor)(y));
				};
			});
		};
	};
};
let eq1Coyoneda = function (dictFunctor) {
	return function (dictEq1) {
		return new Eq1(function (dictEq) {
			return eq(eqCoyoneda(dictFunctor)(dictEq1)(dictEq));
		});
	};
};
let ord1Coyoneda = function (dictFunctor) {
	return function (dictOrd1) {
		return new Data_Ord.Ord1(() => {
			return eq1Coyoneda(dictFunctor)(dictOrd1.Eq10());
		}, function (dictOrd) {
			return Data_Ord.compare(ordCoyoneda(dictFunctor)(dictOrd1)(dictOrd));
		});
	};
};
let coyoneda = function (k) {
	return function (fi) {
		return Coyoneda(Data_Exists.mkExists(new CoyonedaF(k, fi)));
	};
};
let functorCoyoneda = new data.Functor(function (f) {
	return function (v) {
		return Data_Exists.runExists(function (v1) {
			return coyoneda(function ($85) {
				return f(v1.value0($85));
			})(v1.value1);
		})(v);
	};
});
let invatiantCoyoneda = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorCoyoneda));
let hoistCoyoneda = function (nat) {
	return function (v) {
		return Data_Exists.runExists(function (v1) {
			return coyoneda(v1.value0)(nat(v1.value1));
		})(v);
	};
};
let liftCoyoneda = coyoneda(identity(categoryFn));
let distributiveCoyoneda = function (dictDistributive) {
	return new Data_Distributive.Distributive(() => {
		return functorCoyoneda;
	}, function (dictFunctor) {
		return function (f) {
			let $86 = Data_Distributive.collect(dictDistributive)(dictFunctor)((() => {
				let $88 = lowerCoyoneda(dictDistributive.Functor0());
				return function ($89) {
					return $88(f($89));
				};
			})());
			return function ($87) {
				return liftCoyoneda($86($87));
			};
		};
	}, function (dictFunctor) {
		let $90 = Data_Distributive.collect(dictDistributive)(dictFunctor)(lowerCoyoneda(dictDistributive.Functor0()));
		return function ($91) {
			return liftCoyoneda($90($91));
		};
	});
};
let extendCoyoneda = function (dictExtend) {
	return new control.Extend(() => {
		return functorCoyoneda;
	}, function (f) {
		return function (v) {
			return Data_Exists.runExists(function (v1) {
				return liftCoyoneda(control.extend(dictExtend)((() => {
					let $92 = coyoneda(v1.value0);
					return function ($93) {
						return f($92($93));
					};
				})())(v1.value1));
			})(v);
		};
	});
};
let monadTransCoyoneda = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
	return liftCoyoneda;
});
let traversableCoyoneda = function (dictTraversable) {
	return new Data_Traversable.Traversable(() => {
		return foldableCoyoneda(dictTraversable.Foldable1());
	}, () => {
		return functorCoyoneda;
	}, function (dictApplicative) {
		return unCoyoneda(function (k) {
			let $94 = data.map((dictApplicative.Apply0()).Functor0())(liftCoyoneda);
			let $95 = Data_Traversable.traverse(dictTraversable)(dictApplicative)(k);
			return function ($96) {
				return $94($95($96));
			};
		});
	}, function (dictApplicative) {
		return function (f) {
			return unCoyoneda(function (k) {
				let $97 = data.map((dictApplicative.Apply0()).Functor0())(liftCoyoneda);
				let $98 = Data_Traversable.traverse(dictTraversable)(dictApplicative)(function ($100) {
					return f(k($100));
				});
				return function ($99) {
					return $97($98($99));
				};
			});
		};
	});
};
let traversable1Coyoneda = function (dictTraversable1) {
	return new Data_Semigroup_Traversable.Traversable1(() => {
		return foldable1Coyoneda(dictTraversable1.Foldable10());
	}, () => {
		return traversableCoyoneda(dictTraversable1.Traversable1());
	}, function (dictApply) {
		return unCoyoneda(function (k) {
			let $101 = data.map(dictApply.Functor0())(liftCoyoneda);
			let $102 = Data_Semigroup_Traversable.sequence1(dictTraversable1)(dictApply);
			let $103 = data.map((dictTraversable1.Traversable1()).Functor0())(k);
			return function ($104) {
				return $101($102($103($104)));
			};
		});
	}, function (dictApply) {
		return function (f) {
			return unCoyoneda(function (k) {
				let $105 = data.map(dictApply.Functor0())(liftCoyoneda);
				let $106 = Data_Semigroup_Traversable.traverse1(dictTraversable1)(dictApply)(function ($108) {
					return f(k($108));
				});
				return function ($107) {
					return $105($106($107));
				};
			});
		};
	});
};
let comonadCoyoneda = function (dictComonad) {
	return new control.Comonad(() => {
		return extendCoyoneda(dictComonad.Extend0());
	}, function (v) {
		return Data_Exists.runExists(function (v1) {
			return v1.value0(control.extract(dictComonad)(v1.value1));
		})(v);
	});
};
let applyCoyoneda = function (dictApply) {
	return new Apply(() => {
		return functorCoyoneda;
	}, function (f) {
		return function (g) {
			return liftCoyoneda(apply(dictApply)(lowerCoyoneda(dictApply.Functor0())(f))(lowerCoyoneda(dictApply.Functor0())(g)));
		};
	});
};
let bindCoyoneda = function (dictBind) {
	return new control.Bind(() => {
		return applyCoyoneda(dictBind.Apply0());
	}, function (v) {
		return function (f) {
			return liftCoyoneda(Data_Exists.runExists(function (v1) {
				return control.bindFlipped(dictBind)((() => {
					let $109 = lowerCoyoneda((dictBind.Apply0()).Functor0());
					return function ($110) {
						return $109(f(v1.value0($110)));
					};
				})())(v1.value1);
			})(v));
		};
	});
};
let applicativeCoyoneda = function (dictApplicative) {
	return new control.Applicative(() => {
		return applyCoyoneda(dictApplicative.Apply0());
	}, (() => {
		let $111 = control.pure(dictApplicative);
		return function ($112) {
			return liftCoyoneda($111($112));
		};
	})());
};
let monadCoyoneda = function (dictMonad) {
	return new control.Monad(() => {
		return applicativeCoyoneda(dictMonad.Applicative0());
	}, () => {
		return bindCoyoneda(dictMonad.Bind1());
	});
};
let altCoyoneda = function (dictAlt) {
	return new Alt(() => {
		return functorCoyoneda;
	}, function (x) {
		return function (y) {
			return liftCoyoneda(alt(dictAlt)(lowerCoyoneda(dictAlt.Functor0())(x))(lowerCoyoneda(dictAlt.Functor0())(y)));
		};
	});
};
let plusCoyoneda = function (dictPlus) {
	return new control.Plus(() => {
		return altCoyoneda(dictPlus.Alt0());
	}, liftCoyoneda(control.empty(dictPlus)));
};
let alternativeCoyoneda = function (dictAlternative) {
	return new Control_Alternative.Alternative(() => {
		return applicativeCoyoneda(dictAlternative.Applicative0());
	}, () => {
		return plusCoyoneda(dictAlternative.Plus1());
	});
};
let monadZeroCoyoneda = function (dictMonadZero) {
	return new Control_MonadZero.MonadZero(() => {
		return alternativeCoyoneda(dictMonadZero.Alternative1());
	}, () => {
		return monadCoyoneda(dictMonadZero.Monad0());
	});
};
let monadPlusCoyoneda = function (dictMonadPlus) {
	return new Control_MonadPlus.MonadPlus(() => {
		return monadZeroCoyoneda(dictMonadPlus.MonadZero0());
	});
};
module.exports = {
	Coyoneda: Coyoneda,
	coyoneda: coyoneda,
	unCoyoneda: unCoyoneda,
	liftCoyoneda: liftCoyoneda,
	lowerCoyoneda: lowerCoyoneda,
	hoistCoyoneda: hoistCoyoneda,
	eqCoyoneda: eqCoyoneda,
	eq1Coyoneda: eq1Coyoneda,
	ordCoyoneda: ordCoyoneda,
	ord1Coyoneda: ord1Coyoneda,
	functorCoyoneda: functorCoyoneda,
	invatiantCoyoneda: invatiantCoyoneda,
	applyCoyoneda: applyCoyoneda,
	applicativeCoyoneda: applicativeCoyoneda,
	altCoyoneda: altCoyoneda,
	plusCoyoneda: plusCoyoneda,
	alternativeCoyoneda: alternativeCoyoneda,
	bindCoyoneda: bindCoyoneda,
	monadCoyoneda: monadCoyoneda,
	monadTransCoyoneda: monadTransCoyoneda,
	monadZeroCoyoneda: monadZeroCoyoneda,
	monadPlusCoyoneda: monadPlusCoyoneda,
	extendCoyoneda: extendCoyoneda,
	comonadCoyoneda: comonadCoyoneda,
	foldableCoyoneda: foldableCoyoneda,
	traversableCoyoneda: traversableCoyoneda,
	foldable1Coyoneda: foldable1Coyoneda,
	traversable1Coyoneda: traversable1Coyoneda,
	distributiveCoyoneda: distributiveCoyoneda
};
