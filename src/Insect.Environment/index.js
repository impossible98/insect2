let control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Quantity = require("../Data.Quantity/index.js");
let Data_Quantity_Math = require("../Data.Quantity.Math/index.js");
let Data_Quantity_Physics = require("../Data.Quantity.Physics/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Insect_Functions = require("../Insect.Functions/index.js");
let Insect_Language = require("../Insect.Language/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let Constant = (() => {
    function Constant() {

    };
    Constant.value = new Constant();
    return Constant;
})();
let HiddenConstant = (() => {
    function HiddenConstant() {

    };
    HiddenConstant.value = new HiddenConstant();
    return HiddenConstant;
})();
let UserDefined = (() => {
    function UserDefined() {

    };
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
        values: Data_Map_Internal.fromFoldable(Data_Ord.ordString)(Data_Foldable.foldableArray)([ constVal("alpha")(Data_Quantity_Physics.α), constVal("avogadroConstant")(Data_Quantity_Physics.avogadroConstant), constVal("bohrMagneton")(Data_Quantity_Physics.µB), constVal("boltzmannConstant")(Data_Quantity_Physics.kB), constVal("c")(Data_Quantity_Physics.speedOfLight), constVal("e")(Data_Quantity_Math.e), constVal("electricConstant")(Data_Quantity_Physics.ε0), constVal("eps0")(Data_Quantity_Physics.ε0), constVal("\u03b50")(Data_Quantity_Physics.ε0), constVal("elementaryCharge")(Data_Quantity_Physics.electronCharge), constVal("electronCharge")(Data_Quantity_Physics.electronCharge), constVal("electronMass")(Data_Quantity_Physics.electronMass), constVal("G")(Data_Quantity_Physics.gravitationalConstant), constVal("g0")(Data_Quantity_Physics.g0), constVal("gravity")(Data_Quantity_Physics.g0), constVal("h_bar")(Data_Quantity_Physics.ℏ), constVal("\u210f")(Data_Quantity_Physics.ℏ), constVal("k_B")(Data_Quantity_Physics.kB), constVal("magneticConstant")(Data_Quantity_Physics.µ0), constVal("mu0")(Data_Quantity_Physics.µ0), constVal("\xb50")(Data_Quantity_Physics.µ0), constVal("muB")(Data_Quantity_Physics.µB), constVal("\xb5_B")(Data_Quantity_Physics.µB), constVal("N_A")(Data_Quantity_Physics.avogadroConstant), constVal("pi")(Data_Quantity_Math.pi), constVal("\u03c0")(Data_Quantity_Math.pi), constVal("planckConstant")(Data_Quantity_Physics.planckConstant), constVal("protonMass")(Data_Quantity_Physics.protonMass), constVal("speedOfLight")(Data_Quantity_Physics.speedOfLight), constVal("R")(Data_Quantity_Physics.idealGasConstant), hiddenVal("hundred")(Data_Quantity.scalar(100.0)), hiddenVal("thousand")(Data_Quantity.scalar(1000.0)), hiddenVal("million")(Data_Quantity.scalar(1000000.0)), hiddenVal("billion")(Data_Quantity.scalar(1.0e9)), hiddenVal("trillion")(Data_Quantity.scalar(1.0e12)), hiddenVal("quadrillion")(Data_Quantity.scalar(1.0e15)), hiddenVal("quintillion")(Data_Quantity.scalar(1.0e18)), hiddenVal("googol")(Data_Quantity.scalar(1.0e100)), hiddenVal("tau")(Data_Quantity_Math.tau), hiddenVal("\u03c4")(Data_Quantity_Math.tau) ]),
        functions: Data_Map_Internal.fromFoldable(Data_Ord.ordString)(Data_Foldable.foldableArray)([ constFunc("abs")((() => {
            let $10 = control.pure(Data_Either.applicativeEither);
            return function ($11) {
                return $10(Data_Quantity.abs($11));
            };
        })()), constFunc("acos")(Data_Quantity_Math.acos), constFunc("acosh")(Data_Quantity_Math.acosh), constFunc("acos")(Data_Quantity_Math.acos), constFunc("acosh")(Data_Quantity_Math.acosh), constFunc("asin")(Data_Quantity_Math.asin), constFunc("asinh")(Data_Quantity_Math.asinh), constFunc("atan")(Data_Quantity_Math.atan), constFunc2("atan2")(Data_Quantity_Math.atan2), constFunc("atanh")(Data_Quantity_Math.atanh), constFunc("ceil")(Data_Quantity_Math.ceil), constFunc("cos")(Data_Quantity_Math.cos), constFunc("cosh")(Data_Quantity_Math.cosh), constFunc("exp")(Data_Quantity_Math.exp), constFunc("floor")(Data_Quantity_Math.floor), constFunc("fromCelsius")(Insect_Functions.fromCelsius), constFunc("fromFahrenheit")(Insect_Functions.fromFahrenheit), constFunc("gamma")(Data_Quantity_Math.gamma), constFunc("ln")(Data_Quantity_Math.ln), constFunc("log")(Data_Quantity_Math.ln), constFunc("log10")(Data_Quantity_Math.log10), constFuncN("minimum")((() => {
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
        })()), constFunc("tan")(Data_Quantity_Math.tan), constFunc("tanh")(Data_Quantity_Math.tanh), constFunc("toCelsius")(Insect_Functions.toCelsius), constFunc("toFahrenheit")(Insect_Functions.toFahrenheit) ])
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
module.exports = {
    Constant: Constant,
    HiddenConstant: HiddenConstant,
    UserDefined: UserDefined,
    StoredValue: StoredValue,
    StoredFunction: StoredFunction,
    initialEnvironment: initialEnvironment,
    eqStorageType: eqStorageType
};
