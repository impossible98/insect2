const data = require("../data");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let numAdd = function (n1) {
	return function (n2) {
		return n1 + n2;
	};
};

let numMul = function (n1) {
	return function (n2) {
		return n1 * n2;
	};
};

let semiringNumber = new Semiring(numAdd, numMul, 1.0, 0.0);

let addRecord = function (dict) {
	return dict.addRecord;
};

let add = function (dict) {
	return dict.add;
};


let Second = (function () {
	function Second() {

	};
	Second.value = new Second();
	return Second;
})();
let Minute = (function () {
	function Minute() {

	};
	Minute.value = new Minute();
	return Minute;
})();
let Hour = (function () {
	function Hour() {

	};
	Hour.value = new Hour();
	return Hour;
})();
let Day = (function () {
	function Day() {

	};
	Day.value = new Day();
	return Day;
})();
let Week = (function () {
	function Week() {

	};
	Week.value = new Week();
	return Week;
})();
let Month = (function () {
	function Month() {

	};
	Month.value = new Month();
	return Month;
})();
let Year = (function () {
	function Year() {

	};
	Year.value = new Year();
	return Year;
})();
let Duration = function (x) {
	return x;
};
let showDurationComponent = new Data_Show.Show(function (v) {
	if (v instanceof Minute) {
		return "Minute";
	};
	if (v instanceof Second) {
		return "Second";
	};
	if (v instanceof Hour) {
		return "Hour";
	};
	if (v instanceof Day) {
		return "Day";
	};
	if (v instanceof Week) {
		return "Week";
	};
	if (v instanceof Month) {
		return "Month";
	};
	if (v instanceof Year) {
		return "Year";
	};
	throw new Error("Failed pattern match at Data.Interval.Duration (line 38, column 1 - line 45, column 21): " + [v.constructor.name]);
});
let showDuration = new Data_Show.Show(function (v) {
	return "(Duration " + (Data_Show.show(Data_Map_Internal.showMap(showDurationComponent)(Data_Show.showNumber))(v) + ")");
});
let newtypeDuration = new Data_Newtype.Newtype(function (n) {
	return n;
}, Duration);
let eqDurationComponent = new data.Eq(function (x) {
	return function (y) {
		if (x instanceof Second && y instanceof Second) {
			return true;
		};
		if (x instanceof Minute && y instanceof Minute) {
			return true;
		};
		if (x instanceof Hour && y instanceof Hour) {
			return true;
		};
		if (x instanceof Day && y instanceof Day) {
			return true;
		};
		if (x instanceof Week && y instanceof Week) {
			return true;
		};
		if (x instanceof Month && y instanceof Month) {
			return true;
		};
		if (x instanceof Year && y instanceof Year) {
			return true;
		};
		return false;
	};
});
let ordDurationComponent = new Data_Ord.Ord(function () {
	return eqDurationComponent;
}, function (x) {
	return function (y) {
		if (x instanceof Second && y instanceof Second) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Second) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Second) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Minute && y instanceof Minute) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Minute) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Minute) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Hour && y instanceof Hour) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Hour) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Hour) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Day && y instanceof Day) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Day) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Day) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Week && y instanceof Week) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Week) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Week) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Month && y instanceof Month) {
			return Data_Ordering.EQ.value;
		};
		if (x instanceof Month) {
			return Data_Ordering.LT.value;
		};
		if (y instanceof Month) {
			return Data_Ordering.GT.value;
		};
		if (x instanceof Year && y instanceof Year) {
			return Data_Ordering.EQ.value;
		};
		throw new Error("Failed pattern match at Data.Interval.Duration (line 36, column 1 - line 36, column 62): " + [x.constructor.name, y.constructor.name]);
	};
});
let semigroupDuration = new Data_Semigroup.Semigroup(function (v) {
	return function (v1) {
		return Data_Map_Internal.unionWith(ordDurationComponent)(add(semiringNumber))(v)(v1);
	};
});
let monoidDuration = new Data_Monoid.Monoid(function () {
	return semigroupDuration;
}, Data_Monoid.mempty(Data_Map_Internal.monoidMap(ordDurationComponent)));
let eqDuration = new data.Eq(function (x) {
	return function (y) {
		return data.eq(Data_Map_Internal.eqMap(eqDurationComponent)(data.eqNumber))(x)(y);
	};
});
let ordDuration = new Data_Ord.Ord(function () {
	return eqDuration;
}, function (x) {
	return function (y) {
		return Data_Ord.compare(Data_Map_Internal.ordMap(ordDurationComponent)(Data_Ord.ordNumber))(x)(y);
	};
});
let durationFromComponent = function (k) {
	return function (v) {
		return Data_Map_Internal.singleton(k)(v);
	};
};
let hour = durationFromComponent(Hour.value);
let millisecond = (function () {
	let $32 = durationFromComponent(Second.value);
	return function ($33) {
		return $32((function (v) {
			return v / 1000.0;
		})($33));
	};
})();
let minute = durationFromComponent(Minute.value);
let month = durationFromComponent(Month.value);
let second = durationFromComponent(Second.value);
let week = durationFromComponent(Week.value);
let year = durationFromComponent(Year.value);
let day = durationFromComponent(Day.value);

module.exports = {
	Duration: Duration,
	Second: Second,
	Minute: Minute,
	Hour: Hour,
	Day: Day,
	Week: Week,
	Month: Month,
	Year: Year,
	year: year,
	month: month,
	week: week,
	day: day,
	hour: hour,
	minute: minute,
	second: second,
	millisecond: millisecond,
	eqDuration: eqDuration,
	ordDuration: ordDuration,
	newtypeDuration: newtypeDuration,
	showDuration: showDuration,
	semigroupDuration: semigroupDuration,
	monoidDuration: monoidDuration,
	eqDurationComponent: eqDurationComponent,
	ordDurationComponent: ordDurationComponent,
	showDurationComponent: showDurationComponent
};
