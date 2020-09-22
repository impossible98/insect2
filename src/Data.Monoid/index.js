const data = require("../data");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
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

let MonoidRecord = function (SemigroupRecord0, memptyRecord) {
    this.SemigroupRecord0 = SemigroupRecord0;
    this.memptyRecord = memptyRecord;
};
let Monoid = function (Semigroup0, mempty) {
    this.Semigroup0 = Semigroup0;
    this.mempty = mempty;
};
let monoidUnit = new Monoid(function () {
    return Data_Semigroup.semigroupUnit;
}, {});
let monoidString = new Monoid(function () {
    return Data_Semigroup.semigroupString;
}, "");
let monoidRecordNil = new MonoidRecord(function () {
    return Data_Semigroup.semigroupRecordNil;
}, function (v) {
    return {};
});
let monoidOrdering = new Monoid(function () {
    return Data_Ordering.semigroupOrdering;
}, Data_Ordering.EQ.value);
let monoidArray = new Monoid(function () {
    return Data_Semigroup.semigroupArray;
}, [  ]);
let memptyRecord = function (dict) {
    return dict.memptyRecord;
};
let monoidRecord = function (dictRowToList) {
    return function (dictMonoidRecord) {
        return new Monoid(function () {
            return Data_Semigroup.semigroupRecord()(dictMonoidRecord.SemigroupRecord0());
        }, memptyRecord(dictMonoidRecord)(type.RLProxy.value));
    };
};
let mempty = function (dict) {
    return dict.mempty;
};
let monoidFn = function (dictMonoid) {
    return new Monoid(function () {
        return Data_Semigroup.semigroupFn(dictMonoid.Semigroup0());
    }, function (v) {
        return mempty(dictMonoid);
    });
};
let monoidRecordCons = function (dictIsSymbol) {
    return function (dictMonoid) {
        return function (dictCons) {
            return function (dictMonoidRecord) {
                return new MonoidRecord(function () {
                    return Data_Semigroup.semigroupRecordCons(dictIsSymbol)()(dictMonoidRecord.SemigroupRecord0())(dictMonoid.Semigroup0());
                }, function (v) {
                    let tail = memptyRecord(dictMonoidRecord)(type.RLProxy.value);
                    let key = reflectSymbol(dictIsSymbol)(SProxy.value);
                    let insert = record.unsafeSet(key);
                    return insert(mempty(dictMonoid))(tail);
                });
            };
        };
    };
};
let power = function (dictMonoid) {
    return function (x) {
        let go = function (p) {
            if (p <= 0) {
                return mempty(dictMonoid);
            };
            if (p === 1) {
                return x;
            };
            if (data.mod(data.euclideanRingInt)(p)(2) === 0) {
                let x$prime = go(data.div(data.euclideanRingInt)(p)(2));
                return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x$prime);
            };
            if (true) {
                let x$prime = go(data.div(data.euclideanRingInt)(p)(2));
                return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x));
            };
            throw new Error("Failed pattern match at Data.Monoid (line 65, column 3 - line 65, column 17): " + [ p.constructor.name ]);
        };
        return go;
    };
};
let guard = function (dictMonoid) {
    return function (v) {
        return function (v1) {
            if (v) {
                return v1;
            };
            if (!v) {
                return mempty(dictMonoid);
            };
            throw new Error("Failed pattern match at Data.Monoid (line 73, column 1 - line 73, column 49): " + [ v.constructor.name, v1.constructor.name ]);
        };
    };
};
module.exports = {
    Monoid: Monoid,
    mempty: mempty,
    power: power,
    guard: guard,
    MonoidRecord: MonoidRecord,
    memptyRecord: memptyRecord,
    monoidUnit: monoidUnit,
    monoidOrdering: monoidOrdering,
    monoidFn: monoidFn,
    monoidString: monoidString,
    monoidArray: monoidArray,
    monoidRecord: monoidRecord,
    monoidRecordNil: monoidRecordNil,
    monoidRecordCons: monoidRecordCons
};
