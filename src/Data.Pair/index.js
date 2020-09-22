const control = require("../control");
let Data_Distributive = require("../Data.Distributive/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Test_QuickCheck_Arbitrary = require("../Test.QuickCheck.Arbitrary/index.js");
let Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen/index.js");


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let apply = function (dict) {
	return dict.apply;
};

let Pair = (function () {
    function Pair(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Pair.create = function (value0) {
        return function (value1) {
            return new Pair(value0, value1);
        };
    };
    return Pair;
})();
let uncurry = function (f) {
    return function (v) {
        return f(v.value0)(v.value1);
    };
};
let swap = function (v) {
    return new Pair(v.value1, v.value0);
};
let snd = function (v) {
    return v.value1;
};
let showPair = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(" + (Data_Show.show(dictShow)(v.value0) + (" ~ " + (Data_Show.show(dictShow)(v.value1) + ")")));
    });
};
let semigroupPair = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return new Pair(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), Data_Semigroup.append(dictSemigroup)(v.value1)(v1.value1));
        };
    });
};
let monoidPair = function (dictMonoid) {
    return new Data_Monoid.Monoid(function () {
        return semigroupPair(dictMonoid.Semigroup0());
    }, new Pair(Data_Monoid.mempty(dictMonoid), Data_Monoid.mempty(dictMonoid)));
};
let functorPair = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new Pair(f(v.value0), f(v.value1));
    };
});
let fst = function (v) {
    return v.value0;
};
let foldablePair = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(f(v.value1));
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(f(z)(v.value0))(v.value1);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v.value0)(f(v.value1)(z));
        };
    };
});
let traversablePair = new Data_Traversable.Traversable(function () {
    return foldablePair;
}, function () {
    return functorPair;
}, function (dictApplicative) {
    return function (v) {
        return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Pair.create)(v.value0))(v.value1);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(Pair.create)(f(v.value0)))(f(v.value1));
        };
    };
});
let eqPair = function (dictEq) {
    return new data.Eq(function (x) {
        return function (y) {
            return data.eq(dictEq)(x.value0)(y.value0) && data.eq(dictEq)(x.value1)(y.value1);
        };
    });
};
let ordPair = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqPair(dictOrd.Eq0());
    }, function (x) {
        return function (y) {
            let v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
            if (v instanceof Data_Ordering.LT) {
                return Data_Ordering.LT.value;
            };
            if (v instanceof Data_Ordering.GT) {
                return Data_Ordering.GT.value;
            };
            return Data_Ord.compare(dictOrd)(x.value1)(y.value1);
        };
    });
};
let distributivePair = new Data_Distributive.Distributive(function () {
    return functorPair;
}, function (dictFunctor) {
    return function (f) {
        return function (xs) {
            return new Pair(Data_Functor.map(dictFunctor)(function ($111) {
                return fst(f($111));
            })(xs), Data_Functor.map(dictFunctor)(function ($112) {
                return snd(f($112));
            })(xs));
        };
    };
}, function (dictFunctor) {
    return function (xs) {
        return new Pair(Data_Functor.map(dictFunctor)(fst)(xs), Data_Functor.map(dictFunctor)(snd)(xs));
    };
});
let curry = function (f) {
    return function (x) {
        return function (y) {
            return f(new Pair(x, y));
        };
    };
};
let arbitraryPair = function (dictArbitrary) {
    return new Test_QuickCheck_Arbitrary.Arbitrary(apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Pair.create)(Test_QuickCheck_Arbitrary.arbitrary(dictArbitrary)))(Test_QuickCheck_Arbitrary.arbitrary(dictArbitrary)));
};
let applyPair = new Apply(function () {
    return functorPair;
}, function (v) {
    return function (v1) {
        return new Pair(v.value0(v1.value0), v.value1(v1.value1));
    };
});
let bindPair = new control.Bind(function () {
    return applyPair;
}, function (v) {
    return function (f) {
        return new Pair(fst(f(v.value0)), snd(f(v.value1)));
    };
});
let applicativePair = new control.Applicative(function () {
    return applyPair;
}, function (x) {
    return new Pair(x, x);
});
let monadPair = new control.Monad(function () {
    return applicativePair;
}, function () {
    return bindPair;
});
module.exports = {
    Pair: Pair,
    fst: fst,
    snd: snd,
    curry: curry,
    uncurry: uncurry,
    swap: swap,
    eqPair: eqPair,
    ordPair: ordPair,
    showPair: showPair,
    functorPair: functorPair,
    applyPair: applyPair,
    applicativePair: applicativePair,
    bindPair: bindPair,
    monadPair: monadPair,
    semigroupPair: semigroupPair,
    monoidPair: monoidPair,
    foldablePair: foldablePair,
    traversablePair: traversablePair,
    distributivePair: distributivePair,
    arbitraryPair: arbitraryPair
};
