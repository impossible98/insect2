const control = require("../control");
let Data_Bifunctor = require("../Data.Bifunctor/index.js");
let Data_Either = require("../Data.Either/index.js");
let data = require("../data");
let Data_Identity = require("../Data.Identity/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Effect = require("../Effect/index.js");
let Effect_Ref = require("../Effect.Ref/index.js");


let Loop = (function () {
    function Loop(value0) {
        this.value0 = value0;
    };
    Loop.create = function (value0) {
        return new Loop(value0);
    };
    return Loop;
})();
let Done = (function () {
    function Done(value0) {
        this.value0 = value0;
    };
    Done.create = function (value0) {
        return new Done(value0);
    };
    return Done;
})();
let MonadRec = function (Monad0, tailRecM) {
    this.Monad0 = Monad0;
    this.tailRecM = tailRecM;
};
let tailRecM = function (dict) {
    return dict.tailRecM;
};
let tailRecM2 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return tailRecM(dictMonadRec)(function (o) {
                    return f(o.a)(o.b);
                })({
                    a: a,
                    b: b
                });
            };
        };
    };
};
let tailRecM3 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return tailRecM(dictMonadRec)(function (o) {
                        return f(o.a)(o.b)(o.c);
                    })({
                        a: a,
                        b: b,
                        c: c
                    });
                };
            };
        };
    };
};
let untilJust = function (dictMonadRec) {
    return function (m) {
        return tailRecM(dictMonadRec)(function (v) {
            return data.mapFlipped((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(m)(function (v1) {
                if (v1 instanceof Data_Maybe.Nothing) {
                    return new Loop({});
                };
                if (v1 instanceof Data_Maybe.Just) {
                    return new Done(v1.value0);
                };
                throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 155, column 43 - line 157, column 19): " + [ v1.constructor.name ]);
            });
        })({});
    };
};
let whileJust = function (dictMonoid) {
    return function (dictMonadRec) {
        return function (m) {
            return tailRecM(dictMonadRec)(function (v) {
                return data.mapFlipped((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(m)(function (v1) {
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return new Done(v);
                    };
                    if (v1 instanceof Data_Maybe.Just) {
                        return Loop.create(Data_Semigroup.append(dictMonoid.Semigroup0())(v)(v1.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 148, column 45 - line 150, column 26): " + [ v1.constructor.name ]);
                });
            })(Data_Monoid.mempty(dictMonoid));
        };
    };
};
let tailRec = function (f) {
    let go = function ($copy_v) {
        let $tco_done = false;
        let $tco_result;
        function $tco_loop(v) {
            if (v instanceof Loop) {
                $copy_v = f(v.value0);
                return;
            };
            if (v instanceof Done) {
                $tco_done = true;
                return v.value0;
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 93, column 3 - line 93, column 25): " + [ v.constructor.name ]);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    return function ($58) {
        return go(f($58));
    };
};
let monadRecMaybe = new MonadRec(function () {
    return Data_Maybe.monadMaybe;
}, function (f) {
    return function (a0) {
        let g = function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return new Done(Data_Maybe.Nothing.value);
            };
            if (v instanceof Data_Maybe.Just && v.value0 instanceof Loop) {
                return new Loop(f(v.value0.value0));
            };
            if (v instanceof Data_Maybe.Just && v.value0 instanceof Done) {
                return new Done(new Data_Maybe.Just(v.value0.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 129, column 7 - line 129, column 31): " + [ v.constructor.name ]);
        };
        return tailRec(g)(f(a0));
    };
});
let monadRecIdentity = new MonadRec(function () {
    return Data_Identity.monadIdentity;
}, function (f) {
    let runIdentity = function (v) {
        return v;
    };
    let $59 = tailRec(function ($61) {
        return runIdentity(f($61));
    });
    return function ($60) {
        return Data_Identity.Identity($59($60));
    };
});
let monadRecFunction = new MonadRec(function () {
    return control.monadFn;
}, function (f) {
    return function (a0) {
        return function (e) {
            return tailRec(function (a) {
                return f(a)(e);
            })(a0);
        };
    };
});
let monadRecEither = new MonadRec(function () {
    return Data_Either.monadEither;
}, function (f) {
    return function (a0) {
        let g = function (v) {
            if (v instanceof Data_Either.Left) {
                return new Done(new Data_Either.Left(v.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Loop) {
                return new Loop(f(v.value0.value0));
            };
            if (v instanceof Data_Either.Right && v.value0 instanceof Done) {
                return new Done(new Data_Either.Right(v.value0.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 121, column 7 - line 121, column 33): " + [ v.constructor.name ]);
        };
        return tailRec(g)(f(a0));
    };
});
let monadRecEffect = new MonadRec(function () {
    return Effect.monadEffect;
}, function (f) {
    return function (a) {
        let fromDone = function (v) {
            if (v instanceof Done) {
                return v.value0;
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 113, column 30 - line 113, column 44): " + [ v.constructor.name ]);
        };
        return function __do() {
            let r = control.bindFlipped(Effect.bindEffect)(Effect_Ref["new"])(f(a))();
            (function () {
                while (!(function __do() {
                    let v = Effect_Ref.read(r)();
                    if (v instanceof Loop) {
                        let e = f(v.value0)();
                        Effect_Ref.write(e)(r)();
                        return false;
                    };
                    if (v instanceof Done) {
                        return true;
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 104, column 22 - line 109, column 28): " + [ v.constructor.name ]);
                })()) {

                };
                return {};
            })();
            return data.map(Effect.functorEffect)(fromDone)(Effect_Ref.read(r))();
        };
    };
});
let functorStep = new data.Functor(function (f) {
    return function (m) {
        if (m instanceof Loop) {
            return new Loop(m.value0);
        };
        if (m instanceof Done) {
            return new Done(f(m.value0));
        };
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 27, column 1 - line 27, column 48): " + [ m.constructor.name ]);
    };
});
let forever = function (dictMonadRec) {
    return function (ma) {
        return tailRecM(dictMonadRec)(function (u) {
            return data.voidRight((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(new Loop(u))(ma);
        })({});
    };
};
let bifunctorStep = new Data_Bifunctor.Bifunctor(function (v) {
    return function (v1) {
        return function (v2) {
            if (v2 instanceof Loop) {
                return new Loop(v(v2.value0));
            };
            if (v2 instanceof Done) {
                return new Done(v1(v2.value0));
            };
            throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 29, column 1 - line 31, column 34): " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
        };
    };
});
module.exports = {
    Loop: Loop,
    Done: Done,
    MonadRec: MonadRec,
    tailRec: tailRec,
    tailRecM: tailRecM,
    tailRecM2: tailRecM2,
    tailRecM3: tailRecM3,
    forever: forever,
    whileJust: whileJust,
    untilJust: untilJust,
    functorStep: functorStep,
    bifunctorStep: bifunctorStep,
    monadRecIdentity: monadRecIdentity,
    monadRecEffect: monadRecEffect,
    monadRecFunction: monadRecFunction,
    monadRecEither: monadRecEither,
    monadRecMaybe: monadRecMaybe
};
