

let control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Control_Plus = require("../Control.Plus/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
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

function pure(dict) {
	return dict.pure;
}


let MaybeT = function (x) {
	return x;
};
let runMaybeT = function (v) {
	return v;
};
let newtypeMaybeT = new Data_Newtype.Newtype(function (n) {
	return n;
}, MaybeT);
let monadTransMaybeT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
	let $71 = control.liftM1(dictMonad)(Data_Maybe.Just.create);
	return function ($72) {
		return MaybeT($71($72));
	};
});
let mapMaybeT = function (f) {
	return function (v) {
		return f(v);
	};
};
let functorMaybeT = function (dictFunctor) {
	return new Data_Functor.Functor(function (f) {
		return function (v) {
			return Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Maybe.functorMaybe)(f))(v);
		};
	});
};
let monadMaybeT = function (dictMonad) {
	return new control.Monad(function () {
		return applicativeMaybeT(dictMonad);
	}, function () {
		return bindMaybeT(dictMonad);
	});
};
let bindMaybeT = function (dictMonad) {
	return new control.Bind(function () {
		return applyMaybeT(dictMonad);
	}, function (v) {
		return function (f) {
			return control.bind(dictMonad.Bind1())(v)(function (v1) {
				if (v1 instanceof Data_Maybe.Nothing) {
					return pure(dictMonad.Applicative0())(Data_Maybe.Nothing.value);
				};
				if (v1 instanceof Data_Maybe.Just) {
					let v2 = f(v1.value0);
					return v2;
				};
				throw new Error("Failed pattern match at Control.Monad.Maybe.Trans (line 54, column 11 - line 56, column 42): " + [v1.constructor.name]);
			});
		};
	});
};
let applyMaybeT = function (dictMonad) {
	return new Apply(function () {
		return functorMaybeT(((dictMonad.Bind1()).Apply0()).Functor0());
	}, control.ap(monadMaybeT(dictMonad)));
};
let applicativeMaybeT = function (dictMonad) {
	return new Applicative(function () {
		return applyMaybeT(dictMonad);
	}, (function () {
		let $73 = pure(dictMonad.Applicative0());
		return function ($74) {
			return MaybeT($73(Data_Maybe.Just.create($74)));
		};
	})());
};
let monadAskMaybeT = function (dictMonadAsk) {
	return new Control_Monad_Reader_Class.MonadAsk(function () {
		return monadMaybeT(dictMonadAsk.Monad0());
	}, Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
};
let monadReaderMaybeT = function (dictMonadReader) {
	return new Control_Monad_Reader_Class.MonadReader(function () {
		return monadAskMaybeT(dictMonadReader.MonadAsk0());
	}, function (f) {
		return mapMaybeT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
	});
};
let monadContMaybeT = function (dictMonadCont) {
	return new MonadCont(function () {
		return monadMaybeT(dictMonadCont.Monad0());
	}, function (f) {
		return MaybeT(callCC(dictMonadCont)(function (c) {
			let v = f(function (a) {
				return MaybeT(c(new Data_Maybe.Just(a)));
			});
			return v;
		}));
	});
};
let monadEffectMaybe = function (dictMonadEffect) {
	return new Effect_Class.MonadEffect(function () {
		return monadMaybeT(dictMonadEffect.Monad0());
	}, (function () {
		let $75 = Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadEffect.Monad0());
		let $76 = Effect_Class.liftEffect(dictMonadEffect);
		return function ($77) {
			return $75($76($77));
		};
	})());
};
let monadRecMaybeT = function (dictMonadRec) {
	return new Control_Monad_Rec_Class.MonadRec(function () {
		return monadMaybeT(dictMonadRec.Monad0());
	}, function (f) {
		let $78 = Control_Monad_Rec_Class.tailRecM(dictMonadRec)(function (a) {
			let v = f(a);
			return control.bind((dictMonadRec.Monad0()).Bind1())(v)(function (m$prime) {
				return pure((dictMonadRec.Monad0()).Applicative0())((function () {
					if (m$prime instanceof Data_Maybe.Nothing) {
						return new Control_Monad_Rec_Class.Done(Data_Maybe.Nothing.value);
					};
					if (m$prime instanceof Data_Maybe.Just && m$prime.value0 instanceof Control_Monad_Rec_Class.Loop) {
						return new Control_Monad_Rec_Class.Loop(m$prime.value0.value0);
					};
					if (m$prime instanceof Data_Maybe.Just && m$prime.value0 instanceof Control_Monad_Rec_Class.Done) {
						return new Control_Monad_Rec_Class.Done(new Data_Maybe.Just(m$prime.value0.value0));
					};
					throw new Error("Failed pattern match at Control.Monad.Maybe.Trans (line 84, column 16 - line 87, column 43): " + [m$prime.constructor.name]);
				})());
			});
		});
		return function ($79) {
			return MaybeT($78($79));
		};
	});
};
let monadStateMaybeT = function (dictMonadState) {
	return new Control_Monad_State_Class.MonadState(function () {
		return monadMaybeT(dictMonadState.Monad0());
	}, function (f) {
		return Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
	});
};
let monadTellMaybeT = function (dictMonadTell) {
	return new Control_Monad_Writer_Class.MonadTell(function () {
		return monadMaybeT(dictMonadTell.Monad0());
	}, (function () {
		let $80 = Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadTell.Monad0());
		let $81 = Control_Monad_Writer_Class.tell(dictMonadTell);
		return function ($82) {
			return $80($81($82));
		};
	})());
};
let monadWriterMaybeT = function (dictMonadWriter) {
	return new Control_Monad_Writer_Class.MonadWriter(function () {
		return monadTellMaybeT(dictMonadWriter.MonadTell0());
	}, mapMaybeT(function (m) {
		return control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m))(function (v) {
			return pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())(Data_Functor.map(Data_Maybe.functorMaybe)(function (r) {
				return new Data_Tuple.Tuple(r, v.value1);
			})(v.value0));
		});
	}), mapMaybeT(function (m) {
		return Control_Monad_Writer_Class.pass(dictMonadWriter)(control.bind(((dictMonadWriter.MonadTell0()).Monad0()).Bind1())(m)(function (a) {
			return pure(((dictMonadWriter.MonadTell0()).Monad0()).Applicative0())((function () {
				if (a instanceof Data_Maybe.Nothing) {
					return new Data_Tuple.Tuple(Data_Maybe.Nothing.value, identity(categoryFn));
				};
				if (a instanceof Data_Maybe.Just) {
					return new Data_Tuple.Tuple(new Data_Maybe.Just(a.value0.value0), a.value0.value1);
				};
				throw new Error("Failed pattern match at Control.Monad.Maybe.Trans (line 121, column 10 - line 123, column 43): " + [a.constructor.name]);
			})());
		}));
	}));
};
let monadThrowMaybeT = function (dictMonadThrow) {
	return new Control_Monad_Error_Class.MonadThrow(function () {
		return monadMaybeT(dictMonadThrow.Monad0());
	}, function (e) {
		return Control_Monad_Trans_Class.lift(monadTransMaybeT)(dictMonadThrow.Monad0())(Control_Monad_Error_Class.throwError(dictMonadThrow)(e));
	});
};
let monadErrorMaybeT = function (dictMonadError) {
	return new Control_Monad_Error_Class.MonadError(function () {
		return monadThrowMaybeT(dictMonadError.MonadThrow0());
	}, function (v) {
		return function (h) {
			return MaybeT(Control_Monad_Error_Class.catchError(dictMonadError)(v)(function (a) {
				let v1 = h(a);
				return v1;
			}));
		};
	});
};
let altMaybeT = function (dictMonad) {
	return new Alt(function () {
		return functorMaybeT(((dictMonad.Bind1()).Apply0()).Functor0());
	}, function (v) {
		return function (v1) {
			return control.bind(dictMonad.Bind1())(v)(function (m) {
				if (m instanceof Data_Maybe.Nothing) {
					return v1;
				};
				return pure(dictMonad.Applicative0())(m);
			});
		};
	});
};
let plusMaybeT = function (dictMonad) {
	return new Control_Plus.Plus(function () {
		return altMaybeT(dictMonad);
	}, pure(dictMonad.Applicative0())(Data_Maybe.Nothing.value));
};
let alternativeMaybeT = function (dictMonad) {
	return new Alternative(function () {
		return applicativeMaybeT(dictMonad);
	}, function () {
		return plusMaybeT(dictMonad);
	});
};
let monadZeroMaybeT = function (dictMonad) {
	return new Control_MonadZero.MonadZero(function () {
		return alternativeMaybeT(dictMonad);
	}, function () {
		return monadMaybeT(dictMonad);
	});
};
let monadPlusMaybeT = function (dictMonad) {
	return new Control_MonadPlus.MonadPlus(function () {
		return monadZeroMaybeT(dictMonad);
	});
};
module.exports = {
	MaybeT: MaybeT,
	runMaybeT: runMaybeT,
	mapMaybeT: mapMaybeT,
	newtypeMaybeT: newtypeMaybeT,
	functorMaybeT: functorMaybeT,
	applyMaybeT: applyMaybeT,
	applicativeMaybeT: applicativeMaybeT,
	bindMaybeT: bindMaybeT,
	monadMaybeT: monadMaybeT,
	monadTransMaybeT: monadTransMaybeT,
	altMaybeT: altMaybeT,
	plusMaybeT: plusMaybeT,
	alternativeMaybeT: alternativeMaybeT,
	monadPlusMaybeT: monadPlusMaybeT,
	monadZeroMaybeT: monadZeroMaybeT,
	monadRecMaybeT: monadRecMaybeT,
	monadEffectMaybe: monadEffectMaybe,
	monadContMaybeT: monadContMaybeT,
	monadThrowMaybeT: monadThrowMaybeT,
	monadErrorMaybeT: monadErrorMaybeT,
	monadAskMaybeT: monadAskMaybeT,
	monadReaderMaybeT: monadReaderMaybeT,
	monadStateMaybeT: monadStateMaybeT,
	monadTellMaybeT: monadTellMaybeT,
	monadWriterMaybeT: monadWriterMaybeT
};
