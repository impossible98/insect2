const control = require('../control');
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
const data = require('../data');
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Effect_Class = require("../Effect.Class/index.js");


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

class MonadCont {
	constructor(Monad0, callCC) {
		this.Monad0 = Monad0;
		this.callCC = callCC;
	}
}

function callCC(dict) {
	return dict.callCC;
}

let apply = function (dict) {
	return dict.apply;
};

function alt(dict) {
	return dict.alt;
}

let WriterT = function (x) {
    return x;
};
let runWriterT = function (v) {
    return v;
};
let newtypeWriterT = new Data_Newtype.Newtype(function (n) {
    return n;
}, WriterT);
let monadTransWriterT = function (dictMonoid) {
    return new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
        return function (m) {
            return control.bind(dictMonad.Bind1())(m)(function (a) {
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid)));
            });
        };
    });
};
let mapWriterT = function (f) {
    return function (v) {
        return f(v);
    };
};
let functorWriterT = function (dictFunctor) {
    return new data.Functor(function (f) {
        return mapWriterT(data.map(dictFunctor)(function (v) {
            return new Data_Tuple.Tuple(f(v.value0), v.value1);
        }));
    });
};
let execWriterT = function (dictFunctor) {
    return function (v) {
        return data.map(dictFunctor)(Data_Tuple.snd)(v);
    };
};
let applyWriterT = function (dictSemigroup) {
    return function (dictApply) {
        return new Apply(function () {
            return functorWriterT(dictApply.Functor0());
        }, function (v) {
            return function (v1) {
                let k = function (v3) {
                    return function (v4) {
                        return new Data_Tuple.Tuple(v3.value0(v4.value0), Data_Semigroup.append(dictSemigroup)(v3.value1)(v4.value1));
                    };
                };
                return apply(dictApply)(data.map(dictApply.Functor0())(k)(v))(v1);
            };
        });
    };
};
let bindWriterT = function (dictSemigroup) {
    return function (dictBind) {
        return new control.Bind(function () {
            return applyWriterT(dictSemigroup)(dictBind.Apply0());
        }, function (v) {
            return function (k) {
                return WriterT(control.bind(dictBind)(v)(function (v1) {
                    let v2 = k(v1.value0);
                    return data.map((dictBind.Apply0()).Functor0())(function (v3) {
                        return new Data_Tuple.Tuple(v3.value0, Data_Semigroup.append(dictSemigroup)(v1.value1)(v3.value1));
                    })(v2);
                }));
            };
        });
    };
};
let applicativeWriterT = function (dictMonoid) {
    return function (dictApplicative) {
        return new control.Applicative(function () {
            return applyWriterT(dictMonoid.Semigroup0())(dictApplicative.Apply0());
        }, function (a) {
            return WriterT(control.pure(dictApplicative)(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid))));
        });
    };
};
let monadWriterT = function (dictMonoid) {
    return function (dictMonad) {
        return new control.Monad(function () {
            return applicativeWriterT(dictMonoid)(dictMonad.Applicative0());
        }, function () {
            return bindWriterT(dictMonoid.Semigroup0())(dictMonad.Bind1());
        });
    };
};
let monadAskWriterT = function (dictMonoid) {
    return function (dictMonadAsk) {
        return new Control_Monad_Reader_Class.MonadAsk(function () {
            return monadWriterT(dictMonoid)(dictMonadAsk.Monad0());
        }, Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
    };
};
let monadReaderWriterT = function (dictMonoid) {
    return function (dictMonadReader) {
        return new Control_Monad_Reader_Class.MonadReader(function () {
            return monadAskWriterT(dictMonoid)(dictMonadReader.MonadAsk0());
        }, function (f) {
            return mapWriterT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
        });
    };
};
let monadContWriterT = function (dictMonoid) {
    return function (dictMonadCont) {
        return new MonadCont(function () {
            return monadWriterT(dictMonoid)(dictMonadCont.Monad0());
        }, function (f) {
            return WriterT(callCC(dictMonadCont)(function (c) {
                let v = f(function (a) {
                    return WriterT(c(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid))));
                });
                return v;
            }));
        });
    };
};
let monadEffectWriter = function (dictMonoid) {
    return function (dictMonadEffect) {
        return new Effect_Class.MonadEffect(function () {
            return monadWriterT(dictMonoid)(dictMonadEffect.Monad0());
        }, (function () {
            let $121 = Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadEffect.Monad0());
            let $122 = Effect_Class.liftEffect(dictMonadEffect);
            return function ($123) {
                return $121($122($123));
            };
        })());
    };
};
let monadRecWriterT = function (dictMonoid) {
    return function (dictMonadRec) {
        return new Control_Monad_Rec_Class.MonadRec(function () {
            return monadWriterT(dictMonoid)(dictMonadRec.Monad0());
        }, function (f) {
            return function (a) {
                let f$prime = function (v) {
                    let v1 = f(v.value0);
                    return control.bind((dictMonadRec.Monad0()).Bind1())(v1)(function (v2) {
                        return control.pure((dictMonadRec.Monad0()).Applicative0())((function () {
                            if (v2.value0 instanceof Control_Monad_Rec_Class.Loop) {
                                return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(v2.value0.value0, Data_Semigroup.append(dictMonoid.Semigroup0())(v.value1)(v2.value1)));
                            };
                            if (v2.value0 instanceof Control_Monad_Rec_Class.Done) {
                                return new Control_Monad_Rec_Class.Done(new Data_Tuple.Tuple(v2.value0.value0, Data_Semigroup.append(dictMonoid.Semigroup0())(v.value1)(v2.value1)));
                            };
                            throw new Error("Failed pattern match at Control.Monad.Writer.Trans (line 83, column 16 - line 85, column 47): " + [ v2.value0.constructor.name ]);
                        })());
                    });
                };
                return WriterT(Control_Monad_Rec_Class.tailRecM(dictMonadRec)(f$prime)(new Data_Tuple.Tuple(a, Data_Monoid.mempty(dictMonoid))));
            };
        });
    };
};
let monadStateWriterT = function (dictMonoid) {
    return function (dictMonadState) {
        return new Control_Monad_State_Class.MonadState(function () {
            return monadWriterT(dictMonoid)(dictMonadState.Monad0());
        }, function (f) {
            return Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
        });
    };
};
let monadTellWriterT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_Monad_Writer_Class.MonadTell(function () {
            return monadWriterT(dictMonoid)(dictMonad);
        }, (function () {
            let $124 = control.pure(dictMonad.Applicative0());
            let $125 = Data_Tuple.Tuple.create({});
            return function ($126) {
                return WriterT($124($125($126)));
            };
        })());
    };
};
let monadWriterWriterT = function (dictMonoid) {
    return function (dictMonad) {
        return new Control_Monad_Writer_Class.MonadWriter(function () {
            return monadTellWriterT(dictMonoid)(dictMonad);
        }, function (v) {
            return control.bind(dictMonad.Bind1())(v)(function (v1) {
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v1.value0, v1.value1), v1.value1));
            });
        }, function (v) {
            return control.bind(dictMonad.Bind1())(v)(function (v1) {
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0.value0, v1.value0.value1(v1.value1)));
            });
        });
    };
};
let monadThrowWriterT = function (dictMonoid) {
    return function (dictMonadThrow) {
        return new Control_Monad_Error_Class.MonadThrow(function () {
            return monadWriterT(dictMonoid)(dictMonadThrow.Monad0());
        }, function (e) {
            return Control_Monad_Trans_Class.lift(monadTransWriterT(dictMonoid))(dictMonadThrow.Monad0())(Control_Monad_Error_Class.throwError(dictMonadThrow)(e));
        });
    };
};
let monadErrorWriterT = function (dictMonoid) {
    return function (dictMonadError) {
        return new Control_Monad_Error_Class.MonadError(function () {
            return monadThrowWriterT(dictMonoid)(dictMonadError.MonadThrow0());
        }, function (v) {
            return function (h) {
                return WriterT(Control_Monad_Error_Class.catchError(dictMonadError)(v)(function (e) {
                    let v1 = h(e);
                    return v1;
                }));
            };
        });
    };
};
let altWriterT = function (dictAlt) {
    return new Alt(function () {
        return functorWriterT(dictAlt.Functor0());
    }, function (v) {
        return function (v1) {
            return alt(dictAlt)(v)(v1);
        };
    });
};
let plusWriterT = function (dictPlus) {
    return new control.Plus(function () {
        return altWriterT(dictPlus.Alt0());
    }, control.empty(dictPlus));
};
let alternativeWriterT = function (dictMonoid) {
    return function (dictAlternative) {
        return new Alternative(function () {
            return applicativeWriterT(dictMonoid)(dictAlternative.Applicative0());
        }, function () {
            return plusWriterT(dictAlternative.Plus1());
        });
    };
};
let monadZeroWriterT = function (dictMonoid) {
    return function (dictMonadZero) {
        return new Control_MonadZero.MonadZero(function () {
            return alternativeWriterT(dictMonoid)(dictMonadZero.Alternative1());
        }, function () {
            return monadWriterT(dictMonoid)(dictMonadZero.Monad0());
        });
    };
};
let monadPlusWriterT = function (dictMonoid) {
    return function (dictMonadPlus) {
        return new Control_MonadPlus.MonadPlus(function () {
            return monadZeroWriterT(dictMonoid)(dictMonadPlus.MonadZero0());
        });
    };
};
module.exports = {
    WriterT: WriterT,
    runWriterT: runWriterT,
    execWriterT: execWriterT,
    mapWriterT: mapWriterT,
    newtypeWriterT: newtypeWriterT,
    functorWriterT: functorWriterT,
    applyWriterT: applyWriterT,
    applicativeWriterT: applicativeWriterT,
    altWriterT: altWriterT,
    plusWriterT: plusWriterT,
    alternativeWriterT: alternativeWriterT,
    bindWriterT: bindWriterT,
    monadWriterT: monadWriterT,
    monadRecWriterT: monadRecWriterT,
    monadZeroWriterT: monadZeroWriterT,
    monadPlusWriterT: monadPlusWriterT,
    monadTransWriterT: monadTransWriterT,
    monadEffectWriter: monadEffectWriter,
    monadContWriterT: monadContWriterT,
    monadThrowWriterT: monadThrowWriterT,
    monadErrorWriterT: monadErrorWriterT,
    monadAskWriterT: monadAskWriterT,
    monadReaderWriterT: monadReaderWriterT,
    monadStateWriterT: monadStateWriterT,
    monadTellWriterT: monadTellWriterT,
    monadWriterWriterT: monadWriterWriterT
};
