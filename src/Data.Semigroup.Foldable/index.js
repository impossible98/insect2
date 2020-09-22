let Data_Foldable = require("../Data.Foldable/index.js");

let data = require("../data");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord_Max = require("../Data.Ord.Max/index.js");
let Data_Ord_Min = require("../Data.Ord.Min/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


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
			return apply(dictApply)(data.map(dictApply.Functor0())(data._const(identity(categoryFn)))(a))(b);
		};
	};
};

let JoinWith = function (x) {
    return x;
};
let Act = function (x) {
    return x;
};
let Foldable1 = function (Foldable0, fold1, foldMap1) {
    this.Foldable0 = Foldable0;
    this.fold1 = fold1;
    this.foldMap1 = foldMap1;
};
let semigroupJoinWith = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return JoinWith(function (j) {
                return Data_Semigroup.append(dictSemigroup)(v(j))(Data_Semigroup.append(dictSemigroup)(j)(v1(j)));
            });
        };
    });
};

let semigroupAct = function (dictApply) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return applySecond(dictApply)(v)(v1);
        };
    });
};
let joinee = function (v) {
    return v;
};
let getAct = function (v) {
    return v;
};
let foldMap1 = function (dict) {
    return dict.foldMap1;
};
let intercalateMap = function (dictFoldable1) {
    return function (dictSemigroup) {
        return function (j) {
            return function (f) {
                return function (foldable) {
                    return joinee(foldMap1(dictFoldable1)(semigroupJoinWith(dictSemigroup))(function ($43) {
                        return JoinWith(data._const(f($43)));
                    })(foldable))(j);
                };
            };
        };
    };
};
let intercalate = function (dictFoldable1) {
    return function (dictSemigroup) {
        return data.flip(intercalateMap(dictFoldable1)(dictSemigroup))(identity(categoryFn));
    };
};
let maximum = function (dictOrd) {
    return function (dictFoldable1) {
        return Data_Newtype.ala(data.functorFn)(Data_Ord_Max.newtypeMax)(Data_Ord_Max.newtypeMax)(Data_Ord_Max.Max)(foldMap1(dictFoldable1)(Data_Ord_Max.semigroupMax(dictOrd)));
    };
};
let minimum = function (dictOrd) {
    return function (dictFoldable1) {
        return Data_Newtype.ala(data.functorFn)(Data_Ord_Min.newtypeMin)(Data_Ord_Min.newtypeMin)(Data_Ord_Min.Min)(foldMap1(dictFoldable1)(Data_Ord_Min.semigroupMin(dictOrd)));
    };
};
let traverse1_ = function (dictFoldable1) {
    return function (dictApply) {
        return function (f) {
            return function (t) {
                return data.voidRight(dictApply.Functor0())()(getAct(foldMap1(dictFoldable1)(semigroupAct(dictApply))(function ($44) {
                    return Act(f($44));
                })(t)));
            };
        };
    };
};
let for1_ = function (dictFoldable1) {
    return function (dictApply) {
        return data.flip(traverse1_(dictFoldable1)(dictApply));
    };
};
let sequence1_ = function (dictFoldable1) {
    return function (dictApply) {
        return traverse1_(dictFoldable1)(dictApply)(identity(categoryFn));
    };
};
let fold1Default = function (dictFoldable1) {
    return function (dictSemigroup) {
        return foldMap1(dictFoldable1)(dictSemigroup)(identity(categoryFn));
    };
};
let foldableDual = new Foldable1(function () {
    return Data_Foldable.foldableDual;
}, function (dictSemigroup) {
    return fold1Default(foldableDual)(dictSemigroup);
}, function (dictSemigroup) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
});
let foldableMultiplicative = new Foldable1(function () {
    return Data_Foldable.foldableMultiplicative;
}, function (dictSemigroup) {
    return fold1Default(foldableMultiplicative)(dictSemigroup);
}, function (dictSemigroup) {
    return function (f) {
        return function (v) {
            return f(v);
        };
    };
});
let fold1 = function (dict) {
    return dict.fold1;
};
let foldMap1Default = function (dictFoldable1) {
    return function (dictFunctor) {
        return function (dictSemigroup) {
            return function (f) {
                let $45 = fold1(dictFoldable1)(dictSemigroup);
                let $46 = data.map(dictFunctor)(f);
                return function ($47) {
                    return $45($46($47));
                };
            };
        };
    };
};
module.exports = {
    Foldable1: Foldable1,
    foldMap1: foldMap1,
    fold1: fold1,
    traverse1_: traverse1_,
    for1_: for1_,
    sequence1_: sequence1_,
    foldMap1Default: foldMap1Default,
    fold1Default: fold1Default,
    intercalate: intercalate,
    intercalateMap: intercalateMap,
    maximum: maximum,
    minimum: minimum,
    foldableDual: foldableDual,
    foldableMultiplicative: foldableMultiplicative
};
