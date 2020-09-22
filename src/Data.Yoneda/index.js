const control = require("../control");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
const data = require("../data");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Ord = require("../Data.Ord/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let apply = function (dict) {
	return dict.apply;
};

function compose(dict) {
	return dict.compose;
}

let Yoneda = function (x) {
    return x;
};
let runYoneda = function (v) {
    return function (k) {
        return v(k);
    };
};
let lowerYoneda = function (v) {
    return v(Control_Category.identity(Control_Category.categoryFn));
};
let liftYoneda = function (dictFunctor) {
    return function (m) {
        return function (k) {
            return Data_Functor.map(dictFunctor)(k)(m);
        };
    };
};
let monadTransYoneda = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return liftYoneda(((dictMonad.Bind1()).Apply0()).Functor0());
});
let hoistYoneda = function (nat) {
    return function (v) {
        return Data_Functor.map(Data_Functor.functorFn)(nat)(v);
    };
};
let functorYoneda = new Data_Functor.Functor(function (f) {
    return function (m) {
        return function (k) {
            return runYoneda(m)(function ($34) {
                return k(f($34));
            });
        };
    };
});
let extendYoneda = function (dictExtend) {
    return new control.Extend(function () {
        return functorYoneda;
    }, function (f) {
        return function (v) {
            return function (k) {
                return control.extend(dictExtend)((function () {
                    let $35 = liftYoneda(dictExtend.Functor0());
                    return function ($36) {
                        return k(f($35($36)));
                    };
                })())(v(Control_Category.identity(Control_Category.categoryFn)));
            };
        };
    });
};
let eqYoneda = function (dictEq1) {
    return function (dictEq) {
        return new data.Eq(function (x) {
            return function (y) {
                return data.eq1(dictEq1)(dictEq)(lowerYoneda(x))(lowerYoneda(y));
            };
        });
    };
};
let ordYoneda = function (dictOrd1) {
    return function (dictOrd) {
        return new Data_Ord.Ord(function () {
            return eqYoneda(dictOrd1.Eq10())(dictOrd.Eq0());
        }, function (x) {
            return function (y) {
                return Data_Ord.compare1(dictOrd1)(dictOrd)(lowerYoneda(x))(lowerYoneda(y));
            };
        });
    };
};
let eq1Yoneda = function (dictEq1) {
    return new data.Eq1(function (dictEq) {
        return data.eq(eqYoneda(dictEq1)(dictEq));
    });
};
let ord1Yoneda = function (dictOrd1) {
    return new Data_Ord.Ord1(function () {
        return eq1Yoneda(dictOrd1.Eq10());
    }, function (dictOrd) {
        return Data_Ord.compare(ordYoneda(dictOrd1)(dictOrd));
    });
};
let comonadYoneda = function (dictComonad) {
    return new control.Comonad(function () {
        return extendYoneda(dictComonad.Extend0());
    }, (function () {
        let $37 = control.extract(dictComonad);
        return function ($38) {
            return $37(lowerYoneda($38));
        };
    })());
};
let applyYoneda = function (dictApply) {
    return new Apply(function () {
        return functorYoneda;
    }, function (v) {
        return function (v1) {
            return function (k) {
                return apply(dictApply)(v(compose(semigroupoidFn)(k)))(v1(Control_Category.identity(Control_Category.categoryFn)));
            };
        };
    });
};
let bindYoneda = function (dictBind) {
    return new control.Bind(function () {
        return applyYoneda(dictBind.Apply0());
    }, function (v) {
        return function (g) {
            return function (k) {
                return control.bind(dictBind)(v(Control_Category.identity(Control_Category.categoryFn)))(function (a) {
                    return runYoneda(g(a))(k);
                });
            };
        };
    });
};
let applicativeYoneda = function (dictApplicative) {
    return new control.Applicative(function () {
        return applyYoneda(dictApplicative.Apply0());
    }, (function () {
        let $39 = liftYoneda((dictApplicative.Apply0()).Functor0());
        let $40 = control.pure(dictApplicative);
        return function ($41) {
            return $39($40($41));
        };
    })());
};
let monadYoneda = function (dictMonad) {
    return new control.Monad(function () {
        return applicativeYoneda(dictMonad.Applicative0());
    }, function () {
        return bindYoneda(dictMonad.Bind1());
    });
};
module.exports = {
    Yoneda: Yoneda,
    runYoneda: runYoneda,
    liftYoneda: liftYoneda,
    lowerYoneda: lowerYoneda,
    hoistYoneda: hoistYoneda,
    eqYoneda: eqYoneda,
    eq1Yoneda: eq1Yoneda,
    ordYoneda: ordYoneda,
    ord1Yoneda: ord1Yoneda,
    functorYoneda: functorYoneda,
    applyYoneda: applyYoneda,
    applicativeYoneda: applicativeYoneda,
    bindYoneda: bindYoneda,
    monadYoneda: monadYoneda,
    monadTransYoneda: monadTransYoneda,
    extendYoneda: extendYoneda,
    comonadYoneda: comonadYoneda
};
