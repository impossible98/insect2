// Generated by purs version 0.13.6
"use strict";
let Data_Show = require("../Data.Show/index.js");
let Void = function (x) {
    return x;
};
let absurd = function (a) {
    let spin = function ($copy_v) {
        let $tco_result;
        function $tco_loop(v) {
            $copy_v = v;
            return;
        };
        while (!false) {
            $tco_result = $tco_loop($copy_v);
        };
        return $tco_result;
    };
    return spin(a);
};
let showVoid = new Data_Show.Show(absurd);
module.exports = {
    absurd: absurd,
    showVoid: showVoid
};
