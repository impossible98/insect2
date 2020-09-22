let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Set = require("../Data.Set/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


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


let NonEmptySet = function (x) {
    return x;
};
let unionSet = function (dictOrd) {
    return function (s1) {
        return function (v) {
            return Data_Semigroup.append(Data_Set.semigroupSet(dictOrd))(s1)(v);
        };
    };
};
let toUnfoldable1 = function (dictUnfoldable1) {
    return function (v) {
        let go = function (v1) {
            if (v1 instanceof Data_List_Types.Cons && v1.value1 instanceof Data_List_Types.Nil) {
                return new Data_Tuple.Tuple(v1.value0, Data_Maybe.Nothing.value);
            };
            if (v1 instanceof Data_List_Types.Cons) {
                return new Data_Tuple.Tuple(v1.value0, new Data_Maybe.Just(v1.value1));
            };
            throw new Error("Failed pattern match at Data.Set.NonEmpty (line 93, column 24 - line 95, column 38): " + [ v1.constructor.name ]);
        };
        return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go)(Data_Set.toUnfoldable(Data_List_Types.unfoldableList)(v));
    };
};
let toUnfoldable = function (dictUnfoldable) {
    return function (v) {
        return Data_Set.toUnfoldable(dictUnfoldable)(v);
    };
};
let toSet = function (v) {
    return v;
};
let subset = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return Data_Set.subset(dictOrd)(v)(v1);
        };
    };
};
let size = function (v) {
    return Data_Set.size(v);
};
let singleton = function (a) {
    return Data_Set.singleton(a);
};
let showNonEmptySet = function (dictShow) {
    return new Data_Show.Show(function (s) {
        return "(fromFoldable1 " + (Data_Show.show(Data_List_Types.showNonEmptyList(dictShow))(toUnfoldable1(Data_List_Types.unfoldable1NonEmptyList)(s)) + ")");
    });
};
let semigroupNonEmptySet = function (dictOrd) {
    return Data_Set.semigroupSet(dictOrd);
};
let properSubset = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return Data_Set.properSubset(dictOrd)(v)(v1);
        };
    };
};
let ordNonEmptySet = function (dictOrd) {
    return Data_Set.ordSet(dictOrd);
};
let ord1NonEmptySet = Data_Set.ord1Set;
let min = function (v) {
    return Data_Maybe.fromJust()(Data_Set.findMin(v));
};
let member = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Set.member(dictOrd)(a)(v);
        };
    };
};
let max = function (v) {
    return Data_Maybe.fromJust()(Data_Set.findMax(v));
};
let mapMaybe = function (dictOrd) {
    return function (f) {
        return function (v) {
            return Data_Set.mapMaybe(dictOrd)(f)(v);
        };
    };
};
let map = function (dictOrd) {
    return function (f) {
        return function (v) {
            return Data_Set.map(dictOrd)(f)(v);
        };
    };
};
let insert = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Set.insert(dictOrd)(a)(v);
        };
    };
};
let fromSet = function (s) {
    let $77 = Data_Set.isEmpty(s);
    if ($77) {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just(s);
};
let intersection = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return fromSet(Data_Set.intersection(dictOrd)(v)(v1));
        };
    };
};
let fromFoldable1 = function (dictFoldable1) {
    return function (dictOrd) {
        return Data_Semigroup_Foldable.foldMap1(dictFoldable1)(semigroupNonEmptySet(dictOrd))(singleton);
    };
};
let fromFoldable = function (dictFoldable) {
    return function (dictOrd) {
        let $86 = Data_Set.fromFoldable(dictFoldable)(dictOrd);
        return function ($87) {
            return fromSet($86($87));
        };
    };
};
let foldableNonEmptySet = Data_Set.foldableSet;
let foldable1NonEmptySet = new Data_Semigroup_Foldable.Foldable1(function () {
    return foldableNonEmptySet;
}, function (dictSemigroup) {
    return Data_Semigroup_Foldable.foldMap1(foldable1NonEmptySet)(dictSemigroup)(identity(categoryFn));
}, function (dictSemigroup) {
    return function (f) {
        let $88 = Data_Semigroup_Foldable.foldMap1(Data_List_Types.foldable1NonEmptyList)(dictSemigroup)(f);
        let $89 = toUnfoldable1(Data_List_Types.unfoldable1NonEmptyList);
        return function ($90) {
            return $88($89($90));
        };
    };
});
let filter = function (dictOrd) {
    return function (f) {
        return function (v) {
            return Data_Set.filter(dictOrd)(f)(v);
        };
    };
};
let eqNonEmptySet = function (dictEq) {
    return Data_Set.eqSet(dictEq);
};
let eq1NonEmptySet = Data_Set.eq1Set;
let difference = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return fromSet(Data_Set.difference(dictOrd)(v)(v1));
        };
    };
};
let $$delete = function (dictOrd) {
    return function (a) {
        return function (v) {
            return fromSet(Data_Set["delete"](dictOrd)(a)(v));
        };
    };
};
let cons = function (dictOrd) {
    return function (a) {
        let $91 = Data_Set.insert(dictOrd)(a);
        return function ($92) {
            return NonEmptySet($91($92));
        };
    };
};
module.exports = {
    singleton: singleton,
    cons: cons,
    fromSet: fromSet,
    fromFoldable: fromFoldable,
    fromFoldable1: fromFoldable1,
    toSet: toSet,
    toUnfoldable: toUnfoldable,
    toUnfoldable1: toUnfoldable1,
    map: map,
    member: member,
    insert: insert,
    "delete": $$delete,
    size: size,
    min: min,
    max: max,
    unionSet: unionSet,
    difference: difference,
    subset: subset,
    properSubset: properSubset,
    intersection: intersection,
    filter: filter,
    mapMaybe: mapMaybe,
    eqNonEmptySet: eqNonEmptySet,
    eq1NonEmptySet: eq1NonEmptySet,
    ordNonEmptySet: ordNonEmptySet,
    ord1NonEmptySet: ord1NonEmptySet,
    semigroupNonEmptySet: semigroupNonEmptySet,
    foldableNonEmptySet: foldableNonEmptySet,
    foldable1NonEmptySet: foldable1NonEmptySet,
    showNonEmptySet: showNonEmptySet
};
