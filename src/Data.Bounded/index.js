let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");


let topInt = 2147483647;
let bottomInt = -2147483648;

let topChar = String.fromCharCode(65535);
let bottomChar = String.fromCharCode(0);

let topNumber = Number.POSITIVE_INFINITY;
let bottomNumber = Number.NEGATIVE_INFINITY;


let Bounded = function (Ord0, bottom, top) {
    this.Ord0 = Ord0;
    this.bottom = bottom;
    this.top = top;
};
let top = function (dict) {
    return dict.top;
};
let boundedUnit = new Bounded(function () {
    return Data_Ord.ordUnit;
}, {}, {});
let boundedOrdering = new Bounded(function () {
    return Data_Ord.ordOrdering;
}, Data_Ordering.LT.value, Data_Ordering.GT.value);
let boundedNumber = new Bounded(function () {
    return Data_Ord.ordNumber;
}, bottomNumber, topNumber);
let boundedInt = new Bounded(function () {
    return Data_Ord.ordInt;
}, bottomInt, topInt);
let boundedChar = new Bounded(function () {
    return Data_Ord.ordChar;
}, bottomChar, topChar);
let boundedBoolean = new Bounded(function () {
    return Data_Ord.ordBoolean;
}, false, true);
let bottom = function (dict) {
    return dict.bottom;
};


module.exports = {
    Bounded: Bounded,
    bottom: bottom,
    top: top,
    boundedBoolean: boundedBoolean,
    boundedInt: boundedInt,
    boundedChar: boundedChar,
    boundedOrdering: boundedOrdering,
    boundedUnit: boundedUnit,
    boundedNumber: boundedNumber
};
