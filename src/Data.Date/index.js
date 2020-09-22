const control = require("../control");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let data = require("../data");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");


function refEq(r1) {
	return function (r2) {
		return r1 === r2;
	};
}

let eqIntImpl = refEq;


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

let eqInt = new Eq(eqIntImpl);


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

let showYear = new Data_Show.Show(function (v) {
    return "(Year " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let showWeekday = new Data_Show.Show(function (v) {
    if (v instanceof Monday) {
        return "Monday";
    };
    if (v instanceof Tuesday) {
        return "Tuesday";
    };
    if (v instanceof Wednesday) {
        return "Wednesday";
    };
    if (v instanceof Thursday) {
        return "Thursday";
    };
    if (v instanceof Friday) {
        return "Friday";
    };
    if (v instanceof Saturday) {
        return "Saturday";
    };
    if (v instanceof Sunday) {
        return "Sunday";
    };
    throw new Error("Failed pattern match at Data.Date.Component (line 184, column 1 - line 191, column 25): " + [ v.constructor.name ]);
});
let showMonth = new Data_Show.Show(function (v) {
    if (v instanceof January) {
        return "January";
    };
    if (v instanceof February) {
        return "February";
    };
    if (v instanceof March) {
        return "March";
    };
    if (v instanceof April) {
        return "April";
    };
    if (v instanceof May) {
        return "May";
    };
    if (v instanceof June) {
        return "June";
    };
    if (v instanceof July) {
        return "July";
    };
    if (v instanceof August) {
        return "August";
    };
    if (v instanceof September) {
        return "September";
    };
    if (v instanceof October) {
        return "October";
    };
    if (v instanceof November) {
        return "November";
    };
    if (v instanceof December) {
        return "December";
    };
    throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [ v.constructor.name ]);
});
let showDay = new Data_Show.Show(function (v) {
    return "(Day " + (Data_Show.show(Data_Show.showInt)(v) + ")");
});
let ordYear = Data_Ord.ordInt;
let ordDay = Data_Ord.ordInt;
let eqYear = eqInt;
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
let eqDay = eqInt;
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


let apply = function (dict) {
	return dict.apply;
};


let createDate = function (y, m, d) {
	let date = new Date(Date.UTC(y, m, d));
	if (y >= 0 && y < 100) {
		date.setUTCFullYear(y);
	}
	return date;
};

let canonicalDateImpl = function (ctor, y, m, d) {
	let date = createDate(y, m - 1, d);
	return ctor(date.getUTCFullYear())(date.getUTCMonth() + 1)(date.getUTCDate());
};

let calcWeekday = function (y, m, d) {
	return createDate(y, m - 1, d).getUTCDay();
};

let calcDiff = function (y1, m1, d1, y2, m2, d2) {
	let dt1 = createDate(y1, m1 - 1, d1);
	let dt2 = createDate(y2, m2 - 1, d2);
	return dt1.getTime() - dt2.getTime();
};



let fromNumberImpl = function (just) {
	return function (nothing) {
		return function (n) {
			return (n | 0) === n ? just(n) : nothing;
		};
	};
};

let fromNumber = fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);


let $$Date = (() => {
	function $$Date(value0, value1, value2) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
	};
	$$Date.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return new $$Date(value0, value1, value2);
			};
		};
	};
	return $$Date;
})();
let year = function (v) {
	return v.value0;
};

let weekday = function (v) {
	let n = calcWeekday(v.value0, Data_Enum.fromEnum(boundedEnumMonth)(v.value1), v.value2);
	let $41 = n === 0;
	if ($41) {
		return Data_Maybe.fromJust()(Data_Enum.toEnum(boundedEnumWeekday)(7));
	};
	return Data_Maybe.fromJust()(Data_Enum.toEnum(boundedEnumWeekday)(n));
};
let showDate = new Data_Show.Show(function (v) {
	return "(Date " + (Data_Show.show(showYear)(v.value0) + (" " + (Data_Show.show(showMonth)(v.value1) + (" " + (Data_Show.show(showDay)(v.value2) + ")")))));
});

let month = function (v) {
	return v.value1;
};
let isLeapYear = function (y) {
	let y$prime = Data_Enum.fromEnum(boundedEnumYear)(y);
	return data.mod(data.euclideanRingInt)(y$prime)(4) === 0 && (data.mod(data.euclideanRingInt)(y$prime)(400) === 0 || !(data.mod(data.euclideanRingInt)(y$prime)(100) === 0));
};
let lastDayOfMonth = function (y) {
	return function (m) {
		let unsafeDay = (() => {
			let $108 = Data_Maybe.fromJust();
			let $109 = Data_Enum.toEnum(boundedEnumDay);
			return function ($110) {
				return $108($109($110));
			};
		})();
		if (m instanceof January) {
			return unsafeDay(31);
		};
		if (m instanceof February) {
			if (isLeapYear(y)) {
				return unsafeDay(29);
			};
			if (true) {
				return unsafeDay(28);
			};
		};
		if (m instanceof March) {
			return unsafeDay(31);
		};
		if (m instanceof April) {
			return unsafeDay(30);
		};
		if (m instanceof May) {
			return unsafeDay(31);
		};
		if (m instanceof June) {
			return unsafeDay(30);
		};
		if (m instanceof July) {
			return unsafeDay(31);
		};
		if (m instanceof August) {
			return unsafeDay(31);
		};
		if (m instanceof September) {
			return unsafeDay(30);
		};
		if (m instanceof October) {
			return unsafeDay(31);
		};
		if (m instanceof November) {
			return unsafeDay(30);
		};
		if (m instanceof December) {
			return unsafeDay(31);
		};
		throw new Error("Failed pattern match at Data.Date (line 127, column 22 - line 141, column 27): " + [m.constructor.name]);
	};
};
let eqDate = new Eq(function (x) {
	return function (y) {
		return eq(eqYear)(x.value0)(y.value0) && eq(eqMonth)(x.value1)(y.value1) && eq(eqDay)(x.value2)(y.value2);
	};
});
let ordDate = new Data_Ord.Ord(() => {
	return eqDate;
}, function (x) {
	return function (y) {
		let v = Data_Ord.compare(ordYear)(x.value0)(y.value0);
		if (v instanceof Data_Ordering.LT) {
			return Data_Ordering.LT.value;
		};
		if (v instanceof Data_Ordering.GT) {
			return Data_Ordering.GT.value;
		};
		let v1 = Data_Ord.compare(ordMonth)(x.value1)(y.value1);
		if (v1 instanceof Data_Ordering.LT) {
			return Data_Ordering.LT.value;
		};
		if (v1 instanceof Data_Ordering.GT) {
			return Data_Ordering.GT.value;
		};
		return Data_Ord.compare(ordDay)(x.value2)(y.value2);
	};
});
let enumDate = new Data_Enum.Enum(() => {
	return ordDate;
}, function (v) {
	let pm = Data_Enum.pred(enumMonth)(v.value1);
	let pd = Data_Enum.pred(enumDay)(v.value2);
	let y$prime = (() => {
		let $73 = Data_Maybe.isNothing(pd) && Data_Maybe.isNothing(pm);
		if ($73) {
			return Data_Enum.pred(enumYear)(v.value0);
		};
		return new Data_Maybe.Just(v.value0);
	})();
	let m$prime = (() => {
		let $74 = Data_Maybe.isNothing(pd);
		if ($74) {
			return Data_Maybe.fromMaybe(December.value)(pm);
		};
		return v.value1;
	})();
	let l = lastDayOfMonth(v.value0)(m$prime);
	let d$prime = (() => {
		let $75 = Data_Maybe.isNothing(pd);
		if ($75) {
			return new Data_Maybe.Just(l);
		};
		return pd;
	})();
	return apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(data.map(Data_Maybe.functorMaybe)($$Date.create)(y$prime))(control.pure(Data_Maybe.applicativeMaybe)(m$prime)))(d$prime);
}, function (v) {
	let sm = Data_Enum.succ(enumMonth)(v.value1);
	let l = lastDayOfMonth(v.value0)(v.value1);
	let sd = (() => {
		let v1 = Data_Enum.succ(enumDay)(v.value2);
		let $80 = Data_Ord.greaterThan(Data_Maybe.ordMaybe(ordDay))(v1)(new Data_Maybe.Just(l));
		if ($80) {
			return Data_Maybe.Nothing.value;
		};
		return v1;
	})();
	let m$prime = (() => {
		let $81 = Data_Maybe.isNothing(sd);
		if ($81) {
			return Data_Maybe.fromMaybe(January.value)(sm);
		};
		return v.value1;
	})();
	let y$prime = (() => {
		let $82 = Data_Maybe.isNothing(sd) && Data_Maybe.isNothing(sm);
		if ($82) {
			return Data_Enum.succ(enumYear)(v.value0);
		};
		return new Data_Maybe.Just(v.value0);
	})();
	let d$prime = (() => {
		let $83 = Data_Maybe.isNothing(sd);
		if ($83) {
			return Data_Enum.toEnum(boundedEnumDay)(1);
		};
		return sd;
	})();
	return apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(data.map(Data_Maybe.functorMaybe)($$Date.create)(y$prime))(control.pure(Data_Maybe.applicativeMaybe)(m$prime)))(d$prime);
});

let toDuration = function (dict) {
    return dict.toDuration;
};


let diff = function (dictDuration) {
	return function (v) {
		return function (v1) {
			return toDuration(dictDuration)(calcDiff(v.value0, Data_Enum.fromEnum(boundedEnumMonth)(v.value1), v.value2, v1.value0, Data_Enum.fromEnum(boundedEnumMonth)(v1.value1), v1.value2));
		};
	};
};
let day = function (v) {
	return v.value2;
};
let canonicalDate = function (y) {
	return function (m) {
		return function (d) {
			let mkDate = function (y$prime) {
				return function (m$prime) {
					return function (d$prime) {
						return new $$Date(y$prime, Data_Maybe.fromJust()(Data_Enum.toEnum(boundedEnumMonth)(m$prime)), d$prime);
					};
				};
			};
			return canonicalDateImpl(mkDate, y, Data_Enum.fromEnum(boundedEnumMonth)(m), d);
		};
	};
};
let exactDate = function (y) {
	return function (m) {
		return function (d) {
			let dt = new $$Date(y, m, d);
			let $99 = eq(eqDate)(canonicalDate(y)(m)(d))(dt);
			if ($99) {
				return new Data_Maybe.Just(dt);
			};
			return Data_Maybe.Nothing.value;
		};
	};
};
let boundedDate = new Data_Bounded.Bounded(() => {
	return ordDate;
}, new $$Date(Data_Bounded.bottom(boundedYear), Data_Bounded.bottom(boundedMonth), Data_Bounded.bottom(boundedDay)), new $$Date(Data_Bounded.top(boundedYear), Data_Bounded.top(boundedMonth), Data_Bounded.top(boundedDay)));
let adjust = function (v) {
	return function (date) {
		let adj = function (v1) {
			return function (v2) {
				if (v1 === 0) {
					return new Data_Maybe.Just(v2);
				};
				let j = v1 + Data_Enum.fromEnum(boundedEnumDay)(v2.value2) | 0;
				let low = j < 1;
				let l = lastDayOfMonth(v2.value0)((() => {
					if (low) {
						return Data_Maybe.fromMaybe(December.value)(Data_Enum.pred(enumMonth)(v2.value1));
					};
					return v2.value1;
				})());
				let hi = j > Data_Enum.fromEnum(boundedEnumDay)(l);
				let i$prime = (() => {
					if (low) {
						return j;
					};
					if (hi) {
						return (j - Data_Enum.fromEnum(boundedEnumDay)(l) | 0) - 1 | 0;
					};
					if (true) {
						return 0;
					};
					throw new Error("Failed pattern match at Data.Date (line 101, column 9 - line 103, column 28): " + []);
				})();
				let dt$prime = (() => {
					if (low) {
						return control.bindFlipped(Data_Maybe.bindMaybe)(Data_Enum.pred(enumDate))(data.map(Data_Maybe.functorMaybe)($$Date.create(v2.value0)(v2.value1))(Data_Enum.toEnum(boundedEnumDay)(1)));
					};
					if (hi) {
						return Data_Enum.succ(enumDate)(new $$Date(v2.value0, v2.value1, l));
					};
					if (true) {
						return data.map(Data_Maybe.functorMaybe)($$Date.create(v2.value0)(v2.value1))(Data_Enum.toEnum(boundedEnumDay)(j));
					};
					throw new Error("Failed pattern match at Data.Date (line 104, column 9 - line 106, column 48): " + []);
				})();
				return control.bindFlipped(Data_Maybe.bindMaybe)(adj(i$prime))(dt$prime);
			};
		};
		return control.bind(Data_Maybe.bindMaybe)(fromNumber(v))(data.flip(adj)(date));
	};
};

module.exports = {
	canonicalDate: canonicalDate,
	exactDate: exactDate,
	year: year,
	month: month,
	day: day,
	weekday: weekday,
	diff: diff,
	isLeapYear: isLeapYear,
	lastDayOfMonth: lastDayOfMonth,
	adjust: adjust,
	eqDate: eqDate,
	ordDate: ordDate,
	boundedDate: boundedDate,
	showDate: showDate,
	enumDate: enumDate
};
