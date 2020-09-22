let Data_BooleanAlgebra = require("../Data.BooleanAlgebra/index.js");
let Data_Functor_Contravariant = require("../Data.Functor.Contravariant/index.js");
let Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");


let Predicate = function (x) {
    return x;
};
let newtypePredicate = new Data_Newtype.Newtype(function (n) {
    return n;
}, Predicate);
let heytingAlgebraPredicate = Data_HeytingAlgebra.heytingAlgebraFunction(Data_HeytingAlgebra.heytingAlgebraBoolean);
let contravariantPredicate = new Data_Functor_Contravariant.Contravariant(function (f) {
    return function (v) {
        return function ($6) {
            return v(f($6));
        };
    };
});
let booleanAlgebraPredicate = Data_BooleanAlgebra.booleanAlgebraFn(Data_BooleanAlgebra.booleanAlgebraBoolean);
module.exports = {
    Predicate: Predicate,
    newtypePredicate: newtypePredicate,
    heytingAlgebraPredicate: heytingAlgebraPredicate,
    booleanAlgebraPredicate: booleanAlgebraPredicate,
    contravariantPredicate: contravariantPredicate
};
