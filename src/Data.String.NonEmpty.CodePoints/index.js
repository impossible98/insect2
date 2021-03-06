// Generated by purs version 0.13.6
"use strict";
let Data_Array_NonEmpty = require("../Data.Array.NonEmpty/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_String_CodePoints = require("../Data.String.CodePoints/index.js");
let Data_String_NonEmpty_Internal = require("../Data.String.NonEmpty.Internal/index.js");


function fromNonEmptyString(arg) {
	return arg;
}

function liftS(arg) {
	return arg;
}

function toNonEmptyString(arg) {
	return arg;
}


let snoc = function (c) {
    return function (s) {
        return toNonEmptyString(s + Data_String_CodePoints.singleton(c));
    };
};
let singleton = function ($12) {
    return toNonEmptyString(Data_String_CodePoints.singleton($12));
};

let takeWhile = function (f) {
    let $13 = liftS(Data_String_CodePoints.takeWhile(f));
    return function ($14) {
        return Data_String_NonEmpty_Internal.fromString($13($14));
    };
};
let lastIndexOf$prime = function (pat) {
    let $15 = Data_String_CodePoints["lastIndexOf'"](pat);
    return function ($16) {
        return liftS($15($16));
    };
};
let lastIndexOf = function ($17) {
    return liftS(Data_String_CodePoints.lastIndexOf($17));
};
let indexOf$prime = function (pat) {
    let $18 = Data_String_CodePoints["indexOf'"](pat);
    return function ($19) {
        return liftS($18($19));
    };
};
let indexOf = function ($20) {
    return liftS(Data_String_CodePoints.indexOf($20));
};

let length = function ($21) {
    return Data_String_CodePoints.length(fromNonEmptyString($21));
};
let splitAt = function (i) {
    return function (nes) {
        let v = Data_String_CodePoints.splitAt(i)(fromNonEmptyString(nes));
        return {
            before: Data_String_NonEmpty_Internal.fromString(v.before),
            after: Data_String_NonEmpty_Internal.fromString(v.after)
        };
    };
};
let take = function (i) {
    return function (nes) {
        let s = fromNonEmptyString(nes);
        let $9 = i < 1;
        if ($9) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(toNonEmptyString(Data_String_CodePoints.take(i)(s)));
    };
};
let toCodePointArray = function ($22) {
    return Data_String_CodePoints.toCodePointArray(fromNonEmptyString($22));
};
let toNonEmptyCodePointArray = (function () {
    let $23 = Data_Maybe.fromJust();
    return function ($24) {
        return $23(Data_Array_NonEmpty.fromArray(toCodePointArray($24)));
    };
})();
let uncons = function (nes) {
    let s = fromNonEmptyString(nes);
    return {
        head: Data_Maybe.fromJust()(Data_String_CodePoints.codePointAt(0)(s)),
        tail: Data_String_NonEmpty_Internal.fromString(Data_String_CodePoints.drop(1)(s))
    };
};
let fromFoldable1 = function (dictFoldable1) {
    return Data_Semigroup_Foldable.foldMap1(dictFoldable1)(Data_String_NonEmpty_Internal.semigroupNonEmptyString)(singleton);
};
let fromCodePointArray = function (v) {
    if (v.length === 0) {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just(toNonEmptyString(Data_String_CodePoints.fromCodePointArray(v)));
};
let fromNonEmptyCodePointArray = (function () {
    let $25 = Data_Maybe.fromJust();
    return function ($26) {
        return $25(fromCodePointArray(Data_Array_NonEmpty.toArray($26)));
    };
})();
let dropWhile = function (f) {
    let $27 = liftS(Data_String_CodePoints.dropWhile(f));
    return function ($28) {
        return Data_String_NonEmpty_Internal.fromString($27($28));
    };
};
let drop = function (i) {
    return function (nes) {
        let s = fromNonEmptyString(nes);
        let $11 = i >= Data_String_CodePoints.length(s);
        if ($11) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(toNonEmptyString(Data_String_CodePoints.drop(i)(s)));
    };
};
let countPrefix = function ($29) {
    return liftS(Data_String_CodePoints.countPrefix($29));
};
let cons = function (c) {
    return function (s) {
        return toNonEmptyString(Data_String_CodePoints.singleton(c) + s);
    };
};
let codePointAt = function ($30) {
    return liftS(Data_String_CodePoints.codePointAt($30));
};
module.exports = {
    fromCodePointArray: fromCodePointArray,
    fromNonEmptyCodePointArray: fromNonEmptyCodePointArray,
    singleton: singleton,
    cons: cons,
    snoc: snoc,
    fromFoldable1: fromFoldable1,
    toCodePointArray: toCodePointArray,
    toNonEmptyCodePointArray: toNonEmptyCodePointArray,
    codePointAt: codePointAt,
    indexOf: indexOf,
    "indexOf'": indexOf$prime,
    lastIndexOf: lastIndexOf,
    "lastIndexOf'": lastIndexOf$prime,
    uncons: uncons,
    length: length,
    take: take,
    takeWhile: takeWhile,
    drop: drop,
    dropWhile: dropWhile,
    countPrefix: countPrefix,
    splitAt: splitAt
};
