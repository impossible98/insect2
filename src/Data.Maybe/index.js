const control = require("../control");
let Control_MonadZero = require("../Control.MonadZero/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Functor_Invariant = require("../Data.Functor.Invariant/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}

class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

class Eq {
	constructor(eq) {
		this.eq = eq;
	}
}

class Eq1 {
	constructor(eq1) {
		this.eq1 = eq1;
	}
}

let semigroupoidFn = new Control((f) => {
	return (g) => {
		return (x) => {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(() => {
	return semigroupoidFn;
}, (x) => {
	return x;
});

function identity(dict) {
	return dict.identity;
}

function dict(arg) {
	return arg.dict;
}

let Nothing = (() => {
	function Nothing() { };
	Nothing.value = new Nothing();
	return Nothing;
})();

let Just = (function () {
	function Just(value0) {
		this.value0 = value0;
	};
	Just.create = function (value0) {
		return new Just(value0);
	};
	return Just;
})();

function showMaybe(dictShow) {
	return new Data_Show.Show((v) => {
		if (v instanceof Just) {
			return "(Just " + (Data_Show.show(dictShow)(v.value0) + ")");
		};
		if (v instanceof Nothing) {
			return "Nothing";
		};
		throw new Error("Failed pattern match at Data.Maybe (line 205, column 1 - line 207, column 28): " + [v.constructor.name]);
	});
}

function semigroupMaybe(dictSemigroup) {
	return new Data_Semigroup.Semigroup((v) => {
		return (v1) => {
			if (v instanceof Nothing) {
				return v1;
			};
			if (v1 instanceof Nothing) {
				return v;
			};
			if (v instanceof Just && v1 instanceof Just) {
				return new Just(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0));
			};
			throw new Error("Failed pattern match at Data.Maybe (line 174, column 1 - line 177, column 43): " + [v.constructor.name, v1.constructor.name]);
		};
	});
}

function optional(dictAlternative) {
	return (a) => {
		return dict((dictAlternative.Plus1()).Alt0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())(Just.create)(a))(control.pure(dictAlternative.Applicative0())(Nothing.value));
	};
}

function monoidMaybe(dictSemigroup) {
	return new Data_Monoid.Monoid(function () {
		return semigroupMaybe(dictSemigroup);
	}, Nothing.value);
};


function maybe$prime(v) {
	return (v1) => {
		return (v2) => {
			if (v2 instanceof Nothing) {
				return v();
			};
			if (v2 instanceof Just) {
				return v1(v2.value0);
			};
			throw new Error("Failed pattern match at Data.Maybe (line 230, column 1 - line 230, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
}

function maybe(v) {
	return (v1) => {
		return (v2) => {
			if (v2 instanceof Nothing) {
				return v;
			};
			if (v2 instanceof Just) {
				return v1(v2.value0);
			};
			throw new Error("Failed pattern match at Data.Maybe (line 217, column 1 - line 217, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
		};
	};
}

let isNothing = maybe(true)(Data_Functor._const(false));
let isJust = maybe(false)(Data_Functor._const(true));

let functorMaybe = new Data_Functor.Functor((v) => {
	return (v1) => {
		if (v1 instanceof Just) {
			return new Just(v(v1.value0));
		};
		return Nothing.value;
	};
});

let invariantMaybe = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorMaybe));

function fromMaybe$prime(a) {
	return maybe$prime(a)(identity(categoryFn));
}

function fromMaybe(a) {
	return maybe(a)(identity(categoryFn));
}

function fromJust() {
	return (v) => {
		if (v instanceof Just) {
			return v.value0;
		}

		throw new Error("Failed pattern match at Data.Maybe (line 268, column 1 - line 268, column 46): " + [v.constructor.name]);
	};
}

let extendMaybe = new control.Extend(() => {

	return functorMaybe;
}, (v) => {
	return (v1) => {
		if (v1 instanceof Nothing) {
			return Nothing.value;
		}

		return new Just(v(v1));
	};
});

function eqMaybe(dictEq) {
	return new Eq((x) => {
		return (y) => {
			if (x instanceof Nothing && y instanceof Nothing) {
				return true;
			}

			if (x instanceof Just && y instanceof Just) {
				return dict(dictEq)(x.value0)(y.value0);
			}

			return false;
		};
	});
}

function ordMaybe(dictOrd) {
	return new Data_Ord.Ord(() => {
		return eqMaybe(dictOrd.Eq0());
	}, (x) => {
		return (y) => {
			if (x instanceof Nothing && y instanceof Nothing) {
				return Data_Ordering.EQ.value;
			}

			if (x instanceof Nothing) {
				return Data_Ordering.LT.value;
			}

			if (y instanceof Nothing) {
				return Data_Ordering.GT.value;
			}

			if (x instanceof Just && y instanceof Just) {
				return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
			}

			throw new Error("Failed pattern match at Data.Maybe (line 194, column 1 - line 194, column 51): " + [x.constructor.name, y.constructor.name]);
		};
	});
}

let eq1Maybe = new Eq1(function (dictEq) {
	return dict(eqMaybe(dictEq));
});

let ord1Maybe = new Data_Ord.Ord1(() => {
	return eq1Maybe;
}, (dictOrd) => {
	return Data_Ord.compare(ordMaybe(dictOrd));
});

function boundedMaybe(dictBounded) {
	return new Data_Bounded.Bounded(function () {
		return ordMaybe(dictBounded.Ord0());
	}, Nothing.value, new Just(Data_Bounded.top(dictBounded)));
}

let applyMaybe = new Apply(function () {
	return functorMaybe;
}, (v) => {
	return (v1) => {
		if (v instanceof Just) {
			return Data_Functor.map(functorMaybe)(v.value0)(v1);
		};
		if (v instanceof Nothing) {
			return Nothing.value;
		};
		throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
	};
});

let bindMaybe = new control.Bind(function () {
	return applyMaybe;
}, (v) => {
	return function (v1) {
		if (v instanceof Just) {
			return v1(v.value0);
		}

		if (v instanceof Nothing) {
			return Nothing.value;
		}

		throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
	};
});

let applicativeMaybe = new control.Applicative(() => {
	return applyMaybe;
}, Just.create);

let monadMaybe = new control.Monad(() => {
	return applicativeMaybe;
}, () => {
	return bindMaybe;
});

let altMaybe = new Alt(() => {
	return functorMaybe;
}, (v) => {
	return (v1) => {
		if (v instanceof Nothing) {
			return v1;
		};
		return v;
	};
});

let plusMaybe = new control.Plus(() => {
	return altMaybe;
}, Nothing.value);

let alternativeMaybe = new Alternative(() => {
	return applicativeMaybe;
}, () => {
	return plusMaybe;
});

let monadZeroMaybe = new Control_MonadZero.MonadZero(function () {
	return alternativeMaybe;
}, function () {
	return monadMaybe;
});

module.exports = {
	Nothing: Nothing,
	Just: Just,
	maybe: maybe,
	"maybe'": maybe$prime,
	fromMaybe: fromMaybe,
	"fromMaybe'": fromMaybe$prime,
	isJust: isJust,
	isNothing: isNothing,
	fromJust: fromJust,
	optional: optional,
	functorMaybe: functorMaybe,
	applyMaybe: applyMaybe,
	applicativeMaybe: applicativeMaybe,
	altMaybe: altMaybe,
	plusMaybe: plusMaybe,
	alternativeMaybe: alternativeMaybe,
	bindMaybe: bindMaybe,
	monadMaybe: monadMaybe,
	monadZeroMaybe: monadZeroMaybe,
	extendMaybe: extendMaybe,
	invariantMaybe: invariantMaybe,
	semigroupMaybe: semigroupMaybe,
	monoidMaybe: monoidMaybe,
	eqMaybe: eqMaybe,
	eq1Maybe: eq1Maybe,
	ordMaybe: ordMaybe,
	ord1Maybe: ord1Maybe,
	boundedMaybe: boundedMaybe,
	showMaybe: showMaybe
};
