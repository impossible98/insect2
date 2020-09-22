const control = require("../control");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let data = require("../data");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");


let intAdd = function (x) {
	return function (y) {
		return x + y | 0;
	};
};

let intMul = function (x) {
	return function (y) {
		return x * y | 0;
	};
};

let numAdd = function (n1) {
	return function (n2) {
		return n1 + n2;
	};
};

let numMul = function (n1) {
	return function (n2) {
		return n1 * n2;
	};
};

let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let semiringNumber = new Semiring(numAdd, numMul, 1.0, 0.0);
let semiringInt = new Semiring(intAdd, intMul, 1, 0);

let pure = function (dict) {
	return dict.pure;
};

let Cons = (function () {
    function Cons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cons.create = function (value0) {
        return function (value1) {
            return new Cons(value0, value1);
        };
    };
    return Cons;
})();
let Nil = (function () {
    function Nil() {

    };
    Nil.value = new Nil();
    return Nil;
})();

let AtIndex = function (x) {
    return x;
};
let unfoldable = function (dictMonadRec) {
    return function (dictMonadGen) {
        return function (dictUnfoldable) {
            return function (gen) {
                let unfold = function (v) {
                    if (v instanceof Nil) {
                        return Data_Maybe.Nothing.value;
                    };
                    if (v instanceof Cons) {
                        return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0, v.value1));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Gen (line 101, column 12 - line 103, column 35): " + [ v.constructor.name ]);
                };
                let loopGen = function (v) {
                    if (v.value1 <= 0) {
                        return pure((dictMonadGen.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(v.value0));
                    };
                    if (true) {
                        return control.bind((dictMonadGen.Monad0()).Bind1())(gen)(function (x) {
                            return pure((dictMonadGen.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(new Cons(x, v.value0), v.value1 - 1 | 0)));
                        });
                    };
                    throw new Error("Failed pattern match at Control.Monad.Gen (line 93, column 3 - line 93, column 68): " + [ v.constructor.name ]);
                };
                return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Unfoldable.unfoldr(dictUnfoldable)(unfold))(Control_Monad_Gen_Class.sized(dictMonadGen)((function () {
                    let $53 = Control_Monad_Rec_Class.tailRecM(dictMonadRec)(loopGen);
                    let $54 = Data_Tuple.Tuple.create(Nil.value);
                    return function ($55) {
                        return $53($54($55));
                    };
                })()));
            };
        };
    };
};
let semigroupFreqSemigroup = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return function (pos) {
            let v2 = v(pos);
            if (v2.value0 instanceof Data_Maybe.Just) {
                return v1(v2.value0.value0);
            };
            return v2;
        };
    };
});
let semigroupAtIndex = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return function (i) {
            let $42 = i <= 0;
            if ($42) {
                return v(i);
            };
            return v1(i - 1 | 0);
        };
    };
});
let getFreqVal = function (v) {
    return function ($56) {
        return Data_Tuple.snd(v($56));
    };
};
let getAtIndex = function (v) {
    return v;
};
let freqSemigroup = function (v) {
    return function (pos) {
        let $46 = pos >= v.value0;
        if ($46) {
            return new Data_Tuple.Tuple(new Data_Maybe.Just(pos - v.value0), v.value1);
        };
        return new Data_Tuple.Tuple(Data_Maybe.Nothing.value, v.value1);
    };
};
let frequency = function (dictMonadGen) {
    return function (dictFoldable1) {
        return function (xs) {
            let total = Data_Newtype.alaF(data.functorFn)(data.functorFn)(Data_Newtype.newtypeAdditive)(Data_Newtype.newtypeAdditive)(Data_Monoid_Additive.Additive)(Data_Foldable.foldMap(dictFoldable1.Foldable0())(Data_Monoid_Additive.monoidAdditive(semiringNumber)))(Data_Tuple.fst)(xs);
            return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseFloat(dictMonadGen)(0.0)(total))(getFreqVal(Data_Semigroup_Foldable.foldMap1(dictFoldable1)(semigroupFreqSemigroup)(freqSemigroup)(xs)));
        };
    };
};
let filtered = function (dictMonadRec) {
    return function (dictMonadGen) {
        return function (gen) {
            let go = function (v) {
                return data.mapFlipped((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(gen)(function (a) {
                    if (a instanceof Data_Maybe.Nothing) {
                        return new Control_Monad_Rec_Class.Loop({});
                    };
                    if (a instanceof Data_Maybe.Just) {
                        return new Control_Monad_Rec_Class.Done(a.value0);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Gen (line 117, column 24 - line 119, column 23): " + [ a.constructor.name ]);
                });
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)({});
        };
    };
};
let suchThat = function (dictMonadRec) {
    return function (dictMonadGen) {
        return function (gen) {
            return function (pred) {
                return filtered(dictMonadRec)(dictMonadGen)(data.mapFlipped((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(gen)(function (a) {
                    let $51 = pred(a);
                    if ($51) {
                        return new Data_Maybe.Just(a);
                    };
                    return Data_Maybe.Nothing.value;
                }));
            };
        };
    };
};
let choose = function (dictMonadGen) {
    return function (genA) {
        return function (genB) {
            return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseBool(dictMonadGen))(function (v) {
                if (v) {
                    return genA;
                };
                return genB;
            });
        };
    };
};
let atIndex = function ($57) {
    return AtIndex(data._const($57));
};
let fromIndex = function (dictFoldable1) {
    return function (i) {
        return function (xs) {
            return getAtIndex(Data_Semigroup_Foldable.foldMap1(dictFoldable1)(semigroupAtIndex)(atIndex)(xs))(i);
        };
    };
};
let elements = function (dictMonadGen) {
    return function (dictFoldable1) {
        return function (xs) {
            return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(Data_Foldable.length(dictFoldable1.Foldable0())(semiringInt)(xs) - 1 | 0))(function (n) {
                return pure((dictMonadGen.Monad0()).Applicative0())(fromIndex(dictFoldable1)(n)(xs));
            });
        };
    };
};
let oneOf = function (dictMonadGen) {
    return function (dictFoldable1) {
        return function (xs) {
            return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(Data_Foldable.length(dictFoldable1.Foldable0())(semiringInt)(xs) - 1 | 0))(function (n) {
                return fromIndex(dictFoldable1)(n)(xs);
            });
        };
    };
};

module.exports = {
    choose: choose,
    oneOf: oneOf,
    frequency: frequency,
    elements: elements,
    unfoldable: unfoldable,
    suchThat: suchThat,
    filtered: filtered
};
