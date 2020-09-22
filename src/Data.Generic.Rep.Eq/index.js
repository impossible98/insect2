const data = require("../data");
let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");


let GenericEq = function (genericEq$prime) {
    this["genericEq'"] = genericEq$prime;
};
let genericEqNoConstructors = new GenericEq(function (v) {
    return function (v1) {
        return true;
    };
});
let genericEqNoArguments = new GenericEq(function (v) {
    return function (v1) {
        return true;
    };
});
let genericEqArgument = function (dictEq) {
    return new GenericEq(function (v) {
        return function (v1) {
            return data.eq(dictEq)(v)(v1);
        };
    });
};
let genericEq$prime = function (dict) {
    return dict["genericEq'"];
};
let genericEqConstructor = function (dictGenericEq) {
    return new GenericEq(function (v) {
        return function (v1) {
            return genericEq$prime(dictGenericEq)(v)(v1);
        };
    });
};
let genericEqProduct = function (dictGenericEq) {
    return function (dictGenericEq1) {
        return new GenericEq(function (v) {
            return function (v1) {
                return genericEq$prime(dictGenericEq)(v.value0)(v1.value0) && genericEq$prime(dictGenericEq1)(v.value1)(v1.value1);
            };
        });
    };
};
let genericEqSum = function (dictGenericEq) {
    return function (dictGenericEq1) {
        return new GenericEq(function (v) {
            return function (v1) {
                if (v instanceof Data_Generic_Rep.Inl && v1 instanceof Data_Generic_Rep.Inl) {
                    return genericEq$prime(dictGenericEq)(v.value0)(v1.value0);
                };
                if (v instanceof Data_Generic_Rep.Inr && v1 instanceof Data_Generic_Rep.Inr) {
                    return genericEq$prime(dictGenericEq1)(v.value0)(v1.value0);
                };
                return false;
            };
        });
    };
};
let genericEq = function (dictGeneric) {
    return function (dictGenericEq) {
        return function (x) {
            return function (y) {
                return genericEq$prime(dictGenericEq)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y));
            };
        };
    };
};
module.exports = {
    GenericEq: GenericEq,
    "genericEq'": genericEq$prime,
    genericEq: genericEq,
    genericEqNoConstructors: genericEqNoConstructors,
    genericEqNoArguments: genericEqNoArguments,
    genericEqSum: genericEqSum,
    genericEqProduct: genericEqProduct,
    genericEqConstructor: genericEqConstructor,
    genericEqArgument: genericEqArgument
};
