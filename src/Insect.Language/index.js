let Data_Decimal = require("../Data.Decimal/index.js");
let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");
let Data_Generic_Rep_Show = require("../Data.Generic.Rep.Show/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Units = require("../Data.Units/index.js");


function refEq(r1) {
	return function (r2) {
		return r1 === r2;
	};
}

let eqStringImpl = refEq;


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}



let eqString = new Eq(eqStringImpl);


function eq(dict) {
	return dict.eq;
}

class IsSymbol {
	constructor(reflectSymbol) {
		this.reflectSymbol = reflectSymbol;
	}
}

let QConversionError = (() => {
	function QConversionError(value0) {
		this.value0 = value0;
	};
	QConversionError.create = function (value0) {
		return new QConversionError(value0);
	};
	return QConversionError;
})();

let WrongArityError = (() => {
	function WrongArityError(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	WrongArityError.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new WrongArityError(value0, value1, value2);
			};
		};
	};
	return WrongArityError;
})();

let LookupError = (() => {
	function LookupError(value0) {
		this.value0 = value0;
	};
	LookupError.create = function (value0) {
		return new LookupError(value0);
	};
	return LookupError;
})();
let NumericalError = (() => {
	function NumericalError() {

	};
	NumericalError.value = new NumericalError();
	return NumericalError;
})();
let RedefinedConstantError = (() => {
	function RedefinedConstantError(value0) {
		this.value0 = value0;
	};
	RedefinedConstantError.create = function (value0) {
		return new RedefinedConstantError(value0);
	};
	return RedefinedConstantError;
})();
let InvalidIdentifier = (() => {
	function InvalidIdentifier(value0) {
		this.value0 = value0;
	};
	InvalidIdentifier.create = function (value0) {
		return new InvalidIdentifier(value0);
	};
	return InvalidIdentifier;
})();
let Help = (() => {
	function Help() {

	};
	Help.value = new Help();
	return Help;
})();
let Reset = (() => {
	function Reset() {

	};
	Reset.value = new Reset();
	return Reset;
})();
let List = (() => {
	function List() {

	};
	List.value = new List();
	return List;
})();
let Clear = (() => {
	function Clear() {

	};
	Clear.value = new Clear();
	return Clear;
})();
let Quit = (() => {
	function Quit() {

	};
	Quit.value = new Quit();
	return Quit;
})();
let Add = (() => {
	function Add() {

	};
	Add.value = new Add();
	return Add;
})();
let Sub = (() => {
	function Sub() {

	};
	Sub.value = new Sub();
	return Sub;
})();
let Mul = (() => {
	function Mul() {

	};
	Mul.value = new Mul();
	return Mul;
})();
let Div = (() => {
	function Div() {

	};
	Div.value = new Div();
	return Div;
})();
let Pow = (() => {
	function Pow() {

	};
	Pow.value = new Pow();
	return Pow;
})();
let Mod = (() => {
	function Mod() {

	};
	Mod.value = new Mod();
	return Mod;
})();
let ConvertTo = (() => {
	function ConvertTo() {

	};
	ConvertTo.value = new ConvertTo();
	return ConvertTo;
})();
let Scalar = (() => {
	function Scalar(value0) {
		this.value0 = value0;
	};
	Scalar.create = function (value0) {
		return new Scalar(value0);
	};
	return Scalar;
})();
let Unit = (() => {
	function Unit(value0) {
		this.value0 = value0;
	};
	Unit.create = function (value0) {
		return new Unit(value0);
	};
	return Unit;
})();
let Variable = (() => {
	function Variable(value0) {
		this.value0 = value0;
	};
	Variable.create = function (value0) {
		return new Variable(value0);
	};
	return Variable;
})();
let Factorial = (() => {
	function Factorial(value0) {
		this.value0 = value0;
	};
	Factorial.create = function (value0) {
		return new Factorial(value0);
	};
	return Factorial;
})();
let Negate = (() => {
	function Negate(value0) {
		this.value0 = value0;
	};
	Negate.create = function (value0) {
		return new Negate(value0);
	};
	return Negate;
})();
let Apply = (() => {
	function Apply(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Apply.create = function (value0) {
		return function (value1) {
			return new Apply(value0, value1);
		};
	};
	return Apply;
})();
let BinOp = (() => {
	function BinOp(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	BinOp.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new BinOp(value0, value1, value2);
			};
		};
	};
	return BinOp;
})();
let Expression = (() => {
	function Expression(value0) {
		this.value0 = value0;
	};
	Expression.create = function (value0) {
		return new Expression(value0);
	};
	return Expression;
})();
let VariableAssignment = (() => {
	function VariableAssignment(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	VariableAssignment.create = function (value0) {
		return function (value1) {
			return new VariableAssignment(value0, value1);
		};
	};
	return VariableAssignment;
})();
let FunctionAssignment = (() => {
	function FunctionAssignment(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	FunctionAssignment.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new FunctionAssignment(value0, value1, value2);
			};
		};
	};
	return FunctionAssignment;
})();
let Command = (() => {
	function Command(value0) {
		this.value0 = value0;
	};
	Command.create = function (value0) {
		return new Command(value0);
	};
	return Command;
})();
let genericCommand = new Data_Generic_Rep.Generic(function (x) {
	if (x instanceof Help) {
		return new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value);
	};
	if (x instanceof Reset) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value));
	};
	if (x instanceof List) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value)));
	};
	if (x instanceof Clear) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value))));
	};
	if (x instanceof Quit) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(Data_Generic_Rep.NoArguments.value))));
	};
	throw new Error("Failed pattern match at Insect.Language (line 77, column 1 - line 77, column 51): " + [x.constructor.name]);
}, function (x) {
	if (x instanceof Data_Generic_Rep.Inl) {
		return Help.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && x.value0 instanceof Data_Generic_Rep.Inl) {
		return Reset.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0 instanceof Data_Generic_Rep.Inl)) {
		return List.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0.value0 instanceof Data_Generic_Rep.Inl))) {
		return Clear.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0.value0 instanceof Data_Generic_Rep.Inr))) {
		return Quit.value;
	};
	throw new Error("Failed pattern match at Insect.Language (line 77, column 1 - line 77, column 51): " + [x.constructor.name]);
});
let showCommand = new Data_Show.Show(Data_Generic_Rep_Show.genericShow(genericCommand)(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Help";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Reset";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "List";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Clear";
})))(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Quit";
}))))))));
let genericBinOp = new Data_Generic_Rep.Generic(function (x) {
	if (x instanceof Add) {
		return new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value);
	};
	if (x instanceof Sub) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value));
	};
	if (x instanceof Mul) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value)));
	};
	if (x instanceof Div) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value))));
	};
	if (x instanceof Pow) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value)))));
	};
	if (x instanceof Mod) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inl(Data_Generic_Rep.NoArguments.value))))));
	};
	if (x instanceof ConvertTo) {
		return new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(new Data_Generic_Rep.Inr(Data_Generic_Rep.NoArguments.value))))));
	};
	throw new Error("Failed pattern match at Insect.Language (line 36, column 1 - line 36, column 47): " + [x.constructor.name]);
}, function (x) {
	if (x instanceof Data_Generic_Rep.Inl) {
		return Add.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && x.value0 instanceof Data_Generic_Rep.Inl) {
		return Sub.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0 instanceof Data_Generic_Rep.Inl)) {
		return Mul.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0.value0 instanceof Data_Generic_Rep.Inl))) {
		return Div.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0.value0.value0 instanceof Data_Generic_Rep.Inl)))) {
		return Pow.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0.value0.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0.value0.value0.value0 instanceof Data_Generic_Rep.Inl))))) {
		return Mod.value;
	};
	if (x instanceof Data_Generic_Rep.Inr && (x.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0.value0 instanceof Data_Generic_Rep.Inr && (x.value0.value0.value0.value0 instanceof Data_Generic_Rep.Inr && x.value0.value0.value0.value0.value0 instanceof Data_Generic_Rep.Inr))))) {
		return ConvertTo.value;
	};
	throw new Error("Failed pattern match at Insect.Language (line 36, column 1 - line 36, column 47): " + [x.constructor.name]);
});
let showBinOp = new Data_Show.Show(Data_Generic_Rep_Show.genericShow(genericBinOp)(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Add";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Sub";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Mul";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Div";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Pow";
})))(Data_Generic_Rep_Show.genericShowSum(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "Mod";
})))(Data_Generic_Rep_Show.genericShowConstructor(Data_Generic_Rep_Show.genericShowArgsNoArguments)(new IsSymbol(() => {
	return "ConvertTo";
}))))))))));
let showExpression = new Data_Show.Show(function (v) {
	if (v instanceof Scalar) {
		return "(Scalar " + (Data_Show.show(Data_Decimal.showDecimal)(v.value0) + ")");
	};
	if (v instanceof Unit) {
		return "(Unit " + (Data_Show.show(Data_Units.showDerivedUnit)(v.value0) + ")");
	};
	if (v instanceof Variable) {
		return "(Variable " + (Data_Show.show(Data_Show.showString)(v.value0) + ")");
	};
	if (v instanceof Factorial) {
		return "(Factorial " + (Data_Show.show(showExpression)(v.value0) + ")");
	};
	if (v instanceof Negate) {
		return "(Negate " + (Data_Show.show(showExpression)(v.value0) + ")");
	};
	if (v instanceof Apply) {
		return "(Apply " + (Data_Show.show(Data_Show.showString)(v.value0) + (" " + (Data_Show.show(Data_NonEmpty.showNonEmpty(showExpression)(Data_List_Types.showList(showExpression)))(v.value1) + ")")));
	};
	if (v instanceof BinOp) {
		return "(BinOp " + (Data_Show.show(showBinOp)(v.value0) + (" " + (Data_Show.show(showExpression)(v.value1) + (" " + (Data_Show.show(showExpression)(v.value2) + ")")))));
	};
	throw new Error("Failed pattern match at Insect.Language (line 59, column 1 - line 66, column 91): " + [v.constructor.name]);
});
let showStatement = new Data_Show.Show(function (v) {
	if (v instanceof Expression) {
		return "(Expression " + (Data_Show.show(showExpression)(v.value0) + ")");
	};
	if (v instanceof VariableAssignment) {
		return "(VariableAssignment " + (Data_Show.show(Data_Show.showString)(v.value0) + (" " + (Data_Show.show(showExpression)(v.value1) + ")")));
	};
	if (v instanceof FunctionAssignment) {
		return "(FunctionAssignment " + (Data_Show.show(Data_Show.showString)(v.value0) + (" " + (Data_Show.show(Data_NonEmpty.showNonEmpty(Data_Show.showString)(Data_List_Types.showList(Data_Show.showString)))(v.value1) + (" " + (Data_Show.show(showExpression)(v.value2) + ")")))));
	};
	if (v instanceof Command) {
		return "(Command " + (Data_Show.show(showCommand)(v.value0) + ")");
	};
	throw new Error("Failed pattern match at Insect.Language (line 88, column 1 - line 92, column 66): " + [v.constructor.name]);
});
let eqCommand = new Eq(function (x) {
	return function (y) {
		if (x instanceof Help && y instanceof Help) {
			return true;
		};
		if (x instanceof Reset && y instanceof Reset) {
			return true;
		};
		if (x instanceof List && y instanceof List) {
			return true;
		};
		if (x instanceof Clear && y instanceof Clear) {
			return true;
		};
		if (x instanceof Quit && y instanceof Quit) {
			return true;
		};
		return false;
	};
});
let eqBinOp = new Eq(function (x) {
	return function (y) {
		if (x instanceof Add && y instanceof Add) {
			return true;
		};
		if (x instanceof Sub && y instanceof Sub) {
			return true;
		};
		if (x instanceof Mul && y instanceof Mul) {
			return true;
		};
		if (x instanceof Div && y instanceof Div) {
			return true;
		};
		if (x instanceof Pow && y instanceof Pow) {
			return true;
		};
		if (x instanceof Mod && y instanceof Mod) {
			return true;
		};
		if (x instanceof ConvertTo && y instanceof ConvertTo) {
			return true;
		};
		return false;
	};
});
let eqExpression = new Eq(function (x) {
	return function (y) {
		if (x instanceof Scalar && y instanceof Scalar) {
			return eq(Data_Decimal.eqDecimal)(x.value0)(y.value0);
		};
		if (x instanceof Unit && y instanceof Unit) {
			return eq(Data_Units.eqDerivedUnit)(x.value0)(y.value0);
		};
		if (x instanceof Variable && y instanceof Variable) {
			return x.value0 === y.value0;
		};
		if (x instanceof Factorial && y instanceof Factorial) {
			return eq(eqExpression)(x.value0)(y.value0);
		};
		if (x instanceof Negate && y instanceof Negate) {
			return eq(eqExpression)(x.value0)(y.value0);
		};
		if (x instanceof Apply && y instanceof Apply) {
			return x.value0 === y.value0 && eq(Data_NonEmpty.eqNonEmpty(Data_List_Types.eq1List)(eqExpression))(x.value1)(y.value1);
		};
		if (x instanceof BinOp && y instanceof BinOp) {
			return eq(eqBinOp)(x.value0)(y.value0) && eq(eqExpression)(x.value1)(y.value1) && eq(eqExpression)(x.value2)(y.value2);
		};
		return false;
	};
});
let eqStatement = new Eq(function (x) {
	return function (y) {
		if (x instanceof Expression && y instanceof Expression) {
			return eq(eqExpression)(x.value0)(y.value0);
		};
		if (x instanceof VariableAssignment && y instanceof VariableAssignment) {
			return x.value0 === y.value0 && eq(eqExpression)(x.value1)(y.value1);
		};
		if (x instanceof FunctionAssignment && y instanceof FunctionAssignment) {
			return x.value0 === y.value0 && eq(Data_NonEmpty.eqNonEmpty(Data_List_Types.eq1List)(eqString))(x.value1)(y.value1) && eq(eqExpression)(x.value2)(y.value2);
		};
		if (x instanceof Command && y instanceof Command) {
			return eq(eqCommand)(x.value0)(y.value0);
		};
		return false;
	};
});
module.exports = {
	QConversionError: QConversionError,
	WrongArityError: WrongArityError,
	LookupError: LookupError,
	NumericalError: NumericalError,
	RedefinedConstantError: RedefinedConstantError,
	InvalidIdentifier: InvalidIdentifier,
	Add: Add,
	Sub: Sub,
	Mul: Mul,
	Div: Div,
	Pow: Pow,
	Mod: Mod,
	ConvertTo: ConvertTo,
	Scalar: Scalar,
	Unit: Unit,
	Variable: Variable,
	Factorial: Factorial,
	Negate: Negate,
	Apply: Apply,
	BinOp: BinOp,
	Help: Help,
	Reset: Reset,
	List: List,
	Clear: Clear,
	Quit: Quit,
	Expression: Expression,
	VariableAssignment: VariableAssignment,
	FunctionAssignment: FunctionAssignment,
	Command: Command,
	eqBinOp: eqBinOp,
	genericBinOp: genericBinOp,
	showBinOp: showBinOp,
	eqExpression: eqExpression,
	showExpression: showExpression,
	eqCommand: eqCommand,
	genericCommand: genericCommand,
	showCommand: showCommand,
	eqStatement: eqStatement,
	showStatement: showStatement
};
