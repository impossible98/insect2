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
let Bifunctor = function (bimap) {
    this.bimap = bimap;
};
let bimap = function (dict) {
    return dict.bimap;
};
let lmap = function (dictBifunctor) {
    return function (f) {
        return bimap(dictBifunctor)(f)(identity(categoryFn));
    };
};
let rmap = function (dictBifunctor) {
    return bimap(dictBifunctor)(identity(categoryFn));
};
module.exports = {
    bimap: bimap,
    Bifunctor: Bifunctor,
    lmap: lmap,
    rmap: rmap
};
