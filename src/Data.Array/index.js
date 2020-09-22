let $foreign = require("./foreign.js");

const control = require("../control");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");
let Data_Array_ST = require("../Data.Array.ST/index.js");
let Data_Array_ST_Iterator = require("../Data.Array.ST.Iterator/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");


function refEq(r1) {
	return function (r2) {
		return r1 === r2;
	};
}

let eqBooleanImpl = refEq;


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let eqBoolean = new Eq(eqBooleanImpl);


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

function eqRecord(dict) {
	return dict.eqRecord;
}



function eq(dict) {
	return dict.eq;
}

function eqArray(dictEq) {
	return new Eq(eqArrayImpl(eq(dictEq)));
}



function notEq(dictEq) {
	return function (x) {
		return function (y) {
			return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
		};
	};
};






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
let zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_Traversable.traversableArray)(dictApplicative)($foreign.zipWith(f)(xs)(ys));
            };
        };
    };
};
let zip = $foreign.zipWith(Data_Tuple.Tuple.create);
let updateAtIndices = function (dictFoldable) {
    return function (us) {
        return function (xs) {
            return Data_Array_ST.withArray(function (res) {
                return Data_Foldable.traverse_(Control_Monad_ST_Internal.applicativeST)(dictFoldable)(function (v) {
                    return Data_Array_ST.poke(v.value0)(v.value1)(res);
                })(us);
            })(xs)();
        };
    };
};
let updateAt = $foreign["_updateAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let unsafeIndex = function (dictPartial) {
    return $foreign.unsafeIndexImpl;
};
let uncons = $foreign["uncons'"](Data_Functor._const(Data_Maybe.Nothing.value))(function (x) {
    return function (xs) {
        return new Data_Maybe.Just({
            head: x,
            tail: xs
        });
    };
});
let toUnfoldable = function (dictUnfoldable) {
    return function (xs) {
        let len = $foreign.length(xs);
        let f = function (i) {
            if (i < len) {
                return new Data_Maybe.Just(new Data_Tuple.Tuple(unsafeIndex()(xs)(i), i + 1 | 0));
            };
            if (true) {
                return Data_Maybe.Nothing.value;
            };
            throw new Error("Failed pattern match at Data.Array (line 143, column 3 - line 145, column 26): " + [ i.constructor.name ]);
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(f)(0);
    };
};
let takeEnd = function (n) {
    return function (xs) {
        return $foreign.drop($foreign.length(xs) - n | 0)(xs);
    };
};
let tail = $foreign["uncons'"](Data_Functor._const(Data_Maybe.Nothing.value))(function (v) {
    return function (xs) {
        return new Data_Maybe.Just(xs);
    };
});
let sortBy = function (comp) {
    return function (xs) {
        let comp$prime = function (x) {
            return function (y) {
                let v = comp(x)(y);
                if (v instanceof Data_Ordering.GT) {
                    return 1;
                };
                if (v instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if (v instanceof Data_Ordering.LT) {
                    return -1 | 0;
                };
                throw new Error("Failed pattern match at Data.Array (line 702, column 15 - line 705, column 13): " + [ v.constructor.name ]);
            };
        };
        return $foreign.sortImpl(comp$prime)(xs);
    };
};
let sortWith = function (dictOrd) {
    return function (f) {
        return sortBy(Data_Ord.comparing(dictOrd)(f));
    };
};
let sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
let singleton = function (a) {
    return [ a ];
};
let $$null = function (xs) {
    return $foreign.length(xs) === 0;
};
let nubByEq = function (eq) {
    return function (xs) {
        return (function __do() {
            let arr = Data_Array_ST.empty();
            Control_Monad_ST_Internal.foreach(xs)(function (x) {
                return function __do() {
                    let e = Data_Functor.map(Control_Monad_ST_Internal.functorST)((function () {
                        let $84 = Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean);
                        let $85 = Data_Foldable.any(Data_Foldable.foldableArray)(Data_HeytingAlgebra.heytingAlgebraBoolean)(function (v) {
                            return eq(v)(x);
                        });
                        return function ($86) {
                            return $84($85($86));
                        };
                    })())(Data_Array_ST.unsafeFreeze(arr))();
                    return control.when(Control_Monad_ST_Internal.applicativeST)(e)(Data_Functor._void(Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(x)(arr)))();
                };
            })();
            return Data_Array_ST.unsafeFreeze(arr)();
        })();
    };
};
let nubEq = function (dictEq) {
    return nubByEq(eq(dictEq));
};
let modifyAtIndices = function (dictFoldable) {
    return function (is) {
        return function (f) {
            return function (xs) {
                return Data_Array_ST.withArray(function (res) {
                    return Data_Foldable.traverse_(Control_Monad_ST_Internal.applicativeST)(dictFoldable)(function (i) {
                        return Data_Array_ST.modify(i)(f)(res);
                    })(is);
                })(xs)();
            };
        };
    };
};
let mapWithIndex = function (f) {
    return function (xs) {
        return $foreign.zipWith(f)($foreign.range(0)($foreign.length(xs) - 1 | 0))(xs);
    };
};
let some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return apply((dictAlternative.Applicative0()).Apply0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())($foreign.cons)(v))(control.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
let many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return alt((dictAlternative.Plus1()).Alt0())(some(dictAlternative)(dictLazy)(v))(control.pure(dictAlternative.Applicative0())([  ]));
        };
    };
};
let insertAt = $foreign["_insertAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let init = function (xs) {
    if ($$null(xs)) {
        return Data_Maybe.Nothing.value;
    };
    if (true) {
        return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1 | 0)(xs));
    };
    throw new Error("Failed pattern match at Data.Array (line 323, column 1 - line 323, column 45): " + [ xs.constructor.name ]);
};
let index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let last = function (xs) {
    return index(xs)($foreign.length(xs) - 1 | 0);
};
let unsnoc = function (xs) {
    return apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
        return function (v1) {
            return {
                init: v,
                last: v1
            };
        };
    })(init(xs)))(last(xs));
};
let modifyAt = function (i) {
    return function (f) {
        return function (xs) {
            let go = function (x) {
                return updateAt(i)(f(x))(xs);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
let span = function (p) {
    return function (arr) {
        let go = function ($copy_i) {
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(i) {
                let v = index(arr)(i);
                if (v instanceof Data_Maybe.Just) {
                    let $60 = p(v.value0);
                    if ($60) {
                        $copy_i = i + 1 | 0;
                        return;
                    };
                    $tco_done = true;
                    return new Data_Maybe.Just(i);
                };
                if (v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.Array (line 834, column 5 - line 836, column 25): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($copy_i);
            };
            return $tco_result;
        };
        let breakIndex = go(0);
        if (breakIndex instanceof Data_Maybe.Just && breakIndex.value0 === 0) {
            return {
                init: [  ],
                rest: arr
            };
        };
        if (breakIndex instanceof Data_Maybe.Just) {
            return {
                init: $foreign.slice(0)(breakIndex.value0)(arr),
                rest: $foreign.slice(breakIndex.value0)($foreign.length(arr))(arr)
            };
        };
        if (breakIndex instanceof Data_Maybe.Nothing) {
            return {
                init: arr,
                rest: [  ]
            };
        };
        throw new Error("Failed pattern match at Data.Array (line 821, column 3 - line 827, column 30): " + [ breakIndex.constructor.name ]);
    };
};
let takeWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).init;
    };
};
let unzip = function (xs) {
    return (function __do() {
        let fsts = Data_Array_ST.empty();
        let snds = Data_Array_ST.empty();
        let iter = Data_Array_ST_Iterator.iterator(function (v) {
            return index(xs)(v);
        })();
        Data_Array_ST_Iterator.iterate(iter)(function (v) {
            return function __do() {
                Data_Functor._void(Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v.value0)(fsts))();
                return Data_Functor._void(Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v.value1)(snds))();
            };
        })();
        let fsts$prime = Data_Array_ST.unsafeFreeze(fsts)();
        let snds$prime = Data_Array_ST.unsafeFreeze(snds)();
        return new Data_Tuple.Tuple(fsts$prime, snds$prime);
    })();
};
let head = function (xs) {
    return index(xs)(0);
};
let nubBy = function (comp) {
    return function (xs) {
        let indexedAndSorted = sortBy(function (x) {
            return function (y) {
                return comp(Data_Tuple.snd(x))(Data_Tuple.snd(y));
            };
        })(mapWithIndex(Data_Tuple.Tuple.create)(xs));
        let v = head(indexedAndSorted);
        if (v instanceof Data_Maybe.Nothing) {
            return [  ];
        };
        if (v instanceof Data_Maybe.Just) {
            return Data_Functor.map(Data_Functor.functorArray)(Data_Tuple.snd)(sortWith(Data_Ord.ordInt)(Data_Tuple.fst)((function __do() {
                let result = Data_Array_ST.unsafeThaw(singleton(v.value0))();
                Control_Monad_ST_Internal.foreach(indexedAndSorted)(function (v1) {
                    return function __do() {
                        let lst = Data_Functor.map(Control_Monad_ST_Internal.functorST)((function () {
                            let $87 = (function (dictPartial) {
                                let $89 = Data_Maybe.fromJust();
                                return function ($90) {
                                    return $89(last($90));
                                };
                            })();
                            return function ($88) {
                                return Data_Tuple.snd($87($88));
                            };
                        })())(Data_Array_ST.unsafeFreeze(result))();
                        return control.when(Control_Monad_ST_Internal.applicativeST)(notEq(Data_Ordering.eqOrdering)(comp(lst)(v1.value1))(Data_Ordering.EQ.value))(Data_Functor._void(Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v1)(result)))();
                    };
                })();
                return Data_Array_ST.unsafeFreeze(result)();
            })()));
        };
        throw new Error("Failed pattern match at Data.Array (line 903, column 17 - line 911, column 29): " + [ v.constructor.name ]);
    };
};
let nub = function (dictOrd) {
    return nubBy(Data_Ord.compare(dictOrd));
};
let groupBy = function (op) {
    return function (xs) {
        return (function __do() {
            let result = Data_Array_ST.empty();
            let iter = Data_Array_ST_Iterator.iterator(function (v) {
                return index(xs)(v);
            })();
            Data_Array_ST_Iterator.iterate(iter)(function (x) {
                return Data_Functor._void(Control_Monad_ST_Internal.functorST)(function __do() {
                    let sub = Data_Array_ST.empty();
                    Data_Array_ST.push(x)(sub)();
                    Data_Array_ST_Iterator.pushWhile(op(x))(iter)(sub)();
                    let grp = Data_Array_ST.unsafeFreeze(sub)();
                    return Data_Array_ST.push(grp)(result)();
                });
            })();
            return Data_Array_ST.unsafeFreeze(result)();
        })();
    };
};
let group = function (dictEq) {
    return function (xs) {
        return groupBy(eq(dictEq))(xs);
    };
};
let group$prime = function (dictOrd) {
    let $91 = group(dictOrd.Eq0());
    let $92 = sort(dictOrd);
    return function ($93) {
        return $91($92($93));
    };
};
let fromFoldable = function (dictFoldable) {
    return $foreign.fromFoldableImpl(Data_Foldable.foldr(dictFoldable));
};
let foldRecM = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (array) {
                let go = function (res) {
                    return function (i) {
                        if (i >= $foreign.length(array)) {
                            return control.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(res));
                        };
                        if (true) {
                            return control.bind((dictMonadRec.Monad0()).Bind1())(f(res)(unsafeIndex()(array)(i)))(function (res$prime) {
                                return control.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop({
                                    a: res$prime,
                                    b: i + 1 | 0
                                }));
                            });
                        };
                        throw new Error("Failed pattern match at Data.Array (line 1101, column 3 - line 1105, column 42): " + [ res.constructor.name, i.constructor.name ]);
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(go)(a)(0);
            };
        };
    };
};
let foldM = function (dictMonad) {
    return function (f) {
        return function (a) {
            return $foreign["uncons'"](function (v) {
                return control.pure(dictMonad.Applicative0())(a);
            })(function (b) {
                return function (bs) {
                    return control.bind(dictMonad.Bind1())(f(a)(b))(function (a$prime) {
                        return foldM(dictMonad)(f)(a$prime)(bs);
                    });
                };
            });
        };
    };
};
let findLastIndex = $foreign.findLastIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let insertBy = function (cmp) {
    return function (x) {
        return function (ys) {
            let i = Data_Maybe.maybe(0)(function (v) {
                return v + 1 | 0;
            })(findLastIndex(function (y) {
                return eq(Data_Ordering.eqOrdering)(cmp(x)(y))(Data_Ordering.GT.value);
            })(ys));
            return Data_Maybe.fromJust()(insertAt(i)(x)(ys));
        };
    };
};
let insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
let findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let intersectBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return $foreign.filter(function (x) {
                return Data_Maybe.isJust(findIndex(eq(x))(ys));
            })(xs);
        };
    };
};
let intersect = function (dictEq) {
    return intersectBy(eq(dictEq));
};
let elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return eq(dictEq)(v)(x);
        });
    };
};
let elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return eq(dictEq)(v)(x);
        });
    };
};
let dropWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).rest;
    };
};
let dropEnd = function (n) {
    return function (xs) {
        return $foreign.take($foreign.length(xs) - n | 0)(xs);
    };
};
let deleteAt = $foreign["_deleteAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let deleteBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2.length === 0) {
                return [  ];
            };
            return Data_Maybe.maybe(v2)(function (i) {
                return Data_Maybe.fromJust()(deleteAt(i)(v2));
            })(findIndex(v(v1))(v2));
        };
    };
};
let unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_Semigroup.semigroupArray)(xs)(Data_Foldable.foldl(Data_Foldable.foldableArray)(Data_Functor.flip(deleteBy(eq)))(nubByEq(eq)(ys))(xs));
        };
    };
};
let union = function (dictEq) {
    return unionBy(eq(dictEq));
};
let $$delete = function (dictEq) {
    return deleteBy(eq(dictEq));
};
let difference = function (dictEq) {
    return Data_Foldable.foldr(Data_Foldable.foldableArray)($$delete(dictEq));
};
let concatMap = Data_Functor.flip(control.bind(control.bindArray));
let mapMaybe = function (f) {
    return concatMap((function () {
        let $94 = Data_Maybe.maybe([  ])(singleton);
        return function ($95) {
            return $94(f($95));
        };
    })());
};
let filterA = function (dictApplicative) {
    return function (p) {
        let $96 = Data_Functor.map((dictApplicative.Apply0()).Functor0())(mapMaybe(function (v) {
            if (v.value1) {
                return new Data_Maybe.Just(v.value0);
            };
            return Data_Maybe.Nothing.value;
        }));
        let $97 = Data_Traversable.traverse(Data_Traversable.traversableArray)(dictApplicative)(function (x) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Tuple.Tuple.create(x))(p(x));
        });
        return function ($98) {
            return $96($97($98));
        };
    };
};
let catMaybes = mapMaybe(identity(categoryFn));
let alterAt = function (i) {
    return function (f) {
        return function (xs) {
            let go = function (x) {
                let v = f(x);
                if (v instanceof Data_Maybe.Nothing) {
                    return deleteAt(i)(xs);
                };
                if (v instanceof Data_Maybe.Just) {
                    return updateAt(i)(v.value0)(xs);
                };
                throw new Error("Failed pattern match at Data.Array (line 544, column 10 - line 546, column 32): " + [ v.constructor.name ]);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
module.exports = {
    fromFoldable: fromFoldable,
    toUnfoldable: toUnfoldable,
    singleton: singleton,
    some: some,
    many: many,
    "null": $$null,
    insert: insert,
    insertBy: insertBy,
    head: head,
    last: last,
    tail: tail,
    init: init,
    uncons: uncons,
    unsnoc: unsnoc,
    index: index,
    elemIndex: elemIndex,
    elemLastIndex: elemLastIndex,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    insertAt: insertAt,
    deleteAt: deleteAt,
    updateAt: updateAt,
    updateAtIndices: updateAtIndices,
    modifyAt: modifyAt,
    modifyAtIndices: modifyAtIndices,
    alterAt: alterAt,
    concatMap: concatMap,
    filterA: filterA,
    mapMaybe: mapMaybe,
    catMaybes: catMaybes,
    mapWithIndex: mapWithIndex,
    sort: sort,
    sortBy: sortBy,
    sortWith: sortWith,
    takeEnd: takeEnd,
    takeWhile: takeWhile,
    dropEnd: dropEnd,
    dropWhile: dropWhile,
    span: span,
    group: group,
    "group'": group$prime,
    groupBy: groupBy,
    nub: nub,
    nubEq: nubEq,
    nubBy: nubBy,
    nubByEq: nubByEq,
    union: union,
    unionBy: unionBy,
    "delete": $$delete,
    deleteBy: deleteBy,
    difference: difference,
    intersect: intersect,
    intersectBy: intersectBy,
    zipWithA: zipWithA,
    zip: zip,
    unzip: unzip,
    foldM: foldM,
    foldRecM: foldRecM,
    unsafeIndex: unsafeIndex,
    range: $foreign.range,
    replicate: $foreign.replicate,
    length: $foreign.length,
    cons: $foreign.cons,
    snoc: $foreign.snoc,
    reverse: $foreign.reverse,
    concat: $foreign.concat,
    filter: $foreign.filter,
    partition: $foreign.partition,
    slice: $foreign.slice,
    take: $foreign.take,
    drop: $foreign.drop,
    zipWith: $foreign.zipWith
};
