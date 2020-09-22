const control = require("../control");
let Data_Bifoldable = require("../Data.Bifoldable/index.js");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Bitraversable = require("../Data.Bitraversable/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");
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

let StartEnd = (function () {
    function StartEnd(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    StartEnd.create = function (value0) {
        return function (value1) {
            return new StartEnd(value0, value1);
        };
    };
    return StartEnd;
})();
let DurationEnd = (function () {
    function DurationEnd(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    DurationEnd.create = function (value0) {
        return function (value1) {
            return new DurationEnd(value0, value1);
        };
    };
    return DurationEnd;
})();
let StartDuration = (function () {
    function StartDuration(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    StartDuration.create = function (value0) {
        return function (value1) {
            return new StartDuration(value0, value1);
        };
    };
    return StartDuration;
})();
let DurationOnly = (function () {
    function DurationOnly(value0) {
        this.value0 = value0;
    };
    DurationOnly.create = function (value0) {
        return new DurationOnly(value0);
    };
    return DurationOnly;
})();
let RecurringInterval = (function () {
    function RecurringInterval(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    RecurringInterval.create = function (value0) {
        return function (value1) {
            return new RecurringInterval(value0, value1);
        };
    };
    return RecurringInterval;
})();
let showInterval = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            if (v instanceof StartEnd) {
                return "(StartEnd " + (Data_Show.show(dictShow1)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
            };
            if (v instanceof DurationEnd) {
                return "(DurationEnd " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
            };
            if (v instanceof StartDuration) {
                return "(StartDuration " + (Data_Show.show(dictShow1)(v.value0) + (" " + (Data_Show.show(dictShow)(v.value1) + ")")));
            };
            if (v instanceof DurationOnly) {
                return "(DurationOnly " + (Data_Show.show(dictShow)(v.value0) + ")");
            };
            throw new Error("Failed pattern match at Data.Interval (line 66, column 1 - line 70, column 60): " + [ v.constructor.name ]);
        });
    };
};
let showRecurringInterval = function (dictShow) {
    return function (dictShow1) {
        return new Data_Show.Show(function (v) {
            return "(RecurringInterval " + (Data_Show.show(Data_Maybe.showMaybe(Data_Show.showInt))(v.value0) + (" " + (Data_Show.show(showInterval(dictShow)(dictShow1))(v.value1) + ")")));
        });
    };
};
let over = function (dictFunctor) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictFunctor)(RecurringInterval.create(v.value0))(f(v.value1));
        };
    };
};
let interval = function (v) {
    return v.value1;
};
let foldableInterval = new Data_Foldable.Foldable(function (dictMonoid) {
    return Data_Foldable.foldMapDefaultL(foldableInterval)(dictMonoid);
}, function (v) {
    return function (z) {
        return function (v1) {
            if (v1 instanceof StartEnd) {
                return v(v(z)(v1.value0))(v1.value1);
            };
            if (v1 instanceof DurationEnd) {
                return v(z)(v1.value1);
            };
            if (v1 instanceof StartDuration) {
                return v(z)(v1.value0);
            };
            return z;
        };
    };
}, function (x) {
    return Data_Foldable.foldrDefault(foldableInterval)(x);
});
let foldableRecurringInterval = new Data_Foldable.Foldable(function (dictMonoid) {
    return Data_Foldable.foldMapDefaultL(foldableRecurringInterval)(dictMonoid);
}, function (f) {
    return function (i) {
        let $248 = Data_Foldable.foldl(foldableInterval)(f)(i);
        return function ($249) {
            return $248(interval($249));
        };
    };
}, function (f) {
    return function (i) {
        let $250 = Data_Foldable.foldr(foldableInterval)(f)(i);
        return function ($251) {
            return $250(interval($251));
        };
    };
});
let eqInterval = function (dictEq) {
    return function (dictEq1) {
        return new data.Eq(function (x) {
            return function (y) {
                if (x instanceof StartEnd && y instanceof StartEnd) {
                    return data.eq(dictEq1)(x.value0)(y.value0) && data.eq(dictEq1)(x.value1)(y.value1);
                };
                if (x instanceof DurationEnd && y instanceof DurationEnd) {
                    return data.eq(dictEq)(x.value0)(y.value0) && data.eq(dictEq1)(x.value1)(y.value1);
                };
                if (x instanceof StartDuration && y instanceof StartDuration) {
                    return data.eq(dictEq1)(x.value0)(y.value0) && data.eq(dictEq)(x.value1)(y.value1);
                };
                if (x instanceof DurationOnly && y instanceof DurationOnly) {
                    return data.eq(dictEq)(x.value0)(y.value0);
                };
                return false;
            };
        });
    };
};
let eqRecurringInterval = function (dictEq) {
    return function (dictEq1) {
        return new data.Eq(function (x) {
            return function (y) {
                return data.eq(Data_Maybe.eqMaybe(data.eqInt))(x.value0)(y.value0) && data.eq(eqInterval(dictEq)(dictEq1))(x.value1)(y.value1);
            };
        });
    };
};
let ordInterval = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqInterval(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (x) {
            return function (y) {
                if (x instanceof StartEnd && y instanceof StartEnd) {
                    let v = Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
                    if (v instanceof Data_Ordering.LT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.GT) {
                        return Data_Ordering.GT.value;
                    };
                    return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
                };
                if (x instanceof StartEnd) {
                    return Data_Ordering.LT.value;
                };
                if (y instanceof StartEnd) {
                    return Data_Ordering.GT.value;
                };
                if (x instanceof DurationEnd && y instanceof DurationEnd) {
                    let v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                    if (v instanceof Data_Ordering.LT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.GT) {
                        return Data_Ordering.GT.value;
                    };
                    return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
                };
                if (x instanceof DurationEnd) {
                    return Data_Ordering.LT.value;
                };
                if (y instanceof DurationEnd) {
                    return Data_Ordering.GT.value;
                };
                if (x instanceof StartDuration && y instanceof StartDuration) {
                    let v = Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
                    if (v instanceof Data_Ordering.LT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.GT) {
                        return Data_Ordering.GT.value;
                    };
                    return Data_Ord.compare(dictOrd)(x.value1)(y.value1);
                };
                if (x instanceof StartDuration) {
                    return Data_Ordering.LT.value;
                };
                if (y instanceof StartDuration) {
                    return Data_Ordering.GT.value;
                };
                if (x instanceof DurationOnly && y instanceof DurationOnly) {
                    return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                };
                throw new Error("Failed pattern match at Data.Interval (line 65, column 1 - line 65, column 68): " + [ x.constructor.name, y.constructor.name ]);
            };
        });
    };
};
let ordRecurringInterval = function (dictOrd) {
    return function (dictOrd1) {
        return new Data_Ord.Ord(function () {
            return eqRecurringInterval(dictOrd.Eq0())(dictOrd1.Eq0());
        }, function (x) {
            return function (y) {
                let v = Data_Ord.compare(Data_Maybe.ordMaybe(Data_Ord.ordInt))(x.value0)(y.value0);
                if (v instanceof Data_Ordering.LT) {
                    return Data_Ordering.LT.value;
                };
                if (v instanceof Data_Ordering.GT) {
                    return Data_Ordering.GT.value;
                };
                return Data_Ord.compare(ordInterval(dictOrd)(dictOrd1))(x.value1)(y.value1);
            };
        });
    };
};
let bifunctorInterval = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof StartEnd) {
                return new StartEnd(v1(v2.value0), v1(v2.value1));
            };
            if (v2 instanceof DurationEnd) {
                return new DurationEnd(v(v2.value0), v1(v2.value1));
            };
            if (v2 instanceof StartDuration) {
                return new StartDuration(v1(v2.value0), v(v2.value1));
            };
            if (v2 instanceof DurationOnly) {
                return new DurationOnly(v(v2.value0));
            };
            throw new Error("Failed pattern match at Data.Interval (line 75, column 1 - line 79, column 50): " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
let bifunctorRecurringInterval = new Data_Bifunctor.Bifunctor(function (f) {
    return function (g) {
        return function (v) {
            return new RecurringInterval(v.value0, Data_Bifunctor.bimap(bifunctorInterval)(f)(g)(v.value1));
        };
    };
});
let functorInterval = new Data_Functor.Functor(Data_Bifunctor.bimap(bifunctorInterval)(identity(categoryFn)));
let extendInterval = new control.Extend(function () {
    return functorInterval;
}, function (f) {
    return function (v) {
        if (v instanceof StartEnd) {
            return new StartEnd(f(v), f(v));
        };
        if (v instanceof DurationEnd) {
            return new DurationEnd(v.value0, f(v));
        };
        if (v instanceof StartDuration) {
            return new StartDuration(f(v), v.value1);
        };
        if (v instanceof DurationOnly) {
            return new DurationOnly(v.value0);
        };
        throw new Error("Failed pattern match at Data.Interval (line 111, column 1 - line 115, column 45): " + [ f.constructor.name, v.constructor.name ]);
    };
});
let functorRecurringInterval = new Data_Functor.Functor(function (f) {
    return function (v) {
        return new RecurringInterval(v.value0, Data_Functor.map(functorInterval)(f)(v.value1));
    };
});
let extendRecurringInterval = new control.Extend(function () {
    return functorRecurringInterval;
}, function (f) {
    return function (v) {
        return new RecurringInterval(v.value0, control.extend(extendInterval)(Data_Functor._const(f(v)))(v.value1));
    };
});
let traversableInterval = new Data_Traversable.Traversable(function () {
    return foldableInterval;
}, function () {
    return functorInterval;
}, function (dictApplicative) {
    return Data_Traversable.sequenceDefault(traversableInterval)(dictApplicative);
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            if (v1 instanceof StartEnd) {
                return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(StartEnd.create)(v(v1.value0)))(v(v1.value1));
            };
            if (v1 instanceof DurationEnd) {
                return Data_Functor.mapFlipped((dictApplicative.Apply0()).Functor0())(v(v1.value1))(DurationEnd.create(v1.value0));
            };
            if (v1 instanceof StartDuration) {
                return Data_Functor.mapFlipped((dictApplicative.Apply0()).Functor0())(v(v1.value0))(function (v2) {
                    return new StartDuration(v2, v1.value1);
                });
            };
            if (v1 instanceof DurationOnly) {
                return control.pure(dictApplicative)(new DurationOnly(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Interval (line 97, column 1 - line 102, column 29): " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
});
let traversableRecurringInterval = new Data_Traversable.Traversable(function () {
    return foldableRecurringInterval;
}, function () {
    return functorRecurringInterval;
}, function (dictApplicative) {
    return Data_Traversable.sequenceDefault(traversableRecurringInterval)(dictApplicative);
}, function (dictApplicative) {
    return function (f) {
        return function (i) {
            return over((dictApplicative.Apply0()).Functor0())(Data_Traversable.traverse(traversableInterval)(dictApplicative)(f))(i);
        };
    };
});
let bifoldableInterval = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
    return Data_Bifoldable.bifoldMapDefaultL(bifoldableInterval)(dictMonoid);
}, function (v) {
    return function (v1) {
        return function (z) {
            return function (v2) {
                if (v2 instanceof StartEnd) {
                    return v1(v1(z)(v2.value0))(v2.value1);
                };
                if (v2 instanceof DurationEnd) {
                    return v1(v(z)(v2.value0))(v2.value1);
                };
                if (v2 instanceof StartDuration) {
                    return v1(v(z)(v2.value1))(v2.value0);
                };
                if (v2 instanceof DurationOnly) {
                    return v(z)(v2.value0);
                };
                throw new Error("Failed pattern match at Data.Interval (line 89, column 1 - line 95, column 32): " + [ v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name ]);
            };
        };
    };
}, function (x) {
    return Data_Bifoldable.bifoldrDefault(bifoldableInterval)(x);
});
let bifoldableRecurringInterval = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
    return Data_Bifoldable.bifoldMapDefaultL(bifoldableRecurringInterval)(dictMonoid);
}, function (f) {
    return function (g) {
        return function (i) {
            let $252 = Data_Bifoldable.bifoldl(bifoldableInterval)(f)(g)(i);
            return function ($253) {
                return $252(interval($253));
            };
        };
    };
}, function (f) {
    return function (g) {
        return function (i) {
            let $254 = Data_Bifoldable.bifoldr(bifoldableInterval)(f)(g)(i);
            return function ($255) {
                return $254(interval($255));
            };
        };
    };
});
let bitraversableInterval = new Data_Bitraversable.Bitraversable(function () {
    return bifoldableInterval;
}, function () {
    return bifunctorInterval;
}, function (dictApplicative) {
    return Data_Bitraversable.bisequenceDefault(bitraversableInterval)(dictApplicative);
}, function (dictApplicative) {
    return function (v) {
        return function (v1) {
            return function (v2) {
                if (v2 instanceof StartEnd) {
                    return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(StartEnd.create)(v1(v2.value0)))(v1(v2.value1));
                };
                if (v2 instanceof DurationEnd) {
                    return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(DurationEnd.create)(v(v2.value0)))(v1(v2.value1));
                };
                if (v2 instanceof StartDuration) {
                    return apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(StartDuration.create)(v1(v2.value0)))(v(v2.value1));
                };
                if (v2 instanceof DurationOnly) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(DurationOnly.create)(v(v2.value0));
                };
                throw new Error("Failed pattern match at Data.Interval (line 104, column 1 - line 109, column 33): " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
            };
        };
    };
});
let bitraversableRecurringInterval = new Data_Bitraversable.Bitraversable(function () {
    return bifoldableRecurringInterval;
}, function () {
    return bifunctorRecurringInterval;
}, function (dictApplicative) {
    return Data_Bitraversable.bisequenceDefault(bitraversableRecurringInterval)(dictApplicative);
}, function (dictApplicative) {
    return function (l) {
        return function (r) {
            return function (i) {
                return over((dictApplicative.Apply0()).Functor0())(Data_Bitraversable.bitraverse(bitraversableInterval)(dictApplicative)(l)(r))(i);
            };
        };
    };
});
module.exports = {
    StartEnd: StartEnd,
    DurationEnd: DurationEnd,
    StartDuration: StartDuration,
    DurationOnly: DurationOnly,
    RecurringInterval: RecurringInterval,
    eqRecurringInterval: eqRecurringInterval,
    ordRecurringInterval: ordRecurringInterval,
    showRecurringInterval: showRecurringInterval,
    functorRecurringInterval: functorRecurringInterval,
    bifunctorRecurringInterval: bifunctorRecurringInterval,
    foldableRecurringInterval: foldableRecurringInterval,
    bifoldableRecurringInterval: bifoldableRecurringInterval,
    traversableRecurringInterval: traversableRecurringInterval,
    bitraversableRecurringInterval: bitraversableRecurringInterval,
    extendRecurringInterval: extendRecurringInterval,
    eqInterval: eqInterval,
    ordInterval: ordInterval,
    showInterval: showInterval,
    functorInterval: functorInterval,
    bifunctorInterval: bifunctorInterval,
    foldableInterval: foldableInterval,
    bifoldableInterval: bifoldableInterval,
    traversableInterval: traversableInterval,
    bitraversableInterval: bitraversableInterval,
    extendInterval: extendInterval
};
