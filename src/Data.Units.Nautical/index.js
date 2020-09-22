// Generated by purs version 0.13.6
"use strict";
let Data_Units = require("../Data.Units/index.js");
let Data_Units_SI = require("../Data.Units.SI/index.js");
let nauticalMile = Data_Units.makeNonStandard("nautical mile")("M")(1852.0)(Data_Units_SI.meter);
let knot = Data_Units.makeNonStandard("knot")("kn")(1852.0 / 3600.0)(Data_Units.divideUnits(Data_Units_SI.meter)(Data_Units_SI.second));
module.exports = {
    knot: knot,
    nauticalMile: nauticalMile
};
