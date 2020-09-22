const control = require("../control");
let Data_Foldable = require("../Data.Foldable/index.js");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Show = require("../Data.Show/index.js");
let Effect_Aff = require("../Effect.Aff/index.js");
let Effect_Class = require("../Effect.Class/index.js");
let Test_QuickCheck = require("../Test.QuickCheck/index.js");
let Test_Unit = require("../Test.Unit/index.js");
const data = require("../data");
let Data_Ord = require("../Data.Ord/index.js");
let Data_Show = require("../Data.Show/index.js");
let Effect = require("../Effect/index.js");


let Data_Bounded = require("../Data.Bounded/index.js");


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





let Seed = function (x) {
	return x;
};
let unSeed = function (v) {
	return v;
};
let showSeed = new Data_Show.Show(function (v) {
	return "Seed " + Data_Show.show(Data_Show.showInt)(v);
});
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
let randomSeed = data.map(Effect.functorEffect)(mkSeed)(randomInt(seedMin)(seedMax));
let lcgC = 0;
let lcgA = 48271;

let remainder = function (n) {
	return function (m) {
		return n % m;
	};
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
let ordSeed = new Data_Ord.Ord(function () {
	return eqSeed;
}, function (x) {
	return function (y) {
		return Data_Ord.compare(Data_Ord.ordInt)(x)(y);
	};
});

let quickCheck$prime = function (dictTestable) {
	return function (tries) {
		return function (prop) {
			return control.bind(Effect_Aff.bindAff)(Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(randomSeed))(function (seed) {
				let wins$prime = function (acc) {
					return function (v) {
						if (v instanceof Test_QuickCheck.Success) {
							return acc + 1 | 0;
						};
						return acc;
					};
				};
				let results = Test_QuickCheck.quickCheckPure(dictTestable)(seed)(tries)(prop);
				let wins = Data_Foldable.foldl(Data_List_Types.foldableList)(wins$prime)(0)(results);
				let findErr = function ($copy_v) {
					let $tco_done = false;
					let $tco_result;
					function $tco_loop(v) {
						if (v instanceof Data_List_Types.Nil) {
							$tco_done = true;
							return Data_Maybe.Nothing.value;
						};
						if (v instanceof Data_List_Types.Cons && v.value0 instanceof Test_QuickCheck.Failed) {
							$tco_done = true;
							return new Data_Maybe.Just(v.value0.value0);
						};
						if (v instanceof Data_List_Types.Cons) {
							$copy_v = v.value1;
							return;
						};
						throw new Error("Failed pattern match at Test.Unit.QuickCheck (line 23, column 7 - line 23, column 28): " + [v.constructor.name]);
					};
					while (!$tco_done) {
						$tco_result = $tco_loop($copy_v);
					};
					return $tco_result;
				};
				let v = findErr(results);
				if (v instanceof Data_Maybe.Nothing) {
					return Test_Unit.success;
				};
				if (v instanceof Data_Maybe.Just) {
					return Test_Unit.failure(Data_Show.show(Data_Show.showInt)(tries - wins | 0) + ("/" + (Data_Show.show(Data_Show.showInt)(tries) + (" tests failed: " + v.value0))));
				};
				throw new Error("Failed pattern match at Test.Unit.QuickCheck (line 26, column 3 - line 28, column 95): " + [v.constructor.name]);
			});
		};
	};
};
let quickCheck = function (dictTestable) {
	return quickCheck$prime(dictTestable)(100);
};
module.exports = {
	quickCheck: quickCheck,
	"quickCheck'": quickCheck$prime
};
