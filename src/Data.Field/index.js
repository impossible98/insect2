let Field = function (DivisionRing1, EuclideanRing0) {
    this.DivisionRing1 = DivisionRing1;
    this.EuclideanRing0 = EuclideanRing0;
};
let field = function (dictEuclideanRing) {
    return function (dictDivisionRing) {
        return new Field(function () {
            return dictDivisionRing;
        }, function () {
            return dictEuclideanRing;
        });
    };
};
module.exports = {
    Field: Field,
    field: field
};
