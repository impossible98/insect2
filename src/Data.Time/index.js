let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Time_Component = require("../Data.Time.Component/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let data = require("../data");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

function eq(dict) {
	return dict.eq;
}


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

function identity(dict) {
	return dict.identity;
}

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(function () {
	return semigroupoidFn;
}, function (x) {
	return x;
});

let apply = function (dict) {
	return dict.apply;
};

let Days = function (x) {
    return x;
};
let Duration = function (fromDuration, toDuration) {
    this.fromDuration = fromDuration;
    this.toDuration = toDuration;
};

let toDuration = function (dict) {
    return dict.toDuration;
};

let semigroupMilliseconds = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});

let semigroupDays = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});

let ordMilliseconds = Data_Ord.ordNumber;

let newtypeMilliseconds = new Data_Newtype.Newtype(function (n) {
    return n;
}, Milliseconds);

let newtypeDays = new Data_Newtype.Newtype(function (n) {
    return n;
}, Days);

let fromDuration = function (dict) {
    return dict.fromDuration;
};
let negateDuration = function (dictDuration) {
    let $56 = toDuration(dictDuration);
    let $57 = Data_Newtype.over(newtypeMilliseconds)(newtypeMilliseconds)(Milliseconds)(data.negate(data.ringNumber));
    let $58 = fromDuration(dictDuration);
    return function ($59) {
        return $56($57($58($59)));
    };
};

let durationMilliseconds = new Duration(identity(categoryFn), identity(categoryFn));

let durationDays = new Duration(Data_Newtype.over(newtypeDays)(newtypeMilliseconds)(Days)(function (v) {
    return v * 8.64e7;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeDays)(Milliseconds)(function (v) {
    return v / 8.64e7;
}));




let fromNumberImpl = function (just) {
	return function (nothing) {
		return function (n) {
			return (n | 0) === n ? just(n) : nothing;
		};
	};
};

let toNumber = function (n) {
	return n;
};



let fromNumber = fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let unsafeClamp = function (x) {
	if (x === Infinity) {
		return 0;
	};
	if (x === -Infinity) {
		return 0;
	};
	if (x >= toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
		return Data_Bounded.top(Data_Bounded.boundedInt);
	};
	if (x <= toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
		return Data_Bounded.bottom(Data_Bounded.boundedInt);
	};
	if (true) {
		return Data_Maybe.fromMaybe(0)(fromNumber(x));
	};
	throw new Error("Failed pattern match at Data.Int (line 66, column 1 - line 66, column 29): " + [x.constructor.name]);
};

let floor = function ($24) {
	return unsafeClamp(Math.floor($24));
};


let Time = (function () {
    function Time(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Time.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Time(value0, value1, value2, value3);
                };
            };
        };
    };
    return Time;
})();
let showTime = new Data_Show.Show(function (v) {
    return "(Time " + (Data_Show.show(Data_Time_Component.showHour)(v.value0) + (" " + (Data_Show.show(Data_Time_Component.showMinute)(v.value1) + (" " + (Data_Show.show(Data_Time_Component.showSecond)(v.value2) + (" " + (Data_Show.show(Data_Time_Component.showMillisecond)(v.value3) + ")")))))));
});
let setSecond = function (s) {
    return function (v) {
        return new Time(v.value0, v.value1, s, v.value3);
    };
};
let setMinute = function (m) {
    return function (v) {
        return new Time(v.value0, m, v.value2, v.value3);
    };
};
let setMillisecond = function (ms) {
    return function (v) {
        return new Time(v.value0, v.value1, v.value2, ms);
    };
};
let setHour = function (h) {
    return function (v) {
        return new Time(h, v.value1, v.value2, v.value3);
    };
};
let second = function (v) {
    return v.value2;
};
let minute = function (v) {
    return v.value1;
};
let millisecond = function (v) {
    return v.value3;
};
let millisToTime = function (v) {
    let hours = Math.floor(v / 3600000.0);
    let minutes = Math.floor((v - hours * 3600000.0) / 60000.0);
    let seconds = Math.floor((v - (hours * 3600000.0 + minutes * 60000.0)) / 1000.0);
    let milliseconds = v - (hours * 3600000.0 + minutes * 60000.0 + seconds * 1000.0);
    return Data_Maybe.fromJust()(apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(Time.create)(Data_Enum.toEnum(Data_Time_Component.boundedEnumHour)(floor(hours))))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMinute)(floor(minutes))))(Data_Enum.toEnum(Data_Time_Component.boundedEnumSecond)(floor(seconds))))(Data_Enum.toEnum(Data_Time_Component.boundedEnumMillisecond)(floor(milliseconds))));
};
let hour = function (v) {
    return v.value0;
};
let timeToMillis = function (t) {
    return Milliseconds(3600000.0 * toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumHour)(hour(t))) + 60000.0 * toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumMinute)(minute(t))) + 1000.0 * toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumSecond)(second(t))) + toNumber(Data_Enum.fromEnum(Data_Time_Component.boundedEnumMillisecond)(millisecond(t))));
};
let eqTime = new Eq(function (x) {
    return function (y) {
        return eq(Data_Time_Component.eqHour)(x.value0)(y.value0) && eq(Data_Time_Component.eqMinute)(x.value1)(y.value1) && eq(Data_Time_Component.eqSecond)(x.value2)(y.value2) && eq(Data_Time_Component.eqMillisecond)(x.value3)(y.value3);
    };
});
let ordTime = new Data_Ord.Ord(function () {
    return eqTime;
}, function (x) {
    return function (y) {
        let v = Data_Ord.compare(Data_Time_Component.ordHour)(x.value0)(y.value0);
        if (v instanceof Data_Ordering.LT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.GT) {
            return Data_Ordering.GT.value;
        };
        let v1 = Data_Ord.compare(Data_Time_Component.ordMinute)(x.value1)(y.value1);
        if (v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.LT.value;
        };
        if (v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.GT.value;
        };
        let v2 = Data_Ord.compare(Data_Time_Component.ordSecond)(x.value2)(y.value2);
        if (v2 instanceof Data_Ordering.LT) {
            return Data_Ordering.LT.value;
        };
        if (v2 instanceof Data_Ordering.GT) {
            return Data_Ordering.GT.value;
        };
        return Data_Ord.compare(Data_Time_Component.ordMillisecond)(x.value3)(y.value3);
    };
});
let diff = function (dictDuration) {
    return function (t1) {
        return function (t2) {
            return toDuration(dictDuration)(Data_Semigroup.append(semigroupMilliseconds)(timeToMillis(t1))(negateDuration(durationMilliseconds)(timeToMillis(t2))));
        };
    };
};
let boundedTime = new Data_Bounded.Bounded(function () {
    return ordTime;
}, new Time(Data_Bounded.bottom(Data_Time_Component.boundedHour), Data_Bounded.bottom(Data_Time_Component.boundedMinute), Data_Bounded.bottom(Data_Time_Component.boundedSecond), Data_Bounded.bottom(Data_Time_Component.boundedMillisecond)), new Time(Data_Bounded.top(Data_Time_Component.boundedHour), Data_Bounded.top(Data_Time_Component.boundedMinute), Data_Bounded.top(Data_Time_Component.boundedSecond), Data_Bounded.top(Data_Time_Component.boundedMillisecond)));
let maxTime = timeToMillis(Data_Bounded.top(boundedTime));
let minTime = timeToMillis(Data_Bounded.bottom(boundedTime));
let adjust = function (dictDuration) {
    return function (d) {
        return function (t) {
            let tLength = timeToMillis(t);
            let d$prime = fromDuration(dictDuration)(d);
            let wholeDays = Days(Math.floor(Data_Newtype.unwrap(newtypeMilliseconds)(d$prime) / 8.64e7));
            let msAdjust = Data_Semigroup.append(semigroupMilliseconds)(d$prime)(negateDuration(durationMilliseconds)(fromDuration(durationDays)(wholeDays)));
            let msAdjusted = Data_Semigroup.append(semigroupMilliseconds)(tLength)(msAdjust);
            let wrap = (function () {
                let $112 = Data_Ord.greaterThan(ordMilliseconds)(msAdjusted)(maxTime);
                if ($112) {
                    return 1.0;
                };
                let $113 = Data_Ord.lessThan(ordMilliseconds)(msAdjusted)(minTime);
                if ($113) {
                    return -1.0;
                };
                return 0.0;
            })();
            return new Data_Tuple.Tuple(Data_Semigroup.append(semigroupDays)(wholeDays)(wrap), millisToTime(Data_Semigroup.append(semigroupMilliseconds)(msAdjusted)(8.64e7 * -wrap)));
        };
    };
};

module.exports = {
    Time: Time,
    hour: hour,
    setHour: setHour,
    minute: minute,
    setMinute: setMinute,
    second: second,
    setSecond: setSecond,
    millisecond: millisecond,
    setMillisecond: setMillisecond,
    adjust: adjust,
    diff: diff,
    eqTime: eqTime,
    ordTime: ordTime,
    boundedTime: boundedTime,
    showTime: showTime
};
