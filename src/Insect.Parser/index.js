let control = require("../control");
let Data_Array = require("../Data.Array/index.js");
let Data_Decimal = require("../Data.Decimal/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Identity = require("../Data.Identity/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_String_CodePoints = require("../Data.String.CodePoints/index.js");
let Data_Units = require("../Data.Units/index.js");
let Data_Units_Astronomical = require("../Data.Units.Astronomical/index.js");
let Data_Units_Currency = require("../Data.Units.Currency/index.js");
let Data_Units_Imperial = require("../Data.Units.Imperial/index.js");
let Data_Units_Misc = require("../Data.Units.Misc/index.js");
let Data_Units_Nautical = require("../Data.Units.Nautical/index.js");
let Data_Units_PartsPerX = require("../Data.Units.PartsPerX/index.js");
let Data_Units_SI = require("../Data.Units.SI/index.js");
let Data_Units_SI_Accepted = require("../Data.Units.SI.Accepted/index.js");
let Data_Units_SI_Derived = require("../Data.Units.SI.Derived/index.js");
let Data_Units_Time = require("../Data.Units.Time/index.js");
let Data_Units_USCustomary = require("../Data.Units.USCustomary/index.js");
let Insect_Language = require("../Insect.Language/index.js");
let text = require("../text");
let Text_Parsing_Parser_Combinators = require("../Text.Parsing.Parser.Combinators/index.js");
let Text_Parsing_Parser_String = require("../Text.Parsing.Parser.String/index.js");
let Text_Parsing_Parser_Token = require("../Text.Parsing.Parser.Token/index.js");


let gauss = Data_Units.makeNonStandard("gauss")("gauss")(0.1)(Data_Units.divideUnits(Data_Units_SI.gram)(Data_Semigroup.append(Data_Units.semigroupDerivedUnit)(Data_Units.power(Data_Units_SI.second)(2.0))(Data_Units_SI.ampere)));
let bit = Data_Units.makeStandard("bit")("bit");
let _byte = Data_Units.makeNonStandard("byte")("B")(8.0)(bit);
let commands = ["help", "?", "list", "ls", "ll", "reset", "clear", "cls", "quit", "exit"];

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

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(() => {
	return semigroupoidFn;
}, function (x) {
	return x;
});

function identity(dict) {
	return dict.identity;
}

function apply(dict) {
	return dict.apply;
}

function applyFirst(dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Functor._const)(a))(b);
		};
	};
}

function applySecond(dictApply) {
	return function (a) {
		return function (b) {
			return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Functor._const(identity(categoryFn)))(a))(b);
		};
	};
}

function alt(dict) {
	return dict.alt;
}

let DictEntry = (() => {
	function DictEntry(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	DictEntry.create = function (value0) {
		return function (value1) {
			return new DictEntry(value0, value1);
		};
	};
	return DictEntry;
})();

let Dictionary = (() => {
	function Dictionary(value0) {
		this.value0 = value0;
	};
	Dictionary.create = function (value0) {
		return new Dictionary(value0);
	};
	return Dictionary;
})();

let specialCases = alt(text.altParserT(Data_Identity.monadIdentity))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)("d"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Data_Units_Time.day)))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)("t"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Data_Units_SI_Accepted.tonne)));

function sepBy1(dictMonad) {
	return function (p) {
		return function (sep) {
			return control.bind(text.bindParserT(dictMonad))(p)(function (a) {
				return control.bind(text.bindParserT(dictMonad))(Data_List.many(text.alternativeParserT(dictMonad))(text.lazyParserT)(applySecond(text.applyParserT(dictMonad))(sep)(p)))(function (as) {
					return control.pure(text.applicativeParserT(dictMonad))(new Data_NonEmpty.NonEmpty(a, as));
				});
			});
		};
	};
}

let prefixDict = new Dictionary([new DictEntry(Data_Units.kibi, ["kibi", "Ki"]), new DictEntry(Data_Units.mebi, ["mebi", "Mi"]), new DictEntry(Data_Units.gibi, ["gibi", "Gi"]), new DictEntry(Data_Units.tebi, ["tebi", "Ti"]), new DictEntry(Data_Units.pebi, ["pebi", "Pi"]), new DictEntry(Data_Units.exbi, ["exbi", "Ei"]), new DictEntry(Data_Units.zebi, ["zebi", "Zi"]), new DictEntry(Data_Units.yobi, ["yobi", "Yi"]), new DictEntry(Data_Units.atto, ["atto", "a"]), new DictEntry(Data_Units.femto, ["femto", "f"]), new DictEntry(Data_Units.peta, ["peta"]), new DictEntry(Data_Units.mega, ["mega"]), new DictEntry(Data_Units.pico, ["pico", "p"]), new DictEntry(Data_Units.nano, ["nano", "n"]), new DictEntry(Data_Units.micro, ["micro", "u", "\xb5", "\u03bc"]), new DictEntry(Data_Units.milli, ["milli", "m"]), new DictEntry(Data_Units.centi, ["centi", "c"]), new DictEntry(Data_Units.deci, ["deci", "d"]), new DictEntry(Data_Units.hecto, ["hecto", "h"]), new DictEntry(Data_Units.kilo, ["kilo", "k"]), new DictEntry(Data_Units.mega, ["M"]), new DictEntry(Data_Units.giga, ["giga", "G"]), new DictEntry(Data_Units.tera, ["tera", "T"]), new DictEntry(Data_Units.peta, ["P"]), new DictEntry(Data_Units.exa, ["exa", "E"])]);
let normalUnitDict = new Dictionary([new DictEntry(Data_Units_SI_Derived.radian, ["radians", "radian", "rad"]), new DictEntry(Data_Units_SI_Accepted.degree, ["degrees", "degree", "deg", "\xb0"]), new DictEntry(Data_Units_SI_Derived.hertz, ["hertz", "Hz"]), new DictEntry(Data_Units_Misc.rpm, ["RPM", "rpm"]), new DictEntry(Data_Units_SI_Derived.newton, ["newton", "N"]), new DictEntry(Data_Units_SI_Derived.joule, ["joules", "joule", "J"]), new DictEntry(Data_Units_SI_Derived.pascal, ["pascal", "Pa"]), new DictEntry(Data_Units_SI_Derived.volt, ["volts", "volt", "V"]), new DictEntry(Data_Units_SI_Derived.farad, ["farad", "F"]), new DictEntry(Data_Units_SI_Derived.ohm, ["ohms", "ohm", "\u03a9"]), new DictEntry(Data_Units_SI_Derived.sievert, ["sievert", "Sv"]), new DictEntry(Data_Units_SI_Derived.weber, ["weber", "Wb"]), new DictEntry(Data_Units_SI_Derived.tesla, ["tesla", "T"]), new DictEntry(Data_Units_SI_Derived.henry, ["henrys", "henries", "henry", "H"]), new DictEntry(Data_Units_SI_Derived.coulomb, ["coulomb", "C"]), new DictEntry(Data_Units_SI_Derived.siemens, ["siemens", "S"]), new DictEntry(Data_Units_SI_Derived.lumen, ["lumen", "lm"]), new DictEntry(Data_Units_SI_Derived.lux, ["lux", "lx"]), new DictEntry(Data_Units_SI_Derived.becquerel, ["becquerel", "Bq"]), new DictEntry(Data_Units_SI_Derived.gray, ["gray", "Gy"]), new DictEntry(Data_Units_SI_Derived.katal, ["katal", "kat"]), new DictEntry(Data_Units_SI_Accepted.hectare, ["hectare", "ha"]), new DictEntry(Data_Units_SI_Accepted.tonne, ["tonnes", "tonne", "tons", "ton"]), new DictEntry(Data_Units_SI_Accepted.electronvolt, ["electronvolt", "eV"]), new DictEntry(Data_Units_Misc.calorie, ["calories", "calorie", "cal"]), new DictEntry(Data_Units_SI_Accepted.bel, ["bel"]), new DictEntry(Data_Units_SI_Accepted.astronomicalUnit, ["AU", "au", "astronomicalunits", "astronomicalunit"]), new DictEntry(Data_Units_Astronomical.parsec, ["parsecs", "parsec", "pc"]), new DictEntry(Data_Units_Astronomical.lightyear, ["lightyears", "lightyear", "ly"]), new DictEntry(Data_Units_SI_Accepted.barn, ["barn"]), new DictEntry(Data_Units_SI_Accepted.bar, ["bar"]), new DictEntry(Data_Units_SI_Accepted.angstrom, ["angstrom", "\xc5"]), new DictEntry(gauss, ["gauss"]), new DictEntry(Data_Units_SI.ampere, ["amperes", "ampere", "amps", "amp", "A"]), new DictEntry(Data_Units_SI.mole, ["mole", "mol"]), new DictEntry(Data_Units_SI.kelvin, ["kelvin", "K"]), new DictEntry(Data_Units_SI.candela, ["candela", "cd"]), new DictEntry(Data_Semigroup.append(Data_Units.semigroupDerivedUnit)(Data_Units_SI_Derived.watt)(Data_Units_Time.hour), ["Wh"]), new DictEntry(Data_Units_SI_Derived.watt, ["watts", "watt", "W"]), new DictEntry(_byte, ["Bytes", "bytes", "Byte", "byte", "B", "Octets", "octets", "Octet", "octet"]), new DictEntry(bit, ["bits", "bit"]), new DictEntry(Data_Units.divideUnits(bit)(Data_Units_SI.second), ["bps"]), new DictEntry(Data_Units_SI.second, ["seconds", "second", "sec", "s"]), new DictEntry(Data_Units_Time.minute, ["minutes", "minute", "min"]), new DictEntry(Data_Units_Time.hour, ["hours", "hour", "h"]), new DictEntry(Data_Units_Time.day, ["days", "day"]), new DictEntry(Data_Units_Time.week, ["weeks", "week"]), new DictEntry(Data_Units_Misc.fortnight, ["fortnights", "fortnight"]), new DictEntry(Data_Units_Time.month, ["months", "month"]), new DictEntry(Data_Units_Time.year, ["years", "year"]), new DictEntry(Data_Units_SI.gram, ["grammes", "gramme", "grams", "gram", "g"]), new DictEntry(Data_Units_SI.meter, ["metres", "metre", "meters", "meter", "m"]), new DictEntry(Data_Units_SI_Accepted.liter, ["liters", "liter", "litres", "litre", "L", "l"]), new DictEntry(Data_Units_Misc.atm, ["atm"]), new DictEntry(Data_Units_Misc.pixel, ["pixels", "pixel", "px"]), new DictEntry(Data_Units_Misc.frame, ["frames", "frame"]), new DictEntry(Data_Units.divideUnits(Data_Units_Misc.frame)(Data_Units_SI.second), ["fps"]), new DictEntry(Data_Units_Misc.dot, ["dots", "dot"])]);
let imperialUnitDict = new Dictionary([new DictEntry(Data_Units_PartsPerX.percent, ["pct", "percent"]), new DictEntry(Data_Units_PartsPerX.partsPerMillion, ["ppm"]), new DictEntry(Data_Units_PartsPerX.partsPerBillion, ["ppb"]), new DictEntry(Data_Units_PartsPerX.partsPerTrillion, ["ppt"]), new DictEntry(Data_Units_PartsPerX.partsPerQuadrillion, ["ppq"]), new DictEntry(Data_Units_Imperial.mile, ["miles", "mile"]), new DictEntry(Data_Units.divideUnits(Data_Units_Imperial.mile)(Data_Units_Time.hour), ["mph"]), new DictEntry(Data_Units_Imperial.inch, ["inches", "inch", "in"]), new DictEntry(Data_Units_Imperial.yard, ["yards", "yard", "yd"]), new DictEntry(Data_Units_Imperial.foot, ["feet", "foot", "ft"]), new DictEntry(Data_Units_Imperial.thou, ["thou"]), new DictEntry(Data_Units_Imperial.ounce, ["ounces", "ounce", "oz"]), new DictEntry(Data_Units_Misc.lbf, ["pound_force", "lbf"]), new DictEntry(Data_Units_Imperial.pound, ["pounds", "pound", "lb"]), new DictEntry(Data_Units_USCustomary.gallon, ["gallons", "gallon", "gal"]), new DictEntry(Data_Units_USCustomary.pint, ["pints", "pint"]), new DictEntry(Data_Units_USCustomary.cup, ["cups", "cup"]), new DictEntry(Data_Units_USCustomary.tablespoon, ["tablespoons", "tablespoon", "tbsp"]), new DictEntry(Data_Units_USCustomary.teaspoon, ["teaspoons", "teaspoon", "tsp"]), new DictEntry(Data_Units_USCustomary.fluidounce, ["fluidounces", "fluidounce", "floz"]), new DictEntry(Data_Units_Imperial.furlong, ["furlong"]), new DictEntry(Data_Units_Misc.btu, ["BTU"]), new DictEntry(Data_Units_Misc.psi, ["psi"]), new DictEntry(Data_Units_Misc.mmHg, ["mmHg"]), new DictEntry(Data_Units_USCustomary.hogshead, ["hogsheads", "hogshead"]), new DictEntry(Data_Units_USCustomary.rod, ["rods", "rod"]), new DictEntry(Data_Units.divideUnits(Data_Units_Misc.pixel)(Data_Units_Imperial.inch), ["ppi"]), new DictEntry(Data_Units.divideUnits(Data_Units_Misc.dot)(Data_Units_Imperial.inch), ["dpi"]), new DictEntry(Data_Units_Misc.piece, ["pieces", "piece"]), new DictEntry(Data_Units_Misc.person, ["persons", "person", "people"]), new DictEntry(Data_Units_Currency.dollar, ["dollars", "dollar", "USD", "$"]), new DictEntry(Data_Units_Currency.euro, ["euros", "euro", "EUR", "\u20ac"]), new DictEntry(Data_Units_Nautical.knot, ["knots", "knot", "kn", "kt"]), new DictEntry(Data_Units_Nautical.nauticalMile, ["M", "NM", "nmi"])]);
let identStart = alt(text.altParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Token.letter(Data_Identity.monadIdentity))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)("_"));
let identLetter = alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Token.letter(Data_Identity.monadIdentity))(Text_Parsing_Parser_Token.digit(Data_Identity.monadIdentity)))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)("_")))(Text_Parsing_Parser_String["char"](Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)("'"));

function foldr1(f) {
	return function (v) {
		let v1 = Data_List.last(v.value1);
		let v2 = Data_List.init(v.value1);
		if (v2 instanceof Data_Maybe.Just && v1 instanceof Data_Maybe.Just) {
			return f(v.value0)(Data_Foldable.foldr(Data_List_Types.foldableList)(f)(v1.value0)(v2.value0));
		};
		return v.value0;
	};
}

let insectLanguage = {
	commentStart: "",
	commentEnd: "",
	commentLine: "#",
	nestedComments: false,
	identStart: identStart,
	identLetter: identLetter,
	opStart: Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)(["+", "-", "*", "\xb7", "\u22c5", "\xd7", "/", "\xf7", "%", "^", "!", "\u2192", "\u279e", "="]),
	opLetter: Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)([]),
	reservedNames: Data_Semigroup.append(Data_Semigroup.semigroupArray)(commands)(["\xb9", "\xb2", "\xb3", "\u2074", "\u2075", "\u207b\xb9", "\u207b\xb2", "\u207b\xb3", "\u207b\u2074", "\u207b\u2075", "to", "per"]),
	reservedOpNames: ["->", "+", "-", "*", "\xb7", "\u22c5", "\xd7", "/", "\xf7", "%", "^", "!", "**", "=", ","],
	caseSensitive: true
};

let token = Text_Parsing_Parser_Token.makeTokenParser(Data_Identity.monadIdentity)(insectLanguage);

function $$function(env) {
	return control.bind(text.bindParserT(Data_Identity.monadIdentity))(token.identifier)(function (name) {
		let $17 = name === "sum" || name === "product";
		if ($17) {
			return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(name);
		};
		let v = Data_Map_Internal.lookup(Data_Ord.ordString)(name)(env.functions);
		if (v instanceof Data_Maybe.Just) {
			return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(name);
		};
		if (v instanceof Data_Maybe.Nothing) {
			return text.fail(Data_Identity.monadIdentity)("Unknown function '" + (name + "'"));
		};
		throw new Error("Failed pattern match at Insect.Parser (line 353, column 7 - line 355, column 61): " + [v.constructor.name]);
	});
}

let parens = token.parens;
let reserved = token.reserved;
let reservedOp = token.reservedOp;

let variable = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Variable.create)(token.identifier);

let whiteSpace = token.whiteSpace;

let number = (() => {
	let fromCharArray = (() => {
		let $42 = Data_Functor.map(Data_Functor.functorArray)(Data_String_CodePoints.codePointFromChar);
		return function ($43) {
			return Data_String_CodePoints.fromCodePointArray($42($43));
		};
	})();
	let digits = control.bind(text.bindParserT(Data_Identity.monadIdentity))(Data_Array.some(text.alternativeParserT(Data_Identity.monadIdentity))(text.lazyParserT)(Text_Parsing_Parser_Combinators.withErrorMessage(Data_Identity.monadIdentity)(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]))("a digit")))(function (ds) {
		return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(fromCharArray(Data_Array.fromFoldable(Data_Foldable.foldableArray)(ds)));
	});
	let signAndDigits = control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.option(Data_Identity.monadIdentity)("+")(Text_Parsing_Parser_String.oneOf(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)(["+", "-"])))(function (sign) {
		return control.bind(text.bindParserT(Data_Identity.monadIdentity))(digits)(function (intPart) {
			return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Data_String_CodePoints.singleton(Data_String_CodePoints.codePointFromChar(sign)) + intPart);
		});
	});
	return control.bind(text.bindParserT(Data_Identity.monadIdentity))(digits)(function (intPart) {
		return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.optionMaybe(Data_Identity.monadIdentity)(apply(text.applyParserT(Data_Identity.monadIdentity))(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_Semigroup.append(Data_Semigroup.semigroupString))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)(".")))(digits)))(function (mFracPart) {
			let fracPart = Data_Maybe.fromMaybe("")(mFracPart);
			return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.optionMaybe(Data_Identity.monadIdentity)(Text_Parsing_Parser_Combinators["try"](Data_Identity.monadIdentity)(control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)("e"))(() => {
				return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.notFollowedBy(Data_Identity.monadIdentity)(identStart))(() => {
					return control.bind(text.bindParserT(Data_Identity.monadIdentity))(signAndDigits)(function (sad) {
						return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))("e" + sad);
					});
				});
			}))))(function (mExpPart) {
				let expPart = Data_Maybe.fromMaybe("")(mExpPart);
				return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(whiteSpace)(() => {
					let floatStr = intPart + (fracPart + expPart);
					let v = Data_Decimal.fromString(floatStr);
					if (v instanceof Data_Maybe.Just) {
						let $23 = Data_Decimal["isFinite"](v.value0);
						if ($23) {
							return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(v.value0);
						};
						return text.fail(Data_Identity.monadIdentity)("This number is too large");
					};
					if (v instanceof Data_Maybe.Nothing) {
						return text.fail(Data_Identity.monadIdentity)("Parsing of number failed for input '" + (floatStr + "'"));
					};
					throw new Error("Failed pattern match at Insect.Parser (line 114, column 3 - line 119, column 79): " + [v.constructor.name]);
				});
			});
		});
	});
})();

let command = applyFirst(text.applyParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(reserved("help"))(reserved("?")))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.Help.value)))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(reserved("list"))(reserved("ls")))(reserved("ll")))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.List.value))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reserved("reset"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.Reset.value))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(reserved("clear"))(reserved("cls")))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.Clear.value))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(reserved("quit"))(reserved("exit")))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.Quit.value))))(Text_Parsing_Parser_String.eof(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity));

function buildDictParser(v) {
	function abbrevParser(x) {
		return function (abbrev) {
			return applySecond(text.applyParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_String.string(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)(abbrev))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(x));
		};
	}

	function entryParser(v1) {
		return Data_Foldable.oneOf(Data_Foldable.foldableArray)(text.plusParserT(Data_Identity.monadIdentity))(Data_Functor.map(Data_Functor.functorArray)(abbrevParser(v1.value0))(v1.value1));
	};
	return Data_Foldable.oneOf(Data_Foldable.foldableArray)(text.plusParserT(Data_Identity.monadIdentity))(Data_Functor.map(Data_Functor.functorArray)(entryParser)(v.value0))
}

let imperialUnit = Text_Parsing_Parser_Combinators.withErrorMessage(Data_Identity.monadIdentity)(buildDictParser(imperialUnitDict))("imperial unit");

let normalUnit = Text_Parsing_Parser_Combinators.withErrorMessage(Data_Identity.monadIdentity)(buildDictParser(normalUnitDict))("normal unit");

let prefix = alt(text.altParserT(Data_Identity.monadIdentity))(buildDictParser(prefixDict))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(identity(categoryFn)));
let unitWithSIPrefix = control.bind(text.bindParserT(Data_Identity.monadIdentity))(prefix)(function (p) {
	return control.bind(text.bindParserT(Data_Identity.monadIdentity))(normalUnit)(function (u) {
		return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(p(u));
	});
});

let derivedUnit = (() => {
	let augment = function (p) {
		return applyFirst(text.applyParserT(Data_Identity.monadIdentity))(p)(Text_Parsing_Parser_Combinators.notFollowedBy(Data_Identity.monadIdentity)(identLetter));
	};
	return applyFirst(text.applyParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators["try"](Data_Identity.monadIdentity)(augment(unitWithSIPrefix)))(augment(imperialUnit)))(augment(normalUnit)))(augment(specialCases)))(whiteSpace);
})();

function expression(env) {
	let subOp = reservedOp("-");

	function powPos(s) {
		return function (q) {
			if (s === 1.0) {
				return q;
			};
			if (true) {
				return new Insect_Language.BinOp(Insect_Language.Pow.value, q, Insect_Language.Scalar.create(Data_Decimal.fromNumber(s)));
			};
			throw new Error("Failed pattern match at Insect.Parser (line 460, column 5 - line 461, column 65): " + [s.constructor.name, q.constructor.name]);
		};
	}

	let powOp = alt(text.altParserT(Data_Identity.monadIdentity))(reservedOp("^"))(reservedOp("**"));

	function powNeg(s) {
		return function (q) {
			return new Insect_Language.BinOp(Insect_Language.Pow.value, q, Insect_Language.Negate.create(Insect_Language.Scalar.create(Data_Decimal.fromNumber(s))));
		};
	}

	let perOp = reserved("per");
	let mulOp = alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(reservedOp("*"))(reservedOp("\xb7")))(reservedOp("\u22c5")))(reservedOp("\xd7"));
	let modOp = reservedOp("%");
	let facOp = reservedOp("!");
	let divOp = alt(text.altParserT(Data_Identity.monadIdentity))(reservedOp("/"))(reservedOp("\xf7"));
	let commaOp = reservedOp(",");
	let arrOp = alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(reservedOp("->"))(reservedOp("\u2192")))(reservedOp("\u279e")))(reserved("to"));
	let addOp = reservedOp("+");

	return control.fix(text.lazyParserT)(function (p) {
		let atomic = applySecond(text.applyParserT(Data_Identity.monadIdentity))(whiteSpace)(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(parens(p))(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Scalar.create)(number)))(Text_Parsing_Parser_Combinators["try"](Data_Identity.monadIdentity)(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Unit.create)(derivedUnit))))(Text_Parsing_Parser_Combinators["try"](Data_Identity.monadIdentity)(apply(text.applyParserT(Data_Identity.monadIdentity))(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Apply.create)($$function(env)))(parens(sepBy1(Data_Identity.monadIdentity)(p)(commaOp))))))(variable));
		let suffixFac = control.bind(text.bindParserT(Data_Identity.monadIdentity))(atomic)(function (a) {
			return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.optionMaybe(Data_Identity.monadIdentity)(applySecond(text.applyParserT(Data_Identity.monadIdentity))(facOp)(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.Factorial.create))))(function (mf) {
				if (mf instanceof Data_Maybe.Just) {
					return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(mf.value0(a));
				};
				if (mf instanceof Data_Maybe.Nothing) {
					return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(a);
				};
				throw new Error("Failed pattern match at Insect.Parser (line 375, column 9 - line 377, column 27): " + [mf.constructor.name]);
			});
		});
		let suffixPow = control.bind(text.bindParserT(Data_Identity.monadIdentity))(suffixFac)(function (x) {
			return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.optionMaybe(Data_Identity.monadIdentity)(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\xb9"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powPos(1.0))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\xb2"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powPos(2.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\xb3"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powPos(3.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u2074"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powPos(4.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u2075"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powPos(5.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u207b\xb9"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powNeg(1.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u207b\xb2"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powNeg(2.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u207b\xb3"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powNeg(3.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u207b\u2074"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powNeg(4.0)))))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(reservedOp("\u207b\u2075"))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(powNeg(5.0))))))(function (mFn) {
				if (mFn instanceof Data_Maybe.Just) {
					return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(mFn.value0(x));
				};
				if (mFn instanceof Data_Maybe.Nothing) {
					return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(x);
				};
				throw new Error("Failed pattern match at Insect.Parser (line 393, column 9 - line 395, column 27): " + [mFn.constructor.name]);
			});
		});
		let sepByPow = (() => {
			let list = function (e) {
				return control.bind(text.bindParserT(Data_Identity.monadIdentity))(suffixPow)(function (a) {
					return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Data_List.many(text.alternativeParserT(Data_Identity.monadIdentity))(text.lazyParserT)(control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(powOp)(() => {
						return control.bind(text.bindParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(subOp)(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(Insect_Language.Negate.create)))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(addOp)(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(identity(categoryFn)))))(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(identity(categoryFn))))(function (func) {
							return control.bind(text.bindParserT(Data_Identity.monadIdentity))(e)(function (expr) {
								return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(func(expr));
							});
						});
					})))(function (as) {
						return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(new Data_NonEmpty.NonEmpty(a, as));
					});
				});
			};
			return control.fix(text.lazyParserT)(function (e) {
				return Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(foldr1(Insect_Language.BinOp.create(Insect_Language.Pow.value)))(list(e));
			});
		})();
		let sepByMulImplicit = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Mul.value)))(sepBy1(Data_Identity.monadIdentity)(sepByPow)(control.pure(text.applicativeParserT(Data_Identity.monadIdentity))()));
		let prefixed = control.fix(text.lazyParserT)(function (e) {
			return alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(subOp)(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Negate.create)(e)))(applySecond(text.applyParserT(Data_Identity.monadIdentity))(addOp)(e)))(sepByMulImplicit);
		});
		let sepByMod = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Mod.value)))(sepBy1(Data_Identity.monadIdentity)(prefixed)(modOp));
		let sepByPer = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Div.value)))(sepBy1(Data_Identity.monadIdentity)(sepByMod)(perOp));
		let sepByDiv = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Div.value)))(sepBy1(Data_Identity.monadIdentity)(sepByPer)(divOp));
		let sepByMul = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Mul.value)))(sepBy1(Data_Identity.monadIdentity)(sepByDiv)(mulOp));
		let sepBySub = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Sub.value)))(sepBy1(Data_Identity.monadIdentity)(sepByMul)(subOp));
		let sepByAdd = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.Add.value)))(sepBy1(Data_Identity.monadIdentity)(sepBySub)(addOp));
		let sepByConv = Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Data_NonEmpty.foldl1(Data_List_Types.foldableList)(Insect_Language.BinOp.create(Insect_Language.ConvertTo.value)))(sepBy1(Data_Identity.monadIdentity)(sepByAdd)(arrOp));
		return sepByConv;
	});
}

function fullExpression(env) {
	return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(whiteSpace)(() => {
		return control.bind(text.bindParserT(Data_Identity.monadIdentity))(expression(env))(function (expr) {
			return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.withErrorMessage(Data_Identity.monadIdentity)(Text_Parsing_Parser_String.eof(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity))("end of input"))(() => {
				return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(expr);
			});
		});
	});
}

function assignment(env) {
	let failIfUnit = function (n) {
		return control.when(text.applicativeParserT(Data_Identity.monadIdentity))(Data_Either.isRight(text.runParser(n)(applyFirst(text.applyParserT(Data_Identity.monadIdentity))(derivedUnit)(Text_Parsing_Parser_String.eof(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity)))))(text.fail(Data_Identity.monadIdentity)("'" + (n + "' is reserved for a physical unit")));
	};
	return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators["try"](Data_Identity.monadIdentity)(control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(whiteSpace)(() => {
		return control.bind(text.bindParserT(Data_Identity.monadIdentity))(token.identifier)(function (name) {
			return control.bind(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_Combinators.optionMaybe(Data_Identity.monadIdentity)(parens(sepBy1(Data_Identity.monadIdentity)(token.identifier)(reservedOp(",")))))(function (args) {
				return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(reservedOp("="))(() => {
					return control.bind(text.bindParserT(Data_Identity.monadIdentity))(expression(env))(function (expr) {
						return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(Text_Parsing_Parser_String.eof(Text_Parsing_Parser_String.stringLikeString)(Data_Identity.monadIdentity))(() => {
							return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))({
								name: name,
								args: args,
								expr: expr
							});
						});
					});
				});
			});
		});
	})))((v) => {
		return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(failIfUnit(v.name))(() => {
			if (v.args instanceof Data_Maybe.Nothing) {
				return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(new Insect_Language.VariableAssignment(v.name, v.expr));
			};
			if (v.args instanceof Data_Maybe.Just) {
				return control.discard(control.discardUnit)(text.bindParserT(Data_Identity.monadIdentity))(Data_Foldable.traverse_(text.applicativeParserT(Data_Identity.monadIdentity))(Data_NonEmpty.foldableNonEmpty(Data_List_Types.foldableList))(failIfUnit)(v.args.value0))(() => {
					return control.pure(text.applicativeParserT(Data_Identity.monadIdentity))(new Insect_Language.FunctionAssignment(v.name, v.args.value0, v.expr));
				});
			};
			throw new Error("Failed pattern match at Insect.Parser (line 501, column 3 - line 505, column 45): " + [v.args.constructor.name]);
		});
	});
}

function statement(env) {
	return alt(text.altParserT(Data_Identity.monadIdentity))(alt(text.altParserT(Data_Identity.monadIdentity))(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Command.create)(command))(assignment(env)))(Data_Functor.map(text.functorParserT(Data_Identity.functorIdentity))(Insect_Language.Expression.create)(fullExpression(env)));
}

function parseInsect(arg) {
	return (arg2) => {
		return text.runParser(arg2)(statement(arg));
	};
}

module.exports = {
	DictEntry: DictEntry,
	Dictionary: Dictionary,
	commands: commands,
	prefixDict: prefixDict,
	normalUnitDict: normalUnitDict,
	imperialUnitDict: imperialUnitDict,
	parseInsect: parseInsect
};
