const data = require("../data");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");


let CaseInsensitiveString = function (x) {
    return x;
};
let showCaseInsensitiveString = new Data_Show.Show(function (v) {
    return "(CaseInsensitiveString " + (Data_Show.show(Data_Show.showString)(v) + ")");
});
let newtypeCaseInsensitiveString = new Data_Newtype.Newtype(function (n) {
    return n;
}, CaseInsensitiveString);
let eqCaseInsensitiveString = new data.Eq(function (v) {
    return function (v1) {
        return Data_String_Common.toLower(v) === Data_String_Common.toLower(v1);
    };
});
let ordCaseInsensitiveString = new Data_Ord.Ord(function () {
    return eqCaseInsensitiveString;
}, function (v) {
    return function (v1) {
        return Data_Ord.compare(Data_Ord.ordString)(Data_String_Common.toLower(v))(Data_String_Common.toLower(v1));
    };
});
module.exports = {
    CaseInsensitiveString: CaseInsensitiveString,
    eqCaseInsensitiveString: eqCaseInsensitiveString,
    ordCaseInsensitiveString: ordCaseInsensitiveString,
    showCaseInsensitiveString: showCaseInsensitiveString,
    newtypeCaseInsensitiveString: newtypeCaseInsensitiveString
};
