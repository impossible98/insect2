const control = require("../control");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

function eqArrayImpl(f) {
	return function (xs) {
		return function (ys) {
			if (xs === ys) return true;
			if (xs.length !== ys.length) return false;
			for (let i = 0; i < xs.length; i++) {
				if (!f(xs[i])(ys[i])) return false;
			}
			return true;
		};
	};
}

function eq(dict) {
	return dict.eq;
}


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let apply = function (dict) {
	return dict.apply;
};

let lift2 = function (dictApply) {
	return function (f) {
		return function (a) {
			return function (b) {
				return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b);
			};
		};
	};
};


let CatQueue = (function () {
    function CatQueue(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    CatQueue.create = function (value0) {
        return function (value1) {
            return new CatQueue(value0, value1);
        };
    };
    return CatQueue;
})();
let unsnoc = function ($copy_v) {
    let $tco_done = false;
    let $tco_result;
    function $tco_loop(v) {
        if (v.value1 instanceof Data_List_Types.Cons) {
            $tco_done = true;
            return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value1.value0, new CatQueue(v.value0, v.value1.value1)));
        };
        if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
            $tco_done = true;
            return Data_Maybe.Nothing.value;
        };
        if (v.value1 instanceof Data_List_Types.Nil) {
            $copy_v = new CatQueue(Data_List_Types.Nil.value, Data_List.reverse(v.value0));
            return;
        };
        throw new Error("Failed pattern match at Data.CatQueue (line 93, column 1 - line 93, column 63): " + [ v.constructor.name ]);
    };
    while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
    };
    return $tco_result;
};
let uncons = function ($copy_v) {
    let $tco_done = false;
    let $tco_result;
    function $tco_loop(v) {
        if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
            $tco_done = true;
            return Data_Maybe.Nothing.value;
        };
        if (v.value0 instanceof Data_List_Types.Nil) {
            $copy_v = new CatQueue(Data_List.reverse(v.value1), Data_List_Types.Nil.value);
            return;
        };
        if (v.value0 instanceof Data_List_Types.Cons) {
            $tco_done = true;
            return new Data_Maybe.Just(new Data_Tuple.Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
        };
        throw new Error("Failed pattern match at Data.CatQueue (line 83, column 1 - line 83, column 63): " + [ v.constructor.name ]);
    };
    while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
    };
    return $tco_result;
};
let snoc = function (v) {
    return function (a) {
        return new CatQueue(v.value0, new Data_List_Types.Cons(a, v.value1));
    };
};
let showCatQueue = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(CatQueue " + (Data_Show.show(Data_List_Types.showList(dictShow))(v.value0) + (" " + (Data_Show.show(Data_List_Types.showList(dictShow))(v.value1) + ")")));
    });
};
let $$null = function (v) {
    if (v.value0 instanceof Data_List_Types.Nil && v.value1 instanceof Data_List_Types.Nil) {
        return true;
    };
    return false;
};
let length = function (v) {
    return Data_List.length(v.value0) + Data_List.length(v.value1) | 0;
};
let functorCatQueue = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new CatQueue(Data_Functor.map(Data_List_Types.functorList)(f)(v.value0), Data_Functor.map(Data_List_Types.functorList)(f)(v.value1));
    };
});
let foldableCatQueue = new Data_Foldable.Foldable(function (dictMonoid) {
    return Data_Foldable.foldMapDefaultL(foldableCatQueue)(dictMonoid);
}, function (f) {
    let go = function ($copy_acc) {
        return function ($copy_q) {
            let $tco_var_acc = $copy_acc;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(acc, q) {
                let v = uncons(q);
                if (v instanceof Data_Maybe.Just) {
                    $tco_var_acc = f(acc)(v.value0.value0);
                    $copy_q = v.value0.value1;
                    return;
                };
                if (v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return acc;
                };
                throw new Error("Failed pattern match at Data.CatQueue (line 148, column 16 - line 150, column 22): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $copy_q);
            };
            return $tco_result;
        };
    };
    return go;
}, function (f) {
    return Data_Foldable.foldrDefault(foldableCatQueue)(f);
});
let semigroupCatQueue = new Data_Semigroup.Semigroup(Data_Foldable.foldl(foldableCatQueue)(snoc));
let empty = new CatQueue(Data_List_Types.Nil.value, Data_List_Types.Nil.value);
let monoidCatQueue = new Data_Monoid.Monoid(function () {
    return semigroupCatQueue;
}, empty);
let singleton = snoc(empty);
let fromFoldable = function (dictFoldable) {
    return function (f) {
        return Data_Foldable.foldMap(dictFoldable)(monoidCatQueue)(singleton)(f);
    };
};
let traversableCatQueue = new Data_Traversable.Traversable(function () {
    return foldableCatQueue;
}, function () {
    return functorCatQueue;
}, function (dictApplicative) {
    return Data_Traversable.sequenceDefault(traversableCatQueue)(dictApplicative);
}, function (dictApplicative) {
    return function (f) {
        let $100 = Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Foldable.foldl(foldableCatQueue)(snoc)(empty));
        let $101 = Data_Foldable.foldl(foldableCatQueue)(function (acc) {
            let $103 = lift2(dictApplicative.Apply0())(snoc)(acc);
            return function ($104) {
                return $103(f($104));
            };
        })(control.pure(dictApplicative)(empty));
        return function ($102) {
            return $100($101($102));
        };
    };
});
let unfoldable1CatQueue = new Data_Unfoldable1.Unfoldable1(function (f) {
    return function (b) {
        let go = function ($copy_source) {
            return function ($copy_memo) {
                let $tco_var_source = $copy_source;
                let $tco_done = false;
                let $tco_result;
                function $tco_loop(source, memo) {
                    let v = f(source);
                    if (v.value1 instanceof Data_Maybe.Nothing) {
                        $tco_done = true;
                        return snoc(memo)(v.value0);
                    };
                    if (v.value1 instanceof Data_Maybe.Just) {
                        $tco_var_source = v.value1.value0;
                        $copy_memo = snoc(memo)(v.value0);
                        return;
                    };
                    throw new Error("Failed pattern match at Data.CatQueue (line 155, column 24 - line 157, column 57): " + [ v.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_source, $copy_memo);
                };
                return $tco_result;
            };
        };
        return go(b)(empty);
    };
});
let unfoldableCatQueue = new Data_Unfoldable.Unfoldable(function () {
    return unfoldable1CatQueue;
}, function (f) {
    return function (b) {
        let go = function ($copy_source) {
            return function ($copy_memo) {
                let $tco_var_source = $copy_source;
                let $tco_done = false;
                let $tco_result;
                function $tco_loop(source, memo) {
                    let v = f(source);
                    if (v instanceof Data_Maybe.Nothing) {
                        $tco_done = true;
                        return memo;
                    };
                    if (v instanceof Data_Maybe.Just) {
                        $tco_var_source = v.value0.value1;
                        $copy_memo = snoc(memo)(v.value0.value0);
                        return;
                    };
                    throw new Error("Failed pattern match at Data.CatQueue (line 162, column 24 - line 164, column 57): " + [ v.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_source, $copy_memo);
                };
                return $tco_result;
            };
        };
        return go(b)(empty);
    };
});
let cqEq = function (dictEq) {
    let elemEq = eq(dictEq);
    let go = function ($copy_xs) {
        return function ($copy_ys) {
            let $tco_var_xs = $copy_xs;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(xs, ys) {
                let v = uncons(ys);
                let v1 = uncons(xs);
                if (v1 instanceof Data_Maybe.Just && (v instanceof Data_Maybe.Just && elemEq(v1.value0.value0)(v.value0.value0))) {
                    $tco_var_xs = v1.value0.value1;
                    $copy_ys = v.value0.value1;
                    return;
                };
                if (v1 instanceof Data_Maybe.Nothing && v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return true;
                };
                $tco_done = true;
                return false;
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            };
            return $tco_result;
        };
    };
    return go;
};
let eqCatQueue = function (dictEq) {
    return new Eq(cqEq(dictEq));
};
let cqCompare = function (dictOrd) {
    let elemCompare = Data_Ord.compare(dictOrd);
    let go = function ($copy_xs) {
        return function ($copy_ys) {
            let $tco_var_xs = $copy_xs;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(xs, ys) {
                let v = uncons(ys);
                let v1 = uncons(xs);
                if (v1 instanceof Data_Maybe.Just && v instanceof Data_Maybe.Just) {
                    let v2 = elemCompare(v1.value0.value0)(v.value0.value0);
                    if (v2 instanceof Data_Ordering.EQ) {
                        $tco_var_xs = v1.value0.value1;
                        $copy_ys = v.value0.value1;
                        return;
                    };
                    $tco_done = true;
                    return v2;
                };
                if (v1 instanceof Data_Maybe.Just && v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return Data_Ordering.GT.value;
                };
                if (v1 instanceof Data_Maybe.Nothing && v instanceof Data_Maybe.Just) {
                    $tco_done = true;
                    return Data_Ordering.LT.value;
                };
                if (v1 instanceof Data_Maybe.Nothing && v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return Data_Ordering.EQ.value;
                };
                throw new Error("Failed pattern match at Data.CatQueue (line 118, column 16 - line 125, column 30): " + [ v1.constructor.name, v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            };
            return $tco_result;
        };
    };
    return go;
};
let ordCatQueue = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqCatQueue(dictOrd.Eq0());
    }, cqCompare(dictOrd));
};
let cons = function (a) {
    return function (v) {
        return new CatQueue(new Data_List_Types.Cons(a, v.value0), v.value1);
    };
};
let monadCatQueue = new control.Monad(function () {
    return applicativeCatQueue;
}, function () {
    return bindCatQueue;
});
let bindCatQueue = new control.Bind(function () {
    return applyCatQueue;
}, Data_Functor.flip(Data_Foldable.foldMap(foldableCatQueue)(monoidCatQueue)));
let applyCatQueue = new Apply(function () {
    return functorCatQueue;
}, control.ap(monadCatQueue));
let applicativeCatQueue = new control.Applicative(function () {
    return applyCatQueue;
}, singleton);
let altCatQueue = new Alt(function () {
    return functorCatQueue;
}, Data_Semigroup.append(semigroupCatQueue));
let plusCatQueue = new control.Plus(function () {
    return altCatQueue;
}, empty);
let alternativeCatQueue = new Control_Alternative.Alternative(function () {
    return applicativeCatQueue;
}, function () {
    return plusCatQueue;
});
let monadZeroCatQueue = new Control_MonadZero.MonadZero(function () {
    return alternativeCatQueue;
}, function () {
    return monadCatQueue;
});
let monadPlusCatQueue = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroCatQueue;
});
module.exports = {
    CatQueue: CatQueue,
    empty: empty,
    "null": $$null,
    singleton: singleton,
    length: length,
    cons: cons,
    snoc: snoc,
    uncons: uncons,
    unsnoc: unsnoc,
    fromFoldable: fromFoldable,
    eqCatQueue: eqCatQueue,
    ordCatQueue: ordCatQueue,
    semigroupCatQueue: semigroupCatQueue,
    monoidCatQueue: monoidCatQueue,
    showCatQueue: showCatQueue,
    foldableCatQueue: foldableCatQueue,
    unfoldable1CatQueue: unfoldable1CatQueue,
    unfoldableCatQueue: unfoldableCatQueue,
    traversableCatQueue: traversableCatQueue,
    functorCatQueue: functorCatQueue,
    applyCatQueue: applyCatQueue,
    applicativeCatQueue: applicativeCatQueue,
    bindCatQueue: bindCatQueue,
    monadCatQueue: monadCatQueue,
    altCatQueue: altCatQueue,
    plusCatQueue: plusCatQueue,
    alternativeCatQueue: alternativeCatQueue,
    monadZeroCatQueue: monadZeroCatQueue,
    monadPlusCatQueue: monadPlusCatQueue
};
