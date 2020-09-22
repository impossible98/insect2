const control = require("../control");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");
let Control_Monad_Gen_Common = require("../Control.Monad.Gen.Common/index.js");
let Data_Array_NonEmpty = require("../Data.Array.NonEmpty/index.js");
let Data_Array_ST = require("../Data.Array.ST/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Enum = require("../Data.Enum/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");

let Data_Functor = require("../Data.Functor/index.js");
let Data_Generic_Rep = require("../Data.Generic.Rep/index.js");
let Data_Identity = require("../Data.Identity/index.js");
let Data_Lazy = require("../Data.Lazy/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ordering = require("../Data.Ordering/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
let Data_String_Common = require("../Data.String.Common/index.js");
let Data_String_NonEmpty_CodeUnits = require("../Data.String.NonEmpty.CodeUnits/index.js");
let Data_String_NonEmpty_Internal = require("../Data.String.NonEmpty.Internal/index.js");
let Data_String_Pattern = require("../Data.String.Pattern/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
const record = require("../record");
let Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen/index.js");
const type = require('../type');


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

let SProxy = (function () {
	function SProxy() {

	};
	SProxy.value = new SProxy();
	return SProxy;
})();


function identity(dict) {
	return dict.identity;
}

let apply = function (dict) {
	return dict.apply;
};

let Coarbitrary = function (coarbitrary) {
	this.coarbitrary = coarbitrary;
};
let ArbitraryRowList = function (arbitraryRecord) {
	this.arbitraryRecord = arbitraryRecord;
};
let ArbitraryGenericSum = function (arbitraryGenericSum) {
	this.arbitraryGenericSum = arbitraryGenericSum;
};
let Arbitrary = function (arbitrary) {
	this.arbitrary = arbitrary;
};
let coarbitraryNoArguments = new Coarbitrary(function (v) {
	return identity(categoryFn);
});
let coarbitrary = function (dict) {
	return dict.coarbitrary;
};
let coarbitraryArgument = function (dictCoarbitrary) {
	return new Coarbitrary(function (v) {
		return coarbitrary(dictCoarbitrary)(v);
	});
};
let coarbitraryConstructor = function (dictCoarbitrary) {
	return new Coarbitrary(function (v) {
		return coarbitrary(dictCoarbitrary)(v);
	});
};
let coarbitraryProduct = function (dictCoarbitrary) {
	return function (dictCoarbitrary1) {
		return new Coarbitrary(function (v) {
			let $98 = coarbitrary(dictCoarbitrary1)(v.value1);
			let $99 = coarbitrary(dictCoarbitrary)(v.value0);
			return function ($100) {
				return $98($99($100));
			};
		});
	};
};
let coarbitrarySum = function (dictCoarbitrary) {
	return function (dictCoarbitrary1) {
		return new Coarbitrary(function (v) {
			if (v instanceof Data_Generic_Rep.Inl) {
				return coarbitrary(dictCoarbitrary)(v.value0);
			};
			if (v instanceof Data_Generic_Rep.Inr) {
				return coarbitrary(dictCoarbitrary1)(v.value0);
			};
			throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 216, column 1 - line 218, column 38): " + [v.constructor.name]);
		});
	};
};
let genericCoarbitrary = function (dictGeneric) {
	return function (dictCoarbitrary) {
		return function (x) {
			return function (g) {
				return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.to(dictGeneric))(coarbitrary(dictCoarbitrary)(Data_Generic_Rep.from(dictGeneric)(x))(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.from(dictGeneric))(g)));
			};
		};
	};
};
let coarbUnit = new Coarbitrary(function (v) {
	return Test_QuickCheck_Gen.perturbGen(1.0);
});
let coarbTuple = function (dictCoarbitrary) {
	return function (dictCoarbitrary1) {
		return new Coarbitrary(function (v) {
			let $101 = coarbitrary(dictCoarbitrary1)(v.value1);
			let $102 = coarbitrary(dictCoarbitrary)(v.value0);
			return function ($103) {
				return $101($102($103));
			};
		});
	};
};
let coarbOrdering = new Coarbitrary(function (v) {
	if (v instanceof Data_Ordering.LT) {
		return Test_QuickCheck_Gen.perturbGen(1.0);
	};
	if (v instanceof Data_Ordering.EQ) {
		return Test_QuickCheck_Gen.perturbGen(2.0);
	};
	if (v instanceof Data_Ordering.GT) {
		return Test_QuickCheck_Gen.perturbGen(3.0);
	};
	throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 114, column 1 - line 117, column 34): " + [v.constructor.name]);
});
let coarbNumber = new Coarbitrary(Test_QuickCheck_Gen.perturbGen);
let coarbNonEmpty = function (dictCoarbitrary) {
	return function (dictCoarbitrary1) {
		return new Coarbitrary(function (v) {
			let $104 = coarbitrary(dictCoarbitrary)(v.value1);
			let $105 = coarbitrary(dictCoarbitrary1)(v.value0);
			return function ($106) {
				return $104($105($106));
			};
		});
	};
};
let coarbMaybe = function (dictCoarbitrary) {
	return new Coarbitrary(function (v) {
		if (v instanceof Data_Maybe.Nothing) {
			return Test_QuickCheck_Gen.perturbGen(1.0);
		};
		if (v instanceof Data_Maybe.Just) {
			return coarbitrary(dictCoarbitrary)(v.value0);
		};
		throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 154, column 1 - line 156, column 39): " + [v.constructor.name]);
	});
};
let coarbList = function (dictCoarbitrary) {
	return new Coarbitrary(Data_Foldable.foldl(Data_List_Types.foldableList)(function (f) {
		return function (x) {
			let $107 = coarbitrary(dictCoarbitrary)(x);
			return function ($108) {
				return f($107($108));
			};
		};
	})(identity(categoryFn)));
};
let coarbNonEmptyList = function (dictCoarbitrary) {
	return new Coarbitrary(function (v) {
		return coarbitrary(coarbNonEmpty(coarbList(dictCoarbitrary))(dictCoarbitrary))(v);
	});
};
let coarbLazy = function (dictCoarbitrary) {
	return new Coarbitrary(function (a) {
		return coarbitrary(dictCoarbitrary)(Data_Lazy.force(a));
	});
};
let toNumber = function (n) {
	return n;
};

let coarbInt = new Coarbitrary(function ($109) {
	return Test_QuickCheck_Gen.perturbGen(toNumber($109));
});
let coarbIdentity = function (dictCoarbitrary) {
	return new Coarbitrary(function (v) {
		return coarbitrary(dictCoarbitrary)(v);
	});
};
let coarbEither = function (dictCoarbitrary) {
	return function (dictCoarbitrary1) {
		return new Coarbitrary(function (v) {
			if (v instanceof Data_Either.Left) {
				return coarbitrary(dictCoarbitrary)(v.value0);
			};
			if (v instanceof Data_Either.Right) {
				return coarbitrary(dictCoarbitrary1)(v.value0);
			};
			throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 161, column 1 - line 163, column 40): " + [v.constructor.name]);
		});
	};
};
let coarbChar = new Coarbitrary(function (c) {
	return coarbitrary(coarbInt)(Data_Enum.fromEnum(Data_Enum.boundedEnumChar)(c));
});
let coarbBoolean = new Coarbitrary(function (v) {
	if (v) {
		return Test_QuickCheck_Gen.perturbGen(1.0);
	};
	if (!v) {
		return Test_QuickCheck_Gen.perturbGen(2.0);
	};
	throw new Error("Failed pattern match at Test.QuickCheck.Arbitrary (line 71, column 1 - line 73, column 37): " + [v.constructor.name]);
});
let coarbArray = function (dictCoarbitrary) {
	return new Coarbitrary(Data_Foldable.foldl(Data_Foldable.foldableArray)(function (f) {
		return function (x) {
			let $110 = coarbitrary(dictCoarbitrary)(x);
			return function ($111) {
				return f($110($111));
			};
		};
	})(identity(categoryFn)));
};
let coarbNonEmptyArray = function (dictCoarbitrary) {
	return new Coarbitrary((function () {
		let $112 = coarbitrary(coarbArray(dictCoarbitrary));
		return function ($113) {
			return $112(Data_Array_NonEmpty.toArray($113));
		};
	})());
};
let coarbString = new Coarbitrary(function (s) {
	return coarbitrary(coarbArray(coarbMaybe(coarbChar)))(Data_Functor.map(Data_Functor.functorArray)(Data_String_CodeUnits.charAt(0))(Data_String_Common.split(Data_Newtype.wrap(Data_String_Pattern.newtypePattern)(""))(s)));
});
let coarbNonEmptyString = new Coarbitrary((function () {
	let $114 = coarbitrary(coarbString);
	return function ($115) {
		return $114(Data_String_NonEmpty_Internal.toString($115));
	};
})());
let arbitraryRowListNil = new ArbitraryRowList(function (v) {
	return control.pure(Test_QuickCheck_Gen.applicativeGen)({});
});
let arbitraryRecord = function (dict) {
	return dict.arbitraryRecord;
};
let arbitraryRecordInstance = function (dictRowToList) {
	return function (dictArbitraryRowList) {
		return new Arbitrary(arbitraryRecord(dictArbitraryRowList)(type.RLProxy.value));
	};
};
let arbitraryNoArguments = new Arbitrary(control.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Generic_Rep.NoArguments.value));
let arbitraryGenericSum = function (dict) {
	return dict.arbitraryGenericSum;
};
let arbitrary = function (dict) {
	return dict.arbitrary;
};
let arbitraryArgument = function (dictArbitrary) {
	return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Argument)(arbitrary(dictArbitrary)));
};
let arbitraryConstructor = function (dictArbitrary) {
	return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Constructor)(arbitrary(dictArbitrary)));
};
let arbitraryIdentity = function (dictArbitrary) {
	return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Identity.Identity)(arbitrary(dictArbitrary)));
};
let arbitraryLazy = function (dictArbitrary) {
	return new Arbitrary(control.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(dictArbitrary))((function () {
		let $116 = control.pure(Test_QuickCheck_Gen.applicativeGen);
		return function ($117) {
			return $116(Data_Lazy.defer(Data_Functor._const($117)));
		};
	})()));
};
let arbitraryList = function (dictArbitrary) {
	return new Arbitrary(Test_QuickCheck_Gen.sized(function (n) {
		return control.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Gen.chooseInt(0)(n))(Data_Functor.flip(Test_QuickCheck_Gen.listOf)(arbitrary(dictArbitrary)));
	}));
};
let arbitraryProduct = function (dictArbitrary) {
	return function (dictArbitrary1) {
		return new Arbitrary(apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Product.create)(arbitrary(dictArbitrary)))(arbitrary(dictArbitrary1)));
	};
};
let arbitraryRowListCons = function (dictArbitrary) {
	return function (dictArbitraryRowList) {
		return function (dictLacks) {
			return function (dictCons) {
				return function (dictRowToList) {
					return function (dictIsSymbol) {
						return new ArbitraryRowList(function (v) {
							return control.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(dictArbitrary))(function (value) {
								return control.bind(Test_QuickCheck_Gen.bindGen)(arbitraryRecord(dictArbitraryRowList)(type.RLProxy.value))(function (previous) {
									return control.pure(Test_QuickCheck_Gen.applicativeGen)(record.insert(dictIsSymbol)()()(SProxy.value)(value)(previous));
								});
							});
						});
					};
				};
			};
		};
	};
};
let arbitrarySum = function (dictArbitrary) {
	return function (dictArbitraryGenericSum) {
		return new Arbitrary(Test_QuickCheck_Gen.oneOf(new Data_NonEmpty.NonEmpty(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Inl.create)(arbitrary(dictArbitrary)), Data_Functor.map(Data_Functor.functorArray)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Inr.create))(arbitraryGenericSum(dictArbitraryGenericSum)))));
	};
};
let genericArbitrary = function (dictGeneric) {
	return function (dictArbitrary) {
		return Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.to(dictGeneric))(arbitrary(dictArbitrary));
	};
};
let arbUnit = new Arbitrary(control.pure(Test_QuickCheck_Gen.applicativeGen)());
let arbTuple = function (dictArbitrary) {
	return function (dictArbitrary1) {
		return new Arbitrary(apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Tuple.Tuple.create)(arbitrary(dictArbitrary)))(arbitrary(dictArbitrary1)));
	};
};
let arbOrdering = new Arbitrary(Test_QuickCheck_Gen.elements(new Data_NonEmpty.NonEmpty(Data_Ordering.LT.value, [Data_Ordering.EQ.value, Data_Ordering.GT.value])));
let arbNumber = new Arbitrary(Test_QuickCheck_Gen.uniform);
let arbNonEmpty = function (dictArbitrary) {
	return function (dictArbitrary1) {
		return new Arbitrary(apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_NonEmpty.NonEmpty.create)(arbitrary(dictArbitrary1)))(arbitrary(dictArbitrary)));
	};
};
let arbNonEmptyList = function (dictArbitrary) {
	return new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_List_Types.NonEmptyList)(arbitrary(arbNonEmpty(arbitraryList(dictArbitrary))(dictArbitrary))));
};
let arbMaybe = function (dictArbitrary) {
	return new Arbitrary(Control_Monad_Gen_Common.genMaybe(Test_QuickCheck_Gen.monadGenGen)(arbitrary(dictArbitrary)));
};
let arbInt = new Arbitrary(Test_QuickCheck_Gen.chooseInt(-1000000 | 0)(1000000));
let arbGenSumSum = function (dictArbitrary) {
	return function (dictArbitraryGenericSum) {
		return new ArbitraryGenericSum(Data_Semigroup.append(Data_Semigroup.semigroupArray)([Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Inl.create)(arbitrary(dictArbitrary))])(Data_Functor.map(Data_Functor.functorArray)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Generic_Rep.Inr.create))(arbitraryGenericSum(dictArbitraryGenericSum))));
	};
};
let arbGenSumConstructor = function (dictArbitrary) {
	return new ArbitraryGenericSum([arbitrary(arbitraryConstructor(dictArbitrary))]);
};
let arbFunction = function (dictCoarbitrary) {
	return function (dictArbitrary) {
		return new Arbitrary(Test_QuickCheck_Gen.repeatable(function (a) {
			return coarbitrary(dictCoarbitrary)(a)(arbitrary(dictArbitrary));
		}));
	};
};
let arbEither = function (dictArbitrary) {
	return function (dictArbitrary1) {
		return new Arbitrary(Control_Monad_Gen_Common.genEither(Test_QuickCheck_Gen.monadGenGen)(arbitrary(dictArbitrary))(arbitrary(dictArbitrary1)));
	};
};
let arbChar = new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_Enum.toEnumWithDefaults(Data_Enum.boundedEnumChar)(Data_Bounded.bottom(Data_Bounded.boundedChar))(Data_Bounded.top(Data_Bounded.boundedChar)))(Test_QuickCheck_Gen.chooseInt(0)(65536)));
let arbBoolean = new Arbitrary(Control_Monad_Gen_Class.chooseBool(Test_QuickCheck_Gen.monadGenGen));
let arbArray = function (dictArbitrary) {
	return new Arbitrary(Test_QuickCheck_Gen.arrayOf(arbitrary(dictArbitrary)));
};
let arbNonEmptyArray = function (dictArbitrary) {
	return new Arbitrary(control.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(dictArbitrary))(function (x) {
		return control.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbArray(dictArbitrary)))(function (xs) {
			return control.pure(Test_QuickCheck_Gen.applicativeGen)(Data_Maybe.fromJust()(Data_Array_NonEmpty.fromArray((function __do() {
				let mxs = Data_Array_ST.unsafeThaw(xs)();
				Data_Array_ST.push(x)(mxs)();
				return Data_Array_ST.unsafeFreeze(mxs)();
			})())));
		});
	}));
};
let arbString = new Arbitrary(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_String_CodeUnits.fromCharArray)(arbitrary(arbArray(arbChar))));
let arbNonEmptyString = new Arbitrary(apply(Test_QuickCheck_Gen.applyGen)(Data_Functor.map(Test_QuickCheck_Gen.functorGen)(Data_String_NonEmpty_CodeUnits.cons)(arbitrary(arbChar)))(arbitrary(arbString)));
let coarbFunction = function (dictArbitrary) {
	return function (dictCoarbitrary) {
		return new Coarbitrary(function (f) {
			return function (gen) {
				return control.bind(Test_QuickCheck_Gen.bindGen)(arbitrary(arbArray(dictArbitrary)))(function (xs) {
					return coarbitrary(coarbArray(dictCoarbitrary))(Data_Functor.map(Data_Functor.functorArray)(f)(xs))(gen);
				});
			};
		});
	};
};
module.exports = {
	Arbitrary: Arbitrary,
	arbitrary: arbitrary,
	Coarbitrary: Coarbitrary,
	coarbitrary: coarbitrary,
	genericArbitrary: genericArbitrary,
	genericCoarbitrary: genericCoarbitrary,
	ArbitraryGenericSum: ArbitraryGenericSum,
	arbitraryGenericSum: arbitraryGenericSum,
	ArbitraryRowList: ArbitraryRowList,
	arbitraryRecord: arbitraryRecord,
	arbBoolean: arbBoolean,
	coarbBoolean: coarbBoolean,
	arbNumber: arbNumber,
	coarbNumber: coarbNumber,
	arbInt: arbInt,
	coarbInt: coarbInt,
	arbString: arbString,
	coarbString: coarbString,
	arbNonEmptyString: arbNonEmptyString,
	coarbNonEmptyString: coarbNonEmptyString,
	arbChar: arbChar,
	coarbChar: coarbChar,
	arbUnit: arbUnit,
	coarbUnit: coarbUnit,
	arbOrdering: arbOrdering,
	coarbOrdering: coarbOrdering,
	arbArray: arbArray,
	coarbArray: coarbArray,
	arbNonEmptyArray: arbNonEmptyArray,
	coarbNonEmptyArray: coarbNonEmptyArray,
	arbFunction: arbFunction,
	coarbFunction: coarbFunction,
	arbTuple: arbTuple,
	coarbTuple: coarbTuple,
	arbMaybe: arbMaybe,
	coarbMaybe: coarbMaybe,
	arbEither: arbEither,
	coarbEither: coarbEither,
	arbitraryList: arbitraryList,
	coarbList: coarbList,
	arbitraryIdentity: arbitraryIdentity,
	coarbIdentity: coarbIdentity,
	arbitraryLazy: arbitraryLazy,
	coarbLazy: coarbLazy,
	arbNonEmpty: arbNonEmpty,
	coarbNonEmpty: coarbNonEmpty,
	arbNonEmptyList: arbNonEmptyList,
	coarbNonEmptyList: coarbNonEmptyList,
	arbitraryNoArguments: arbitraryNoArguments,
	coarbitraryNoArguments: coarbitraryNoArguments,
	arbGenSumSum: arbGenSumSum,
	arbGenSumConstructor: arbGenSumConstructor,
	arbitrarySum: arbitrarySum,
	coarbitrarySum: coarbitrarySum,
	arbitraryProduct: arbitraryProduct,
	coarbitraryProduct: coarbitraryProduct,
	arbitraryConstructor: arbitraryConstructor,
	coarbitraryConstructor: coarbitraryConstructor,
	arbitraryArgument: arbitraryArgument,
	coarbitraryArgument: coarbitraryArgument,
	arbitraryRowListNil: arbitraryRowListNil,
	arbitraryRowListCons: arbitraryRowListCons,
	arbitraryRecordInstance: arbitraryRecordInstance
};
