const control = require("../control");
let data = require("../data");


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let StateR = function (x) {
    return x;
};
let StateL = function (x) {
    return x;
};
let stateR = function (v) {
    return v;
};
let stateL = function (v) {
    return v;
};
let functorStateR = new data.Functor(function (f) {
    return function (k) {
        return function (s) {
            let v = stateR(k)(s);
            return {
                accum: v.accum,
                value: f(v.value)
            };
        };
    };
});
let functorStateL = new data.Functor(function (f) {
    return function (k) {
        return function (s) {
            let v = stateL(k)(s);
            return {
                accum: v.accum,
                value: f(v.value)
            };
        };
    };
});
let applyStateR = new Apply(function () {
    return functorStateR;
}, function (f) {
    return function (x) {
        return function (s) {
            let v = stateR(x)(s);
            let v1 = stateR(f)(v.accum);
            return {
                accum: v1.accum,
                value: v1.value(v.value)
            };
        };
    };
});
let applyStateL = new Apply(function () {
    return functorStateL;
}, function (f) {
    return function (x) {
        return function (s) {
            let v = stateL(f)(s);
            let v1 = stateL(x)(v.accum);
            return {
                accum: v1.accum,
                value: v.value(v1.value)
            };
        };
    };
});
let applicativeStateR = new control.Applicative(function () {
    return applyStateR;
}, function (a) {
    return function (s) {
        return {
            accum: s,
            value: a
        };
    };
});
let applicativeStateL = new control.Applicative(function () {
    return applyStateL;
}, function (a) {
    return function (s) {
        return {
            accum: s,
            value: a
        };
    };
});
module.exports = {
    StateL: StateL,
    stateL: stateL,
    StateR: StateR,
    stateR: stateR,
    functorStateL: functorStateL,
    applyStateL: applyStateL,
    applicativeStateL: applicativeStateL,
    functorStateR: functorStateR,
    applyStateR: applyStateR,
    applicativeStateR: applicativeStateR
};
