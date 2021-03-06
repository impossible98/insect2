let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");
const data = require("../data");


let GenericRing = function (genericSub$prime) {
    this["genericSub'"] = genericSub$prime;
};
let genericSub$prime = function (dict) {
    return dict["genericSub'"];
};
let genericSub = function (dictGeneric) {
    return function (dictGenericRing) {
        return function (x) {
            return function (y) {
                return Data_Generic_Rep.to(dictGeneric)(genericSub$prime(dictGenericRing)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y)));
            };
        };
    };
};
let genericRingProduct = function (dictGenericRing) {
    return function (dictGenericRing1) {
        return new GenericRing(function (v) {
            return function (v1) {
                return new Data_Generic_Rep.Product(genericSub$prime(dictGenericRing)(v.value0)(v1.value0), genericSub$prime(dictGenericRing1)(v.value1)(v1.value1));
            };
        });
    };
};
let genericRingNoArguments = new GenericRing(function (v) {
    return function (v1) {
        return Data_Generic_Rep.NoArguments.value;
    };
});
let genericRingConstructor = function (dictGenericRing) {
    return new GenericRing(function (v) {
        return function (v1) {
            return genericSub$prime(dictGenericRing)(v)(v1);
        };
    });
};
let genericRingArgument = function (dictRing) {
    return new GenericRing(function (v) {
        return function (v1) {
            return data.sub(dictRing)(v)(v1);
        };
    });
};
module.exports = {
    "genericSub'": genericSub$prime,
    GenericRing: GenericRing,
    genericSub: genericSub,
    genericRingNoArguments: genericRingNoArguments,
    genericRingArgument: genericRingArgument,
    genericRingProduct: genericRingProduct,
    genericRingConstructor: genericRingConstructor
};
