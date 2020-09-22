
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
let Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
let Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
let Data_Monoid_Endo = require("../Data.Monoid.Endo/index.js");
let Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");
let Data_Semigroup_First = require("../Data.Semigroup.First/index.js");
let Data_Semigroup_Last = require("../Data.Semigroup.Last/index.js");


class Control {
	constructor(compose) {
		this.compose = compose;
	}
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

function compose(dict) {
	return dict.compose;
}

function composeFlipped(dictCnotrol) {
	return function (f) {
		return function (g) {
			return compose(dictCnotrol)(g)(f);
		};
	};
}

let Newtype = function (unwrap, wrap) {
    this.unwrap = unwrap;
    this.wrap = wrap;
};
let wrap = function (dict) {
    return dict.wrap;
};
let unwrap = function (dict) {
    return dict.unwrap;
};
let underF2 = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        let $66 = compose(semigroupoidFn)(Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1)));
                        let $67 = Data_Functor.on(f)(Data_Functor.map(dictFunctor)(wrap(dictNewtype)));
                        return function ($68) {
                            return $66($67($68));
                        };
                    };
                };
            };
        };
    };
};
let underF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        let $69 = Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1));
                        let $70 = Data_Functor.map(dictFunctor)(wrap(dictNewtype));
                        return function ($71) {
                            return $69(f($70($71)));
                        };
                    };
                };
            };
        };
    };
};
let under2 = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                let $72 = compose(semigroupoidFn)(unwrap(dictNewtype1));
                let $73 = Data_Functor.on(f)(wrap(dictNewtype));
                return function ($74) {
                    return $72($73($74));
                };
            };
        };
    };
};
let under = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                let $75 = unwrap(dictNewtype1);
                let $76 = wrap(dictNewtype);
                return function ($77) {
                    return $75(f($76($77)));
                };
            };
        };
    };
};
let un = function (dictNewtype) {
    return function (v) {
        return unwrap(dictNewtype);
    };
};
let traverse = function (dictFunctor) {
    return function (dictNewtype) {
        return function (v) {
            return function (f) {
                let $78 = Data_Functor.map(dictFunctor)(wrap(dictNewtype));
                let $79 = unwrap(dictNewtype);
                return function ($80) {
                    return $78(f($79($80)));
                };
            };
        };
    };
};
let overF2 = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        let $81 = compose(semigroupoidFn)(Data_Functor.map(dictFunctor1)(wrap(dictNewtype1)));
                        let $82 = Data_Functor.on(f)(Data_Functor.map(dictFunctor)(unwrap(dictNewtype)));
                        return function ($83) {
                            return $81($82($83));
                        };
                    };
                };
            };
        };
    };
};
let overF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        let $84 = Data_Functor.map(dictFunctor1)(wrap(dictNewtype1));
                        let $85 = Data_Functor.map(dictFunctor)(unwrap(dictNewtype));
                        return function ($86) {
                            return $84(f($85($86)));
                        };
                    };
                };
            };
        };
    };
};
let over2 = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                let $87 = compose(semigroupoidFn)(wrap(dictNewtype1));
                let $88 = Data_Functor.on(f)(unwrap(dictNewtype));
                return function ($89) {
                    return $87($88($89));
                };
            };
        };
    };
};
let over = function (dictNewtype) {
    return function (dictNewtype1) {
        return function (v) {
            return function (f) {
                let $90 = wrap(dictNewtype1);
                let $91 = unwrap(dictNewtype);
                return function ($92) {
                    return $90(f($91($92)));
                };
            };
        };
    };
};
let op = function (dictNewtype) {
    return un(dictNewtype);
};
let newtypeMultiplicative = new Newtype(function (v) {
    return v;
}, Data_Monoid_Multiplicative.Multiplicative);
let newtypeLast = new Newtype(function (v) {
    return v;
}, Data_Semigroup_Last.Last);
let newtypeFirst = new Newtype(function (v) {
    return v;
}, Data_Semigroup_First.First);
let newtypeEndo = new Newtype(function (v) {
    return v;
}, Data_Monoid_Endo.Endo);
let newtypeDual = new Newtype(function (v) {
    return v;
}, Data_Monoid_Dual.Dual);
let newtypeDisj = new Newtype(function (v) {
    return v;
}, Data_Monoid_Disj.Disj);
let newtypeConj = new Newtype(function (v) {
    return v;
}, Data_Monoid_Conj.Conj);
let newtypeAdditive = new Newtype(function (v) {
    return v;
}, Data_Monoid_Additive.Additive);
let collect = function (dictFunctor) {
    return function (dictNewtype) {
        return function (v) {
            return function (f) {
                let $93 = wrap(dictNewtype);
                let $94 = Data_Functor.map(dictFunctor)(unwrap(dictNewtype));
                return function ($95) {
                    return $93(f($94($95)));
                };
            };
        };
    };
};
let alaF = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (dictNewtype) {
            return function (dictNewtype1) {
                return function (v) {
                    return function (f) {
                        let $96 = Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1));
                        let $97 = Data_Functor.map(dictFunctor)(wrap(dictNewtype));
                        return function ($98) {
                            return $96(f($97($98)));
                        };
                    };
                };
            };
        };
    };
};
let ala = function (dictFunctor) {
    return function (dictNewtype) {
        return function (dictNewtype1) {
            return function (v) {
                return function (f) {
                    return Data_Functor.map(dictFunctor)(unwrap(dictNewtype))(f(wrap(dictNewtype1)));
                };
            };
        };
    };
};
module.exports = {
    unwrap: unwrap,
    wrap: wrap,
    Newtype: Newtype,
    un: un,
    op: op,
    ala: ala,
    alaF: alaF,
    over: over,
    overF: overF,
    under: under,
    underF: underF,
    over2: over2,
    overF2: overF2,
    under2: under2,
    underF2: underF2,
    traverse: traverse,
    collect: collect,
    newtypeAdditive: newtypeAdditive,
    newtypeMultiplicative: newtypeMultiplicative,
    newtypeConj: newtypeConj,
    newtypeDisj: newtypeDisj,
    newtypeDual: newtypeDual,
    newtypeEndo: newtypeEndo,
    newtypeFirst: newtypeFirst,
    newtypeLast: newtypeLast
};
