let control = require("../control");
let Data_Either = require("../Data.Either/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Effect = require("../Effect/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");


let pure = function (dict) {
	return dict.pure;
};


let MonadThrow = function (Monad0, throwError) {
    this.Monad0 = Monad0;
    this.throwError = throwError;
};
let MonadError = function (MonadThrow0, catchError) {
    this.MonadThrow0 = MonadThrow0;
    this.catchError = catchError;
};
let throwError = function (dict) {
    return dict.throwError;
};
let monadThrowMaybe = new MonadThrow(function () {
    return Data_Maybe.monadMaybe;
}, Data_Functor._const(Data_Maybe.Nothing.value));
let monadThrowEither = new MonadThrow(function () {
    return Data_Either.monadEither;
}, Data_Either.Left.create);
let monadThrowEffect = new MonadThrow(function () {
    return Effect.monadEffect;
}, Effect_Exception.throwException);
let monadErrorMaybe = new MonadError(function () {
    return monadThrowMaybe;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Maybe.Nothing) {
            return v1({});
        };
        if (v instanceof Data_Maybe.Just) {
            return new Data_Maybe.Just(v.value0);
        };
        throw new Error("Failed pattern match at Control.Monad.Error.Class (line 79, column 1 - line 81, column 33): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let monadErrorEither = new MonadError(function () {
    return monadThrowEither;
}, function (v) {
    return function (v1) {
        if (v instanceof Data_Either.Left) {
            return v1(v.value0);
        };
        if (v instanceof Data_Either.Right) {
            return new Data_Either.Right(v.value0);
        };
        throw new Error("Failed pattern match at Control.Monad.Error.Class (line 72, column 1 - line 74, column 35): " + [ v.constructor.name, v1.constructor.name ]);
    };
});
let monadErrorEffect = new MonadError(function () {
    return monadThrowEffect;
}, Data_Functor.flip(Effect_Exception.catchException));
let catchError = function (dict) {
    return dict.catchError;
};
let catchJust = function (dictMonadError) {
    return function (p) {
        return function (act) {
            return function (handler) {
                let handle = function (e) {
                    let v = p(e);
                    if (v instanceof Data_Maybe.Nothing) {
                        return throwError(dictMonadError.MonadThrow0())(e);
                    };
                    if (v instanceof Data_Maybe.Just) {
                        return handler(v.value0);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Error.Class (line 57, column 5 - line 59, column 26): " + [ v.constructor.name ]);
                };
                return catchError(dictMonadError)(act)(handle);
            };
        };
    };
};
let $$try = function (dictMonadError) {
    return function (a) {
        return catchError(dictMonadError)(Data_Functor.map(((((dictMonadError.MonadThrow0()).Monad0()).Bind1()).Apply0()).Functor0())(Data_Either.Right.create)(a))((function () {
            let $17 = pure(((dictMonadError.MonadThrow0()).Monad0()).Applicative0());
            return function ($18) {
                return $17(Data_Either.Left.create($18));
            };
        })());
    };
};
let withResource = function (dictMonadError) {
    return function (acquire) {
        return function (release) {
            return function (kleisli) {
                return control.bind(((dictMonadError.MonadThrow0()).Monad0()).Bind1())(acquire)(function (resource) {
                    return control.bind(((dictMonadError.MonadThrow0()).Monad0()).Bind1())($$try(dictMonadError)(kleisli(resource)))(function (result) {
                        return control.discard(control.discardUnit)(((dictMonadError.MonadThrow0()).Monad0()).Bind1())(release(resource))(function () {
                            return Data_Either.either(throwError(dictMonadError.MonadThrow0()))(pure(((dictMonadError.MonadThrow0()).Monad0()).Applicative0()))(result);
                        });
                    });
                });
            };
        };
    };
};
module.exports = {
    catchError: catchError,
    throwError: throwError,
    MonadThrow: MonadThrow,
    MonadError: MonadError,
    catchJust: catchJust,
    "try": $$try,
    withResource: withResource,
    monadThrowEither: monadThrowEither,
    monadErrorEither: monadErrorEither,
    monadThrowMaybe: monadThrowMaybe,
    monadErrorMaybe: monadErrorMaybe,
    monadThrowEffect: monadThrowEffect,
    monadErrorEffect: monadErrorEffect
};
