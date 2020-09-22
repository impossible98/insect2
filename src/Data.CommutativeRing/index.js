const data = require("../data");


let CommutativeRingRecord = function (RingRecord0) {
    this.RingRecord0 = RingRecord0;
};
let CommutativeRing = function (Ring0) {
    this.Ring0 = Ring0;
};
let commutativeRingUnit = new CommutativeRing(function () {
    return data.ringUnit;
});
let commutativeRingRecordNil = new CommutativeRingRecord(function () {
    return data.ringRecordNil;
});
let commutativeRingRecordCons = function (dictIsSymbol) {
    return function (dictCons) {
        return function (dictCommutativeRingRecord) {
            return function (dictCommutativeRing) {
                return new CommutativeRingRecord(function () {
                    return data.ringRecordCons(dictIsSymbol)()(dictCommutativeRingRecord.RingRecord0())(dictCommutativeRing.Ring0());
                });
            };
        };
    };
};
let commutativeRingRecord = function (dictRowToList) {
    return function (dictCommutativeRingRecord) {
        return new CommutativeRing(function () {
            return data.ringRecord()(dictCommutativeRingRecord.RingRecord0());
        });
    };
};
let commutativeRingNumber = new CommutativeRing(function () {
    return data.ringNumber;
});
let commutativeRingInt = new CommutativeRing(function () {
    return data.ringInt;
});
let commutativeRingFn = function (dictCommutativeRing) {
    return new CommutativeRing(function () {
        return data.ringFn(dictCommutativeRing.Ring0());
    });
};
module.exports = {
    CommutativeRing: CommutativeRing,
    CommutativeRingRecord: CommutativeRingRecord,
    commutativeRingInt: commutativeRingInt,
    commutativeRingNumber: commutativeRingNumber,
    commutativeRingUnit: commutativeRingUnit,
    commutativeRingFn: commutativeRingFn,
    commutativeRingRecord: commutativeRingRecord,
    commutativeRingRecordNil: commutativeRingRecordNil,
    commutativeRingRecordCons: commutativeRingRecordCons
};
