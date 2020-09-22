let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");
let Second = function (x) {
    return x;
};
let Minute = function (x) {
    return x;
};
let Millisecond = function (x) {
    return x;
};
let Hour = function (x) {
    return x;
};
let showSecond = new Data_Show.Show(function (v) {
    return "(Second " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let showMinute = new Data_Show.Show(function (v) {
    return "(Minute " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let showMillisecond = new Data_Show.Show(function (v) {
    return "(Millisecond " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let showHour = new Data_Show.Show(function (v) {
    return "(Hour " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let ordSecond = Data_Ord.ordInt;
let ordMinute = Data_Ord.ordInt;
let ordMillisecond = Data_Ord.ordInt;
let ordHour = Data_Ord.ordInt;
let eqSecond = Data_Eq.eqInt;
let eqMinute = Data_Eq.eqInt;
let eqMillisecond = Data_Eq.eqInt;
let eqHour = Data_Eq.eqInt;
let boundedSecond = new Data_Bounded.Bounded(function () {
    return ordSecond;
}, 0, 59);
let boundedMinute = new Data_Bounded.Bounded(function () {
    return ordMinute;
}, 0, 59);
let boundedMillisecond = new Data_Bounded.Bounded(function () {
    return ordMillisecond;
}, 0, 999);
let boundedHour = new Data_Bounded.Bounded(function () {
    return ordHour;
}, 0, 23);
let boundedEnumSecond = new Data_Enum.BoundedEnum(function () {
    return boundedSecond;
}, function () {
    return enumSecond;
}, 60, function (v) {
    return v;
}, function (n) {
    if (n >= 0 && n <= 59) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Time.Component (line 90, column 1 - line 95, column 26): " + [ n.constructor.name ]);
});
let enumSecond = new Data_Enum.Enum(function () {
    return ordSecond;
}, (function () {
    let $28 = Data_Enum.toEnum(boundedEnumSecond);
    let $29 = Data_Enum.fromEnum(boundedEnumSecond);
    return function ($30) {
        return $28((function (v) {
            return v - 1 | 0;
        })($29($30)));
    };
})(), (function () {
    let $31 = Data_Enum.toEnum(boundedEnumSecond);
    let $32 = Data_Enum.fromEnum(boundedEnumSecond);
    return function ($33) {
        return $31((function (v) {
            return v + 1 | 0;
        })($32($33)));
    };
})());
let boundedEnumMinute = new Data_Enum.BoundedEnum(function () {
    return boundedMinute;
}, function () {
    return enumMinute;
}, 60, function (v) {
    return v;
}, function (n) {
    if (n >= 0 && n <= 59) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Time.Component (line 61, column 1 - line 66, column 26): " + [ n.constructor.name ]);
});
let enumMinute = new Data_Enum.Enum(function () {
    return ordMinute;
}, (function () {
    let $34 = Data_Enum.toEnum(boundedEnumMinute);
    let $35 = Data_Enum.fromEnum(boundedEnumMinute);
    return function ($36) {
        return $34((function (v) {
            return v - 1 | 0;
        })($35($36)));
    };
})(), (function () {
    let $37 = Data_Enum.toEnum(boundedEnumMinute);
    let $38 = Data_Enum.fromEnum(boundedEnumMinute);
    return function ($39) {
        return $37((function (v) {
            return v + 1 | 0;
        })($38($39)));
    };
})());
let boundedEnumMillisecond = new Data_Enum.BoundedEnum(function () {
    return boundedMillisecond;
}, function () {
    return enumMillisecond;
}, 1000, function (v) {
    return v;
}, function (n) {
    if (n >= 0 && n <= 999) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Time.Component (line 120, column 1 - line 125, column 31): " + [ n.constructor.name ]);
});
let enumMillisecond = new Data_Enum.Enum(function () {
    return ordMillisecond;
}, (function () {
    let $40 = Data_Enum.toEnum(boundedEnumMillisecond);
    let $41 = Data_Enum.fromEnum(boundedEnumMillisecond);
    return function ($42) {
        return $40((function (v) {
            return v - 1 | 0;
        })($41($42)));
    };
})(), (function () {
    let $43 = Data_Enum.toEnum(boundedEnumMillisecond);
    let $44 = Data_Enum.fromEnum(boundedEnumMillisecond);
    return function ($45) {
        return $43((function (v) {
            return v + 1 | 0;
        })($44($45)));
    };
})());
let boundedEnumHour = new Data_Enum.BoundedEnum(function () {
    return boundedHour;
}, function () {
    return enumHour;
}, 24, function (v) {
    return v;
}, function (n) {
    if (n >= 0 && n <= 23) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Time.Component (line 32, column 1 - line 37, column 24): " + [ n.constructor.name ]);
});
let enumHour = new Data_Enum.Enum(function () {
    return ordHour;
}, (function () {
    let $46 = Data_Enum.toEnum(boundedEnumHour);
    let $47 = Data_Enum.fromEnum(boundedEnumHour);
    return function ($48) {
        return $46((function (v) {
            return v - 1 | 0;
        })($47($48)));
    };
})(), (function () {
    let $49 = Data_Enum.toEnum(boundedEnumHour);
    let $50 = Data_Enum.fromEnum(boundedEnumHour);
    return function ($51) {
        return $49((function (v) {
            return v + 1 | 0;
        })($50($51)));
    };
})());
module.exports = {
    eqHour: eqHour,
    ordHour: ordHour,
    boundedHour: boundedHour,
    enumHour: enumHour,
    boundedEnumHour: boundedEnumHour,
    showHour: showHour,
    eqMinute: eqMinute,
    ordMinute: ordMinute,
    boundedMinute: boundedMinute,
    enumMinute: enumMinute,
    boundedEnumMinute: boundedEnumMinute,
    showMinute: showMinute,
    eqSecond: eqSecond,
    ordSecond: ordSecond,
    boundedSecond: boundedSecond,
    enumSecond: enumSecond,
    boundedEnumSecond: boundedEnumSecond,
    showSecond: showSecond,
    eqMillisecond: eqMillisecond,
    ordMillisecond: ordMillisecond,
    boundedMillisecond: boundedMillisecond,
    enumMillisecond: enumMillisecond,
    boundedEnumMillisecond: boundedEnumMillisecond,
    showMillisecond: showMillisecond
};
