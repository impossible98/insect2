let Data_Void = require("../Data.Void/index.js");
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

let concatString = function (s1) {
	return function (s2) {
	  return s1 + s2;
	};
  };
  
  let concatArray = function (xs) {
	return function (ys) {
	  if (xs.length === 0) return ys;
	  if (ys.length === 0) return xs;
	  return xs.concat(ys);
	};
  };
  
let SemigroupRecord = function (appendRecord) {
    this.appendRecord = appendRecord;
};
let Semigroup = function (append) {
    this.append = append;
};
let semigroupVoid = new Semigroup(function (v) {
    return Data_Void.absurd;
});
let semigroupUnit = new Semigroup(function (v) {
    return function (v1) {
        return ;
    };
});
let semigroupString = new Semigroup(concatString);
let semigroupRecordNil = new SemigroupRecord(function (v) {
    return function (v1) {
        return function (v2) {
            return {};
        };
    };
});
let semigroupArray = new Semigroup(concatArray);
let appendRecord = function (dict) {
    return dict.appendRecord;
};
let semigroupRecord = function (dictRowToList) {
    return function (dictSemigroupRecord) {
        return new Semigroup(appendRecord(dictSemigroupRecord)(type.RLProxy.value));
    };
};
let append = function (dict) {
    return dict.append;
};
let semigroupFn = function (dictSemigroup) {
    return new Semigroup(function (f) {
        return function (g) {
            return function (x) {
                return append(dictSemigroup)(f(x))(g(x));
            };
        };
    });
};
let semigroupRecordCons = function (dictIsSymbol) {
    return function (dictCons) {
        return function (dictSemigroupRecord) {
            return function (dictSemigroup) {
                return new SemigroupRecord(function (v) {
                    return function (ra) {
                        return function (rb) {
                            let tail = appendRecord(dictSemigroupRecord)(type.RLProxy.value)(ra)(rb);
                            let key = reflectSymbol(dictIsSymbol)(SProxy.value);
                            let insert = record.unsafeSet(key);
                            let get = record.unsafeGet(key);
                            return insert(append(dictSemigroup)(get(ra))(get(rb)))(tail);
                        };
                    };
                });
            };
        };
    };
};
module.exports = {
    Semigroup: Semigroup,
    append: append,
    SemigroupRecord: SemigroupRecord,
    appendRecord: appendRecord,
    semigroupString: semigroupString,
    semigroupUnit: semigroupUnit,
    semigroupVoid: semigroupVoid,
    semigroupFn: semigroupFn,
    semigroupArray: semigroupArray,
    semigroupRecord: semigroupRecord,
    semigroupRecordNil: semigroupRecordNil,
    semigroupRecordCons: semigroupRecordCons
};
