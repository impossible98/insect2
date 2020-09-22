const control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js")
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Control_Plus = require("../Control.Plus/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Effect_Class = require("../Effect.Class/index.js");


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

class Applicative {
	constructor(Apply0, pure) {
		this.Apply0 = Apply0;
		this.pure = pure;
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

class MonadCont {
	constructor(Monad0, callCC) {
		this.Monad0 = Monad0;
		this.callCC = callCC;
	}
}

function callCC(dict) {
	return dict.callCC;
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

let pure = function (dict) {
	return dict.pure;
};

let ExceptT = function (x) {
    return x;
};
let withExceptT = function (dictFunctor) {
    return function (f) {
        return function (v) {
            let mapLeft = function (v1) {
                return function (v2) {
                    if (v2 instanceof Data_Either.Right) {
                        return new Data_Either.Right(v2.value0);
                    };
                    if (v2 instanceof Data_Either.Left) {
                        return new Data_Either.Left(v1(v2.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [ v1.constructor.name, v2.constructor.name ]);
                };
            };
            return ExceptT(Data_Functor.map(dictFunctor)(mapLeft(f))(v));
        };
    };
};
let runExceptT = function (v) {
    return v;
};
let newtypeExceptT = new Data_Newtype.Newtype(function (n) {
    return n;
}, ExceptT);
let monadTransExceptT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return function (m) {
        return control.bind(dictMonad.Bind1())(m)(function (a) {
            return pure(dictMonad.Applicative0())(new Data_Either.Right(a));
        });
    };
});
let mapExceptT = function (f) {
    return function (v) {
        return f(v);
    };
};
let functorExceptT = function (dictFunctor) {
    return new Data_Functor.Functor(function (f) {
        return mapExceptT(Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Either.functorEither)(f)));
    });
};
let except = function (dictApplicative) {
    let $88 = pure(dictApplicative);
    return function ($89) {
        return ExceptT($88($89));
    };
};
let monadExceptT = function (dictMonad) {
    return new control.Monad(function () {
        return applicativeExceptT(dictMonad);
    }, function () {
        return bindExceptT(dictMonad);
    });
};
let bindExceptT = function (dictMonad) {
    return new control.Bind(function () {
        return applyExceptT(dictMonad);
    }, function (v) {
        return function (k) {
            return control.bind(dictMonad.Bind1())(v)(Data_Either.either((function () {
                let $90 = pure(dictMonad.Applicative0());
                return function ($91) {
                    return $90(Data_Either.Left.create($91));
                };
            })())(function (a) {
                let v1 = k(a);
                return v1;
            }));
        };
    });
};
let applyExceptT = function (dictMonad) {
    return new Apply(function () {
        return functorExceptT(((dictMonad.Bind1()).Apply0()).Functor0());
    }, control.ap(monadExceptT(dictMonad)));
};
let applicativeExceptT = function (dictMonad) {
    return new Applicative(function () {
        return applyExceptT(dictMonad);
    }, (function () {
        let $92 = pure(dictMonad.Applicative0());
        return function ($93) {
            return ExceptT($92(Data_Either.Right.create($93)));
        };
    })());
};
let monadAskExceptT = function (dictMonadAsk) {
    return new Control_Monad_Reader_Class.MonadAsk(function () {
        return monadExceptT(dictMonadAsk.Monad0());
    }, Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};
let monadReaderExceptT = function (dictMonadReader) {
    return new Control_Monad_Reader_Class.MonadReader(function () {
        return monadAskExceptT(dictMonadReader.MonadAsk0());
    }, function (f) {
        return mapExceptT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
    });
};
let monadContExceptT = function (dictMonadCont) {
    return new MonadCont(function () {
        return monadExceptT(dictMonadCont.Monad0());
    }, function (f) {
        return ExceptT(callCC(dictMonadCont)(function (c) {
            let v = f(function (a) {
                return ExceptT(c(new Data_Either.Right(a)));
            });
            return v;
        }));
    });
};
let monadEffectExceptT = function (dictMonadEffect) {
    return new Effect_Class.MonadEffect(function () {
        return monadExceptT(dictMonadEffect.Monad0());
    }, (function () {
        let $94 = Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadEffect.Monad0());
        let $95 = Effect_Class.liftEffect(dictMonadEffect);
        return function ($96) {
            return $94($95($96));
        };
    })());
};
let monadRecExceptT = function (dictMonadRec) {
    return new Control_Monad_Rec_Class.MonadRec(function () {
        return monadExceptT(dictMonadRec.Monad0());
    }, function (f) {
        let $97 = Control_Monad_Rec_Class.tailRecM(dictMonadRec)(function (a) {
            let v = f(a);
            return control.bind((dictMonadRec.Monad0()).Bind1())(v)(function (m$prime) {
                return pure((dictMonadRec.Monad0()).Applicative0())((function () {
                    if (m$prime instanceof Data_Either.Left) {
                        return new Control_Monad_Rec_Class.Done(new Data_Either.Left(m$prime.value0));
                    };
                    if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Loop) {
                        return new Control_Monad_Rec_Class.Loop(m$prime.value0.value0);
                    };
                    if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Done) {
                        return new Control_Monad_Rec_Class.Done(new Data_Either.Right(m$prime.value0.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 74, column 14 - line 77, column 43): " + [ m$prime.constructor.name ]);
                })());
            });
        });
        return function ($98) {
            return ExceptT($97($98));
        };
    });
};
let monadStateExceptT = function (dictMonadState) {
    return new Control_Monad_State_Class.MonadState(function () {
        return monadExceptT(dictMonadState.Monad0());
    }, function (f) {
        return Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
    });
};
let monadTellExceptT = function (dictMonadTell) {
    return new Control_Monad_Writer_Class.MonadTell(function () {
        return monadExceptT(dictMonadTell.Monad0());
    }, (function () {
        let $99 = Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadTell.Monad0());
        let $100 = Control_Monad_Writer_Class.tell(dictMonadTell);
        return function ($101) {
            return $99($100($101));
        };
    })());
};
let monadWriterExceptT = function (dictMonadWriter) {
    return new Control_Monad_Writer_Class.MonadWriter(function () {
        return monadTellExceptT(dictMonadWriter.MonadTell0());
    }, mapExceptT(function (m) {
        return control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m))(function (v) {
            return pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(Data_Functor.map(Data_Either.functorEither)(function (r) {
                return new Data_Tuple.Tuple(r, v.value1);
            })(v.value0));
        });
    }), mapExceptT(function (m) {
        return Control_Monad_Writer_Class.pass(dictMonadWriter)(control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(m)(function (a) {
            return pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())((function () {
                if (a instanceof Data_Either.Left) {
                    return new Data_Tuple.Tuple(new Data_Either.Left(a.value0), identity(categoryFn));
                };
                if (a instanceof Data_Either.Right) {
                    return new Data_Tuple.Tuple(new Data_Either.Right(a.value0.value0), a.value0.value1);
                };
                throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 136, column 10 - line 138, column 45): " + [ a.constructor.name ]);
            })());
        }));
    }));
};
let monadThrowExceptT = function (dictMonad) {
    return new Control_Monad_Error_Class.MonadThrow(function () {
        return monadExceptT(dictMonad);
    }, (function () {
        let $102 = pure(dictMonad.Applicative0());
        return function ($103) {
            return ExceptT($102(Data_Either.Left.create($103)));
        };
    })());
};
let monadErrorExceptT = function (dictMonad) {
    return new Control_Monad_Error_Class.MonadError(function () {
        return monadThrowExceptT(dictMonad);
    }, function (v) {
        return function (k) {
            return control.bind(dictMonad.Bind1())(v)(Data_Either.either(function (a) {
                let v1 = k(a);
                return v1;
            })((function () {
                let $104 = pure(dictMonad.Applicative0());
                return function ($105) {
                    return $104(Data_Either.Right.create($105));
                };
            })()));
        };
    });
};
let altExceptT = function (dictSemigroup) {
    return function (dictMonad) {
        return new Alt(function () {
            return functorExceptT(((dictMonad.Bind1()).Apply0()).Functor0());
        }, function (v) {
            return function (v1) {
                return control.bind(dictMonad.Bind1())(v)(function (rm) {
                    if (rm instanceof Data_Either.Right) {
                        return pure(dictMonad.Applicative0())(new Data_Either.Right(rm.value0));
                    };
                    if (rm instanceof Data_Either.Left) {
                        return control.bind(dictMonad.Bind1())(v1)(function (rn) {
                            if (rn instanceof Data_Either.Right) {
                                return pure(dictMonad.Applicative0())(new Data_Either.Right(rn.value0));
                            };
                            if (rn instanceof Data_Either.Left) {
                                return pure(dictMonad.Applicative0())(new Data_Either.Left(Data_Semigroup.append(dictSemigroup)(rm.value0)(rn.value0)));
                            };
                            throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [ rn.constructor.name ]);
                        });
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [ rm.constructor.name ]);
                });
            };
        });
    };
};
let plusExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_Plus.Plus(function () {
            return altExceptT(dictMonoid.Semigroup0())(dictMonad);
        }, Control_Monad_Error_Class.throwError(monadThrowExceptT(dictMonad))(Data_Monoid.mempty(dictMonoid)));
    };
};
let alternativeExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Alternative(function () {
            return applicativeExceptT(dictMonad);
        }, function () {
            return plusExceptT(dictMonoid)(dictMonad);
        });
    };
};
let monadZeroExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_MonadZero.MonadZero(function () {
            return alternativeExceptT(dictMonoid)(dictMonad);
        }, function () {
            return monadExceptT(dictMonad);
        });
    };
};
let monadPlusExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_MonadPlus.MonadPlus(function () {
            return monadZeroExceptT(dictMonoid)(dictMonad);
        });
    };
};
module.exports = {
    ExceptT: ExceptT,
    runExceptT: runExceptT,
    withExceptT: withExceptT,
    mapExceptT: mapExceptT,
    except: except,
    newtypeExceptT: newtypeExceptT,
    functorExceptT: functorExceptT,
    applyExceptT: applyExceptT,
    applicativeExceptT: applicativeExceptT,
    bindExceptT: bindExceptT,
    monadExceptT: monadExceptT,
    monadRecExceptT: monadRecExceptT,
    altExceptT: altExceptT,
    plusExceptT: plusExceptT,
    alternativeExceptT: alternativeExceptT,
    monadPlusExceptT: monadPlusExceptT,
    monadZeroExceptT: monadZeroExceptT,
    monadTransExceptT: monadTransExceptT,
    monadEffectExceptT: monadEffectExceptT,
    monadContExceptT: monadContExceptT,
    monadThrowExceptT: monadThrowExceptT,
    monadErrorExceptT: monadErrorExceptT,
    monadAskExceptT: monadAskExceptT,
    monadReaderExceptT: monadReaderExceptT,
    monadStateExceptT: monadStateExceptT,
    monadTellExceptT: monadTellExceptT,
    monadWriterExceptT: monadWriterExceptT
};
