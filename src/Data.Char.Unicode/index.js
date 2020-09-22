
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Char_Unicode_Internal = require("../Data.Char.Unicode.Internal/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let data = require("../data");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

function eqArrayImpl(f) {
	return function (xs) {
		return function (ys) {
			if (xs === ys) return true;
			if (xs.length !== ys.length) return false;
			for (let i = 0; i < xs.length; i++) {
				if (!f(xs[i])(ys[i])) return false;
			}
			return true;
		};
	};
}

function eq(dict) {
	return dict.eq;
}

function eqArray(dictEq) {
	return new Eq(eqArrayImpl(eq(dictEq)));
}

let toCharCode = Data_Enum.fromEnum(Data_Enum.boundedEnumChar);

let withCharCode = function(f) {
    return function (c) {
        return String.fromCharCode(f(c.charCodeAt()));
    }
}

let UppercaseLetter = (() => {
    function UppercaseLetter() {

    };
    UppercaseLetter.value = new UppercaseLetter();
    return UppercaseLetter;
})();
let LowercaseLetter = (() => {
    function LowercaseLetter() {

    };
    LowercaseLetter.value = new LowercaseLetter();
    return LowercaseLetter;
})();
let TitlecaseLetter = (() => {
    function TitlecaseLetter() {

    };
    TitlecaseLetter.value = new TitlecaseLetter();
    return TitlecaseLetter;
})();
let ModifierLetter = (() => {
    function ModifierLetter() {

    };
    ModifierLetter.value = new ModifierLetter();
    return ModifierLetter;
})();
let OtherLetter = (() => {
    function OtherLetter() {

    };
    OtherLetter.value = new OtherLetter();
    return OtherLetter;
})();
let NonSpacingMark = (() => {
    function NonSpacingMark() {

    };
    NonSpacingMark.value = new NonSpacingMark();
    return NonSpacingMark;
})();
let SpacingCombiningMark = (() => {
    function SpacingCombiningMark() {

    };
    SpacingCombiningMark.value = new SpacingCombiningMark();
    return SpacingCombiningMark;
})();
let EnclosingMark = (() => {
    function EnclosingMark() {

    };
    EnclosingMark.value = new EnclosingMark();
    return EnclosingMark;
})();
let DecimalNumber = (() => {
    function DecimalNumber() {

    };
    DecimalNumber.value = new DecimalNumber();
    return DecimalNumber;
})();
let LetterNumber = (() => {
    function LetterNumber() {

    };
    LetterNumber.value = new LetterNumber();
    return LetterNumber;
})();
let OtherNumber = (() => {
    function OtherNumber() {

    };
    OtherNumber.value = new OtherNumber();
    return OtherNumber;
})();
let ConnectorPunctuation = (() => {
    function ConnectorPunctuation() {

    };
    ConnectorPunctuation.value = new ConnectorPunctuation();
    return ConnectorPunctuation;
})();
let DashPunctuation = (() => {
    function DashPunctuation() {

    };
    DashPunctuation.value = new DashPunctuation();
    return DashPunctuation;
})();
let OpenPunctuation = (() => {
    function OpenPunctuation() {

    };
    OpenPunctuation.value = new OpenPunctuation();
    return OpenPunctuation;
})();
let ClosePunctuation = (() => {
    function ClosePunctuation() {

    };
    ClosePunctuation.value = new ClosePunctuation();
    return ClosePunctuation;
})();
let InitialQuote = (() => {
    function InitialQuote() {

    };
    InitialQuote.value = new InitialQuote();
    return InitialQuote;
})();
let FinalQuote = (() => {
    function FinalQuote() {

    };
    FinalQuote.value = new FinalQuote();
    return FinalQuote;
})();
let OtherPunctuation = (() => {
    function OtherPunctuation() {

    };
    OtherPunctuation.value = new OtherPunctuation();
    return OtherPunctuation;
})();
let MathSymbol = (() => {
    function MathSymbol() {

    };
    MathSymbol.value = new MathSymbol();
    return MathSymbol;
})();
let CurrencySymbol = (() => {
    function CurrencySymbol() {

    };
    CurrencySymbol.value = new CurrencySymbol();
    return CurrencySymbol;
})();
let ModifierSymbol = (() => {
    function ModifierSymbol() {

    };
    ModifierSymbol.value = new ModifierSymbol();
    return ModifierSymbol;
})();
let OtherSymbol = (() => {
    function OtherSymbol() {

    };
    OtherSymbol.value = new OtherSymbol();
    return OtherSymbol;
})();
let Space = (() => {
    function Space() {

    };
    Space.value = new Space();
    return Space;
})();
let LineSeparator = (() => {
    function LineSeparator() {

    };
    LineSeparator.value = new LineSeparator();
    return LineSeparator;
})();
let ParagraphSeparator = (() => {
    function ParagraphSeparator() {

    };
    ParagraphSeparator.value = new ParagraphSeparator();
    return ParagraphSeparator;
})();
let Control = (() => {
    function Control() {

    };
    Control.value = new Control();
    return Control;
})();
let Format = (() => {
    function Format() {

    };
    Format.value = new Format();
    return Format;
})();
let Surrogate = (() => {
    function Surrogate() {

    };
    Surrogate.value = new Surrogate();
    return Surrogate;
})();
let PrivateUse = (() => {
    function PrivateUse() {

    };
    PrivateUse.value = new PrivateUse();
    return PrivateUse;
})();
let NotAssigned = (() => {
    function NotAssigned() {

    };
    NotAssigned.value = new NotAssigned();
    return NotAssigned;
})();
let unicodeCatToGeneralCat = function (v) {
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_LU) {
        return UppercaseLetter.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_LL) {
        return LowercaseLetter.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_LT) {
        return TitlecaseLetter.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_LM) {
        return ModifierLetter.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_LO) {
        return OtherLetter.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_MN) {
        return NonSpacingMark.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_MC) {
        return SpacingCombiningMark.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_ME) {
        return EnclosingMark.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_ND) {
        return DecimalNumber.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_NL) {
        return LetterNumber.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_NO) {
        return OtherNumber.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PC) {
        return ConnectorPunctuation.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PD) {
        return DashPunctuation.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PS) {
        return OpenPunctuation.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PE) {
        return ClosePunctuation.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PI) {
        return InitialQuote.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PF) {
        return FinalQuote.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_PO) {
        return OtherPunctuation.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_SM) {
        return MathSymbol.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_SC) {
        return CurrencySymbol.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_SK) {
        return ModifierSymbol.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_SO) {
        return OtherSymbol.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_ZS) {
        return Space.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_ZL) {
        return LineSeparator.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_ZP) {
        return ParagraphSeparator.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_CC) {
        return Control.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_CF) {
        return Format.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_CS) {
        return Surrogate.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_CO) {
        return PrivateUse.value;
    };
    if (v instanceof Data_Char_Unicode_Internal.NUMCAT_CN) {
        return NotAssigned.value;
    };
    throw new Error("Failed pattern match at Data.Char.Unicode (line 192, column 1 - line 192, column 61): " + [ v.constructor.name ]);
};
let toUpper = withCharCode(Data_Char_Unicode_Internal.uTowupper);
let toTitle = withCharCode(Data_Char_Unicode_Internal.uTowtitle);
let toLower = withCharCode(Data_Char_Unicode_Internal.uTowlower);
let showGeneralCategory = new Data_Show.Show(function (v) {
    if (v instanceof UppercaseLetter) {
        return "UppercaseLetter";
    };
    if (v instanceof LowercaseLetter) {
        return "LowercaseLetter";
    };
    if (v instanceof TitlecaseLetter) {
        return "TitlecaseLetter";
    };
    if (v instanceof ModifierLetter) {
        return "ModifierLetter";
    };
    if (v instanceof OtherLetter) {
        return "OtherLetter";
    };
    if (v instanceof NonSpacingMark) {
        return "NonSpacingMark";
    };
    if (v instanceof SpacingCombiningMark) {
        return "SpacingCombiningMark";
    };
    if (v instanceof EnclosingMark) {
        return "EnclosingMark";
    };
    if (v instanceof DecimalNumber) {
        return "DecimalNumber";
    };
    if (v instanceof LetterNumber) {
        return "LetterNumber";
    };
    if (v instanceof OtherNumber) {
        return "OtherNumber";
    };
    if (v instanceof ConnectorPunctuation) {
        return "ConnectorPunctuation";
    };
    if (v instanceof DashPunctuation) {
        return "DashPunctuation";
    };
    if (v instanceof OpenPunctuation) {
        return "OpenPunctuation";
    };
    if (v instanceof ClosePunctuation) {
        return "ClosePunctuation";
    };
    if (v instanceof InitialQuote) {
        return "InitialQuote";
    };
    if (v instanceof FinalQuote) {
        return "FinalQuote";
    };
    if (v instanceof OtherPunctuation) {
        return "OtherPunctuation";
    };
    if (v instanceof MathSymbol) {
        return "MathSymbol";
    };
    if (v instanceof CurrencySymbol) {
        return "CurrencySymbol";
    };
    if (v instanceof ModifierSymbol) {
        return "ModifierSymbol";
    };
    if (v instanceof OtherSymbol) {
        return "OtherSymbol";
    };
    if (v instanceof Space) {
        return "Space";
    };
    if (v instanceof LineSeparator) {
        return "LineSeparator";
    };
    if (v instanceof ParagraphSeparator) {
        return "ParagraphSeparator";
    };
    if (v instanceof Control) {
        return "Control";
    };
    if (v instanceof Format) {
        return "Format";
    };
    if (v instanceof Surrogate) {
        return "Surrogate";
    };
    if (v instanceof PrivateUse) {
        return "PrivateUse";
    };
    if (v instanceof NotAssigned) {
        return "NotAssigned";
    };
    throw new Error("Failed pattern match at Data.Char.Unicode (line 224, column 1 - line 254, column 37): " + [ v.constructor.name ]);
});
let isUpper = function ($50) {
    return Data_Char_Unicode_Internal.uIswupper(toCharCode($50));
};
let isSpace = function (c) {
    let uc = toCharCode(c);
    let $14 = uc <= 823;
    if ($14) {
        return uc === 32 || (uc >= 9 && uc <= 13 || uc === 160);
    };
    return Data_Char_Unicode_Internal.uIswspace(toCharCode(c));
};
let isPrint = function ($51) {
    return Data_Char_Unicode_Internal.uIswprint(toCharCode($51));
};
let isOctDigit = function (c) {
    let diff = toCharCode(c) - toCharCode("0") | 0;
    return diff <= 7 && diff >= 0;
};
let isLower = function ($52) {
    return Data_Char_Unicode_Internal.uIswlower(toCharCode($52));
};
let isLatin1 = function (c) {
    return c <= "\xff";
};
let isDigit = function (c) {
    let diff = toCharCode(c) - toCharCode("0") | 0;
    return diff <= 9 && diff >= 0;
};
let isHexDigit = function (c) {
    return isDigit(c) || ((() => {
        let diff = toCharCode(c) - toCharCode("A") | 0;
        return diff <= 5 && diff >= 0;
    })() || (() => {
        let diff = toCharCode(c) - toCharCode("a") | 0;
        return diff <= 5 && diff >= 0;
    })());
};
let isControl = function ($53) {
    return Data_Char_Unicode_Internal.uIswcntrl(toCharCode($53));
};
let isAsciiUpper = function (c) {
    return c >= "A" && c <= "Z";
};
let isAsciiLower = function (c) {
    return c >= "a" && c <= "z";
};
let isAscii = function (c) {
    return c < "\x80";
};
let isAlphaNum = function ($54) {
    return Data_Char_Unicode_Internal.uIswalnum(toCharCode($54));
};
let isAlpha = function ($55) {
    return Data_Char_Unicode_Internal.uIswalpha(toCharCode($55));
};
let generalCategory = (() => {
    let $56 = data.map(Data_Maybe.functorMaybe)(unicodeCatToGeneralCat);
    return function ($57) {
        return $56(Data_Char_Unicode_Internal.uGencat(toCharCode($57)));
    };
})();
let isLetter = function (c) {
    let v = generalCategory(c);
    if (v instanceof Data_Maybe.Just && v.value0 instanceof UppercaseLetter) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof LowercaseLetter) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof TitlecaseLetter) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof ModifierLetter) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof OtherLetter) {
        return true;
    };
    return false;
};
let isMark = function (c) {
    let v = generalCategory(c);
    if (v instanceof Data_Maybe.Just && v.value0 instanceof NonSpacingMark) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof SpacingCombiningMark) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof EnclosingMark) {
        return true;
    };
    return false;
};
let isNumber = function (c) {
    let v = generalCategory(c);
    if (v instanceof Data_Maybe.Just && v.value0 instanceof DecimalNumber) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof LetterNumber) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof OtherNumber) {
        return true;
    };
    return false;
};
let isPunctuation = function (c) {
    let v = generalCategory(c);
    if (v instanceof Data_Maybe.Just && v.value0 instanceof ConnectorPunctuation) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof DashPunctuation) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof OpenPunctuation) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof ClosePunctuation) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof InitialQuote) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof FinalQuote) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof OtherPunctuation) {
        return true;
    };
    return false;
};
let isSeparator = function (c) {
    let v = generalCategory(c);
    if (v instanceof Data_Maybe.Just && v.value0 instanceof Space) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof LineSeparator) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof ParagraphSeparator) {
        return true;
    };
    return false;
};
let isSymbol = function (c) {
    let v = generalCategory(c);
    if (v instanceof Data_Maybe.Just && v.value0 instanceof MathSymbol) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof CurrencySymbol) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof ModifierSymbol) {
        return true;
    };
    if (v instanceof Data_Maybe.Just && v.value0 instanceof OtherSymbol) {
        return true;
    };
    return false;
};
let generalCatToUnicodeCat = function (v) {
    if (v instanceof UppercaseLetter) {
        return Data_Char_Unicode_Internal.NUMCAT_LU.value;
    };
    if (v instanceof LowercaseLetter) {
        return Data_Char_Unicode_Internal.NUMCAT_LL.value;
    };
    if (v instanceof TitlecaseLetter) {
        return Data_Char_Unicode_Internal.NUMCAT_LT.value;
    };
    if (v instanceof ModifierLetter) {
        return Data_Char_Unicode_Internal.NUMCAT_LM.value;
    };
    if (v instanceof OtherLetter) {
        return Data_Char_Unicode_Internal.NUMCAT_LO.value;
    };
    if (v instanceof NonSpacingMark) {
        return Data_Char_Unicode_Internal.NUMCAT_MN.value;
    };
    if (v instanceof SpacingCombiningMark) {
        return Data_Char_Unicode_Internal.NUMCAT_MC.value;
    };
    if (v instanceof EnclosingMark) {
        return Data_Char_Unicode_Internal.NUMCAT_ME.value;
    };
    if (v instanceof DecimalNumber) {
        return Data_Char_Unicode_Internal.NUMCAT_ND.value;
    };
    if (v instanceof LetterNumber) {
        return Data_Char_Unicode_Internal.NUMCAT_NL.value;
    };
    if (v instanceof OtherNumber) {
        return Data_Char_Unicode_Internal.NUMCAT_NO.value;
    };
    if (v instanceof ConnectorPunctuation) {
        return Data_Char_Unicode_Internal.NUMCAT_PC.value;
    };
    if (v instanceof DashPunctuation) {
        return Data_Char_Unicode_Internal.NUMCAT_PD.value;
    };
    if (v instanceof OpenPunctuation) {
        return Data_Char_Unicode_Internal.NUMCAT_PS.value;
    };
    if (v instanceof ClosePunctuation) {
        return Data_Char_Unicode_Internal.NUMCAT_PE.value;
    };
    if (v instanceof InitialQuote) {
        return Data_Char_Unicode_Internal.NUMCAT_PI.value;
    };
    if (v instanceof FinalQuote) {
        return Data_Char_Unicode_Internal.NUMCAT_PF.value;
    };
    if (v instanceof OtherPunctuation) {
        return Data_Char_Unicode_Internal.NUMCAT_PO.value;
    };
    if (v instanceof MathSymbol) {
        return Data_Char_Unicode_Internal.NUMCAT_SM.value;
    };
    if (v instanceof CurrencySymbol) {
        return Data_Char_Unicode_Internal.NUMCAT_SC.value;
    };
    if (v instanceof ModifierSymbol) {
        return Data_Char_Unicode_Internal.NUMCAT_SK.value;
    };
    if (v instanceof OtherSymbol) {
        return Data_Char_Unicode_Internal.NUMCAT_SO.value;
    };
    if (v instanceof Space) {
        return Data_Char_Unicode_Internal.NUMCAT_ZS.value;
    };
    if (v instanceof LineSeparator) {
        return Data_Char_Unicode_Internal.NUMCAT_ZL.value;
    };
    if (v instanceof ParagraphSeparator) {
        return Data_Char_Unicode_Internal.NUMCAT_ZP.value;
    };
    if (v instanceof Control) {
        return Data_Char_Unicode_Internal.NUMCAT_CC.value;
    };
    if (v instanceof Format) {
        return Data_Char_Unicode_Internal.NUMCAT_CF.value;
    };
    if (v instanceof Surrogate) {
        return Data_Char_Unicode_Internal.NUMCAT_CS.value;
    };
    if (v instanceof PrivateUse) {
        return Data_Char_Unicode_Internal.NUMCAT_CO.value;
    };
    if (v instanceof NotAssigned) {
        return Data_Char_Unicode_Internal.NUMCAT_CN.value;
    };
    throw new Error("Failed pattern match at Data.Char.Unicode (line 160, column 1 - line 160, column 61): " + [ v.constructor.name ]);
};
let generalCatToInt = function (v) {
    if (v instanceof UppercaseLetter) {
        return 1;
    };
    if (v instanceof LowercaseLetter) {
        return 2;
    };
    if (v instanceof TitlecaseLetter) {
        return 3;
    };
    if (v instanceof ModifierLetter) {
        return 4;
    };
    if (v instanceof OtherLetter) {
        return 5;
    };
    if (v instanceof NonSpacingMark) {
        return 6;
    };
    if (v instanceof SpacingCombiningMark) {
        return 7;
    };
    if (v instanceof EnclosingMark) {
        return 8;
    };
    if (v instanceof DecimalNumber) {
        return 9;
    };
    if (v instanceof LetterNumber) {
        return 10;
    };
    if (v instanceof OtherNumber) {
        return 11;
    };
    if (v instanceof ConnectorPunctuation) {
        return 12;
    };
    if (v instanceof DashPunctuation) {
        return 13;
    };
    if (v instanceof OpenPunctuation) {
        return 14;
    };
    if (v instanceof ClosePunctuation) {
        return 15;
    };
    if (v instanceof InitialQuote) {
        return 16;
    };
    if (v instanceof FinalQuote) {
        return 17;
    };
    if (v instanceof OtherPunctuation) {
        return 18;
    };
    if (v instanceof MathSymbol) {
        return 19;
    };
    if (v instanceof CurrencySymbol) {
        return 20;
    };
    if (v instanceof ModifierSymbol) {
        return 21;
    };
    if (v instanceof OtherSymbol) {
        return 22;
    };
    if (v instanceof Space) {
        return 23;
    };
    if (v instanceof LineSeparator) {
        return 24;
    };
    if (v instanceof ParagraphSeparator) {
        return 25;
    };
    if (v instanceof Control) {
        return 26;
    };
    if (v instanceof Format) {
        return 27;
    };
    if (v instanceof Surrogate) {
        return 28;
    };
    if (v instanceof PrivateUse) {
        return 29;
    };
    if (v instanceof NotAssigned) {
        return 30;
    };
    throw new Error("Failed pattern match at Data.Char.Unicode (line 128, column 1 - line 128, column 42): " + [ v.constructor.name ]);
};
let eqGeneralCategory = new Eq(function (v) {
    return function (v1) {
        if (v instanceof UppercaseLetter && v1 instanceof UppercaseLetter) {
            return true;
        };
        if (v instanceof LowercaseLetter && v1 instanceof LowercaseLetter) {
            return true;
        };
        if (v instanceof TitlecaseLetter && v1 instanceof TitlecaseLetter) {
            return true;
        };
        if (v instanceof ModifierLetter && v1 instanceof ModifierLetter) {
            return true;
        };
        if (v instanceof OtherLetter && v1 instanceof OtherLetter) {
            return true;
        };
        if (v instanceof NonSpacingMark && v1 instanceof NonSpacingMark) {
            return true;
        };
        if (v instanceof SpacingCombiningMark && v1 instanceof SpacingCombiningMark) {
            return true;
        };
        if (v instanceof EnclosingMark && v1 instanceof EnclosingMark) {
            return true;
        };
        if (v instanceof DecimalNumber && v1 instanceof DecimalNumber) {
            return true;
        };
        if (v instanceof LetterNumber && v1 instanceof LetterNumber) {
            return true;
        };
        if (v instanceof OtherNumber && v1 instanceof OtherNumber) {
            return true;
        };
        if (v instanceof ConnectorPunctuation && v1 instanceof ConnectorPunctuation) {
            return true;
        };
        if (v instanceof DashPunctuation && v1 instanceof DashPunctuation) {
            return true;
        };
        if (v instanceof OpenPunctuation && v1 instanceof OpenPunctuation) {
            return true;
        };
        if (v instanceof ClosePunctuation && v1 instanceof ClosePunctuation) {
            return true;
        };
        if (v instanceof InitialQuote && v1 instanceof InitialQuote) {
            return true;
        };
        if (v instanceof FinalQuote && v1 instanceof FinalQuote) {
            return true;
        };
        if (v instanceof OtherPunctuation && v1 instanceof OtherPunctuation) {
            return true;
        };
        if (v instanceof MathSymbol && v1 instanceof MathSymbol) {
            return true;
        };
        if (v instanceof CurrencySymbol && v1 instanceof CurrencySymbol) {
            return true;
        };
        if (v instanceof ModifierSymbol && v1 instanceof ModifierSymbol) {
            return true;
        };
        if (v instanceof OtherSymbol && v1 instanceof OtherSymbol) {
            return true;
        };
        if (v instanceof Space && v1 instanceof Space) {
            return true;
        };
        if (v instanceof LineSeparator && v1 instanceof LineSeparator) {
            return true;
        };
        if (v instanceof ParagraphSeparator && v1 instanceof ParagraphSeparator) {
            return true;
        };
        if (v instanceof Control && v1 instanceof Control) {
            return true;
        };
        if (v instanceof Format && v1 instanceof Format) {
            return true;
        };
        if (v instanceof Surrogate && v1 instanceof Surrogate) {
            return true;
        };
        if (v instanceof PrivateUse && v1 instanceof PrivateUse) {
            return true;
        };
        if (v instanceof NotAssigned && v1 instanceof NotAssigned) {
            return true;
        };
        return false;
    };
});
let ordGeneralCategory = new Data_Ord.Ord(() => {
    return eqGeneralCategory;
}, function (catA) {
    return function (catB) {
        return Data_Ord.compare(Data_Ord.ordInt)(generalCatToInt(catA))(generalCatToInt(catB));
    };
});
let digitToInt = function (c) {
    let hexUpper = toCharCode(c) - toCharCode("A") | 0;
    let hexLower = toCharCode(c) - toCharCode("a") | 0;
    let dec = toCharCode(c) - toCharCode("0") | 0;
    let result = (() => {
        if (dec <= 9 && dec >= 0) {
            return new Data_Maybe.Just(dec);
        };
        if (hexLower <= 5 && hexLower >= 0) {
            return Data_Maybe.Just.create(hexLower + 10 | 0);
        };
        if (hexUpper <= 5 && hexUpper >= 0) {
            return Data_Maybe.Just.create(hexUpper + 10 | 0);
        };
        if (true) {
            return Data_Maybe.Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Char.Unicode (line 547, column 5 - line 547, column 24): " + [  ]);
    })();
    return result;
};
let boundedGeneralCategory = new Data_Bounded.Bounded(() => {
    return ordGeneralCategory;
}, UppercaseLetter.value, NotAssigned.value);
module.exports = {
    isAscii: isAscii,
    isAsciiLower: isAsciiLower,
    isAsciiUpper: isAsciiUpper,
    isLatin1: isLatin1,
    isLower: isLower,
    isUpper: isUpper,
    isAlpha: isAlpha,
    isAlphaNum: isAlphaNum,
    isLetter: isLetter,
    isDigit: isDigit,
    isOctDigit: isOctDigit,
    isHexDigit: isHexDigit,
    isControl: isControl,
    isPrint: isPrint,
    isSpace: isSpace,
    isSymbol: isSymbol,
    isSeparator: isSeparator,
    isPunctuation: isPunctuation,
    isMark: isMark,
    isNumber: isNumber,
    digitToInt: digitToInt,
    toLower: toLower,
    toUpper: toUpper,
    toTitle: toTitle,
    UppercaseLetter: UppercaseLetter,
    LowercaseLetter: LowercaseLetter,
    TitlecaseLetter: TitlecaseLetter,
    ModifierLetter: ModifierLetter,
    OtherLetter: OtherLetter,
    NonSpacingMark: NonSpacingMark,
    SpacingCombiningMark: SpacingCombiningMark,
    EnclosingMark: EnclosingMark,
    DecimalNumber: DecimalNumber,
    LetterNumber: LetterNumber,
    OtherNumber: OtherNumber,
    ConnectorPunctuation: ConnectorPunctuation,
    DashPunctuation: DashPunctuation,
    OpenPunctuation: OpenPunctuation,
    ClosePunctuation: ClosePunctuation,
    InitialQuote: InitialQuote,
    FinalQuote: FinalQuote,
    OtherPunctuation: OtherPunctuation,
    MathSymbol: MathSymbol,
    CurrencySymbol: CurrencySymbol,
    ModifierSymbol: ModifierSymbol,
    OtherSymbol: OtherSymbol,
    Space: Space,
    LineSeparator: LineSeparator,
    ParagraphSeparator: ParagraphSeparator,
    Control: Control,
    Format: Format,
    Surrogate: Surrogate,
    PrivateUse: PrivateUse,
    NotAssigned: NotAssigned,
    unicodeCatToGeneralCat: unicodeCatToGeneralCat,
    generalCatToInt: generalCatToInt,
    generalCatToUnicodeCat: generalCatToUnicodeCat,
    generalCategory: generalCategory,
    showGeneralCategory: showGeneralCategory,
    eqGeneralCategory: eqGeneralCategory,
    ordGeneralCategory: ordGeneralCategory,
    boundedGeneralCategory: boundedGeneralCategory
};
