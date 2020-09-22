const data = require('../data');
let Data_Identity = require("../Data.Identity/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");


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

function identity(dict) {
	return dict.identity;
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


let Distributive = function (Functor0, collect, distribute) {
    this.Functor0 = Functor0;
    this.collect = collect;
    this.distribute = distribute;
};
let distributiveIdentity = new Distributive(function () {
    return Data_Identity.functorIdentity;
}, function (dictFunctor) {
    return function (f) {
        let $11 = data.map(dictFunctor)((function () {
            let $13 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
            return function ($14) {
                return $13(f($14));
            };
        })());
        return function ($12) {
            return Data_Identity.Identity($11($12));
        };
    };
}, function (dictFunctor) {
    let $15 = data.map(dictFunctor)(Data_Newtype.unwrap(Data_Identity.newtypeIdentity));
    return function ($16) {
        return Data_Identity.Identity($15($16));
    };
});
let distribute = function (dict) {
    return dict.distribute;
};
let distributiveFunction = new Distributive(function () {
    return data.functorFn;
}, function (dictFunctor) {
    return function (f) {
        let $17 = distribute(distributiveFunction)(dictFunctor);
        let $18 = data.map(dictFunctor)(f);
        return function ($19) {
            return $17($18($19));
        };
    };
}, function (dictFunctor) {
    return function (a) {
        return function (e) {
            return data.map(dictFunctor)(function (v) {
                return v(e);
            })(a);
        };
    };
});
let cotraverse = function (dictDistributive) {
    return function (dictFunctor) {
        return function (f) {
            let $20 = data.map(dictDistributive.Functor0())(f);
            let $21 = distribute(dictDistributive)(dictFunctor);
            return function ($22) {
                return $20($21($22));
            };
        };
    };
};
let collectDefault = function (dictDistributive) {
    return function (dictFunctor) {
        return function (f) {
            let $23 = distribute(dictDistributive)(dictFunctor);
            let $24 = data.map(dictFunctor)(f);
            return function ($25) {
                return $23($24($25));
            };
        };
    };
};
let collect = function (dict) {
    return dict.collect;
};
let distributeDefault = function (dictDistributive) {
    return function (dictFunctor) {
        return collect(dictDistributive)(dictFunctor)(identity(categoryFn));
    };
};
module.exports = {
    collect: collect,
    distribute: distribute,
    Distributive: Distributive,
    distributeDefault: distributeDefault,
    collectDefault: collectDefault,
    cotraverse: cotraverse,
    distributiveIdentity: distributiveIdentity,
    distributiveFunction: distributiveFunction
};
