const control = require("../control");
let Data_Array = require("../Data.Array/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Set = require("../Data.Set/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Insect_Format = require("../Insect.Format/index.js");
let Insect_Interpreter = require("../Insect.Interpreter/index.js");
let Insect_Parser = require("../Insect.Parser/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Quantity = require("../Data.Quantity/index.js");
let Data_Quantity_Math = require("../Data.Quantity.Math/index.js");
let Data_Quantity_Physics = require("../Data.Quantity.Physics/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Units_SI = require("../Data.Units.SI/index.js");
let Insect_Language = require("../Insect.Language/index.js");
const text = require("../text");


let offsetFahrenheit = 459.67;
let offsetCelsius = 273.15;
let multiplierFahrenheit = 5.0 / 9.0;

function toCelsius(tempKelvin$prime) {
	return control.bind(Data_Either.bindEither)(Data_Quantity.asValueIn(tempKelvin$prime)(Data_Units_SI.kelvin))(function (tempKelvin) {
		return control.pure(Data_Either.applicativeEither)(Data_Quantity.scalar(tempKelvin - offsetCelsius));
	});
}

function toFahrenheit(tempKelvin$prime) {
	return control.bind(Data_Either.bindEither)(Data_Quantity.asValueIn(tempKelvin$prime)(Data_Units_SI.kelvin))(function (tempKelvin) {
		return control.pure(Data_Either.applicativeEither)(Data_Quantity.scalar(tempKelvin / multiplierFahrenheit - offsetFahrenheit));
	});
}

function fromFahrenheit(tempFahrenheit$prime) {
	return control.bind(Data_Either.bindEither)(Data_Quantity.toScalar(tempFahrenheit$prime))(function (tempFahrenheit) {
		return control.pure(Data_Either.applicativeEither)(Data_Quantity.quantity((tempFahrenheit + offsetFahrenheit) * multiplierFahrenheit)(Data_Units_SI.kelvin));
	});
}

function fromCelsius(tempCelsius$prime) {
	return control.bind(Data_Either.bindEither)(Data_Quantity.toScalar(tempCelsius$prime))(function (tempCelsius) {
		return control.pure(Data_Either.applicativeEither)(Data_Quantity.quantity(tempCelsius + offsetCelsius)(Data_Units_SI.kelvin));
	});
}

class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let Constant = (() => {
	function Constant() {};
	Constant.value = new Constant();
	return Constant;
})();

let HiddenConstant = (() => {
	function HiddenConstant() {};
	HiddenConstant.value = new HiddenConstant();
	return HiddenConstant;
})();

let UserDefined = (() => {
	function UserDefined() {};
	UserDefined.value = new UserDefined();
	return UserDefined;
})();

let StoredValue = (() => {
	function StoredValue(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	StoredValue.create = function (value0) {
		return function (value1) {
			return new StoredValue(value0, value1);
		};
	};
	return StoredValue;
})();

let StoredFunction = (() => {
	function StoredFunction(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	StoredFunction.create = function (value0) {
		return function (value1) {
			return new StoredFunction(value0, value1);
		};
	};
	return StoredFunction;
})();

let initialEnvironment = (() => {
	let wrapSimple2 = function (name) {
		return function (func) {
			return function (qs) {
				let numArgs = Data_List_NonEmpty.length(qs);
				if (qs.value1 instanceof Data_List_Types.Cons && qs.value1.value1 instanceof Data_List_Types.Nil) {
					return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create)(func(qs.value0)(qs.value1.value0));
				};
				return Data_Either.Left.create(new Insect_Language.WrongArityError(name, 2, numArgs));
			};
		};
	};
	let wrapSimple = function (name) {
		return function (func) {
			return function (qs) {
				let numArgs = Data_List_NonEmpty.length(qs);
				let $7 = numArgs === 1;
				if ($7) {
					return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create)(func(Data_List_NonEmpty.head(qs)));
				};
				return Data_Either.Left.create(new Insect_Language.WrongArityError(name, 1, numArgs));
			};
		};
	};
	let hiddenVal = function (identifier) {
		return function (value) {
			return new Data_Tuple.Tuple(identifier, new StoredValue(HiddenConstant.value, value));
		};
	};
	let constVal = function (identifier) {
		return function (value) {
			return new Data_Tuple.Tuple(identifier, new StoredValue(Constant.value, value));
		};
	};
	let constFuncN = function (identifier) {
		return function (func) {
			return new Data_Tuple.Tuple(identifier, new StoredFunction(Constant.value, func));
		};
	};
	let constFunc2 = function (identifier) {
		return function (func) {
			return new Data_Tuple.Tuple(identifier, new StoredFunction(Constant.value, wrapSimple2(identifier)(func)));
		};
	};
	let constFunc = function (identifier) {
		return function (func) {
			return new Data_Tuple.Tuple(identifier, new StoredFunction(Constant.value, wrapSimple(identifier)(func)));
		};
	};
	return {
		values: Data_Map_Internal.fromFoldable(Data_Ord.ordString)(Data_Foldable.foldableArray)([constVal("alpha")(Data_Quantity_Physics.α), constVal("avogadroConstant")(Data_Quantity_Physics.avogadroConstant), constVal("bohrMagneton")(Data_Quantity_Physics.µB), constVal("boltzmannConstant")(Data_Quantity_Physics.kB), constVal("c")(Data_Quantity_Physics.speedOfLight), constVal("e")(Data_Quantity_Math.e), constVal("electricConstant")(Data_Quantity_Physics.ε0), constVal("eps0")(Data_Quantity_Physics.ε0), constVal("\u03b50")(Data_Quantity_Physics.ε0), constVal("elementaryCharge")(Data_Quantity_Physics.electronCharge), constVal("electronCharge")(Data_Quantity_Physics.electronCharge), constVal("electronMass")(Data_Quantity_Physics.electronMass), constVal("G")(Data_Quantity_Physics.gravitationalConstant), constVal("g0")(Data_Quantity_Physics.g0), constVal("gravity")(Data_Quantity_Physics.g0), constVal("h_bar")(Data_Quantity_Physics.ℏ), constVal("\u210f")(Data_Quantity_Physics.ℏ), constVal("k_B")(Data_Quantity_Physics.kB), constVal("magneticConstant")(Data_Quantity_Physics.µ0), constVal("mu0")(Data_Quantity_Physics.µ0), constVal("\xb50")(Data_Quantity_Physics.µ0), constVal("muB")(Data_Quantity_Physics.µB), constVal("\xb5_B")(Data_Quantity_Physics.µB), constVal("N_A")(Data_Quantity_Physics.avogadroConstant), constVal("pi")(Data_Quantity_Math.pi), constVal("\u03c0")(Data_Quantity_Math.pi), constVal("planckConstant")(Data_Quantity_Physics.planckConstant), constVal("protonMass")(Data_Quantity_Physics.protonMass), constVal("speedOfLight")(Data_Quantity_Physics.speedOfLight), constVal("R")(Data_Quantity_Physics.idealGasConstant), hiddenVal("hundred")(Data_Quantity.scalar(100.0)), hiddenVal("thousand")(Data_Quantity.scalar(1000.0)), hiddenVal("million")(Data_Quantity.scalar(1000000.0)), hiddenVal("billion")(Data_Quantity.scalar(1.0e9)), hiddenVal("trillion")(Data_Quantity.scalar(1.0e12)), hiddenVal("quadrillion")(Data_Quantity.scalar(1.0e15)), hiddenVal("quintillion")(Data_Quantity.scalar(1.0e18)), hiddenVal("googol")(Data_Quantity.scalar(1.0e100)), hiddenVal("tau")(Data_Quantity_Math.tau), hiddenVal("\u03c4")(Data_Quantity_Math.tau)]),
		functions: Data_Map_Internal.fromFoldable(Data_Ord.ordString)(Data_Foldable.foldableArray)([constFunc("abs")((() => {
			let $10 = control.pure(Data_Either.applicativeEither);
			return function ($11) {
				return $10(Data_Quantity.abs($11));
			};
		})()), constFunc("acos")(Data_Quantity_Math.acos), constFunc("acosh")(Data_Quantity_Math.acosh), constFunc("acos")(Data_Quantity_Math.acos), constFunc("acosh")(Data_Quantity_Math.acosh), constFunc("asin")(Data_Quantity_Math.asin), constFunc("asinh")(Data_Quantity_Math.asinh), constFunc("atan")(Data_Quantity_Math.atan), constFunc2("atan2")(Data_Quantity_Math.atan2), constFunc("atanh")(Data_Quantity_Math.atanh), constFunc("ceil")(Data_Quantity_Math.ceil), constFunc("cos")(Data_Quantity_Math.cos), constFunc("cosh")(Data_Quantity_Math.cosh), constFunc("exp")(Data_Quantity_Math.exp), constFunc("floor")(Data_Quantity_Math.floor), constFunc("fromCelsius")(fromCelsius), constFunc("fromFahrenheit")(fromFahrenheit), constFunc("gamma")(Data_Quantity_Math.gamma), constFunc("ln")(Data_Quantity_Math.ln), constFunc("log")(Data_Quantity_Math.ln), constFunc("log10")(Data_Quantity_Math.log10), constFuncN("minimum")((() => {
			let $12 = Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create);
			return function ($13) {
				return $12(Data_Quantity_Math.min(Data_List_Types.NonEmptyList($13)));
			};
		})()), constFuncN("maximum")((() => {
			let $14 = Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create);
			return function ($15) {
				return $14(Data_Quantity_Math.max(Data_List_Types.NonEmptyList($15)));
			};
		})()), constFuncN("mean")((() => {
			let $16 = Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create);
			return function ($17) {
				return $16(Data_Quantity_Math.mean(Data_List_Types.NonEmptyList($17)));
			};
		})()), constFunc("round")(Data_Quantity_Math.round), constFunc("sin")(Data_Quantity_Math.sin), constFunc("sinh")(Data_Quantity_Math.sinh), constFunc("sqrt")((() => {
			let $18 = control.pure(Data_Either.applicativeEither);
			return function ($19) {
				return $18(Data_Quantity.sqrt($19));
			};
		})()), constFunc("tan")(Data_Quantity_Math.tan), constFunc("tanh")(Data_Quantity_Math.tanh), constFunc("toCelsius")(toCelsius), constFunc("toFahrenheit")(toFahrenheit)])
	};
})();

let eqStorageType = new Eq(function (x) {
	return function (y) {
		if (x instanceof Constant && y instanceof Constant) {
			return true;
		};
		if (x instanceof HiddenConstant && y instanceof HiddenConstant) {
			return true;
		};
		if (x instanceof UserDefined && y instanceof UserDefined) {
			return true;
		};
		return false;
	};
});


let keys = (() => {
	let $0 = Data_Functor._void(Data_Map_Internal.functorMap);
	return function ($1) {
		return $0($1);
	};
})();

let supportedUnits = (() => {
	let toStrs = function (v) {
		return v.value1;
	};
	let toArray = function (v) {
		return control.bind(control.bindArray)(v.value0)(toStrs);
	};
	return Data_Array.sort(Data_Ord.ordString)(Data_Semigroup.append(Data_Semigroup.semigroupArray)(toArray(Insect_Parser.normalUnitDict))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(toArray(Insect_Parser.imperialUnitDict))(["d", "t"])));
})();

function msgTypeToString(v) {
	if (v instanceof Insect_Interpreter.Info) {
		return "info";
	};
	if (v instanceof Insect_Interpreter["Error"]) {
		return "error";
	};
	if (v instanceof Insect_Interpreter.Value) {
		return "value";
	};
	if (v instanceof Insect_Interpreter.ValueSet) {
		return "value-set";
	};
	throw new Error("Failed pattern match at Insect (line 42, column 1 - line 42, column 39): " + [v.constructor.name]);
}

function repl(fmt) {
	return function (env) {
		return function (userInput) {
			let v = Insect_Parser.parseInsect(env)(userInput);
			if (v instanceof Data_Either.Left) {
				let pos = text.parseErrorPosition(v.value0);
				return {
					msg: Insect_Format.format(fmt)([Insect_Format.optional(Insect_Format.text("  ")), Insect_Format.error("Parse error at position " + (Data_Show.show(Data_Show.showInt)(pos.column) + ": ")), Insect_Format.text(text.parseErrorMessage(v.value0))]),
					msgType: "error",
					newEnv: env
				};
			};
			if (v instanceof Data_Either.Right) {
				let ans = Insect_Interpreter.runInsect(env)(v.value0);
				if (ans.msg instanceof Insect_Interpreter.Message) {
					return {
						msgType: msgTypeToString(ans.msg.value0),
						msg: Insect_Format.format(fmt)(ans.msg.value1),
						newEnv: ans.newEnv
					};
				};
				if (ans.msg instanceof Insect_Interpreter.MQuit) {
					return {
						msgType: "quit",
						msg: "",
						newEnv: ans.newEnv
					};
				};
				if (ans.msg instanceof Insect_Interpreter.MClear) {
					return {
						msgType: "clear",
						msg: "",
						newEnv: ans.newEnv
					};
				};
				throw new Error("Failed pattern match at Insect (line 68, column 10 - line 80, column 36): " + [ans.msg.constructor.name]);
			};
			throw new Error("Failed pattern match at Insect (line 53, column 3 - line 80, column 36): " + [v.constructor.name]);
		};
	};
}

function identifiers(env) {
	return Data_Set.toUnfoldable(Data_Unfoldable.unfoldableArray)(keys(env.values));
}

function functions(env) {
	return Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Set.toUnfoldable(Data_Unfoldable.unfoldableArray)(keys(env.functions)))(["sum", "product"]);
}

let fmtPlain = Insect_Format.fmtPlain;
let fmtJqueryTerminal = Insect_Format.fmtJqueryTerminal;
let fmtConsole = Insect_Format.fmtConsole;
let commands = Insect_Parser.commands;

module.exports = {
	repl: repl,
	initialEnvironment: initialEnvironment,
	supportedUnits: supportedUnits,
	fmtPlain: fmtPlain,
	fmtJqueryTerminal: fmtJqueryTerminal,
	fmtConsole: fmtConsole,
	commands: commands,
	functions: functions,
	identifiers: identifiers,
	Constant: Constant,
	HiddenConstant: HiddenConstant,
	UserDefined: UserDefined,
	StoredValue: StoredValue,
	StoredFunction: StoredFunction,
	initialEnvironment: initialEnvironment,
	eqStorageType: eqStorageType
};
