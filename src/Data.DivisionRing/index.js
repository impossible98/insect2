let data = require("../data");


let mul = function (dict) {
	return dict.mul;
};

let DivisionRing = function (Ring0, recip) {
	this.Ring0 = Ring0;
	this.recip = recip;
};

let recip = function (dict) {
	return dict.recip;
};

let rightDiv = function (dictDivisionRing) {
	return function (a) {
		return function (b) {
			return mul((dictDivisionRing.Ring0()).Semiring0())(a)(recip(dictDivisionRing)(b));
		};
	};
};

let leftDiv = function (dictDivisionRing) {
	return function (a) {
		return function (b) {
			return mul((dictDivisionRing.Ring0()).Semiring0())(recip(dictDivisionRing)(b))(a);
		};
	};
};

let divisionringNumber = new DivisionRing(function () {
	return data.ringNumber;
}, function (x) {
	return 1.0 / x;
});

module.exports = {
	DivisionRing: DivisionRing,
	recip: recip,
	leftDiv: leftDiv,
	rightDiv: rightDiv,
	divisionringNumber: divisionringNumber
};
