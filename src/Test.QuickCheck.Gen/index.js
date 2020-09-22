const control = require("../control");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");
let Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
let Control_Monad_State = require("../Control.Monad.State/index.js");
let Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
let Control_Monad_State_Trans = require("../Control.Monad.State.Trans/index.js");
let Data_Array = require("../Data.Array/index.js");
let Data_Bounded = require("../Data.Bounded/index.js");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_Functor = require("../Data.Functor/index.js");
let Data_Identity = require("../Data.Identity/index.js");
let Data_List = require("../Data.List/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_NonEmpty = require("../Data.NonEmpty/index.js");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable = require("../Data.Unfoldable/index.js");
const data = require("../data");
let Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
let Effect = require("../Effect/index.js");


let numAdd = function (n1) {
	return function (n2) {
		return n1 + n2;
	};
};

let numMul = function (n1) {
	return function (n2) {
		return n1 * n2;
	};
};

let Semiring = function (add, mul, one, zero) {
	this.add = add;
	this.mul = mul;
	this.one = one;
	this.zero = zero;
};

let semiringNumber = new Semiring(numAdd, numMul, 1.0, 0.0);

let mul = function (dict) {
	return dict.mul;
};

let add = function (dict) {
	return dict.add;
};


let apply = function (dict) {
	return dict.apply;
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


let float32ToInt32 = function (n) {
	let arr = new ArrayBuffer(4);
	let fv = new Float32Array(arr);
	let iv = new Int32Array(arr);
	fv[0] = n;
	return iv[0];
};

let Gen = function (x) {
	return x;
};
let unGen = function (v) {
	return v;
};
let runGen = function ($56) {
	return Control_Monad_State.runState(unGen($56));
};
let stateful = function (f) {
	return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
		return runGen(f(s))(s);
	}));
};
let sized = function (f) {
	return stateful(function (s) {
		return f(s.size);
	});
};
let variant = function (n) {
	return function (g) {
		return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
			return runGen(g)({
				newSeed: n,
				size: s.size
			});
		}));
	};
};
let resize = function (sz) {
	return function (g) {
		return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (v) {
			return Data_Functor.map(Data_Tuple.functorTuple)(function (v1) {
				return {
					size: v.size,
					newSeed: v1.newSeed
				};
			})(runGen(g)({
				newSeed: v.newSeed,
				size: sz
			}));
		}));
	};
};
let replicateMRec = function (dictMonadRec) {
	return function (k) {
		return function (v) {
			if (k <= 0) {
				return control.pure((dictMonadRec.Monad0()).Applicative0())(Data_List_Types.Nil.value);
			};
			let go = function (v1) {
				if (v1.value1 === 0) {
					return control.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(v1.value0));
				};
				return Data_Functor.mapFlipped((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(v)(function (x) {
					return new Control_Monad_Rec_Class.Loop(new Data_Tuple.Tuple(new Data_List_Types.Cons(x, v1.value0), v1.value1 - 1 | 0));
				});
			};
			return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go)(new Data_Tuple.Tuple(Data_List_Types.Nil.value, k));
		};
	};
};

let Seed = function (x) {
	return x;
};
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
				let n$prime = Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(n)(rangeSize);
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
let randomSeed = Data_Functor.map(Effect.functorEffect)(mkSeed)(randomInt(seedMin)(seedMax));
let lcgC = 0;
let lcgA = 48271;

let remainder = function (n) {
	return function (m) {
		return n % m;
	};
};


let lcgPerturb = function (d) {
	return function (v) {
		return Seed(Data_Maybe.fromJust()(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + d)(toNumber(lcgM)))));
	};
};
let lcgNext = lcgPerturb(toNumber(lcgC));
let eqSeed = new data.Eq(function (x) {
	return function (y) {
		return x === y;
	};
});

let repeatable = function (f) {
	return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
		return new Data_Tuple.Tuple(function (a) {
			return Data_Tuple.fst(runGen(f(a))(s));
		}, {
			newSeed: lcgNext(s.newSeed),
			size: s.size
		});
	}));
};
let perturbGen = function (n) {
	return function (gen) {
		return control.discard(control.discardUnit)(Control_Monad_State_Trans.bindStateT(Data_Identity.monadIdentity))(Data_Functor._void(Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(function (s) {
			let $29 = {};
			for (let $30 in s) {
				if ({}.hasOwnProperty.call(s, $30)) {
					$29[$30] = s[$30];
				};
			};
			$29.newSeed = lcgPerturb(toNumber(float32ToInt32(n)))(s.newSeed);
			return $29;
		})))(function () {
			return unGen(gen);
		});
	};
};
let monadRecGen = Control_Monad_State_Trans.monadRecStateT(Control_Monad_Rec_Class.monadRecIdentity);
let monadGen = Control_Monad_State_Trans.monadStateT(Data_Identity.monadIdentity);
let listOf = replicateMRec(monadRecGen);
let lcgStep = (function () {
	let f = function (s) {
		return new Data_Tuple.Tuple(unSeed(s.newSeed), (function () {
			let $32 = {};
			for (let $33 in s) {
				if ({}.hasOwnProperty.call(s, $33)) {
					$32[$33] = s[$33];
				};
			};
			$32.newSeed = lcgNext(s.newSeed);
			return $32;
		})());
	};
	return Gen(Control_Monad_State_Class.state(Control_Monad_State_Trans.monadStateStateT(Data_Identity.monadIdentity))(f));
})();
let lazyGen = Control_Monad_State_Trans.lazyStateT;
let functorGen = Control_Monad_State_Trans.functorStateT(Data_Identity.functorIdentity);
let uniform = Data_Functor.map(functorGen)(function (n) {
	return toNumber(n) / toNumber(lcgM);
})(lcgStep);
let vectorOf = function (k) {
	return function (g) {
		return Data_Functor.map(functorGen)(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray))(listOf(k)(g));
	};
};
let evalGen = function ($57) {
	return Control_Monad_State.evalState(unGen($57));
};
let sample = function (seed) {
	return function (sz) {
		return function (g) {
			return evalGen(vectorOf(sz)(g))({
				newSeed: seed,
				size: sz
			});
		};
	};
};
let randomSample$prime = function (n) {
	return function (g) {
		return function __do() {
			let seed = randomSeed();
			return sample(seed)(n)(g);
		};
	};
};
let randomSample = randomSample$prime(10);
let choose = function (a) {
	return function (b) {
		let min$prime = Data_Ord.min(Data_Ord.ordNumber)(a)(b);
		let max$prime = Data_Ord.max(Data_Ord.ordNumber)(a)(b);
		return Data_Functor.map(functorGen)((function () {
			let $58 = add(semiringNumber)(min$prime);
			let $59 = mul(semiringNumber)(max$prime - min$prime);
			return function ($60) {
				return $58($59($60));
			};
		})())(uniform);
	};
};
let bindGen = Control_Monad_State_Trans.bindStateT(Data_Identity.monadIdentity);
let frequency = function (v) {
	let xxs = new Data_List_Types.Cons(v.value0, v.value1);
	let total = Data_Newtype.unwrap(Data_Newtype.newtypeAdditive)(Data_Foldable.fold(Data_List_Types.foldableList)(Data_Monoid_Additive.monoidAdditive(semiringNumber))(Data_Functor.map(Data_List_Types.functorList)(function ($61) {
		return Data_Monoid_Additive.Additive(Data_Tuple.fst($61));
	})(xxs)));
	let pick = function ($copy_n) {
		return function ($copy_d) {
			return function ($copy_v1) {
				let $tco_var_n = $copy_n;
				let $tco_var_d = $copy_d;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(n, d, v1) {
					if (v1 instanceof Data_List_Types.Nil) {
						$tco_done = true;
						return d;
					};
					if (v1 instanceof Data_List_Types.Cons) {
						let $39 = n <= v1.value0.value0;
						if ($39) {
							$tco_done = true;
							return v1.value0.value1;
						};
						$tco_var_n = n - v1.value0.value0;
						$tco_var_d = d;
						$copy_v1 = v1.value1;
						return;
					};
					throw new Error("Failed pattern match at Test.QuickCheck.Gen (line 162, column 5 - line 162, column 21): " + [n.constructor.name, d.constructor.name, v1.constructor.name]);
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_n, $tco_var_d, $copy_v1);
				};
				return $tco_result;
			};
		};
	};
	return control.bind(bindGen)(choose(0)(total))(function (n) {
		return pick(n)(Data_Tuple.snd(v.value0))(xxs);
	});
};
let applyGen = Control_Monad_State_Trans.applyStateT(Data_Identity.monadIdentity);



let chooseInt$prime = function (a) {
	return function (b) {
		let numB = toNumber(b);
		let numA = toNumber(a);
		let clamp = function (x) {
			return numA + remainder(x)((numB - numA) + 1);
		};
		let choose31BitPosNumber = Data_Functor.map(functorGen)(toNumber)(lcgStep);
		let choose32BitPosNumber = apply(applyGen)(Data_Functor.map(functorGen)(add(semiringNumber))(choose31BitPosNumber))(Data_Functor.map(functorGen)(mul(semiringNumber)(2.0))(choose31BitPosNumber));
		return Data_Functor.map(functorGen)(function ($62) {
			return floor(clamp($62));
		})(choose32BitPosNumber);
	};
};
let chooseInt = function (a) {
	return function (b) {
		let $46 = a <= b;
		if ($46) {
			return chooseInt$prime(a)(b);
		};
		return chooseInt$prime(b)(a);
	};
};
let arrayOf = function (g) {
	return sized(function (n) {
		return control.bind(bindGen)(chooseInt(0)(n))(function (k) {
			return vectorOf(k)(g);
		});
	});
};
let monadGenGen = new Control_Monad_Gen_Class.MonadGen(function () {
	return monadGen;
}, Data_Functor.map(functorGen)(function (v) {
	return v < 0.5;
})(uniform), choose, chooseInt, function (f) {
	return function (g) {
		return sized(function (s) {
			return resize(f(s))(g);
		});
	};
}, sized);
let oneOf = function (v) {
	return control.bind(bindGen)(chooseInt(0)(Data_Array.length(v.value1)))(function (n) {
		let $48 = n < 1;
		if ($48) {
			return v.value0;
		};
		return Data_Maybe.fromMaybe(v.value0)(Data_Array.index(v.value1)(n - 1 | 0));
	});
};
let applicativeGen = Control_Monad_State_Trans.applicativeStateT(Data_Identity.monadIdentity);
let arrayOf1 = function (g) {
	return sized(function (n) {
		return control.bind(bindGen)(chooseInt(0)(n))(function (k) {
			return control.bind(bindGen)(g)(function (x) {
				return control.bind(bindGen)(vectorOf(k - 1 | 0)(g))(function (xs) {
					return control.pure(applicativeGen)(new Data_NonEmpty.NonEmpty(x, xs));
				});
			});
		});
	});
};
let elements = function (v) {
	return control.bind(bindGen)(chooseInt(0)(Data_Array.length(v.value1)))(function (n) {
		return control.pure(applicativeGen)((function () {
			let $52 = n === 0;
			if ($52) {
				return v.value0;
			};
			return Data_Maybe.fromMaybe(v.value0)(Data_Array.index(v.value1)(n - 1 | 0));
		})());
	});
};

let shuffle = function (xs) {
	return control.bind(bindGen)(vectorOf(Data_Array.length(xs))(chooseInt(0)(Data_Bounded.top(Data_Bounded.boundedInt))))(function (ns) {
		return control.pure(applicativeGen)(Data_Functor.map(Data_Functor.functorArray)(Data_Tuple.snd)(Data_Array.sortBy(Data_Ord.comparing(Data_Ord.ordInt)(Data_Tuple.fst))(Data_Array.zip(ns)(xs))));
	});
};
let suchThat = function (gen) {
	return function (pred) {
		let go = function (v) {
			return control.bind(bindGen)(gen)(function (a) {
				return control.pure(applicativeGen)((function () {
					let $55 = pred(a);
					if ($55) {
						return new Control_Monad_Rec_Class.Done(a);
					};
					return new Control_Monad_Rec_Class.Loop();
				})());
			});
		};
		return Control_Monad_Rec_Class.tailRecM(monadRecGen)(go)();
	};
};
let altGen = Control_Monad_State_Trans.altStateT(Data_Identity.monadIdentity)(Data_Identity.altIdentity);
module.exports = {
	unGen: unGen,
	repeatable: repeatable,
	stateful: stateful,
	variant: variant,
	suchThat: suchThat,
	sized: sized,
	resize: resize,
	choose: choose,
	chooseInt: chooseInt,
	oneOf: oneOf,
	frequency: frequency,
	arrayOf: arrayOf,
	arrayOf1: arrayOf1,
	listOf: listOf,
	vectorOf: vectorOf,
	elements: elements,
	shuffle: shuffle,
	runGen: runGen,
	evalGen: evalGen,
	perturbGen: perturbGen,
	uniform: uniform,
	sample: sample,
	randomSample: randomSample,
	"randomSample'": randomSample$prime,
	functorGen: functorGen,
	applyGen: applyGen,
	applicativeGen: applicativeGen,
	bindGen: bindGen,
	monadGen: monadGen,
	altGen: altGen,
	monadRecGen: monadRecGen,
	lazyGen: lazyGen,
	monadGenGen: monadGenGen
};
