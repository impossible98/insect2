let control = require("../control");
let Control_Plus = require("../Control.Plus/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Interval_Duration = require("../Data.Interval.Duration/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");


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



let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};



let semiringNumber = new Semiring(numAdd, numMul, 1.0, 0.0);


let IsEmpty = (function () {
    function IsEmpty() {

    };
    IsEmpty.value = new IsEmpty();
    return IsEmpty;
})();
let InvalidWeekComponentUsage = (function () {
    function InvalidWeekComponentUsage() {

    };
    InvalidWeekComponentUsage.value = new InvalidWeekComponentUsage();
    return InvalidWeekComponentUsage;
})();
let ContainsNegativeValue = (function () {
    function ContainsNegativeValue(value0) {
        this.value0 = value0;
    };
    ContainsNegativeValue.create = function (value0) {
        return new ContainsNegativeValue(value0);
    };
    return ContainsNegativeValue;
})();
let InvalidFractionalUse = (function () {
    function InvalidFractionalUse(value0) {
        this.value0 = value0;
    };
    InvalidFractionalUse.create = function (value0) {
        return new InvalidFractionalUse(value0);
    };
    return InvalidFractionalUse;
})();
let unIsoDuration = function (v) {
    return v;
};
let showIsoDuration = new Data_Show.Show(function (v) {
    return "(IsoDuration " + (Data_Show.show(Data_Interval_Duration.showDuration)(v) + ")");
});
let showError = new Data_Show.Show(function (v) {
    if (v instanceof IsEmpty) {
        return "(IsEmpty)";
    };
    if (v instanceof InvalidWeekComponentUsage) {
        return "(InvalidWeekComponentUsage)";
    };
    if (v instanceof ContainsNegativeValue) {
        return "(ContainsNegativeValue " + (Data_Show.show(Data_Interval_Duration.showDurationComponent)(v.value0) + ")");
    };
    if (v instanceof InvalidFractionalUse) {
        return "(InvalidFractionalUse " + (Data_Show.show(Data_Interval_Duration.showDurationComponent)(v.value0) + ")");
    };
    throw new Error("Failed pattern match at Data.Interval.Duration.Iso (line 43, column 1 - line 47, column 76): " + [ v.constructor.name ]);
});
let prettyError = function (v) {
    if (v instanceof IsEmpty) {
        return "Duration is empty (has no components)";
    };
    if (v instanceof InvalidWeekComponentUsage) {
        return "Week component of Duration is used with other components";
    };
    if (v instanceof ContainsNegativeValue) {
        return "Component `" + (Data_Show.show(Data_Interval_Duration.showDurationComponent)(v.value0) + "` contains negative value");
    };
    if (v instanceof InvalidFractionalUse) {
        return "Invalid usage of Fractional value at component `" + (Data_Show.show(Data_Interval_Duration.showDurationComponent)(v.value0) + "`");
    };
    throw new Error("Failed pattern match at Data.Interval.Duration.Iso (line 49, column 1 - line 49, column 31): " + [ v.constructor.name ]);
};
let eqIsoDuration = new Data_Eq.Eq(function (x) {
    return function (y) {
        return Data_Eq.eq(Data_Interval_Duration.eqDuration)(x)(y);
    };
});
let ordIsoDuration = new Data_Ord.Ord(function () {
    return eqIsoDuration;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Interval_Duration.ordDuration)(x)(y);
    };
});
let eqError = new Data_Eq.Eq(function (x) {
    return function (y) {
        if (x instanceof IsEmpty && y instanceof IsEmpty) {
            return true;
        };
        if (x instanceof InvalidWeekComponentUsage && y instanceof InvalidWeekComponentUsage) {
            return true;
        };
        if (x instanceof ContainsNegativeValue && y instanceof ContainsNegativeValue) {
            return Data_Eq.eq(Data_Interval_Duration.eqDurationComponent)(x.value0)(y.value0);
        };
        if (x instanceof InvalidFractionalUse && y instanceof InvalidFractionalUse) {
            return Data_Eq.eq(Data_Interval_Duration.eqDurationComponent)(x.value0)(y.value0);
        };
        return false;
    };
});
let ordError = new Data_Ord.Ord(function () {
    return eqError;
}, function (x) {
    return function (y) {
        if (x instanceof IsEmpty && y instanceof IsEmpty) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof IsEmpty) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof IsEmpty) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof InvalidWeekComponentUsage && y instanceof InvalidWeekComponentUsage) {
            return Data_Ordering.EQ.value;
        };
        if (x instanceof InvalidWeekComponentUsage) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof InvalidWeekComponentUsage) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof ContainsNegativeValue && y instanceof ContainsNegativeValue) {
            return Data_Ord.compare(Data_Interval_Duration.ordDurationComponent)(x.value0)(y.value0);
        };
        if (x instanceof ContainsNegativeValue) {
            return Data_Ordering.LT.value;
        };
        if (y instanceof ContainsNegativeValue) {
            return Data_Ordering.GT.value;
        };
        if (x instanceof InvalidFractionalUse && y instanceof InvalidFractionalUse) {
            return Data_Ord.compare(Data_Interval_Duration.ordDurationComponent)(x.value0)(y.value0);
        };
        throw new Error("Failed pattern match at Data.Interval.Duration.Iso (line 42, column 1 - line 42, column 38): " + [ x.constructor.name, y.constructor.name ]);
    };
});
let checkWeekUsage = function (v) {
    let $60 = Data_Maybe.isJust(Data_Map_Internal.lookup(Data_Interval_Duration.ordDurationComponent)(Data_Interval_Duration.Week.value)(v.asMap)) && Data_Map_Internal.size(v.asMap) > 1;
    if ($60) {
        return control.pure(Data_List_Types.applicativeList)(InvalidWeekComponentUsage.value);
    };
    return Control_Plus.empty(Data_List_Types.plusList);
};
let checkNegativeValues = function (v) {
    return Data_Functor.flip(Data_Foldable.foldMap(Data_List_Types.foldableList)(Data_List_Types.monoidList))(v.asList)(function (v1) {
        let $64 = v1.value1 >= 0.0;
        if ($64) {
            return Control_Plus.empty(Data_List_Types.plusList);
        };
        return control.pure(Data_List_Types.applicativeList)(new ContainsNegativeValue(v1.value0));
    });
};
let checkFractionalUse = function (v) {
    let isFractional = function (a) {
        return Math.floor(a) !== a;
    };
    let checkRest = function (rest) {
        return Data_Newtype.unwrap(Data_Newtype.newtypeAdditive)(Data_Foldable.foldMap(Data_List_Types.foldableList)(Data_Monoid_Additive.monoidAdditive(semiringNumber))(function ($81) {
            return Data_Monoid_Additive.Additive(Math.abs(Data_Tuple.snd($81)));
        })(rest)) > 0.0;
    };
    let v1 = (function (v2) {
        return v2.rest;
    })(Data_List.span((function () {
        let $82 = Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraFunction(Data_HeytingAlgebra.heytingAlgebraBoolean))(isFractional);
        return function ($83) {
            return $82(Data_Tuple.snd($83));
        };
    })())(v.asList));
    if (v1 instanceof Data_List_Types.Cons && checkRest(v1.value1)) {
        return control.pure(Data_List_Types.applicativeList)(new InvalidFractionalUse(v1.value0.value0));
    };
    return Control_Plus.empty(Data_List_Types.plusList);
};
let checkEmptiness = function (v) {
    let $76 = Data_List["null"](v.asList);
    if ($76) {
        return control.pure(Data_List_Types.applicativeList)(IsEmpty.value);
    };
    return Control_Plus.empty(Data_List_Types.plusList);
};
let checkValidIsoDuration = function (v) {
    let check = Data_Foldable.fold(Data_Foldable.foldableArray)(Data_Monoid.monoidFn(Data_List_Types.monoidList))([ checkWeekUsage, checkEmptiness, checkFractionalUse, checkNegativeValues ]);
    let asList = Data_List.reverse(Data_Map_Internal.toUnfoldable(Data_List_Types.unfoldableList)(v));
    return check({
        asList: asList,
        asMap: v
    });
};
let mkIsoDuration = function (d) {
    let v = Data_List_NonEmpty.fromList(checkValidIsoDuration(d));
    if (v instanceof Data_Maybe.Just) {
        return new Data_Either.Left(v.value0);
    };
    if (v instanceof Data_Maybe.Nothing) {
        return new Data_Either.Right(d);
    };
    throw new Error("Failed pattern match at Data.Interval.Duration.Iso (line 60, column 19 - line 62, column 35): " + [ v.constructor.name ]);
};

module.exports = {
    unIsoDuration: unIsoDuration,
    mkIsoDuration: mkIsoDuration,
    IsEmpty: IsEmpty,
    InvalidWeekComponentUsage: InvalidWeekComponentUsage,
    ContainsNegativeValue: ContainsNegativeValue,
    InvalidFractionalUse: InvalidFractionalUse,
    prettyError: prettyError,
    eqIsoDuration: eqIsoDuration,
    ordIsoDuration: ordIsoDuration,
    showIsoDuration: showIsoDuration,
    eqError: eqError,
    ordError: ordError,
    showError: showError
};
