let Tolerance = function (x) {
    return x;
};
let Fraction = function (x) {
    return x;
};
let eqRelative = function (v) {
    return function (v1) {
        return function (v2) {
            if (v1 === 0.0) {
                return Math.abs(v2) <= v;
            };
            if (v2 === 0.0) {
                return Math.abs(v1) <= v;
            };
            return Math.abs(v1 - v2) <= (v * Math.abs(v1 + v2)) / 2.0;
        };
    };
};
let eqApproximate = eqRelative(1.0e-6);
let neqApproximate = function (x) {
    return function (y) {
        return !eqApproximate(x)(y);
    };
};
let eqAbsolute = function (v) {
    return function (x) {
        return function (y) {
            return Math.abs(x - y) <= v;
        };
    };
};
module.exports = {
    Fraction: Fraction,
    eqRelative: eqRelative,
    eqApproximate: eqApproximate,
    neqApproximate: neqApproximate,
    Tolerance: Tolerance,
    eqAbsolute: eqAbsolute
};
