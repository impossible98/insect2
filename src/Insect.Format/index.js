let Data_Array = require("../Data.Array/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");


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

let categoryFn = new Category(() => {
	return semigroupoidFn;
}, function (x) {
	return x;
});


let Normal = (() => {
	function Normal() {

	};
	Normal.value = new Normal();
	return Normal;
})();

let Optional = (() => {
	function Optional() {

	};
	Optional.value = new Optional();
	return Optional;
})();

let FTText = (() => {
	function FTText() {

	};
	FTText.value = new FTText();
	return FTText;
})();
let FTEmphasized = (() => {
	function FTEmphasized() {

	};
	FTEmphasized.value = new FTEmphasized();
	return FTEmphasized;
})();
let FTError = (() => {
	function FTError() {

	};
	FTError.value = new FTError();
	return FTError;
})();
let FTValue = (() => {
	function FTValue() {

	};
	FTValue.value = new FTValue();
	return FTValue;
})();
let FTIdentifier = (() => {
	function FTIdentifier() {

	};
	FTIdentifier.value = new FTIdentifier();
	return FTIdentifier;
})();
let FTFunction = (() => {
	function FTFunction() {

	};
	FTFunction.value = new FTFunction();
	return FTFunction;
})();
let FTUnit = (() => {
	function FTUnit() {

	};
	FTUnit.value = new FTUnit();
	return FTUnit;
})();

let Formatted = (() => {
	function Formatted(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	Formatted.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new Formatted(value0, value1, value2);
			};
		};
	};
	return Formatted;
})();

let val = Formatted.create(Normal.value)(FTValue.value);
let unit = Formatted.create(Normal.value)(FTUnit.value);
let text = Formatted.create(Normal.value)(FTText.value);
let ident = Formatted.create(Normal.value)(FTIdentifier.value);
let _function = Formatted.create(Normal.value)(FTFunction.value);
let error = Formatted.create(Normal.value)(FTError.value);
let emph = Formatted.create(Normal.value)(FTEmphasized.value);
let nl = text("\x0a");

function uncurry(fmt) {
	return (v) => {
		return fmt(v.value0)(v.value1)(v.value2);
	};
}

function optional(v) {
	return new Formatted(Optional.value, v.value1, v.value2);
}

function jtClass(v) {
	return (v1) => {
		if (v1 === "") {
			return "";
		};
		return "[[;;;hl-" + (v + ("]" + (v1 + "]")));
	};
}

function format(formatter) {
	return (m) => {
		return Data_Foldable.foldMap(Data_Foldable.foldableArray)(Data_Monoid.monoidString)(uncurry(formatter))(Data_Array.cons(optional(nl))(m));
	};
}

function fmtPlain(v) {
	return (v1) => {
		return (v2) => {
			if (v instanceof Normal) {
				return v2;
			};
			if (v instanceof Optional) {
				return "";
			};
			throw new Error("Failed pattern match at Insect.Format (line 95, column 1 - line 95, column 21): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
}

function fmtJqueryTerminal(v) {
	return (v1) => {
		if (v1 instanceof FTText) {
			return identity(categoryFn);
		};
		if (v1 instanceof FTEmphasized) {
			return jtClass("emphasized");
		};
		if (v1 instanceof FTError) {
			return jtClass("error");
		};
		if (v1 instanceof FTValue) {
			return jtClass("value");
		};
		if (v1 instanceof FTIdentifier) {
			return jtClass("identifier");
		};
		if (v1 instanceof FTFunction) {
			return jtClass("function");
		};
		if (v1 instanceof FTUnit) {
			return jtClass("unit");
		};
		throw new Error("Failed pattern match at Insect.Format (line 104, column 1 - line 104, column 30): " + [v.constructor.name, v1.constructor.name]);
	};
}

function consoleCode(code) {
	return (str) => {
		return "\x1b[" + code + "m" + str + "\x1b[0m";
	};
}

function fmtConsole(v) {
	return (v1) => {
		return (s) => {
			if (v1 instanceof FTText) {
				return s;
			};
			if (v1 instanceof FTEmphasized) {
				return consoleCode("01")(s);
			};
			if (v1 instanceof FTError) {
				return consoleCode("31")(s);
			};
			if (v1 instanceof FTValue) {
				return consoleCode("36")(s);
			};
			if (v1 instanceof FTIdentifier) {
				return consoleCode("33")(s);
			};
			if (v1 instanceof FTFunction) {
				return consoleCode("03")(s);
			};
			if (v1 instanceof FTUnit) {
				return consoleCode("32")(s);
			};
			throw new Error("Failed pattern match at Insect.Format (line 117, column 1 - line 117, column 23): " + [v.constructor.name, v1.constructor.name, s.constructor.name]);
		};
	};
}

module.exports = {
	text: text,
	emph: emph,
	error: error,
	val: val,
	ident: ident,
	"function": _function,
	unit: unit,
	optional: optional,
	nl: nl,
	format: format,
	fmtPlain: fmtPlain,
	fmtJqueryTerminal: fmtJqueryTerminal,
	fmtConsole: fmtConsole
};
