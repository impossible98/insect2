const control = require('../control');
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Lazy = require("../Data.Lazy/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


let intAdd = function (x) {
	return function (y) {
		return x + y | 0;
	};
};

let intMul = function (x) {
	return function (y) {
		return x * y | 0;
	};
};


let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let semiringInt = new Semiring(intAdd, intMul, 1, 0);


let add = function (dict) {
	return dict.add;
};


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}

class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
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


let List = function (x) {
    return x;
};
let Nil = (function () {
    function Nil() {

    };
    Nil.value = new Nil();
    return Nil;
})();
let Cons = (function () {
    function Cons(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Cons.create = function (value0) {
        return function (value1) {
            return new Cons(value0, value1);
        };
    };
    return Cons;
})();
let NonEmptyList = function (x) {
    return x;
};
let nil = List(Data_Lazy.defer(function (v) {
    return Nil.value;
}));
let newtypeNonEmptyList = new Data_Newtype.Newtype(function (n) {
    return n;
}, NonEmptyList);
let newtypeList = new Data_Newtype.Newtype(function (n) {
    return n;
}, List);
let step = (function () {
    let $215 = Data_Newtype.unwrap(newtypeList);
    return function ($216) {
        return Data_Lazy.force($215($216));
    };
})();
let semigroupList = new Data_Semigroup.Semigroup(function (xs) {
    return function (ys) {
        let go = function (v) {
            if (v instanceof Nil) {
                return step(ys);
            };
            if (v instanceof Cons) {
                return new Cons(v.value0, Data_Semigroup.append(semigroupList)(v.value1)(ys));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 98, column 5 - line 98, column 21): " + [ v.constructor.name ]);
        };
        return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(newtypeList)(xs));
    };
});
let showList = function (dictShow) {
    return new Data_Show.Show(function (xs) {
        let go = function (v) {
            if (v instanceof Nil) {
                return "Nil";
            };
            if (v instanceof Cons) {
                return "(Cons " + (Data_Show.show(dictShow)(v.value0) + (" " + (go(step(v.value1)) + ")")));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 64, column 5 - line 64, column 19): " + [ v.constructor.name ]);
        };
        return "fromStrict (" + (go(step(xs)) + ")");
    });
};
let showNonEmptyList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(NonEmptyList " + (Data_Show.show(Data_Lazy.showLazy(Data_NonEmpty.showNonEmpty(dictShow)(showList(dictShow))))(v) + ")");
    });
};
let monoidList = new Data_Monoid.Monoid(function () {
    return semigroupList;
}, nil);
let lazyList = new control.Lazy(function (f) {
    return List(Data_Lazy.defer(function ($217) {
        return step(f($217));
    }));
});
let functorList = new data.Functor(function (f) {
    return function (xs) {
        let go = function (v) {
            if (v instanceof Nil) {
                return Nil.value;
            };
            if (v instanceof Cons) {
                return new Cons(f(v.value0), data.map(functorList)(f)(v.value1));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 107, column 5 - line 107, column 17): " + [ v.constructor.name ]);
        };
        return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(newtypeList)(xs));
    };
});
let functorNonEmptyList = new data.Functor(function (f) {
    return function (v) {
        return data.map(Data_Lazy.functorLazy)(data.map(Data_NonEmpty.functorNonEmpty(functorList))(f))(v);
    };
});
let eq1List = new data.Eq1(function (dictEq) {
    return function (xs) {
        return function (ys) {
            let go = function ($copy_v) {
                return function ($copy_v1) {
                    let $tco_var_v = $copy_v;
                    let $tco_done = false;
                    let $tco_result;
                    function $tco_loop(v, v1) {
                        if (v instanceof Nil && v1 instanceof Nil) {
                            $tco_done = true;
                            return true;
                        };
                        if (v instanceof Cons && (v1 instanceof Cons && data.eq(dictEq)(v.value0)(v1.value0))) {
                            $tco_var_v = step(v.value1);
                            $copy_v1 = step(v1.value1);
                            return;
                        };
                        $tco_done = true;
                        return false;
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($tco_var_v, $copy_v1);
                    };
                    return $tco_result;
                };
            };
            return go(step(xs))(step(ys));
        };
    };
});
let eqList = function (dictEq) {
    return new data.Eq(data.eq1(eq1List)(dictEq));
};
let eqNonEmptyList = function (dictEq) {
    return Data_Lazy.eqLazy(Data_NonEmpty.eqNonEmpty(eq1List)(dictEq));
};
let ord1List = new Data_Ord.Ord1(function () {
    return eq1List;
}, function (dictOrd) {
    return function (xs) {
        return function (ys) {
            let go = function ($copy_v) {
                return function ($copy_v1) {
                    let $tco_var_v = $copy_v;
                    let $tco_done = false;
                    let $tco_result;
                    function $tco_loop(v, v1) {
                        if (v instanceof Nil && v1 instanceof Nil) {
                            $tco_done = true;
                            return Data_Ordering.EQ.value;
                        };
                        if (v instanceof Nil) {
                            $tco_done = true;
                            return Data_Ordering.LT.value;
                        };
                        if (v1 instanceof Nil) {
                            $tco_done = true;
                            return Data_Ordering.GT.value;
                        };
                        if (v instanceof Cons && v1 instanceof Cons) {
                            let v2 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
                            if (v2 instanceof Data_Ordering.EQ) {
                                $tco_var_v = step(v.value1);
                                $copy_v1 = step(v1.value1);
                                return;
                            };
                            $tco_done = true;
                            return v2;
                        };
                        throw new Error("Failed pattern match at Data.List.Lazy.Types (line 84, column 5 - line 84, column 20): " + [ v.constructor.name, v1.constructor.name ]);
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($tco_var_v, $copy_v1);
                    };
                    return $tco_result;
                };
            };
            return go(step(xs))(step(ys));
        };
    };
});
let ordList = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqList(dictOrd.Eq0());
    }, Data_Ord.compare1(ord1List)(dictOrd));
};
let ordNonEmptyList = function (dictOrd) {
    return Data_Lazy.ordLazy(Data_NonEmpty.ordNonEmpty(ord1List)(dictOrd));
};
let cons = function (x) {
    return function (xs) {
        return List(Data_Lazy.defer(function (v) {
            return new Cons(x, xs);
        }));
    };
};
let foldableList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return Data_Foldable.foldl(foldableList)(function (b) {
            return function (a) {
                return Data_Semigroup.append(dictMonoid.Semigroup0())(b)(f(a));
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
}, function (op) {
    let go = function ($copy_b) {
        return function ($copy_xs) {
            let $tco_var_b = $copy_b;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(b, xs) {
                let v = step(xs);
                if (v instanceof Nil) {
                    $tco_done = true;
                    return b;
                };
                if (v instanceof Cons) {
                    $tco_var_b = op(b)(v.value0);
                    $copy_xs = v.value1;
                    return;
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 122, column 7 - line 124, column 40): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_b, $copy_xs);
            };
            return $tco_result;
        };
    };
    return go;
}, function (op) {
    return function (z) {
        return function (xs) {
            let rev = Data_Foldable.foldl(foldableList)(data.flip(cons))(nil);
            return Data_Foldable.foldl(foldableList)(data.flip(op))(z)(rev(xs));
        };
    };
});
let extendList = new control.Extend(function () {
    return functorList;
}, function (f) {
    return function (l) {
        let go = function (a) {
            return function (v) {
                let acc$prime = cons(a)(v.acc);
                return {
                    val: cons(f(acc$prime))(v.val),
                    acc: acc$prime
                };
            };
        };
        let v = step(l);
        if (v instanceof Nil) {
            return nil;
        };
        if (v instanceof Cons) {
            return cons(f(l))((Data_Foldable.foldr(foldableList)(go)({
                val: nil,
                acc: nil
            })(v.value1)).val);
        };
        throw new Error("Failed pattern match at Data.List.Lazy.Types (line 194, column 5 - line 197, column 55): " + [ v.constructor.name ]);
    };
});
let extendNonEmptyList = new control.Extend(function () {
    return functorNonEmptyList;
}, function (f) {
    return function (v) {
        let go = function (a) {
            return function (v1) {
                return {
                    val: cons(f(Data_Lazy.defer(function (v2) {
                        return new Data_NonEmpty.NonEmpty(a, v1.acc);
                    })))(v1.val),
                    acc: cons(a)(v1.acc)
                };
            };
        };
        let v1 = Data_Lazy.force(v);
        return NonEmptyList(Data_Lazy.defer(function (v2) {
            return new Data_NonEmpty.NonEmpty(f(v), (Data_Foldable.foldr(foldableList)(go)({
                val: nil,
                acc: nil
            })(v1.value1)).val);
        }));
    };
});
let foldableNonEmptyList = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function (v) {
            return Data_Foldable.foldMap(Data_NonEmpty.foldableNonEmpty(foldableList))(dictMonoid)(f)(Data_Lazy.force(v));
        };
    };
}, function (f) {
    return function (b) {
        return function (v) {
            return Data_Foldable.foldl(Data_NonEmpty.foldableNonEmpty(foldableList))(f)(b)(Data_Lazy.force(v));
        };
    };
}, function (f) {
    return function (b) {
        return function (v) {
            return Data_Foldable.foldr(Data_NonEmpty.foldableNonEmpty(foldableList))(f)(b)(Data_Lazy.force(v));
        };
    };
});
let foldableWithIndexList = new Data_FoldableWithIndex.FoldableWithIndex(function () {
    return foldableList;
}, function (dictMonoid) {
    return function (f) {
        return Data_FoldableWithIndex.foldlWithIndex(foldableWithIndexList)(function (i) {
            return function (acc) {
                let $218 = Data_Semigroup.append(dictMonoid.Semigroup0())(acc);
                let $219 = f(i);
                return function ($220) {
                    return $218($219($220));
                };
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
}, function (f) {
    return function (acc) {
        let $221 = Data_Foldable.foldl(foldableList)(function (v) {
            return function (a) {
                return new Data_Tuple.Tuple(v.value0 + 1 | 0, f(v.value0)(v.value1)(a));
            };
        })(new Data_Tuple.Tuple(0, acc));
        return function ($222) {
            return Data_Tuple.snd($221($222));
        };
    };
}, function (f) {
    return function (b) {
        return function (xs) {
            let v = (function () {
                let rev = Data_Foldable.foldl(foldableList)(function (v1) {
                    return function (a) {
                        return new Data_Tuple.Tuple(v1.value0 + 1 | 0, cons(a)(v1.value1));
                    };
                });
                return rev(new Data_Tuple.Tuple(0, nil))(xs);
            })();
            return Data_Tuple.snd(Data_Foldable.foldl(foldableList)(function (v1) {
                return function (a) {
                    return new Data_Tuple.Tuple(v1.value0 - 1 | 0, f(v1.value0 - 1 | 0)(a)(v1.value1));
                };
            })(new Data_Tuple.Tuple(v.value0, b))(v.value1));
        };
    };
});
let foldableWithIndexNonEmptyList = new Data_FoldableWithIndex.FoldableWithIndex(function () {
    return foldableNonEmptyList;
}, function (dictMonoid) {
    return function (f) {
        return function (v) {
            return Data_FoldableWithIndex.foldMapWithIndex(Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList))(dictMonoid)((function () {
                let $223 = Data_Maybe.maybe(0)(add(semiringInt)(1));
                return function ($224) {
                    return f($223($224));
                };
            })())(Data_Lazy.force(v));
        };
    };
}, function (f) {
    return function (b) {
        return function (v) {
            return Data_FoldableWithIndex.foldlWithIndex(Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList))((function () {
                let $225 = Data_Maybe.maybe(0)(add(semiringInt)(1));
                return function ($226) {
                    return f($225($226));
                };
            })())(b)(Data_Lazy.force(v));
        };
    };
}, function (f) {
    return function (b) {
        return function (v) {
            return Data_FoldableWithIndex.foldrWithIndex(Data_NonEmpty.foldableWithIndexNonEmpty(foldableWithIndexList))((function () {
                let $227 = Data_Maybe.maybe(0)(add(semiringInt)(1));
                return function ($228) {
                    return f($227($228));
                };
            })())(b)(Data_Lazy.force(v));
        };
    };
});
let functorWithIndexList = new Data_FunctorWithIndex.FunctorWithIndex(function () {
    return functorList;
}, function (f) {
    return Data_FoldableWithIndex.foldrWithIndex(foldableWithIndexList)(function (i) {
        return function (x) {
            return function (acc) {
                return cons(f(i)(x))(acc);
            };
        };
    })(nil);
});
let functorWithIndexNonEmptyList = new Data_FunctorWithIndex.FunctorWithIndex(function () {
    return functorNonEmptyList;
}, function (f) {
    return function (v) {
        return NonEmptyList(Data_Lazy.defer(function (v1) {
            return Data_FunctorWithIndex.mapWithIndex(Data_NonEmpty.functorWithIndex(functorWithIndexList))((function () {
                let $229 = Data_Maybe.maybe(0)(add(semiringInt)(1));
                return function ($230) {
                    return f($229($230));
                };
            })())(Data_Lazy.force(v));
        }));
    };
});
let toList = function (v) {
    return control.defer(lazyList)(function (v1) {
        let v2 = Data_Lazy.force(v);
        return cons(v2.value0)(v2.value1);
    });
};
let semigroupNonEmptyList = new Data_Semigroup.Semigroup(function (v) {
    return function (as$prime) {
        let v1 = Data_Lazy.force(v);
        return Data_Lazy.defer(function (v2) {
            return new Data_NonEmpty.NonEmpty(v1.value0, Data_Semigroup.append(semigroupList)(v1.value1)(toList(as$prime)));
        });
    };
});
let traversableList = new Data_Traversable.Traversable(function () {
    return foldableList;
}, function () {
    return functorList;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableList)(dictApplicative)(identity(categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return Data_Foldable.foldr(foldableList)(function (a) {
            return function (b) {
                return apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(cons)(f(a)))(b);
            };
        })(control.pure(dictApplicative)(nil));
    };
});
let traversableNonEmptyList = new Data_Traversable.Traversable(function () {
    return foldableNonEmptyList;
}, function () {
    return functorNonEmptyList;
}, function (dictApplicative) {
    return function (v) {
        return data.map((dictApplicative.Apply0()).Functor0())(function (xxs) {
            return NonEmptyList(Data_Lazy.defer(function (v1) {
                return xxs;
            }));
        })(Data_Traversable.sequence(Data_NonEmpty.traversableNonEmpty(traversableList))(dictApplicative)(Data_Lazy.force(v)));
    };
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(function (xxs) {
                return NonEmptyList(Data_Lazy.defer(function (v1) {
                    return xxs;
                }));
            })(Data_Traversable.traverse(Data_NonEmpty.traversableNonEmpty(traversableList))(dictApplicative)(f)(Data_Lazy.force(v)));
        };
    };
});
let traversableWithIndexList = new Data_TraversableWithIndex.TraversableWithIndex(function () {
    return foldableWithIndexList;
}, function () {
    return functorWithIndexList;
}, function () {
    return traversableList;
}, function (dictApplicative) {
    return function (f) {
        return Data_FoldableWithIndex.foldrWithIndex(foldableWithIndexList)(function (i) {
            return function (a) {
                return function (b) {
                    return apply(dictApplicative.Apply0())(data.map((dictApplicative.Apply0()).Functor0())(cons)(f(i)(a)))(b);
                };
            };
        })(control.pure(dictApplicative)(nil));
    };
});
let traversableWithIndexNonEmptyList = new Data_TraversableWithIndex.TraversableWithIndex(function () {
    return foldableWithIndexNonEmptyList;
}, function () {
    return functorWithIndexNonEmptyList;
}, function () {
    return traversableNonEmptyList;
}, function (dictApplicative) {
    return function (f) {
        return function (v) {
            return data.map((dictApplicative.Apply0()).Functor0())(function (xxs) {
                return NonEmptyList(Data_Lazy.defer(function (v1) {
                    return xxs;
                }));
            })(Data_TraversableWithIndex.traverseWithIndex(Data_NonEmpty.traversableWithIndexNonEmpty(traversableWithIndexList))(dictApplicative)((function () {
                let $231 = Data_Maybe.maybe(0)(add(semiringInt)(1));
                return function ($232) {
                    return f($231($232));
                };
            })())(Data_Lazy.force(v)));
        };
    };
});
let unfoldable1List = new Data_Unfoldable1.Unfoldable1((function () {
    let go = function (f) {
        return function (b) {
            return control.defer(lazyList)(function (v) {
                let v1 = f(b);
                if (v1.value1 instanceof Data_Maybe.Just) {
                    return cons(v1.value0)(go(f)(v1.value1.value0));
                };
                if (v1.value1 instanceof Data_Maybe.Nothing) {
                    return cons(v1.value0)(nil);
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 146, column 28 - line 148, column 33): " + [ v1.constructor.name ]);
            });
        };
    };
    return go;
})());
let unfoldableList = new Data_Unfoldable.Unfoldable(function () {
    return unfoldable1List;
}, (function () {
    let go = function (f) {
        return function (b) {
            return control.defer(lazyList)(function (v) {
                let v1 = f(b);
                if (v1 instanceof Data_Maybe.Nothing) {
                    return nil;
                };
                if (v1 instanceof Data_Maybe.Just) {
                    return cons(v1.value0.value0)(go(f)(v1.value0.value1));
                };
                throw new Error("Failed pattern match at Data.List.Lazy.Types (line 152, column 28 - line 154, column 39): " + [ v1.constructor.name ]);
            });
        };
    };
    return go;
})());
let unfoldable1NonEmptyList = new Data_Unfoldable1.Unfoldable1(function (f) {
    return function (b) {
        return NonEmptyList(Data_Lazy.defer(function (v) {
            return Data_Unfoldable1.unfoldr1(Data_NonEmpty.unfoldable1NonEmpty(unfoldableList))(f)(b);
        }));
    };
});
let comonadNonEmptyList = new control.Comonad(function () {
    return extendNonEmptyList;
}, function (v) {
    return Data_NonEmpty.head(Data_Lazy.force(v));
});
let monadList = new control.Monad(function () {
    return applicativeList;
}, function () {
    return bindList;
});
let bindList = new control.Bind(function () {
    return applyList;
}, function (xs) {
    return function (f) {
        let go = function (v) {
            if (v instanceof Nil) {
                return Nil.value;
            };
            if (v instanceof Cons) {
                return step(Data_Semigroup.append(semigroupList)(f(v.value0))(control.bind(bindList)(v.value1)(f)));
            };
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 175, column 5 - line 175, column 17): " + [ v.constructor.name ]);
        };
        return data.map(Data_Lazy.functorLazy)(go)(Data_Newtype.unwrap(newtypeList)(xs));
    };
});
let applyList = new Apply(function () {
    return functorList;
}, control.ap(monadList));
let applicativeList = new control.Applicative(function () {
    return applyList;
}, function (a) {
    return cons(a)(nil);
});
let applyNonEmptyList = new Apply(function () {
    return functorNonEmptyList;
}, function (v) {
    return function (v1) {
        let v2 = Data_Lazy.force(v1);
        let v3 = Data_Lazy.force(v);
        return Data_Lazy.defer(function (v4) {
            return new Data_NonEmpty.NonEmpty(v3.value0(v2.value0), Data_Semigroup.append(semigroupList)(apply(applyList)(v3.value1)(cons(v2.value0)(nil)))(apply(applyList)(cons(v3.value0)(v3.value1))(v2.value1)));
        });
    };
});
let bindNonEmptyList = new control.Bind(function () {
    return applyNonEmptyList;
}, function (v) {
    return function (f) {
        let v1 = Data_Lazy.force(v);
        let v2 = Data_Lazy.force(Data_Newtype.unwrap(newtypeNonEmptyList)(f(v1.value0)));
        return Data_Lazy.defer(function (v3) {
            return new Data_NonEmpty.NonEmpty(v2.value0, Data_Semigroup.append(semigroupList)(v2.value1)(control.bind(bindList)(v1.value1)(function ($233) {
                return toList(f($233));
            })));
        });
    };
});
let altNonEmptyList = new Alt(function () {
    return functorNonEmptyList;
}, Data_Semigroup.append(semigroupNonEmptyList));
let altList = new Alt(function () {
    return functorList;
}, Data_Semigroup.append(semigroupList));
let plusList = new control.Plus(function () {
    return altList;
}, nil);
let alternativeList = new Alternative(function () {
    return applicativeList;
}, function () {
    return plusList;
});
let monadZeroList = new Control_MonadZero.MonadZero(function () {
    return alternativeList;
}, function () {
    return monadList;
});
let monadPlusList = new Control_MonadPlus.MonadPlus(function () {
    return monadZeroList;
});
let applicativeNonEmptyList = new control.Applicative(function () {
    return applyNonEmptyList;
}, function (a) {
    return Data_Lazy.defer(function (v) {
        return Data_NonEmpty.singleton(plusList)(a);
    });
});
let monadNonEmptyList = new control.Monad(function () {
    return applicativeNonEmptyList;
}, function () {
    return bindNonEmptyList;
});
module.exports = {
    List: List,
    Nil: Nil,
    Cons: Cons,
    step: step,
    nil: nil,
    cons: cons,
    NonEmptyList: NonEmptyList,
    toList: toList,
    newtypeList: newtypeList,
    showList: showList,
    eqList: eqList,
    eq1List: eq1List,
    ordList: ordList,
    ord1List: ord1List,
    lazyList: lazyList,
    semigroupList: semigroupList,
    monoidList: monoidList,
    functorList: functorList,
    functorWithIndexList: functorWithIndexList,
    foldableList: foldableList,
    foldableWithIndexList: foldableWithIndexList,
    unfoldable1List: unfoldable1List,
    unfoldableList: unfoldableList,
    traversableList: traversableList,
    traversableWithIndexList: traversableWithIndexList,
    applyList: applyList,
    applicativeList: applicativeList,
    bindList: bindList,
    monadList: monadList,
    altList: altList,
    plusList: plusList,
    alternativeList: alternativeList,
    monadZeroList: monadZeroList,
    monadPlusList: monadPlusList,
    extendList: extendList,
    newtypeNonEmptyList: newtypeNonEmptyList,
    eqNonEmptyList: eqNonEmptyList,
    ordNonEmptyList: ordNonEmptyList,
    showNonEmptyList: showNonEmptyList,
    functorNonEmptyList: functorNonEmptyList,
    applyNonEmptyList: applyNonEmptyList,
    applicativeNonEmptyList: applicativeNonEmptyList,
    bindNonEmptyList: bindNonEmptyList,
    monadNonEmptyList: monadNonEmptyList,
    altNonEmptyList: altNonEmptyList,
    extendNonEmptyList: extendNonEmptyList,
    comonadNonEmptyList: comonadNonEmptyList,
    semigroupNonEmptyList: semigroupNonEmptyList,
    foldableNonEmptyList: foldableNonEmptyList,
    traversableNonEmptyList: traversableNonEmptyList,
    unfoldable1NonEmptyList: unfoldable1NonEmptyList,
    functorWithIndexNonEmptyList: functorWithIndexNonEmptyList,
    foldableWithIndexNonEmptyList: foldableWithIndexNonEmptyList,
    traversableWithIndexNonEmptyList: traversableWithIndexNonEmptyList
};
