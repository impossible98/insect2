let data = require("../data");
let Data_Eq = require("../Data.Eq/index.js");


let zero = function (dict) {
	return dict.zero;
};

let mul = function (dict) {
	return dict.mul;
};

let intDegree = function (x) {
	return Math.min(Math.abs(x), 2147483647);
};

let intDiv = function (x) {
	return function (y) {
		if (y === 0) return 0;
		return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
	};
};

let intMod = function (x) {
	return function (y) {
		if (y === 0) return 0;
		let yy = Math.abs(y);
		return ((x % yy) + yy) % yy;
	};
};

let numDiv = function (n1) {
	return function (n2) {
		return n1 / n2;
	};
};

let EuclideanRing = function (CommutativeRing0, degree, div, mod) {
	this.CommutativeRing0 = CommutativeRing0;
	this.degree = degree;
	this.div = div;
	this.mod = mod;
};

let mod = function (dict) {
	return dict.mod;
};

let gcd = function ($copy_dictEq) {
	return function ($copy_dictEuclideanRing) {
		return function ($copy_a) {
			return function ($copy_b) {
				let $tco_var_dictEq = $copy_dictEq;
				let $tco_var_dictEuclideanRing = $copy_dictEuclideanRing;
				let $tco_var_a = $copy_a;
				let $tco_done = false;
				let $tco_result;
				function $tco_loop(dictEq, dictEuclideanRing, a, b) {
					let $7 = Data_Eq.eq(dictEq)(b)(zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0()));
					if ($7) {
						$tco_done = true;
						return a;
					};
					$tco_var_dictEq = dictEq;
					$tco_var_dictEuclideanRing = dictEuclideanRing;
					$tco_var_a = b;
					$copy_b = mod(dictEuclideanRing)(a)(b);
					return;
				};
				while (!$tco_done) {
					$tco_result = $tco_loop($tco_var_dictEq, $tco_var_dictEuclideanRing, $tco_var_a, $copy_b);
				};
				return $tco_result;
			};
		};
	};
};
let euclideanRingNumber = new EuclideanRing(function () {
	return data.commutativeRingNumber;
}, function (v) {
	return 1;
}, numDiv, function (v) {
	return function (v1) {
		return 0.0;
	};
});
let euclideanRingInt = new EuclideanRing(function () {
	return data.commutativeRingInt;
}, intDegree, intDiv, intMod);
let div = function (dict) {
	return dict.div;
};
let lcm = function (dictEq) {
	return function (dictEuclideanRing) {
		return function (a) {
			return function (b) {
				let $8 = Data_Eq.eq(dictEq)(a)(zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0())) || Data_Eq.eq(dictEq)(b)(zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0()));
				if ($8) {
					return zero(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0());
				};
				return div(dictEuclideanRing)(mul(((dictEuclideanRing.CommutativeRing0()).Ring0()).Semiring0())(a)(b))(gcd(dictEq)(dictEuclideanRing)(a)(b));
			};
		};
	};
};
let degree = function (dict) {
	return dict.degree;
};

module.exports = {
	EuclideanRing: EuclideanRing,
	degree: degree,
	div: div,
	mod: mod,
	gcd: gcd,
	lcm: lcm,
	euclideanRingInt: euclideanRingInt,
	euclideanRingNumber: euclideanRingNumber
};
