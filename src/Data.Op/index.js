
let Data_Functor_Contravariant = require("../Data.Functor.Contravariant/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
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

function identity(dict) {
	return dict.identity;
}

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


let Op = function (x) {
    return x;
};
let semigroupoidOp = new Control(function (v) {
    return function (v1) {
        return function ($12) {
            return v1(v($12));
        };
    };
});
let semigroupOp = function (dictSemigroup) {
    return Data_Semigroup.semigroupFn(dictSemigroup);
};
let newtypeOp = new Data_Newtype.Newtype(function (n) {
    return n;
}, Op);
let monoidOp = function (dictMonoid) {
    return Data_Monoid.monoidFn(dictMonoid);
};
let contravariantOp = new Data_Functor_Contravariant.Contravariant(function (f) {
    return function (v) {
        return function ($13) {
            return v(f($13));
        };
    };
});
let categoryOp = new Category(function () {
    return semigroupoidOp;
}, identity(categoryFn));
module.exports = {
    Op: Op,
    newtypeOp: newtypeOp,
    semigroupOp: semigroupOp,
    monoidOp: monoidOp,
    semigroupoidOp: semigroupoidOp,
    categoryOp: categoryOp,
    contravariantOp: contravariantOp
};
