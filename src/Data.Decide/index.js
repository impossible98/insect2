let Data_Divide = require("../Data.Divide/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");

class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

function identity(dict) {
	return dict.identity;
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(function () {
	return semigroupoidFn;
}, function (x) {
	return x;
});


let Decide = function (Divide0, choose) {
    this.Divide0 = Divide0;
    this.choose = choose;
};
let choosePredicate = new Decide(function () {
    return Data_Divide.dividePredicate;
}, function (f) {
    return function (v) {
        return function (v1) {
            let $52 = Data_Either.either(v)(v1);
            return function ($53) {
                return $52(f($53));
            };
        };
    };
});
let chooseOp = function (dictSemigroup) {
    return new Decide(function () {
        return Data_Divide.divideOp(dictSemigroup);
    }, function (f) {
        return function (v) {
            return function (v1) {
                let $54 = Data_Either.either(v)(v1);
                return function ($55) {
                    return $54(f($55));
                };
            };
        };
    });
};
let chooseEquivalence = new Decide(function () {
    return Data_Divide.divideEquivalence;
}, function (f) {
    return function (v) {
        return function (v1) {
            return function (a) {
                return function (b) {
                    let v2 = f(a);
                    if (v2 instanceof Data_Either.Left) {
                        let v3 = f(b);
                        if (v3 instanceof Data_Either.Left) {
                            return v(v2.value0)(v3.value0);
                        };
                        if (v3 instanceof Data_Either.Right) {
                            return false;
                        };
                        throw new Error("Failed pattern match at Data.Decide (line 27, column 15 - line 29, column 23): " + [ v3.constructor.name ]);
                    };
                    if (v2 instanceof Data_Either.Right) {
                        let v3 = f(b);
                        if (v3 instanceof Data_Either.Left) {
                            return false;
                        };
                        if (v3 instanceof Data_Either.Right) {
                            return v1(v2.value0)(v3.value0);
                        };
                        throw new Error("Failed pattern match at Data.Decide (line 30, column 16 - line 32, column 23): " + [ v3.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Data.Decide (line 26, column 66 - line 32, column 23): " + [ v2.constructor.name ]);
                };
            };
        };
    };
});
let chooseComparison = new Decide(function () {
    return Data_Divide.divideComparison;
}, function (f) {
    return function (v) {
        return function (v1) {
            return function (a) {
                return function (b) {
                    let v2 = f(a);
                    if (v2 instanceof Data_Either.Left) {
                        let v3 = f(b);
                        if (v3 instanceof Data_Either.Left) {
                            return v(v2.value0)(v3.value0);
                        };
                        if (v3 instanceof Data_Either.Right) {
                            return Data_Ordering.LT.value;
                        };
                        throw new Error("Failed pattern match at Data.Decide (line 18, column 15 - line 20, column 20): " + [ v3.constructor.name ]);
                    };
                    if (v2 instanceof Data_Either.Right) {
                        let v3 = f(b);
                        if (v3 instanceof Data_Either.Left) {
                            return Data_Ordering.GT.value;
                        };
                        if (v3 instanceof Data_Either.Right) {
                            return v1(v2.value0)(v3.value0);
                        };
                        throw new Error("Failed pattern match at Data.Decide (line 21, column 16 - line 23, column 23): " + [ v3.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Data.Decide (line 17, column 63 - line 23, column 23): " + [ v2.constructor.name ]);
                };
            };
        };
    };
});
let choose = function (dict) {
    return dict.choose;
};
let chosen = function (dictDecide) {
    return choose(dictDecide)(identity(categoryFn));
};
module.exports = {
    choose: choose,
    Decide: Decide,
    chosen: chosen,
    chooseComparison: chooseComparison,
    chooseEquivalence: chooseEquivalence,
    choosePredicate: choosePredicate,
    chooseOp: chooseOp
};
