const control = require("../control");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Date = require("../Data.Date/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Time = require("../Data.Time/index.js");
let Data_Time_Component = require("../Data.Time.Component/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let Monday = (() => {
    function Monday() {

    };
    Monday.value = new Monday();
    return Monday;
})();
let Tuesday = (() => {
    function Tuesday() {

    };
    Tuesday.value = new Tuesday();
    return Tuesday;
})();
let Wednesday = (() => {
    function Wednesday() {

    };
    Wednesday.value = new Wednesday();
    return Wednesday;
})();
let Thursday = (() => {
    function Thursday() {

    };
    Thursday.value = new Thursday();
    return Thursday;
})();
let Friday = (() => {
    function Friday() {

    };
    Friday.value = new Friday();
    return Friday;
})();
let Saturday = (() => {
    function Saturday() {

    };
    Saturday.value = new Saturday();
    return Saturday;
})();
let Sunday = (() => {
    function Sunday() {

    };
    Sunday.value = new Sunday();
    return Sunday;
})();
let January = (() => {
    function January() {

    };
    January.value = new January();
    return January;
})();
let February = (() => {
    function February() {

    };
    February.value = new February();
    return February;
})();
let March = (() => {
    function March() {

    };
    March.value = new March();
    return March;
})();
let April = (() => {
    function April() {

    };
    April.value = new April();
    return April;
})();
let May = (() => {
    function May() {

    };
    May.value = new May();
    return May;
})();
let June = (() => {
    function June() {

    };
    June.value = new June();
    return June;
})();
let July = (() => {
    function July() {

    };
    July.value = new July();
    return July;
})();
let August = (() => {
    function August() {

    };
    August.value = new August();
    return August;
})();
let September = (() => {
    function September() {

    };
    September.value = new September();
    return September;
})();
let October = (() => {
    function October() {

    };
    October.value = new October();
    return October;
})();
let November = (() => {
    function November() {

    };
    November.value = new November();
    return November;
})();
let December = (() => {
    function December() {

    };
    December.value = new December();
    return December;
})();


let ordYear = Data_Ord.ordInt;
let ordDay = Data_Ord.ordInt;

let eqWeekday = new Eq(function (x) {
    return function (y) {
        if (x instanceof Monday && y instanceof Monday) {
            return true;
        };
        if (x instanceof Tuesday && y instanceof Tuesday) {
            return true;
        };
        if (x instanceof Wednesday && y instanceof Wednesday) {
            return true;
        };
        if (x instanceof Thursday && y instanceof Thursday) {
            return true;
        };
        if (x instanceof Friday && y instanceof Friday) {
            return true;
        };
        if (x instanceof Saturday && y instanceof Saturday) {
            return true;
        };
        if (x instanceof Sunday && y instanceof Sunday) {
            return true;
        };
        return false;
    };
});

let ordWeekday = new Data_Ord.Ord(() => {
    return eqWeekday;
}, function (x) {
    return function (y) {
        if (x instanceof Monday && y instanceof Monday) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof Monday) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof Monday) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof Tuesday && y instanceof Tuesday) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof Tuesday) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof Tuesday) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof Wednesday && y instanceof Wednesday) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof Wednesday) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof Wednesday) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof Thursday && y instanceof Thursday) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof Thursday) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof Thursday) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof Friday && y instanceof Friday) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof Friday) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof Friday) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof Saturday && y instanceof Saturday) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof Saturday) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof Saturday) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof Sunday && y instanceof Sunday) {
            return Data_Ordering.EQ.value;
        };
        throw new Error("Failed pattern match at Data.Date.Component (line 154, column 1 - line 154, column 42): " + [ x.constructor.name, y.constructor.name ]);
    };
});

let eqMonth = new Eq(function (x) {
    return function (y) {
        if (x instanceof January && y instanceof January) {
            return true;
        };
        if (x instanceof February && y instanceof February) {
            return true;
        };
        if (x instanceof March && y instanceof March) {
            return true;
        };
        if (x instanceof April && y instanceof April) {
            return true;
        };
        if (x instanceof May && y instanceof May) {
            return true;
        };
        if (x instanceof June && y instanceof June) {
            return true;
        };
        if (x instanceof July && y instanceof July) {
            return true;
        };
        if (x instanceof August && y instanceof August) {
            return true;
        };
        if (x instanceof September && y instanceof September) {
            return true;
        };
        if (x instanceof October && y instanceof October) {
            return true;
        };
        if (x instanceof November && y instanceof November) {
            return true;
        };
        if (x instanceof December && y instanceof December) {
            return true;
        };
        return false;
    };
});

let ordMonth = new Data_Ord.Ord(() => {
    return eqMonth;
}, function (x) {
    return function (y) {
        if (x instanceof January && y instanceof January) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof January) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof January) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof February && y instanceof February) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof February) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof February) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof March && y instanceof March) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof March) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof March) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof April && y instanceof April) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof April) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof April) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof May && y instanceof May) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof May) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof May) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof June && y instanceof June) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof June) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof June) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof July && y instanceof July) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof July) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof July) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof August && y instanceof August) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof August) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof August) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof September && y instanceof September) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof September) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof September) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof October && y instanceof October) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof October) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof October) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof November && y instanceof November) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof November) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof November) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof December && y instanceof December) {
            return Data_Ordering.EQ.value;
        };
        throw new Error("Failed pattern match at Data.Date.Component (line 61, column 1 - line 61, column 38): " + [ x.constructor.name, y.constructor.name ]);
    };
});

let boundedYear = new Data_Bounded.Bounded(() => {
    return ordYear;
}, -271820 | 0, 275759);
let boundedWeekday = new Data_Bounded.Bounded(() => {
    return ordWeekday;
}, Monday.value, Sunday.value);
let boundedMonth = new Data_Bounded.Bounded(() => {
    return ordMonth;
}, January.value, December.value);
let boundedEnumYear = new Data_Enum.BoundedEnum(() => {
    return boundedYear;
}, () => {
    return enumYear;
}, 547580, function (v) {
    return v;
}, function (n) {
    if (n >= (-271820 | 0) && n <= 275759) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Date.Component (line 35, column 1 - line 40, column 24): " + [ n.constructor.name ]);
});
let enumYear = new Data_Enum.Enum(() => {
    return ordYear;
}, (() => {
    let $46 = Data_Enum.toEnum(boundedEnumYear);
    let $47 = Data_Enum.fromEnum(boundedEnumYear);
    return function ($48) {
        return $46((function (v) {
            return v - 1 | 0;
        })($47($48)));
    };
})(), (() => {
    let $49 = Data_Enum.toEnum(boundedEnumYear);
    let $50 = Data_Enum.fromEnum(boundedEnumYear);
    return function ($51) {
        return $49((function (v) {
            return v + 1 | 0;
        })($50($51)));
    };
})());
let boundedEnumWeekday = new Data_Enum.BoundedEnum(() => {
    return boundedWeekday;
}, () => {
    return enumWeekday;
}, 7, function (v) {
    if (v instanceof Monday) {
        return 1;
    };
    if (v instanceof Tuesday) {
        return 2;
    };
    if (v instanceof Wednesday) {
        return 3;
    };
    if (v instanceof Thursday) {
        return 4;
    };
    if (v instanceof Friday) {
        return 5;
    };
    if (v instanceof Saturday) {
        return 6;
    };
    if (v instanceof Sunday) {
        return 7;
    };
    throw new Error("Failed pattern match at Data.Date.Component (line 175, column 14 - line 182, column 16): " + [ v.constructor.name ]);
}, function (v) {
    if (v === 1) {
        return new Data_Maybe.Just(Monday.value);
    };
    if (v === 2) {
        return new Data_Maybe.Just(Tuesday.value);
    };
    if (v === 3) {
        return new Data_Maybe.Just(Wednesday.value);
    };
    if (v === 4) {
        return new Data_Maybe.Just(Thursday.value);
    };
    if (v === 5) {
        return new Data_Maybe.Just(Friday.value);
    };
    if (v === 6) {
        return new Data_Maybe.Just(Saturday.value);
    };
    if (v === 7) {
        return new Data_Maybe.Just(Sunday.value);
    };
    return Data_Maybe.Nothing.value;
});
let enumWeekday = new Data_Enum.Enum(() => {
    return ordWeekday;
}, (() => {
    let $52 = Data_Enum.toEnum(boundedEnumWeekday);
    let $53 = Data_Enum.fromEnum(boundedEnumWeekday);
    return function ($54) {
        return $52((function (v) {
            return v - 1 | 0;
        })($53($54)));
    };
})(), (() => {
    let $55 = Data_Enum.toEnum(boundedEnumWeekday);
    let $56 = Data_Enum.fromEnum(boundedEnumWeekday);
    return function ($57) {
        return $55((function (v) {
            return v + 1 | 0;
        })($56($57)));
    };
})());
let boundedEnumMonth = new Data_Enum.BoundedEnum(() => {
    return boundedMonth;
}, () => {
    return enumMonth;
}, 12, function (v) {
    if (v instanceof January) {
        return 1;
    };
    if (v instanceof February) {
        return 2;
    };
    if (v instanceof March) {
        return 3;
    };
    if (v instanceof April) {
        return 4;
    };
    if (v instanceof May) {
        return 5;
    };
    if (v instanceof June) {
        return 6;
    };
    if (v instanceof July) {
        return 7;
    };
    if (v instanceof August) {
        return 8;
    };
    if (v instanceof September) {
        return 9;
    };
    if (v instanceof October) {
        return 10;
    };
    if (v instanceof November) {
        return 11;
    };
    if (v instanceof December) {
        return 12;
    };
    throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [ v.constructor.name ]);
}, function (v) {
    if (v === 1) {
        return new Data_Maybe.Just(January.value);
    };
    if (v === 2) {
        return new Data_Maybe.Just(February.value);
    };
    if (v === 3) {
        return new Data_Maybe.Just(March.value);
    };
    if (v === 4) {
        return new Data_Maybe.Just(April.value);
    };
    if (v === 5) {
        return new Data_Maybe.Just(May.value);
    };
    if (v === 6) {
        return new Data_Maybe.Just(June.value);
    };
    if (v === 7) {
        return new Data_Maybe.Just(July.value);
    };
    if (v === 8) {
        return new Data_Maybe.Just(August.value);
    };
    if (v === 9) {
        return new Data_Maybe.Just(September.value);
    };
    if (v === 10) {
        return new Data_Maybe.Just(October.value);
    };
    if (v === 11) {
        return new Data_Maybe.Just(November.value);
    };
    if (v === 12) {
        return new Data_Maybe.Just(December.value);
    };
    return Data_Maybe.Nothing.value;
});
let enumMonth = new Data_Enum.Enum(() => {
    return ordMonth;
}, (() => {
    let $58 = Data_Enum.toEnum(boundedEnumMonth);
    let $59 = Data_Enum.fromEnum(boundedEnumMonth);
    return function ($60) {
        return $58((function (v) {
            return v - 1 | 0;
        })($59($60)));
    };
})(), (() => {
    let $61 = Data_Enum.toEnum(boundedEnumMonth);
    let $62 = Data_Enum.fromEnum(boundedEnumMonth);
    return function ($63) {
        return $61((function (v) {
            return v + 1 | 0;
        })($62($63)));
    };
})());
let boundedDay = new Data_Bounded.Bounded(() => {
    return ordDay;
}, 1, 31);
let boundedEnumDay = new Data_Enum.BoundedEnum(() => {
    return boundedDay;
}, () => {
    return enumDay;
}, 31, function (v) {
    return v;
}, function (n) {
    if (n >= 1 && n <= 31) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.Date.Component (line 133, column 1 - line 138, column 23): " + [ n.constructor.name ]);
});
let enumDay = new Data_Enum.Enum(() => {
    return ordDay;
}, (() => {
    let $64 = Data_Enum.toEnum(boundedEnumDay);
    let $65 = Data_Enum.fromEnum(boundedEnumDay);
    return function ($66) {
        return $64((function (v) {
            return v - 1 | 0;
        })($65($66)));
    };
})(), (() => {
    let $67 = Data_Enum.toEnum(boundedEnumDay);
    let $68 = Data_Enum.fromEnum(boundedEnumDay);
    return function ($69) {
        return $67((function (v) {
            return v + 1 | 0;
        })($68($69)));
    };
})());



class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

function eq(dict) {
	return dict.eq;
}

function apply(dict) {
	return dict.apply;
}

function createUTC(y, mo, d, h, m, s, ms) {
	let date = new Date(Date.UTC(y, mo, d, h, m, s, ms));
	if (y >= 0 && y < 100) {
		date.setUTCFullYear(y);
	}
	return date.getTime();
}

function calcDiff(rec1, rec2) {
	let msUTC1 = createUTC(rec1.year, rec1.month - 1, rec1.day, rec1.hour, rec1.minute, rec1.second, rec1.millisecond);
	let msUTC2 = createUTC(rec2.year, rec2.month - 1, rec2.day, rec2.hour, rec2.minute, rec2.second, rec2.millisecond);
	return msUTC1 - msUTC2;
}

function adjustImpl(just) {
	return function (nothing) {
		return function (offset) {
			return function (rec) {
				let msUTC = createUTC(rec.year, rec.month - 1, rec.day, rec.hour, rec.minute, rec.second, rec.millisecond);
				let dt = new Date(msUTC + offset);
				return isNaN(dt.getTime()) ? nothing : just({
					year: dt.getUTCFullYear(),
					month: dt.getUTCMonth() + 1,
					day: dt.getUTCDate(),
					hour: dt.getUTCHours(),
					minute: dt.getUTCMinutes(),
					second: dt.getUTCSeconds(),
					millisecond: dt.getUTCMilliseconds()
				});
			};
		};
	};
}


let DateTime = (() => {
	function DateTime(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	DateTime.create = function (value0) {
		return function (value1) {
			return new DateTime(value0, value1);
		};
	};
	return DateTime;
})();

function toRecord(v) {
	return {
		year: Data_Enum.fromEnum(boundedEnumYear)(Data_Date.year(v.value0)),
		month: Data_Enum.fromEnum(boundedEnumMonth)(Data_Date.month(v.value0)),
		day: Data_Enum.fromEnum(boundedEnumDay)(Data_Date.day(v.value0)),
		hour: Data_Enum.fromEnum(Data_Time_Component.boundedEnumHour)(Data_Time.hour(v.value1)),
		minute: Data_Enum.fromEnum(Data_Time_Component.boundedEnumMinute)(Data_Time.minute(v.value1)),
		second: Data_Enum.fromEnum(Data_Time_Component.boundedEnumSecond)(Data_Time.second(v.value1)),
		millisecond: Data_Enum.fromEnum(Data_Time_Component.boundedEnumMillisecond)(Data_Time.millisecond(v.value1))
	};
}

function time(v) {
	return v.value1;
}

let showDateTime = new Data_Show.Show(function (v) {
	return "(DateTime " + (Data_Show.show(Data_Date.showDate)(v.value0) + (" " + (Data_Show.show(Data_Time.showTime)(v.value1) + ")")));
});

function modifyTimeF(dictFunctor) {
	return function (f) {
		return function (v) {
			return Data_Functor.map(dictFunctor)(DateTime.create(v.value0))(f(v.value1));
		};
	};
}

function modifyTime(f) {
	return function (v) {
		return new DateTime(v.value0, f(v.value1));
	};
}

function modifyDateF(dictFunctor) {
	return function (f) {
		return function (v) {
			return Data_Functor.map(dictFunctor)(Data_Functor.flip(DateTime.create)(v.value1))(f(v.value0));
		};
	};
}

function modifyDate(f) {
	return function (v) {
		return new DateTime(f(v.value0), v.value1);
	};
}

let eqDateTime = new Eq(function (x) {
	return function (y) {
		return eq(Data_Date.eqDate)(x.value0)(y.value0) && eq(Data_Time.eqTime)(x.value1)(y.value1);
	};
});

let ordDateTime = new Data_Ord.Ord(() => {
	return eqDateTime;
}, function (x) {
	return function (y) {
		let v = Data_Ord.compare(Data_Date.ordDate)(x.value0)(y.value0);
		if (v instanceof Data_Ordering.LT) {
			return Data_Ordering.LT.value;
		};
		if (v instanceof Data_Ordering.GT) {
			return Data_Ordering.GT.value;
		};
		return Data_Ord.compare(Data_Time.ordTime)(x.value1)(y.value1);
	};
});

function toDuration(dict) {
	return dict.toDuration;
}

function diff(dictDuration) {
	return function (dt1) {
		return function (dt2) {
			return toDuration(dictDuration)(calcDiff(toRecord(dt1), toRecord(dt2)));
		};
	};
}

function date(v) {
	return v.value0;
}

let boundedDateTime = new Data_Bounded.Bounded(() => {
	return ordDateTime;
}, new DateTime(Data_Bounded.bottom(Data_Date.boundedDate), Data_Bounded.bottom(Data_Time.boundedTime)), new DateTime(Data_Bounded.top(Data_Date.boundedDate), Data_Bounded.top(Data_Time.boundedTime)));


function fromDuration(dict) {
	return dict.fromDuration;
}

function adjust(dictDuration) {
	return function (d) {
		return function (dt) {
			return control.bind(Data_Maybe.bindMaybe)(adjustImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value)(fromDuration(dictDuration)(d))(toRecord(dt)))(function (rec) {
				return apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(DateTime.create)(control.join(Data_Maybe.bindMaybe)(apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Date.exactDate)(Data_Enum.toEnum(boundedEnumYear)(rec.year)))(Data_Enum.toEnum(boundedEnumMonth)(rec.month)))(Data_Enum.toEnum(boundedEnumDay)(rec.day)))))(apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Time.Time.create)(Data_Enum.toEnum(Data_Time_Component.boundedEnumHour)(rec.hour)))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMinute)(rec.minute)))(Data_Enum.toEnum(Data_Time_Component.boundedEnumSecond)(rec.second)))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMillisecond)(rec.millisecond)));
			});
		};
	};
}

module.exports = {
	DateTime: DateTime,
	date: date,
	modifyDate: modifyDate,
	modifyDateF: modifyDateF,
	time: time,
	modifyTime: modifyTime,
	modifyTimeF: modifyTimeF,
	adjust: adjust,
	diff: diff,
	eqDateTime: eqDateTime,
	ordDateTime: ordDateTime,
	boundedDateTime: boundedDateTime,
	showDateTime: showDateTime
};
