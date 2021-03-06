const control = require('../control');
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");

let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Lazy = require("../Data.Lazy/index.js");
let Data_List_Lazy_Types = require("../Data.List.Lazy.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");


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

function alt(dict) {
	return dict.alt;
}

let Pattern = function (x) {
    return x;
};
let zipWith = function (f) {
    return function (xs) {
        return function (ys) {
            let go = function (v) {
                return function (v1) {
                    if (v instanceof Data_List_Lazy_Types.Nil) {
                        return Data_List_Lazy_Types.Nil.value;
                    };
                    if (v1 instanceof Data_List_Lazy_Types.Nil) {
                        return Data_List_Lazy_Types.Nil.value;
                    };
                    if (v instanceof Data_List_Lazy_Types.Cons && v1 instanceof Data_List_Lazy_Types.Cons) {
                        return new Data_List_Lazy_Types.Cons(f(v.value0)(v1.value0), zipWith(f)(v.value1)(v1.value1));
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy (line 693, column 3 - line 693, column 35): " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return apply(Data_Lazy.applyLazy)(data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs)))(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(ys));
        };
    };
};
let zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_List_Lazy_Types.traversableList)(dictApplicative)(zipWith(f)(xs)(ys));
            };
        };
    };
};
let zip = zipWith(Data_Tuple.Tuple.create);
let updateAt = function (n) {
    return function (x) {
        return function (xs) {
            let go = function (v) {
                return function (v1) {
                    if (v1 instanceof Data_List_Lazy_Types.Nil) {
                        return Data_List_Lazy_Types.Nil.value;
                    };
                    if (v === 0 && v1 instanceof Data_List_Lazy_Types.Cons) {
                        return new Data_List_Lazy_Types.Cons(x, v1.value1);
                    };
                    if (v1 instanceof Data_List_Lazy_Types.Cons) {
                        return new Data_List_Lazy_Types.Cons(v1.value0, updateAt(v - 1 | 0)(x)(v1.value1));
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy (line 367, column 3 - line 367, column 17): " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return data.map(Data_Lazy.functorLazy)(go(n))(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
        };
    };
};
let unzip = Data_Foldable.foldr(Data_List_Lazy_Types.foldableList)(function (v) {
    return function (v1) {
        return new Data_Tuple.Tuple(Data_List_Lazy_Types.cons(v.value0)(v1.value0), Data_List_Lazy_Types.cons(v.value1)(v1.value1));
    };
})(new Data_Tuple.Tuple(Data_List_Lazy_Types.nil, Data_List_Lazy_Types.nil));
let uncons = function (xs) {
    let v = Data_List_Lazy_Types.step(xs);
    if (v instanceof Data_List_Lazy_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Lazy_Types.Cons) {
        return new Data_Maybe.Just({
            head: v.value0,
            tail: v.value1
        });
    };
    throw new Error("Failed pattern match at Data.List.Lazy (line 285, column 13 - line 287, column 44): " + [ v.constructor.name ]);
};
let toUnfoldable = function (dictUnfoldable) {
    return Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
        return data.map(Data_Maybe.functorMaybe)(function (rec) {
            return new Data_Tuple.Tuple(rec.head, rec.tail);
        })(uncons(xs));
    });
};
let takeWhile = function (p) {
    let go = function (v) {
        if (v instanceof Data_List_Lazy_Types.Cons && p(v.value0)) {
            return new Data_List_Lazy_Types.Cons(v.value0, takeWhile(p)(v.value1));
        };
        return Data_List_Lazy_Types.Nil.value;
    };
    let $239 = data.map(Data_Lazy.functorLazy)(go);
    let $240 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($241) {
        return Data_List_Lazy_Types.List($239($240($241)));
    };
};
let take = function (n) {
    let go = function (v) {
        return function (v1) {
            if (v1 instanceof Data_List_Lazy_Types.Nil) {
                return Data_List_Lazy_Types.Nil.value;
            };
            if (v1 instanceof Data_List_Lazy_Types.Cons) {
                return new Data_List_Lazy_Types.Cons(v1.value0, take(v - 1 | 0)(v1.value1));
            };
            throw new Error("Failed pattern match at Data.List.Lazy (line 517, column 3 - line 517, column 32): " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
    let $119 = n <= 0;
    if ($119) {
        return data._const(Data_List_Lazy_Types.nil);
    };
    let $242 = data.map(Data_Lazy.functorLazy)(go(n));
    let $243 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($244) {
        return Data_List_Lazy_Types.List($242($243($244)));
    };
};
let tail = function (xs) {
    return data.map(Data_Maybe.functorMaybe)(function (v) {
        return v.tail;
    })(uncons(xs));
};
let stripPrefix = function (dictEq) {
    return function (v) {
        return function (s) {
            let go = function (prefix) {
                return function (input) {
                    let v1 = Data_List_Lazy_Types.step(prefix);
                    if (v1 instanceof Data_List_Lazy_Types.Nil) {
                        return Data_Maybe.Just.create(new Control_Monad_Rec_Class.Done(input));
                    };
                    if (v1 instanceof Data_List_Lazy_Types.Cons) {
                        let v2 = Data_List_Lazy_Types.step(input);
                        if (v2 instanceof Data_List_Lazy_Types.Cons && data.eq(dictEq)(v1.value0)(v2.value0)) {
                            return Data_Maybe.Just.create(new Control_Monad_Rec_Class.Loop({
                                a: v1.value1,
                                b: v2.value1
                            }));
                        };
                        return Data_Maybe.Nothing.value;
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy (line 499, column 21 - line 503, column 19): " + [ v1.constructor.name ]);
                };
            };
            return Control_Monad_Rec_Class.tailRecM2(Control_Monad_Rec_Class.monadRecMaybe)(go)(v)(s);
        };
    };
};
let span = function (p) {
    return function (xs) {
        let v = uncons(xs);
        if (v instanceof Data_Maybe.Just && p(v.value0.head)) {
            let v1 = span(p)(v.value0.tail);
            return {
                init: Data_List_Lazy_Types.cons(v.value0.head)(v1.init),
                rest: v1.rest
            };
        };
        return {
            init: Data_List_Lazy_Types.nil,
            rest: xs
        };
    };
};
let snoc = function (xs) {
    return function (x) {
        return Data_Foldable.foldr(Data_List_Lazy_Types.foldableList)(Data_List_Lazy_Types.cons)(Data_List_Lazy_Types.cons(x)(Data_List_Lazy_Types.nil))(xs);
    };
};
let singleton = function (a) {
    return Data_List_Lazy_Types.cons(a)(Data_List_Lazy_Types.nil);
};
let showPattern = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Pattern " + (Data_Show.show(Data_List_Lazy_Types.showList(dictShow))(v) + ")");
    });
};
let scanrLazy = function (f) {
    return function (acc) {
        return function (xs) {
            let go = function (v) {
                if (v instanceof Data_List_Lazy_Types.Nil) {
                    return Data_List_Lazy_Types.Nil.value;
                };
                if (v instanceof Data_List_Lazy_Types.Cons) {
                    let acc$prime = f(v.value0)(acc);
                    return Data_List_Lazy_Types.Cons.create(acc$prime)(scanrLazy(f)(acc$prime)(v.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 764, column 5 - line 764, column 27): " + [ v.constructor.name ]);
            };
            return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
        };
    };
};
let reverse = function (xs) {
    return control.defer(Data_List_Lazy_Types.lazyList)(function (v) {
        return Data_Foldable.foldl(Data_List_Lazy_Types.foldableList)(data.flip(Data_List_Lazy_Types.cons))(Data_List_Lazy_Types.nil)(xs);
    });
};
let replicateM = function (dictMonad) {
    return function (n) {
        return function (m) {
            if (n < 1) {
                return control.pure(dictMonad.Applicative0())(Data_List_Lazy_Types.nil);
            };
            if (true) {
                return control.bind(dictMonad.Bind1())(m)(function (a) {
                    return control.bind(dictMonad.Bind1())(replicateM(dictMonad)(n - 1 | 0)(m))(function (as) {
                        return control.pure(dictMonad.Applicative0())(Data_List_Lazy_Types.cons(a)(as));
                    });
                });
            };
            throw new Error("Failed pattern match at Data.List.Lazy (line 161, column 1 - line 161, column 62): " + [ n.constructor.name, m.constructor.name ]);
        };
    };
};
let repeat = function (x) {
    return control.fix(Data_List_Lazy_Types.lazyList)(function (xs) {
        return Data_List_Lazy_Types.cons(x)(xs);
    });
};
let replicate = function (i) {
    return function (xs) {
        return take(i)(repeat(xs));
    };
};
let range = function (start) {
    return function (end) {
        if (start > end) {
            let g = function (x) {
                if (x >= end) {
                    return new Data_Maybe.Just(new Data_Tuple.Tuple(x, x - 1 | 0));
                };
                if (true) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 148, column 13 - line 149, column 38): " + [ x.constructor.name ]);
            };
            return Data_Unfoldable.unfoldr(Data_List_Lazy_Types.unfoldableList)(g)(start);
        };
        if (true) {
            let f = function (x) {
                if (x <= end) {
                    return new Data_Maybe.Just(new Data_Tuple.Tuple(x, x + 1 | 0));
                };
                if (true) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 153, column 5 - line 154, column 30): " + [ x.constructor.name ]);
            };
            return Data_Unfoldable.unfoldr(Data_List_Lazy_Types.unfoldableList)(f)(start);
        };
        throw new Error("Failed pattern match at Data.List.Lazy (line 145, column 1 - line 145, column 32): " + [ start.constructor.name, end.constructor.name ]);
    };
};
let partition = function (f) {
    let go = function (x) {
        return function (v) {
            let $147 = f(x);
            if ($147) {
                return {
                    yes: Data_List_Lazy_Types.cons(x)(v.yes),
                    no: v.no
                };
            };
            return {
                yes: v.yes,
                no: Data_List_Lazy_Types.cons(x)(v.no)
            };
        };
    };
    return Data_Foldable.foldr(Data_List_Lazy_Types.foldableList)(go)({
        yes: Data_List_Lazy_Types.nil,
        no: Data_List_Lazy_Types.nil
    });
};
let $$null = function ($245) {
    return Data_Maybe.isNothing(uncons($245));
};
let newtypePattern = new Data_Newtype.Newtype(function (n) {
    return n;
}, Pattern);
let mapMaybe = function (f) {
    let go = function ($copy_v) {
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(v) {
            if (v instanceof Data_List_Lazy_Types.Nil) {
                $tco_done = true;
                return Data_List_Lazy_Types.Nil.value;
            };
            if (v instanceof Data_List_Lazy_Types.Cons) {
                let v1 = f(v.value0);
                if (v1 instanceof Data_Maybe.Nothing) {
                    $copy_v = Data_List_Lazy_Types.step(v.value1);
                    return;
                };
                if (v1 instanceof Data_Maybe.Just) {
                    $tco_done = true;
                    return new Data_List_Lazy_Types.Cons(v1.value0, mapMaybe(f)(v.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 460, column 5 - line 462, column 39): " + [ v1.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.List.Lazy (line 458, column 3 - line 458, column 15): " + [ v.constructor.name ]);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    let $246 = data.map(Data_Lazy.functorLazy)(go);
    let $247 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($248) {
        return Data_List_Lazy_Types.List($246($247($248)));
    };
};
let some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return apply((dictAlternative.Applicative0()).Apply0())(data.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Data_List_Lazy_Types.cons)(v))(control.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
let many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return alt((dictAlternative.Plus1()).Alt0())(some(dictAlternative)(dictLazy)(v))(control.pure(dictAlternative.Applicative0())(Data_List_Lazy_Types.nil));
        };
    };
};
let length = Data_Foldable.foldl(Data_List_Lazy_Types.foldableList)(function (l) {
    return function (v) {
        return l + 1 | 0;
    };
})(0);
let last = (function () {
    let go = function ($copy_v) {
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(v) {
            if (v instanceof Data_List_Lazy_Types.Cons) {
                if ($$null(v.value1)) {
                    $tco_done = true;
                    return new Data_Maybe.Just(v.value0);
                };
                if (true) {
                    $copy_v = Data_List_Lazy_Types.step(v.value1);
                    return;
                };
            };
            $tco_done = true;
            return Data_Maybe.Nothing.value;
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    return function ($249) {
        return go(Data_List_Lazy_Types.step($249));
    };
})();
let iterate = function (f) {
    return function (x) {
        return control.fix(Data_List_Lazy_Types.lazyList)(function (xs) {
            return Data_List_Lazy_Types.cons(x)(data.map(Data_List_Lazy_Types.functorList)(f)(xs));
        });
    };
};
let insertAt = function (v) {
    return function (x) {
        return function (xs) {
            if (v === 0) {
                return Data_List_Lazy_Types.cons(x)(xs);
            };
            let go = function (v1) {
                if (v1 instanceof Data_List_Lazy_Types.Nil) {
                    return new Data_List_Lazy_Types.Cons(x, Data_List_Lazy_Types.nil);
                };
                if (v1 instanceof Data_List_Lazy_Types.Cons) {
                    return new Data_List_Lazy_Types.Cons(v1.value0, insertAt(v - 1 | 0)(x)(v1.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 340, column 3 - line 340, column 22): " + [ v1.constructor.name ]);
            };
            return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
        };
    };
};
let init = (function () {
    let go = function (v) {
        if (v instanceof Data_List_Lazy_Types.Cons) {
            if ($$null(v.value1)) {
                return new Data_Maybe.Just(Data_List_Lazy_Types.nil);
            };
            if (true) {
                return data.map(Data_Maybe.functorMaybe)(Data_List_Lazy_Types.cons(v.value0))(go(Data_List_Lazy_Types.step(v.value1)));
            };
        };
        return Data_Maybe.Nothing.value;
    };
    return function ($250) {
        return go(Data_List_Lazy_Types.step($250));
    };
})();
let index = function (xs) {
    let go = function ($copy_v) {
        return function ($copy_v1) {
            let $tco_var_v = $copy_v;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v, v1) {
                if (v instanceof Data_List_Lazy_Types.Nil) {
                    $tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Data_List_Lazy_Types.Cons && v1 === 0) {
                    $tco_done = true;
                    return new Data_Maybe.Just(v.value0);
                };
                if (v instanceof Data_List_Lazy_Types.Cons) {
                    $tco_var_v = Data_List_Lazy_Types.step(v.value1);
                    $copy_v1 = v1 - 1 | 0;
                    return;
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 299, column 3 - line 299, column 21): " + [ v.constructor.name, v1.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
            };
            return $tco_result;
        };
    };
    return go(Data_List_Lazy_Types.step(xs));
};
let head = function (xs) {
    return data.map(Data_Maybe.functorMaybe)(function (v) {
        return v.head;
    })(uncons(xs));
};
let transpose = function (xs) {
    let v = uncons(xs);
    if (v instanceof Data_Maybe.Nothing) {
        return xs;
    };
    if (v instanceof Data_Maybe.Just) {
        let v1 = uncons(v.value0.head);
        if (v1 instanceof Data_Maybe.Nothing) {
            return transpose(v.value0.tail);
        };
        if (v1 instanceof Data_Maybe.Just) {
            return Data_List_Lazy_Types.cons(Data_List_Lazy_Types.cons(v1.value0.head)(mapMaybe(head)(v.value0.tail)))(transpose(Data_List_Lazy_Types.cons(v1.value0.tail)(mapMaybe(tail)(v.value0.tail))));
        };
        throw new Error("Failed pattern match at Data.List.Lazy (line 734, column 7 - line 738, column 72): " + [ v1.constructor.name ]);
    };
    throw new Error("Failed pattern match at Data.List.Lazy (line 730, column 3 - line 738, column 72): " + [ v.constructor.name ]);
};
let groupBy = function (eq) {
    let go = function (v) {
        if (v instanceof Data_List_Lazy_Types.Nil) {
            return Data_List_Lazy_Types.Nil.value;
        };
        if (v instanceof Data_List_Lazy_Types.Cons) {
            let v1 = span(eq(v.value0))(v.value1);
            return new Data_List_Lazy_Types.Cons(Data_Lazy.defer(function (v2) {
                return new Data_NonEmpty.NonEmpty(v.value0, v1.init);
            }), groupBy(eq)(v1.rest));
        };
        throw new Error("Failed pattern match at Data.List.Lazy (line 588, column 3 - line 588, column 15): " + [ v.constructor.name ]);
    };
    let $251 = data.map(Data_Lazy.functorLazy)(go);
    let $252 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($253) {
        return Data_List_Lazy_Types.List($251($252($253)));
    };
};
let group = function (dictEq) {
    return groupBy(data.eq(dictEq));
};
let fromStep = (function () {
    let $254 = control.pure(Data_Lazy.applicativeLazy);
    return function ($255) {
        return Data_List_Lazy_Types.List($254($255));
    };
})();
let insertBy = function (cmp) {
    return function (x) {
        return function (xs) {
            let go = function (v) {
                if (v instanceof Data_List_Lazy_Types.Nil) {
                    return new Data_List_Lazy_Types.Cons(x, Data_List_Lazy_Types.nil);
                };
                if (v instanceof Data_List_Lazy_Types.Cons) {
                    let v1 = cmp(x)(v.value0);
                    if (v1 instanceof Data_Ordering.GT) {
                        return new Data_List_Lazy_Types.Cons(v.value0, insertBy(cmp)(x)(v.value1));
                    };
                    return new Data_List_Lazy_Types.Cons(x, fromStep(v));
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 235, column 3 - line 235, column 22): " + [ v.constructor.name ]);
            };
            return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
        };
    };
};
let insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
let fromFoldable = function (dictFoldable) {
    return Data_Foldable.foldr(dictFoldable)(Data_List_Lazy_Types.cons)(Data_List_Lazy_Types.nil);
};
let foldrLazy = function (dictLazy) {
    return function (op) {
        return function (z) {
            let go = function (xs) {
                let v = Data_List_Lazy_Types.step(xs);
                if (v instanceof Data_List_Lazy_Types.Cons) {
                    return control.defer(dictLazy)(function (v1) {
                        return op(v.value0)(go(v.value1));
                    });
                };
                if (v instanceof Data_List_Lazy_Types.Nil) {
                    return z;
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 756, column 13 - line 758, column 15): " + [ v.constructor.name ]);
            };
            return go;
        };
    };
};
let foldM = function (dictMonad) {
    return function (f) {
        return function (a) {
            return function (xs) {
                let v = uncons(xs);
                if (v instanceof Data_Maybe.Nothing) {
                    return control.pure(dictMonad.Applicative0())(a);
                };
                if (v instanceof Data_Maybe.Just) {
                    return control.bind(dictMonad.Bind1())(f(a)(v.value0.head))(function (a$prime) {
                        return foldM(dictMonad)(f)(a$prime)(v.value0.tail);
                    });
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 747, column 5 - line 750, column 54): " + [ v.constructor.name ]);
            };
        };
    };
};
let findIndex = function (fn) {
    let go = function (n) {
        return function (list) {
            return control.bind(Data_Maybe.bindMaybe)(uncons(list))(function (o) {
                let $199 = fn(o.head);
                if ($199) {
                    return control.pure(Data_Maybe.applicativeMaybe)(n);
                };
                return go(n + 1 | 0)(o.tail);
            });
        };
    };
    return go(0);
};
let findLastIndex = function (fn) {
    return function (xs) {
        return data.map(Data_Maybe.functorMaybe)(function (v) {
            return (length(xs) - 1 | 0) - v | 0;
        })(findIndex(fn)(reverse(xs)));
    };
};
let filterM = function (dictMonad) {
    return function (p) {
        return function (list) {
            let v = uncons(list);
            if (v instanceof Data_Maybe.Nothing) {
                return control.pure(dictMonad.Applicative0())(Data_List_Lazy_Types.nil);
            };
            if (v instanceof Data_Maybe.Just) {
                return control.bind(dictMonad.Bind1())(p(v.value0.head))(function (b) {
                    return control.bind(dictMonad.Bind1())(filterM(dictMonad)(p)(v.value0.tail))(function (xs$prime) {
                        return control.pure(dictMonad.Applicative0())((function () {
                            if (b) {
                                return Data_List_Lazy_Types.cons(v.value0.head)(xs$prime);
                            };
                            return xs$prime;
                        })());
                    });
                });
            };
            throw new Error("Failed pattern match at Data.List.Lazy (line 443, column 5 - line 448, column 48): " + [ v.constructor.name ]);
        };
    };
};
let filter = function (p) {
    let go = function ($copy_v) {
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(v) {
            if (v instanceof Data_List_Lazy_Types.Nil) {
                $tco_done = true;
                return Data_List_Lazy_Types.Nil.value;
            };
            if (v instanceof Data_List_Lazy_Types.Cons) {
                if (p(v.value0)) {
                    $tco_done = true;
                    return new Data_List_Lazy_Types.Cons(v.value0, filter(p)(v.value1));
                };
                if (true) {
                    $copy_v = Data_List_Lazy_Types.step(v.value1);
                    return;
                };
            };
            throw new Error("Failed pattern match at Data.List.Lazy (line 428, column 3 - line 428, column 15): " + [ v.constructor.name ]);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    let $256 = data.map(Data_Lazy.functorLazy)(go);
    let $257 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($258) {
        return Data_List_Lazy_Types.List($256($257($258)));
    };
};
let intersectBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return filter(function (x) {
                return Data_Foldable.any(Data_List_Lazy_Types.foldableList)(Data_HeytingAlgebra.heytingAlgebraBoolean)(eq(x))(ys);
            })(xs);
        };
    };
};
let intersect = function (dictEq) {
    return intersectBy(data.eq(dictEq));
};
let nubBy = function (eq) {
    let go = function (v) {
        if (v instanceof Data_List_Lazy_Types.Nil) {
            return Data_List_Lazy_Types.Nil.value;
        };
        if (v instanceof Data_List_Lazy_Types.Cons) {
            return new Data_List_Lazy_Types.Cons(v.value0, nubBy(eq)(filter(function (y) {
                return !eq(v.value0)(y);
            })(v.value1)));
        };
        throw new Error("Failed pattern match at Data.List.Lazy (line 621, column 3 - line 621, column 15): " + [ v.constructor.name ]);
    };
    let $259 = data.map(Data_Lazy.functorLazy)(go);
    let $260 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($261) {
        return Data_List_Lazy_Types.List($259($260($261)));
    };
};
let nub = function (dictEq) {
    return nubBy(data.eq(dictEq));
};
let eqPattern = function (dictEq) {
    return new data.Eq(function (x) {
        return function (y) {
            return data.eq(Data_List_Lazy_Types.eqList(dictEq))(x)(y);
        };
    });
};
let ordPattern = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqPattern(dictOrd.Eq0());
    }, function (x) {
        return function (y) {
            return Data_Ord.compare(Data_List_Lazy_Types.ordList(dictOrd))(x)(y);
        };
    });
};
let elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return data.eq(dictEq)(v)(x);
        });
    };
};
let elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return data.eq(dictEq)(v)(x);
        });
    };
};
let dropWhile = function (p) {
    let go = function ($copy_v) {
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(v) {
            if (v instanceof Data_List_Lazy_Types.Cons && p(v.value0)) {
                $copy_v = Data_List_Lazy_Types.step(v.value1);
                return;
            };
            $tco_done = true;
            return fromStep(v);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    return function ($262) {
        return go(Data_List_Lazy_Types.step($262));
    };
};
let drop = function (n) {
    let go = function ($copy_v) {
        return function ($copy_v1) {
            let $tco_var_v = $copy_v;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v, v1) {
                if (v === 0) {
                    $tco_done = true;
                    return v1;
                };
                if (v1 instanceof Data_List_Lazy_Types.Nil) {
                    $tco_done = true;
                    return Data_List_Lazy_Types.Nil.value;
                };
                if (v1 instanceof Data_List_Lazy_Types.Cons) {
                    $tco_var_v = v - 1 | 0;
                    $copy_v1 = Data_List_Lazy_Types.step(v1.value1);
                    return;
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 536, column 3 - line 536, column 15): " + [ v.constructor.name, v1.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
            };
            return $tco_result;
        };
    };
    let $263 = data.map(Data_Lazy.functorLazy)(go(n));
    let $264 = Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList);
    return function ($265) {
        return Data_List_Lazy_Types.List($263($264($265)));
    };
};
let slice = function (start) {
    return function (end) {
        return function (xs) {
            return take(end - start | 0)(drop(start)(xs));
        };
    };
};
let deleteBy = function (eq) {
    return function (x) {
        return function (xs) {
            let go = function (v) {
                if (v instanceof Data_List_Lazy_Types.Nil) {
                    return Data_List_Lazy_Types.Nil.value;
                };
                if (v instanceof Data_List_Lazy_Types.Cons) {
                    if (eq(x)(v.value0)) {
                        return Data_List_Lazy_Types.step(v.value1);
                    };
                    if (true) {
                        return new Data_List_Lazy_Types.Cons(v.value0, deleteBy(eq)(x)(v.value1));
                    };
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 650, column 3 - line 650, column 15): " + [ v.constructor.name ]);
            };
            return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
        };
    };
};
let unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_List_Lazy_Types.semigroupList)(xs)(Data_Foldable.foldl(Data_List_Lazy_Types.foldableList)(data.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
        };
    };
};
let union = function (dictEq) {
    return unionBy(data.eq(dictEq));
};
let deleteAt = function (n) {
    return function (xs) {
        let go = function (v) {
            return function (v1) {
                if (v1 instanceof Data_List_Lazy_Types.Nil) {
                    return Data_List_Lazy_Types.Nil.value;
                };
                if (v === 0 && v1 instanceof Data_List_Lazy_Types.Cons) {
                    return Data_List_Lazy_Types.step(v1.value1);
                };
                if (v1 instanceof Data_List_Lazy_Types.Cons) {
                    return new Data_List_Lazy_Types.Cons(v1.value0, deleteAt(v - 1 | 0)(v1.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy (line 353, column 3 - line 353, column 17): " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
        return data.map(Data_Lazy.functorLazy)(go(n))(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
    };
};
let $$delete = function (dictEq) {
    return deleteBy(data.eq(dictEq));
};
let difference = function (dictEq) {
    return Data_Foldable.foldl(Data_List_Lazy_Types.foldableList)(data.flip($$delete(dictEq)));
};
let cycle = function (xs) {
    return control.fix(Data_List_Lazy_Types.lazyList)(function (ys) {
        return Data_Semigroup.append(Data_List_Lazy_Types.semigroupList)(xs)(ys);
    });
};
let concatMap = data.flip(control.bind(Data_List_Lazy_Types.bindList));
let concat = function (v) {
    return control.bind(Data_List_Lazy_Types.bindList)(v)(identity(categoryFn));
};
let catMaybes = mapMaybe(identity(categoryFn));
let alterAt = function (n) {
    return function (f) {
        return function (xs) {
            let go = function (v) {
                return function (v1) {
                    if (v1 instanceof Data_List_Lazy_Types.Nil) {
                        return Data_List_Lazy_Types.Nil.value;
                    };
                    if (v === 0 && v1 instanceof Data_List_Lazy_Types.Cons) {
                        let v2 = f(v1.value0);
                        if (v2 instanceof Data_Maybe.Nothing) {
                            return Data_List_Lazy_Types.step(v1.value1);
                        };
                        if (v2 instanceof Data_Maybe.Just) {
                            return new Data_List_Lazy_Types.Cons(v2.value0, v1.value1);
                        };
                        throw new Error("Failed pattern match at Data.List.Lazy (line 394, column 22 - line 396, column 26): " + [ v2.constructor.name ]);
                    };
                    if (v1 instanceof Data_List_Lazy_Types.Cons) {
                        return new Data_List_Lazy_Types.Cons(v1.value0, alterAt(v - 1 | 0)(f)(v1.value1));
                    };
                    throw new Error("Failed pattern match at Data.List.Lazy (line 393, column 3 - line 393, column 17): " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return data.map(Data_Lazy.functorLazy)(go(n))(Data_Newtype.unwrap(Data_List_Lazy_Types.newtypeList)(xs));
        };
    };
};
let modifyAt = function (n) {
    return function (f) {
        return alterAt(n)(function ($266) {
            return Data_Maybe.Just.create(f($266));
        });
    };
};
module.exports = {
    toUnfoldable: toUnfoldable,
    fromFoldable: fromFoldable,
    singleton: singleton,
    range: range,
    replicate: replicate,
    replicateM: replicateM,
    some: some,
    many: many,
    repeat: repeat,
    iterate: iterate,
    cycle: cycle,
    "null": $$null,
    length: length,
    snoc: snoc,
    insert: insert,
    insertBy: insertBy,
    head: head,
    last: last,
    tail: tail,
    init: init,
    uncons: uncons,
    index: index,
    elemIndex: elemIndex,
    elemLastIndex: elemLastIndex,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    insertAt: insertAt,
    deleteAt: deleteAt,
    updateAt: updateAt,
    modifyAt: modifyAt,
    alterAt: alterAt,
    reverse: reverse,
    concat: concat,
    concatMap: concatMap,
    filter: filter,
    filterM: filterM,
    mapMaybe: mapMaybe,
    catMaybes: catMaybes,
    Pattern: Pattern,
    stripPrefix: stripPrefix,
    slice: slice,
    take: take,
    takeWhile: takeWhile,
    drop: drop,
    dropWhile: dropWhile,
    span: span,
    group: group,
    groupBy: groupBy,
    partition: partition,
    nub: nub,
    nubBy: nubBy,
    union: union,
    unionBy: unionBy,
    "delete": $$delete,
    deleteBy: deleteBy,
    difference: difference,
    intersect: intersect,
    intersectBy: intersectBy,
    zipWith: zipWith,
    zipWithA: zipWithA,
    zip: zip,
    unzip: unzip,
    transpose: transpose,
    foldM: foldM,
    foldrLazy: foldrLazy,
    scanrLazy: scanrLazy,
    eqPattern: eqPattern,
    ordPattern: ordPattern,
    newtypePattern: newtypePattern,
    showPattern: showPattern
};
