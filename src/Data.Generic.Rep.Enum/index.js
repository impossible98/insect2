let Data_Enum = require("../Data.Enum/index.js");
const data = require('../data');

let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");
let Data_Generic_Rep_Bounded = require("../Data.Generic.Rep.Bounded/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");


let apply = function (dict) {
	return dict.apply;
};

let GenericEnum = function (genericPred$prime, genericSucc$prime) {
    this["genericPred'"] = genericPred$prime;
    this["genericSucc'"] = genericSucc$prime;
};
let GenericBoundedEnum = function (genericCardinality$prime, genericFromEnum$prime, genericToEnum$prime) {
    this["genericCardinality'"] = genericCardinality$prime;
    this["genericFromEnum'"] = genericFromEnum$prime;
    this["genericToEnum'"] = genericToEnum$prime;
};
let genericToEnum$prime = function (dict) {
    return dict["genericToEnum'"];
};
let genericToEnum = function (dictGeneric) {
    return function (dictGenericBoundedEnum) {
        let $90 = data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.to(dictGeneric));
        let $91 = genericToEnum$prime(dictGenericBoundedEnum);
        return function ($92) {
            return $90($91($92));
        };
    };
};
let genericSucc$prime = function (dict) {
    return dict["genericSucc'"];
};
let genericSucc = function (dictGeneric) {
    return function (dictGenericEnum) {
        let $93 = data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.to(dictGeneric));
        let $94 = genericSucc$prime(dictGenericEnum);
        let $95 = Data_Generic_Rep.from(dictGeneric);
        return function ($96) {
            return $93($94($95($96)));
        };
    };
};
let genericPred$prime = function (dict) {
    return dict["genericPred'"];
};
let genericPred = function (dictGeneric) {
    return function (dictGenericEnum) {
        let $97 = data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.to(dictGeneric));
        let $98 = genericPred$prime(dictGenericEnum);
        let $99 = Data_Generic_Rep.from(dictGeneric);
        return function ($100) {
            return $97($98($99($100)));
        };
    };
};
let genericFromEnum$prime = function (dict) {
    return dict["genericFromEnum'"];
};
let genericFromEnum = function (dictGeneric) {
    return function (dictGenericBoundedEnum) {
        let $101 = genericFromEnum$prime(dictGenericBoundedEnum);
        let $102 = Data_Generic_Rep.from(dictGeneric);
        return function ($103) {
            return $101($102($103));
        };
    };
};
let genericEnumSum = function (dictGenericEnum) {
    return function (dictGenericTop) {
        return function (dictGenericEnum1) {
            return function (dictGenericBottom) {
                return new GenericEnum(function (v) {
                    if (v instanceof Data_Generic_Rep.Inl) {
                        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Inl.create)(genericPred$prime(dictGenericEnum)(v.value0));
                    };
                    if (v instanceof Data_Generic_Rep.Inr) {
                        let v1 = genericPred$prime(dictGenericEnum1)(v.value0);
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return new Data_Maybe.Just(new Data_Generic_Rep.Inl(Data_Generic_Rep_Bounded["genericTop'"](dictGenericTop)));
                        };
                        if (v1 instanceof Data_Maybe.Just) {
                            return new Data_Maybe.Just(new Data_Generic_Rep.Inr(v1.value0));
                        };
                        throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 30, column 14 - line 32, column 31): " + [ v1.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 28, column 18 - line 32, column 31): " + [ v.constructor.name ]);
                }, function (v) {
                    if (v instanceof Data_Generic_Rep.Inl) {
                        let v1 = genericSucc$prime(dictGenericEnum)(v.value0);
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return new Data_Maybe.Just(new Data_Generic_Rep.Inr(Data_Generic_Rep_Bounded["genericBottom'"](dictGenericBottom)));
                        };
                        if (v1 instanceof Data_Maybe.Just) {
                            return new Data_Maybe.Just(new Data_Generic_Rep.Inl(v1.value0));
                        };
                        throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 34, column 14 - line 36, column 31): " + [ v1.constructor.name ]);
                    };
                    if (v instanceof Data_Generic_Rep.Inr) {
                        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Inr.create)(genericSucc$prime(dictGenericEnum1)(v.value0));
                    };
                    throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 33, column 18 - line 37, column 36): " + [ v.constructor.name ]);
                });
            };
        };
    };
};
let genericEnumProduct = function (dictGenericEnum) {
    return function (dictGenericTop) {
        return function (dictGenericBottom) {
            return function (dictGenericEnum1) {
                return function (dictGenericTop1) {
                    return function (dictGenericBottom1) {
                        return new GenericEnum(function (v) {
                            let v1 = genericPred$prime(dictGenericEnum1)(v.value1);
                            if (v1 instanceof Data_Maybe.Just) {
                                return Data_Maybe.Just.create(new Data_Generic_Rep.Product(v.value0, v1.value0));
                            };
                            if (v1 instanceof Data_Maybe.Nothing) {
                                return data.map(Data_Maybe.functorMaybe)(data.flip(Data_Generic_Rep.Product.create)(Data_Generic_Rep_Bounded["genericTop'"](dictGenericTop1)))(genericPred$prime(dictGenericEnum)(v.value0));
                            };
                            throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 40, column 32 - line 42, column 59): " + [ v1.constructor.name ]);
                        }, function (v) {
                            let v1 = genericSucc$prime(dictGenericEnum1)(v.value1);
                            if (v1 instanceof Data_Maybe.Just) {
                                return Data_Maybe.Just.create(new Data_Generic_Rep.Product(v.value0, v1.value0));
                            };
                            if (v1 instanceof Data_Maybe.Nothing) {
                                return data.map(Data_Maybe.functorMaybe)(data.flip(Data_Generic_Rep.Product.create)(Data_Generic_Rep_Bounded["genericBottom'"](dictGenericBottom1)))(genericSucc$prime(dictGenericEnum)(v.value0));
                            };
                            throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 43, column 32 - line 45, column 62): " + [ v1.constructor.name ]);
                        });
                    };
                };
            };
        };
    };
};
let genericEnumNoArguments = new GenericEnum(function (v) {
    return Data_Maybe.Nothing.value;
}, function (v) {
    return Data_Maybe.Nothing.value;
});
let genericEnumConstructor = function (dictGenericEnum) {
    return new GenericEnum(function (v) {
        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Constructor)(genericPred$prime(dictGenericEnum)(v));
    }, function (v) {
        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Constructor)(genericSucc$prime(dictGenericEnum)(v));
    });
};
let genericEnumArgument = function (dictEnum) {
    return new GenericEnum(function (v) {
        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Argument)(Data_Enum.pred(dictEnum)(v));
    }, function (v) {
        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Argument)(Data_Enum.succ(dictEnum)(v));
    });
};
let genericCardinality$prime = function (dict) {
    return dict["genericCardinality'"];
};
let genericCardinality = function (dictGeneric) {
    return function (dictGenericBoundedEnum) {
        return Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum));
    };
};
let genericBoundedEnumSum = function (dictGenericBoundedEnum) {
    return function (dictGenericBoundedEnum1) {
        return new GenericBoundedEnum(Data_Enum.Cardinality(Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum)) + Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum1)) | 0), function (v) {
            if (v instanceof Data_Generic_Rep.Inl) {
                return genericFromEnum$prime(dictGenericBoundedEnum)(v.value0);
            };
            if (v instanceof Data_Generic_Rep.Inr) {
                return genericFromEnum$prime(dictGenericBoundedEnum1)(v.value0) + Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum)) | 0;
            };
            throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 87, column 22 - line 89, column 80): " + [ v.constructor.name ]);
        }, function (n) {
            let to = function (v) {
                if (n >= 0 && n < v) {
                    return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Inl.create)(genericToEnum$prime(dictGenericBoundedEnum)(n));
                };
                if (true) {
                    return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Inr.create)(genericToEnum$prime(dictGenericBoundedEnum1)(n - v | 0));
                };
                throw new Error("Failed pattern match at Data.Generic.Rep.Enum (line 83, column 5 - line 83, column 43): " + [ v.constructor.name ]);
            };
            return to(genericCardinality$prime(dictGenericBoundedEnum));
        });
    };
};
let genericBoundedEnumProduct = function (dictGenericBoundedEnum) {
    return function (dictGenericBoundedEnum1) {
        return new GenericBoundedEnum(Data_Enum.Cardinality(Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum)) * Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum1)) | 0), (function () {
            let from = function (v) {
                return function (v1) {
                    return (genericFromEnum$prime(dictGenericBoundedEnum)(v1.value0) * v | 0) + genericFromEnum$prime(dictGenericBoundedEnum1)(v1.value1) | 0;
                };
            };
            return from(genericCardinality$prime(dictGenericBoundedEnum1));
        })(), function (n) {
            let to = function (v) {
                return apply(Data_Maybe.applyMaybe)(data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Product.create)(genericToEnum$prime(dictGenericBoundedEnum)(data.div(data.euclideanRingInt)(n)(v))))(genericToEnum$prime(dictGenericBoundedEnum1)(data.mod(data.euclideanRingInt)(n)(v)));
            };
            return to(genericCardinality$prime(dictGenericBoundedEnum1));
        });
    };
};
let genericBoundedEnumNoArguments = new GenericBoundedEnum(1, function (v) {
    return 0;
}, function (i) {
    let $87 = i === 0;
    if ($87) {
        return new Data_Maybe.Just(Data_Generic_Rep.NoArguments.value);
    };
    return Data_Maybe.Nothing.value;
});
let genericBoundedEnumConstructor = function (dictGenericBoundedEnum) {
    return new GenericBoundedEnum(Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(genericCardinality$prime(dictGenericBoundedEnum)), function (v) {
        return genericFromEnum$prime(dictGenericBoundedEnum)(v);
    }, function (i) {
        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Constructor)(genericToEnum$prime(dictGenericBoundedEnum)(i));
    });
};
let genericBoundedEnumArgument = function (dictBoundedEnum) {
    return new GenericBoundedEnum(Data_Newtype.unwrap(Data_Enum.newtypeCardinality)(Data_Enum.cardinality(dictBoundedEnum)), function (v) {
        return Data_Enum.fromEnum(dictBoundedEnum)(v);
    }, function (i) {
        return data.map(Data_Maybe.functorMaybe)(Data_Generic_Rep.Argument)(Data_Enum.toEnum(dictBoundedEnum)(i));
    });
};

module.exports = {
    "genericCardinality'": genericCardinality$prime,
    "genericFromEnum'": genericFromEnum$prime,
    "genericPred'": genericPred$prime,
    "genericSucc'": genericSucc$prime,
    "genericToEnum'": genericToEnum$prime,
    GenericEnum: GenericEnum,
    genericPred: genericPred,
    genericSucc: genericSucc,
    GenericBoundedEnum: GenericBoundedEnum,
    genericCardinality: genericCardinality,
    genericToEnum: genericToEnum,
    genericFromEnum: genericFromEnum,
    genericEnumNoArguments: genericEnumNoArguments,
    genericEnumArgument: genericEnumArgument,
    genericEnumConstructor: genericEnumConstructor,
    genericEnumSum: genericEnumSum,
    genericEnumProduct: genericEnumProduct,
    genericBoundedEnumNoArguments: genericBoundedEnumNoArguments,
    genericBoundedEnumArgument: genericBoundedEnumArgument,
    genericBoundedEnumConstructor: genericBoundedEnumConstructor,
    genericBoundedEnumSum: genericBoundedEnumSum,
    genericBoundedEnumProduct: genericBoundedEnumProduct
};
