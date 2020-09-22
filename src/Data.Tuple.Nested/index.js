let Data_Tuple = require("../Data.Tuple/index.js");



let uncurry9 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value1.value0);
    };
};
let uncurry8 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value0);
    };
};
let uncurry7 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0);
    };
};
let uncurry6 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0);
    };
};
let uncurry5 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0);
    };
};
let uncurry4 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0);
    };
};
let uncurry3 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0)(v.value1.value1.value0);
    };
};
let uncurry2 = function (f) {
    return function (v) {
        return f(v.value0)(v.value1.value0);
    };
};
let uncurry10 = function (f$prime) {
    return function (v) {
        return f$prime(v.value0)(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1.value0)(v.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value1.value0)(v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value0);
    };
};
let uncurry1 = function (f) {
    return function (v) {
        return f(v.value0);
    };
};
let tuple9 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return function (h) {
                                return function (i) {
                                    return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, {})))))))));
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
let tuple8 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return function (h) {
                                return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, {}))))))));
                            };
                        };
                    };
                };
            };
        };
    };
};
let tuple7 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, {})))))));
                        };
                    };
                };
            };
        };
    };
};
let tuple6 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, {}))))));
                    };
                };
            };
        };
    };
};
let tuple5 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, {})))));
                };
            };
        };
    };
};
let tuple4 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, {}))));
            };
        };
    };
};
let tuple3 = function (a) {
    return function (b) {
        return function (c) {
            return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, {})));
        };
    };
};
let tuple2 = function (a) {
    return function (b) {
        return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, {}));
    };
};
let tuple10 = function (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return function (f) {
                        return function (g) {
                            return function (h) {
                                return function (i) {
                                    return function (j) {
                                        return new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, new Data_Tuple.Tuple(j, {}))))))))));
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
let tuple1 = function (a) {
    return new Data_Tuple.Tuple(a, {});
};
let over9 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1.value1.value1)))))))));
    };
};
let over8 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1.value1))))))));
    };
};
let over7 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1)))))));
    };
};
let over6 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1))))));
    };
};
let over5 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1)))));
    };
};
let over4 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value0), v.value1.value1.value1.value1))));
    };
};
let over3 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value0), v.value1.value1.value1)));
    };
};
let over2 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(o(v.value1.value0), v.value1.value1));
    };
};
let over10 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, new Data_Tuple.Tuple(v.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(v.value1.value1.value1.value1.value1.value1.value1.value1.value0, new Data_Tuple.Tuple(o(v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value0), v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value1))))))))));
    };
};
let over1 = function (o) {
    return function (v) {
        return new Data_Tuple.Tuple(o(v.value0), v.value1);
    };
};
let get9 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value1.value1.value0;
};
let get8 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value1.value0;
};
let get7 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value0;
};
let get6 = function (v) {
    return v.value1.value1.value1.value1.value1.value0;
};
let get5 = function (v) {
    return v.value1.value1.value1.value1.value0;
};
let get4 = function (v) {
    return v.value1.value1.value1.value0;
};
let get3 = function (v) {
    return v.value1.value1.value0;
};
let get2 = function (v) {
    return v.value1.value0;
};
let get10 = function (v) {
    return v.value1.value1.value1.value1.value1.value1.value1.value1.value1.value0;
};
let get1 = function (v) {
    return v.value0;
};
let curry9 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, z))))))))));
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
let curry8 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, z)))))))));
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
let curry7 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, z))))))));
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
let curry6 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, z)))))));
                            };
                        };
                    };
                };
            };
        };
    };
};
let curry5 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, z))))));
                        };
                    };
                };
            };
        };
    };
};
let curry4 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, z)))));
                    };
                };
            };
        };
    };
};
let curry3 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, z))));
                };
            };
        };
    };
};
let curry2 = function (z) {
    return function (f) {
        return function (a) {
            return function (b) {
                return f(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, z)));
            };
        };
    };
};
let curry10 = function (z) {
    return function (f$prime) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return function (j) {
                                                return f$prime(new Data_Tuple.Tuple(a, new Data_Tuple.Tuple(b, new Data_Tuple.Tuple(c, new Data_Tuple.Tuple(d, new Data_Tuple.Tuple(e, new Data_Tuple.Tuple(f, new Data_Tuple.Tuple(g, new Data_Tuple.Tuple(h, new Data_Tuple.Tuple(i, new Data_Tuple.Tuple(j, z)))))))))));
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
let curry1 = function (z) {
    return function (f) {
        return function (a) {
            return f(new Data_Tuple.Tuple(a, z));
        };
    };
};
module.exports = {
    tuple1: tuple1,
    tuple2: tuple2,
    tuple3: tuple3,
    tuple4: tuple4,
    tuple5: tuple5,
    tuple6: tuple6,
    tuple7: tuple7,
    tuple8: tuple8,
    tuple9: tuple9,
    tuple10: tuple10,
    get1: get1,
    get2: get2,
    get3: get3,
    get4: get4,
    get5: get5,
    get6: get6,
    get7: get7,
    get8: get8,
    get9: get9,
    get10: get10,
    over1: over1,
    over2: over2,
    over3: over3,
    over4: over4,
    over5: over5,
    over6: over6,
    over7: over7,
    over8: over8,
    over9: over9,
    over10: over10,
    uncurry1: uncurry1,
    uncurry2: uncurry2,
    uncurry3: uncurry3,
    uncurry4: uncurry4,
    uncurry5: uncurry5,
    uncurry6: uncurry6,
    uncurry7: uncurry7,
    uncurry8: uncurry8,
    uncurry9: uncurry9,
    uncurry10: uncurry10,
    curry1: curry1,
    curry2: curry2,
    curry3: curry3,
    curry4: curry4,
    curry5: curry5,
    curry6: curry6,
    curry7: curry7,
    curry8: curry8,
    curry9: curry9,
    curry10: curry10
};
