let Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans/index.js");
let Data_Identity = require("../Data.Identity/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");


let withExcept = Control_Monad_Except_Trans.withExceptT(Data_Identity.functorIdentity);
let runExcept = (function () {
    let $0 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
    return function ($1) {
        return $0(Control_Monad_Except_Trans.runExceptT($1));
    };
})();
let mapExcept = function (f) {
    return Control_Monad_Except_Trans.mapExceptT((function () {
        let $2 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
        return function ($3) {
            return Data_Identity.Identity(f($2($3)));
        };
    })());
};

module.exports = {
    runExcept: runExcept,
    mapExcept: mapExcept,
    withExcept: withExcept
};
