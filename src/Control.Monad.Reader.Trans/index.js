const control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
let Control_MonadPlus = require("../Control.MonadPlus/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_Distributive = require("../Data.Distributive/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
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


let lift2 = function (dictApply) {
	return function (f) {
		return function (a) {
			return function (b) {
				return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b);
			};
		};
	};
};

function alt(dict) {
	return dict.alt;
}

let ReaderT = function (x) {
	return x;
};
let withReaderT = function (f) {
	return function (v) {
		return function ($66) {
			return v(f($66));
		};
	};
};
let runReaderT = function (v) {
	return v;
};
let newtypeReaderT = new Data_Newtype.Newtype(function (n) {
	return n;
}, ReaderT);
let monadTransReaderT = new Control_Monad_Trans_Class.MonadTrans(function () {
	return function ($67) {
		return ReaderT(Data_Functor._const($67));
	};
});
let mapReaderT = function (f) {
	return function (v) {
		return function ($68) {
			return f(v($68));
		};
	};
};
let functorReaderT = function (dictFunctor) {
	return new Data_Functor.Functor((function () {
		let $69 = Data_Functor.map(dictFunctor);
		return function ($70) {
			return mapReaderT($69($70));
		};
	})());
};
let distributiveReaderT = function (dictDistributive) {
	return new Data_Distributive.Distributive(function () {
		return functorReaderT(dictDistributive.Functor0());
	}, function (dictFunctor) {
		return function (f) {
			let $71 = Data_Distributive.distribute(distributiveReaderT(dictDistributive))(dictFunctor);
			let $72 = Data_Functor.map(dictFunctor)(f);
			return function ($73) {
				return $71($72($73));
			};
		};
	}, function (dictFunctor) {
		return function (a) {
			return function (e) {
				return Data_Distributive.collect(dictDistributive)(dictFunctor)(function (r) {
					return r(e);
				})(a);
			};
		};
	});
};
let applyReaderT = function (dictApply) {
	return new Apply(function () {
		return functorReaderT(dictApply.Functor0());
	}, function (v) {
		return function (v1) {
			return function (r) {
				return apply(dictApply)(v(r))(v1(r));
			};
		};
	});
};
let bindReaderT = function (dictBind) {
	return new control.Bind(function () {
		return applyReaderT(dictBind.Apply0());
	}, function (v) {
		return function (k) {
			return function (r) {
				return control.bind(dictBind)(v(r))(function (a) {
					let v1 = k(a);
					return v1(r);
				});
			};
		};
	});
};
let semigroupReaderT = function (dictApply) {
	return function (dictSemigroup) {
		return new Data_Semigroup.Semigroup(lift2(applyReaderT(dictApply))(Data_Semigroup.append(dictSemigroup)));
	};
};
let applicativeReaderT = function (dictApplicative) {
	return new control.Applicative(function () {
		return applyReaderT(dictApplicative.Apply0());
	}, (function () {
		let $74 = control.pure(dictApplicative);
		return function ($75) {
			return ReaderT(Data_Functor._const($74($75)));
		};
	})());
};
let monadReaderT = function (dictMonad) {
	return new control.Monad(function () {
		return applicativeReaderT(dictMonad.Applicative0());
	}, function () {
		return bindReaderT(dictMonad.Bind1());
	});
};
let monadAskReaderT = function (dictMonad) {
	return new Control_Monad_Reader_Class.MonadAsk(function () {
		return monadReaderT(dictMonad);
	}, control.pure(dictMonad.Applicative0()));
};
let monadReaderReaderT = function (dictMonad) {
	return new Control_Monad_Reader_Class.MonadReader(function () {
		return monadAskReaderT(dictMonad);
	}, withReaderT);
};
let monadContReaderT = function (dictMonadCont) {
	return new MonadCont(function () {
		return monadReaderT(dictMonadCont.Monad0());
	}, function (f) {
		return function (r) {
			return callCC(dictMonadCont)(function (c) {
				let v = f(function ($76) {
					return ReaderT(Data_Functor._const(c($76)));
				});
				return v(r);
			});
		};
	});
};
let monadEffectReader = function (dictMonadEffect) {
	return new Effect_Class.MonadEffect(function () {
		return monadReaderT(dictMonadEffect.Monad0());
	}, (function () {
		let $77 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadEffect.Monad0());
		let $78 = Effect_Class.liftEffect(dictMonadEffect);
		return function ($79) {
			return $77($78($79));
		};
	})());
};
let monadRecReaderT = function (dictMonadRec) {
	return new Control_Monad_Rec_Class.MonadRec(function () {
		return monadReaderT(dictMonadRec.Monad0());
	}, function (k) {
		return function (a) {
			let k$prime = function (r) {
				return function (a$prime) {
					let v = k(a$prime);
					return control.bindFlipped((dictMonadRec.Monad0()).Bind1())(control.pure((dictMonadRec.Monad0()).Applicative0()))(v(r));
				};
			};
			return function (r) {
				return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(k$prime(r))(a);
			};
		};
	});
};
let monadStateReaderT = function (dictMonadState) {
	return new Control_Monad_State_Class.MonadState(function () {
		return monadReaderT(dictMonadState.Monad0());
	}, (function () {
		let $80 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadState.Monad0());
		let $81 = Control_Monad_State_Class.state(dictMonadState);
		return function ($82) {
			return $80($81($82));
		};
	})());
};
let monadTellReaderT = function (dictMonadTell) {
	return new Control_Monad_Writer_Class.MonadTell(function () {
		return monadReaderT(dictMonadTell.Monad0());
	}, (function () {
		let $83 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadTell.Monad0());
		let $84 = Control_Monad_Writer_Class.tell(dictMonadTell);
		return function ($85) {
			return $83($84($85));
		};
	})());
};
let monadWriterReaderT = function (dictMonadWriter) {
	return new Control_Monad_Writer_Class.MonadWriter(function () {
		return monadTellReaderT(dictMonadWriter.MonadTell0());
	}, mapReaderT(Control_Monad_Writer_Class.listen(dictMonadWriter)), mapReaderT(Control_Monad_Writer_Class.pass(dictMonadWriter)));
};
let monadThrowReaderT = function (dictMonadThrow) {
	return new Control_Monad_Error_Class.MonadThrow(function () {
		return monadReaderT(dictMonadThrow.Monad0());
	}, (function () {
		let $86 = Control_Monad_Trans_Class.lift(monadTransReaderT)(dictMonadThrow.Monad0());
		let $87 = Control_Monad_Error_Class.throwError(dictMonadThrow);
		return function ($88) {
			return $86($87($88));
		};
	})());
};
let monadErrorReaderT = function (dictMonadError) {
	return new Control_Monad_Error_Class.MonadError(function () {
		return monadThrowReaderT(dictMonadError.MonadThrow0());
	}, function (v) {
		return function (h) {
			return function (r) {
				return Control_Monad_Error_Class.catchError(dictMonadError)(v(r))(function (e) {
					let v1 = h(e);
					return v1(r);
				});
			};
		};
	});
};
let monoidReaderT = function (dictApplicative) {
	return function (dictMonoid) {
		return new Data_Monoid.Monoid(function () {
			return semigroupReaderT(dictApplicative.Apply0())(dictMonoid.Semigroup0());
		}, control.pure(applicativeReaderT(dictApplicative))(Data_Monoid.mempty(dictMonoid)));
	};
};
let altReaderT = function (dictAlt) {
	return new Alt(function () {
		return functorReaderT(dictAlt.Functor0());
	}, function (v) {
		return function (v1) {
			return function (r) {
				return alt(dictAlt)(v(r))(v1(r));
			};
		};
	});
};
let plusReaderT = function (dictPlus) {
	return new control.Plus(function () {
		return altReaderT(dictPlus.Alt0());
	}, Data_Functor._const(control.empty(dictPlus)));
};
let alternativeReaderT = function (dictAlternative) {
	return new Alternative(function () {
		return applicativeReaderT(dictAlternative.Applicative0());
	}, function () {
		return plusReaderT(dictAlternative.Plus1());
	});
};
let monadZeroReaderT = function (dictMonadZero) {
	return new Control_MonadZero.MonadZero(function () {
		return alternativeReaderT(dictMonadZero.Alternative1());
	}, function () {
		return monadReaderT(dictMonadZero.Monad0());
	});
};
let monadPlusReaderT = function (dictMonadPlus) {
	return new Control_MonadPlus.MonadPlus(function () {
		return monadZeroReaderT(dictMonadPlus.MonadZero0());
	});
};

module.exports = {
	ReaderT: ReaderT,
	runReaderT: runReaderT,
	withReaderT: withReaderT,
	mapReaderT: mapReaderT,
	newtypeReaderT: newtypeReaderT,
	functorReaderT: functorReaderT,
	applyReaderT: applyReaderT,
	applicativeReaderT: applicativeReaderT,
	altReaderT: altReaderT,
	plusReaderT: plusReaderT,
	alternativeReaderT: alternativeReaderT,
	bindReaderT: bindReaderT,
	monadReaderT: monadReaderT,
	monadZeroReaderT: monadZeroReaderT,
	semigroupReaderT: semigroupReaderT,
	monoidReaderT: monoidReaderT,
	monadPlusReaderT: monadPlusReaderT,
	monadTransReaderT: monadTransReaderT,
	monadEffectReader: monadEffectReader,
	monadContReaderT: monadContReaderT,
	monadThrowReaderT: monadThrowReaderT,
	monadErrorReaderT: monadErrorReaderT,
	monadAskReaderT: monadAskReaderT,
	monadReaderReaderT: monadReaderReaderT,
	monadStateReaderT: monadStateReaderT,
	monadTellReaderT: monadTellReaderT,
	monadWriterReaderT: monadWriterReaderT,
	distributiveReaderT: distributiveReaderT,
	monadRecReaderT: monadRecReaderT
};
