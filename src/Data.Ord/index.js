let $foreign = require("./foreign.js");
const data = require("../data");
let Data_Ordering = require("../Data.Ordering/index.js");
const record = require("../record");
const type = require('../type');


let SProxy = (function () {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();

let reflectSymbol = function (dict) {
	return dict.reflectSymbol;
};


let zero = function (dict) {
	return dict.zero;
};


let one = function (dict) {
	return dict.one;
};

let OrdRecord = function (EqRecord0, compareRecord) {
    this.EqRecord0 = EqRecord0;
    this.compareRecord = compareRecord;
};
let Ord1 = function (Eq10, compare1) {
    this.Eq10 = Eq10;
    this.compare1 = compare1;
};
let Ord = function (Eq0, compare) {
    this.Eq0 = Eq0;
    this.compare = compare;
};
let ordVoid = new Ord(function () {
    return data.eqVoid;
}, function (v) {
    return function (v1) {
        return Data_Ordering.EQ.value;
    };
});
let ordUnit = new Ord(function () {
    return data.eqUnit;
}, function (v) {
    return function (v1) {
        return Data_Ordering.EQ.value;
    };
});
let ordString = new Ord(function () {
    return data.eqString;
}, $foreign.ordStringImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
let ordRecordNil = new OrdRecord(function () {
    return data.eqRowNil;
}, function (v) {
    return function (v1) {
        return function (v2) {
            return Data_Ordering.EQ.value;
        };
    };
});
let ordOrdering = new Ord(function () {
    return Data_Ordering.eqOrdering;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Ordering.LT && v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.EQ) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.GT && v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.EQ.value;
        };
        if (v instanceof Data_Ordering.LT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.LT) {
            return Data_Ordering.GT.value;
        };
        if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.GT) {
            return Data_Ordering.LT.value;
        };
        if (v instanceof Data_Ordering.GT) {
            return Data_Ordering.GT.value;
        };
        throw new Error("Failed pattern match at Data.Ord (line 112, column 1 - line 119, column 21): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let ordNumber = new Ord(function () {
    return data.eqNumber;
}, $foreign.ordNumberImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
let ordInt = new Ord(function () {
    return data.eqInt;
}, $foreign.ordIntImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
let ordChar = new Ord(function () {
    return data.eqChar;
}, $foreign.ordCharImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
let ordBoolean = new Ord(function () {
    return data.eqBoolean;
}, $foreign.ordBooleanImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value));
let compareRecord = function (dict) {
    return dict.compareRecord;
};
let ordRecord = function (dictRowToList) {
    return function (dictOrdRecord) {
        return new Ord(function () {
            return data.eqRec()(dictOrdRecord.EqRecord0());
        }, compareRecord(dictOrdRecord)(type.RLProxy.value));
    };
};
let compare1 = function (dict) {
    return dict.compare1;
};
let compare = function (dict) {
    return dict.compare;
};
let comparing = function (dictOrd) {
    return function (f) {
        return function (x) {
            return function (y) {
                return compare(dictOrd)(f(x))(f(y));
            };
        };
    };
};
let greaterThan = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            let v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.GT) {
                return true;
            };
            return false;
        };
    };
};
let greaterThanOrEq = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            let v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.LT) {
                return false;
            };
            return true;
        };
    };
};
let signum = function (dictOrd) {
    return function (dictRing) {
        return function (x) {
            let $43 = greaterThanOrEq(dictOrd)(x)(zero(dictRing.Semiring0()));
            if ($43) {
                return one(dictRing.Semiring0());
            };
            return data.negate(dictRing)(one(dictRing.Semiring0()));
        };
    };
};
let lessThan = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            let v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.LT) {
                return true;
            };
            return false;
        };
    };
};
let lessThanOrEq = function (dictOrd) {
    return function (a1) {
        return function (a2) {
            let v = compare(dictOrd)(a1)(a2);
            if (v instanceof Data_Ordering.GT) {
                return false;
            };
            return true;
        };
    };
};
let max = function (dictOrd) {
    return function (x) {
        return function (y) {
            let v = compare(dictOrd)(x)(y);
            if (v instanceof Data_Ordering.LT) {
                return y;
            };
            if (v instanceof Data_Ordering.EQ) {
                return x;
            };
            if (v instanceof Data_Ordering.GT) {
                return x;
            };
            throw new Error("Failed pattern match at Data.Ord (line 167, column 3 - line 170, column 12): " + [ v.constructor.name ]);
        };
    };
};
let min = function (dictOrd) {
    return function (x) {
        return function (y) {
            let v = compare(dictOrd)(x)(y);
            if (v instanceof Data_Ordering.LT) {
                return x;
            };
            if (v instanceof Data_Ordering.EQ) {
                return x;
            };
            if (v instanceof Data_Ordering.GT) {
                return y;
            };
            throw new Error("Failed pattern match at Data.Ord (line 158, column 3 - line 161, column 12): " + [ v.constructor.name ]);
        };
    };
};
let ordArray = function (dictOrd) {
    return new Ord(function () {
        return data.eqArray(dictOrd.Eq0());
    }, (function () {
        let toDelta = function (x) {
            return function (y) {
                let v = compare(dictOrd)(x)(y);
                if (v instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if (v instanceof Data_Ordering.LT) {
                    return 1;
                };
                if (v instanceof Data_Ordering.GT) {
                    return -1 | 0;
                };
                throw new Error("Failed pattern match at Data.Ord (line 65, column 7 - line 68, column 17): " + [ v.constructor.name ]);
            };
        };
        return function (xs) {
            return function (ys) {
                return compare(ordInt)(0)($foreign.ordArrayImpl(toDelta)(xs)(ys));
            };
        };
    })());
};
let ord1Array = new Ord1(function () {
    return data.eq1Array;
}, function (dictOrd) {
    return compare(ordArray(dictOrd));
});
let ordRecordCons = function (dictOrdRecord) {
    return function (dictCons) {
        return function (dictIsSymbol) {
            return function (dictOrd) {
                return new OrdRecord(function () {
                    return data.eqRowCons(dictOrdRecord.EqRecord0())()(dictIsSymbol)(dictOrd.Eq0());
                }, function (v) {
                    return function (ra) {
                        return function (rb) {
                            let key = reflectSymbol(dictIsSymbol)(SProxy.value);
                            let left = compare(dictOrd)(record.unsafeGet(key)(ra))(record.unsafeGet(key)(rb));
                            let $49 = data.notEq(Data_Ordering.eqOrdering)(left)(Data_Ordering.EQ.value);
                            if ($49) {
                                return left;
                            };
                            return compareRecord(dictOrdRecord)(type.RLProxy.value)(ra)(rb);
                        };
                    };
                });
            };
        };
    };
};
let clamp = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                return min(dictOrd)(hi)(max(dictOrd)(low)(x));
            };
        };
    };
};
let between = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                if (lessThan(dictOrd)(x)(low)) {
                    return false;
                };
                if (greaterThan(dictOrd)(x)(hi)) {
                    return false;
                };
                return true;
            };
        };
    };
};
let abs = function (dictOrd) {
    return function (dictRing) {
        return function (x) {
            let $53 = greaterThanOrEq(dictOrd)(x)(zero(dictRing.Semiring0()));
            if ($53) {
                return x;
            };
            return data.negate(dictRing)(x);
        };
    };
};

module.exports = {
    Ord: Ord,
    compare: compare,
    Ord1: Ord1,
    compare1: compare1,
    lessThan: lessThan,
    lessThanOrEq: lessThanOrEq,
    greaterThan: greaterThan,
    greaterThanOrEq: greaterThanOrEq,
    comparing: comparing,
    min: min,
    max: max,
    clamp: clamp,
    between: between,
    abs: abs,
    signum: signum,
    OrdRecord: OrdRecord,
    compareRecord: compareRecord,
    ordBoolean: ordBoolean,
    ordInt: ordInt,
    ordNumber: ordNumber,
    ordString: ordString,
    ordChar: ordChar,
    ordUnit: ordUnit,
    ordVoid: ordVoid,
    ordArray: ordArray,
    ordOrdering: ordOrdering,
    ord1Array: ord1Array,
    ordRecordNil: ordRecordNil,
    ordRecordCons: ordRecordCons,
    ordRecord: ordRecord
};
