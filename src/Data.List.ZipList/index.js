const control = require('../control');
let Data_List_Lazy = require("../Data.List.Lazy/index.js");
let Data_List_Lazy_Types = require("../Data.List.Lazy.Types/index.js");
let Data_Monoid = require("../Data.Monoid/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");
let Data_Show = require("../Data.Show/index.js");
let Data_Semigroup = require("../Data.Semigroup/index.js");


class Alt {
	constructor(Functor0, alt) {
		this.Functor0 = Functor0;
		this.alt = alt;
	}
}

class Alternative {
	constructor(Applicative0, Plus1) {
		this.Applicative0 = Applicative0;
		this.Plus1 = Plus1;
	}
}

class Apply {
	constructor(Functor0, apply) {
		this.Functor0 = Functor0;
		this.apply = apply;
	}
}

let ZipList = function (x) {
    return x;
};
let traversableZipList = Data_List_Lazy_Types.traversableList;
let showZipList = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(ZipList " + (Data_Show.show(Data_List_Lazy_Types.showList(dictShow))(v) + ")");
    });
};
let semigroupZipList = Data_List_Lazy_Types.semigroupList;
let ordZipList = function (dictOrd) {
    return Data_List_Lazy_Types.ordList(dictOrd);
};
let newtypeZipList = new Data_Newtype.Newtype(function (n) {
    return n;
}, ZipList);
let monoidZipList = Data_List_Lazy_Types.monoidList;
let functorZipList = Data_List_Lazy_Types.functorList;
let foldableZipList = Data_List_Lazy_Types.foldableList;
let eqZipList = function (dictEq) {
    return Data_List_Lazy_Types.eqList(dictEq);
};
let applyZipList = new Apply(function () {
    return functorZipList;
}, function (v) {
    return function (v1) {
        return Data_List_Lazy.zipWith(Data_Functor.apply)(v)(v1);
    };
});

function crashWith() {
	return function (msg) {
		throw new Error(msg);
	};
}


function unsafePartial(f) {
	return f();
}

function unsafeCrashWith(msg) {
	return unsafePartial(() => {
		return crashWith()(msg);
	});
}

let zipListIsNotBind = function (dictFail) {
    return new control.Bind(function () {
        return applyZipList;
    }, unsafeCrashWith("bind: unreachable"));
};
let applicativeZipList = new control.Applicative(function () {
    return applyZipList;
}, function ($13) {
    return ZipList(Data_List_Lazy.repeat($13));
});
let altZipList = new Alt(function () {
    return functorZipList;
}, Data_Semigroup.append(semigroupZipList));
let plusZipList = new control.Plus(function () {
    return altZipList;
}, Data_Monoid.mempty(monoidZipList));
let alternativeZipList = new Alternative(function () {
    return applicativeZipList;
}, function () {
    return plusZipList;
});
module.exports = {
    ZipList: ZipList,
    showZipList: showZipList,
    newtypeZipList: newtypeZipList,
    eqZipList: eqZipList,
    ordZipList: ordZipList,
    semigroupZipList: semigroupZipList,
    monoidZipList: monoidZipList,
    foldableZipList: foldableZipList,
    traversableZipList: traversableZipList,
    functorZipList: functorZipList,
    applyZipList: applyZipList,
    applicativeZipList: applicativeZipList,
    altZipList: altZipList,
    plusZipList: plusZipList,
    alternativeZipList: alternativeZipList,
    zipListIsNotBind: zipListIsNotBind
};
