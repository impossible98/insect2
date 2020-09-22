const control = require("../control");
const data = require('../data');
let Data_Lazy = require("../Data.Lazy/index.js");
let Data_List_Lazy = require("../Data.List.Lazy/index.js");
let Data_List_Lazy_Types = require("../Data.List.Lazy.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let uncons = function (v) {
    let v1 = Data_Lazy.force(v);
    return {
        head: v1.value0,
        tail: v1.value1
    };
};
let toList = function (v) {
    let v1 = Data_Lazy.force(v);
    return Data_List_Lazy_Types.cons(v1.value0)(v1.value1);
};
let toUnfoldable = function (dictUnfoldable) {
    let $54 = Data_Unfoldable.unfoldr(dictUnfoldable)(function (xs) {
        return data.map(Data_Maybe.functorMaybe)(function (rec) {
            return new Data_Tuple.Tuple(rec.head, rec.tail);
        })(Data_List_Lazy.uncons(xs));
    });
    return function ($55) {
        return $54(toList($55));
    };
};
let tail = function (v) {
    let v1 = Data_Lazy.force(v);
    return v1.value1;
};
let singleton = control.pure(Data_List_Lazy_Types.applicativeNonEmptyList);
let repeat = function (x) {
    return Data_List_Lazy_Types.NonEmptyList(Data_Lazy.defer(function (v) {
        return new Data_NonEmpty.NonEmpty(x, Data_List_Lazy.repeat(x));
    }));
};
let length = function (v) {
    let v1 = Data_Lazy.force(v);
    return 1 + Data_List_Lazy.length(v1.value1) | 0;
};
let last = function (v) {
    let v1 = Data_Lazy.force(v);
    return Data_Maybe.fromMaybe(v1.value0)(Data_List_Lazy.last(v1.value1));
};
let iterate = function (f) {
    return function (x) {
        return Data_List_Lazy_Types.NonEmptyList(Data_Lazy.defer(function (v) {
            return new Data_NonEmpty.NonEmpty(x, Data_List_Lazy.iterate(f)(f(x)));
        }));
    };
};
let init = function (v) {
    let v1 = Data_Lazy.force(v);
    return Data_Maybe.maybe(Data_List_Lazy_Types.nil)(function (v2) {
        return Data_List_Lazy_Types.cons(v1.value0)(v2);
    })(Data_List_Lazy.init(v1.value1));
};
let head = function (v) {
    let v1 = Data_Lazy.force(v);
    return v1.value0;
};
let fromList = function (l) {
    let v = Data_List_Lazy_Types.step(l);
    if (v instanceof Data_List_Lazy_Types.Nil) {
        return Data_Maybe.Nothing.value;
    };
    if (v instanceof Data_List_Lazy_Types.Cons) {
        return new Data_Maybe.Just(Data_Lazy.defer(function (v1) {
            return new Data_NonEmpty.NonEmpty(v.value0, v.value1);
        }));
    };
    throw new Error("Failed pattern match at Data.List.Lazy.NonEmpty (line 41, column 3 - line 43, column 61): " + [ v.constructor.name ]);
};
let fromFoldable = function (dictFoldable) {
    let $56 = Data_List_Lazy.fromFoldable(dictFoldable);
    return function ($57) {
        return fromList($56($57));
    };
};
let concatMap = data.flip(control.bind(Data_List_Lazy_Types.bindNonEmptyList));
let appendFoldable = function (dictFoldable) {
    return function (nel) {
        return function (ys) {
            return Data_Lazy.defer(function (v) {
                return new Data_NonEmpty.NonEmpty(head(nel), Data_Semigroup.append(Data_List_Lazy_Types.semigroupList)(tail(nel))(Data_List_Lazy.fromFoldable(dictFoldable)(ys)));
            });
        };
    };
};
module.exports = {
    toUnfoldable: toUnfoldable,
    fromFoldable: fromFoldable,
    fromList: fromList,
    toList: toList,
    singleton: singleton,
    repeat: repeat,
    iterate: iterate,
    head: head,
    last: last,
    tail: tail,
    init: init,
    uncons: uncons,
    length: length,
    concatMap: concatMap,
    appendFoldable: appendFoldable
};
