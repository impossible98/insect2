const data = require("../data");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_NonEmpty_Internal = require("../Data.String.NonEmpty.Internal/index.js");


let CaseInsensitiveNonEmptyString = function (x) {
    return x;
};
let showCaseInsensitiveNonEmptyString = new Data_Show.Show(function (v) {
    return "(CaseInsensitiveNonEmptyString " + (Data_Show.show(Data_String_NonEmpty_Internal.showNonEmptyString)(v) + ")");
});
let newtypeCaseInsensitiveNonEmptyString = new Data_Newtype.Newtype(function (n) {
    return n;
}, CaseInsensitiveNonEmptyString);
let eqCaseInsensitiveNonEmptyString = new data.Eq(function (v) {
    return function (v1) {
        return data.eq(Data_String_NonEmpty_Internal.eqNonEmptyString)(Data_String_NonEmpty_Internal.toLower(v))(Data_String_NonEmpty_Internal.toLower(v1));
    };
});
let ordCaseInsensitiveNonEmptyString = new Data_Ord.Ord(function () {
    return eqCaseInsensitiveNonEmptyString;
}, function (v) {
    return function (v1) {
        return Data_Ord.compare(Data_String_NonEmpty_Internal.ordNonEmptyString)(Data_String_NonEmpty_Internal.toLower(v))(Data_String_NonEmpty_Internal.toLower(v1));
    };
});
module.exports = {
    CaseInsensitiveNonEmptyString: CaseInsensitiveNonEmptyString,
    eqCaseInsensitiveNonEmptyString: eqCaseInsensitiveNonEmptyString,
    ordCaseInsensitiveNonEmptyString: ordCaseInsensitiveNonEmptyString,
    showCaseInsensitiveNonEmptyString: showCaseInsensitiveNonEmptyString,
    newtypeCaseInsensitiveNonEmptyString: newtypeCaseInsensitiveNonEmptyString
};
