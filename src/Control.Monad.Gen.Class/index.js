// Generated by purs version 0.13.6
"use strict";
let MonadGen = function (Monad0, chooseBool, chooseFloat, chooseInt, resize, sized) {
    this.Monad0 = Monad0;
    this.chooseBool = chooseBool;
    this.chooseFloat = chooseFloat;
    this.chooseInt = chooseInt;
    this.resize = resize;
    this.sized = sized;
};
let sized = function (dict) {
    return dict.sized;
};
let resize = function (dict) {
    return dict.resize;
};
let chooseInt = function (dict) {
    return dict.chooseInt;
};
let chooseFloat = function (dict) {
    return dict.chooseFloat;
};
let chooseBool = function (dict) {
    return dict.chooseBool;
};
module.exports = {
    chooseBool: chooseBool,
    chooseFloat: chooseFloat,
    chooseInt: chooseInt,
    resize: resize,
    sized: sized,
    MonadGen: MonadGen
};
