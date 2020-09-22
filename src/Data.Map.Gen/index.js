const control = require("../control");
let Control_Monad_Gen = require("../Control.Monad.Gen/index.js");
let Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class/index.js");

let data = require("../data");
let Data_List_Types = require("../Data.List.Types/index.js");
let Data_Map_Internal = require("../Data.Map.Internal/index.js");
let Data_Tuple = require("../Data.Tuple/index.js");


let apply = function (dict) {
	return dict.apply;
};

let genMap = function (dictMonadRec) {
    return function (dictMonadGen) {
        return function (dictOrd) {
            return function (genKey) {
                return function (genValue) {
                    return Control_Monad_Gen_Class.sized(dictMonadGen)(function (size) {
                        return control.bind((dictMonadGen.Monad0()).Bind1())(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(size))(function (newSize) {
                            return Control_Monad_Gen_Class.resize(dictMonadGen)(data._const(newSize))(data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Map_Internal.fromFoldable(dictOrd)(Data_List_Types.foldableList))(Control_Monad_Gen.unfoldable(dictMonadRec)(dictMonadGen)(Data_List_Types.unfoldableList)(apply(((dictMonadGen.Monad0()).Bind1()).Apply0())(data.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Tuple.Tuple.create)(genKey))(genValue))));
                        });
                    });
                };
            };
        };
    };
};

module.exports = {
    genMap: genMap
};
