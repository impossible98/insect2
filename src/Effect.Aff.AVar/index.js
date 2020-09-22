let Effect_AVar = require("../Effect.AVar/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Class = require("../Effect.Class/index.js");


let tryTake = (() => {
    let $0 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
    return function ($1) {
        return $0(Effect_AVar.tryTake($1));
    };
})();
let tryRead = (() => {
    let $2 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
    return function ($3) {
        return $2(Effect_AVar.tryRead($3));
    };
})();
let tryPut = function (value) {
    let $4 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
    let $5 = Effect_AVar.tryPut(value);
    return function ($6) {
        return $4($5($6));
    };
};
let take = function (avar) {
    return Effect_Aff.makeAff(function (k) {
        return function __do() {
            let c = Effect_AVar.take(avar)(k)();
            return Effect_Aff.effectCanceler(c);
        };
    });
};
let status = (() => {
    let $7 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
    return function ($8) {
        return $7(Effect_AVar.status($8));
    };
})();
let read = function (avar) {
    return Effect_Aff.makeAff(function (k) {
        return function __do() {
            let c = Effect_AVar.read(avar)(k)();
            return Effect_Aff.effectCanceler(c);
        };
    });
};
let put = function (value) {
    return function (avar) {
        return Effect_Aff.makeAff(function (k) {
            return function __do() {
                let c = Effect_AVar.put(value)(avar)(k)();
                return Effect_Aff.effectCanceler(c);
            };
        });
    };
};
let $$new = (() => {
    let $9 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
    return function ($10) {
        return $9(Effect_AVar["new"]($10));
    };
})();
let kill = function (error) {
    let $11 = Effect_Class.liftEffect(Effect_Aff.monadEffectAff);
    let $12 = Effect_AVar.kill(error);
    return function ($13) {
        return $11($12($13));
    };
};
let empty = Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Effect_AVar.empty);
module.exports = {
    "new": $$new,
    empty: empty,
    status: status,
    take: take,
    tryTake: tryTake,
    put: put,
    tryPut: tryPut,
    read: read,
    tryRead: tryRead,
    kill: kill
};
