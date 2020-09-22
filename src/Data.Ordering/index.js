const data = require("../data");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


let LT = (function () {
    function LT() {

    };
    LT.value = new LT();
    return LT;
})();
let GT = (function () {
    function GT() {

    };
    GT.value = new GT();
    return GT;
})();
let EQ = (function () {
    function EQ() {

    };
    EQ.value = new EQ();
    return EQ;
})();
let showOrdering = new Data_Show.Show(function (v) {
    if (v instanceof LT) {
        return "LT";
    };
    if (v instanceof GT) {
        return "GT";
    };
    if (v instanceof EQ) {
        return "EQ";
    };
    throw new Error("Failed pattern match at Data.Ordering (line 26, column 1 - line 29, column 17): " + [ v.constructor.name ]);
});
let semigroupOrdering = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        if (v instanceof LT) {
            return LT.value;
        };
        if (v instanceof GT) {
            return GT.value;
        };
        if (v instanceof EQ) {
            return v1;
        };
        throw new Error("Failed pattern match at Data.Ordering (line 21, column 1 - line 24, column 18): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let invert = function (v) {
    if (v instanceof GT) {
        return LT.value;
    };
    if (v instanceof EQ) {
        return EQ.value;
    };
    if (v instanceof LT) {
        return GT.value;
    };
    throw new Error("Failed pattern match at Data.Ordering (line 33, column 1 - line 33, column 31): " + [ v.constructor.name ]);
};
let eqOrdering = new data.Eq(function (v) {
    return function (v1) {
        if (v instanceof LT && v1 instanceof LT) {
            return true;
        };
        if (v instanceof GT && v1 instanceof GT) {
            return true;
        };
        if (v instanceof EQ && v1 instanceof EQ) {
            return true;
        };
        return false;
    };
});
module.exports = {
    LT: LT,
    GT: GT,
    EQ: EQ,
    invert: invert,
    eqOrdering: eqOrdering,
    semigroupOrdering: semigroupOrdering,
    showOrdering: showOrdering
};
