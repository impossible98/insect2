const control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
let Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
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

function alt(dict) {
	return dict.alt;
}

let RWSResult = (() => {
	function RWSResult(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	RWSResult.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new RWSResult(value0, value1, value2);
			};
		};
	};
	return RWSResult;
})();
let RWST = function (x) {
	return x;
};
let withRWST = function (f) {
	return function (m) {
		return function (r) {
			return function (s) {
				return Data_Tuple.uncurry(m)(f(r)(s));
			};
		};
	};
};
let runRWST = function (v) {
	return v;
};
let newtypeRWST = new Data_Newtype.Newtype(function (n) {
	return n;
}, RWST);
let monadTransRWST = function (dictMonoid) {
	return new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
		return function (m) {
			return function (v) {
				return function (s) {
					return control.bind(dictMonad.Bind1())(m)(function (a) {
						return control.pure(dictMonad.Applicative0())(new RWSResult(s, a, Data_Monoid.mempty(dictMonoid)));
					});
				};
			};
		};
	});
};
let mapRWST = function (f) {
	return function (v) {
		return function (r) {
			return function (s) {
				return f(v(r)(s));
			};
		};
	};
};
let lazyRWST = new control.Lazy(function (f) {
	return function (r) {
		return function (s) {
			let v = f({});
			return v(r)(s);
		};
	};
});
let functorRWST = function (dictFunctor) {
	return new data.Functor(function (f) {
		return function (v) {
			return function (r) {
				return function (s) {
					return data.map(dictFunctor)(function (v1) {
						return new RWSResult(v1.value0, f(v1.value1), v1.value2);
					})(v(r)(s));
				};
			};
		};
	});
};
let execRWST = function (dictMonad) {
	return function (v) {
		return function (r) {
			return function (s) {
				return control.bind(dictMonad.Bind1())(v(r)(s))(function (v1) {
					return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0, v1.value2));
				});
			};
		};
	};
};
let evalRWST = function (dictMonad) {
	return function (v) {
		return function (r) {
			return function (s) {
				return control.bind(dictMonad.Bind1())(v(r)(s))(function (v1) {
					return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value1, v1.value2));
				});
			};
		};
	};
};
let applyRWST = function (dictBind) {
	return function (dictMonoid) {
		return new Apply(() => {
			return functorRWST((dictBind.Apply0()).Functor0());
		}, function (v) {
			return function (v1) {
				return function (r) {
					return function (s) {
						return control.bind(dictBind)(v(r)(s))(function (v2) {
							return data.mapFlipped((dictBind.Apply0()).Functor0())(v1(r)(v2.value0))(function (v3) {
								return new RWSResult(v3.value0, v2.value1(v3.value1), Data_Semigroup.append(dictMonoid.Semigroup0())(v2.value2)(v3.value2));
							});
						});
					};
				};
			};
		});
	};
};
let bindRWST = function (dictBind) {
	return function (dictMonoid) {
		return new control.Bind(() => {
			return applyRWST(dictBind)(dictMonoid);
		}, function (v) {
			return function (f) {
				return function (r) {
					return function (s) {
						return control.bind(dictBind)(v(r)(s))(function (v1) {
							let v2 = f(v1.value1);
							return data.mapFlipped((dictBind.Apply0()).Functor0())(v2(r)(v1.value0))(function (v3) {
								return new RWSResult(v3.value0, v3.value1, Data_Semigroup.append(dictMonoid.Semigroup0())(v1.value2)(v3.value2));
							});
						});
					};
				};
			};
		});
	};
};
let applicativeRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new control.Applicative(() => {
			return applyRWST(dictMonad.Bind1())(dictMonoid);
		}, function (a) {
			return function (v) {
				return function (s) {
					return control.pure(dictMonad.Applicative0())(new RWSResult(s, a, Data_Monoid.mempty(dictMonoid)));
				};
			};
		});
	};
};
let monadRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new control.Monad(() => {
			return applicativeRWST(dictMonad)(dictMonoid);
		}, () => {
			return bindRWST(dictMonad.Bind1())(dictMonoid);
		});
	};
};
let monadAskRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new Control_Monad_Reader_Class.MonadAsk(() => {
			return monadRWST(dictMonad)(dictMonoid);
		}, function (r) {
			return function (s) {
				return Control_Applicative.pure(dictMonad.Applicative0())(new RWSResult(s, r, Data_Monoid.mempty(dictMonoid)));
			};
		});
	};
};
let monadReaderRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new Control_Monad_Reader_Class.MonadReader(() => {
			return monadAskRWST(dictMonad)(dictMonoid);
		}, function (f) {
			return function (m) {
				return function (r) {
					return function (s) {
						return m(f(r))(s);
					};
				};
			};
		});
	};
};
let monadEffectRWS = function (dictMonoid) {
	return function (dictMonadEffect) {
		return new Effect_Class.MonadEffect(() => {
			return monadRWST(dictMonadEffect.Monad0())(dictMonoid);
		}, (() => {
			let $155 = Control_Monad_Trans_Class.lift(monadTransRWST(dictMonoid))(dictMonadEffect.Monad0());
			let $156 = Effect_Class.liftEffect(dictMonadEffect);
			return function ($157) {
				return $155($156($157));
			};
		})());
	};
};
let monadRecRWST = function (dictMonadRec) {
	return function (dictMonoid) {
		return new Control_Monad_Rec_Class.MonadRec(() => {
			return monadRWST(dictMonadRec.Monad0())(dictMonoid);
		}, function (k) {
			return function (a) {
				let k$prime = function (r) {
					return function (v) {
						let v1 = k(v.value1);
						return control.bind((dictMonadRec.Monad0()).Bind1())(v1(r)(v.value0))(function (v2) {
							return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())((() => {
								if (v2.value1 instanceof Control_Monad_Rec_Class.Loop) {
									return new Control_Monad_Rec_Class.Loop(new RWSResult(v2.value0, v2.value1.value0, Data_Semigroup.append(dictMonoid.Semigroup0())(v.value2)(v2.value2)));
								};
								if (v2.value1 instanceof Control_Monad_Rec_Class.Done) {
									return new Control_Monad_Rec_Class.Done(new RWSResult(v2.value0, v2.value1.value0, Data_Semigroup.append(dictMonoid.Semigroup0())(v.value2)(v2.value2)));
								};
								throw new Error("Failed pattern match at Control.Monad.RWS.Trans (line 127, column 16 - line 129, column 68): " + [v2.value1.constructor.name]);
							})());
						});
					};
				};
				return function (r) {
					return function (s) {
						return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(k$prime(r))(new RWSResult(s, a, Data_Monoid.mempty(dictMonoid)));
					};
				};
			};
		});
	};
};
let monadStateRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new Control_Monad_State_Class.MonadState(() => {
			return monadRWST(dictMonad)(dictMonoid);
		}, function (f) {
			return function (v) {
				return function (s) {
					let v1 = f(s);
					return Control_Applicative.pure(dictMonad.Applicative0())(new RWSResult(v1.value1, v1.value0, Data_Monoid.mempty(dictMonoid)));
				};
			};
		});
	};
};
let monadTellRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new Control_Monad_Writer_Class.MonadTell(() => {
			return monadRWST(dictMonad)(dictMonoid);
		}, function (w) {
			return function (v) {
				return function (s) {
					return Control_Applicative.pure(dictMonad.Applicative0())(new RWSResult(s, {}, w));
				};
			};
		});
	};
};
let monadWriterRWST = function (dictMonad) {
	return function (dictMonoid) {
		return new Control_Monad_Writer_Class.MonadWriter(() => {
			return monadTellRWST(dictMonad)(dictMonoid);
		}, function (m) {
			return function (r) {
				return function (s) {
					return control.bind(dictMonad.Bind1())(m(r)(s))(function (v) {
						return Control_Applicative.pure(dictMonad.Applicative0())(new RWSResult(v.value0, new Data_Tuple.Tuple(v.value1, v.value2), v.value2));
					});
				};
			};
		}, function (m) {
			return function (r) {
				return function (s) {
					return control.bind(dictMonad.Bind1())(m(r)(s))(function (v) {
						return Control_Applicative.pure(dictMonad.Applicative0())(new RWSResult(v.value0, v.value1.value0, v.value1.value1(v.value2)));
					});
				};
			};
		});
	};
};
let monadThrowRWST = function (dictMonadThrow) {
	return function (dictMonoid) {
		return new Control_Monad_Error_Class.MonadThrow(() => {
			return monadRWST(dictMonadThrow.Monad0())(dictMonoid);
		}, function (e) {
			return Control_Monad_Trans_Class.lift(monadTransRWST(dictMonoid))(dictMonadThrow.Monad0())(Control_Monad_Error_Class.throwError(dictMonadThrow)(e));
		});
	};
};
let monadErrorRWST = function (dictMonadError) {
	return function (dictMonoid) {
		return new Control_Monad_Error_Class.MonadError(() => {
			return monadThrowRWST(dictMonadError.MonadThrow0())(dictMonoid);
		}, function (m) {
			return function (h) {
				return RWST(function (r) {
					return function (s) {
						return Control_Monad_Error_Class.catchError(dictMonadError)(m(r)(s))(function (e) {
							let v = h(e);
							return v(r)(s);
						});
					};
				});
			};
		});
	};
};
let altRWST = function (dictAlt) {
	return new Alt(() => {
		return functorRWST(dictAlt.Functor0());
	}, function (v) {
		return function (v1) {
			return RWST(function (r) {
				return function (s) {
					return alt(dictAlt)(v(r)(s))(v1(r)(s));
				};
			});
		};
	});
};
let plusRWST = function (dictPlus) {
	return new control.Plus(() => {
		return altRWST(dictPlus.Alt0());
	}, function (v) {
		return function (v1) {
			return control.empty(dictPlus);
		};
	});
};
let alternativeRWST = function (dictMonoid) {
	return function (dictAlternative) {
		return function (dictMonad) {
			return new Alternative(() => {
				return applicativeRWST(dictMonad)(dictMonoid);
			}, () => {
				return plusRWST(dictAlternative.Plus1());
			});
		};
	};
};
module.exports = {
	RWSResult: RWSResult,
	RWST: RWST,
	runRWST: runRWST,
	evalRWST: evalRWST,
	execRWST: execRWST,
	mapRWST: mapRWST,
	withRWST: withRWST,
	newtypeRWST: newtypeRWST,
	functorRWST: functorRWST,
	applyRWST: applyRWST,
	altRWST: altRWST,
	alternativeRWST: alternativeRWST,
	bindRWST: bindRWST,
	applicativeRWST: applicativeRWST,
	monadRWST: monadRWST,
	monadTransRWST: monadTransRWST,
	lazyRWST: lazyRWST,
	monadEffectRWS: monadEffectRWS,
	monadAskRWST: monadAskRWST,
	monadReaderRWST: monadReaderRWST,
	monadStateRWST: monadStateRWST,
	monadTellRWST: monadTellRWST,
	monadWriterRWST: monadWriterRWST,
	monadThrowRWST: monadThrowRWST,
	monadErrorRWST: monadErrorRWST,
	monadRecRWST: monadRecRWST,
	plusRWST: plusRWST
};
