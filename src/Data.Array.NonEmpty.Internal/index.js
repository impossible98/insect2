let $foreign = require("./foreign.js");

const control = require('../control');
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
const data = require('../data');
let Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
let Data_Semigroup_Traversable = require("../Data.Semigroup.Traversable/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_TraversableWithIndex = require("../Data.TraversableWithIndex/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


class Data {
	constructor(arg) {
		this.arg = arg
	}
}

class Data2 {
	constructor(arg, arg2) {
		this.arg = arg;
		this.arg2 = arg2
	}
}

let eq1Array = new Data(function (dictEq) {
	return eq(eqArray(dictEq));
});

let applyArray = new Data2(function () {
	return data.functorArray;
}, arrayApply);
let altArray = new Data2(function () {
	return data.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));

function eqArrayImpl(f) {
	return function (xs) {
		return function (ys) {
			if (xs === ys) return true;
			if (xs.length !== ys.length) return false;
			for (let i = 0; i < xs.length; i++) {
				if (!f(xs[i])(ys[i])) return false;
			}
			return true;
		};
	};
}


function eq(dict) {
	return dict.eq;
}

function eqArray(dictEq) {
	return new Data(eqArrayImpl(eq(dictEq)));
}


function arrayApply(fs) {
	return function (xs) {
		let l = fs.length;
		let k = xs.length;
		let result = new Array(l * k);
		let n = 0;
		for (let i = 0; i < l; i++) {
			let f = fs[i];
			for (let j = 0; j < k; j++) {
				result[n++] = f(xs[j]);
			}
		}
		return result;
	};
}

function apply(dict) {
	return dict.apply;
}


let unfoldable1NonEmptyArray = Data_Unfoldable1.unfoldable1Array;
let traversableWithIndexNonEmptyArray = Data_TraversableWithIndex.traversableWithIndexArray;
let traversableNonEmptyArray = Data_Traversable.traversableArray;
let showNonEmptyArray = function (dictShow) {
	return new Data_Show.Show(function (v) {
		return "(NonEmptyArray " + (Data_Show.show(Data_Show.showArray(dictShow))(v) + ")");
	});
};
let semigroupNonEmptyArray = Data_Semigroup.semigroupArray;
let ordNonEmptyArray = function (dictOrd) {
	return Data_Ord.ordArray(dictOrd);
};
let ord1NonEmptyArray = Data_Ord.ord1Array;
let monadNonEmptyArray = control.monadArray;
let functorWithIndexNonEmptyArray = Data_FunctorWithIndex.functorWithIndexArray;
let functorNonEmptyArray = data.functorArray;
let foldableWithIndexNonEmptyArray = Data_FoldableWithIndex.foldableWithIndexArray;
let foldableNonEmptyArray = Data_Foldable.foldableArray;
let foldable1NonEmptyArray = new Data_Semigroup_Foldable.Foldable1(function () {
	return foldableNonEmptyArray;
}, function (dictSemigroup) {
	return $foreign.fold1Impl(Data_Semigroup.append(dictSemigroup));
}, function (dictSemigroup) {
	return Data_Semigroup_Foldable.foldMap1Default(foldable1NonEmptyArray)(functorNonEmptyArray)(dictSemigroup);
});
let traversable1NonEmptyArray = new Data_Semigroup_Traversable.Traversable1(function () {
	return foldable1NonEmptyArray;
}, function () {
	return traversableNonEmptyArray;
}, function (dictApply) {
	return Data_Semigroup_Traversable.sequence1Default(traversable1NonEmptyArray)(dictApply);
}, function (dictApply) {
	return $foreign.traverse1Impl(apply(dictApply))(data.map(dictApply.Functor0()));
});
let eqNonEmptyArray = function (dictEq) {
	return eqArray(dictEq);
};
let eq1NonEmptyArray = eq1Array;
let bindNonEmptyArray = control.bindArray;
let applyNonEmptyArray = applyArray;
let applicativeNonEmptyArray = control.applicativeArray;
let altNonEmptyArray = altArray;

module.exports = {
	showNonEmptyArray: showNonEmptyArray,
	eqNonEmptyArray: eqNonEmptyArray,
	eq1NonEmptyArray: eq1NonEmptyArray,
	ordNonEmptyArray: ordNonEmptyArray,
	ord1NonEmptyArray: ord1NonEmptyArray,
	semigroupNonEmptyArray: semigroupNonEmptyArray,
	functorNonEmptyArray: functorNonEmptyArray,
	functorWithIndexNonEmptyArray: functorWithIndexNonEmptyArray,
	foldableNonEmptyArray: foldableNonEmptyArray,
	foldableWithIndexNonEmptyArray: foldableWithIndexNonEmptyArray,
	foldable1NonEmptyArray: foldable1NonEmptyArray,
	unfoldable1NonEmptyArray: unfoldable1NonEmptyArray,
	traversableNonEmptyArray: traversableNonEmptyArray,
	traversableWithIndexNonEmptyArray: traversableWithIndexNonEmptyArray,
	traversable1NonEmptyArray: traversable1NonEmptyArray,
	applyNonEmptyArray: applyNonEmptyArray,
	applicativeNonEmptyArray: applicativeNonEmptyArray,
	bindNonEmptyArray: bindNonEmptyArray,
	monadNonEmptyArray: monadNonEmptyArray,
	altNonEmptyArray: altNonEmptyArray
};
