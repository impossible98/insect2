const data = require('../data');
let Data_Void = require("../Data.Void/index.js");


let Contravariant = function (cmap) {
    this.cmap = cmap;
};
let cmap = function (dict) {
    return dict.cmap;
};
let cmapFlipped = function (dictContravariant) {
    return function (x) {
        return function (f) {
            return cmap(dictContravariant)(f)(x);
        };
    };
};
let coerce = function (dictContravariant) {
    return function (dictFunctor) {
        return function (a) {
            return data.map(dictFunctor)(Data_Void.absurd)(cmap(dictContravariant)(Data_Void.absurd)(a));
        };
    };
};
let imapC = function (dictContravariant) {
    return function (v) {
        return function (f) {
            return cmap(dictContravariant)(f);
        };
    };
};
module.exports = {
    cmap: cmap,
    Contravariant: Contravariant,
    cmapFlipped: cmapFlipped,
    coerce: coerce,
    imapC: imapC
};
