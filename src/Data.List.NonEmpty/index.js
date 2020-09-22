let control = require("../control");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");
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


let zipWith = function (f) {
    return function (v) {
        return function (v1) {
            return new Data_NonEmpty.NonEmpty(f(v.value0)(v1.value0), Data_List.zipWith(f)(v.value1)(v1.value1));
        };
    };
};
let zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Semigroup_Traversable.sequence1(Data_List_Types.traversable1NonEmptyList)(dictApplicative.Apply0())(zipWith(f)(xs)(ys));
            };
        };
    };
};
let zip = zipWith(Data_Tuple.Tuple.create);

function crashWith() {
	return function (msg) {
		throw new Error(msg);
	};
}


function unsafePartial(f) {
	return f();
}

function unsafeCrashWith(msg) {
	return unsafePartial(() => {
		return crashWith()(msg);
	});
}

let wrappedOperation2 = function (name) {
    return function (f) {
        return function (v) {
            return function (v1) {
                let v2 = f(new Data_List_Types.Cons(v.value0, v.value1))(new Data_List_Types.Cons(v1.value0, v1.value1));
                if (v2 instanceof Data_List_Types.Cons) {
                    return new Data_NonEmpty.NonEmpty(v2.value0, v2.value1);
                };
                if (v2 instanceof Data_List_Types.Nil) {
                    return unsafeCrashWith("Impossible: empty list in NonEmptyList " + name);
                };
                throw new Error("Failed pattern match at Data.List.NonEmpty (line 104, column 3 - line 106, column 81): " + [ v2.constructor.name ]);
            };
        };
    };
};
let wrappedOperation = function (name) {
    return function (f) {
        return function (v) {
            let v1 = f(new Data_List_Types.Cons(v.value0, v.value1));
            if (v1 instanceof Data_List_Types.Cons) {
                return new Data_NonEmpty.NonEmpty(v1.value0, v1.value1);
            };
            if (v1 instanceof Data_List_Types.Nil) {
                return unsafeCrashWith("Impossible: empty list in NonEmptyList " + name);
            };
            throw new Error("Failed pattern match at Data.List.NonEmpty (line 91, column 3 - line 93, column 81): " + [ v1.constructor.name ]);
        };
    };
};
let updateAt = function (i) {
    return function (a) {
        return function (v) {
            if (i === 0) {
                return new Data_Maybe.Just(new Data_NonEmpty.NonEmpty(a, v.value1));
            };
            if (true) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function ($161) {
                    return Data_List_Types.NonEmptyList((function (v1) {
                        return new Data_NonEmpty.NonEmpty(v.value0, v1);
                    })($161));
                })(Data_List.updateAt(i - 1 | 0)(a)(v.value1));
            };
            throw new Error("Failed pattern match at Data.List.NonEmpty (line 197, column 1 - line 197, column 75): " + [ i.constructor.name, a.constructor.name, v.constructor.name ]);
        };
    };
};
let unzip = function (ts) {
    return new Data_Tuple.Tuple(Data_Functor.map(Data_List_Types.functorNonEmptyList)(Data_Tuple.fst)(ts), Data_Functor.map(Data_List_Types.functorNonEmptyList)(Data_Tuple.snd)(ts));
};
let unsnoc = function (v) {
    let v1 = Data_List.unsnoc(v.value1);
    if (v1 instanceof Data_Maybe.Nothing) {
        return {
            init: Data_List_Types.Nil.value,
            last: v.value0
        };
    };
    if (v1 instanceof Data_Maybe.Just) {
        return {
            init: new Data_List_Types.Cons(v.value0, v1.value0.init),
            last: v1.value0.last
        };
    };
    throw new Error("Failed pattern match at Data.List.NonEmpty (line 159, column 35 - line 161, column 50): " + [ v1.constructor.name ]);
};
let unionBy = (function () {
    let $162 = wrappedOperation2("unionBy");
    return function ($163) {
        return $162(Data_List.unionBy($163));
    };
})();
let union = function (dictEq) {
    return wrappedOperation2("union")(Data_List.union(dictEq));
};
let uncons = function (v) {
    return {
        head: v.value0,
        tail: v.value1
    };
};
let toList = function (v) {
    return new Data_List_Types.Cons(v.value0, v.value1);
};
let toUnfoldable = function (dictUnfoldable) {
    let $164 = Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (rec) {
            return new Data_Tuple.Tuple(rec.head, rec.tail);
        })(Data_List.uncons(xs));
    });
    return function ($165) {
        return $164(toList($165));
    };
};
let tail = function (v) {
    return v.value1;
};
let sortBy = (function () {
    let $166 = wrappedOperation("sortBy");
    return function ($167) {
        return $166(Data_List.sortBy($167));
    };
})();
let sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
let snoc = function (v) {
    return function (y) {
        return new Data_NonEmpty.NonEmpty(v.value0, Data_List.snoc(v.value1)(y));
    };
};
let singleton = (function () {
    let $168 = Data_NonEmpty.singleton(Data_List_Types.plusList);
    return function ($169) {
        return Data_List_Types.NonEmptyList($168($169));
    };
})();
let snoc$prime = function (v) {
    return function (y) {
        if (v instanceof Data_List_Types.Cons) {
            return new Data_NonEmpty.NonEmpty(v.value0, Data_List.snoc(v.value1)(y));
        };
        if (v instanceof Data_List_Types.Nil) {
            return singleton(y);
        };
        throw new Error("Failed pattern match at Data.List.NonEmpty (line 139, column 1 - line 139, column 51): " + [ v.constructor.name, y.constructor.name ]);
    };
};
let reverse = wrappedOperation("reverse")(Data_List.reverse);
let nubBy = (function () {
    let $170 = wrappedOperation("nubBy");
    return function ($171) {
        return $170(Data_List.nubBy($171));
    };
})();
let nub = function (dictEq) {
    return wrappedOperation("nub")(Data_List.nub(dictEq));
};
let modifyAt = function (i) {
    return function (f) {
        return function (v) {
            if (i === 0) {
                return new Data_Maybe.Just(new Data_NonEmpty.NonEmpty(f(v.value0), v.value1));
            };
            if (true) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function ($172) {
                    return Data_List_Types.NonEmptyList((function (v1) {
                        return new Data_NonEmpty.NonEmpty(v.value0, v1);
                    })($172));
                })(Data_List.modifyAt(i - 1 | 0)(f)(v.value1));
            };
            throw new Error("Failed pattern match at Data.List.NonEmpty (line 202, column 1 - line 202, column 82): " + [ i.constructor.name, f.constructor.name, v.constructor.name ]);
        };
    };
};
let mapWithIndex = Data_FunctorWithIndex.mapWithIndex(Data_List_Types.functorWithIndexNonEmptyList);
let lift = function (f) {
    return function (v) {
        return f(new Data_List_Types.Cons(v.value0, v.value1));
    };
};
let mapMaybe = function ($173) {
    return lift(Data_List.mapMaybe($173));
};
let partition = function ($174) {
    return lift(Data_List.partition($174));
};
let span = function ($175) {
    return lift(Data_List.span($175));
};
let take = function ($176) {
    return lift(Data_List.take($176));
};
let takeWhile = function ($177) {
    return lift(Data_List.takeWhile($177));
};
let length = function (v) {
    return 1 + Data_List.length(v.value1) | 0;
};
let last = function (v) {
    return Data_Maybe.fromMaybe(v.value0)(Data_List.last(v.value1));
};
let intersectBy = (function () {
    let $178 = wrappedOperation2("intersectBy");
    return function ($179) {
        return $178(Data_List.intersectBy($179));
    };
})();
let intersect = function (dictEq) {
    return wrappedOperation2("intersect")(Data_List.intersect(dictEq));
};
let insertAt = function (i) {
    return function (a) {
        return function (v) {
            if (i === 0) {
                return new Data_Maybe.Just(new Data_NonEmpty.NonEmpty(a, new Data_List_Types.Cons(v.value0, v.value1)));
            };
            if (true) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(function ($180) {
                    return Data_List_Types.NonEmptyList((function (v1) {
                        return new Data_NonEmpty.NonEmpty(v.value0, v1);
                    })($180));
                })(Data_List.insertAt(i - 1 | 0)(a)(v.value1));
            };
            throw new Error("Failed pattern match at Data.List.NonEmpty (line 192, column 1 - line 192, column 75): " + [ i.constructor.name, a.constructor.name, v.constructor.name ]);
        };
    };
};
let init = function (v) {
    return Data_Maybe.maybe(Data_List_Types.Nil.value)(function (v1) {
        return new Data_List_Types.Cons(v.value0, v1);
    })(Data_List.init(v.value1));
};
let index = function (v) {
    return function (i) {
        if (i === 0) {
            return new Data_Maybe.Just(v.value0);
        };
        if (true) {
            return Data_List.index(v.value1)(i - 1 | 0);
        };
        throw new Error("Failed pattern match at Data.List.NonEmpty (line 166, column 1 - line 166, column 52): " + [ v.constructor.name, i.constructor.name ]);
    };
};
let head = function (v) {
    return v.value0;
};
let groupBy = (function () {
    let $181 = wrappedOperation("groupBy");
    return function ($182) {
        return $181(Data_List.groupBy($182));
    };
})();
let group$prime = function (dictOrd) {
    return wrappedOperation("group'")(Data_List["group'"](dictOrd));
};
let group = function (dictEq) {
    return wrappedOperation("group")(Data_List.group(dictEq));
};
let fromList = function (v) {
    if (v instanceof Data_List_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Types.Cons) {
        return new Data_Maybe.Just(new Data_NonEmpty.NonEmpty(v.value0, v.value1));
    };
    throw new Error("Failed pattern match at Data.List.NonEmpty (line 120, column 1 - line 120, column 57): " + [ v.constructor.name ]);
};
let fromFoldable = function (dictFoldable) {
    let $183 = Data_List.fromFoldable(dictFoldable);
    return function ($184) {
        return fromList($183($184));
    };
};
let foldM = function (dictMonad) {
    return function (f) {
        return function (a) {
            return function (v) {
                return control.bind(dictMonad.Bind1())(f(a)(v.value0))(function (a$prime) {
                    return Data_List.foldM(dictMonad)(f)(a$prime)(v.value1);
                });
            };
        };
    };
};
let findLastIndex = function (f) {
    return function (v) {
        let v1 = Data_List.findLastIndex(f)(v.value1);
        if (v1 instanceof Data_Maybe.Just) {
            return new Data_Maybe.Just(v1.value0 + 1 | 0);
        };
        if (v1 instanceof Data_Maybe.Nothing) {
            if (f(v.value0)) {
                return new Data_Maybe.Just(0);
            };
            if (true) {
                return Data_Maybe.Nothing.value;
            };
        };
        throw new Error("Failed pattern match at Data.List.NonEmpty (line 186, column 3 - line 190, column 29): " + [ v1.constructor.name ]);
    };
};
let findIndex = function (f) {
    return function (v) {
        if (f(v.value0)) {
            return new Data_Maybe.Just(0);
        };
        if (true) {
            return Data_Functor.map(Data_Maybe.functorMaybe)(function (v1) {
                return v1 + 1 | 0;
            })(Data_List.findIndex(f)(v.value1));
        };
        throw new Error("Failed pattern match at Data.List.NonEmpty (line 179, column 1 - line 179, column 69): " + [ f.constructor.name, v.constructor.name ]);
    };
};
let filterM = function (dictMonad) {
    let $185 = Data_List.filterM(dictMonad);
    return function ($186) {
        return lift($185($186));
    };
};
let filter = function ($187) {
    return lift(Data_List.filter($187));
};
let elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
let elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
let dropWhile = function ($188) {
    return lift(Data_List.dropWhile($188));
};
let drop = function ($189) {
    return lift(Data_List.drop($189));
};
let cons$prime = function (x) {
    return function (xs) {
        return new Data_NonEmpty.NonEmpty(x, xs);
    };
};
let cons = function (y) {
    return function (v) {
        return new Data_NonEmpty.NonEmpty(y, new Data_List_Types.Cons(v.value0, v.value1));
    };
};
let concatMap = Data_Functor.flip(control.bind(Data_List_Types.bindNonEmptyList));
let concat = function (v) {
    return control.bind(Data_List_Types.bindNonEmptyList)(v)(identity(categoryFn));
};
let catMaybes = lift(Data_List.catMaybes);
let appendFoldable = function (dictFoldable) {
    return function (v) {
        return function (ys) {
            return new Data_NonEmpty.NonEmpty(v.value0, Data_Semigroup.append(Data_List_Types.semigroupList)(v.value1)(Data_List.fromFoldable(dictFoldable)(ys)));
        };
    };
};
module.exports = {
    toUnfoldable: toUnfoldable,
    fromFoldable: fromFoldable,
    fromList: fromList,
    toList: toList,
    singleton: singleton,
    length: length,
    cons: cons,
    "cons'": cons$prime,
    snoc: snoc,
    "snoc'": snoc$prime,
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
    updateAt: updateAt,
    modifyAt: modifyAt,
    reverse: reverse,
    concat: concat,
    concatMap: concatMap,
    filter: filter,
    filterM: filterM,
    mapMaybe: mapMaybe,
    catMaybes: catMaybes,
    appendFoldable: appendFoldable,
    mapWithIndex: mapWithIndex,
    sort: sort,
    sortBy: sortBy,
    take: take,
    takeWhile: takeWhile,
    drop: drop,
    dropWhile: dropWhile,
    span: span,
    group: group,
    "group'": group$prime,
    groupBy: groupBy,
    partition: partition,
    nub: nub,
    nubBy: nubBy,
    union: union,
    unionBy: unionBy,
    intersect: intersect,
    intersectBy: intersectBy,
    zipWith: zipWith,
    zipWithA: zipWithA,
    zip: zip,
    unzip: unzip,
    foldM: foldM
};
