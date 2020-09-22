let control = require("../control");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_Array = require("../Data.Array/index.js");
let Data_Char_Unicode = require("../Data.Char.Unicode/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Ring = require("../Data.Ring/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let text = require("../text");
let Text_Parsing_Parser_Combinators = require("../Text.Parsing.Parser.Combinators/index.js");
let Text_Parsing_Parser_String = require("../Text.Parsing.Parser.String/index.js");
let Data_Enum = require("../Data.Enum/index.js");


function eq(dict) {
	return dict.eq;
}

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
			return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Functor._const)(a))(b);
		};
	};
};

let applySecond = function (dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Functor._const(identity(categoryFn)))(a))(b);
		};
	};
};

function alt(dict) {
	return dict.alt;
}


let toCharCode = Data_Enum.fromEnum(Data_Enum.boundedEnumChar);
let fromCharCode = Data_Enum.toEnum(Data_Enum.boundedEnumChar);
let toNumber = function (n) {
	return n;
};

let LanguageDef = function (x) {
    return x;
};
let upper = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isUpper))("uppercase letter");
};
let unGenLanguageDef = function (v) {
    return v;
};
let token = function (dictMonad) {
    return function (tokpos) {
        return control.bind(text.bindParserT(dictMonad))(Control_Monad_State_Class.gets(text.monadStateParserT(dictMonad))(function (v) {
            return v.value0;
        }))(function (input) {
            let v = Data_List.uncons(input);
            if (v instanceof Data_Maybe.Nothing) {
                return text.fail(dictMonad)("Unexpected EOF");
            };
            if (v instanceof Data_Maybe.Just) {
                return control.discard(control.discardUnit)(text.bindParserT(dictMonad))(Control_Monad_State_Class.modify_(text.monadStateParserT(dictMonad))(function (v1) {
                    return new text.ParseState(v.value0.tail, tokpos(v.value0.head), true);
                }))(function () {
                    return control.pure(text.applicativeParserT(dictMonad))(v.value0.head);
                });
            };
            throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 53, column 3 - line 58, column 16): " + [ v.constructor.name ]);
        });
    };
};
let when = function (dictMonad) {
    return function (tokpos) {
        return function (f) {
            return Text_Parsing_Parser_Combinators.tryRethrow(dictMonad)(control.bind(text.bindParserT(dictMonad))(token(dictMonad)(tokpos))(function (a) {
                return control.discard(control.discardUnit)(text.bindParserT(dictMonad))(Control_MonadZero.guard(text.monadZeroParserT(dictMonad))(f(a)))(function () {
                    return control.pure(text.applicativeParserT(dictMonad))(a);
                });
            }));
        };
    };
};
let theReservedNames = function (dictMonad) {
    return function (v) {
        if (v.caseSensitive) {
            return Data_Array.sort(Data_Ord.ordString)(v.reservedNames);
        };
        if (true) {
            return Data_Array.sort(Data_Ord.ordString)(Data_Functor.map(Data_Functor.functorArray)(Data_String_Common.toLower)(v.reservedNames));
        };
        throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 722, column 1 - line 722, column 82): " + [ v.constructor.name ]);
    };
};
let space = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isSpace))("space");
};
let simpleSpace = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.skipMany1(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isSpace));
};
let oneLineComment = function (dictMonad) {
    return function (v) {
        return applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_Combinators["try"](dictMonad)(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(v.commentLine)))(Text_Parsing_Parser_Combinators.skipMany(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(function (v1) {
            return v1 !== "\x0a";
        })));
    };
};
let octDigit = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isOctDigit))("oct digit");
};
let match = function (dictMonad) {
    return function (dictEq) {
        return function (tokpos) {
            return function (tok) {
                return when(dictMonad)(tokpos)(function (v) {
                    return eq(dictEq)(v)(tok);
                });
            };
        };
    };
};
let letter = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isAlpha))("letter");
};
let isReserved = function ($copy_names) {
    return function ($copy_name) {
        let $tco_var_names = $copy_names;
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(names, name) {
            let v = Data_Array.uncons(names);
            if (v instanceof Data_Maybe.Nothing) {
                $tco_done = true;
                return false;
            };
            if (v instanceof Data_Maybe.Just) {
                let v1 = Data_Ord.compare(Data_Ord.ordString)(v.value0.head)(name);
                if (v1 instanceof Data_Ordering.LT) {
                    $tco_var_names = v.value0.tail;
                    $copy_name = name;
                    return;
                };
                if (v1 instanceof Data_Ordering.EQ) {
                    $tco_done = true;
                    return true;
                };
                if (v1 instanceof Data_Ordering.GT) {
                    $tco_done = true;
                    return false;
                };
                throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 717, column 39 - line 720, column 53): " + [ v1.constructor.name ]);
            };
            throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 715, column 5 - line 720, column 53): " + [ v.constructor.name ]);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_names, $copy_name);
        };
        return $tco_result;
    };
};
let isReservedName = function (dictMonad) {
    return function (v) {
        return function (name) {
            let caseName = (function () {
                if (v.caseSensitive) {
                    return name;
                };
                if (true) {
                    return Data_String_Common.toLower(name);
                };
                throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 710, column 5 - line 711, column 57): " + [  ]);
            })();
            return isReserved(theReservedNames(dictMonad)(v))(caseName);
        };
    };
};
let inCommentSingle = function (dictMonad) {
    return function (v) {
        let startEnd = Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_String_CodeUnits.toCharArray(v.commentEnd))(Data_String_CodeUnits.toCharArray(v.commentStart));
        return control.fix(text.lazyParserT)(function (p) {
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(Data_Functor._void(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_Combinators["try"](dictMonad)(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(v.commentEnd))))(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_Combinators.skipMany1(dictMonad)(Text_Parsing_Parser_String.noneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(startEnd)))(p)))(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(startEnd))(p)))("end of comment");
        });
    };
};
let multiLineComment = function (dictMonad) {
    return function (v) {
        return applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_Combinators["try"](dictMonad)(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(v.commentStart)))(inComment(dictMonad)(v));
    };
};
let inCommentMulti = function (dictMonad) {
    return function (v) {
        let startEnd = Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_String_CodeUnits.toCharArray(v.commentEnd))(Data_String_CodeUnits.toCharArray(v.commentStart));
        return control.fix(text.lazyParserT)(function (p) {
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(Data_Functor._void(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_Combinators["try"](dictMonad)(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(v.commentEnd))))(applySecond(text.applyParserT(dictMonad))(multiLineComment(dictMonad)(v))(p)))(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_Combinators.skipMany1(dictMonad)(Text_Parsing_Parser_String.noneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(startEnd)))(p)))(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(startEnd))(p)))("end of comment");
        });
    };
};
let inComment = function (dictMonad) {
    return function (v) {
        if (v.nestedComments) {
            return inCommentMulti(dictMonad)(v);
        };
        return inCommentSingle(dictMonad)(v);
    };
};
let whiteSpace$prime = function (dictMonad) {
    return function (v) {
        if (Data_String_Common["null"](v.commentLine) && Data_String_Common["null"](v.commentStart)) {
            return Text_Parsing_Parser_Combinators.skipMany(dictMonad)(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(simpleSpace(dictMonad))(""));
        };
        if (Data_String_Common["null"](v.commentLine)) {
            return Text_Parsing_Parser_Combinators.skipMany(dictMonad)(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(simpleSpace(dictMonad))(multiLineComment(dictMonad)(v)))(""));
        };
        if (Data_String_Common["null"](v.commentStart)) {
            return Text_Parsing_Parser_Combinators.skipMany(dictMonad)(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(simpleSpace(dictMonad))(oneLineComment(dictMonad)(v)))(""));
        };
        if (true) {
            return Text_Parsing_Parser_Combinators.skipMany(dictMonad)(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(simpleSpace(dictMonad))(oneLineComment(dictMonad)(v)))(multiLineComment(dictMonad)(v)))(""));
        };
        throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 731, column 1 - line 731, column 86): " + [ v.constructor.name ]);
    };
};
let hexDigit = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isHexDigit))("hex digit");
};
let digit = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isDigit))("digit");
};
let makeTokenParser = function (dictMonad) {
    return function (v) {
        let stringLetter = Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(function (c) {
            return c !== "\"" && (c !== "\\" && c > "\x1a");
        });
        let sign = function (dictRing) {
            return alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("-"))(Data_Ring.negate(dictRing)))(Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("+"))(identity(categoryFn))))(control.pure(text.applicativeParserT(dictMonad))(identity(categoryFn)));
        };
        let oper = (function () {
            let go = control.bind(text.bindParserT(dictMonad))(v.opStart)(function (c) {
                return control.bind(text.bindParserT(dictMonad))(Data_Array.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(v.opLetter))(function (cs) {
                    return control.pure(text.applicativeParserT(dictMonad))(Data_String_CodeUnits.singleton(c) + Data_String_CodeUnits.fromCharArray(cs));
                });
            });
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(go)("operator");
        })();
        let number = function (base) {
            return function (baseDigit) {
                let folder = function (v1) {
                    return function (v2) {
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return Data_Maybe.Nothing.value;
                        };
                        if (v1 instanceof Data_Maybe.Just) {
                            return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                                return (base * v1.value0 | 0) + v3 | 0;
                            })(Data_Char_Unicode.digitToInt(v2));
                        };
                        throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 600, column 9 - line 600, column 49): " + [ v1.constructor.name, v2.constructor.name ]);
                    };
                };
                return control.bind(text.bindParserT(dictMonad))(Data_Array.some(text.alternativeParserT(dictMonad))(text.lazyParserT)(baseDigit))(function (digits) {
                    return Data_Maybe.maybe(text.fail(dictMonad)("not digits"))(control.pure(text.applicativeParserT(dictMonad)))(Data_Foldable.foldl(Data_Foldable.foldableArray)(folder)(new Data_Maybe.Just(0))(digits));
                });
            };
        };
        let octal = applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)([ "o", "O" ]))(number(8)(octDigit(dictMonad)));
        let lexeme = function (p) {
            return applyFirst(text.applyParserT(dictMonad))(p)(whiteSpace$prime(dictMonad)(v));
        };
        let reservedOp = function (name) {
            let go = control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(name))(function () {
                return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_Combinators.notFollowedBy(dictMonad)(v.opLetter))("end of " + name);
            });
            return lexeme(Text_Parsing_Parser_Combinators["try"](dictMonad)(go));
        };
        let symbol = function (name) {
            return Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(lexeme(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(name)))(name);
        };
        let parens = function (p) {
            return Text_Parsing_Parser_Combinators.between(dictMonad)(symbol("("))(symbol(")"))(p);
        };
        let semi = symbol(";");
        let semiSep = function (p) {
            return Text_Parsing_Parser_Combinators.sepBy(dictMonad)(p)(semi);
        };
        let semiSep1 = function (p) {
            return Text_Parsing_Parser_Combinators.sepBy1(dictMonad)(p)(semi);
        };
        let isReservedOp = function (name) {
            return isReserved(Data_Array.sort(Data_Ord.ordString)(v.reservedOpNames))(name);
        };
        let operator = (function () {
            let go = control.bind(text.bindParserT(dictMonad))(oper)(function (name) {
                let $82 = isReservedOp(name);
                if ($82) {
                    return text.fail(dictMonad)("reserved operator " + name);
                };
                return control.pure(text.applicativeParserT(dictMonad))(name);
            });
            return lexeme(Text_Parsing_Parser_Combinators["try"](dictMonad)(go));
        })();
        let ident = (function () {
            let go = control.bind(text.bindParserT(dictMonad))(v.identStart)(function (c) {
                return control.bind(text.bindParserT(dictMonad))(Data_Array.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(v.identLetter))(function (cs) {
                    return control.pure(text.applicativeParserT(dictMonad))(Data_String_CodeUnits.singleton(c) + Data_String_CodeUnits.fromCharArray(cs));
                });
            });
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(go)("identifier");
        })();
        let identifier = (function () {
            let go = control.bind(text.bindParserT(dictMonad))(ident)(function (name) {
                let $83 = isReservedName(dictMonad)(v)(name);
                if ($83) {
                    return text.fail(dictMonad)("reserved word " + Data_Show.show(Data_Show.showString)(name));
                };
                return control.pure(text.applicativeParserT(dictMonad))(name);
            });
            return lexeme(Text_Parsing_Parser_Combinators["try"](dictMonad)(go));
        })();
        let hexadecimal = applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)([ "x", "X" ]))(number(16)(hexDigit(dictMonad)));
        let fraction = (function () {
            let op = function (v1) {
                return function (v2) {
                    if (v2 instanceof Data_Maybe.Nothing) {
                        return Data_Maybe.Nothing.value;
                    };
                    if (v2 instanceof Data_Maybe.Just) {
                        return control.bind(Data_Maybe.bindMaybe)(Data_Char_Unicode.digitToInt(v1))(function (int$prime) {
                            return control.pure(Data_Maybe.applicativeMaybe)((v2.value0 + toNumber(int$prime)) / 10.0);
                        });
                    };
                    throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 550, column 9 - line 550, column 51): " + [ v1.constructor.name, v2.constructor.name ]);
                };
            };
            return Text_Parsing_Parser_Combinators.asErrorMessage(dictMonad)("fraction")(control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("."))(function () {
                return control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Data_Array.some(text.alternativeParserT(dictMonad))(text.lazyParserT)(digit(dictMonad)))("fraction"))(function (digits) {
                    return Data_Maybe.maybe(text.fail(dictMonad)("not digit"))(control.pure(text.applicativeParserT(dictMonad)))(Data_Foldable.foldr(Data_Foldable.foldableArray)(op)(new Data_Maybe.Just(0.0))(digits));
                });
            }));
        })();
        let escapeGap = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(applySecond(text.applyParserT(dictMonad))(Data_Array.some(text.alternativeParserT(dictMonad))(text.lazyParserT)(space(dictMonad)))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("\\")))("end of string gap");
        let escapeEmpty = Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("&");
        let escMap = Data_Array.zip([ "a", "b", "f", "n", "r", "t", "v", "\\", "\"", "'" ])([ "\x07", "\x08", "\x0c", "\x0a", "\x0d", "\x09", "\x0b", "\\", "\"", "'" ]);
        let dot = symbol(".");
        let decimal = number(10)(digit(dictMonad));
        let exponent$prime = (function () {
            let power = function (e) {
                if (e < 0) {
                    return 1.0 / power(-e | 0);
                };
                if (true) {

					let pow = function (n) {
						return function (p) {
						  return Math.pow(n, p);
						};
					  };
                    return pow(10.0)(toNumber(e));
                };
                throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 563, column 9 - line 563, column 31): " + [ e.constructor.name ]);
            };
            return Text_Parsing_Parser_Combinators.asErrorMessage(dictMonad)("exponent")(control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(dictMonad)([ "e", "E" ]))(function () {
                return control.bind(text.bindParserT(dictMonad))(sign(Data_Ring.ringInt))(function (f) {
                    return control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(decimal)("exponent"))(function (e) {
                        return control.pure(text.applicativeParserT(dictMonad))(power(f(e)));
                    });
                });
            }));
        })();
        let fractExponent = function (n) {
            let justExponent = control.bind(text.bindParserT(dictMonad))(exponent$prime)(function (expo) {
                return control.pure(text.applicativeParserT(dictMonad))(toNumber(n) * expo);
            });
            let fractExponent$prime = control.bind(text.bindParserT(dictMonad))(fraction)(function (fract) {
                return control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_Combinators.option(dictMonad)(1.0)(exponent$prime))(function (expo) {
                    return control.pure(text.applicativeParserT(dictMonad))((toNumber(n) + fract) * expo);
                });
            });
            return alt(text.altParserT(dictMonad))(fractExponent$prime)(justExponent);
        };
        let fractFloat = function (n) {
            return Data_Functor.map(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Data_Either.Right.create)(fractExponent(n));
        };
        let decimalFloat = control.bind(text.bindParserT(dictMonad))(decimal)(function (n) {
            return Text_Parsing_Parser_Combinators.option(dictMonad)(new Data_Either.Left(n))(fractFloat(n));
        });
        let zeroNumFloat = alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(Data_Functor.map(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Data_Either.Left.create)(alt(text.altParserT(dictMonad))(hexadecimal)(octal)))(decimalFloat))(fractFloat(0)))(control.pure(text.applicativeParserT(dictMonad))(new Data_Either.Left(0)));
        let natFloat = alt(text.altParserT(dictMonad))(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("0"))(zeroNumFloat))(decimalFloat);
        let naturalOrFloat = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(lexeme(natFloat))("number");
        let floating = control.bind(text.bindParserT(dictMonad))(decimal)(fractExponent);
        let $$float = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(lexeme(floating))("float");
        let zeroNumber = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("0"))(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(hexadecimal)(octal))(decimal))(control.pure(text.applicativeParserT(dictMonad))(0))))("");
        let nat = alt(text.altParserT(dictMonad))(zeroNumber)(decimal);
        let $$int = control.bind(text.bindParserT(dictMonad))(lexeme(sign(Data_Ring.ringInt)))(function (f) {
            return control.bind(text.bindParserT(dictMonad))(nat)(function (n) {
                return control.pure(text.applicativeParserT(dictMonad))(f(n));
            });
        });
        let integer = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(lexeme($$int))("integer");
        let natural = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(lexeme(nat))("natural");
        let comma = symbol(",");
        let commaSep = function (p) {
            return Text_Parsing_Parser_Combinators.sepBy(dictMonad)(p)(comma);
        };
        let commaSep1 = function (p) {
            return Text_Parsing_Parser_Combinators.sepBy1(dictMonad)(p)(comma);
        };
        let colon = symbol(":");
        let charNum = control.bind(text.bindParserT(dictMonad))(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(decimal)(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("o"))(number(8)(octDigit(dictMonad)))))(applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("x"))(number(16)(hexDigit(dictMonad)))))(function (code) {
            let $88 = code > 1114111;
            if ($88) {
                return text.fail(dictMonad)("invalid escape sequence");
            };
            let v1 = fromCharCode(code);
            if (v1 instanceof Data_Maybe.Just) {
                return control.pure(text.applicativeParserT(dictMonad))(v1.value0);
            };
            if (v1 instanceof Data_Maybe.Nothing) {
                return text.fail(dictMonad)("invalid character code (should not happen)");
            };
            throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 448, column 17 - line 450, column 81): " + [ v1.constructor.name ]);
        });
        let charLetter = Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(function (c) {
            return c !== "'" && (c !== "\\" && c > "\x1a");
        });
        let charEsc = (function () {
            let parseEsc = function (v1) {
                return Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)(v1.value0))(v1.value1);
            };
            return Text_Parsing_Parser_Combinators.choice(Data_Foldable.foldableArray)(dictMonad)(Data_Functor.map(Data_Functor.functorArray)(parseEsc)(escMap));
        })();
        let charControl = control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("^"))(function () {
            return control.bind(text.bindParserT(dictMonad))(upper(dictMonad))(function (code) {
                let v1 = fromCharCode((toCharCode(code) - toCharCode("A") | 0) + 1 | 0);
                if (v1 instanceof Data_Maybe.Just) {
                    return control.pure(text.applicativeParserT(dictMonad))(v1.value0);
                };
                if (v1 instanceof Data_Maybe.Nothing) {
                    return text.fail(dictMonad)("invalid character code (should not happen)");
                };
                throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 437, column 9 - line 439, column 73): " + [ v1.constructor.name ]);
            });
        });
        let caseString = function (name) {
            if (v.caseSensitive) {
                return Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(name))(name);
            };
            if (true) {
                let msg = Data_Show.show(Data_Show.showString)(name);
                let caseChar = function (c) {
                    if (Data_Char_Unicode.isAlpha(c)) {
                        return alt(text.altParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.toLower(c)))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.toUpper(c)));
                    };
                    if (true) {
                        return Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)(c);
                    };
                    throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 658, column 9 - line 658, column 50): " + [ c.constructor.name ]);
                };
                let walk = function (name$prime) {
                    let v1 = Data_String_CodeUnits.uncons(name$prime);
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return control.pure(text.applicativeParserT(dictMonad))();
                    };
                    if (v1 instanceof Data_Maybe.Just) {
                        return applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(caseChar(v1.value0.head))(msg))(walk(v1.value0.tail));
                    };
                    throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 654, column 22 - line 656, column 86): " + [ v1.constructor.name ]);
                };
                return Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(walk(name))(name);
            };
            throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 649, column 5 - line 649, column 52): " + [ name.constructor.name ]);
        };
        let reserved = function (name) {
            let go = applySecond(text.applyParserT(dictMonad))(caseString(name))(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_Combinators.notFollowedBy(dictMonad)(v.identLetter))("end of " + name));
            return lexeme(Text_Parsing_Parser_Combinators["try"](dictMonad)(go));
        };
        let brackets = function (p) {
            return Text_Parsing_Parser_Combinators.between(dictMonad)(symbol("["))(symbol("]"))(p);
        };
        let braces = function (p) {
            return Text_Parsing_Parser_Combinators.between(dictMonad)(symbol("{"))(symbol("}"))(p);
        };
        let ascii3codes = [ "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "SUB", "ESC", "DEL" ];
        let ascii3 = [ "\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x1a", "\x1b", "\x7f" ];
        let ascii2codes = [ "BS", "HT", "LF", "VT", "FF", "CR", "SO", "SI", "EM", "FS", "GS", "RS", "US", "SP" ];
        let ascii2 = [ "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f", "\x19", "\x1c", "\x1d", "\x1e", "\x1f", " " ];
        let asciiMap = Data_Array.zip(Data_Semigroup.append(Data_Semigroup.semigroupArray)(ascii3codes)(ascii2codes))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(ascii3)(ascii2));
        let charAscii = (function () {
            let parseAscii = function (v1) {
                return Text_Parsing_Parser_Combinators["try"](dictMonad)(Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(v1.value0))(v1.value1));
            };
            return Text_Parsing_Parser_Combinators.choice(Data_Foldable.foldableArray)(dictMonad)(Data_Functor.map(Data_Functor.functorArray)(parseAscii)(asciiMap));
        })();
        let escapeCode = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(charEsc)(charNum))(charAscii))(charControl))("escape code");
        let charEscape = applySecond(text.applyParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("\\"))(escapeCode);
        let characterChar = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(charLetter)(charEscape))("literal character");
        let charLiteral = (function () {
            let go = Text_Parsing_Parser_Combinators.between(dictMonad)(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("'"))(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("'"))("end of character"))(characterChar);
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(lexeme(go))("character");
        })();
        let stringEscape = control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("\\"))(function () {
            return alt(text.altParserT(dictMonad))(alt(text.altParserT(dictMonad))(Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(escapeGap)(Data_Maybe.Nothing.value))(Data_Functor.voidLeft(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(escapeEmpty)(Data_Maybe.Nothing.value)))(Data_Functor.map(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Data_Maybe.Just.create)(escapeCode));
        });
        let stringChar = Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(alt(text.altParserT(dictMonad))(Data_Functor.map(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(Data_Maybe.Just.create)(stringLetter))(stringEscape))("string character");
        let stringLiteral = (function () {
            let folder = function (v1) {
                return function (chars) {
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return chars;
                    };
                    if (v1 instanceof Data_Maybe.Just) {
                        return new Data_List_Types.Cons(v1.value0, chars);
                    };
                    throw new Error("Failed pattern match at Text.Parsing.Parser.Token (line 404, column 9 - line 404, column 55): " + [ v1.constructor.name, chars.constructor.name ]);
                };
            };
            let go = control.bind(text.bindParserT(dictMonad))(Text_Parsing_Parser_Combinators.between(dictMonad)(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("\""))(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(dictMonad)("\""))("end of string"))(Data_List.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(stringChar)))(function (maybeChars) {
                return control.pure(text.applicativeParserT(dictMonad))(Data_String_CodeUnits.fromCharArray(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray)(Data_Foldable.foldr(Data_List_Types.foldableList)(folder)(Data_List_Types.Nil.value)(maybeChars))));
            });
            return lexeme(Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(go)("literal string"));
        })();
        let angles = function (p) {
            return Text_Parsing_Parser_Combinators.between(dictMonad)(symbol("<"))(symbol(">"))(p);
        };
        return {
            identifier: identifier,
            reserved: reserved,
            operator: operator,
            reservedOp: reservedOp,
            charLiteral: charLiteral,
            stringLiteral: stringLiteral,
            natural: natural,
            integer: integer,
            "float": $$float,
            naturalOrFloat: naturalOrFloat,
            decimal: decimal,
            hexadecimal: hexadecimal,
            octal: octal,
            symbol: symbol,
            lexeme: lexeme,
            whiteSpace: whiteSpace$prime(dictMonad)(v),
            parens: parens,
            braces: braces,
            angles: angles,
            brackets: brackets,
            semi: semi,
            comma: comma,
            colon: colon,
            dot: dot,
            semiSep: semiSep,
            semiSep1: semiSep1,
            commaSep: commaSep,
            commaSep1: commaSep1
        };
    };
};
let alphaNum = function (dictMonad) {
    return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(Text_Parsing_Parser_String.satisfy(Text_Parsing_Parser_String.stringLikeString)(dictMonad)(Data_Char_Unicode.isAlphaNum))("letter or digit");
};
module.exports = {
    token: token,
    when: when,
    match: match,
    LanguageDef: LanguageDef,
    unGenLanguageDef: unGenLanguageDef,
    makeTokenParser: makeTokenParser,
    digit: digit,
    hexDigit: hexDigit,
    octDigit: octDigit,
    upper: upper,
    space: space,
    letter: letter,
    alphaNum: alphaNum
};
