let $foreign = require("./foreign.js");


const control = require("../control");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let data = require("../Data");


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let modify = function (f) {
    return $foreign["modify'"](function (s) {
        let s$prime = f(s);
        return {
            state: s$prime,
            value: s$prime
        };
    });
};
let functorST = new data.Functor($foreign.map_);
let monadST = new control.Monad(function () {
    return applicativeST;
}, function () {
    return bindST;
});
let bindST = new control.Bind(function () {
    return applyST;
}, $foreign.bind_);
let applyST = new Apply(function () {
    return functorST;
}, control.ap(monadST));
let applicativeST = new control.Applicative(function () {
    return applyST;
}, $foreign.pure_);
let monadRecST = new Control_Monad_Rec_Class.MonadRec(function () {
    return monadST;
}, function (f) {
    return function (a) {
        let isLooping = function (v) {
            if (v instanceof Control_Monad_Rec_Class.Loop) {
                return true;
            };
            return false;
        };
        let fromDone = function (v) {
            if (v instanceof Control_Monad_Rec_Class.Done) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Control.Monad.ST.Internal (line 54, column 32 - line 54, column 46): " + [ v.constructor.name ]);
        };
        return control.bind(bindST)(control.bindFlipped(bindST)($foreign["new"])(f(a)))(function (r) {
            return control.discard(control.discardUnit)(bindST)($foreign["while"](data.map(functorST)(isLooping)($foreign.read(r)))(control.bind(bindST)($foreign.read(r))(function (v) {
                if (v instanceof Control_Monad_Rec_Class.Loop) {
                    return control.bind(bindST)(f(v.value0))(function (e) {
                        return data._void(functorST)($foreign.write(e)(r));
                    });
                };
                if (v instanceof Control_Monad_Rec_Class.Done) {
                    return control.pure(applicativeST)();
                };
                throw new Error("Failed pattern match at Control.Monad.ST.Internal (line 46, column 18 - line 50, column 28): " + [ v.constructor.name ]);
            })))(function () {
                return data.map(functorST)(fromDone)($foreign.read(r));
            });
        });
    };
});
module.exports = {
    modify: modify,
    functorST: functorST,
    applyST: applyST,
    applicativeST: applicativeST,
    bindST: bindST,
    monadST: monadST,
    monadRecST: monadRecST,
    map_: $foreign.map_,
    pure_: $foreign.pure_,
    bind_: $foreign.bind_,
    run: $foreign.run,
    "while": $foreign["while"],
    "for": $foreign["for"],
    foreach: $foreign.foreach,
    "new": $foreign["new"],
    read: $foreign.read,
    "modify'": $foreign["modify'"],
    write: $foreign.write
};
