const control = require("../control");
let Data_Array = require("../Data.Array/index.js");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let data = require("../data");
let Data_List = require("../Data.List/index.js");
let Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Quantity = require("../Data.Quantity/index.js");
let Data_Quantity_Math = require("../Data.Quantity.Math/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Units = require("../Data.Units/index.js");
let Insect_Environment = require("../Insect.Environment/index.js");
let Insect_Format = require("../Insect.Format/index.js");
let Insect_Language = require("../Insect.Language/index.js");
let Insect_PrettyPrint = require("../Insect.PrettyPrint/index.js");


let eqBooleanImpl = refEq;

class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let eqBoolean = new Eq(eqBooleanImpl);

function refEq(r1) {
	return function (r2) {
		return r1 === r2;
	};
}

function eq(dict) {
	return dict.eq;
}

function notEq(dictEq) {
	return (x) => {
		return (y) => {
			return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
		};
	};
};

function fromNumberImpl(just) {
	return (nothing) => {
		return (n) => {
			return (n | 0) === n ? just(n) : nothing;
		};
	};
}

function toNumber(n) {
	return n;
}

let fromNumber = fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);

function unsafeClamp(arg) {
	if (arg === Infinity) {
		return 0;
	};
	if (arg === -Infinity) {
		return 0;
	};
	if (arg >= toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
		return Data_Bounded.top(Data_Bounded.boundedInt);
	};
	if (arg <= toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
		return Data_Bounded.bottom(Data_Bounded.boundedInt);
	};
	if (true) {
		return Data_Maybe.fromMaybe(0)(fromNumber(arg));
	};
	throw new Error("Failed pattern match at Data.Int (line 66, column 1 - line 66, column 29): " + [arg.constructor.name]);
}

function round(arg) {
	return unsafeClamp(Math.round(arg));
}

let Value = (() => {
	function Value() {

	};
	Value.value = new Value();
	return Value;
})();

let ValueSet = (() => {
	function ValueSet() {

	};
	ValueSet.value = new ValueSet();
	return ValueSet;
})();

let Info = (() => {
	function Info() {

	};
	Info.value = new Info();
	return Info;
})();

let $$Error = (() => {
	function $$Error() {

	};
	$$Error.value = new $$Error();
	return $$Error;
})();

let Message = (() => {
	function Message(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Message.create = function (value0) {
		return function (value1) {
			return new Message(value0, value1);
		};
	};
	return Message;
})();

let MQuit = (() => {
	function MQuit() {

	};
	MQuit.value = new MQuit();
	return MQuit;
})();

let MClear = (() => {
	function MClear() {

	};
	MClear.value = new MClear();
	return MClear;
})();

function isConstant(env) {
	return (name) => {
		let isConstantValue = (() => {
			let v = Data_Map_Internal.lookup(Data_Ord.ordString)(name)(env.values);

			if (v instanceof Data_Maybe.Just && v.value0.value0 instanceof Insect_Environment.Constant) {
				return true;
			}

			if (v instanceof Data_Maybe.Just && v.value0.value0 instanceof Insect_Environment.HiddenConstant) {
				return true;
			}

			return false;
		})();

		let isConstantFunction = (() => {
			let v = Data_Map_Internal.lookup(Data_Ord.ordString)(name)(env.functions);
			if (v instanceof Data_Maybe.Just && v.value0.value0 instanceof Insect_Environment.Constant) {
				return true;
			};
			if (v instanceof Data_Maybe.Just && v.value0.value0 instanceof Insect_Environment.HiddenConstant) {
				return true;
			};
			return false;
		})();

		return isConstantValue || isConstantFunction;
	};
}

function conversionErrorMessage(v) {
	function baseRep(u) {
		let us = Data_Units.baseRepresentation(u);
		let us$prime = Data_List.sortBy(Data_Ord.comparing(Data_Ord.ordString)(Data_Units.toString))(us);
		let usStrs = Data_Foldable.intercalate(Data_List_Types.foldableList)(Data_Monoid.monoidArray)([Insect_Format.text("\xb7")])(data.map(Data_List_Types.functorList)(function ($139) {
			return Data_Array.singleton(Insect_Format.unit(Data_Units.toString($139)));
		})(us$prime));
		let br = Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Array.cons(Insect_Format.text(" (base units: "))(usStrs))([Insect_Format.text(")")]);

		let $41 = eq(Data_Units.eqDerivedUnit)(Data_Tuple.fst(Data_Units.toStandardUnit(u)))(Data_Units.unity);

		if ($41) {
			return [];
		}

		let $42 = Data_Units.toString(u) === Insect_Format.format(Insect_Format.fmtPlain)(usStrs);

		if ($42) {
			return [];
		}

		return br;
	}

	let $43 = eq(Data_Units.eqDerivedUnit)(v.value0)(Data_Units.unity);

	if ($43) {
		return [Insect_Format.error("  Conversion error:"), Insect_Format.nl, Insect_Format.nl, Insect_Format.text("    Cannot convert a "), Insect_Format.unit("scalar"), Insect_Format.text(" to a quantity of unit "), Insect_Format.unit(Data_Units.toString(v.value1))];
	}

	let $44 = eq(Data_Units.eqDerivedUnit)(v.value1)(Data_Units.unity);

	if ($44) {
		return [Insect_Format.error("  Conversion error:"), Insect_Format.nl, Insect_Format.nl, Insect_Format.text("    Cannot convert quantity of unit "), Insect_Format.unit(Data_Units.toString(v.value0)), Insect_Format.text(" to a "), Insect_Format.unit("scalar")];
	}

	return Data_Semigroup.append(Data_Semigroup.semigroupArray)([Insect_Format.error("  Conversion error:"), Insect_Format.nl, Insect_Format.nl, Insect_Format.text("    Cannot convert unit "), Insect_Format.unit(Data_Units.toString(v.value0))])(Data_Semigroup.append(Data_Semigroup.semigroupArray)(baseRep(v.value0))(Data_Semigroup.append(Data_Semigroup.semigroupArray)([Insect_Format.nl, Insect_Format.text("                to unit "), Insect_Format.unit(Data_Units.toString(v.value1))])(baseRep(v.value1))));
}

function evalErrorMessage(v) {
	if (v instanceof Insect_Language.QConversionError) {
		return conversionErrorMessage(v.value0);
	}

	if (v instanceof Insect_Language.WrongArityError) {
		return [Insect_Format.optional(Insect_Format.text("  ")), Insect_Format.error("Wrong number of arguments:"), Insect_Format.nl, Insect_Format.nl, Insect_Format.text("    The function '"), Insect_Format["function"](v.value0), Insect_Format.text("'"), Insect_Format.text(" takes "), Insect_Format.val(Data_Show.show(Data_Show.showInt)(v.value1)), Insect_Format.text((() => {
			let $49 = v.value1 === 1;

			if ($49) {
				return " argument";
			};

			return " arguments";

		})()), Insect_Format.text(" (got "), Insect_Format.val(Data_Show.show(Data_Show.showInt)(v.value2)), Insect_Format.text(")")];
	}

	if (v instanceof Insect_Language.LookupError) {
		return [Insect_Format.optional(Insect_Format.text("  ")), Insect_Format.error("Unknown identifier: "), Insect_Format.ident(v.value0)];
	}

	if (v instanceof Insect_Language.NumericalError) {
		return [Insect_Format.optional(Insect_Format.text("  ")), Insect_Format.error("Numerical error: "), Insect_Format.text("division by zero or out-of-bounds error")];
	}

	if (v instanceof Insect_Language.RedefinedConstantError) {
		return [Insect_Format.optional(Insect_Format.text("  ")), Insect_Format.error("Assignment error: "), Insect_Format.text("'"), Insect_Format.emph(v.value0), Insect_Format.text("' cannot be redefined.")];
	}

	if (v instanceof Insect_Language.InvalidIdentifier) {
		return [Insect_Format.optional(Insect_Format.text("  ")), Insect_Format.error("Invalid identifier: "), Insect_Format.text("second argument of '"), Insect_Format["function"](v.value0), Insect_Format.text("' must be a variable name.")];
	}

	throw new Error("Failed pattern match at Insect.Interpreter (line 193, column 1 - line 193, column 38): " + [v.constructor.name]);
}

function errorWithInput(prefix) {
	return (expr) => {
		return (env) => {
			return (err) => {
				return {
					msg: Message.create($$Error.value)(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.map(data.functorArray)(Insect_Format.optional)(Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Array.cons(Insect_Format.text("  "))(prefix))(Insect_PrettyPrint.pretty(expr))))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.map(data.functorArray)(Insect_Format.optional)([Insect_Format.nl, Insect_Format.nl]))(evalErrorMessage(err)))),
					newEnv: env
				};
			};
		};
	};
}

function checkFinite(q) {
	if (Data_Quantity["isFinite"](q)) {
		return control.pure(Data_Either.applicativeEither)(q);
	}

	if (true) {
		return new Data_Either.Left(Insect_Language.NumericalError.value);
	}

	throw new Error("Failed pattern match at Insect.Interpreter (line 48, column 1 - line 48, column 41): " + [q.constructor.name]);
}

function evalSpecial(func) {
	return (v) => {
		return function (v1) {
			return function (v2) {
				return function (v3) {
					return function (v4) {
						if (v2 instanceof Insect_Language.Variable) {
							let qMultiply = function (q1$prime) {
								return function (q2$prime) {
									return control.bind(Data_Either.bindEither)(q1$prime)(function (q1) {
										return control.bind(Data_Either.bindEither)(q2$prime)(function (q2) {
											return control.pure(Data_Either.applicativeEither)(Data_Quantity.qMultiply(q1)(q2));
										});
									});
								};
							};
							let qAdd = function (q1$prime) {
								return function (q2$prime) {
									return control.bind(Data_Either.bindEither)(q1$prime)(function (q1) {
										return control.bind(Data_Either.bindEither)(q2$prime)(function (q2) {
											return Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create)(Data_Quantity.qAdd(q1)(q2));
										});
									});
								};
							};
							return control.bind(Data_Either.bindEither)($$eval(v)(v3))(function (lowQuantity) {
								return control.bind(Data_Either.bindEither)($$eval(v)(v4))(function (highQuantity) {
									return control.bind(Data_Either.bindEither)(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create)(data.map(Data_Either.functorEither)(round)(Data_Quantity.toScalar(lowQuantity))))(function (low) {
										return control.bind(Data_Either.bindEither)(Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create)(data.map(Data_Either.functorEither)(round)(Data_Quantity.toScalar(highQuantity))))(function (high) {
											let iteration = function (n) {
												return $$eval({
													values: Data_Map_Internal.insert(Data_Ord.ordString)(v2.value0)(new Insect_Environment.StoredValue(Insect_Environment.UserDefined.value, Data_Quantity.scalar(toNumber(n))))(v.values),
													functions: v.functions
												})(v1);
											};
											let qs = (() => {
												let $63 = low > high;
												if ($63) {
													return Data_List_Types.Nil.value;
												};
												return data.map(Data_List_Types.functorList)(iteration)(Data_List.range(low)(high));
											})();
											let $64 = func === "sum";
											if ($64) {
												if (qs instanceof Data_List_Types.Cons) {
													return Data_NonEmpty.foldl1(Data_List_Types.foldableList)(qAdd)(new Data_NonEmpty.NonEmpty(qs.value0, qs.value1));
												};
												if (qs instanceof Data_List_Types.Nil) {
													return control.pure(Data_Either.applicativeEither)(Data_Quantity.scalar(0.0));
												};
												throw new Error("Failed pattern match at Insect.Interpreter (line 83, column 7 - line 85, column 42): " + [qs.constructor.name]);
											};
											return Data_Foldable.foldl(Data_List_Types.foldableList)(qMultiply)(new Data_Either.Right(Data_Quantity.scalar(1.0)))(qs);
										});
									});
								});
							});
						};
						return new Data_Either.Left(new Insect_Language.InvalidIdentifier(func));
					};
				};
			};
		};
	};
}

function $$eval(env) {
	return function (v) {
		if (v instanceof Insect_Language.Scalar) {
			return control.pure(Data_Either.applicativeEither)(Data_Quantity["scalar'"](v.value0));
		};
		if (v instanceof Insect_Language.Unit) {
			return control.pure(Data_Either.applicativeEither)(Data_Quantity.quantity(1.0)(v.value0));
		};
		if (v instanceof Insect_Language.Variable) {
			let v1 = Data_Map_Internal.lookup(Data_Ord.ordString)(v.value0)(env.values);
			if (v1 instanceof Data_Maybe.Just) {
				return control.pure(Data_Either.applicativeEither)(v1.value0.value1);
			};
			if (v1 instanceof Data_Maybe.Nothing) {
				return new Data_Either.Left(new Insect_Language.LookupError(v.value0));
			};
			throw new Error("Failed pattern match at Insect.Interpreter (line 105, column 35 - line 107, column 70): " + [v1.constructor.name]);
		};
		if (v instanceof Insect_Language.Factorial) {
			return control.bind(Data_Either.bindEither)($$eval(env)(v.value0))((() => {
				let $140 = Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create);
				return function ($141) {
					return $140(Data_Quantity_Math.factorial($141));
				};
			})());
		};
		if (v instanceof Insect_Language.Negate) {
			return data.map(Data_Either.functorEither)(Data_Quantity.qNegate)($$eval(env)(v.value0));
		};
		if (v instanceof Insect_Language.Apply) {
			let $80 = v.value0 === "sum" || v.value0 === "product";
			if ($80) {
				if (v.value1.value1 instanceof Data_List_Types.Cons && (v.value1.value1.value1 instanceof Data_List_Types.Cons && (v.value1.value1.value1.value1 instanceof Data_List_Types.Cons && v.value1.value1.value1.value1.value1 instanceof Data_List_Types.Nil))) {
					return evalSpecial(v.value0)(env)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0);
				};
				return new Data_Either.Left(new Insect_Language.WrongArityError(v.value0, 4, Data_List_NonEmpty.length(v.value1)));
			};
			let v1 = Data_Map_Internal.lookup(Data_Ord.ordString)(v.value0)(env.functions);
			if (v1 instanceof Data_Maybe.Just) {
				return control.bind(Data_Either.bindEither)(control.bind(Data_Either.bindEither)(Data_Traversable.traverse(Data_NonEmpty.traversableNonEmpty(Data_List_Types.traversableList))(Data_Either.applicativeEither)($$eval(env))(v.value1))(v1.value0.value1))(checkFinite);
			};
			if (v1 instanceof Data_Maybe.Nothing) {
				return new Data_Either.Left(new Insect_Language.LookupError(v.value0));
			};
			throw new Error("Failed pattern match at Insect.Interpreter (line 119, column 7 - line 122, column 42): " + [v1.constructor.name]);
		};
		if (v instanceof Insect_Language.BinOp) {
			let wrap = Data_Bifunctor.lmap(Data_Either.bifunctorEither)(Insect_Language.QConversionError.create);
			let toScalar = function (q) {
				return wrap(Data_Quantity["toScalar'"](q));
			};
			let qSubtract = function (q1) {
				return function (q2) {
					return wrap(Data_Quantity.qSubtract(q1)(q2));
				};
			};
			let qAdd = function (q1) {
				return function (q2) {
					return wrap(Data_Quantity.qAdd(q1)(q2));
				};
			};
			let modulo = function (q1) {
				return function (q2) {
					return wrap(Data_Quantity_Math.modulo(q1)(q2));
				};
			};
			let convertTo = function (source) {
				return function (target) {
					return wrap(Data_Quantity.convertTo(source)(Data_Quantity.derivedUnit(target)));
				};
			};
			let run = function (v1) {
				return function (a) {
					return function (b) {
						if (v1 instanceof Insect_Language.Sub) {
							return qSubtract(a)(b);
						};
						if (v1 instanceof Insect_Language.Add) {
							return qAdd(a)(b);
						};
						if (v1 instanceof Insect_Language.Mul) {
							return control.pure(Data_Either.applicativeEither)(Data_Quantity.qMultiply(a)(b));
						};
						if (v1 instanceof Insect_Language.Div) {
							return control.pure(Data_Either.applicativeEither)(Data_Quantity.qDivide(a)(b));
						};
						if (v1 instanceof Insect_Language.Pow) {
							return data.map(Data_Either.functorEither)(Data_Quantity.pow(a))(toScalar(b));
						};
						if (v1 instanceof Insect_Language.Mod) {
							return modulo(a)(b);
						};
						if (v1 instanceof Insect_Language.ConvertTo) {
							return convertTo(a)(b);
						};
						throw new Error("Failed pattern match at Insect.Interpreter (line 128, column 5 - line 128, column 60): " + [v1.constructor.name, a.constructor.name, b.constructor.name]);
					};
				};
			};
			return control.bind(Data_Either.bindEither)($$eval(env)(v.value1))(function (x$prime) {
				return control.bind(Data_Either.bindEither)($$eval(env)(v.value2))(function (y$prime) {
					return control.bind(Data_Either.bindEither)(run(v.value0)(x$prime)(y$prime))(checkFinite);
				});
			});
		};
		throw new Error("Failed pattern match at Insect.Interpreter (line 102, column 1 - line 102, column 50): " + [env.constructor.name, v.constructor.name]);
	};
}

function evalAndSimplify(env) {
	return function (v) {
		if (v instanceof Insect_Language.BinOp && v.value0 instanceof Insect_Language.ConvertTo) {
			return $$eval(env)(v);
		};
		return data.map(Data_Either.functorEither)(Data_Quantity.fullSimplify)($$eval(env)(v));
	};
}

function runInsect(env) {
	return (v) => {
		if (v instanceof Insect_Language.Expression) {
			let v1 = evalAndSimplify(env)(v.value0);

			if (v1 instanceof Data_Either.Left) {
				return errorWithInput([])(v.value0)(env)(v1.value0);
			}

			if (v1 instanceof Data_Either.Right) {
				return {
					msg: Message.create(Value.value)(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.map(data.functorArray)(Insect_Format.optional)(Data_Array.cons(Insect_Format.text("  "))(Insect_PrettyPrint.pretty(v.value0))))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.map(data.functorArray)(Insect_Format.optional)([Insect_Format.nl, Insect_Format.nl, Insect_Format.text("   = ")]))(Insect_PrettyPrint.prettyQuantity(v1.value0)))),
					newEnv: {
						values: Data_Map_Internal.insert(Data_Ord.ordString)("ans")(new Insect_Environment.StoredValue(Insect_Environment.UserDefined.value, v1.value0))(env.values),
						functions: env.functions
					}
				};
			}

			throw new Error("Failed pattern match at Insect.Interpreter (line 252, column 3 - line 259, column 8): " + [v1.constructor.name]);
		}

		if (v instanceof Insect_Language.VariableAssignment) {
			let v1 = evalAndSimplify(env)(v.value1);

			if (v1 instanceof Data_Either.Left) {
				return errorWithInput([Insect_Format.ident(v.value0), Insect_Format.text(" = ")])(v.value1)(env)(v1.value0);
			}

			if (v1 instanceof Data_Either.Right) {
				let $115 = isConstant(env)(v.value0);
				if ($115) {
					return errorWithInput([Insect_Format.ident(v.value0), Insect_Format.text(" = ")])(v.value1)(env)(new Insect_Language.RedefinedConstantError(v.value0));
				};
				return {
					msg: Message.create(ValueSet.value)(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.map(data.functorArray)(Insect_Format.optional)([Insect_Format.text("  "), Insect_Format.ident(v.value0), Insect_Format.text(" = ")]))(Insect_PrettyPrint.prettyQuantity(v1.value0))),
					newEnv: {
						values: Data_Map_Internal.insert(Data_Ord.ordString)(v.value0)(new Insect_Environment.StoredValue(Insect_Environment.UserDefined.value, v1.value0))(env.values),
						functions: Data_Map_Internal["delete"](Data_Ord.ordString)(v.value0)(env.functions)
					}
				};
			}

			throw new Error("Failed pattern match at Insect.Interpreter (line 262, column 3 - line 274, column 12): " + [v1.constructor.name]);
		}

		if (v instanceof Insect_Language.FunctionAssignment) {
			let fArgs = Data_Foldable.intercalate(Data_NonEmpty.foldableNonEmpty(Data_List_Types.foldableList))(Data_Monoid.monoidArray)([Insect_Format.text(", ")])(data.map(Data_NonEmpty.functorNonEmpty(Data_List_Types.functorList))(function (a) {
				return [Insect_Format.ident(a)];
			})(v.value1));

			let fAssign = Data_Semigroup.append(Data_Semigroup.semigroupArray)([Insect_Format["function"](v.value0), Insect_Format.text("(")])(Data_Semigroup.append(Data_Semigroup.semigroupArray)(fArgs)([Insect_Format.text(") = ")]));

			let numExpected = Data_List_NonEmpty.length(v.value1);

			function userFunc(argValues) {
				function insertArg(map) {
					return function (v1) {
						return Data_Map_Internal.insert(Data_Ord.ordString)(v1.value0)(new Insect_Environment.StoredValue(Insect_Environment.UserDefined.value, v1.value1))(map);
					};
				}

				let args = Data_List_NonEmpty.zip(v.value1)(argValues);
				let functionEnv = {
					values: Data_Foldable.foldl(Data_List_Types.foldableNonEmptyList)(insertArg)(env.values)(args),
					functions: Data_Map_Internal["delete"](Data_Ord.ordString)(v.value0)(env.functions)
				};

				let numGiven = Data_List_NonEmpty.length(argValues);
				let $123 = numGiven === numExpected;

				if ($123) {
					return evalAndSimplify(functionEnv)(v.value2);
				}

				return new Data_Either.Left(new Insect_Language.WrongArityError(v.value0, numExpected, numGiven));
			}

			let $124 = isConstant(env)(v.value0);

			if ($124) {
				return errorWithInput(fAssign)(v.value2)(env)(new Insect_Language.RedefinedConstantError(v.value0));
			}

			return {
				msg: Message.create(ValueSet.value)(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.map(data.functorArray)(Insect_Format.optional)(Data_Array.cons(Insect_Format.text("  "))(fAssign)))(Insect_PrettyPrint.pretty(v.value2))),
				newEnv: {
					values: Data_Map_Internal["delete"](Data_Ord.ordString)(v.value0)(env.values),
					functions: Data_Map_Internal.insert(Data_Ord.ordString)(v.value0)(new Insect_Environment.StoredFunction(Insect_Environment.UserDefined.value, userFunc))(env.functions)
				}
			};
		}

		if (v instanceof Insect_Language.Command && v.value0 instanceof Insect_Language.Help) {
			return {
				msg: new Message(Info.value, [Insect_Format.emph("insect"), Insect_Format.text(" evaluates mathematical expressions that can"), Insect_Format.nl, Insect_Format.text("involve physical quantities. You can start by trying"), Insect_Format.nl, Insect_Format.text("one of these examples:"), Insect_Format.nl, Insect_Format.text(""), Insect_Format.nl, Insect_Format.emph("  > "), Insect_Format.val("1920"), Insect_Format.text(" / "), Insect_Format.val("16"), Insect_Format.text(" * "), Insect_Format.val("9"), Insect_Format.text("         "), Insect_Format.emph("  > "), Insect_Format["function"]("sin"), Insect_Format.text("("), Insect_Format.val("30"), Insect_Format.text(" "), Insect_Format.unit("deg"), Insect_Format.text(")"), Insect_Format.nl, Insect_Format.text(""), Insect_Format.nl, Insect_Format.emph("  > "), Insect_Format.val("2"), Insect_Format.text(" "), Insect_Format.unit("min"), Insect_Format.text(" + "), Insect_Format.val("30"), Insect_Format.text(" "), Insect_Format.unit("s"), Insect_Format.text("          "), Insect_Format.emph("  > "), Insect_Format.val("6"), Insect_Format.text(" "), Insect_Format.unit("Mbit/s"), Insect_Format.text(" * "), Insect_Format.val("1.5"), Insect_Format.text(" "), Insect_Format.unit("h"), Insect_Format.text(" -> "), Insect_Format.unit("GB"), Insect_Format.nl, Insect_Format.text(""), Insect_Format.nl, Insect_Format.emph("  > "), Insect_Format.text("list"), Insect_Format.text("                  "), Insect_Format.emph("  > "), Insect_Format.ident("r"), Insect_Format.text(" = "), Insect_Format.val("80"), Insect_Format.text(" "), Insect_Format.unit("cm"), Insect_Format.nl, Insect_Format.emph("  > "), Insect_Format.val("40000"), Insect_Format.text(" "), Insect_Format.unit("km"), Insect_Format.text(" / "), Insect_Format.ident("c"), Insect_Format.text(" -> "), Insect_Format.unit("ms"), Insect_Format.text("    "), Insect_Format.emph("  > "), Insect_Format.ident("pi"), Insect_Format.text(" * "), Insect_Format.ident("r"), Insect_Format.text("^"), Insect_Format.val("2"), Insect_Format.text(" -> "), Insect_Format.unit("m"), Insect_Format.text("^"), Insect_Format.val("2"), Insect_Format.nl, Insect_Format.text(""), Insect_Format.nl, Insect_Format.text("Full documentation: https://github.com/sharkdp/insect")]),
				newEnv: env
			};
		}

		if (v instanceof Insect_Language.Command && v.value0 instanceof Insect_Language.List) {
			let storedValue = function (v1) {
				return v1.value1;
			};

			function toLine(kvPairs) {
				let val = storedValue(Data_Tuple.snd(Data_List_NonEmpty.head(kvPairs)));
				let identifiers = Data_Array.fromFoldable(Data_Foldable.foldableArray)(Data_Foldable.intercalate(Data_List_Types.foldableNonEmptyList)(Data_Monoid.monoidArray)([Insect_Format.text(" = ")])(data.map(Data_List_Types.functorNonEmptyList)(function ($142) {
					return Data_Array.singleton(Insect_Format.ident(Data_Tuple.fst($142)));
				})(kvPairs)));
				return Data_Semigroup.append(Data_Semigroup.semigroupArray)([Insect_Format.nl, Insect_Format.text("  ")])(Data_Semigroup.append(Data_Semigroup.semigroupArray)(identifiers)(Data_Semigroup.append(Data_Semigroup.semigroupArray)([Insect_Format.text(" = ")])(Insect_PrettyPrint.prettyQuantity(val))));
			}

			function storageType(v1) {
				return v1.value0;
			}

			let visibleValues = Data_List.filter(function (e) {
				return notEq(Insect_Environment.eqStorageType)(storageType(Data_Tuple.snd(e)))(Insect_Environment.HiddenConstant.value);
			})(Data_Map_Internal.toUnfoldable(Data_List_Types.unfoldableList)(env.values));

			let envTuples = Data_List.sortBy(Data_Ord.comparing(Data_Ord.ordString)(function ($143) {
				return (function (v1) {
					return v1.number;
				})(Data_Quantity["prettyPrint'"](storedValue(Data_Tuple.snd($143))));
			}))(visibleValues);

			let envGrouped = Data_List.groupBy(function (x) {
				return function (y) {
					return eq(Data_Quantity.eqQuantity)(storedValue(Data_Tuple.snd(x)))(storedValue(Data_Tuple.snd(y)));
				};
			})(envTuples);

			let envSorted = Data_List.sortBy(Data_Ord.comparing(Data_Ord.ordString)(function ($144) {
				return Data_String_Common.toLower(Data_Tuple.fst(Data_List_NonEmpty.head($144)));
			}))(envGrouped);
			let list = Data_Semigroup.append(Data_Semigroup.semigroupArray)([Insect_Format.text("List of variables:"), Insect_Format.nl])(Data_Foldable.foldMap(Data_List_Types.foldableList)(Data_Monoid.monoidArray)(toLine)(envSorted));

			return {
				msg: new Message(Info.value, list),
				newEnv: env
			};
		}

		if (v instanceof Insect_Language.Command && v.value0 instanceof Insect_Language.Reset) {
			return {
				msg: new Message(Info.value, [Insect_Format.text("Environment has been reset.")]),
				newEnv: Insect_Environment.initialEnvironment
			};
		}

		if (v instanceof Insect_Language.Command && v.value0 instanceof Insect_Language.Quit) {
			return {
				msg: MQuit.value,
				newEnv: Insect_Environment.initialEnvironment
			};
		}

		if (v instanceof Insect_Language.Command && v.value0 instanceof Insect_Language.Clear) {
			return {
				msg: MClear.value,
				newEnv: env
			};
		}

		throw new Error("Failed pattern match at Insect.Interpreter (line 250, column 1 - line 250, column 47): " + [env.constructor.name, v.constructor.name]);
	};
}

module.exports = {
	Value: Value,
	ValueSet: ValueSet,
	Info: Info,
	"Error": $$Error,
	Message: Message,
	MQuit: MQuit,
	MClear: MClear,
	runInsect: runInsect
};
