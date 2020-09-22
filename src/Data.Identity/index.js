const control = require("../control");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");


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

let Identity = function (x) {
    return x;
};
let showIdentity = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Identity " + (Data_Show.show(dictShow)(v) + ")");
    });
};
let semiringIdentity = function (dictSemiring) {
    return dictSemiring;
};
let semigroupIdenity = function (dictSemigroup) {
    return dictSemigroup;
};
let ringIdentity = function (dictRing) {
    return dictRing;
};
let ordIdentity = function (dictOrd) {
    return dictOrd;
};
let newtypeIdentity = new Data_Newtype.Newtype(function (n) {
    return n;
}, Identity);
let monoidIdentity = function (dictMonoid) {
    return dictMonoid;
};
let lazyIdentity = function (dictLazy) {
    return dictLazy;
};
let heytingAlgebraIdentity = function (dictHeytingAlgebra) {
    return dictHeytingAlgebra;
};
let functorIdentity = new Data_Functor.Functor(function (f) {
    return function (m) {
        return f(m);
    };
});
let functorWithIndexIdentity = new Data_FunctorWithIndex.FunctorWithIndex(function () {
    return functorIdentity;
}, function (f) {
    return function (v) {
        return f({})(v);
    };
});
let invariantIdentity = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorIdentity));
let foldableIdentity = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f(v)(z);
        };
    };
});
let foldableWithIndexIdentity = new Data_FoldableWithIndex.FoldableWithIndex(function () {
    return foldableIdentity;
}, function (dictMonoid) {
    return function (f) {
        return function (v) {
            return f({})(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f({})(z)(v);
        };
    };
}, function (f) {
    return function (z) {
        return function (v) {
            return f({})(v)(z);
        };
    };
});
let traversableIdentity = new Data_Traversable.Traversable(function () {
    return foldableIdentity;
}, function () {
    return functorIdentity;
}, function (dictApplicative) {
    return function (v) {
        return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Identity)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Identity)(f(v));
        };
    };
});
let traversableWithIndexIdentity = new Data_TraversableWithIndex.TraversableWithIndex(function () {
    return foldableWithIndexIdentity;
}, function () {
    return functorWithIndexIdentity;
}, function () {
    return traversableIdentity;
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Identity)(f({})(v));
        };
    };
});
let foldable1Identity = new Data_Semigroup_Foldable.Foldable1(function () {
    return foldableIdentity;
}, function (dictSemigroup) {
    return function (v) {
        return v;
    };
}, function (dictSemigroup) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
});
let traversable1Identity = new Data_Semigroup_Traversable.Traversable1(function () {
    return foldable1Identity;
}, function () {
    return traversableIdentity;
}, function (dictApply) {
    return function (v) {
        return Data_Functor.map(dictApply.Functor0())(Identity)(v);
    };
}, function (dictApply) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictApply.Functor0())(Identity)(f(v));
        };
    };
});
let extendIdentity = new control.Extend(function () {
    return functorIdentity;
}, function (f) {
    return function (m) {
        return f(m);
    };
});
let euclideanRingIdentity = function (dictEuclideanRing) {
    return dictEuclideanRing;
};
let eqIdentity = function (dictEq) {
    return dictEq;
};
let eq1Identity = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqIdentity(dictEq));
});
let ord1Identity = new Data_Ord.Ord1(function () {
    return eq1Identity;
}, function (dictOrd) {
    return Data_Ord.compare(ordIdentity(dictOrd));
});
let comonadIdentity = new control.Comonad(function () {
    return extendIdentity;
}, function (v) {
    return v;
});
let commutativeRingIdentity = function (dictCommutativeRing) {
    return dictCommutativeRing;
};
let boundedIdentity = function (dictBounded) {
    return dictBounded;
};
let booleanAlgebraIdentity = function (dictBooleanAlgebra) {
    return dictBooleanAlgebra;
};
let applyIdentity = new Apply(function () {
    return functorIdentity;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
let bindIdentity = new control.Bind(function () {
    return applyIdentity;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
let applicativeIdentity = new control.Applicative(function () {
    return applyIdentity;
}, Identity);
let monadIdentity = new control.Monad(function () {
    return applicativeIdentity;
}, function () {
    return bindIdentity;
});
let altIdentity = new Alt(function () {
    return functorIdentity;
}, function (x) {
    return function (v) {
        return x;
    };
});
module.exports = {
    Identity: Identity,
    newtypeIdentity: newtypeIdentity,
    eqIdentity: eqIdentity,
    ordIdentity: ordIdentity,
    boundedIdentity: boundedIdentity,
    heytingAlgebraIdentity: heytingAlgebraIdentity,
    booleanAlgebraIdentity: booleanAlgebraIdentity,
    semigroupIdenity: semigroupIdenity,
    monoidIdentity: monoidIdentity,
    semiringIdentity: semiringIdentity,
    euclideanRingIdentity: euclideanRingIdentity,
    ringIdentity: ringIdentity,
    commutativeRingIdentity: commutativeRingIdentity,
    lazyIdentity: lazyIdentity,
    showIdentity: showIdentity,
    eq1Identity: eq1Identity,
    ord1Identity: ord1Identity,
    functorIdentity: functorIdentity,
    functorWithIndexIdentity: functorWithIndexIdentity,
    invariantIdentity: invariantIdentity,
    altIdentity: altIdentity,
    applyIdentity: applyIdentity,
    applicativeIdentity: applicativeIdentity,
    bindIdentity: bindIdentity,
    monadIdentity: monadIdentity,
    extendIdentity: extendIdentity,
    comonadIdentity: comonadIdentity,
    foldableIdentity: foldableIdentity,
    foldable1Identity: foldable1Identity,
    foldableWithIndexIdentity: foldableWithIndexIdentity,
    traversableIdentity: traversableIdentity,
    traversable1Identity: traversable1Identity,
    traversableWithIndexIdentity: traversableWithIndexIdentity
};
