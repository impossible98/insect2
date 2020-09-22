let $foreign = require("./foreign.js");

const control = require("../control");
let Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let withArray = function (f) {
    return function (xs) {
        return function __do() {
            let result = $foreign.thaw(xs)();
            f(result)();
            return $foreign.unsafeFreeze(result)();
        };
    };
};
let unshift = function (a) {
    return $foreign.unshiftAll([ a ]);
};
let sortBy = function (comp) {
    let comp$prime = function (x) {
        return function (y) {
            let v = comp(x)(y);
            if (v instanceof Data_Ordering.GT) {
                return 1;
            };
            if (v instanceof Data_Ordering.EQ) {
                return 0;
            };
            if (v instanceof Data_Ordering.LT) {
                return -1 | 0;
            };
            throw new Error("Failed pattern match at Data.Array.ST (line 105, column 15 - line 108, column 13): " + [ v.constructor.name ]);
        };
    };
    return $foreign.sortByImpl(comp$prime);
};
let sortWith = function (dictOrd) {
    return function (f) {
        return sortBy(Data_Ord.comparing(dictOrd)(f));
    };
};
let sort = function (dictOrd) {
    return sortBy(Data_Ord.compare(dictOrd));
};
let shift = $foreign.shiftImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let run = function (st) {
    return control.bind(Control_Monad_ST_Internal.bindST)(st)($foreign.unsafeFreeze)();
};
let push = function (a) {
    return $foreign.pushAll([ a ]);
};
let pop = $foreign.popImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let peek = $foreign.peekImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let modify = function (i) {
    return function (f) {
        return function (xs) {
            return function __do() {
                let entry = peek(i)(xs)();
                if (entry instanceof Data_Maybe.Just) {
                    return $foreign.poke(i)(f(entry.value0))(xs)();
                };
                if (entry instanceof Data_Maybe.Nothing) {
                    return false;
                };
                throw new Error("Failed pattern match at Data.Array.ST (line 188, column 3 - line 190, column 26): " + [ entry.constructor.name ]);
            };
        };
    };
};
module.exports = {
    run: run,
    withArray: withArray,
    peek: peek,
    modify: modify,
    pop: pop,
    push: push,
    shift: shift,
    unshift: unshift,
    sort: sort,
    sortBy: sortBy,
    sortWith: sortWith,
    empty: $foreign.empty,
    poke: $foreign.poke,
    pushAll: $foreign.pushAll,
    unshiftAll: $foreign.unshiftAll,
    splice: $foreign.splice,
    freeze: $foreign.freeze,
    thaw: $foreign.thaw,
    unsafeFreeze: $foreign.unsafeFreeze,
    unsafeThaw: $foreign.unsafeThaw,
    toAssocArray: $foreign.toAssocArray
};
