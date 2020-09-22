const control = require("../control");
let Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
let Control_Monad_Free = require("../Control.Monad.Free/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State = require("../Control.Monad.State/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_State_Trans = require("../Control.Monad.State.Trans/index.js");
let Control_Parallel_Class = require("../Control.Parallel.Class/index.js");
let Data_Either = require("../Data.Either/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let data = require("../data");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Identity = require("../Data.Identity/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Aff_AVar = require("../Effect.Aff.AVar/index.js");
let Effect_Exception = require("../Effect.Exception/index.js");


function intAdd(x) {
	return function (y) {
		return x + y | 0;
	};
}

function intMul(x) {
	return function (y) {
		return x * y | 0;
	};
}

class Semiring {
	constructor(add, mul, one, zero) {
		this.add = add;
		this.mul = mul;
		this.one = one;
		this.zero = zero;
	}
}

let semiringInt = new Semiring(intAdd, intMul, 1, 0);

function alt(dict) {
	return dict.alt;
}

function Skip(x) {
	return x;
}

function Only(x) {
	return x;
}

let Group = (() => {
	function Group(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	Group.create = function (value0) {
		return function (value1) {
			return new Group(value0, value1);
		};
	};
	return Group;
})();

let TestGroup = (() => {
	function TestGroup(value0, value1, value2, value3) {
		this.value0 = value0;
		this.value1 = value1;
		this.value2 = value2;
		this.value3 = value3;
	};
	TestGroup.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return function (value3) {
					return new TestGroup(value0, value1, value2, value3);
				};
			};
		};
	};
	return TestGroup;
})();

let TestUnit = (() => {
	// function TestUnit(value0, value1, value2, value3, value4) {
	// 	this.value0 = value0;
	// 	this.value1 = value1;
	// 	this.value2 = value2;
	// 	this.value3 = value3;
	// 	this.value4 = value4;
	// };

	class TestUnit {
		constructor(value0, value1, value2, value3, value4) {
			this.value0 = value0;
			this.value1 = value1;
			this.value2 = value2;
			this.value3 = value3;
			this.value4 = value4;
		}
	}

	TestUnit.create = function (value0) {
		return function (value1) {
			return function (value2) {
				return function (value3) {
					return function (value4) {
						return new TestUnit(value0, value1, value2, value3, value4);
					};
				};
			};
		};
	};
	return TestUnit;
})();

let SkipUnit = (() => {
	function SkipUnit(value0, value1) {
		this.value0 = value0;
		this.value1 = value1;
	};
	SkipUnit.create = function (value0) {
		return function (value1) {
			return new SkipUnit(value0, value1);
		};
	};
	return SkipUnit;
})();

function testSkip(l) {
	return function (t) {
		return Control_Monad_Free.liftF(new TestUnit(l, true, false, t, {}));
	};
}

function testOnly(l) {
	return function (t) {
		return Control_Monad_Free.liftF(new TestUnit(l, false, true, t, {}));
	};
}

function test(l) {
	return function (t) {
		return Control_Monad_Free.liftF(new TestUnit(l, false, false, t, {}));
	};
}

let suiteSkip = function (label) {
	return (tests) => {
		return Control_Monad_Free.liftF(new TestGroup(new Group(label, tests), true, false, {}));
	};
}

function suiteOnly(label) {
	return function (tests) {
		return Control_Monad_Free.liftF(new TestGroup(new Group(label, tests), false, true, {}));
	};
}

function suite(label) {
	return function (tests) {
		return Control_Monad_Free.liftF(new TestGroup(new Group(label, tests), false, false, {}));
	};
}

let success = control.pure(Effect_Aff.applicativeAff)({});

function skipUnit(t) {
	return (a) => {
		return Control_Monad_Free.liftF(SkipUnit.create(t)(a));
	};
}

let showOnly = new Data_Show.Show(function (v) {
	return Data_Show.show(Data_Show.showBoolean)(v);
});

let newtypeSkip = new Data_Newtype.Newtype(function (n) {
	return n;
}, Skip);

let newtypeOnly = new Data_Newtype.Newtype(function (n) {
	return n;
}, Only);

function toNumber(n) {
	return n;
}

function Milliseconds(x) {
	return x;
}

function makeTimeout(time) {
	return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Effect_Aff.delay(Milliseconds(toNumber(time))))(() => {
		return Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff)(Effect_Exception.error("test timed out after " + (Data_Show.show(Data_Show.showInt)(time) + "ms")));
	});
}

function timeout(time) {
	return function (t) {
		return control.bind(Effect_Aff.bindAff)(Control_Parallel_Class.sequential(Effect_Aff.parallelAff)(alt(Effect_Aff.altParAff)(Control_Parallel_Class.parallel(Effect_Aff.parallelAff)(Effect_Aff.attempt(makeTimeout(time))))(Control_Parallel_Class.parallel(Effect_Aff.parallelAff)(Effect_Aff.attempt(t)))))(function (r) {
			return Data_Either.either(Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff))(data._const(success))(r);
		});
	};
}

let keepErrors = (() => {
	let run = function (s) {
		return function (v) {
			if (v.value1 instanceof Data_Either.Left) {
				return Data_List.snoc(s)(new Data_Tuple.Tuple(v.value0, v.value1.value0));
			};
			return s;
		};
	};
	return Data_Foldable.foldl(Data_List_Types.foldableList)(run)(Data_List_Types.Nil.value);
})();

let it = test;

let haytingAlgebraOnly = new Data_HeytingAlgebra.HeytingAlgebra(Data_Newtype.over2(newtypeOnly)(newtypeOnly)(Only)(Data_HeytingAlgebra.conj(Data_HeytingAlgebra.heytingAlgebraBoolean)), Data_Newtype.over2(newtypeOnly)(newtypeOnly)(Only)(Data_HeytingAlgebra.disj(Data_HeytingAlgebra.heytingAlgebraBoolean)), false, Data_Newtype.over2(newtypeOnly)(newtypeOnly)(Only)(Data_HeytingAlgebra.implies(Data_HeytingAlgebra.heytingAlgebraBoolean)), Data_Newtype.over(newtypeOnly)(newtypeOnly)(Only)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean)), true);

function hasOnly(t) {
	let go = function (v) {
		if (v instanceof TestGroup) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))((() => {
				let $159 = Data_HeytingAlgebra.disj(Data_Tuple.heytingAlgebraTuple(haytingAlgebraOnly)(haytingAlgebraOnly))(hasOnly(v.value0.value1));
				let $160 = Data_HeytingAlgebra.disj(Data_Tuple.heytingAlgebraTuple(haytingAlgebraOnly)(haytingAlgebraOnly))(new Data_Tuple.Tuple(v.value2, Data_HeytingAlgebra.ff(haytingAlgebraOnly)));
				return function ($161) {
					return $159($160($161));
				};
			})()))(v.value3);
		}

		if (v instanceof TestUnit) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(Data_HeytingAlgebra.disj(Data_Tuple.heytingAlgebraTuple(haytingAlgebraOnly)(haytingAlgebraOnly))(new Data_Tuple.Tuple(Data_HeytingAlgebra.ff(haytingAlgebraOnly), v.value2))))(v.value4);
		}

		if (v instanceof SkipUnit) {
			return control.pure(Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity))(v.value1);
		}

		throw new Error("Failed pattern match at Test.Unit (line 135, column 5 - line 135, column 43): " + [v.constructor.name]);
	};
	return Control_Monad_State.execState(Control_Monad_Free.foldFree(Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity))(go)(t))(Data_HeytingAlgebra.ff(Data_Tuple.heytingAlgebraTuple(haytingAlgebraOnly)(haytingAlgebraOnly)));
}

let functorTestF = new data.Functor(function (f) {
	return function (v) {
		if (v instanceof TestGroup) {
			return new TestGroup(v.value0, v.value1, v.value2, f(v.value3));
		};
		if (v instanceof TestUnit) {
			return new TestUnit(v.value0, v.value1, v.value2, v.value3, f(v.value4));
		};
		if (v instanceof SkipUnit) {
			return new SkipUnit(data.map(functorTestF)(f)(v.value0), f(v.value1));
		};
		throw new Error("Failed pattern match at Test.Unit (line 98, column 1 - line 101, column 50): " + [f.constructor.name, v.constructor.name]);
	};
});

function walkSuite(runItem) {
	return (tests) => {
		return control.bind(Effect_Aff.bindAff)(Effect_Aff_AVar["new"](Data_List_Types.Nil.value))(function (coll) {
			function walkItem(path) {
				return function (v) {
					if (v instanceof TestGroup) {
						return control.discard(control.discardUnit)(Effect_Aff.bindAff)(runItem(path)(new Data_Either.Left(v.value0.value0)))(() => {
							return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Control_Monad_Free.runFreeM(functorTestF)(Effect_Aff.monadRecAff)(walkItem(Data_List.snoc(path)(v.value0.value0)))(v.value0.value1))(() => {
								return control.pure(Effect_Aff.applicativeAff)(v.value3);
							});
						});
					};
					if (v instanceof TestUnit) {
						return control.bind(Effect_Aff.bindAff)(Effect_Aff.suspendAff(v.value3))(function (fiber) {
							return control.bind(Effect_Aff.bindAff)(Effect_Aff_AVar.take(coll))(function (cs) {
								return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Effect_Aff_AVar.put(new Data_List_Types.Cons(Data_Tuple.Tuple.create(Data_List.snoc(path)(v.value0))(Effect_Aff.joinFiber(fiber)), cs))(coll))(() => {
									return control.discard(control.discardUnit)(Effect_Aff.bindAff)(runItem(path)(Data_Either.Right.create(Data_Tuple.Tuple.create(v.value0)(Effect_Aff.joinFiber(fiber)))))(() => {
										return control.pure(Effect_Aff.applicativeAff)(v.value4);
									});
								});
							});
						});
					};
					if (v instanceof SkipUnit) {
						return control.pure(Effect_Aff.applicativeAff)(v.value1);
					};
					throw new Error("Failed pattern match at Test.Unit (line 205, column 7 - line 208, column 18): " + [path.constructor.name, v.constructor.name]);
				};
			}

			return control.discard(control.discardUnit)(Effect_Aff.bindAff)(Control_Monad_Free.runFreeM(functorTestF)(Effect_Aff.monadRecAff)(walkItem(Data_List_Types.Nil.value))(tests))(() => {
				return control.bind(Effect_Aff.bindAff)(Effect_Aff_AVar.take(coll))(function (res) {
					return control.pure(Effect_Aff.applicativeAff)(res);
				});
			});
		});
	};
};

let filterEmptyNodes = (() => {
	let isEmpty = function (t) {
		return Control_Monad_State.execState(Control_Monad_Free.foldFree(Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity))(empty)(t))(true);
	};
	let empty = function (v) {
		if (v instanceof TestGroup) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(Data_HeytingAlgebra.conj(Data_HeytingAlgebra.heytingAlgebraBoolean)(isEmpty(v.value0.value1))))(v.value3);
		};
		if (v instanceof TestUnit) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(Data_HeytingAlgebra.conj(Data_HeytingAlgebra.heytingAlgebraBoolean)(false)))(v.value4);
		};
		if (v instanceof SkipUnit) {
			return control.pure(Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity))(v.value1);
		};
		throw new Error("Failed pattern match at Test.Unit (line 152, column 5 - line 152, column 36): " + [v.constructor.name]);
	};
	let go = function (v) {
		if (v instanceof TestGroup) {
			if (isEmpty(v.value0.value1)) {
				return skipUnit(v)(v.value3);
			};
			if (true) {
				return Control_Monad_Free.liftF(v);
			};
		};
		return Control_Monad_Free.liftF(v);
	};
	return Control_Monad_Free.substFree(go);
})();

function filterTests(t) {
	let v = hasOnly(t);
	let go = function (v1) {
		return function (v2) {
			if (v2 instanceof TestGroup) {
				let $94 = Data_Newtype.un(newtypeSkip)(Skip)(v2.value1);
				if ($94) {
					return skipUnit(v2)(v2.value3);
				};
				return Control_Monad_Free.liftF(new TestGroup(new Group(v2.value0.value0, Control_Monad_Free.substFree(go(v2.value2))(v2.value0.value1)), v2.value1, v2.value2, v2.value3));
			};
			if (v2 instanceof TestUnit) {
				let v3 = Data_Newtype.un(newtypeOnly)(Only)(Data_HeytingAlgebra.conj(haytingAlgebraOnly)(Data_HeytingAlgebra.implies(haytingAlgebraOnly)(v.value0)(v1))(Data_HeytingAlgebra.implies(haytingAlgebraOnly)(v.value1)(v2.value2))) && !Data_Newtype.un(newtypeSkip)(Skip)(v2.value1);
				if (v3) {
					return Control_Monad_Free.liftF(v2);
				};
				if (!v3) {
					return skipUnit(v2)(v2.value4);
				};
				throw new Error("Failed pattern match at Test.Unit (line 187, column 11 - line 189, column 35): " + [v3.constructor.name]);
			};
			if (v2 instanceof SkipUnit) {
				return Control_Monad_Free.liftF(v2);
			};
			throw new Error("Failed pattern match at Test.Unit (line 181, column 7 - line 181, column 40): " + [v1.constructor.name, v2.constructor.name]);
		};
	};
	return filterEmptyNodes(Control_Monad_Free.substFree(go(false))(t));
}

let failure = (() => {
	let $162 = Control_Monad_Error_Class.throwError(Effect_Aff.monadThrowAff);
	return function ($163) {
		return $162(Effect_Exception.error($163));
	};
})();

let describe = suite;

function countTests(ts) {
	let go = function (v) {
		if (v instanceof SkipUnit) {
			return control.pure(Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity))(v.value1);
		};
		if (v instanceof TestUnit) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(add(semiringInt)(1)))(v.value4);
		};
		if (v instanceof TestGroup) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(add(semiringInt)(countTests(v.value0.value1))))(v.value3);
		};
		throw new Error("Failed pattern match at Test.Unit (line 160, column 5 - line 160, column 29): " + [v.constructor.name]);
	};
	return Control_Monad_State.execState(Control_Monad_Free.foldFree(Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity))(go)(ts))(0);
}

function countSkippedTests(ts) {
	let go = function (v) {
		if (v instanceof SkipUnit && v.value0 instanceof TestUnit) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(add(semiringInt)(1)))(v.value1);
		};
		if (v instanceof SkipUnit && v.value0 instanceof TestGroup) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(add(semiringInt)(countTests(v.value0.value0.value1))))(v.value1);
		};
		if (v instanceof SkipUnit && v.value0 instanceof SkipUnit) {
			return control.pure(Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity))(v.value1);
		};
		if (v instanceof TestUnit) {
			return control.pure(Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity))(v.value4);
		};
		if (v instanceof TestGroup) {
			return data.voidLeft(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(add(semiringInt)(countSkippedTests(v.value0.value1))))(v.value3);
		};
		throw new Error("Failed pattern match at Test.Unit (line 168, column 5 - line 168, column 29): " + [v.constructor.name]);
	};
	return Control_Monad_State.execState(Control_Monad_Free.foldFree(Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity))(go)(ts))(0);
}

let collectTests = (() => {
	let $164 = data.map(Effect_Aff.functorAff)(Data_List.reverse);
	let $165 = walkSuite(() => {
		return () => {
			return control.pure(Effect_Aff.applicativeAff)({});
		};
	});
	return ($166) => {
		return $164($165($166));
	};
})();

function collectResults(tests) {
	function run(v) {
		return data.map(Effect_Aff.functorAff)(Data_Tuple.Tuple.create(v.value0))(Effect_Aff.attempt(v.value1));
	}

	return Data_Traversable["for"](Effect_Aff.applicativeAff)(Data_List_Types.traversableList)(tests)(run);
}

module.exports = {
	TestGroup: TestGroup,
	TestUnit: TestUnit,
	SkipUnit: SkipUnit,
	Group: Group,
	Skip: Skip,
	Only: Only,
	success: success,
	failure: failure,
	timeout: timeout,
	test: test,
	testOnly: testOnly,
	testSkip: testSkip,
	suite: suite,
	suiteOnly: suiteOnly,
	suiteSkip: suiteSkip,
	walkSuite: walkSuite,
	filterTests: filterTests,
	collectTests: collectTests,
	collectResults: collectResults,
	countSkippedTests: countSkippedTests,
	keepErrors: keepErrors,
	describe: describe,
	it: it,
	newtypeSkip: newtypeSkip,
	newtypeOnly: newtypeOnly,
	showOnly: showOnly,
	haytingAlgebraOnly: haytingAlgebraOnly,
	functorTestF: functorTestF
};
