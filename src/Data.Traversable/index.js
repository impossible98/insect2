let $foreign = require("./foreign.js");

const control = require("../control");
let Data_Foldable = require("../Data.Foldable/index.js");
let data = require("../data");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Maybe_First = require("../Data.Maybe.First/index.js");
let Data_Maybe_Last = require("../Data.Maybe.Last/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
let Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
let Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
let Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");
let Data_Traversable_Accum_Internal = require("../Data.Traversable.Accum.Internal/index.js");


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

let Traversable = function (Foldable1, Functor0, sequence, traverse) {
    this.Foldable1 = Foldable1;
    this.Functor0 = Functor0;
    this.sequence = sequence;
    this.traverse = traverse;
};
let traverse = function (dict) {
    return dict.traverse;
};
let traversableMultiplicative = new Traversable(function () {
    return Data_Foldable.foldableMultiplicative;
}, function () {
    return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Multiplicative.Multiplicative)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
        };
    };
});
let traversableMaybe = new Traversable(function () {
    return Data_Foldable.foldableMaybe;
}, function () {
    return Data_Maybe.functorMaybe;
}, function (dictApplicative) {
    return function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return control.pure(dictApplicative)(Data_Maybe.Nothing.value);
        };
        if (v instanceof Data_Maybe.Just) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Maybe.Just.create)(v.value0);
        };
        throw new Error("Failed pattern match at Data.Traversable (line 86, column 1 - line 90, column 33): " + [ v.constructor.name ]);
    };
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof Data_Maybe.Nothing) {
                return control.pure(dictApplicative)(Data_Maybe.Nothing.value);
            };
            if (v1 instanceof Data_Maybe.Just) {
                return data.map((dictApplicative.Apply0()).Functor0())(Data_Maybe.Just.create)(v(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Traversable (line 86, column 1 - line 90, column 33): " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
let traversableDual = new Traversable(function () {
    return Data_Foldable.foldableDual;
}, function () {
    return Data_Monoid_Dual.functorDual;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Dual.Dual)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Dual.Dual)(f(v));
        };
    };
});
let traversableDisj = new Traversable(function () {
    return Data_Foldable.foldableDisj;
}, function () {
    return Data_Monoid_Disj.functorDisj;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Disj.Disj)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Disj.Disj)(f(v));
        };
    };
});
let traversableConj = new Traversable(function () {
    return Data_Foldable.foldableConj;
}, function () {
    return Data_Monoid_Conj.functorConj;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Conj.Conj)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Conj.Conj)(f(v));
        };
    };
});
let traversableAdditive = new Traversable(function () {
    return Data_Foldable.foldableAdditive;
}, function () {
    return Data_Monoid_Additive.functorAdditive;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Additive.Additive)(v);
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Monoid_Additive.Additive)(f(v));
        };
    };
});
let sequenceDefault = function (dictTraversable) {
    return function (dictApplicative) {
        return traverse(dictTraversable)(dictApplicative)(identity(categoryFn));
    };
};
let traversableArray = new Traversable(function () {
    return Data_Foldable.foldableArray;
}, function () {
    return data.functorArray;
}, function (dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
}, function (dictApplicative) {
    return $foreign.traverseArrayImpl(apply(dictApplicative.Apply0()))(data.map((dictApplicative.Apply0()).Functor0()))(control.pure(dictApplicative));
});
let sequence = function (dict) {
    return dict.sequence;
};
let traversableFirst = new Traversable(function () {
    return Data_Foldable.foldableFirst;
}, function () {
    return Data_Maybe_First.functorFirst;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_First.First)(sequence(traversableMaybe)(dictApplicative)(v));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_First.First)(traverse(traversableMaybe)(dictApplicative)(f)(v));
        };
    };
});
let traversableLast = new Traversable(function () {
    return Data_Foldable.foldableLast;
}, function () {
    return Data_Maybe_Last.functorLast;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_Last.Last)(sequence(traversableMaybe)(dictApplicative)(v));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(Data_Maybe_Last.Last)(traverse(traversableMaybe)(dictApplicative)(f)(v));
        };
    };
});
let traverseDefault = function (dictTraversable) {
    return function (dictApplicative) {
        return function (f) {
            return function (ta) {
                return sequence(dictTraversable)(dictApplicative)(data.map(dictTraversable.Functor0())(f)(ta));
            };
        };
    };
};
let mapAccumR = function (dictTraversable) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return Data_Traversable_Accum_Internal.stateR(traverse(dictTraversable)(Data_Traversable_Accum_Internal.applicativeStateR)(function (a) {
                    return function (s) {
                        return f(s)(a);
                    };
                })(xs))(s0);
            };
        };
    };
};
let scanr = function (dictTraversable) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumR(dictTraversable)(function (b) {
                    return function (a) {
                        let b$prime = f(a)(b);
                        return {
                            accum: b$prime,
                            value: b$prime
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
let mapAccumL = function (dictTraversable) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return Data_Traversable_Accum_Internal.stateL(traverse(dictTraversable)(Data_Traversable_Accum_Internal.applicativeStateL)(function (a) {
                    return function (s) {
                        return f(s)(a);
                    };
                })(xs))(s0);
            };
        };
    };
};
let scanl = function (dictTraversable) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumL(dictTraversable)(function (b) {
                    return function (a) {
                        let b$prime = f(b)(a);
                        return {
                            accum: b$prime,
                            value: b$prime
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
let $$for = function (dictApplicative) {
    return function (dictTraversable) {
        return function (x) {
            return function (f) {
                return traverse(dictTraversable)(dictApplicative)(f)(x);
            };
        };
    };
};
module.exports = {
    Traversable: Traversable,
    traverse: traverse,
    sequence: sequence,
    traverseDefault: traverseDefault,
    sequenceDefault: sequenceDefault,
    "for": $$for,
    scanl: scanl,
    scanr: scanr,
    mapAccumL: mapAccumL,
    mapAccumR: mapAccumR,
    traversableArray: traversableArray,
    traversableMaybe: traversableMaybe,
    traversableFirst: traversableFirst,
    traversableLast: traversableLast,
    traversableAdditive: traversableAdditive,
    traversableDual: traversableDual,
    traversableConj: traversableConj,
    traversableDisj: traversableDisj,
    traversableMultiplicative: traversableMultiplicative
};
