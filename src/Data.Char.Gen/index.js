let Control_Monad_Gen = require("../Control.Monad.Gen/index.js");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
const data = require('../data');
let Data_NonEmpty = require("../Data.NonEmpty/index.js");


let genUnicodeChar = function (dictMonadGen) {
    return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(65536));
};
let genDigitChar = function (dictMonadGen) {
    return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(48)(57));
};
let genAsciiChar$prime = function (dictMonadGen) {
    return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(127));
};
let genAsciiChar = function (dictMonadGen) {
    return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(32)(127));
};
let genAlphaUppercase = function (dictMonadGen) {
    return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(65)(90));
};
let genAlphaLowercase = function (dictMonadGen) {
    return data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(97)(122));
};
let genAlpha = function (dictMonadGen) {
    return Control_Monad_Gen.oneOf(dictMonadGen)(Data_NonEmpty.foldable1NonEmpty(Data_Foldable.foldableArray))(new Data_NonEmpty.NonEmpty(genAlphaLowercase(dictMonadGen), [ genAlphaUppercase(dictMonadGen) ]));
};
module.exports = {
    genUnicodeChar: genUnicodeChar,
    genAsciiChar: genAsciiChar,
    "genAsciiChar'": genAsciiChar$prime,
    genDigitChar: genDigitChar,
    genAlpha: genAlpha,
    genAlphaLowercase: genAlphaLowercase,
    genAlphaUppercase: genAlphaUppercase
};
