let $foreign = require("./foreign.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");


let Killed = (() => {
    function Killed(value0) {
        this.value0 = value0;
    };
    Killed.create = function (value0) {
        return new Killed(value0);
    };
    return Killed;
})();
let Filled = (() => {
    function Filled(value0) {
        this.value0 = value0;
    };
    Filled.create = function (value0) {
        return new Filled(value0);
    };
    return Filled;
})();
let Empty = (() => {
    function Empty() {

    };
    Empty.value = new Empty();
    return Empty;
})();
let $$new = $foreign["_newVar"];
let isKilled = function (v) {
    if (v instanceof Killed) {
        return true;
    };
    return false;
};
let isFilled = function (v) {
    if (v instanceof Filled) {
        return true;
    };
    return false;
};
let isEmpty = function (v) {
    if (v instanceof Empty) {
        return true;
    };
    return false;
};
let ffiUtil = {
    left: Data_Either.Left.create,
    right: Data_Either.Right.create,
    nothing: Data_Maybe.Nothing.value,
    just: Data_Maybe.Just.create,
    killed: Killed.create,
    filled: Filled.create,
    empty: Empty.value
};
let kill = function (err) {
    return function (avar) {
        return $foreign["_killVar"](ffiUtil, err, avar);
    };
};
let put = function (value) {
    return function (avar) {
        return function (cb) {
            return $foreign["_putVar"](ffiUtil, value, avar, cb);
        };
    };
};
let read = function (avar) {
    return function (cb) {
        return $foreign["_readVar"](ffiUtil, avar, cb);
    };
};
let status = function (avar) {
    return $foreign["_status"](ffiUtil, avar);
};
let take = function (avar) {
    return function (cb) {
        return $foreign["_takeVar"](ffiUtil, avar, cb);
    };
};
let tryPut = function (value) {
    return function (avar) {
        return $foreign["_tryPutVar"](ffiUtil, value, avar);
    };
};
let tryRead = function (avar) {
    return $foreign["_tryReadVar"](ffiUtil, avar);
};
let tryTake = function (avar) {
    return $foreign["_tryTakeVar"](ffiUtil, avar);
};
module.exports = {
    Killed: Killed,
    Filled: Filled,
    Empty: Empty,
    "new": $$new,
    take: take,
    tryTake: tryTake,
    put: put,
    tryPut: tryPut,
    read: read,
    tryRead: tryRead,
    kill: kill,
    status: status,
    isEmpty: isEmpty,
    isFilled: isFilled,
    isKilled: isKilled,
    empty: $foreign.empty
};
