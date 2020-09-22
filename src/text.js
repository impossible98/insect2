let control = require("./control");
let Control_Monad_Error_Class = require("./Control.Monad.Error.Class/index.js");
let Control_Monad_Except_Trans = require("./Control.Monad.Except.Trans/index.js");
let Control_Monad_State_Class = require("./Control.Monad.State.Class/index.js");
let Control_Monad_State_Trans = require("./Control.Monad.State.Trans/index.js");
let Control_Monad_Trans_Class = require("./Control.Monad.Trans.Class/index.js");
let Control_MonadPlus = require("./Control.MonadPlus/index.js");
let Control_MonadZero = require("./Control.MonadZero/index.js");
let Control_Plus = require("./Control.Plus/index.js");
let Data_Either = require("./Data.Either/index.js");
const data = require("./data");
let Data_Identity = require("./Data.Identity/index.js");
let Data_Monoid = require("./Data.Monoid/index.js");
let Data_Newtype = require("./Data.Newtype/index.js");
let Data_Ord = require("./Data.Ord/index.js");
let Data_Ordering = require("./Data.Ordering/index.js");
let Data_Semigroup = require("./Data.Semigroup/index.js");
let Data_Show = require("./Data.Show/index.js");
let Data_Tuple = require("./Data.Tuple/index.js");
let Data_Functor = require("./Data.Functor/index.js");


let initialPos = {
	line: 1,
	column: 1
};

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

let showPosition = new Data_Show.Show(function (v) {
	return "(Position { line: " + (Data_Show.show(Data_Show.showInt)(v.line) + (", column: " + (Data_Show.show(Data_Show.showInt)(v.column) + " })")));
});

let eqPosition = new data.Eq(function (x) {
	return function (y) {
		return x.column === y.column && x.line === y.line;
	};
});

let ordPosition = new Data_Ord.Ord(() => {
	return eqPosition;
}, function (x) {
	return function (y) {
		let v = Data_Ord.compare(Data_Ord.ordInt)(x.column)(y.column);
		if (v instanceof Data_Ordering.LT) {
			return Data_Ordering.LT.value;
		};
		if (v instanceof Data_Ordering.GT) {
			return Data_Ordering.GT.value;
		};
		return Data_Ord.compare(Data_Ord.ordInt)(x.line)(y.line);
	};
});

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


let ParseState = (() => {
	function ParseState(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	ParseState.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new ParseState(value0, value1, value2);
			};
		};
	};
	return ParseState;
})();

let ParseError = (() => {
	function ParseError(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	ParseError.create = function (value0) {
		return function (value1) {
			return new ParseError(value0, value1);
		};
	};
	return ParseError;
})();

let ParserT = function (x) {
	return x;
};

let showParseError = new Data_Show.Show(function (v) {
	return "(ParseError " + (Data_Show.show(Data_Show.showString)(v.value0) + (" " + (Data_Show.show(showPosition)(v.value1) + ")")));
});

function parseErrorPosition(v) {
	return v.value1;
}

function parseErrorMessage(v) {
	return v.value0;
}

let newtypeParserT = new Data_Newtype.Newtype(function (n) {
	return n;
}, ParserT);

function runParserT(dictMonad) {
	return (s) => {
		return (p) => {
			let initialState = new ParseState(s, initialPos, false);
			return Control_Monad_State_Trans.evalStateT(((dictMonad.Bind1()).Apply0()).Functor0())(Control_Monad_Except_Trans.runExceptT(Data_Newtype.unwrap(newtypeParserT)(p)))(initialState);
		};
	};
}

function runParser(s) {
	let $90 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
	let $91 = runParserT(Data_Identity.monadIdentity)(s);
	return ($92) => {
		return $90($91($92));
	};
}

let monadTransParserT = new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
	let $93 = Control_Monad_Trans_Class.lift(Control_Monad_Except_Trans.monadTransExceptT)(Control_Monad_State_Trans.monadStateT(dictMonad));
	let $94 = Control_Monad_Trans_Class.lift(Control_Monad_State_Trans.monadTransStateT)(dictMonad);
	return function ($95) {
		return ParserT($93($94($95)));
	};
});

function monadThrowParserT(dictMonad) {
	return Control_Monad_Except_Trans.monadThrowExceptT(Control_Monad_State_Trans.monadStateT(dictMonad));
}

function monadStateParserT(dictMonad) {
	return Control_Monad_Except_Trans.monadStateExceptT(Control_Monad_State_Trans.monadStateStateT(dictMonad));
}

function position(dictMonad) {
	return Control_Monad_State_Class.gets(monadStateParserT(dictMonad))(function (v) {
		return v.value1;
	});
}

function monadRecParserT(dictMonadRec) {
	return Control_Monad_Except_Trans.monadRecExceptT(Control_Monad_State_Trans.monadRecStateT(dictMonadRec));
}

function monadParserT(dictMonad) {
	return Control_Monad_Except_Trans.monadExceptT(Control_Monad_State_Trans.monadStateT(dictMonad));
}

function monadErrorParserT(dictMonad) {
	return Control_Monad_Except_Trans.monadErrorExceptT(Control_Monad_State_Trans.monadStateT(dictMonad));
}

let mapParserT = (() => {
	let $96 = Data_Newtype.over(newtypeParserT)(newtypeParserT)(ParserT);
	return function ($97) {
		return $96(Control_Monad_Except_Trans.mapExceptT(Control_Monad_State_Trans.mapStateT($97)));
	};
})();

let lazyParserT = new control.Lazy(function (f) {
	return control.defer(Control_Monad_State_Trans.lazyStateT)((() => {
		let $98 = Data_Newtype.unwrap(newtypeParserT);
		return function ($99) {
			return Control_Monad_Except_Trans.runExceptT($98(f($99)));
		};
	})());
});

let hoistParserT = mapParserT;

function functorParserT(dictFunctor) {
	return Control_Monad_Except_Trans.functorExceptT(Control_Monad_State_Trans.functorStateT(dictFunctor));
}

function failWithPosition(dictMonad) {
	return (message) => {
		return (pos) => {
			return Control_Monad_Error_Class.throwError(monadThrowParserT(dictMonad))(new ParseError(message, pos));
		};
	};
}

let eqParseError = new data.Eq(function (x) {
	return function (y) {
		return x.value0 === y.value0 && data.eq(eqPosition)(x.value1)(y.value1);
	};
});

let ordParseError = new Data_Ord.Ord(() => {
	return eqParseError;
}, function (x) {
	return function (y) {
		let v = Data_Ord.compare(Data_Ord.ordString)(x.value0)(y.value0);
		if (v instanceof Data_Ordering.LT) {
			return Data_Ordering.LT.value;
		};
		if (v instanceof Data_Ordering.GT) {
			return Data_Ordering.GT.value;
		};
		return Data_Ord.compare(ordPosition)(x.value1)(y.value1);
	};
});

function consume(dictMonad) {
	return Control_Monad_State_Class.modify_(monadStateParserT(dictMonad))(function (v) {
		return new ParseState(v.value0, v.value1, true);
	});
}

function bindParserT(dictMonad) {
	return Control_Monad_Except_Trans.bindExceptT(Control_Monad_State_Trans.monadStateT(dictMonad));
}

function fail(dictMonad) {
	return (message) => {
		return control.bindFlipped(bindParserT(dictMonad))(failWithPosition(dictMonad)(message))(position(dictMonad));
	};
}

function applyParserT(dictMonad) {
	return Control_Monad_Except_Trans.applyExceptT(Control_Monad_State_Trans.monadStateT(dictMonad));
}

function semigroupParserT(dictMonad) {
	return function (dictSemigroup) {
		return new Data_Semigroup.Semigroup(lift2(applyParserT(dictMonad))(Data_Semigroup.append(dictSemigroup)));
	};
}

function applicativeParserT(dictMonad) {
	return Control_Monad_Except_Trans.applicativeExceptT(Control_Monad_State_Trans.monadStateT(dictMonad));
}

function monoidParserT(dictMonad) {
	return (dictMonoid) => {
		return new Data_Monoid.Monoid(() => {
			return semigroupParserT(dictMonad)(dictMonoid.Semigroup0());
		}, control.pure(applicativeParserT(dictMonad))(Data_Monoid.mempty(dictMonoid)));
	};
}

function altParserT(dictMonad) {
	return new Alt(() => {
		return functorParserT(((dictMonad.Bind1()).Apply0()).Functor0());
	}, function (p1) {
		return function (p2) {
			return ParserT(Control_Monad_Except_Trans.ExceptT(Control_Monad_State_Trans.StateT(function (v) {
				return control.bind(dictMonad.Bind1())(Control_Monad_State_Trans.runStateT(Control_Monad_Except_Trans.runExceptT(Data_Newtype.unwrap(newtypeParserT)(p1)))(new ParseState(v.value0, v.value1, false)))(function (v1) {
					if (v1.value0 instanceof Data_Either.Left && !v1.value1.value2) {
						return Control_Monad_State_Trans.runStateT(Control_Monad_Except_Trans.runExceptT(Data_Newtype.unwrap(newtypeParserT)(p2)))(v);
					};
					return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0, v1.value1));
				});
			})));
		};
	});
}

function plusParserT(dictMonad) {
	return new Control_Plus.Plus(() => {
		return altParserT(dictMonad);
	}, fail(dictMonad)("No alternative"));
}

function alternativeParserT(dictMonad) {
	return new Alternative(() => {
		return applicativeParserT(dictMonad);
	}, () => {
		return plusParserT(dictMonad);
	});
}

function monadZeroParserT(dictMonad) {
	return new Control_MonadZero.MonadZero(() => {
		return alternativeParserT(dictMonad);
	}, () => {
		return monadParserT(dictMonad);
	});
}

function monadPlusParserT(dictMonad) {
	return new Control_MonadPlus.MonadPlus(() => {
		return monadZeroParserT(dictMonad);
	});
}

module.exports = {
	ParseError: ParseError,
	parseErrorMessage: parseErrorMessage,
	parseErrorPosition: parseErrorPosition,
	ParseState: ParseState,
	ParserT: ParserT,
	runParser: runParser,
	runParserT: runParserT,
	hoistParserT: hoistParserT,
	mapParserT: mapParserT,
	consume: consume,
	position: position,
	fail: fail,
	failWithPosition: failWithPosition,
	showParseError: showParseError,
	eqParseError: eqParseError,
	ordParseError: ordParseError,
	newtypeParserT: newtypeParserT,
	lazyParserT: lazyParserT,
	semigroupParserT: semigroupParserT,
	monoidParserT: monoidParserT,
	functorParserT: functorParserT,
	applyParserT: applyParserT,
	applicativeParserT: applicativeParserT,
	bindParserT: bindParserT,
	monadParserT: monadParserT,
	monadRecParserT: monadRecParserT,
	monadStateParserT: monadStateParserT,
	monadThrowParserT: monadThrowParserT,
	monadErrorParserT: monadErrorParserT,
	altParserT: altParserT,
	plusParserT: plusParserT,
	alternativeParserT: alternativeParserT,
	monadZeroParserT: monadZeroParserT,
	monadPlusParserT: monadPlusParserT,
	monadTransParserT: monadTransParserT
};
