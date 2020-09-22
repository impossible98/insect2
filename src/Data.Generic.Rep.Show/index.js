let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


let SProxy = (function () {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();

let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};

let GenericShowArgs = function (genericShowArgs) {
    this.genericShowArgs = genericShowArgs;
};
let GenericShow = function (genericShow$prime) {
    this["genericShow'"] = genericShow$prime;
};
let genericShowArgsNoArguments = new GenericShowArgs(function (v) {
    return [  ];
});
let genericShowArgsArgument = function (dictShow) {
    return new GenericShowArgs(function (v) {
        return [ Data_Show.show(dictShow)(v) ];
    });
};
let genericShowArgs = function (dict) {
    return dict.genericShowArgs;
};
let genericShowArgsProduct = function (dictGenericShowArgs) {
    return function (dictGenericShowArgs1) {
        return new GenericShowArgs(function (v) {
            return Data_Semigroup.append(Data_Semigroup.semigroupArray)(genericShowArgs(dictGenericShowArgs)(v.value0))(genericShowArgs(dictGenericShowArgs1)(v.value1));
        });
    };
};
let genericShowConstructor = function (dictGenericShowArgs) {
    return function (dictIsSymbol) {
        return new GenericShow(function (v) {
            let ctor = reflectSymbol(dictIsSymbol)(SProxy.value);
            let v1 = genericShowArgs(dictGenericShowArgs)(v);
            if (v1.length === 0) {
                return ctor;
            };
            return "(" + (Data_Foldable.intercalate(Data_Foldable.foldableArray)(Data_Monoid.monoidString)(" ")(Data_Semigroup.append(Data_Semigroup.semigroupArray)([ ctor ])(v1)) + ")");
        });
    };
};
let genericShow$prime = function (dict) {
    return dict["genericShow'"];
};
let genericShowNoConstructors = new GenericShow(function (a) {
    return genericShow$prime(genericShowNoConstructors)(a);
});
let genericShowSum = function (dictGenericShow) {
    return function (dictGenericShow1) {
        return new GenericShow(function (v) {
            if (v instanceof Data_Generic_Rep.Inl) {
                return genericShow$prime(dictGenericShow)(v.value0);
            };
            if (v instanceof Data_Generic_Rep.Inr) {
                return genericShow$prime(dictGenericShow1)(v.value0);
            };
            throw new Error("Failed pattern match at Data.Generic.Rep.Show (line 26, column 1 - line 28, column 40): " + [ v.constructor.name ]);
        });
    };
};
let genericShow = function (dictGeneric) {
    return function (dictGenericShow) {
        return function (x) {
            return genericShow$prime(dictGenericShow)(Data_Generic_Rep.from(dictGeneric)(x));
        };
    };
};

module.exports = {
    GenericShow: GenericShow,
    "genericShow'": genericShow$prime,
    genericShow: genericShow,
    GenericShowArgs: GenericShowArgs,
    genericShowArgs: genericShowArgs,
    genericShowNoConstructors: genericShowNoConstructors,
    genericShowArgsNoArguments: genericShowArgsNoArguments,
    genericShowSum: genericShowSum,
    genericShowArgsProduct: genericShowArgsProduct,
    genericShowConstructor: genericShowConstructor,
    genericShowArgsArgument: genericShowArgsArgument
};
