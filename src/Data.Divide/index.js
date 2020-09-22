let Data_Comparison = require("../Data.Comparison/index.js");
let Data_Op = require("../Data.Op/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Predicate = require("../Data.Predicate/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


class Control {
	constructor(kw) {
		this.kw = kw;
	}
}

class Category {
	constructor(Semigroupoid0, identity) {
		this.Semigroupoid0 = Semigroupoid0;
		this.identity = identity;
	}
}

let contravariantEquivalence = new Data_Functor_Contravariant.Contravariant(function (f) {
	return function (v) {
		return Data_Functor.on(v)(f);
	};
});

let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let categoryFn = new Category(function () {
	return semigroupoidFn;
}, function (x) {
	return x;
});

let Divide = function (Contravariant0, divide) {
	this.Contravariant0 = Contravariant0;
	this.divide = divide;
};

let dividePredicate = new Divide(function () {
	return Data_Predicate.contravariantPredicate;
}, function (f) {
	return function (v) {
		return function (v1) {
			return function (a) {
				let v2 = f(a);
				return v(v2.value0) && v1(v2.value1);
			};
		};
	};

});

function identity(dict) {
	return dict.identity;
}

let divideOp = function (dictSemigroup) {
	return new Divide(function () {
		return Data_Op.contravariantOp;
	}, function (f) {
		return function (v) {
			return function (v1) {
				return function (a) {
					let v2 = f(a);
					return Data_Semigroup.append(dictSemigroup)(v(v2.value0))(v1(v2.value1));
				};
			};
		};
	});
};

let divideEquivalence = new Divide(function () {
	return contravariantEquivalence;
}, function (f) {
	return function (v) {
		return function (v1) {
			return function (a) {
				return function (b) {
					let v2 = f(a);
					let v3 = f(b);
					return v(v2.value0)(v3.value0) && v1(v2.value1)(v3.value1);
				};
			};
		};
	};
});

let divideComparison = new Divide(function () {
	return Data_Comparison.contravariantComparison;
}, function (f) {
	return function (v) {
		return function (v1) {
			return function (a) {
				return function (b) {
					let v2 = f(a);
					let v3 = f(b);
					return Data_Semigroup.append(Data_Ordering.semigroupOrdering)(v(v2.value0)(v3.value0))(v1(v2.value1)(v3.value1));
				};
			};
		};
	};
});

let divide = function (dict) {
	return dict.divide;
};

let divided = function (dictDivide) {
	return divide(dictDivide)(identity(categoryFn));
};

module.exports = {
	divide: divide,
	Divide: Divide,
	divided: divided,
	divideComparison: divideComparison,
	divideEquivalence: divideEquivalence,
	dividePredicate: dividePredicate,
	divideOp: divideOp
};
