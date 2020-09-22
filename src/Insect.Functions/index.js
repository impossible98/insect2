let control = require("../control");
let Data_Either = require("../Data.Either/index.js");
let Data_Quantity = require("../Data.Quantity/index.js");
let Data_Units_SI = require("../Data.Units.SI/index.js");


let offsetFahrenheit = 459.67;
let offsetCelsius = 273.15;
let toCelsius = function (tempKelvin$prime) {
    return control.bind(Data_Either.bindEither)(Data_Quantity.asValueIn(tempKelvin$prime)(Data_Units_SI.kelvin))(function (tempKelvin) {
        return control.pure(Data_Either.applicativeEither)(Data_Quantity.scalar(tempKelvin - offsetCelsius));
    });
};
let multiplierFahrenheit = 5.0 / 9.0;
let toFahrenheit = function (tempKelvin$prime) {
    return control.bind(Data_Either.bindEither)(Data_Quantity.asValueIn(tempKelvin$prime)(Data_Units_SI.kelvin))(function (tempKelvin) {
        return control.pure(Data_Either.applicativeEither)(Data_Quantity.scalar(tempKelvin / multiplierFahrenheit - offsetFahrenheit));
    });
};
let fromFahrenheit = function (tempFahrenheit$prime) {
    return control.bind(Data_Either.bindEither)(Data_Quantity.toScalar(tempFahrenheit$prime))(function (tempFahrenheit) {
        return control.pure(Data_Either.applicativeEither)(Data_Quantity.quantity((tempFahrenheit + offsetFahrenheit) * multiplierFahrenheit)(Data_Units_SI.kelvin));
    });
};
let fromCelsius = function (tempCelsius$prime) {
    return control.bind(Data_Either.bindEither)(Data_Quantity.toScalar(tempCelsius$prime))(function (tempCelsius) {
        return control.pure(Data_Either.applicativeEither)(Data_Quantity.quantity(tempCelsius + offsetCelsius)(Data_Units_SI.kelvin));
    });
};
module.exports = {
    fromCelsius: fromCelsius,
    toCelsius: toCelsius,
    fromFahrenheit: fromFahrenheit,
    toFahrenheit: toFahrenheit
};
