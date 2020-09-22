let control = require("../control");
let Data_Eq = require("../Data.Eq/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");


let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};


let NonEmptyString = function (x) {
    return x;
};
let NonEmptyReplacement = function (x) {
    return x;
};
let MakeNonEmpty = function (nes) {
    this.nes = nes;
};
let toUpper = function (v) {
    return Data_String_Common.toUpper(v);
};
let toString = function (v) {
    return v;
};
let toLower = function (v) {
    return Data_String_Common.toLower(v);
};
let showNonEmptyString = new Data_Show.Show(function (v) {
    return "(NonEmptyString.unsafeFromString " + (Data_Show.show(Data_Show.showString)(v) + ")");
});
let showNonEmptyReplacement = new Data_Show.Show(function (v) {
    return "(NonEmptyReplacement " + (Data_Show.show(showNonEmptyString)(v) + ")");
});
let semigroupNonEmptyString = Data_Semigroup.semigroupString;
let semigroupNonEmptyReplacement = semigroupNonEmptyString;
let replaceAll = function (pat) {
    return function (v) {
        return function (v1) {
            return Data_String_Common.replaceAll(pat)(v)(v1);
        };
    };
};
let replace = function (pat) {
    return function (v) {
        return function (v1) {
            return Data_String_Common.replace(pat)(v)(v1);
        };
    };
};
let prependString = function (s1) {
    return function (v) {
        return s1 + v;
    };
};
let ordNonEmptyString = Data_Ord.ordString;
let ordNonEmptyReplacement = ordNonEmptyString;
let nonEmptyNonEmpty = function (dictIsSymbol) {
    return new MakeNonEmpty(function (p) {
        return reflectSymbol(dictIsSymbol)(p);
    });
};
let nes = function (dict) {
    return dict.nes;
};
let makeNonEmptyBad = function (dictFail) {
    return new MakeNonEmpty(function (v) {
        return "";
    });
};
let localeCompare = function (v) {
    return function (v1) {
        return Data_String_Common.localeCompare(v)(v1);
    };
};
let liftS = function (f) {
    return function (v) {
        return f(v);
    };
};
let joinWith1 = function (dictFoldable1) {
    return function (v) {
        let $46 = Data_Foldable.intercalate(dictFoldable1.Foldable0())(Data_Monoid.monoidString)(v);
        return function ($47) {
            return NonEmptyString($46($47));
        };
    };
};
let joinWith = function (dictFoldable) {
    return function (splice) {
        let $48 = Data_Foldable.intercalate(dictFoldable)(Data_Monoid.monoidString)(splice);
        return function ($49) {
            return $48($49);
        };
    };
};
let join1With = function (dictFoldable1) {
    return function (splice) {
        let $50 = joinWith(dictFoldable1.Foldable0())(splice);
        return function ($51) {
            return NonEmptyString($50($51));
        };
    };
};
let fromString = function (v) {
    if (v === "") {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just(v);
};
let stripPrefix = function (pat) {
    return control.composeKleisliFlipped(Data_Maybe.bindMaybe)(fromString)(liftS(Data_String_CodeUnits.stripPrefix(pat)));
};
let stripSuffix = function (pat) {
    return control.composeKleisliFlipped(Data_Maybe.bindMaybe)(fromString)(liftS(Data_String_CodeUnits.stripSuffix(pat)));
};
let trim = function (v) {
    return fromString(Data_String_Common.trim(v));
};
let unsafeFromString = function (dictPartial) {
    let $52 = Data_Maybe.fromJust();
    return function ($53) {
        return $52(fromString($53));
    };
};
let eqNonEmptyString = Data_Eq.eqString;
let eqNonEmptyReplacement = eqNonEmptyString;
let contains = function ($54) {
    return liftS(Data_String_CodeUnits.contains($54));
};
let appendString = function (v) {
    return function (s2) {
        return v + s2;
    };
};
module.exports = {
    nes: nes,
    NonEmptyString: NonEmptyString,
    MakeNonEmpty: MakeNonEmpty,
    NonEmptyReplacement: NonEmptyReplacement,
    fromString: fromString,
    unsafeFromString: unsafeFromString,
    toString: toString,
    appendString: appendString,
    prependString: prependString,
    stripPrefix: stripPrefix,
    stripSuffix: stripSuffix,
    contains: contains,
    localeCompare: localeCompare,
    replace: replace,
    replaceAll: replaceAll,
    toLower: toLower,
    toUpper: toUpper,
    trim: trim,
    joinWith: joinWith,
    join1With: join1With,
    joinWith1: joinWith1,
    liftS: liftS,
    eqNonEmptyString: eqNonEmptyString,
    ordNonEmptyString: ordNonEmptyString,
    semigroupNonEmptyString: semigroupNonEmptyString,
    showNonEmptyString: showNonEmptyString,
    makeNonEmptyBad: makeNonEmptyBad,
    nonEmptyNonEmpty: nonEmptyNonEmpty,
    eqNonEmptyReplacement: eqNonEmptyReplacement,
    ordNonEmptyReplacement: ordNonEmptyReplacement,
    semigroupNonEmptyReplacement: semigroupNonEmptyReplacement,
    showNonEmptyReplacement: showNonEmptyReplacement
};
