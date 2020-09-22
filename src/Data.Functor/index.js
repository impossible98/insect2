class Control {
	constructor(compose) {
		this.compose = compose;
	}
}

class Functor {
	constructor(map) {
		this.map = map;
	}
}
let semigroupoidFn = new Control(function (f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
});

let functorFn = new Functor(compose(semigroupoidFn));
let functorArray = new Functor(arrayMap);

function on(f) {
	return function (g) {
		return function (x) {
			return function (y) {
				return f(g(x))(g(y));
			};
		};
	};
}

function flip(f) {
	return function (b) {
		return function (a) {
			return f(a)(b);
		};
	};
}

function _const(a) {
	return function (v) {
		return a;
	};
}

function applyN(f) {
	function go($copy_n) {
		return function ($copy_acc) {
			let $tco_var_n = $copy_n;
			let $tco_done = false;
			let $tco_result;
			function $tco_loop(n, acc) {
				if (n <= 0) {
					$tco_done = true;
					return acc;
				};
				if (true) {
					$tco_var_n = n - 1 | 0;
					$copy_acc = f(acc);
					return;
				};
				throw new Error("Failed pattern match at Data.Function (line 94, column 3 - line 96, column 37): " + [n.constructor.name, acc.constructor.name]);
			};
			while (!$tco_done) {
				$tco_result = $tco_loop($tco_var_n, $copy_acc);
			};
			return $tco_result;
		};
	};
	return go;
}

function applyFlipped(x) {
	return function (f) {
		return f(x);
	};
}

function apply(f) {
	return function (x) {
		return f(x);
	};
}

function compose(dict) {
	return dict.compose;
}

function arrayMap(f) {
	return function (arr) {
		let l = arr.length;
		let result = new Array(l);
		for (let i = 0; i < l; i++) {
			result[i] = f(arr[i]);
		}
		return result;
	};
}

function map(dict) {
	return dict.map;
}

function mapFlipped(dictFunctor) {
	return function (fa) {
		return function (f) {
			return map(dictFunctor)(f)(fa);
		};
	};
}

function _void(dictFunctor) {
	return map(dictFunctor)(_const());
}

function voidLeft(dictFunctor) {
	return function (f) {
		return function (x) {
			return map(dictFunctor)(_const(x))(f);
		};
	};
}

function voidRight(dictFunctor) {
	return function (x) {
		return map(dictFunctor)(_const(x));
	};
}

function flap(dictFunctor) {
	return function (ff) {
		return function (x) {
			return map(dictFunctor)(function (f) {
				return f(x);
			})(ff);
		};
	};
}

module.exports = {
	Functor: Functor,
	map: map,
	mapFlipped: mapFlipped,
	_void: _void,
	voidRight: voidRight,
	voidLeft: voidLeft,
	flap: flap,
	functorFn: functorFn,
	functorArray: functorArray,
	flip: flip,
	_const: _const,
	apply: apply,
	applyFlipped: applyFlipped,
	applyN: applyN,
	on: on
};
