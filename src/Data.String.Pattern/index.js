const data = require("../data");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");



let Replacement = function (x) {
    return x;
};
let Pattern = function (x) {
    return x;
};
let showReplacement = new Data_Show.Show(function (v) {
    return "(Replacement " + (Data_Show.show(Data_Show.showString)(v) + ")");
});
let showPattern = new Data_Show.Show(function (v) {
    return "(Pattern " + (Data_Show.show(Data_Show.showString)(v) + ")");
});
let newtypeReplacement = new Data_Newtype.Newtype(function (n) {
    return n;
}, Replacement);
let newtypePattern = new Data_Newtype.Newtype(function (n) {
    return n;
}, Pattern);
let eqReplacement = new data.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
let ordReplacement = new Data_Ord.Ord(function () {
    return eqReplacement;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
let eqPattern = new data.Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
let ordPattern = new Data_Ord.Ord(function () {
    return eqPattern;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordString)(x)(y);
    };
});
module.exports = {
    Pattern: Pattern,
    Replacement: Replacement,
    eqPattern: eqPattern,
    ordPattern: ordPattern,
    newtypePattern: newtypePattern,
    showPattern: showPattern,
    eqReplacement: eqReplacement,
    ordReplacement: ordReplacement,
    newtypeReplacement: newtypeReplacement,
    showReplacement: showReplacement
};
