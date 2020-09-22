const control = require("../control");

const data = require('../data');
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let apply = function (dict) {
	return dict.apply;
};

function log(s) {
	return () => {
		console.log(s);
		return {};
	};
}

function warn(s) {
	return () => {
		console.warn(s);
		return {};
	};
}

function error(s) {
	return () => {
		console.error(s);
		return {};
	};
}

function info(s) {
	return () => {
		console.info(s);
		return {};
	};
}

function time(s) {
	return () => {
		console.time(s);
		return {};
	};
}

function timeLog(s) {
	return () => {
		console.timeLog(s);
		return {};
	};
}

function timeEnd(s) {
	return () => {
		console.timeEnd(s);
		return {};
	};
}

function warnShow(dictShow) {
	return (a) => {
		return warn(Data_Show.show(dictShow)(a));
	};
}

function logShow(dictShow) {
	return (a) => {
		return log(Data_Show.show(dictShow)(a));
	};
}

function infoShow(dictShow) {
	return (a) => {
		return info(Data_Show.show(dictShow)(a));
	};
}

function errorShow(dictShow) {
	return (a) => {
		return error(Data_Show.show(dictShow)(a));
	};
}

let lift2 = function (dictApply) {
	return function (f) {
		return function (a) {
			return function (b) {
				return apply(dictApply)(data.map(dictApply.Functor0())(f)(a))(b);
			};
		};
	};
};

let pureE = function (a) {
	return () => {
		return a;
	};
};

let bindE = function (a) {
	return function (f) {
		return () => {
			return f(a())();
		};
	};
};

let untilE = function (f) {
	return () => {
		while (!f());
		return {};
	};
};

let whileE = function (f) {
	return function (a) {
		return () => {
			while (f()) {
				a();
			}
			return {};
		};
	};
};

let forE = function (lo) {
	return function (hi) {
		return function (f) {
			return () => {
				for (let i = lo; i < hi; i++) {
					f(i)();
				}
			};
		};
	};
};

let foreachE = function (as) {
	return function (f) {
		return () => {
			for (let i = 0, l = as.length; i < l; i++) {
				f(as[i])();
			}
		};
	};
};

let monadEffect = new control.Monad(() => {
	return applicativeEffect;
}, () => {
	return bindEffect;
});
let bindEffect = new control.Bind(() => {
	return applyEffect;
}, bindE);
let applyEffect = new Apply(() => {
	return functorEffect;
}, control.ap(monadEffect));
let applicativeEffect = new control.Applicative(() => {
	return applyEffect;
}, pureE);
let functorEffect = new data.Functor(control.liftA1(applicativeEffect));
let semigroupEffect = function (dictSemigroup) {
	return new Data_Semigroup.Semigroup(lift2(applyEffect)(Data_Semigroup.append(dictSemigroup)));
};
let monoidEffect = function (dictMonoid) {
	return new Data_Monoid.Monoid(() => {
		return semigroupEffect(dictMonoid.Semigroup0());
	}, pureE(Data_Monoid.mempty(dictMonoid)));
};
module.exports = {
	functorEffect: functorEffect,
	applyEffect: applyEffect,
	applicativeEffect: applicativeEffect,
	bindEffect: bindEffect,
	monadEffect: monadEffect,
	semigroupEffect: semigroupEffect,
	monoidEffect: monoidEffect,
	untilE: untilE,
	whileE: whileE,
	forE: forE,
	foreachE: foreachE,
	logShow: logShow,
	warnShow: warnShow,
	errorShow: errorShow,
	infoShow: infoShow,
	log: log,
	warn: warn,
	error: error,
	info: info,
	time: time,
	timeLog: timeLog,
	timeEnd: timeEnd
};
