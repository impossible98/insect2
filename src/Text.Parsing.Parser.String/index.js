const control = require("../control");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Data_Array = require("../Data.Array/index.js");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_CodePoints = require("../Data.String.CodePoints/index.js");
let Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let Data_String_Pattern = require("../Data.String.Pattern/index.js");
const text = require("../text");
let Text_Parsing_Parser_Combinators = require("../Text.Parsing.Parser.Combinators/index.js");
let Data_EuclideanRing = require("../Data.EuclideanRing/index.js");


let updatePosString = function (pos$prime) {
    return function (str) {
        let updatePosChar = function (v) {
            return function (c) {
                if (c === "\x0a") {
                    return {
                        line: v.line + 1 | 0,
                        column: 1
                    };
                };
                if (c === "\x0d") {
                    return {
                        line: v.line + 1 | 0,
                        column: 1
                    };
                };
                if (c === "\x09") {
                    return {
                        line: v.line,
                        column: (v.column + 8 | 0) - Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(v.column - 1 | 0)(8) | 0
                    };
                };
                return {
                    line: v.line,
                    column: v.column + 1 | 0
                };
            };
        };
        return Data_Foldable.foldl(Data_Foldable.foldableArray)(updatePosChar)(pos$prime)(Data_String_Common.split(Data_Newtype.wrap(Data_String_Pattern.newtypePattern)(""))(str));
    };
};



let StringLike = function (drop, indexOf, $$null, uncons) {
    this.drop = drop;
    this.indexOf = indexOf;
    this["null"] = $$null;
    this.uncons = uncons;
};
let uncons = function (dict) {
    return dict.uncons;
};
let stringLikeString = new StringLike(Data_String_CodePoints.drop, Data_String_CodePoints.indexOf, Data_String_Common["null"], Data_String_CodeUnits.uncons);
let $$null = function (dict) {
    return dict["null"];
};
let indexOf = function (dict) {
    return dict.indexOf;
};
let eof = function (dictStringLike) {
    return function (dictMonad) {
        return control.bind(text.bindParserT(dictMonad))(Control_Monad_State_Class.gets(text.monadStateParserT(dictMonad))(function (v) {
            return v.value0;
        }))(function (input) {
            return control.unless(text.applicativeParserT(dictMonad))($$null(dictStringLike)(input))(text.fail(dictMonad)("Expected EOF"));
        });
    };
};
let drop = function (dict) {
    return dict.drop;
};
let string = function (dictStringLike) {
    return function (dictMonad) {
        return function (str) {
            return control.bind(text.bindParserT(dictMonad))(Control_Monad_State_Class.gets(text.monadStateParserT(dictMonad))(function (v) {
                return v.value0;
            }))(function (input) {
                let v = indexOf(dictStringLike)(Data_Newtype.wrap(Data_String_Pattern.newtypePattern)(str))(input);
                if (v instanceof Data_Maybe.Just && v.value0 === 0) {
                    return control.discard(control.discardUnit)(text.bindParserT(dictMonad))(Control_Monad_State_Class.modify_(text.monadStateParserT(dictMonad))(function (v1) {
                        return new text.ParseState(drop(dictStringLike)(Data_String_CodePoints.length(str))(input), updatePosString(v1.value1)(str), true);
                    }))(function () {
                        return control.pure(text.applicativeParserT(dictMonad))(str);
                    });
                };
                return text.fail(dictMonad)("Expected " + Data_Show.show(Data_Show.showString)(str));
            });
        };
    };
};
let anyChar = function (dictStringLike) {
    return function (dictMonad) {
        return control.bind(text.bindParserT(dictMonad))(Control_Monad_State_Class.gets(text.monadStateParserT(dictMonad))(function (v) {
            return v.value0;
        }))(function (input) {
            let v = uncons(dictStringLike)(input);
            if (v instanceof Data_Maybe.Nothing) {
                return text.fail(dictMonad)("Unexpected EOF");
            };
            if (v instanceof Data_Maybe.Just) {
                return control.discard(control.discardUnit)(text.bindParserT(dictMonad))(Control_Monad_State_Class.modify_(text.monadStateParserT(dictMonad))(function (v1) {
                    return new text.ParseState(v.value0.tail, updatePosString(v1.value1)(Data_String_CodeUnits.singleton(v.value0.head)), true);
                }))(function () {
                    return control.pure(text.applicativeParserT(dictMonad))(v.value0.head);
                });
            };
            throw new Error("Failed pattern match at Text.Parsing.Parser.String (line 56, column 3 - line 63, column 16): " + [ v.constructor.name ]);
        });
    };
};
let satisfy = function (dictStringLike) {
    return function (dictMonad) {
        return function (f) {
            return Text_Parsing_Parser_Combinators.tryRethrow(dictMonad)(control.bind(text.bindParserT(dictMonad))(anyChar(dictStringLike)(dictMonad))(function (c) {
                let $52 = f(c);
                if ($52) {
                    return control.pure(text.applicativeParserT(dictMonad))(c);
                };
                return text.fail(dictMonad)("Character '" + (Data_String_CodeUnits.singleton(c) + "' did not satisfy predicate"));
            }));
        };
    };
};
let $$char = function (dictStringLike) {
    return function (dictMonad) {
        return function (c) {
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(satisfy(dictStringLike)(dictMonad)(function (v) {
                return v === c;
            }))(Data_Show.show(Data_Show.showChar)(c));
        };
    };
};
let noneOf = function (dictStringLike) {
    return function (dictMonad) {
        return function (ss) {
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(satisfy(dictStringLike)(dictMonad)(Data_Functor.flip(Data_Foldable.notElem(Data_Foldable.foldableArray)(Data_Eq.eqChar))(ss)))("none of " + Data_Show.show(Data_Show.showArray(Data_Show.showChar))(ss));
        };
    };
};
let oneOf = function (dictStringLike) {
    return function (dictMonad) {
        return function (ss) {
            return Text_Parsing_Parser_Combinators.withErrorMessage(dictMonad)(satisfy(dictStringLike)(dictMonad)(Data_Functor.flip(Data_Foldable.elem(Data_Foldable.foldableArray)(Data_Eq.eqChar))(ss)))("one of " + Data_Show.show(Data_Show.showArray(Data_Show.showChar))(ss));
        };
    };
};
let whiteSpace = function (dictStringLike) {
    return function (dictMonad) {
        return control.bind(text.bindParserT(dictMonad))(Data_Array.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(satisfy(dictStringLike)(dictMonad)(function (c) {
            return c === "\x0a" || (c === "\x0d" || (c === " " || c === "\x09"));
        })))(function (cs) {
            return control.pure(text.applicativeParserT(dictMonad))(Data_String_CodeUnits.fromCharArray(cs));
        });
    };
};
let skipSpaces = function (dictStringLike) {
    return function (dictMonad) {
        return Data_Functor._void(text.functorParserT(((dictMonad.Bind1()).Apply0()).Functor0()))(whiteSpace(dictStringLike)(dictMonad));
    };
};

module.exports = {
    drop: drop,
    indexOf: indexOf,
    "null": $$null,
    uncons: uncons,
    StringLike: StringLike,
    eof: eof,
    string: string,
    anyChar: anyChar,
    satisfy: satisfy,
    "char": $$char,
    whiteSpace: whiteSpace,
    skipSpaces: skipSpaces,
    oneOf: oneOf,
    noneOf: noneOf,
    stringLikeString: stringLikeString
};
