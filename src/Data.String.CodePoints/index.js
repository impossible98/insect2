let $foreign = require("./foreign.js");

let Data_Array = require("../Data.Array/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let Data_String_Unsafe = require("../Data.String.Unsafe/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");


class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}


let toStringAs = function (radix) {
	return function (i) {
		return i.toString(radix);
	};
};

let CodePoint = function (x) {
    return x;
};
let unsurrogate = function (lead) {
    return function (trail) {
        return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
};
let showCodePoint = new Data_Show.Show(function (v) {
    return "(CodePoint 0x" + (Data_String_Common.toUpper(toStringAs(16)(v)) + ")");
});
let isTrail = function (cu) {
    return 56320 <= cu && cu <= 57343;
};
let isLead = function (cu) {
    return 55296 <= cu && cu <= 56319;
};
let uncons = function (s) {
    let v = Data_String_CodeUnits.length(s);
    if (v === 0) {
        return Data_Maybe.Nothing.value;
    };
    if (v === 1) {
        return new Data_Maybe.Just({
            head: Data_Enum.fromEnum(Data_Enum.boundedEnumChar)(Data_String_Unsafe.charAt(0)(s)),
            tail: ""
        });
    };
    let cu1 = Data_Enum.fromEnum(Data_Enum.boundedEnumChar)(Data_String_Unsafe.charAt(1)(s));
    let cu0 = Data_Enum.fromEnum(Data_Enum.boundedEnumChar)(Data_String_Unsafe.charAt(0)(s));
    let $21 = isLead(cu0) && isTrail(cu1);
    if ($21) {
        return new Data_Maybe.Just({
            head: unsurrogate(cu0)(cu1),
            tail: Data_String_CodeUnits.drop(2)(s)
        });
    };
    return new Data_Maybe.Just({
        head: cu0,
        tail: Data_String_CodeUnits.drop(1)(s)
    });
};
let unconsButWithTuple = function (s) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
        return new Data_Tuple.Tuple(v.head, v.tail);
    })(uncons(s));
};
let toCodePointArrayFallback = function (s) {
    return Data_Unfoldable.unfoldr(Data_Unfoldable.unfoldableArray)(unconsButWithTuple)(s);
};
let unsafeCodePointAt0Fallback = function (s) {
    let cu0 = Data_Enum.fromEnum(Data_Enum.boundedEnumChar)(Data_String_Unsafe.charAt(0)(s));
    let $25 = isLead(cu0) && Data_String_CodeUnits.length(s) > 1;
    if ($25) {
        let cu1 = Data_Enum.fromEnum(Data_Enum.boundedEnumChar)(Data_String_Unsafe.charAt(1)(s));
        let $26 = isTrail(cu1);
        if ($26) {
            return unsurrogate(cu0)(cu1);
        };
        return cu0;
    };
    return cu0;
};
let unsafeCodePointAt0 = $foreign["_unsafeCodePointAt0"](unsafeCodePointAt0Fallback);
let toCodePointArray = $foreign["_toCodePointArray"](toCodePointArrayFallback)(unsafeCodePointAt0);
let length = function ($52) {
    return Data_Array.length(toCodePointArray($52));
};
let lastIndexOf = function (p) {
    return function (s) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (i) {
            return length(Data_String_CodeUnits.take(i)(s));
        })(Data_String_CodeUnits.lastIndexOf(p)(s));
    };
};
let indexOf = function (p) {
    return function (s) {
        return Data_Functor.map(Data_Maybe.functorMaybe)(function (i) {
            return length(Data_String_CodeUnits.take(i)(s));
        })(Data_String_CodeUnits.indexOf(p)(s));
    };
};
let fromCharCode = (function () {
    let $53 = Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar));
    return function ($54) {
        return Data_String_CodeUnits.singleton($53($54));
    };
})();
let singletonFallback = function (v) {
    if (v <= 65535) {
        return fromCharCode(v);
    };
    let lead = Data_EuclideanRing.div(Data_EuclideanRing.euclideanRingInt)(v - 65536 | 0)(1024) + 55296 | 0;
    let trail = Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode(lead) + fromCharCode(trail);
};
let fromCodePointArray = $foreign["_fromCodePointArray"](singletonFallback);
let singleton = $foreign["_singleton"](singletonFallback);
let takeFallback = function (n) {
    return function (v) {
        if (n < 1) {
            return "";
        };
        let v1 = uncons(v);
        if (v1 instanceof Data_Maybe.Just) {
            return singleton(v1.value0.head) + takeFallback(n - 1 | 0)(v1.value0.tail);
        };
        return v;
    };
};
let take = $foreign["_take"](takeFallback);
let lastIndexOf$prime = function (p) {
    return function (i) {
        return function (s) {
            let i$prime = Data_String_CodeUnits.length(take(i)(s));
            return Data_Functor.map(Data_Maybe.functorMaybe)(function (k) {
                return length(Data_String_CodeUnits.take(k)(s));
            })(Data_String_CodeUnits["lastIndexOf'"](p)(i$prime)(s));
        };
    };
};
let splitAt = function (i) {
    return function (s) {
        let before = take(i)(s);
        return {
            before: before,
            after: Data_String_CodeUnits.drop(Data_String_CodeUnits.length(before))(s)
        };
    };
};
let eqCodePoint = new Eq(function (x) {
    return function (y) {
        return x === y;
    };
});
let ordCodePoint = new Data_Ord.Ord(function () {
    return eqCodePoint;
}, function (x) {
    return function (y) {
        return Data_Ord.compare(Data_Ord.ordInt)(x)(y);
    };
});
let drop = function (n) {
    return function (s) {
        return Data_String_CodeUnits.drop(Data_String_CodeUnits.length(take(n)(s)))(s);
    };
};
let indexOf$prime = function (p) {
    return function (i) {
        return function (s) {
            let s$prime = drop(i)(s);
            return Data_Functor.map(Data_Maybe.functorMaybe)(function (k) {
                return i + length(Data_String_CodeUnits.take(k)(s$prime)) | 0;
            })(Data_String_CodeUnits.indexOf(p)(s$prime));
        };
    };
};
let countTail = function ($copy_p) {
    return function ($copy_s) {
        return function ($copy_accum) {
            let $tco_var_p = $copy_p;
            let $tco_var_s = $copy_s;
            let $tco_done = false;
            let $tco_result;
            function $tco_loop(p, s, accum) {
                let v = uncons(s);
                if (v instanceof Data_Maybe.Just) {
                    let $39 = p(v.value0.head);
                    if ($39) {
                        $tco_var_p = p;
                        $tco_var_s = v.value0.tail;
                        $copy_accum = accum + 1 | 0;
                        return;
                    };
                    $tco_done = true;
                    return accum;
                };
                $tco_done = true;
                return accum;
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_p, $tco_var_s, $copy_accum);
            };
            return $tco_result;
        };
    };
};
let countFallback = function (p) {
    return function (s) {
        return countTail(p)(s)(0);
    };
};
let countPrefix = $foreign["_countPrefix"](countFallback)(unsafeCodePointAt0);
let dropWhile = function (p) {
    return function (s) {
        return drop(countPrefix(p)(s))(s);
    };
};
let takeWhile = function (p) {
    return function (s) {
        return take(countPrefix(p)(s))(s);
    };
};
let codePointFromChar = (function () {
    let $55 = Data_Enum.fromEnum(Data_Enum.boundedEnumChar);
    return function ($56) {
        return CodePoint($55($56));
    };
})();
let codePointAtFallback = function ($copy_n) {
    return function ($copy_s) {
        let $tco_var_n = $copy_n;
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(n, s) {
            let v = uncons(s);
            if (v instanceof Data_Maybe.Just) {
                let $44 = n === 0;
                if ($44) {
                    $tco_done = true;
                    return new Data_Maybe.Just(v.value0.head);
                };
                $tco_var_n = n - 1 | 0;
                $copy_s = v.value0.tail;
                return;
            };
            $tco_done = true;
            return Data_Maybe.Nothing.value;
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_n, $copy_s);
        };
        return $tco_result;
    };
};
let codePointAt = function (v) {
    return function (v1) {
        if (v < 0) {
            return Data_Maybe.Nothing.value;
        };
        if (v === 0 && v1 === "") {
            return Data_Maybe.Nothing.value;
        };
        if (v === 0) {
            return new Data_Maybe.Just(unsafeCodePointAt0(v1));
        };
        return $foreign["_codePointAt"](codePointAtFallback)(Data_Maybe.Just.create)(Data_Maybe.Nothing.value)(unsafeCodePointAt0)(v)(v1);
    };
};
let boundedCodePoint = new Data_Bounded.Bounded(function () {
    return ordCodePoint;
}, 0, 1114111);
let boundedEnumCodePoint = new Data_Enum.BoundedEnum(function () {
    return boundedCodePoint;
}, function () {
    return enumCodePoint;
}, 1114111 + 1 | 0, function (v) {
    return v;
}, function (n) {
    if (n >= 0 && n <= 1114111) {
        return new Data_Maybe.Just(n);
    };
    if (true) {
        return Data_Maybe.Nothing.value;
    };
    throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [ n.constructor.name ]);
});
let enumCodePoint = new Data_Enum.Enum(function () {
    return ordCodePoint;
}, Data_Enum.defaultPred(Data_Enum.toEnum(boundedEnumCodePoint))(Data_Enum.fromEnum(boundedEnumCodePoint)), Data_Enum.defaultSucc(Data_Enum.toEnum(boundedEnumCodePoint))(Data_Enum.fromEnum(boundedEnumCodePoint)));
module.exports = {
    codePointFromChar: codePointFromChar,
    singleton: singleton,
    fromCodePointArray: fromCodePointArray,
    toCodePointArray: toCodePointArray,
    codePointAt: codePointAt,
    uncons: uncons,
    length: length,
    countPrefix: countPrefix,
    indexOf: indexOf,
    "indexOf'": indexOf$prime,
    lastIndexOf: lastIndexOf,
    "lastIndexOf'": lastIndexOf$prime,
    take: take,
    takeWhile: takeWhile,
    drop: drop,
    dropWhile: dropWhile,
    splitAt: splitAt,
    eqCodePoint: eqCodePoint,
    ordCodePoint: ordCodePoint,
    showCodePoint: showCodePoint,
    boundedCodePoint: boundedCodePoint,
    enumCodePoint: enumCodePoint,
    boundedEnumCodePoint: boundedEnumCodePoint
};
