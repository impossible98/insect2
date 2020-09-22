const control = require("../control");
let Control_Plus = require("../Control.Plus/index.js");


class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}
let alternativeArray = new Alternative(function () {
    return control.applicativeArray;
}, function () {
    return Control_Plus.plusArray;
});


let MonadZero = function (Alternative1, Monad0) {
    this.Alternative1 = Alternative1;
    this.Monad0 = Monad0;
};
let monadZeroArray = new MonadZero(function () {
    return alternativeArray;
}, function () {
    return control.monadArray;
});
let guard = function (dictMonadZero) {
    return function (v) {
        if (v) {
            return control.pure((dictMonadZero.Alternative1()).Applicative0())({});
        };
        if (!v) {
            return Control_Plus.empty((dictMonadZero.Alternative1()).Plus1());
        };
        throw new Error("Failed pattern match at Control.MonadZero (line 54, column 1 - line 54, column 52): " + [ v.constructor.name ]);
    };
};
module.exports = {
    MonadZero: MonadZero,
    guard: guard,
    monadZeroArray: monadZeroArray
};
