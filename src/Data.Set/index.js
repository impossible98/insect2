const control = require('../control');
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");
let Data_Array = require("../Data.Array/index.js");
let Data_Array_ST = require("../Data.Array.ST/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


let union = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return Data_Map_Internal.union(dictOrd)(v)(v1);
        };
    };
};
let toList = function (v) {
    return Data_Map_Internal.keys(v);
};
let toUnfoldable = function (dictUnfoldable) {
    let $63 = Data_List.toUnfoldable(dictUnfoldable);
    return function ($64) {
        return $63(toList($64));
    };
};
let size = function (v) {
    return Data_Map_Internal.size(v);
};
let singleton = function (a) {
    return Data_Map_Internal.singleton(a)();
};
let showSet = function (dictShow) {
    return new Data_Show.Show(function (s) {
        return "(fromFoldable " + (Data_Show.show(Data_List_Types.showList(dictShow))(toList(s)) + ")");
    });
};
let semigroupSet = function (dictOrd) {
    return new Data_Semigroup.Semigroup(union(dictOrd));
};
let member = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map_Internal.member(dictOrd)(a)(v);
        };
    };
};
let isEmpty = function (v) {
    return Data_Map_Internal.isEmpty(v);
};
let insert = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map_Internal.insert(dictOrd)(a)()(v);
        };
    };
};
let foldableSet = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        let $65 = Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(f);
        return function ($66) {
            return $65(toList($66));
        };
    };
}, function (f) {
    return function (x) {
        let $67 = Data_Foldable.foldl(Data_List_Types.foldableList)(f)(x);
        return function ($68) {
            return $67(toList($68));
        };
    };
}, function (f) {
    return function (x) {
        let $69 = Data_Foldable.foldr(Data_List_Types.foldableList)(f)(x);
        return function ($70) {
            return $69(toList($70));
        };
    };
});
let findMin = function (v) {
    return data.map(Data_Maybe.functorMaybe)(function (v1) {
        return v1.key;
    })(Data_Map_Internal.findMin(v));
};
let findMax = function (v) {
    return data.map(Data_Maybe.functorMaybe)(function (v1) {
        return v1.key;
    })(Data_Map_Internal.findMax(v));
};
let filter = function (dictOrd) {
    return function (f) {
        return function (v) {
            return Data_Map_Internal.filterWithKey(dictOrd)(function (k) {
                return function (v1) {
                    return f(k);
                };
            })(v);
        };
    };
};
let eqSet = function (dictEq) {
    return new data.Eq(function (v) {
        return function (v1) {
            return data.eq(Data_Map_Internal.eqMap(dictEq)(data.eqUnit))(v)(v1);
        };
    });
};
let ordSet = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqSet(dictOrd.Eq0());
    }, function (s1) {
        return function (s2) {
            return Data_Ord.compare(Data_List_Types.ordList(dictOrd))(toList(s1))(toList(s2));
        };
    });
};
let eq1Set = new data.Eq1(function (dictEq) {
    return data.eq(eqSet(dictEq));
});
let ord1Set = new Data_Ord.Ord1(function () {
    return eq1Set;
}, function (dictOrd) {
    return Data_Ord.compare(ordSet(dictOrd));
});
let empty = Data_Map_Internal.empty;
let fromFoldable = function (dictFoldable) {
    return function (dictOrd) {
        return Data_Foldable.foldl(dictFoldable)(function (m) {
            return function (a) {
                return insert(dictOrd)(a)(m);
            };
        })(empty);
    };
};
let intersection = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            let toArray = (function () {
                let $71 = Data_Array.fromFoldable(Data_List_Types.foldableList);
                return function ($72) {
                    return $71(toList($72));
                };
            })();
            let rs = toArray(s2);
            let rl = Data_Array.length(rs);
            let ls = toArray(s1);
            let ll = Data_Array.length(ls);
            let intersect = function (acc) {
                let go = function (l) {
                    return function (r) {
                        let $58 = l < ll && r < rl;
                        if ($58) {
                            let v = Data_Ord.compare(dictOrd)(ls[l])(rs[r]);
                            if (v instanceof Data_Ordering.EQ) {
                                return function __do() {
                                    Data_Array_ST.push(ls[l])(acc)();
                                    return new Control_Monad_Rec_Class.Loop({
                                        a: l + 1 | 0,
                                        b: r + 1 | 0
                                    });
                                };
                            };
                            if (v instanceof Data_Ordering.LT) {
                                return control.pure(Control_Monad_ST_Internal.applicativeST)(new Control_Monad_Rec_Class.Loop({
                                    a: l + 1 | 0,
                                    b: r
                                }));
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return control.pure(Control_Monad_ST_Internal.applicativeST)(new Control_Monad_Rec_Class.Loop({
                                    a: l,
                                    b: r + 1 | 0
                                }));
                            };
                            throw new Error("Failed pattern match at Data.Set (line 176, column 12 - line 181, column 43): " + [ v.constructor.name ]);
                        };
                        return control.pure(Control_Monad_ST_Internal.applicativeST)(new Control_Monad_Rec_Class.Done(acc));
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(Control_Monad_ST_Internal.monadRecST)(go)(0)(0);
            };
            return fromFoldable(Data_Foldable.foldableArray)(dictOrd)(control.bind(Control_Monad_ST_Internal.bindST)(control.bind(Control_Monad_ST_Internal.bindST)(Data_Array_ST.empty)(intersect))(Data_Array_ST.unsafeFreeze)());
        };
    };
};
let map = function (dictOrd) {
    return function (f) {
        return Data_Foldable.foldl(foldableSet)(function (m) {
            return function (a) {
                return insert(dictOrd)(f(a))(m);
            };
        })(empty);
    };
};
let mapMaybe = function (dictOrd) {
    return function (f) {
        return Data_Foldable.foldr(foldableSet)(function (a) {
            return function (acc) {
                return Data_Maybe.maybe(acc)(function (b) {
                    return insert(dictOrd)(b)(acc);
                })(f(a));
            };
        })(empty);
    };
};
let monoidSet = function (dictOrd) {
    return new Data_Monoid.Monoid(function () {
        return semigroupSet(dictOrd);
    }, empty);
};
let unions = function (dictFoldable) {
    return function (dictOrd) {
        return Data_Foldable.foldl(dictFoldable)(union(dictOrd))(empty);
    };
};
let $$delete = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map_Internal["delete"](dictOrd)(a)(v);
        };
    };
};
let difference = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(data.flip($$delete(dictOrd)))(s1)(toList(s2));
        };
    };
};
let subset = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return isEmpty(difference(dictOrd)(s1)(s2));
        };
    };
};
let properSubset = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return subset(dictOrd)(s1)(s2) && data.notEq(eqSet(dictOrd.Eq0()))(s1)(s2);
        };
    };
};
let checkValid = function (v) {
    return Data_Map_Internal.checkValid(v);
};

module.exports = {
    fromFoldable: fromFoldable,
    toUnfoldable: toUnfoldable,
    empty: empty,
    isEmpty: isEmpty,
    singleton: singleton,
    map: map,
    checkValid: checkValid,
    insert: insert,
    member: member,
    "delete": $$delete,
    size: size,
    findMin: findMin,
    findMax: findMax,
    union: union,
    unions: unions,
    difference: difference,
    subset: subset,
    properSubset: properSubset,
    intersection: intersection,
    filter: filter,
    mapMaybe: mapMaybe,
    eqSet: eqSet,
    eq1Set: eq1Set,
    showSet: showSet,
    ordSet: ordSet,
    ord1Set: ord1Set,
    monoidSet: monoidSet,
    semigroupSet: semigroupSet,
    foldableSet: foldableSet
};
