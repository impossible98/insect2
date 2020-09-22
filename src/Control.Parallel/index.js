let Control_Parallel_Class = require("../Control.Parallel.Class/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");


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

let parTraverse_ = function (dictParallel) {
    return function (dictFoldable) {
        return function (f) {
            let $17 = Control_Parallel_Class.sequential(dictParallel);
            let $18 = Data_Foldable.traverse_(dictParallel.Applicative1())(dictFoldable)((function () {
                let $20 = Control_Parallel_Class.parallel(dictParallel);
                return function ($21) {
                    return $20(f($21));
                };
            })());
            return function ($19) {
                return $17($18($19));
            };
        };
    };
};
let parTraverse = function (dictParallel) {
    return function (dictTraversable) {
        return function (f) {
            let $22 = Control_Parallel_Class.sequential(dictParallel);
            let $23 = Data_Traversable.traverse(dictTraversable)(dictParallel.Applicative1())((function () {
                let $25 = Control_Parallel_Class.parallel(dictParallel);
                return function ($26) {
                    return $25(f($26));
                };
            })());
            return function ($24) {
                return $22($23($24));
            };
        };
    };
};
let parSequence_ = function (dictParallel) {
    return function (dictFoldable) {
        return parTraverse_(dictParallel)(dictFoldable)(identity(categoryFn));
    };
};
let parSequence = function (dictParallel) {
    return function (dictTraversable) {
        return parTraverse(dictParallel)(dictTraversable)(identity(categoryFn));
    };
};
let parOneOfMap = function (dictParallel) {
    return function (dictAlternative) {
        return function (dictFoldable) {
            return function (dictFunctor) {
                return function (f) {
                    let $27 = Control_Parallel_Class.sequential(dictParallel);
                    let $28 = Data_Foldable.oneOfMap(dictFoldable)(dictAlternative.Plus1())((function () {
                        let $30 = Control_Parallel_Class.parallel(dictParallel);
                        return function ($31) {
                            return $30(f($31));
                        };
                    })());
                    return function ($29) {
                        return $27($28($29));
                    };
                };
            };
        };
    };
};
let parOneOf = function (dictParallel) {
    return function (dictAlternative) {
        return function (dictFoldable) {
            return function (dictFunctor) {
                let $32 = Control_Parallel_Class.sequential(dictParallel);
                let $33 = Data_Foldable.oneOfMap(dictFoldable)(dictAlternative.Plus1())(Control_Parallel_Class.parallel(dictParallel));
                return function ($34) {
                    return $32($33($34));
                };
            };
        };
    };
};
let parApply = function (dictParallel) {
    return function (mf) {
        return function (ma) {
            return Control_Parallel_Class.sequential(dictParallel)(apply((dictParallel.Applicative1()).Apply0())(Control_Parallel_Class.parallel(dictParallel)(mf))(Control_Parallel_Class.parallel(dictParallel)(ma)));
        };
    };
};

module.exports = {
    parApply: parApply,
    parTraverse: parTraverse,
    parTraverse_: parTraverse_,
    parSequence: parSequence,
    parSequence_: parSequence_,
    parOneOf: parOneOf,
    parOneOfMap: parOneOfMap
};
