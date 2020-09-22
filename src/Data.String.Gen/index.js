const control = require('../control');
let Control_Monad_Gen = require("../Control.Monad.Gen/index.js");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");
let Data_Char_Gen = require("../Data.Char.Gen/index.js");
const data = require('../data');
let Data_Ord = require("../Data.Ord/index.js");
let Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");


let genString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return function (genChar) {
            return Control_Monad_Gen_Class.sized(dictMonadGen)(function (size) {
                return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(1)(Data_Ord.max(Data_Ord.ordInt)(1)(size)))(function (newSize) {
                    return Control_Monad_Gen_Class.resize(dictMonadGen)(data._const(newSize))(data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_String_CodeUnits.fromCharArray)(Control_Monad_Gen.unfoldable(dictMonadRec)(dictMonadGen)(Data_Unfoldable.unfoldableArray)(genChar)));
                });
            });
        };
    };
};
let genUnicodeString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen.genUnicodeChar(dictMonadGen));
    };
};
let genDigitString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen.genDigitChar(dictMonadGen));
    };
};
let genAsciiString$prime = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen["genAsciiChar'"](dictMonadGen));
    };
};
let genAsciiString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen.genAsciiChar(dictMonadGen));
    };
};
let genAlphaUppercaseString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen.genAlphaUppercase(dictMonadGen));
    };
};
let genAlphaString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen.genAlpha(dictMonadGen));
    };
};
let genAlphaLowercaseString = function (dictMonadRec) {
    return function (dictMonadGen) {
        return genString(dictMonadRec)(dictMonadGen)(Data_Char_Gen.genAlphaLowercase(dictMonadGen));
    };
};
module.exports = {
    genString: genString,
    genUnicodeString: genUnicodeString,
    genAsciiString: genAsciiString,
    "genAsciiString'": genAsciiString$prime,
    genDigitString: genDigitString,
    genAlphaString: genAlphaString,
    genAlphaLowercaseString: genAlphaLowercaseString,
    genAlphaUppercaseString: genAlphaUppercaseString
};
