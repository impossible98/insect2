const control = require("../control");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
const data = require("../data");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Maybe_First = require("../Data.Maybe.First/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
let Effect = require("../Effect/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");
let Test_QuickCheck_Arbitrary = require("../Test.QuickCheck.Arbitrary/index.js");
let Test_QuickCheck_Gen = require("../Test.QuickCheck.Gen/index.js");

const data = require("../data");


let unSeed = function (v) {
	return v;
};

let seedMin = 1;
let lcgM = 2147483647;
let seedMax = lcgM - 1 | 0;
let mkSeed = function (x) {
	let ensureBetween = function (min) {
		return function (max) {
			return function (n) {
				let rangeSize = max - min | 0;
				let n$prime = data.mod(data.euclideanRingInt)(n)(rangeSize);
				let $14 = n$prime < min;
				if ($14) {
					return n$prime + max | 0;
				};
				return n$prime;
			};
		};
	};
	return ensureBetween(seedMin)(seedMax)(x);
};

let fromNumberImpl = function (just) {
	return function (nothing) {
		return function (n) {
			return (n | 0) === n ? just(n) : nothing;
		};
	};
};

let toNumber = function (n) {
	return n;
}

let fromNumber = fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
let unsafeClamp = function (x) {
	if (x === Infinity) {
		return 0;
	};
	if (x === -Infinity) {
		return 0;
	};
	if (x >= toNumber(Data_Bounded.top(Data_Bounded.boundedInt))) {
		return Data_Bounded.top(Data_Bounded.boundedInt);
	};
	if (x <= toNumber(Data_Bounded.bottom(Data_Bounded.boundedInt))) {
		return Data_Bounded.bottom(Data_Bounded.boundedInt);
	};
	if (true) {
		return Data_Maybe.fromMaybe(0)(fromNumber(x));
	};
	throw new Error("Failed pattern match at Data.Int (line 66, column 1 - line 66, column 29): " + [x.constructor.name]);
};
let floor = function ($24) {
	return unsafeClamp(Math.floor($24));
};


let randomInt = function (low) {
	return function (high) {
		return function __do() {
			let n = Math.random();
			let asNumber = ((toNumber(high) - toNumber(low)) + 1) * n + toNumber(low);
			return floor(asNumber);
		};
	};
};


let Success = (function () {
	function Success() {

	};
	Success.value = new Success();
	return Success;
})();
let Failed = (function () {
	function Failed(value0) {
		this.value0 = value0;
	};
	Failed.create = function (value0) {
		return new Failed(value0);
	};
	return Failed;
})();
let Testable = function (test) {
	this.test = test;
};
let withHelp = function (v) {
	return function (v1) {
		if (v) {
			return Success.value;
		};
		if (!v) {
			return new Failed(v1);
		};
		throw new Error("Failed pattern match at Test.QuickCheck (line 233, column 1 - line 233, column 40): " + [v.constructor.name, v1.constructor.name]);
	};
};
let testableResult = new Testable(control.pure(Test_QuickCheck_Gen.applicativeGen));
let testableBoolean = new Testable(function (v) {
	if (v) {
		return control.pure(Test_QuickCheck_Gen.applicativeGen)(Success.value);
	};
	if (!v) {
		return control.pure(Test_QuickCheck_Gen.applicativeGen)(new Failed("Test returned false"));
	};
	throw new Error("Failed pattern match at Test.QuickCheck (line 209, column 1 - line 211, column 51): " + [v.constructor.name]);
});
let test = function (dict) {
	return dict.test;
};
let testableFunction = function (dictArbitrary) {
	return function (dictTestable) {
		return new Testable(function (f) {
			return control.bind(Test_QuickCheck_Gen.bindGen)(Test_QuickCheck_Arbitrary.arbitrary(dictArbitrary))((function () {
				let $65 = test(dictTestable);
				return function ($66) {
					return $65(f($66));
				};
			})());
		});
	};
};
let testableGen = function (dictTestable) {
	return new Testable(data.flip(control.bind(Test_QuickCheck_Gen.bindGen))(test(dictTestable)));
};
let showResult = new Data_Show.Show(function (v) {
	if (v instanceof Success) {
		return "Success";
	};
	if (v instanceof Failed) {
		return "Failed: " + v.value0;
	};
	throw new Error("Failed pattern match at Test.QuickCheck (line 222, column 1 - line 224, column 40): " + [v.constructor.name]);
});


function unSeed(v) {
	return v;
}


let quickCheckWithSeed = function (dictTestable) {
	return function (initialSeed) {
		return function (n) {
			return function (prop) {
				let loop = function (v) {
					if (v.index === n) {
						return new Control_Monad_Rec_Class.Done(v);
					};
					if (true) {
						let v1 = Test_QuickCheck_Gen.runGen(test(dictTestable)(prop))({
							newSeed: v.seed,
							size: 10
						});
						if (v1.value0 instanceof Success) {
							return new Control_Monad_Rec_Class.Loop({
								seed: v1.value1.newSeed,
								index: v.index + 1 | 0,
								successes: v.successes + 1 | 0,
								firstFailure: v.firstFailure
							});
						};
						if (v1.value0 instanceof Failed) {
							return new Control_Monad_Rec_Class.Loop({
								seed: v1.value1.newSeed,
								index: v.index + 1 | 0,
								successes: v.successes,
								firstFailure: Data_Semigroup.append(Data_Maybe_First.semigroupFirst)(v.firstFailure)(new Data_Maybe.Just({
									index: v.index,
									message: v1.value0.value0,
									seed: v.seed
								}))
							});
						};
						throw new Error("Failed pattern match at Test.QuickCheck (line 119, column 9 - line 134, column 16): " + [v1.constructor.name]);
					};
					throw new Error("Failed pattern match at Test.QuickCheck (line 115, column 3 - line 115, column 48): " + [v.constructor.name]);
				};
				let result = Control_Monad_Rec_Class.tailRec(loop)({
					seed: initialSeed,
					index: 0,
					successes: 0,
					firstFailure: Data_Monoid.mempty(Data_Maybe_First.monoidFirst)
				});
				return function __do() {
					Effect.log(Data_Show.show(Data_Show.showInt)(result.successes) + ("/" + (Data_Show.show(Data_Show.showInt)(n) + " test(s) passed.")))();
					return Data_Foldable.for_(Effect.applicativeEffect)(Data_Foldable.foldableFirst)(result.firstFailure)(function (v) {
						return Effect_Exception.throwException(Effect_Exception.error("Test " + (Data_Show.show(Data_Show.showInt)(v.index + 1 | 0) + (" (seed " + (Data_Show.show(Data_Show.showInt)(unSeed(v.seed)) + (") failed: \x0a" + v.message))))));
					})();
				};
			};
		};
	};
};
let quickCheckPure$prime = function (dictTestable) {
	return function (s) {
		return function (n) {
			return function (prop) {
				let go = function (p) {
					return Test_QuickCheck_Gen.stateful(function (gs) {
						return data.map(Test_QuickCheck_Gen.functorGen)(Data_Tuple.Tuple.create(gs.newSeed))(test(dictTestable)(p));
					});
				};
				return Test_QuickCheck_Gen.evalGen(Data_Unfoldable.replicateA(Test_QuickCheck_Gen.applicativeGen)(Data_List_Types.unfoldableList)(Data_List_Types.traversableList)(n)(go(prop)))({
					newSeed: s,
					size: 10
				});
			};
		};
	};
};
let quickCheckPure = function (dictTestable) {
	return function (s) {
		return function (n) {
			return function (prop) {
				return Test_QuickCheck_Gen.evalGen(Data_Unfoldable.replicateA(Test_QuickCheck_Gen.applicativeGen)(Data_List_Types.unfoldableList)(Data_List_Types.traversableList)(n)(test(dictTestable)(prop)))({
					newSeed: s,
					size: 10
				});
			};
		};
	};
};
let quickCheckGenWithSeed = function (dictTestable) {
	return quickCheckWithSeed(testableGen(dictTestable));
};
let quickCheckGenPure$prime = function (dictTestable) {
	return quickCheckPure$prime(testableGen(dictTestable));
};
let quickCheckGenPure = function (dictTestable) {
	return quickCheckPure(testableGen(dictTestable));
};






let randomSeed = data.map(Effect.functorEffect)(mkSeed)(randomInt(seedMin)(seedMax));


let quickCheck$prime = function (dictTestable) {
	return function (n) {
		return function (prop) {
			return function __do() {
				let seed = randomSeed();
				return quickCheckWithSeed(dictTestable)(seed)(n)(prop)();
			};
		};
	};
};
let quickCheckGen$prime = function (dictTestable) {
	return quickCheck$prime(testableGen(dictTestable));
};
let quickCheck = function (dictTestable) {
	return function (prop) {
		return quickCheck$prime(dictTestable)(100)(prop);
	};
};
let quickCheckGen = function (dictTestable) {
	return quickCheck(testableGen(dictTestable));
};
let printSummary = function (summary) {
	return Data_Show.show(Data_Show.showInt)(summary.successes) + ("/" + (Data_Show.show(Data_Show.showInt)(summary.total) + (function () {
		let $57 = summary.total === 1;
		if ($57) {
			return " test passed.";
		};
		return " tests passed.";
	})()));
};
let checkResults = (function () {
	let go = function (index) {
		return function (st) {
			return function (v) {
				if (v.value1 instanceof Success) {
					return {
						total: st.total + 1 | 0,
						successes: st.successes + 1 | 0,
						failures: st.failures
					};
				};
				if (v.value1 instanceof Failed) {
					return {
						total: st.total + 1 | 0,
						successes: st.successes,
						failures: new Data_List_Types.Cons({
							index: index,
							seed: v.value0,
							message: v.value1.value0
						}, st.failures)
					};
				};
				throw new Error("Failed pattern match at Test.QuickCheck (line 185, column 7 - line 189, column 97): " + [v.value1.constructor.name]);
			};
		};
	};
	return Data_FoldableWithIndex.foldlWithIndex(Data_List_Types.foldableWithIndexList)(go)({
		total: 0,
		successes: 0,
		failures: Data_List_Types.Nil.value
	});
})();
let assertOp = function (dictEq) {
	return function (dictShow) {
		return function (op) {
			return function (failString) {
				return function (a) {
					return function (b) {
						return withHelp(op(a)(b))(Data_Show.show(dictShow)(a) + (failString + Data_Show.show(dictShow)(b)));
					};
				};
			};
		};
	};
};
let assertNotEquals = function (dictEq) {
	return function (dictShow) {
		return assertOp(dictEq)(dictShow)(data.notEq(dictEq))(" == ");
	};
};
let assertLessThanEq = function (dictOrd) {
	return function (dictShow) {
		return assertOp(dictOrd.Eq0())(dictShow)(Data_Ord.lessThanOrEq(dictOrd))(" > ");
	};
};
let assertLessThan = function (dictOrd) {
	return function (dictShow) {
		return assertOp(dictOrd.Eq0())(dictShow)(Data_Ord.lessThan(dictOrd))(" >= ");
	};
};
let assertGreaterThanEq = function (dictOrd) {
	return function (dictShow) {
		return assertOp(dictOrd.Eq0())(dictShow)(Data_Ord.greaterThanOrEq(dictOrd))(" < ");
	};
};
let assertGreaterThan = function (dictOrd) {
	return function (dictShow) {
		return assertOp(dictOrd.Eq0())(dictShow)(Data_Ord.greaterThan(dictOrd))(" <= ");
	};
};
let assertEquals = function (dictEq) {
	return function (dictShow) {
		return assertOp(dictEq)(dictShow)(data.eq(dictEq))(" /= ");
	};
};
module.exports = {
	quickCheck: quickCheck,
	quickCheckGen: quickCheckGen,
	"quickCheck'": quickCheck$prime,
	"quickCheckGen'": quickCheckGen$prime,
	quickCheckWithSeed: quickCheckWithSeed,
	quickCheckGenWithSeed: quickCheckGenWithSeed,
	quickCheckPure: quickCheckPure,
	"quickCheckPure'": quickCheckPure$prime,
	quickCheckGenPure: quickCheckGenPure,
	"quickCheckGenPure'": quickCheckGenPure$prime,
	checkResults: checkResults,
	printSummary: printSummary,
	Testable: Testable,
	test: test,
	Success: Success,
	Failed: Failed,
	withHelp: withHelp,
	assertEquals: assertEquals,
	assertNotEquals: assertNotEquals,
	assertLessThan: assertLessThan,
	assertLessThanEq: assertLessThanEq,
	assertGreaterThan: assertGreaterThan,
	assertGreaterThanEq: assertGreaterThanEq,
	testableResult: testableResult,
	testableBoolean: testableBoolean,
	testableFunction: testableFunction,
	testableGen: testableGen,
	showResult: showResult
};
