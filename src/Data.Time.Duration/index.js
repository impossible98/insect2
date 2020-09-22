
const data = require("../data");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");

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

let Seconds = function (x) {
    return x;
};
let Minutes = function (x) {
    return x;
};
let Milliseconds = function (x) {
    return x;
};
let Hours = function (x) {
    return x;
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
let showSeconds = new Data_Show.Show(function (v) {
    return "(Seconds " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
let showMinutes = new Data_Show.Show(function (v) {
    return "(Minutes " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
let showMilliseconds = new Data_Show.Show(function (v) {
    return "(Milliseconds " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
let showHours = new Data_Show.Show(function (v) {
    return "(Hours " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
let showDays = new Data_Show.Show(function (v) {
    return "(Days " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
});
let semigroupSeconds = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});
let semigroupMinutes = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});
let semigroupMilliseconds = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});
let semigroupHours = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});
let semigroupDays = new Data_Semigroup.Semigroup(function (v) {
    return function (v1) {
        return v + v1;
    };
});
let ordSeconds = Data_Ord.ordNumber;
let ordMinutes = Data_Ord.ordNumber;
let ordMilliseconds = Data_Ord.ordNumber;
let ordHours = Data_Ord.ordNumber;
let ordDays = Data_Ord.ordNumber;
let newtypeSeconds = new Data_Newtype.Newtype(function (n) {
    return n;
}, Seconds);
let newtypeMinutes = new Data_Newtype.Newtype(function (n) {
    return n;
}, Minutes);
let newtypeMilliseconds = new Data_Newtype.Newtype(function (n) {
    return n;
}, Milliseconds);
let newtypeHours = new Data_Newtype.Newtype(function (n) {
    return n;
}, Hours);
let newtypeDays = new Data_Newtype.Newtype(function (n) {
    return n;
}, Days);
let monoidSeconds = new Data_Monoid.Monoid(function () {
    return semigroupSeconds;
}, 0.0);
let monoidMinutes = new Data_Monoid.Monoid(function () {
    return semigroupMinutes;
}, 0.0);
let monoidMilliseconds = new Data_Monoid.Monoid(function () {
    return semigroupMilliseconds;
}, 0.0);
let monoidHours = new Data_Monoid.Monoid(function () {
    return semigroupHours;
}, 0.0);
let monoidDays = new Data_Monoid.Monoid(function () {
    return semigroupDays;
}, 0.0);
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
let eqSeconds = data.eqNumber;
let eqMinutes = data.eqNumber;
let eqMilliseconds = data.eqNumber;
let eqHours = data.eqNumber;
let eqDays = data.eqNumber;
let durationSeconds = new Duration(Data_Newtype.over(newtypeSeconds)(newtypeMilliseconds)(Seconds)(function (v) {
    return v * 1000.0;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeSeconds)(Milliseconds)(function (v) {
    return v / 1000.0;
}));
let durationMinutes = new Duration(Data_Newtype.over(newtypeMinutes)(newtypeMilliseconds)(Minutes)(function (v) {
    return v * 60000.0;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeMinutes)(Milliseconds)(function (v) {
    return v / 60000.0;
}));
let durationMilliseconds = new Duration(identity(categoryFn), identity(categoryFn));
let durationHours = new Duration(Data_Newtype.over(newtypeHours)(newtypeMilliseconds)(Hours)(function (v) {
    return v * 3600000.0;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeHours)(Milliseconds)(function (v) {
    return v / 3600000.0;
}));
let durationDays = new Duration(Data_Newtype.over(newtypeDays)(newtypeMilliseconds)(Days)(function (v) {
    return v * 8.64e7;
}), Data_Newtype.over(newtypeMilliseconds)(newtypeDays)(Milliseconds)(function (v) {
    return v / 8.64e7;
}));
let convertDuration = function (dictDuration) {
    return function (dictDuration1) {
        let $60 = toDuration(dictDuration1);
        let $61 = fromDuration(dictDuration);
        return function ($62) {
            return $60($61($62));
        };
    };
};
module.exports = {
    fromDuration: fromDuration,
    toDuration: toDuration,
    Milliseconds: Milliseconds,
    Seconds: Seconds,
    Minutes: Minutes,
    Hours: Hours,
    Days: Days,
    Duration: Duration,
    convertDuration: convertDuration,
    negateDuration: negateDuration,
    newtypeMilliseconds: newtypeMilliseconds,
    eqMilliseconds: eqMilliseconds,
    ordMilliseconds: ordMilliseconds,
    semigroupMilliseconds: semigroupMilliseconds,
    monoidMilliseconds: monoidMilliseconds,
    showMilliseconds: showMilliseconds,
    newtypeSeconds: newtypeSeconds,
    eqSeconds: eqSeconds,
    ordSeconds: ordSeconds,
    semigroupSeconds: semigroupSeconds,
    monoidSeconds: monoidSeconds,
    showSeconds: showSeconds,
    newtypeMinutes: newtypeMinutes,
    eqMinutes: eqMinutes,
    ordMinutes: ordMinutes,
    semigroupMinutes: semigroupMinutes,
    monoidMinutes: monoidMinutes,
    showMinutes: showMinutes,
    newtypeHours: newtypeHours,
    eqHours: eqHours,
    ordHours: ordHours,
    semigroupHours: semigroupHours,
    monoidHours: monoidHours,
    showHours: showHours,
    newtypeDays: newtypeDays,
    eqDays: eqDays,
    ordDays: ordDays,
    semigroupDays: semigroupDays,
    monoidDays: monoidDays,
    showDays: showDays,
    durationMilliseconds: durationMilliseconds,
    durationSeconds: durationSeconds,
    durationMinutes: durationMinutes,
    durationHours: durationHours,
    durationDays: durationDays
};
