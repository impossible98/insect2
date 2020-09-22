let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");


let GenericHeytingAlgebra = function (genericConj$prime, genericDisj$prime, genericFF$prime, genericImplies$prime, genericNot$prime, genericTT$prime) {
    this["genericConj'"] = genericConj$prime;
    this["genericDisj'"] = genericDisj$prime;
    this["genericFF'"] = genericFF$prime;
    this["genericImplies'"] = genericImplies$prime;
    this["genericNot'"] = genericNot$prime;
    this["genericTT'"] = genericTT$prime;
};
let genericTT$prime = function (dict) {
    return dict["genericTT'"];
};
let genericTT = function (dictGeneric) {
    return function (dictGenericHeytingAlgebra) {
        return Data_Generic_Rep.to(dictGeneric)(genericTT$prime(dictGenericHeytingAlgebra));
    };
};
let genericNot$prime = function (dict) {
    return dict["genericNot'"];
};
let genericNot = function (dictGeneric) {
    return function (dictGenericHeytingAlgebra) {
        return function (x) {
            return Data_Generic_Rep.to(dictGeneric)(genericNot$prime(dictGenericHeytingAlgebra)(Data_Generic_Rep.from(dictGeneric)(x)));
        };
    };
};
let genericImplies$prime = function (dict) {
    return dict["genericImplies'"];
};
let genericImplies = function (dictGeneric) {
    return function (dictGenericHeytingAlgebra) {
        return function (x) {
            return function (y) {
                return Data_Generic_Rep.to(dictGeneric)(genericImplies$prime(dictGenericHeytingAlgebra)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y)));
            };
        };
    };
};
let genericHeytingAlgebraNoArguments = new GenericHeytingAlgebra(function (v) {
    return function (v1) {
        return Data_Generic_Rep.NoArguments.value;
    };
}, function (v) {
    return function (v1) {
        return Data_Generic_Rep.NoArguments.value;
    };
}, Data_Generic_Rep.NoArguments.value, function (v) {
    return function (v1) {
        return Data_Generic_Rep.NoArguments.value;
    };
}, function (v) {
    return Data_Generic_Rep.NoArguments.value;
}, Data_Generic_Rep.NoArguments.value);
let genericHeytingAlgebraArgument = function (dictHeytingAlgebra) {
    return new GenericHeytingAlgebra(function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
        };
    }, Data_HeytingAlgebra.ff(dictHeytingAlgebra), function (v) {
        return function (v1) {
            return Data_HeytingAlgebra.implies(dictHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return Data_HeytingAlgebra.not(dictHeytingAlgebra)(v);
    }, Data_HeytingAlgebra.tt(dictHeytingAlgebra));
};
let genericFF$prime = function (dict) {
    return dict["genericFF'"];
};
let genericFF = function (dictGeneric) {
    return function (dictGenericHeytingAlgebra) {
        return Data_Generic_Rep.to(dictGeneric)(genericFF$prime(dictGenericHeytingAlgebra));
    };
};
let genericDisj$prime = function (dict) {
    return dict["genericDisj'"];
};
let genericDisj = function (dictGeneric) {
    return function (dictGenericHeytingAlgebra) {
        return function (x) {
            return function (y) {
                return Data_Generic_Rep.to(dictGeneric)(genericDisj$prime(dictGenericHeytingAlgebra)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y)));
            };
        };
    };
};
let genericConj$prime = function (dict) {
    return dict["genericConj'"];
};
let genericHeytingAlgebraConstructor = function (dictGenericHeytingAlgebra) {
    return new GenericHeytingAlgebra(function (v) {
        return function (v1) {
            return genericConj$prime(dictGenericHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return function (v1) {
            return genericDisj$prime(dictGenericHeytingAlgebra)(v)(v1);
        };
    }, genericFF$prime(dictGenericHeytingAlgebra), function (v) {
        return function (v1) {
            return genericImplies$prime(dictGenericHeytingAlgebra)(v)(v1);
        };
    }, function (v) {
        return genericNot$prime(dictGenericHeytingAlgebra)(v);
    }, genericTT$prime(dictGenericHeytingAlgebra));
};
let genericHeytingAlgebraProduct = function (dictGenericHeytingAlgebra) {
    return function (dictGenericHeytingAlgebra1) {
        return new GenericHeytingAlgebra(function (v) {
            return function (v1) {
                return new Data_Generic_Rep.Product(genericConj$prime(dictGenericHeytingAlgebra)(v.value0)(v1.value0), genericConj$prime(dictGenericHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return function (v1) {
                return new Data_Generic_Rep.Product(genericDisj$prime(dictGenericHeytingAlgebra)(v.value0)(v1.value0), genericDisj$prime(dictGenericHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, new Data_Generic_Rep.Product(genericFF$prime(dictGenericHeytingAlgebra), genericFF$prime(dictGenericHeytingAlgebra1)), function (v) {
            return function (v1) {
                return new Data_Generic_Rep.Product(genericImplies$prime(dictGenericHeytingAlgebra)(v.value0)(v1.value0), genericImplies$prime(dictGenericHeytingAlgebra1)(v.value1)(v1.value1));
            };
        }, function (v) {
            return new Data_Generic_Rep.Product(genericNot$prime(dictGenericHeytingAlgebra)(v.value0), genericNot$prime(dictGenericHeytingAlgebra1)(v.value1));
        }, new Data_Generic_Rep.Product(genericTT$prime(dictGenericHeytingAlgebra), genericTT$prime(dictGenericHeytingAlgebra1)));
    };
};
let genericConj = function (dictGeneric) {
    return function (dictGenericHeytingAlgebra) {
        return function (x) {
            return function (y) {
                return Data_Generic_Rep.to(dictGeneric)(genericConj$prime(dictGenericHeytingAlgebra)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Generic_Rep.from(dictGeneric)(y)));
            };
        };
    };
};
module.exports = {
    "genericConj'": genericConj$prime,
    "genericDisj'": genericDisj$prime,
    "genericFF'": genericFF$prime,
    "genericImplies'": genericImplies$prime,
    "genericNot'": genericNot$prime,
    "genericTT'": genericTT$prime,
    GenericHeytingAlgebra: GenericHeytingAlgebra,
    genericFF: genericFF,
    genericTT: genericTT,
    genericImplies: genericImplies,
    genericConj: genericConj,
    genericDisj: genericDisj,
    genericNot: genericNot,
    genericHeytingAlgebraNoArguments: genericHeytingAlgebraNoArguments,
    genericHeytingAlgebraArgument: genericHeytingAlgebraArgument,
    genericHeytingAlgebraProduct: genericHeytingAlgebraProduct,
    genericHeytingAlgebraConstructor: genericHeytingAlgebraConstructor
};
