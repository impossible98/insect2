const control = require("../control");
let Data_Array = require("../Data.Array/index.js");
let Data_Array_NonEmpty_Internal = require("../Data.Array.NonEmpty.Internal/index.js");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


function eq(dict) {
	return dict.eq;
}

function unsafeFromArrayF(arg) {
	return arg;
}

function unsafeFromArray(arg) {
	return arg;
}

function toArray(arg) {
	return arg;
}

let unionBy$prime = function (eq) {
    return function (xs) {
        let $39 = Data_Array.unionBy(eq)(toArray(xs));
        return function ($40) {
            return unsafeFromArray($39($40));
        };
    };
};
let union$prime = function (dictEq) {
    return unionBy$prime(eq(dictEq));
};
let unionBy = function (eq) {
    return function (xs) {
        let $41 = unionBy$prime(eq)(xs);
        return function ($42) {
            return $41(toArray($42));
        };
    };
};
let union = function (dictEq) {
    return unionBy(eq(dictEq));
};
let unzip = (function () {
    let $43 = Data_Bifunctor.bimap(Data_Tuple.bifunctorTuple)(unsafeFromArray)(unsafeFromArray);
    return function ($44) {
        return $43(Data_Array.unzip(toArray($44)));
    };
})();
let updateAt = function (i) {
    return function (x) {
        let $45 = Data_Array.updateAt(i)(x);
        return function ($46) {
            return unsafeFromArrayF($45(toArray($46)));
        };
    };
};
let zip = function (xs) {
    return function (ys) {
        return unsafeFromArray(Data_Array.zip(toArray(xs))(toArray(ys)));
    };
};
let zipWith = function (f) {
    return function (xs) {
        return function (ys) {
            return unsafeFromArray(Data_Array.zipWith(f)(toArray(xs))(toArray(ys)));
        };
    };
};
let zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return unsafeFromArrayF(Data_Array.zipWithA(dictApplicative)(f)(toArray(xs))(toArray(ys)));
            };
        };
    };
};
let some = function (dictAlternative) {
    return function (dictLazy) {
        let $47 = Data_Array.some(dictAlternative)(dictLazy);
        return function ($48) {
            return unsafeFromArrayF($47($48));
        };
    };
};
let snoc$prime = function (xs) {
    return function (x) {
        return unsafeFromArray(Data_Array.snoc(xs)(x));
    };
};
let snoc = function (xs) {
    return function (x) {
        return unsafeFromArray(Data_Array.snoc(toArray(xs))(x));
    };
};
let singleton = function ($49) {
    return unsafeFromArray(Data_Array.singleton($49));
};
let replicate = function (i) {
    return function (x) {
        return unsafeFromArray(Data_Array.replicate(Data_Ord.max(Data_Ord.ordInt)(1)(i))(x));
    };
};
let range = function (x) {
    return function (y) {
        return unsafeFromArray(Data_Array.range(x)(y));
    };
};
let modifyAt = function (i) {
    return function (f) {
        let $50 = Data_Array.modifyAt(i)(f);
        return function ($51) {
            return unsafeFromArrayF($50(toArray($51)));
        };
    };
};
let intersectBy$prime = function (eq) {
    return function (xs) {
        return Data_Array.intersectBy(eq)(toArray(xs));
    };
};
let intersectBy = function (eq) {
    return function (xs) {
        let $52 = intersectBy$prime(eq)(xs);
        return function ($53) {
            return $52(toArray($53));
        };
    };
};
let intersect$prime = function (dictEq) {
    return intersectBy$prime(eq(dictEq));
};
let intersect = function (dictEq) {
    return intersectBy(eq(dictEq));
};
let insertAt = function (i) {
    return function (x) {
        let $54 = Data_Array.insertAt(i)(x);
        return function ($55) {
            return unsafeFromArrayF($54(toArray($55)));
        };
    };
};
let fromFoldable1 = function (dictFoldable1) {
    let $56 = Data_Array.fromFoldable(dictFoldable1.Foldable0());
    return function ($57) {
        return unsafeFromArray($56($57));
    };
};
let fromArray = function (xs) {
    if (Data_Array.length(xs) > 0) {
        return new Data_Maybe.Just(unsafeFromArray(xs));
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 134, column 1 - line 134, column 58): " + [ xs.constructor.name ]);
};
let fromFoldable = function (dictFoldable) {
    let $58 = Data_Array.fromFoldable(dictFoldable);
    return function ($59) {
        return fromArray($58($59));
    };
};
let difference$prime = function (dictEq) {
    return function (xs) {
        return Data_Array.difference(dictEq)(toArray(xs));
    };
};
let cons$prime = function (x) {
    return function (xs) {
        return unsafeFromArray(Data_Array.cons(x)(xs));
    };
};
let fromNonEmpty = function (v) {
    return cons$prime(v.value0)(v.value1);
};
let concatMap = Data_Functor.flip(control.bind(Data_Array_NonEmpty_Internal.bindNonEmptyArray));
let concat = (function () {
    let $60 = Data_Functor.map(Data_Array_NonEmpty_Internal.functorNonEmptyArray)(toArray);
    return function ($61) {
        return unsafeFromArray(Data_Array.concat(toArray($60($61))));
    };
})();
let appendArray = function (xs) {
    return function (ys) {
        return unsafeFromArray(Data_Semigroup.append(Data_Semigroup.semigroupArray)(toArray(xs))(ys));
    };
};
let alterAt = function (i) {
    return function (f) {
        let $62 = Data_Array.alterAt(i)(f);
        return function ($63) {
            return $62(toArray($63));
        };
    };
};
let adaptMaybe = function (f) {
    let $64 = Data_Maybe.fromJust();
    return function ($65) {
        return $64(f(toArray($65)));
    };
};
let head = adaptMaybe(Data_Array.head);
let init = adaptMaybe(Data_Array.init);
let last = adaptMaybe(Data_Array.last);
let tail = adaptMaybe(Data_Array.tail);
let uncons = adaptMaybe(Data_Array.uncons);
let toNonEmpty = function ($66) {
    return (function (v) {
        return new Data_NonEmpty.NonEmpty(v.head, v.tail);
    })(uncons($66));
};
let unsnoc = adaptMaybe(Data_Array.unsnoc);
let adaptAny = function (f) {
    return function ($67) {
        return f(toArray($67));
    };
};
let catMaybes = adaptAny(Data_Array.catMaybes);
let $$delete = function (dictEq) {
    return function (x) {
        return adaptAny(Data_Array["delete"](dictEq)(x));
    };
};
let deleteAt = function (i) {
    return adaptAny(Data_Array.deleteAt(i));
};
let deleteBy = function (f) {
    return function (x) {
        return adaptAny(Data_Array.deleteBy(f)(x));
    };
};
let difference = function (dictEq) {
    return function (xs) {
        return adaptAny(difference$prime(dictEq)(xs));
    };
};
let drop = function (i) {
    return adaptAny(Data_Array.drop(i));
};
let dropEnd = function (i) {
    return adaptAny(Data_Array.dropEnd(i));
};
let dropWhile = function (f) {
    return adaptAny(Data_Array.dropWhile(f));
};
let elemIndex = function (dictEq) {
    return function (x) {
        return adaptAny(Data_Array.elemIndex(dictEq)(x));
    };
};
let elemLastIndex = function (dictEq) {
    return function (x) {
        return adaptAny(Data_Array.elemLastIndex(dictEq)(x));
    };
};
let filter = function (f) {
    return adaptAny(Data_Array.filter(f));
};
let filterA = function (dictApplicative) {
    return function (f) {
        return adaptAny(Data_Array.filterA(dictApplicative)(f));
    };
};
let findIndex = function (x) {
    return adaptAny(Data_Array.findIndex(x));
};
let findLastIndex = function (x) {
    return adaptAny(Data_Array.findLastIndex(x));
};
let foldM = function (dictMonad) {
    return function (f) {
        return function (acc) {
            return adaptAny(Data_Array.foldM(dictMonad)(f)(acc));
        };
    };
};
let foldRecM = function (dictMonadRec) {
    return function (f) {
        return function (acc) {
            return adaptAny(Data_Array.foldRecM(dictMonadRec)(f)(acc));
        };
    };
};
let index = adaptAny(Data_Array.index);
let length = adaptAny(Data_Array.length);
let mapMaybe = function (f) {
    return adaptAny(Data_Array.mapMaybe(f));
};
let partition = function (f) {
    return adaptAny(Data_Array.partition(f));
};
let slice = function (start) {
    return function (end) {
        return adaptAny(Data_Array.slice(start)(end));
    };
};
let span = function (f) {
    return adaptAny(Data_Array.span(f));
};
let take = function (i) {
    return adaptAny(Data_Array.take(i));
};
let takeEnd = function (i) {
    return adaptAny(Data_Array.takeEnd(i));
};
let takeWhile = function (f) {
    return adaptAny(Data_Array.takeWhile(f));
};
let toUnfoldable = function (dictUnfoldable) {
    return adaptAny(Data_Array.toUnfoldable(dictUnfoldable));
};
let unsafeAdapt = function (f) {
    let $68 = adaptAny(f);
    return function ($69) {
        return unsafeFromArray($68($69));
    };
};
let cons = function (x) {
    return unsafeAdapt(Data_Array.cons(x));
};
let insert = function (dictOrd) {
    return function (x) {
        return unsafeAdapt(Data_Array.insert(dictOrd)(x));
    };
};
let insertBy = function (f) {
    return function (x) {
        return unsafeAdapt(Data_Array.insertBy(f)(x));
    };
};
let modifyAtIndices = function (dictFoldable) {
    return function (is) {
        return function (f) {
            return unsafeAdapt(Data_Array.modifyAtIndices(dictFoldable)(is)(f));
        };
    };
};
let nub = function (dictOrd) {
    return unsafeAdapt(Data_Array.nub(dictOrd));
};
let nubBy = function (f) {
    return unsafeAdapt(Data_Array.nubBy(f));
};
let nubByEq = function (f) {
    return unsafeAdapt(Data_Array.nubByEq(f));
};
let nubEq = function (dictEq) {
    return unsafeAdapt(Data_Array.nubEq(dictEq));
};
let reverse = unsafeAdapt(Data_Array.reverse);
let sort = function (dictOrd) {
    return unsafeAdapt(Data_Array.sort(dictOrd));
};
let sortBy = function (f) {
    return unsafeAdapt(Data_Array.sortBy(f));
};
let sortWith = function (dictOrd) {
    return function (f) {
        return unsafeAdapt(Data_Array.sortWith(dictOrd)(f));
    };
};
let updateAtIndices = function (dictFoldable) {
    return function (pairs) {
        return unsafeAdapt(Data_Array.updateAtIndices(dictFoldable)(pairs));
    };
};
let unsafeIndex = function (dictPartial) {
    return adaptAny(Data_Array.unsafeIndex());
};
let toUnfoldable1 = function (dictUnfoldable1) {
    return function (xs) {
        let len = length(xs);
        let f = function (i) {
            return Data_Tuple.Tuple.create(unsafeIndex()(xs)(i))((function () {
                let $38 = i < (len - 1 | 0);
                if ($38) {
                    return new Data_Maybe.Just(i + 1 | 0);
                };
                return Data_Maybe.Nothing.value;
            })());
        };
        return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(f)(0);
    };
};
module.exports = {
    fromArray: fromArray,
    fromNonEmpty: fromNonEmpty,
    toArray: toArray,
    toNonEmpty: toNonEmpty,
    fromFoldable: fromFoldable,
    fromFoldable1: fromFoldable1,
    toUnfoldable: toUnfoldable,
    toUnfoldable1: toUnfoldable1,
    singleton: singleton,
    range: range,
    replicate: replicate,
    some: some,
    length: length,
    cons: cons,
    "cons'": cons$prime,
    snoc: snoc,
    "snoc'": snoc$prime,
    appendArray: appendArray,
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
    reverse: reverse,
    concat: concat,
    concatMap: concatMap,
    filter: filter,
    partition: partition,
    filterA: filterA,
    mapMaybe: mapMaybe,
    catMaybes: catMaybes,
    sort: sort,
    sortBy: sortBy,
    sortWith: sortWith,
    slice: slice,
    take: take,
    takeEnd: takeEnd,
    takeWhile: takeWhile,
    drop: drop,
    dropEnd: dropEnd,
    dropWhile: dropWhile,
    span: span,
    nub: nub,
    nubBy: nubBy,
    nubEq: nubEq,
    nubByEq: nubByEq,
    union: union,
    "union'": union$prime,
    unionBy: unionBy,
    "unionBy'": unionBy$prime,
    "delete": $$delete,
    deleteBy: deleteBy,
    difference: difference,
    "difference'": difference$prime,
    intersect: intersect,
    "intersect'": intersect$prime,
    intersectBy: intersectBy,
    "intersectBy'": intersectBy$prime,
    zipWith: zipWith,
    zipWithA: zipWithA,
    zip: zip,
    unzip: unzip,
    foldM: foldM,
    foldRecM: foldRecM,
    unsafeIndex: unsafeIndex
};
