let Control_MonadZero = require("../Control.MonadZero/index.js");
const data = require("../data");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let RegexFlags = (function () {
    function RegexFlags(value0) {
        this.value0 = value0;
    };
    RegexFlags.create = function (value0) {
        return new RegexFlags(value0);
    };
    return RegexFlags;
})();
let unicode = new RegexFlags({
    global: false,
    ignoreCase: false,
    multiline: false,
    sticky: false,
    unicode: true
});
let sticky = new RegexFlags({
    global: false,
    ignoreCase: false,
    multiline: false,
    sticky: true,
    unicode: false
});
let showRegexFlags = new Data_Show.Show(function (v) {
    let usedFlags = Data_Semigroup.append(Data_Semigroup.semigroupArray)([  ])(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.voidLeft(data.functorArray)(Control_MonadZero.guard(Control_MonadZero.monadZeroArray)(v.value0.global))("global"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.voidLeft(data.functorArray)(Control_MonadZero.guard(Control_MonadZero.monadZeroArray)(v.value0.ignoreCase))("ignoreCase"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.voidLeft(data.functorArray)(Control_MonadZero.guard(Control_MonadZero.monadZeroArray)(v.value0.multiline))("multiline"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(data.voidLeft(data.functorArray)(Control_MonadZero.guard(Control_MonadZero.monadZeroArray)(v.value0.sticky))("sticky"))(data.voidLeft(data.functorArray)(Control_MonadZero.guard(Control_MonadZero.monadZeroArray)(v.value0.unicode))("unicode"))))));
    let $6 = data.eq(data.eqArray(data.eqString))(usedFlags)([  ]);
    if ($6) {
        return "noFlags";
    };
    return "(" + (Data_String_Common.joinWith(" <> ")(usedFlags) + ")");
});
let semigroupRegexFlags = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return new RegexFlags({
            global: v.value0.global || v1.value0.global,
            ignoreCase: v.value0.ignoreCase || v1.value0.ignoreCase,
            multiline: v.value0.multiline || v1.value0.multiline,
            sticky: v.value0.sticky || v1.value0.sticky,
            unicode: v.value0.unicode || v1.value0.unicode
        });
    };
});
let noFlags = new RegexFlags({
    global: false,
    ignoreCase: false,
    multiline: false,
    sticky: false,
    unicode: false
});
let multiline = new RegexFlags({
    global: false,
    ignoreCase: false,
    multiline: true,
    sticky: false,
    unicode: false
});
let monoidRegexFlags = new Data_Monoid.Monoid(function () {
    return semigroupRegexFlags;
}, noFlags);
let ignoreCase = new RegexFlags({
    global: false,
    ignoreCase: true,
    multiline: false,
    sticky: false,
    unicode: false
});
let global = new RegexFlags({
    global: true,
    ignoreCase: false,
    multiline: false,
    sticky: false,
    unicode: false
});
let eqRegexFlags = new data.Eq(function (v) {
    return function (v1) {
        return v.value0.global === v1.value0.global && (v.value0.ignoreCase === v1.value0.ignoreCase && (v.value0.multiline === v1.value0.multiline && (v.value0.sticky === v1.value0.sticky && v.value0.unicode === v1.value0.unicode)));
    };
});
module.exports = {
    RegexFlags: RegexFlags,
    noFlags: noFlags,
    global: global,
    ignoreCase: ignoreCase,
    multiline: multiline,
    sticky: sticky,
    unicode: unicode,
    semigroupRegexFlags: semigroupRegexFlags,
    monoidRegexFlags: monoidRegexFlags,
    eqRegexFlags: eqRegexFlags,
    showRegexFlags: showRegexFlags
};
