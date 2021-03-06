let $foreign = require("./foreign.js");

const data = require('../data');
let Data_Maybe = require("../Data.Maybe/index.js");
let Data_Traversable = require("../Data.Traversable/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");
let Data_Unfoldable1 = require("../Data.Unfoldable1/index.js");


let Unfoldable = function (Unfoldable10, unfoldr) {
    this.Unfoldable10 = Unfoldable10;
    this.unfoldr = unfoldr;
};
let unfoldr = function (dict) {
    return dict.unfoldr;
};
let unfoldableArray = new Unfoldable(function () {
    return Data_Unfoldable1.unfoldable1Array;
}, $foreign.unfoldrArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));
let replicate = function (dictUnfoldable) {
    return function (n) {
        return function (v) {
            let step = function (i) {
                let $7 = i <= 0;
                if ($7) {
                    return Data_Maybe.Nothing.value;
                };
                return new Data_Maybe.Just(new Data_Tuple.Tuple(v, i - 1 | 0));
            };
            return unfoldr(dictUnfoldable)(step)(n);
        };
    };
};
let replicateA = function (dictApplicative) {
    return function (dictUnfoldable) {
        return function (dictTraversable) {
            return function (n) {
                return function (m) {
                    return Data_Traversable.sequence(dictTraversable)(dictApplicative)(replicate(dictUnfoldable)(n)(m));
                };
            };
        };
    };
};
let none = function (dictUnfoldable) {
    return unfoldr(dictUnfoldable)(data._const(Data_Maybe.Nothing.value))();
};
let fromMaybe = function (dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function (b) {
        return data.map(Data_Maybe.functorMaybe)(data.flip(Data_Tuple.Tuple.create)(Data_Maybe.Nothing.value))(b);
    });
};
module.exports = {
    Unfoldable: Unfoldable,
    unfoldr: unfoldr,
    replicate: replicate,
    replicateA: replicateA,
    none: none,
    fromMaybe: fromMaybe,
    unfoldableArray: unfoldableArray
};
