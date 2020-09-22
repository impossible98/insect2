let Data_Functor = require("../Data.Functor/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


class Control {
	constructor(kw, kw2) {
		this.kw = kw;
		this.kw2 = kw2;
	}
}

class Plus {
	constructor(Alt0, empty) {
		this.Alt0 = Alt0;
		this.empty = empty;
	}
}

let altArray = new Control(() => {
	return Data_Functor.functorArray;
}, Data_Semigroup.append(Data_Semigroup.semigroupArray));

let plusArray = new Plus(() => {
	return altArray;
}, []);

let empty = function (dict) {
	return dict.empty;
};

module.exports = {
	Plus: Plus,
	empty: empty,
	plusArray: plusArray
};
