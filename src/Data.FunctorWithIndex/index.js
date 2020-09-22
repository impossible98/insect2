
let Data_Functor = require("../Data.Functor/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Maybe_First = require("../Data.Maybe.First/index.js");
let Data_Maybe_Last = require("../Data.Maybe.Last/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
let Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
let Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
let Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");



let mapWithIndexArray = function (f) {
	return function (xs) {
	  let l = xs.length;
	  let result = Array(l);
	  for (let i = 0; i < l; i++) {
		result[i] = f(i)(xs[i]);
	  }
	  return result;
	};
  };

  
let FunctorWithIndex = function (Functor0, mapWithIndex) {
    this.Functor0 = Functor0;
    this.mapWithIndex = mapWithIndex;
};
let mapWithIndex = function (dict) {
    return dict.mapWithIndex;
};
let mapDefault = function (dictFunctorWithIndex) {
    return function (f) {
        return mapWithIndex(dictFunctorWithIndex)(Data_Functor._const(f));
    };
};
let functorWithIndexMultiplicative = new FunctorWithIndex(function () {
    return Data_Monoid_Multiplicative.functorMultiplicative;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Multiplicative.functorMultiplicative)(f({}));
});
let functorWithIndexMaybe = new FunctorWithIndex(function () {
    return Data_Maybe.functorMaybe;
}, function (f) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(f({}));
});
let functorWithIndexLast = new FunctorWithIndex(function () {
    return Data_Maybe_Last.functorLast;
}, function (f) {
    return Data_Functor.map(Data_Maybe_Last.functorLast)(f({}));
});
let functorWithIndexFirst = new FunctorWithIndex(function () {
    return Data_Maybe_First.functorFirst;
}, function (f) {
    return Data_Functor.map(Data_Maybe_First.functorFirst)(f({}));
});
let functorWithIndexDual = new FunctorWithIndex(function () {
    return Data_Monoid_Dual.functorDual;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Dual.functorDual)(f({}));
});
let functorWithIndexDisj = new FunctorWithIndex(function () {
    return Data_Monoid_Disj.functorDisj;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Disj.functorDisj)(f({}));
});
let functorWithIndexConj = new FunctorWithIndex(function () {
    return Data_Monoid_Conj.functorConj;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Conj.functorConj)(f({}));
});
let functorWithIndexArray = new FunctorWithIndex(function () {
    return Data_Functor.functorArray;
}, mapWithIndexArray);
let functorWithIndexAdditive = new FunctorWithIndex(function () {
    return Data_Monoid_Additive.functorAdditive;
}, function (f) {
    return Data_Functor.map(Data_Monoid_Additive.functorAdditive)(f({}));
});
module.exports = {
    FunctorWithIndex: FunctorWithIndex,
    mapWithIndex: mapWithIndex,
    mapDefault: mapDefault,
    functorWithIndexArray: functorWithIndexArray,
    functorWithIndexMaybe: functorWithIndexMaybe,
    functorWithIndexFirst: functorWithIndexFirst,
    functorWithIndexLast: functorWithIndexLast,
    functorWithIndexAdditive: functorWithIndexAdditive,
    functorWithIndexDual: functorWithIndexDual,
    functorWithIndexConj: functorWithIndexConj,
    functorWithIndexDisj: functorWithIndexDisj,
    functorWithIndexMultiplicative: functorWithIndexMultiplicative
};
