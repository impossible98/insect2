const control = require('../control');
let Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans/index.js");
let Control_Monad_State_Trans = require("../Control.Monad.State.Trans/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
const data = require('../data');
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
const text = require("../text");


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

let applyFirst = function (dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(data.map(dictApply.Functor0())(data._const)(a))(b);
		};
	};
};

let applySecond = function (dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(data.map(dictApply.Functor0())(data._const(identity(categoryFn)))(a))(b);
		};
	};
};

function alt(dict) {
	return dict.alt;
}

let withErrorMessage = function (dictMonad) {
    return function (p) {
        return function (msg) {
            return alt(text.altParserT(dictMonad))(p)(text.fail(dictMonad)("Expected " + msg));
        };
    };
};
let tryRethrow = function (dictMonad) {
    return function (p) {
        return text.ParserT(Control_Monad_Except_Trans.ExceptT(Control_Monad_State_Trans.StateT(function (v) {
            return control.bind(dictMonad.Bind1())(Control_Monad_State_Trans.runStateT(Control_Monad_Except_Trans.runExceptT(Data_Newtype.unwrap(text.newtypeParserT)(p)))(v))(function (v1) {
                if (v1.value0 instanceof Data_Either.Left) {
                    return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(new Data_Either.Left(new text.ParseError(v1.value0.value0.value0, v.value1)), new text.ParseState(v1.value1.value0, v1.value1.value1, v.value2)));
                };
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0, v1.value1));
            });
        })));
    };
};
let $$try = function (dictMonad) {
    return function (p) {
        return text.ParserT(Control_Monad_Except_Trans.ExceptT(Control_Monad_State_Trans.StateT(function (v) {
            return control.bind(dictMonad.Bind1())(Control_Monad_State_Trans.runStateT(Control_Monad_Except_Trans.runExceptT(Data_Newtype.unwrap(text.newtypeParserT)(p)))(v))(function (v1) {
                if (v1.value0 instanceof Data_Either.Left) {
                    return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0, new text.ParseState(v1.value1.value0, v1.value1.value1, v.value2)));
                };
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v1.value0, v1.value1));
            });
        })));
    };
};
let skipMany1 = function (dictMonad) {
    return function (p) {
        return control.bind(text.bindParserT(dictMonad))(p)(function (x) {
            return control.bind(text.bindParserT(dictMonad))(skipMany(dictMonad)(p))(function (xs) {
                return control.pure(text.applicativeParserT(dictMonad))({});
            });
        });
    };
};
let skipMany = function (dictMonad) {
    return function (p) {
        return alt(text.altParserT(dictMonad))(skipMany1(dictMonad)(p))(control.pure(text.applicativeParserT(dictMonad))({}));
    };
};
let sepEndBy1 = function (dictMonad) {
    return function (p) {
        return function (sep) {
            return control.bind(text.bindParserT(dictMonad))(p)(function (a) {
                return alt(text.altParserT(dictMonad))(control.bind(text.bindParserT(dictMonad))(sep)(function () {
                    return control.bind(text.bindParserT(dictMonad))(sepEndBy(dictMonad)(p)(sep))(function (as) {
                        return control.pure(text.applicativeParserT(dictMonad))(new Data_List_Types.Cons(a, as));
                    });
                }))(control.pure(text.applicativeParserT(dictMonad))(Data_List.singleton(a)));
            });
        };
    };
};
let sepEndBy = function (dictMonad) {
    return function (p) {
        return function (sep) {
            return alt(text.altParserT(dictMonad))(sepEndBy1(dictMonad)(p)(sep))(control.pure(text.applicativeParserT(dictMonad))(Data_List_Types.Nil.value));
        };
    };
};
let sepBy1 = function (dictMonad) {
    return function (p) {
        return function (sep) {
            return control.bind(text.bindParserT(dictMonad))(p)(function (a) {
                return control.bind(text.bindParserT(dictMonad))(Data_List.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(applySecond(text.applyParserT(dictMonad))(sep)(p)))(function (as) {
                    return control.pure(text.applicativeParserT(dictMonad))(new Data_List_Types.Cons(a, as));
                });
            });
        };
    };
};
let sepBy = function (dictMonad) {
    return function (p) {
        return function (sep) {
            return alt(text.altParserT(dictMonad))(sepBy1(dictMonad)(p)(sep))(control.pure(text.applicativeParserT(dictMonad))(Data_List_Types.Nil.value));
        };
    };
};
let optional = function (dictMonad) {
    return function (p) {
        return alt(text.altParserT(dictMonad))(data._void(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(p))(control.pure(text.applicativeParserT(dictMonad))({}));
    };
};
let option = function (dictMonad) {
    return function (a) {
        return function (p) {
            return alt(text.altParserT(dictMonad))(p)(control.pure(text.applicativeParserT(dictMonad))(a));
        };
    };
};
let optionMaybe = function (dictMonad) {
    return function (p) {
        return option(dictMonad)(Data_Maybe.Nothing.value)(data.map(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Data_Maybe.Just.create)(p));
    };
};
let notFollowedBy = function (dictMonad) {
    return function (p) {
        return $$try(dictMonad)(alt(text.altParserT(dictMonad))(applySecond(text.applyParserT(dictMonad))($$try(dictMonad)(p))(text.fail(dictMonad)("Negated parser succeeded")))(control.pure(text.applicativeParserT(dictMonad))({})));
    };
};
let manyTill = function (dictMonad) {
    return function (p) {
        return function (end) {
            let scan = alt(text.altParserT(dictMonad))(data.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(end)(Data_List_Types.Nil.value))(control.bind(text.bindParserT(dictMonad))(p)(function (x) {
                return control.bind(text.bindParserT(dictMonad))(scan)(function (xs) {
                    return control.pure(text.applicativeParserT(dictMonad))(new Data_List_Types.Cons(x, xs));
                });
            }));
            return scan;
        };
    };
};
let many1Till = function (dictMonad) {
    return function (p) {
        return function (end) {
            return control.bind(text.bindParserT(dictMonad))(p)(function (x) {
                return control.bind(text.bindParserT(dictMonad))(manyTill(dictMonad)(p)(end))(function (xs) {
                    return control.pure(text.applicativeParserT(dictMonad))(new Data_List_Types.Cons(x, xs));
                });
            });
        };
    };
};
let lookAhead = function (dictMonad) {
    return function (p) {
        return text.ParserT(Control_Monad_Except_Trans.ExceptT(Control_Monad_State_Trans.StateT(function (s) {
            return control.bind(dictMonad.Bind1())(Control_Monad_State_Trans.runStateT(Control_Monad_Except_Trans.runExceptT(Data_Newtype.unwrap(text.newtypeParserT)(p)))(s))(function (v) {
                return control.pure(dictMonad.Applicative0())(new Data_Tuple.Tuple(v.value0, s));
            });
        })));
    };
};
let endBy1 = function (dictMonad) {
    return function (p) {
        return function (sep) {
            return Data_List.some(text.alternativeParserT(dictMonad))(text.lazyParserT)(applyFirst(text.applyParserT(dictMonad))(p)(sep));
        };
    };
};
let endBy = function (dictMonad) {
    return function (p) {
        return function (sep) {
            return Data_List.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(applyFirst(text.applyParserT(dictMonad))(p)(sep));
        };
    };
};
let choice = function (dictFoldable) {
    return function (dictMonad) {
        return Data_Foldable.foldl(dictFoldable)(alt(text.altParserT(dictMonad)))(control.empty(text.plusParserT(dictMonad)));
    };
};
let chainr1$prime = function (dictMonad) {
    return function (p) {
        return function (f) {
            return function (a) {
                return alt(text.altParserT(dictMonad))(control.bind(text.bindParserT(dictMonad))(f)(function (f$prime) {
                    return control.bind(text.bindParserT(dictMonad))(chainr1(dictMonad)(p)(f))(function (a$prime) {
                        return control.pure(text.applicativeParserT(dictMonad))(f$prime(a)(a$prime));
                    });
                }))(control.pure(text.applicativeParserT(dictMonad))(a));
            };
        };
    };
};
let chainr1 = function (dictMonad) {
    return function (p) {
        return function (f) {
            return control.bind(text.bindParserT(dictMonad))(p)(function (a) {
                return chainr1$prime(dictMonad)(p)(f)(a);
            });
        };
    };
};
let chainr = function (dictMonad) {
    return function (p) {
        return function (f) {
            return function (a) {
                return alt(text.altParserT(dictMonad))(chainr1(dictMonad)(p)(f))(control.pure(text.applicativeParserT(dictMonad))(a));
            };
        };
    };
};
let chainl1$prime = function (dictMonad) {
    return function (p) {
        return function (f) {
            return function (a) {
                return alt(text.altParserT(dictMonad))(control.bind(text.bindParserT(dictMonad))(f)(function (f$prime) {
                    return control.bind(text.bindParserT(dictMonad))(p)(function (a$prime) {
                        return chainl1$prime(dictMonad)(p)(f)(f$prime(a)(a$prime));
                    });
                }))(control.pure(text.applicativeParserT(dictMonad))(a));
            };
        };
    };
};
let chainl1 = function (dictMonad) {
    return function (p) {
        return function (f) {
            return control.bind(text.bindParserT(dictMonad))(p)(function (a) {
                return chainl1$prime(dictMonad)(p)(f)(a);
            });
        };
    };
};
let chainl = function (dictMonad) {
    return function (p) {
        return function (f) {
            return function (a) {
                return alt(text.altParserT(dictMonad))(chainl1(dictMonad)(p)(f))(control.pure(text.applicativeParserT(dictMonad))(a));
            };
        };
    };
};
let between = function (dictMonad) {
    return function (open) {
        return function (close) {
            return function (p) {
                return applyFirst(text.applyParserT(dictMonad))(applySecond(text.applyParserT(dictMonad))(open)(p))(close);
            };
        };
    };
};
let asErrorMessage = function (dictMonad) {
    return data.flip(withErrorMessage(dictMonad));
};
module.exports = {
    withErrorMessage: withErrorMessage,
    asErrorMessage: asErrorMessage,
    between: between,
    option: option,
    optional: optional,
    optionMaybe: optionMaybe,
    "try": $$try,
    tryRethrow: tryRethrow,
    lookAhead: lookAhead,
    sepBy: sepBy,
    sepBy1: sepBy1,
    sepEndBy: sepEndBy,
    sepEndBy1: sepEndBy1,
    endBy1: endBy1,
    endBy: endBy,
    chainr: chainr,
    chainl: chainl,
    chainl1: chainl1,
    "chainl1'": chainl1$prime,
    chainr1: chainr1,
    "chainr1'": chainr1$prime,
    choice: choice,
    skipMany: skipMany,
    skipMany1: skipMany1,
    notFollowedBy: notFollowedBy,
    manyTill: manyTill,
    many1Till: many1Till
};
