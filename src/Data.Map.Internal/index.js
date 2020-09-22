const control = require("../control");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Lazy = require("../Data.List.Lazy/index.js");
let Data_List_Lazy_Types = require("../Data.List.Lazy.Types/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");
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

let Leaf = (function () {
    function Leaf() {

    };
    Leaf.value = new Leaf();
    return Leaf;
})();
let Two = (function () {
    function Two(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Two.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Two(value0, value1, value2, value3);
                };
            };
        };
    };
    return Two;
})();
let Three = (function () {
    function Three(value0, value1, value2, value3, value4, value5, value6) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
        this.value6 = value6;
    };
    Three.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return function (value6) {
                                return new Three(value0, value1, value2, value3, value4, value5, value6);
                            };
                        };
                    };
                };
            };
        };
    };
    return Three;
})();
let TwoLeft = (function () {
    function TwoLeft(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoLeft(value0, value1, value2);
            };
        };
    };
    return TwoLeft;
})();
let TwoRight = (function () {
    function TwoRight(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoRight(value0, value1, value2);
            };
        };
    };
    return TwoRight;
})();
let ThreeLeft = (function () {
    function ThreeLeft(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeLeft(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    return ThreeLeft;
})();
let ThreeMiddle = (function () {
    function ThreeMiddle(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeMiddle.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeMiddle(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    return ThreeMiddle;
})();
let ThreeRight = (function () {
    function ThreeRight(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeRight(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    return ThreeRight;
})();
let KickUp = (function () {
    function KickUp(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    KickUp.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new KickUp(value0, value1, value2, value3);
                };
            };
        };
    };
    return KickUp;
})();
let values = function (v) {
    if (v instanceof Leaf) {
        return Data_List_Types.Nil.value;
    };
    if (v instanceof Two) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(control.pure(Data_List_Types.applicativeList)(v.value2))(values(v.value3)));
    };
    if (v instanceof Three) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(control.pure(Data_List_Types.applicativeList)(v.value2))(Data_Semigroup.append(Data_List_Types.semigroupList)(values(v.value3))(Data_Semigroup.append(Data_List_Types.semigroupList)(control.pure(Data_List_Types.applicativeList)(v.value5))(values(v.value6)))));
    };
    throw new Error("Failed pattern match at Data.Map.Internal (line 612, column 1 - line 612, column 40): " + [ v.constructor.name ]);
};
let size = function (v) {
    if (v instanceof Leaf) {
        return 0;
    };
    if (v instanceof Two) {
        return (1 + size(v.value0) | 0) + size(v.value3) | 0;
    };
    if (v instanceof Three) {
        return ((2 + size(v.value0) | 0) + size(v.value3) | 0) + size(v.value6) | 0;
    };
    throw new Error("Failed pattern match at Data.Map.Internal (line 662, column 1 - line 662, column 35): " + [ v.constructor.name ]);
};
let singleton = function (k) {
    return function (v) {
        return new Two(Leaf.value, k, v, Leaf.value);
    };
};
let toUnfoldable = function (dictUnfoldable) {
    return function (m) {
        let go = function ($copy_v) {
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v) {
                if (v instanceof Data_List_Types.Nil) {
                    $tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof Leaf) {
                        $copy_v = v.value1;
                        return;
                    };
                    if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
                        $tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), v.value1));
                    };
                    if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
                        $tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), new Data_List_Types.Cons(v.value0.value3, v.value1)));
                    };
                    if (v.value0 instanceof Two) {
                        $copy_v = new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(singleton(v.value0.value1)(v.value0.value2), new Data_List_Types.Cons(v.value0.value3, v.value1)));
                        return;
                    };
                    if (v.value0 instanceof Three) {
                        $copy_v = new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(singleton(v.value0.value1)(v.value0.value2), new Data_List_Types.Cons(v.value0.value3, new Data_List_Types.Cons(singleton(v.value0.value4)(v.value0.value5), new Data_List_Types.Cons(v.value0.value6, v.value1)))));
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 577, column 18 - line 586, column 71): " + [ v.value0.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 576, column 3 - line 576, column 19): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($copy_v);
            };
            return $tco_result;
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(go)(new Data_List_Types.Cons(m, Data_List_Types.Nil.value));
    };
};
let toAscArray = toUnfoldable(Data_Unfoldable.unfoldableArray);
let toUnfoldableUnordered = function (dictUnfoldable) {
    return function (m) {
        let go = function ($copy_v) {
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v) {
                if (v instanceof Data_List_Types.Nil) {
                    $tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof Leaf) {
                        $copy_v = v.value1;
                        return;
                    };
                    if (v.value0 instanceof Two) {
                        $tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(v.value0.value3, v.value1))));
                    };
                    if (v.value0 instanceof Three) {
                        $tco_done = true;
                        return Data_Maybe.Just.create(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value1, v.value0.value2), new Data_List_Types.Cons(singleton(v.value0.value4)(v.value0.value5), new Data_List_Types.Cons(v.value0.value0, new Data_List_Types.Cons(v.value0.value3, new Data_List_Types.Cons(v.value0.value6, v.value1))))));
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 598, column 18 - line 603, column 77): " + [ v.value0.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 597, column 3 - line 597, column 19): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($copy_v);
            };
            return $tco_result;
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(go)(new Data_List_Types.Cons(m, Data_List_Types.Nil.value));
    };
};
let showTree = function (dictShow) {
    return function (dictShow1) {
        return function (v) {
            if (v instanceof Leaf) {
                return "Leaf";
            };
            if (v instanceof Two) {
                return "Two (" + (showTree(dictShow)(dictShow1)(v.value0) + (") (" + (Data_Show.show(dictShow)(v.value1) + (") (" + (Data_Show.show(dictShow1)(v.value2) + (") (" + (showTree(dictShow)(dictShow1)(v.value3) + ")")))))));
            };
            if (v instanceof Three) {
                return "Three (" + (showTree(dictShow)(dictShow1)(v.value0) + (") (" + (Data_Show.show(dictShow)(v.value1) + (") (" + (Data_Show.show(dictShow1)(v.value2) + (") (" + (showTree(dictShow)(dictShow1)(v.value3) + (") (" + (Data_Show.show(dictShow)(v.value4) + (") (" + (Data_Show.show(dictShow1)(v.value5) + (") (" + (showTree(dictShow)(dictShow1)(v.value6) + ")")))))))))))));
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 153, column 1 - line 153, column 62): " + [ v.constructor.name ]);
        };
    };
};
let showMap = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (m) {
            return "(fromFoldable " + (Data_Show.show(Data_Show.showArray(Data_Tuple.showTuple(dictShow)(dictShow1)))(toAscArray(m)) + ")");
        });
    };
};
let lookupLE = function (dictOrd) {
    return function (k) {
        let comp = Data_Ord.compare(dictOrd);
        let go = function (v) {
            if (v instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Two) {
                let v2 = comp(k)(v.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v.value1,
                        value: v.value2
                    });
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value1,
                        value: v.value2
                    })(go(v.value3)));
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return go(v.value0);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 225, column 33 - line 228, column 20): " + [ v2.constructor.name ]);
            };
            if (v instanceof Three) {
                let v3 = comp(k)(v.value4);
                if (v3 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v.value4,
                        value: v.value5
                    });
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value4,
                        value: v.value5
                    })(go(v.value6)));
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return go(new Two(v.value0, v.value1, v.value2, v.value3));
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 229, column 45 - line 232, column 36): " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 224, column 5 - line 224, column 22): " + [ v.constructor.name ]);
        };
        return go;
    };
};
let lookupGE = function (dictOrd) {
    return function (k) {
        let comp = Data_Ord.compare(dictOrd);
        let go = function (v) {
            if (v instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Two) {
                let v2 = comp(k)(v.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v.value1,
                        value: v.value2
                    });
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value1,
                        value: v.value2
                    })(go(v.value0)));
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return go(v.value3);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 259, column 33 - line 262, column 21): " + [ v2.constructor.name ]);
            };
            if (v instanceof Three) {
                let v3 = comp(k)(v.value1);
                if (v3 instanceof Data_Ordering.EQ) {
                    return new Data_Maybe.Just({
                        key: v.value1,
                        value: v.value2
                    });
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value1,
                        value: v.value2
                    })(go(v.value0)));
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return go(new Two(v.value3, v.value4, v.value5, v.value6));
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 263, column 45 - line 266, column 37): " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 258, column 5 - line 258, column 22): " + [ v.constructor.name ]);
        };
        return go;
    };
};
let lookup = function (dictOrd) {
    return function (k) {
        let comp = Data_Ord.compare(dictOrd);
        let go = function ($copy_v) {
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v) {
                if (v instanceof Leaf) {
                    $tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                if (v instanceof Two) {
                    let v2 = comp(k)(v.value1);
                    if (v2 instanceof Data_Ordering.EQ) {
                        $tco_done = true;
                        return new Data_Maybe.Just(v.value2);
                    };
                    if (v2 instanceof Data_Ordering.LT) {
                        $copy_v = v.value0;
                        return;
                    };
                    $copy_v = v.value3;
                    return;
                };
                if (v instanceof Three) {
                    let v3 = comp(k)(v.value1);
                    if (v3 instanceof Data_Ordering.EQ) {
                        $tco_done = true;
                        return new Data_Maybe.Just(v.value2);
                    };
                    let v4 = comp(k)(v.value4);
                    if (v4 instanceof Data_Ordering.EQ) {
                        $tco_done = true;
                        return new Data_Maybe.Just(v.value5);
                    };
                    if (v3 instanceof Data_Ordering.LT) {
                        $copy_v = v.value0;
                        return;
                    };
                    if (v4 instanceof Data_Ordering.GT) {
                        $copy_v = v.value6;
                        return;
                    };
                    $copy_v = v.value3;
                    return;
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 200, column 5 - line 200, column 22): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($copy_v);
            };
            return $tco_result;
        };
        return go;
    };
};
let member = function (dictOrd) {
    return function (k) {
        return function (m) {
            return Data_Maybe.isJust(lookup(dictOrd)(k)(m));
        };
    };
};
let keys = function (v) {
    if (v instanceof Leaf) {
        return Data_List_Types.Nil.value;
    };
    if (v instanceof Two) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(keys(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(control.pure(Data_List_Types.applicativeList)(v.value1))(keys(v.value3)));
    };
    if (v instanceof Three) {
        return Data_Semigroup.append(Data_List_Types.semigroupList)(keys(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(control.pure(Data_List_Types.applicativeList)(v.value1))(Data_Semigroup.append(Data_List_Types.semigroupList)(keys(v.value3))(Data_Semigroup.append(Data_List_Types.semigroupList)(control.pure(Data_List_Types.applicativeList)(v.value4))(keys(v.value6)))));
    };
    throw new Error("Failed pattern match at Data.Map.Internal (line 606, column 1 - line 606, column 38): " + [ v.constructor.name ]);
};
let isSubmap = function (dictOrd) {
    return function (dictEq) {
        return function (m1) {
            return function (m2) {
                let f = function (v) {
                    return data.eq(Data_Maybe.eqMaybe(dictEq))(lookup(dictOrd)(v.value0)(m2))(new Data_Maybe.Just(v.value1));
                };
                return Data_Foldable.all(Data_List_Lazy_Types.foldableList)(Data_HeytingAlgebra.heytingAlgebraBoolean)(f)(toUnfoldable(Data_List_Lazy_Types.unfoldableList)(m1));
            };
        };
    };
};
let isEmpty = function (v) {
    if (v instanceof Leaf) {
        return true;
    };
    return false;
};
let functorMap = new data.Functor(function (v) {
    return function (v1) {
        if (v1 instanceof Leaf) {
            return Leaf.value;
        };
        if (v1 instanceof Two) {
            return new Two(data.map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), data.map(functorMap)(v)(v1.value3));
        };
        if (v1 instanceof Three) {
            return new Three(data.map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), data.map(functorMap)(v)(v1.value3), v1.value4, v(v1.value5), data.map(functorMap)(v)(v1.value6));
        };
        throw new Error("Failed pattern match at Data.Map.Internal (line 96, column 1 - line 99, column 110): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let functorWithIndexMap = new Data_FunctorWithIndex.FunctorWithIndex(function () {
    return functorMap;
}, function (v) {
    return function (v1) {
        if (v1 instanceof Leaf) {
            return Leaf.value;
        };
        if (v1 instanceof Two) {
            return new Two(Data_FunctorWithIndex.mapWithIndex(functorWithIndexMap)(v)(v1.value0), v1.value1, v(v1.value1)(v1.value2), Data_FunctorWithIndex.mapWithIndex(functorWithIndexMap)(v)(v1.value3));
        };
        if (v1 instanceof Three) {
            return new Three(Data_FunctorWithIndex.mapWithIndex(functorWithIndexMap)(v)(v1.value0), v1.value1, v(v1.value1)(v1.value2), Data_FunctorWithIndex.mapWithIndex(functorWithIndexMap)(v)(v1.value3), v1.value4, v(v1.value4)(v1.value5), Data_FunctorWithIndex.mapWithIndex(functorWithIndexMap)(v)(v1.value6));
        };
        throw new Error("Failed pattern match at Data.Map.Internal (line 101, column 1 - line 104, column 152): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let fromZipper = function ($copy_dictOrd) {
    return function ($copy_v) {
        return function ($copy_tree) {
            let $tco_var_dictOrd = $copy_dictOrd;
            let $tco_var_v = $copy_v;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(dictOrd, v, tree) {
                if (v instanceof Data_List_Types.Nil) {
                    $tco_done = true;
                    return tree;
                };
                if (v instanceof Data_List_Types.Cons) {
                    if (v.value0 instanceof TwoLeft) {
                        $tco_var_dictOrd = dictOrd;
                        $tco_var_v = v.value1;
                        $copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
                        return;
                    };
                    if (v.value0 instanceof TwoRight) {
                        $tco_var_dictOrd = dictOrd;
                        $tco_var_v = v.value1;
                        $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
                        return;
                    };
                    if (v.value0 instanceof ThreeLeft) {
                        $tco_var_dictOrd = dictOrd;
                        $tco_var_v = v.value1;
                        $copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
                        return;
                    };
                    if (v.value0 instanceof ThreeMiddle) {
                        $tco_var_dictOrd = dictOrd;
                        $tco_var_v = v.value1;
                        $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
                        return;
                    };
                    if (v.value0 instanceof ThreeRight) {
                        $tco_var_dictOrd = dictOrd;
                        $tco_var_v = v.value1;
                        $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 418, column 3 - line 423, column 88): " + [ v.value0.constructor.name ]);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 415, column 1 - line 415, column 80): " + [ v.constructor.name, tree.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
            };
            return $tco_result;
        };
    };
};
let insert = function (dictOrd) {
    return function (k) {
        return function (v) {
            let up = function ($copy_v1) {
                return function ($copy_v2) {
                    let $tco_var_v1 = $copy_v1;
                    let $tco_done = false;
                    let $tco_result;
                    function $tco_loop(v1, v2) {
                        if (v1 instanceof Data_List_Types.Nil) {
                            $tco_done = true;
                            return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
                        };
                        if (v1 instanceof Data_List_Types.Cons) {
                            if (v1.value0 instanceof TwoLeft) {
                                $tco_done = true;
                                return fromZipper(dictOrd)(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                            };
                            if (v1.value0 instanceof TwoRight) {
                                $tco_done = true;
                                return fromZipper(dictOrd)(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                            };
                            if (v1.value0 instanceof ThreeLeft) {
                                $tco_var_v1 = v1.value1;
                                $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                                return;
                            };
                            if (v1.value0 instanceof ThreeMiddle) {
                                $tco_var_v1 = v1.value1;
                                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                                return;
                            };
                            if (v1.value0 instanceof ThreeRight) {
                                $tco_var_v1 = v1.value1;
                                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                                return;
                            };
                            throw new Error("Failed pattern match at Data.Map.Internal (line 454, column 5 - line 459, column 108): " + [ v1.value0.constructor.name, v2.constructor.name ]);
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 451, column 3 - line 451, column 56): " + [ v1.constructor.name, v2.constructor.name ]);
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($tco_var_v1, $copy_v2);
                    };
                    return $tco_result;
                };
            };
            let comp = Data_Ord.compare(dictOrd);
            let down = function ($copy_ctx) {
                return function ($copy_v1) {
                    let $tco_var_ctx = $copy_ctx;
                    let $tco_done = false;
                    let $tco_result;
                    function $tco_loop(ctx, v1) {
                        if (v1 instanceof Leaf) {
                            $tco_done = true;
                            return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
                        };
                        if (v1 instanceof Two) {
                            let v2 = comp(k)(v1.value1);
                            if (v2 instanceof Data_Ordering.EQ) {
                                $tco_done = true;
                                return fromZipper(dictOrd)(ctx)(new Two(v1.value0, k, v, v1.value3));
                            };
                            if (v2 instanceof Data_Ordering.LT) {
                                $tco_var_ctx = new Data_List_Types.Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                                $copy_v1 = v1.value0;
                                return;
                            };
                            $tco_var_ctx = new Data_List_Types.Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
                            $copy_v1 = v1.value3;
                            return;
                        };
                        if (v1 instanceof Three) {
                            let v3 = comp(k)(v1.value1);
                            if (v3 instanceof Data_Ordering.EQ) {
                                $tco_done = true;
                                return fromZipper(dictOrd)(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
                            };
                            let v4 = comp(k)(v1.value4);
                            if (v4 instanceof Data_Ordering.EQ) {
                                $tco_done = true;
                                return fromZipper(dictOrd)(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
                            };
                            if (v3 instanceof Data_Ordering.LT) {
                                $tco_var_ctx = new Data_List_Types.Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                                $copy_v1 = v1.value0;
                                return;
                            };
                            if (v3 instanceof Data_Ordering.GT && v4 instanceof Data_Ordering.LT) {
                                $tco_var_ctx = new Data_List_Types.Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                                $copy_v1 = v1.value3;
                                return;
                            };
                            $tco_var_ctx = new Data_List_Types.Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
                            $copy_v1 = v1.value6;
                            return;
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 434, column 3 - line 434, column 55): " + [ ctx.constructor.name, v1.constructor.name ]);
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
                    };
                    return $tco_result;
                };
            };
            return down(Data_List_Types.Nil.value);
        };
    };
};
let pop = function (dictOrd) {
    return function (k) {
        let up = function ($copy_ctxs) {
            return function ($copy_tree) {
                let $tco_var_ctxs = $copy_ctxs;
                let $tco_done = false;
                let $tco_result;
                function $tco_loop(ctxs, tree) {
                    if (ctxs instanceof Data_List_Types.Nil) {
                        $tco_done = true;
                        return tree;
                    };
                    if (ctxs instanceof Data_List_Types.Cons) {
                        if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
                        };
                        if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
                        };
                        if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                            $tco_var_ctxs = ctxs.value1;
                            $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                            return;
                        };
                        if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                            $tco_var_ctxs = ctxs.value1;
                            $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                            return;
                        };
                        if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
                        };
                        if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
                        };
                        if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                        };
                        if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                        };
                        if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
                        };
                        if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                        };
                        if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                        };
                        if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
                        };
                        if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
                        };
                        if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                        };
                        if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                        };
                        if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
                        };
                        if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                            $tco_done = true;
                            return fromZipper(dictOrd)(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 511, column 9 - line 528, column 136): " + [ ctxs.value0.constructor.name, tree.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 508, column 5 - line 528, column 136): " + [ ctxs.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
                };
                return $tco_result;
            };
        };
        let removeMaxNode = function ($copy_ctx) {
            return function ($copy_m) {
                let $tco_var_ctx = $copy_ctx;
                let $tco_done = false;
                let $tco_result;
                function $tco_loop(ctx, m) {
                    if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
                        $tco_done = true;
                        return up(ctx)(Leaf.value);
                    };
                    if (m instanceof Two) {
                        $tco_var_ctx = new Data_List_Types.Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                        $copy_m = m.value3;
                        return;
                    };
                    if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
                        $tco_done = true;
                        return up(new Data_List_Types.Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
                    };
                    if (m instanceof Three) {
                        $tco_var_ctx = new Data_List_Types.Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                        $copy_m = m.value6;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 540, column 5 - line 544, column 107): " + [ m.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_ctx, $copy_m);
                };
                return $tco_result;
            };
        };
        let maxNode = function ($copy_m) {
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(m) {
                if (m instanceof Two && m.value3 instanceof Leaf) {
                    $tco_done = true;
                    return {
                        key: m.value1,
                        value: m.value2
                    };
                };
                if (m instanceof Two) {
                    $copy_m = m.value3;
                    return;
                };
                if (m instanceof Three && m.value6 instanceof Leaf) {
                    $tco_done = true;
                    return {
                        key: m.value4,
                        value: m.value5
                    };
                };
                if (m instanceof Three) {
                    $copy_m = m.value6;
                    return;
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 531, column 33 - line 535, column 45): " + [ m.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($copy_m);
            };
            return $tco_result;
        };
        let comp = Data_Ord.compare(dictOrd);
        let down = function ($copy_ctx) {
            return function ($copy_m) {
                let $tco_var_ctx = $copy_ctx;
                let $tco_done = false;
                let $tco_result;
                function $tco_loop(ctx, m) {
                    if (m instanceof Leaf) {
                        $tco_done = true;
                        return Data_Maybe.Nothing.value;
                    };
                    if (m instanceof Two) {
                        let v = comp(k)(m.value1);
                        if (m.value3 instanceof Leaf && v instanceof Data_Ordering.EQ) {
                            $tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, up(ctx)(Leaf.value)));
                        };
                        if (v instanceof Data_Ordering.EQ) {
                            let max = maxNode(m.value0);
                            $tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, removeMaxNode(new Data_List_Types.Cons(new TwoLeft(max.key, max.value, m.value3), ctx))(m.value0)));
                        };
                        if (v instanceof Data_Ordering.LT) {
                            $tco_var_ctx = new Data_List_Types.Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                            $copy_m = m.value0;
                            return;
                        };
                        $tco_var_ctx = new Data_List_Types.Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                        $copy_m = m.value3;
                        return;
                    };
                    if (m instanceof Three) {
                        let leaves = (function () {
                            if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                                return true;
                            };
                            return false;
                        })();
                        let v = comp(k)(m.value4);
                        let v3 = comp(k)(m.value1);
                        if (leaves && v3 instanceof Data_Ordering.EQ) {
                            $tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
                        };
                        if (leaves && v instanceof Data_Ordering.EQ) {
                            $tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value5, fromZipper(dictOrd)(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
                        };
                        if (v3 instanceof Data_Ordering.EQ) {
                            let max = maxNode(m.value0);
                            $tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value2, removeMaxNode(new Data_List_Types.Cons(new ThreeLeft(max.key, max.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
                        };
                        if (v instanceof Data_Ordering.EQ) {
                            let max = maxNode(m.value3);
                            $tco_done = true;
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(m.value5, removeMaxNode(new Data_List_Types.Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max.key, max.value, m.value6), ctx))(m.value3)));
                        };
                        if (v3 instanceof Data_Ordering.LT) {
                            $tco_var_ctx = new Data_List_Types.Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                            $copy_m = m.value0;
                            return;
                        };
                        if (v3 instanceof Data_Ordering.GT && v instanceof Data_Ordering.LT) {
                            $tco_var_ctx = new Data_List_Types.Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                            $copy_m = m.value3;
                            return;
                        };
                        $tco_var_ctx = new Data_List_Types.Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                        $copy_m = m.value6;
                        return;
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 481, column 34 - line 504, column 80): " + [ m.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_ctx, $copy_m);
                };
                return $tco_result;
            };
        };
        return down(Data_List_Types.Nil.value);
    };
};
let foldableMap = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (m) {
            return Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(f)(values(m));
        };
    };
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(f)(z)(values(m));
        };
    };
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldr(Data_List_Types.foldableList)(f)(z)(values(m));
        };
    };
});
let traversableMap = new Data_Traversable.Traversable(function () {
    return foldableMap;
}, function () {
    return functorMap;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableMap)(dictApplicative)(identity(categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            if (v instanceof Leaf) {
                return control.pure(dictApplicative)(Leaf.value);
            };
            if (v instanceof Two) {
                return apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(Two.create)(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value0)))(control.pure(dictApplicative)(v.value1)))(f(v.value2)))(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value3));
            };
            if (v instanceof Three) {
                return apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(Three.create)(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value0)))(control.pure(dictApplicative)(v.value1)))(f(v.value2)))(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value3)))(control.pure(dictApplicative)(v.value4)))(f(v.value5)))(Data_Traversable.traverse(traversableMap)(dictApplicative)(f)(v.value6));
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 119, column 1 - line 134, column 31): " + [ f.constructor.name, v.constructor.name ]);
        };
    };
});
let foldSubmap = function (dictOrd) {
    return function (dictMonoid) {
        return function (kmin) {
            return function (kmax) {
                return function (f) {
                    let tooSmall = (function () {
                        if (kmin instanceof Data_Maybe.Just) {
                            return function (k) {
                                return Data_Ord.lessThan(dictOrd)(k)(kmin.value0);
                            };
                        };
                        if (kmin instanceof Data_Maybe.Nothing) {
                            return data._const(false);
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 319, column 7 - line 323, column 22): " + [ kmin.constructor.name ]);
                    })();
                    let tooLarge = (function () {
                        if (kmax instanceof Data_Maybe.Just) {
                            return function (k) {
                                return Data_Ord.greaterThan(dictOrd)(k)(kmax.value0);
                            };
                        };
                        if (kmax instanceof Data_Maybe.Nothing) {
                            return data._const(false);
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 326, column 7 - line 330, column 22): " + [ kmax.constructor.name ]);
                    })();
                    let inBounds = (function () {
                        if (kmin instanceof Data_Maybe.Just && kmax instanceof Data_Maybe.Just) {
                            return function (k) {
                                return Data_Ord.lessThanOrEq(dictOrd)(kmin.value0)(k) && Data_Ord.lessThanOrEq(dictOrd)(k)(kmax.value0);
                            };
                        };
                        if (kmin instanceof Data_Maybe.Just && kmax instanceof Data_Maybe.Nothing) {
                            return function (k) {
                                return Data_Ord.lessThanOrEq(dictOrd)(kmin.value0)(k);
                            };
                        };
                        if (kmin instanceof Data_Maybe.Nothing && kmax instanceof Data_Maybe.Just) {
                            return function (k) {
                                return Data_Ord.lessThanOrEq(dictOrd)(k)(kmax.value0);
                            };
                        };
                        if (kmin instanceof Data_Maybe.Nothing && kmax instanceof Data_Maybe.Nothing) {
                            return data._const(true);
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 333, column 7 - line 341, column 21): " + [ kmin.constructor.name, kmax.constructor.name ]);
                    })();
                    let go = function (v) {
                        if (v instanceof Leaf) {
                            return Data_Monoid.mempty(dictMonoid);
                        };
                        if (v instanceof Two) {
                            return Data_Semigroup.append(dictMonoid.Semigroup0())((function () {
                                let $633 = tooSmall(v.value1);
                                if ($633) {
                                    return Data_Monoid.mempty(dictMonoid);
                                };
                                return go(v.value0);
                            })())(Data_Semigroup.append(dictMonoid.Semigroup0())((function () {
                                let $634 = inBounds(v.value1);
                                if ($634) {
                                    return f(v.value1)(v.value2);
                                };
                                return Data_Monoid.mempty(dictMonoid);
                            })())((function () {
                                let $635 = tooLarge(v.value1);
                                if ($635) {
                                    return Data_Monoid.mempty(dictMonoid);
                                };
                                return go(v.value3);
                            })()));
                        };
                        if (v instanceof Three) {
                            return Data_Semigroup.append(dictMonoid.Semigroup0())((function () {
                                let $640 = tooSmall(v.value1);
                                if ($640) {
                                    return Data_Monoid.mempty(dictMonoid);
                                };
                                return go(v.value0);
                            })())(Data_Semigroup.append(dictMonoid.Semigroup0())((function () {
                                let $641 = inBounds(v.value1);
                                if ($641) {
                                    return f(v.value1)(v.value2);
                                };
                                return Data_Monoid.mempty(dictMonoid);
                            })())(Data_Semigroup.append(dictMonoid.Semigroup0())((function () {
                                let $642 = tooSmall(v.value4) || tooLarge(v.value1);
                                if ($642) {
                                    return Data_Monoid.mempty(dictMonoid);
                                };
                                return go(v.value3);
                            })())(Data_Semigroup.append(dictMonoid.Semigroup0())((function () {
                                let $643 = inBounds(v.value4);
                                if ($643) {
                                    return f(v.value4)(v.value5);
                                };
                                return Data_Monoid.mempty(dictMonoid);
                            })())((function () {
                                let $644 = tooLarge(v.value4);
                                if ($644) {
                                    return Data_Monoid.mempty(dictMonoid);
                                };
                                return go(v.value6);
                            })()))));
                        };
                        throw new Error("Failed pattern match at Data.Map.Internal (line 359, column 10 - line 371, column 54): " + [ v.constructor.name ]);
                    };
                    return go;
                };
            };
        };
    };
};
let findMin = (function () {
    let go = function ($copy_v) {
        return function ($copy_v1) {
            let $tco_var_v = $copy_v;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v, v1) {
                if (v1 instanceof Leaf) {
                    $tco_done = true;
                    return v;
                };
                if (v1 instanceof Two) {
                    $tco_var_v = new Data_Maybe.Just({
                        key: v1.value1,
                        value: v1.value2
                    });
                    $copy_v1 = v1.value0;
                    return;
                };
                if (v1 instanceof Three) {
                    $tco_var_v = new Data_Maybe.Just({
                        key: v1.value1,
                        value: v1.value2
                    });
                    $copy_v1 = v1.value0;
                    return;
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 297, column 5 - line 297, column 22): " + [ v.constructor.name, v1.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
            };
            return $tco_result;
        };
    };
    return go(Data_Maybe.Nothing.value);
})();
let lookupGT = function (dictOrd) {
    return function (k) {
        let comp = Data_Ord.compare(dictOrd);
        let go = function (v) {
            if (v instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Two) {
                let v2 = comp(k)(v.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return findMin(v.value3);
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value1,
                        value: v.value2
                    })(go(v.value0)));
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return go(v.value3);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 276, column 33 - line 279, column 21): " + [ v2.constructor.name ]);
            };
            if (v instanceof Three) {
                let v3 = comp(k)(v.value1);
                if (v3 instanceof Data_Ordering.EQ) {
                    return findMin(new Two(v.value3, v.value4, v.value5, v.value6));
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value1,
                        value: v.value2
                    })(go(v.value0)));
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return go(new Two(v.value3, v.value4, v.value5, v.value6));
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 280, column 45 - line 283, column 37): " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 275, column 5 - line 275, column 22): " + [ v.constructor.name ]);
        };
        return go;
    };
};
let findMax = (function () {
    let go = function ($copy_v) {
        return function ($copy_v1) {
            let $tco_var_v = $copy_v;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(v, v1) {
                if (v1 instanceof Leaf) {
                    $tco_done = true;
                    return v;
                };
                if (v1 instanceof Two) {
                    $tco_var_v = new Data_Maybe.Just({
                        key: v1.value1,
                        value: v1.value2
                    });
                    $copy_v1 = v1.value3;
                    return;
                };
                if (v1 instanceof Three) {
                    $tco_var_v = new Data_Maybe.Just({
                        key: v1.value4,
                        value: v1.value5
                    });
                    $copy_v1 = v1.value6;
                    return;
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 289, column 5 - line 289, column 22): " + [ v.constructor.name, v1.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
            };
            return $tco_result;
        };
    };
    return go(Data_Maybe.Nothing.value);
})();
let lookupLT = function (dictOrd) {
    return function (k) {
        let comp = Data_Ord.compare(dictOrd);
        let go = function (v) {
            if (v instanceof Leaf) {
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Two) {
                let v2 = comp(k)(v.value1);
                if (v2 instanceof Data_Ordering.EQ) {
                    return findMax(v.value0);
                };
                if (v2 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value1,
                        value: v.value2
                    })(go(v.value3)));
                };
                if (v2 instanceof Data_Ordering.LT) {
                    return go(v.value0);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 242, column 33 - line 245, column 20): " + [ v2.constructor.name ]);
            };
            if (v instanceof Three) {
                let v3 = comp(k)(v.value4);
                if (v3 instanceof Data_Ordering.EQ) {
                    return findMax(new Two(v.value0, v.value1, v.value2, v.value3));
                };
                if (v3 instanceof Data_Ordering.GT) {
                    return Data_Maybe.Just.create(Data_Maybe.fromMaybe({
                        key: v.value4,
                        value: v.value5
                    })(go(v.value6)));
                };
                if (v3 instanceof Data_Ordering.LT) {
                    return go(new Two(v.value0, v.value1, v.value2, v.value3));
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 246, column 45 - line 249, column 36): " + [ v3.constructor.name ]);
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [ v.constructor.name ]);
        };
        return go;
    };
};
let eqMap = function (dictEq) {
    return function (dictEq1) {
        return new data.Eq(function (m1) {
            return function (m2) {
                return data.eq(data.eqArray(Data_Tuple.eqTuple(dictEq)(dictEq1)))(toAscArray(m1))(toAscArray(m2));
            };
        });
    };
};
let ordMap = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqMap(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (m1) {
            return function (m2) {
                return Data_Ord.compare(Data_Ord.ordArray(Data_Tuple.ordTuple(dictOrd)(dictOrd1)))(toAscArray(m1))(toAscArray(m2));
            };
        });
    };
};
let eq1Map = function (dictEq) {
    return new data.Eq1(function (dictEq1) {
        return data.eq(eqMap(dictEq)(dictEq1));
    });
};
let ord1Map = function (dictOrd) {
    return new Data_Ord.Ord1(function () {
        return eq1Map(dictOrd.Eq0());
    }, function (dictOrd1) {
        return Data_Ord.compare(ordMap(dictOrd)(dictOrd1));
    });
};
let empty = Leaf.value;
let fromFoldable = function (dictOrd) {
    return function (dictFoldable) {
        return Data_Foldable.foldl(dictFoldable)(function (m) {
            return function (v) {
                return insert(dictOrd)(v.value0)(v.value1)(m);
            };
        })(empty);
    };
};
let filterWithKey = function (dictOrd) {
    return function (predicate) {
        let $758 = fromFoldable(dictOrd)(Data_List_Lazy_Types.foldableList);
        let $759 = Data_List_Lazy.filter(Data_Tuple.uncurry(predicate));
        let $760 = toUnfoldable(Data_List_Lazy_Types.unfoldableList);
        return function ($761) {
            return $758($759($760($761)));
        };
    };
};
let filter = function (dictOrd) {
    return function (predicate) {
        return filterWithKey(dictOrd)(data._const(predicate));
    };
};
let filterKeys = function (dictOrd) {
    return function (predicate) {
        return filterWithKey(dictOrd)(function ($762) {
            return data._const(predicate($762));
        });
    };
};
let fromFoldableWithIndex = function (dictOrd) {
    return function (dictFoldableWithIndex) {
        return Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(function (k) {
            return function (m) {
                return function (v) {
                    return insert(dictOrd)(k)(v)(m);
                };
            };
        })(empty);
    };
};
let intersectionWith = function (dictOrd) {
    return function (f) {
        return function (m1) {
            return function (m2) {
                let go = function ($copy_v) {
                    return function ($copy_v1) {
                        return function ($copy_m) {
                            let $tco_var_v = $copy_v;
                            let $tco_var_v1 = $copy_v1;
                            let $tco_done = false;
                            let $tco_result;
                            function $tco_loop(v, v1, m) {
                                if (v instanceof Data_List_Types.Nil) {
                                    $tco_done = true;
                                    return m;
                                };
                                if (v1 instanceof Data_List_Types.Nil) {
                                    $tco_done = true;
                                    return m;
                                };
                                if (v instanceof Data_List_Types.Cons && v1 instanceof Data_List_Types.Cons) {
                                    let v2 = Data_Ord.compare(dictOrd)(v.value0.value0)(v1.value0.value0);
                                    if (v2 instanceof Data_Ordering.LT) {
                                        $tco_var_v = v.value1;
                                        $tco_var_v1 = v1;
                                        $copy_m = m;
                                        return;
                                    };
                                    if (v2 instanceof Data_Ordering.EQ) {
                                        $tco_var_v = v.value1;
                                        $tco_var_v1 = v1.value1;
                                        $copy_m = insert(dictOrd)(v.value0.value0)(f(v.value0.value1)(v1.value0.value1))(m);
                                        return;
                                    };
                                    if (v2 instanceof Data_Ordering.GT) {
                                        $tco_var_v = v;
                                        $tco_var_v1 = v1.value1;
                                        $copy_m = m;
                                        return;
                                    };
                                    throw new Error("Failed pattern match at Data.Map.Internal (line 641, column 5 - line 644, column 27): " + [ v2.constructor.name ]);
                                };
                                throw new Error("Failed pattern match at Data.Map.Internal (line 638, column 3 - line 638, column 17): " + [ v.constructor.name, v1.constructor.name, m.constructor.name ]);
                            };
                            while (!$tco_done) {
                                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_m);
                            };
                            return $tco_result;
                        };
                    };
                };
                return go(toUnfoldable(Data_List_Types.unfoldableList)(m1))(toUnfoldable(Data_List_Types.unfoldableList)(m2))(empty);
            };
        };
    };
};
let intersection = function (dictOrd) {
    return intersectionWith(dictOrd)(data._const);
};
let $$delete = function (dictOrd) {
    return function (k) {
        return function (m) {
            return Data_Maybe.maybe(m)(Data_Tuple.snd)(pop(dictOrd)(k)(m));
        };
    };
};
let difference = function (dictOrd) {
    return function (m1) {
        return function (m2) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(data.flip($$delete(dictOrd)))(m1)(keys(m2));
        };
    };
};
let checkValid = function (tree) {
    let allHeights = function (v) {
        if (v instanceof Leaf) {
            return control.pure(Data_List_Types.applicativeList)(0);
        };
        if (v instanceof Two) {
            return data.map(Data_List_Types.functorList)(function (n) {
                return n + 1 | 0;
            })(Data_Semigroup.append(Data_List_Types.semigroupList)(allHeights(v.value0))(allHeights(v.value3)));
        };
        if (v instanceof Three) {
            return data.map(Data_List_Types.functorList)(function (n) {
                return n + 1 | 0;
            })(Data_Semigroup.append(Data_List_Types.semigroupList)(allHeights(v.value0))(Data_Semigroup.append(Data_List_Types.semigroupList)(allHeights(v.value3))(allHeights(v.value6))));
        };
        throw new Error("Failed pattern match at Data.Map.Internal (line 188, column 3 - line 188, column 36): " + [ v.constructor.name ]);
    };
    return Data_List.length(Data_List.nub(data.eqInt)(allHeights(tree))) === 1;
};
let asList = identity(categoryFn);
let foldableWithIndexMap = new Data_FoldableWithIndex.FoldableWithIndex(function () {
    return foldableMap;
}, function (dictMonoid) {
    return function (f) {
        return function (m) {
            return Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(Data_Tuple.uncurry(f))(asList(toUnfoldable(Data_List_Types.unfoldableList)(m)));
        };
    };
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)((function () {
                let $763 = data.flip(f);
                return function ($764) {
                    return Data_Tuple.uncurry($763($764));
                };
            })())(z)(asList(toUnfoldable(Data_List_Types.unfoldableList)(m)));
        };
    };
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldr(Data_List_Types.foldableList)(Data_Tuple.uncurry(f))(z)(asList(toUnfoldable(Data_List_Types.unfoldableList)(m)));
        };
    };
});
let mapMaybeWithKey = function (dictOrd) {
    return function (f) {
        return Data_FoldableWithIndex.foldrWithIndex(foldableWithIndexMap)(function (k) {
            return function (a) {
                return function (acc) {
                    return Data_Maybe.maybe(acc)(function (b) {
                        return insert(dictOrd)(k)(b)(acc);
                    })(f(k)(a));
                };
            };
        })(empty);
    };
};
let mapMaybe = function (dictOrd) {
    let $765 = mapMaybeWithKey(dictOrd);
    return function ($766) {
        return $765(data._const($766));
    };
};
let traversableWithIndexMap = new Data_TraversableWithIndex.TraversableWithIndex(function () {
    return foldableWithIndexMap;
}, function () {
    return functorWithIndexMap;
}, function () {
    return traversableMap;
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            if (v instanceof Leaf) {
                return control.pure(dictApplicative)(Leaf.value);
            };
            if (v instanceof Two) {
                return apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(Two.create)(Data_TraversableWithIndex.traverseWithIndex(traversableWithIndexMap)(dictApplicative)(f)(v.value0)))(control.pure(dictApplicative)(v.value1)))(f(v.value1)(v.value2)))(Data_TraversableWithIndex.traverseWithIndex(traversableWithIndexMap)(dictApplicative)(f)(v.value3));
            };
            if (v instanceof Three) {
                return apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(Three.create)(Data_TraversableWithIndex.traverseWithIndex(traversableWithIndexMap)(dictApplicative)(f)(v.value0)))(control.pure(dictApplicative)(v.value1)))(f(v.value1)(v.value2)))(Data_TraversableWithIndex.traverseWithIndex(traversableWithIndexMap)(dictApplicative)(f)(v.value3)))(control.pure(dictApplicative)(v.value4)))(f(v.value4)(v.value5)))(Data_TraversableWithIndex.traverseWithIndex(traversableWithIndexMap)(dictApplicative)(f)(v.value6));
            };
            throw new Error("Failed pattern match at Data.Map.Internal (line 136, column 1 - line 150, column 40): " + [ f.constructor.name, v.constructor.name ]);
        };
    };
});
let alter = function (dictOrd) {
    return function (f) {
        return function (k) {
            return function (m) {
                let v = f(lookup(dictOrd)(k)(m));
                if (v instanceof Data_Maybe.Nothing) {
                    return $$delete(dictOrd)(k)(m);
                };
                if (v instanceof Data_Maybe.Just) {
                    return insert(dictOrd)(k)(v.value0)(m);
                };
                throw new Error("Failed pattern match at Data.Map.Internal (line 549, column 15 - line 551, column 25): " + [ v.constructor.name ]);
            };
        };
    };
};
let fromFoldableWith = function (dictOrd) {
    return function (dictFoldable) {
        return function (f) {
            let combine = function (v) {
                return function (v1) {
                    if (v1 instanceof Data_Maybe.Just) {
                        return Data_Maybe.Just.create(f(v)(v1.value0));
                    };
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return new Data_Maybe.Just(v);
                    };
                    throw new Error("Failed pattern match at Data.Map.Internal (line 566, column 3 - line 566, column 38): " + [ v.constructor.name, v1.constructor.name ]);
                };
            };
            return Data_Foldable.foldl(dictFoldable)(function (m) {
                return function (v) {
                    return alter(dictOrd)(combine(v.value1))(v.value0)(m);
                };
            })(empty);
        };
    };
};
let insertWith = function (dictOrd) {
    return function (f) {
        return function (k) {
            return function (v) {
                return alter(dictOrd)((function () {
                    let $767 = Data_Maybe.maybe(v)(data.flip(f)(v));
                    return function ($768) {
                        return Data_Maybe.Just.create($767($768));
                    };
                })())(k);
            };
        };
    };
};
let unionWith = function (dictOrd) {
    return function (f) {
        return function (m1) {
            return function (m2) {
                let go = function (m) {
                    return function (v) {
                        return alter(dictOrd)((function () {
                            let $769 = Data_Maybe.maybe(v.value1)(f(v.value1));
                            return function ($770) {
                                return Data_Maybe.Just.create($769($770));
                            };
                        })())(v.value0)(m);
                    };
                };
                return Data_Foldable.foldl(Data_List_Types.foldableList)(go)(m2)(toUnfoldable(Data_List_Types.unfoldableList)(m1));
            };
        };
    };
};
let union = function (dictOrd) {
    return unionWith(dictOrd)(data._const);
};
let semigroupMap = function (dictOrd) {
    return new Data_Semigroup.Semigroup(union(dictOrd));
};
let monoidMap = function (dictOrd) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMap(dictOrd);
    }, empty);
};
let submap = function (dictOrd) {
    return function (kmin) {
        return function (kmax) {
            return foldSubmap(dictOrd)(monoidMap(dictOrd))(kmin)(kmax)(singleton);
        };
    };
};
let unions = function (dictOrd) {
    return function (dictFoldable) {
        return Data_Foldable.foldl(dictFoldable)(union(dictOrd))(empty);
    };
};
let update = function (dictOrd) {
    return function (f) {
        return function (k) {
            return function (m) {
                return alter(dictOrd)(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
            };
        };
    };
};
module.exports = {
    showTree: showTree,
    empty: empty,
    isEmpty: isEmpty,
    singleton: singleton,
    checkValid: checkValid,
    insert: insert,
    insertWith: insertWith,
    lookup: lookup,
    lookupLE: lookupLE,
    lookupLT: lookupLT,
    lookupGE: lookupGE,
    lookupGT: lookupGT,
    findMin: findMin,
    findMax: findMax,
    foldSubmap: foldSubmap,
    submap: submap,
    fromFoldable: fromFoldable,
    fromFoldableWith: fromFoldableWith,
    fromFoldableWithIndex: fromFoldableWithIndex,
    toUnfoldable: toUnfoldable,
    toUnfoldableUnordered: toUnfoldableUnordered,
    "delete": $$delete,
    pop: pop,
    member: member,
    alter: alter,
    update: update,
    keys: keys,
    values: values,
    union: union,
    unionWith: unionWith,
    unions: unions,
    intersection: intersection,
    intersectionWith: intersectionWith,
    difference: difference,
    isSubmap: isSubmap,
    size: size,
    filterWithKey: filterWithKey,
    filterKeys: filterKeys,
    filter: filter,
    mapMaybeWithKey: mapMaybeWithKey,
    mapMaybe: mapMaybe,
    eq1Map: eq1Map,
    eqMap: eqMap,
    ord1Map: ord1Map,
    ordMap: ordMap,
    showMap: showMap,
    semigroupMap: semigroupMap,
    monoidMap: monoidMap,
    functorMap: functorMap,
    functorWithIndexMap: functorWithIndexMap,
    foldableMap: foldableMap,
    foldableWithIndexMap: foldableWithIndexMap,
    traversableMap: traversableMap,
    traversableWithIndexMap: traversableWithIndexMap
};
