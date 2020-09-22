let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");

let zero = function (dict) {
	return dict.zero;
};


let one = function (dict) {
	return dict.one;
};

let mul = function (dict) {
	return dict.mul;
};


let add = function (dict) {
	return dict.add;
};

let GenericSemiring = function (genericAdd$prime, genericMul$prime, genericOne$prime, genericZero$prime) {
    this["genericAdd'"] = genericAdd$prime;
    this["genericMul'"] = genericMul$prime;
    this["genericOne'"] = genericOne$prime;
    this["genericZero'"] = genericZero$prime;
};
let genericZero$prime = function (dict) {
    return dict["genericZero'"];
};
let genericZero = function (dictGeneric) {
    return function (dictGenericSemiring) {
        return Data_Generic_Rep.to(dictGeneric)(genericZero$prime(dictGenericSemiring));
    };
};
let genericSemiringNoArguments = new GenericSemiring(function (v) {
    return function (v1) {
        return Data_Generic_Rep.NoArguments.value;
    };
}, function (v) {
    return function (v1) {
        return Data_Generic_Rep.NoArguments.value;
    };
}, Data_Generic_Rep.NoArguments.value, Data_Generic_Rep.NoArguments.value);
let genericSemiringArgument = function (dictSemiring) {
    return new GenericSemiring(function (v) {
        return function (v1) {
            return add(dictSemiring)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return mul(dictSemiring)(v)(v1);
        };
    }, one(dictSemiring), zero(dictSemiring));
};
let genericOne$prime = function (dict) {
    return dict["genericOne'"];
};
let genericOne = function (dictGeneric) {
    return function (dictGenericSemiring) {
        return Data_Generic_Rep.to(dictGeneric)(genericOne$prime(dictGenericSemiring));
    };
};
let genericMul$prime = function (dict) {
    return dict["genericMul'"];
};
let genericMul = function (dictGeneric) {
    return function (dictGenericSemiring) {
        return function (x) {
            return function (y) {
                return Data_Generic_Rep.to(dictGeneric)(genericMul$prime(dictGenericSemiring)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y)));
            };
        };
    };
};
let genericAdd$prime = function (dict) {
    return dict["genericAdd'"];
};
let genericSemiringConstructor = function (dictGenericSemiring) {
    return new GenericSemiring(function (v) {
        return function (v1) {
            return genericAdd$prime(dictGenericSemiring)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return genericMul$prime(dictGenericSemiring)(v)(v1);
        };
    }, genericOne$prime(dictGenericSemiring), genericZero$prime(dictGenericSemiring));
};
let genericSemiringProduct = function (dictGenericSemiring) {
    return function (dictGenericSemiring1) {
        return new GenericSemiring(function (v) {
            return function (v1) {
                return new Data_Generic_Rep.Product(genericAdd$prime(dictGenericSemiring)(v.value0)(v1.value0), genericAdd$prime(dictGenericSemiring1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return function (v1) {
                return new Data_Generic_Rep.Product(genericMul$prime(dictGenericSemiring)(v.value0)(v1.value0), genericMul$prime(dictGenericSemiring1)(v.value1)(v1.value1));
            };
        }, new Data_Generic_Rep.Product(genericOne$prime(dictGenericSemiring), genericOne$prime(dictGenericSemiring1)), new Data_Generic_Rep.Product(genericZero$prime(dictGenericSemiring), genericZero$prime(dictGenericSemiring1)));
    };
};
let genericAdd = function (dictGeneric) {
    return function (dictGenericSemiring) {
        return function (x) {
            return function (y) {
                return Data_Generic_Rep.to(dictGeneric)(genericAdd$prime(dictGenericSemiring)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y)));
            };
        };
    };
};
module.exports = {
    "genericAdd'": genericAdd$prime,
    "genericMul'": genericMul$prime,
    "genericOne'": genericOne$prime,
    "genericZero'": genericZero$prime,
    GenericSemiring: GenericSemiring,
    genericZero: genericZero,
    genericOne: genericOne,
    genericAdd: genericAdd,
    genericMul: genericMul,
    genericSemiringNoArguments: genericSemiringNoArguments,
    genericSemiringArgument: genericSemiringArgument,
    genericSemiringProduct: genericSemiringProduct,
    genericSemiringConstructor: genericSemiringConstructor
};
