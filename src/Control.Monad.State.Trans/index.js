const control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
const data = require('../data');
let Data_Newtype = require("../Data.Newtype/index.js");
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


function alt(dict) {
	return dict.alt;
}

let StateT = function (x) {
    return x;
};

let withStateT = function (f) {
    return function (v) {
        return function ($105) {
            return v(f($105));
        };
    };
};
let runStateT = function (v) {
    return v;
};
let newtypeStateT = new Data_Newtype.Newtype(function (n) {
    return n;
}, StateT);
let monadTransStateT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
    return function (m) {
        return function (s) {
            return control.bind(dictMonad.Bind1())(m)(function (x) {
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(x, s));
            });
        };
    };
});
let mapStateT = function (f) {
    return function (v) {
        return function ($106) {
            return f(v($106));
        };
    };
};
let lazyStateT = new control.Lazy(function (f) {
    return function (s) {
        let v = f({});
        return v(s);
    };
});
let functorStateT = function (dictFunctor) {
    return new data.Functor(function (f) {
        return function (v) {
            return function (s) {
                return data.map(dictFunctor)(function (v1) {
                    return new Data_Tuple.Tuple(f(v1.value0), v1.value1);
                })(v(s));
            };
        };
    });
};
let execStateT = function (dictFunctor) {
    return function (v) {
        return function (s) {
            return data.map(dictFunctor)(Data_Tuple.snd)(v(s));
        };
    };
};
let evalStateT = function (dictFunctor) {
    return function (v) {
        return function (s) {
            return data.map(dictFunctor)(Data_Tuple.fst)(v(s));
        };
    };
};
let monadStateT = function (dictMonad) {
    return new control.Monad(() => {
        return applicativeStateT(dictMonad);
    }, () => {
        return bindStateT(dictMonad);
    });
};
let bindStateT = function (dictMonad) {
    return new control.Bind(() => {
        return applyStateT(dictMonad);
    }, function (v) {
        return function (f) {
            return function (s) {
                return control.bind(dictMonad.Bind1())(v(s))(function (v1) {
                    let v3 = f(v1.value0);
                    return v3(v1.value1);
                });
            };
        };
    });
};
let applyStateT = function (dictMonad) {
    return new Apply(() => {
        return functorStateT(((dictMonad.Bind1()).Apply0()).Functor0());
    }, control.ap(monadStateT(dictMonad)));
};
let applicativeStateT = function (dictMonad) {
    return new control.Applicative(() => {
        return applyStateT(dictMonad);
    }, function (a) {
        return function (s) {
            return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(a, s));
        };
    });
};
let monadAskStateT = function (dictMonadAsk) {
    return new Control_Monad_Reader_Class.MonadAsk(() => {
        return monadStateT(dictMonadAsk.Monad0());
    }, Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};
let monadReaderStateT = function (dictMonadReader) {
    return new Control_Monad_Reader_Class.MonadReader(() => {
        return monadAskStateT(dictMonadReader.MonadAsk0());
    }, (() => {
        let $107 = Control_Monad_Reader_Class.local(dictMonadReader);
        return function ($108) {
            return mapStateT($107($108));
        };
    })());
};
let monadContStateT = function (dictMonadCont) {
    return new MonadCont(() => {
        return monadStateT(dictMonadCont.Monad0());
    }, function (f) {
        return function (s) {
            return callCC(dictMonadCont)(function (c) {
                let v = f(function (a) {
                    return function (s$prime) {
                        return c(new Data_Tuple.Tuple(a, s$prime));
                    };
                });
                return v(s);
            });
        };
    });
};
let monadEffectState = function (dictMonadEffect) {
    return new Effect_Class.MonadEffect(() => {
        return monadStateT(dictMonadEffect.Monad0());
    }, (() => {
        let $109 = Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadEffect.Monad0());
        let $110 = Effect_Class.liftEffect(dictMonadEffect);
        return function ($111) {
            return $109($110($111));
        };
    })());
};
let monadRecStateT = function (dictMonadRec) {
    return new Control_Monad_Rec_Class.MonadRec(() => {
        return monadStateT(dictMonadRec.Monad0());
    }, function (f) {
        return function (a) {
            let f$prime = function (v) {
                let v1 = f(v.value0);
                return control.bind((dictMonadRec.Monad0()).Bind1())(v1(v.value1))(function (v2) {
                    return control.pure((dictMonadRec.Monad0()).Applicative0())((() => {
                        if (v2.value0 instanceof Control_Monad_Rec_Class.Loop) {
                            return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(v2.value0.value0, v2.value1));
                        };
                        if (v2.value0 instanceof Control_Monad_Rec_Class.Done) {
                            return new Control_Monad_Rec_Class.Done(new Data_Tuple.Tuple(v2.value0.value0, v2.value1));
                        };
                        throw new Error("Failed pattern match at Control.Monad.State.Trans (line 87, column 16 - line 89, column 40): " + [ v2.value0.constructor.name ]);
                    })());
                });
            };
            return function (s) {
                return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(f$prime)(new Data_Tuple.Tuple(a, s));
            };
        };
    });
};
let monadStateStateT = function (dictMonad) {
    return new Control_Monad_State_Class.MonadState(() => {
        return monadStateT(dictMonad);
    }, function (f) {
        return StateT((() => {
            let $112 = control.pure(dictMonad.Applicative0());
            return function ($113) {
                return $112(f($113));
            };
        })());
    });
};
let monadTellStateT = function (dictMonadTell) {
    return new Control_Monad_Writer_Class.MonadTell(() => {
        return monadStateT(dictMonadTell.Monad0());
    }, (() => {
        let $114 = Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadTell.Monad0());
        let $115 = Control_Monad_Writer_Class.tell(dictMonadTell);
        return function ($116) {
            return $114($115($116));
        };
    })());
};
let monadWriterStateT = function (dictMonadWriter) {
    return new Control_Monad_Writer_Class.MonadWriter(() => {
        return monadTellStateT(dictMonadWriter.MonadTell0());
    }, function (m) {
        return function (s) {
            return control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m(s)))(function (v) {
                return control.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value0, v.value1), v.value0.value1));
            });
        };
    }, function (m) {
        return function (s) {
            return Control_Monad_Writer_Class.pass(dictMonadWriter)(control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(m(s))(function (v) {
                return control.pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(new Data_Tuple.Tuple(new Data_Tuple.Tuple(v.value0.value0, v.value1), v.value0.value1));
            }));
        };
    });
};
let monadThrowStateT = function (dictMonadThrow) {
    return new Control_Monad_Error_Class.MonadThrow(() => {
        return monadStateT(dictMonadThrow.Monad0());
    }, function (e) {
        return Control_Monad_Trans_Class.lift(monadTransStateT)(dictMonadThrow.Monad0())(Control_Monad_Error_Class.throwError(dictMonadThrow)(e));
    });
};
let monadErrorStateT = function (dictMonadError) {
    return new Control_Monad_Error_Class.MonadError(() => {
        return monadThrowStateT(dictMonadError.MonadThrow0());
    }, function (v) {
        return function (h) {
            return function (s) {
                return Control_Monad_Error_Class.catchError(dictMonadError)(v(s))(function (e) {
                    let v1 = h(e);
                    return v1(s);
                });
            };
        };
    });
};
let altStateT = function (dictMonad) {
    return function (dictAlt) {
        return new Alt(() => {
            return functorStateT(dictAlt.Functor0());
        }, function (v) {
            return function (v1) {
                return function (s) {
                    return alt(dictAlt)(v(s))(v1(s));
                };
            };
        });
    };
};
let plusStateT = function (dictMonad) {
    return function (dictPlus) {
        return new control.Plus(() => {
            return altStateT(dictMonad)(dictPlus.Alt0());
        }, function (v) {
            return control.empty(dictPlus);
        });
    };
};
let alternativeStateT = function (dictMonad) {
    return function (dictAlternative) {
        return new Alternative(() => {
            return applicativeStateT(dictMonad);
        }, () => {
            return plusStateT(dictMonad)(dictAlternative.Plus1());
        });
    };
};
let monadZeroStateT = function (dictMonadZero) {
    return new Control_MonadZero.MonadZero(() => {
        return alternativeStateT(dictMonadZero.Monad0())(dictMonadZero.Alternative1());
    }, () => {
        return monadStateT(dictMonadZero.Monad0());
    });
};
let monadPlusStateT = function (dictMonadPlus) {
    return new Control_MonadPlus.MonadPlus(() => {
        return monadZeroStateT(dictMonadPlus.MonadZero0());
    });
};
module.exports = {
    StateT: StateT,
    runStateT: runStateT,
    evalStateT: evalStateT,
    execStateT: execStateT,
    mapStateT: mapStateT,
    withStateT: withStateT,
    newtypeStateT: newtypeStateT,
    functorStateT: functorStateT,
    applyStateT: applyStateT,
    applicativeStateT: applicativeStateT,
    altStateT: altStateT,
    plusStateT: plusStateT,
    alternativeStateT: alternativeStateT,
    bindStateT: bindStateT,
    monadStateT: monadStateT,
    monadRecStateT: monadRecStateT,
    monadZeroStateT: monadZeroStateT,
    monadPlusStateT: monadPlusStateT,
    monadTransStateT: monadTransStateT,
    lazyStateT: lazyStateT,
    monadEffectState: monadEffectState,
    monadContStateT: monadContStateT,
    monadThrowStateT: monadThrowStateT,
    monadErrorStateT: monadErrorStateT,
    monadAskStateT: monadAskStateT,
    monadReaderStateT: monadReaderStateT,
    monadStateStateT: monadStateStateT,
    monadTellStateT: monadTellStateT,
    monadWriterStateT: monadWriterStateT
};
