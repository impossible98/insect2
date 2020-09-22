let Control_Monad_State_Trans = require("../Control.Monad.State.Trans/index.js");
let Data_Identity = require("../Data.Identity/index.js");
let Data_Newtype = require("../Data.Newtype/index.js");


let withState = Control_Monad_State_Trans.withStateT;
let runState = function (v) {
    let $16 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
    return function ($17) {
        return $16(v($17));
    };
};
let mapState = function (f) {
    return Control_Monad_State_Trans.mapStateT((function () {
        let $18 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
        return function ($19) {
            return Data_Identity.Identity(f($18($19)));
        };
    })());
};
let execState = function (v) {
    return function (s) {
        let v1 = v(s);
        return v1.value1;
    };
};
let evalState = function (v) {
    return function (s) {
        let v1 = v(s);
        return v1.value0;
    };
};
module.exports = {
    runState: runState,
    evalState: evalState,
    execState: execState,
    mapState: mapState,
    withState: withState
};
