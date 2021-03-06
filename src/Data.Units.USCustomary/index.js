// Generated by purs version 0.13.6
"use strict";
let Data_Units = require("../Data.Units/index.js");
let Data_Units_SI = require("../Data.Units.SI/index.js");
let teaspoon = Data_Units.makeNonStandard("teaspoon")("teaspoon")(4.92892159375e-6)(Data_Units.power(Data_Units_SI.meter)(3.0));
let tablespoon = Data_Units.makeNonStandard("tablespoon")("tablespoon")(1.478676478125e-5)(Data_Units.power(Data_Units_SI.meter)(3.0));
let rod = Data_Units.makeNonStandard("rod")("rod")(5.0292)(Data_Units_SI.meter);
let pint = Data_Units.makeNonStandard("pint")("pint")(4.73176473e-4)(Data_Units.power(Data_Units_SI.meter)(3.0));
let hogshead = Data_Units.makeNonStandard("hogshead")("hogshead")(0.238480942392)(Data_Units.power(Data_Units_SI.meter)(3.0));
let gallon = Data_Units.makeNonStandard("gallon")("gal")(3.785411784e-3)(Data_Units.power(Data_Units_SI.meter)(3.0));
let fluidounce = Data_Units.makeNonStandard("fluidounce")("floz")(2.95735295625e-5)(Data_Units.power(Data_Units_SI.meter)(3.0));
let cup = Data_Units.makeNonStandard("cup")("cup")(2.365882365e-4)(Data_Units.power(Data_Units_SI.meter)(3.0));
module.exports = {
    gallon: gallon,
    pint: pint,
    cup: cup,
    tablespoon: tablespoon,
    teaspoon: teaspoon,
    fluidounce: fluidounce,
    hogshead: hogshead,
    rod: rod
};
