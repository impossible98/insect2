let $foreign = require("./foreign.js");

const control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Parallel = require("../Control.Parallel/index.js");
let Control_Parallel_Class = require("../Control.Parallel.Class/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Effect = require("../Effect/index.js");
let Effect_Class = require("../Effect.Class/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


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


let unsafePerformEffect = function (f) {
	return f();
};

let Canceler = function (x) {
	return x;
};
let suspendAff = $foreign["_fork"](false);
let newtypeCanceler = new Data_Newtype.Newtype(function (n) {
	return n;
}, Canceler);
let functorParAff = new Data_Functor.Functor($foreign["_parAffMap"]);
let functorAff = new Data_Functor.Functor($foreign["_map"]);
let forkAff = $foreign["_fork"](true);

function crashWith() {
	return function (msg) {
		throw new Error(msg);
	};
}

function unsafePartial(f) {
	return f();

}

function unsafeCrashWith(msg) {
	return unsafePartial(() => {
		return crashWith()(msg);
	});
}


let ffiUtil = (() => {
	let unsafeFromRight = function (v) {
		if (v instanceof Data_Either.Right) {
			return v.value0;
		};
		if (v instanceof Data_Either.Left) {
			return unsafeCrashWith("unsafeFromRight: Left");
		};
		throw new Error("Failed pattern match at Effect.Aff (line 400, column 21 - line 402, column 54): " + [v.constructor.name]);
	};
	let unsafeFromLeft = function (v) {
		if (v instanceof Data_Either.Left) {
			return v.value0;
		};
		if (v instanceof Data_Either.Right) {
			return unsafeCrashWith("unsafeFromLeft: Right");
		};
		throw new Error("Failed pattern match at Effect.Aff (line 395, column 20 - line 397, column 54): " + [v.constructor.name]);
	};
	let isLeft = function (v) {
		if (v instanceof Data_Either.Left) {
			return true;
		};
		if (v instanceof Data_Either.Right) {
			return false;
		};
		throw new Error("Failed pattern match at Effect.Aff (line 390, column 12 - line 392, column 20): " + [v.constructor.name]);
	};
	return {
		isLeft: isLeft,
		fromLeft: unsafeFromLeft,
		fromRight: unsafeFromRight,
		left: Data_Either.Left.create,
		right: Data_Either.Right.create
	};
})();
let makeFiber = function (aff) {
	return $foreign["_makeFiber"](ffiUtil, aff);
};
let launchAff = function (aff) {
	return function __do() {
		let fiber = makeFiber(aff)();
		fiber.run();
		return fiber;
	};
};
let launchAff_ = (() => {
	let $43 = Data_Functor._void(Effect.functorEffect);
	return function ($44) {
		return $43(launchAff($44));
	};
})();
let launchSuspendedAff = makeFiber;
let delay = function (v) {
	return $foreign["_delay"](Data_Either.Right.create, v);
};
let bracket = function (acquire) {
	return function (completed) {
		return $foreign.generalBracket(acquire)({
			killed: Data_Functor._const(completed),
			failed: Data_Functor._const(completed),
			completed: Data_Functor._const(completed)
		});
	};
};
let applyParAff = new Apply(() => {
	return functorParAff;
}, $foreign["_parAffApply"]);
let semigroupParAff = function (dictSemigroup) {
	return new Data_Semigroup.Semigroup(lift2(applyParAff)(Data_Semigroup.append(dictSemigroup)));
};
let monadAff = new control.Monad(() => {
	return applicativeAff;
}, () => {
	return bindAff;
});
let bindAff = new control.Bind(() => {
	return applyAff;
}, $foreign["_bind"]);
let applyAff = new Apply(() => {
	return functorAff;
}, control.ap(monadAff));
let applicativeAff = new control.Applicative(() => {
	return applyAff;
}, $foreign["_pure"]);
let cancelWith = function (aff) {
	return function (v) {
		return $foreign.generalBracket(control.pure(applicativeAff)({}))({
			killed: function (e) {
				return function (v1) {
					return v(e);
				};
			},
			failed: Data_Functor._const(control.pure(applicativeAff)),
			completed: Data_Functor._const(control.pure(applicativeAff))
		})(Data_Functor._const(aff));
	};
};
let $$finally = function (fin) {
	return function (a) {
		return bracket(control.pure(applicativeAff)({}))(Data_Functor._const(fin))(Data_Functor._const(a));
	};
};
let invincible = function (a) {
	return bracket(a)(Data_Functor._const(control.pure(applicativeAff)({})))(control.pure(applicativeAff));
};
let lazyAff = new control.Lazy(function (f) {
	return control.bind(bindAff)(control.pure(applicativeAff)({}))(f);
});
let semigroupAff = function (dictSemigroup) {
	return new Data_Semigroup.Semigroup(lift2(applyAff)(Data_Semigroup.append(dictSemigroup)));
};
let monadEffectAff = new Effect_Class.MonadEffect(() => {
	return monadAff;
}, $foreign["_liftEffect"]);
let effectCanceler = (() => {
	let $45 = Effect_Class.liftEffect(monadEffectAff);
	return function ($46) {
		return Canceler(Data_Functor._const($45($46)));
	};
})();
let joinFiber = function (v) {
	return $foreign.makeAff(function (k) {
		return Data_Functor.map(Effect.functorEffect)(effectCanceler)(v.join(k));
	});
};
let functorFiber = new Data_Functor.Functor(function (f) {
	return function (t) {
		return unsafePerformEffect(makeFiber(Data_Functor.map(functorAff)(f)(joinFiber(t))));
	};
});
let applyFiber = new Apply(() => {
	return functorFiber;
}, function (t1) {
	return function (t2) {
		return unsafePerformEffect(makeFiber(apply(applyAff)(joinFiber(t1))(joinFiber(t2))));
	};
});
let applicativeFiber = new control.Applicative(() => {
	return applyFiber;
}, function (a) {
	return unsafePerformEffect(makeFiber(control.pure(applicativeAff)(a)));
});
let killFiber = function (e) {
	return function (v) {
		return control.bind(bindAff)(Effect_Class.liftEffect(monadEffectAff)(v.isSuspended))(function (v1) {
			if (v1) {
				return Effect_Class.liftEffect(monadEffectAff)(Data_Functor._void(Effect.functorEffect)(v.kill(e, Data_Functor._const(control.pure(Effect.applicativeEffect)({})))));
			};
			return $foreign.makeAff(function (k) {
				return Data_Functor.map(Effect.functorEffect)(effectCanceler)(v.kill(e, k));
			});
		});
	};
};
let fiberCanceler = (() => {
	let $47 = Data_Functor.flip(killFiber);
	return function ($48) {
		return Canceler($47($48));
	};
})();
let monadThrowAff = new Control_Monad_Error_Class.MonadThrow(() => {
	return monadAff;
}, $foreign["_throwError"]);
let monadErrorAff = new Control_Monad_Error_Class.MonadError(() => {
	return monadThrowAff;
}, $foreign["_catchError"]);
let attempt = Control_Monad_Error_Class["try"](monadErrorAff);
let runAff = function (k) {
	return function (aff) {
		return launchAff(control.bindFlipped(bindAff)((() => {
			let $49 = Effect_Class.liftEffect(monadEffectAff);
			return function ($50) {
				return $49(k($50));
			};
		})())(Control_Monad_Error_Class["try"](monadErrorAff)(aff)));
	};
};
let runAff_ = function (k) {
	return function (aff) {
		return Data_Functor._void(Effect.functorEffect)(runAff(k)(aff));
	};
};
let runSuspendedAff = function (k) {
	return function (aff) {
		return launchSuspendedAff(control.bindFlipped(bindAff)((() => {
			let $51 = Effect_Class.liftEffect(monadEffectAff);
			return function ($52) {
				return $51(k($52));
			};
		})())(Control_Monad_Error_Class["try"](monadErrorAff)(aff)));
	};
};
let parallelAff = new Control_Parallel_Class.Parallel(() => {
	return applicativeParAff;
}, () => {
	return monadAff;
}, (arg) => { return arg; }, $foreign["_sequential"]);
let applicativeParAff = new control.Applicative(() => {
	return applyParAff;
}, (() => {
	let $53 = Control_Parallel_Class.parallel(parallelAff);
	let $54 = control.pure(applicativeAff);
	return function ($55) {
		return $53($54($55));
	};
})());
let monoidParAff = function (dictMonoid) {
	return new Data_Monoid.Monoid(() => {
		return semigroupParAff(dictMonoid.Semigroup0());
	}, control.pure(applicativeParAff)(Data_Monoid.mempty(dictMonoid)));
};
let semigroupCanceler = new Data_Semigroup.Semigroup(function (v) {
	return function (v1) {
		return function (err) {
			return Control_Parallel.parSequence_(parallelAff)(Data_Foldable.foldableArray)([v(err), v1(err)]);
		};
	};
});
let supervise = function (aff) {
	let killError = Effect_Exception.error("[Aff] Child fiber outlived parent");
	let killAll = function (err) {
		return function (sup) {
			return $foreign.makeAff(function (k) {
				return $foreign["_killAll"](err, sup.supervisor, k(control.pure(Data_Either.applicativeEither)({})));
			});
		};
	};
	let acquire = function __do() {
		let sup = $foreign["_makeSupervisedFiber"](ffiUtil, aff)();
		sup.fiber.run();
		return sup;
	};
	return $foreign.generalBracket(Effect_Class.liftEffect(monadEffectAff)(acquire))({
		killed: function (err) {
			return function (sup) {
				return Control_Parallel.parSequence_(parallelAff)(Data_Foldable.foldableArray)([killFiber(err)(sup.fiber), killAll(err)(sup)]);
			};
		},
		failed: Data_Functor._const(killAll(killError)),
		completed: Data_Functor._const(killAll(killError))
	})(function ($56) {
		return joinFiber((function (v) {
			return v.fiber;
		})($56));
	});
};
let monadRecAff = new Control_Monad_Rec_Class.MonadRec(() => {
	return monadAff;
}, function (k) {
	let go = function (a) {
		return control.bind(bindAff)(k(a))(function (res) {
			if (res instanceof Control_Monad_Rec_Class.Done) {
				return control.pure(applicativeAff)(res.value0);
			};
			if (res instanceof Control_Monad_Rec_Class.Loop) {
				return go(res.value0);
			};
			throw new Error("Failed pattern match at Effect.Aff (line 100, column 7 - line 102, column 22): " + [res.constructor.name]);
		});
	};
	return go;
});
let monoidAff = function (dictMonoid) {
	return new Data_Monoid.Monoid(() => {
		return semigroupAff(dictMonoid.Semigroup0());
	}, control.pure(applicativeAff)(Data_Monoid.mempty(dictMonoid)));
};
let nonCanceler = Data_Functor._const(control.pure(applicativeAff)({}));
let monoidCanceler = new Data_Monoid.Monoid(() => {
	return semigroupCanceler;
}, nonCanceler);
let never = $foreign.makeAff(function (v) {
	return control.pure(Effect.applicativeEffect)(Data_Monoid.mempty(monoidCanceler));
});
let apathize = (() => {
	let $57 = Data_Functor.map(functorAff)(Data_Functor._const({}));
	return function ($58) {
		return $57(attempt($58));
	};
})();
let altParAff = new Alt(() => {
	return functorParAff;
}, $foreign["_parAffAlt"]);
let altAff = new Alt(() => {
	return functorAff;
}, function (a1) {
	return function (a2) {
		return Control_Monad_Error_Class.catchError(monadErrorAff)(a1)(Data_Functor._const(a2));
	};
});
let plusAff = new control.Plus(() => {
	return altAff;
}, Control_Monad_Error_Class.throwError(monadThrowAff)(Effect_Exception.error("Always fails")));
let plusParAff = new control.Plus(() => {
	return altParAff;
}, Control_Parallel_Class.parallel(parallelAff)(control.empty(plusAff)));
let alternativeParAff = new Alternative(() => {
	return applicativeParAff;
}, () => {
	return plusParAff;
});
module.exports = {
	Canceler: Canceler,
	launchAff: launchAff,
	launchAff_: launchAff_,
	launchSuspendedAff: launchSuspendedAff,
	runAff: runAff,
	runAff_: runAff_,
	runSuspendedAff: runSuspendedAff,
	forkAff: forkAff,
	suspendAff: suspendAff,
	supervise: supervise,
	attempt: attempt,
	apathize: apathize,
	delay: delay,
	never: never,
	"finally": $$finally,
	invincible: invincible,
	killFiber: killFiber,
	joinFiber: joinFiber,
	cancelWith: cancelWith,
	bracket: bracket,
	nonCanceler: nonCanceler,
	effectCanceler: effectCanceler,
	fiberCanceler: fiberCanceler,
	functorAff: functorAff,
	applyAff: applyAff,
	applicativeAff: applicativeAff,
	bindAff: bindAff,
	monadAff: monadAff,
	semigroupAff: semigroupAff,
	monoidAff: monoidAff,
	altAff: altAff,
	plusAff: plusAff,
	monadRecAff: monadRecAff,
	monadThrowAff: monadThrowAff,
	monadErrorAff: monadErrorAff,
	monadEffectAff: monadEffectAff,
	lazyAff: lazyAff,
	functorParAff: functorParAff,
	applyParAff: applyParAff,
	applicativeParAff: applicativeParAff,
	semigroupParAff: semigroupParAff,
	monoidParAff: monoidParAff,
	altParAff: altParAff,
	plusParAff: plusParAff,
	alternativeParAff: alternativeParAff,
	parallelAff: parallelAff,
	functorFiber: functorFiber,
	applyFiber: applyFiber,
	applicativeFiber: applicativeFiber,
	newtypeCanceler: newtypeCanceler,
	semigroupCanceler: semigroupCanceler,
	monoidCanceler: monoidCanceler,
	makeAff: $foreign.makeAff,
	generalBracket: $foreign.generalBracket
};
