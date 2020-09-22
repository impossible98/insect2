"use strict";

let unsafeCompareImpl = function (lt) {
  return function (eq) {
    return function (gt) {
      return function (x) {
        return function (y) {
          return x < y ? lt : x === y ? eq : gt;
        };
      };
    };
  };
};

exports.ordBooleanImpl = unsafeCompareImpl;
exports.ordIntImpl = unsafeCompareImpl;
exports.ordNumberImpl = unsafeCompareImpl;
exports.ordStringImpl = unsafeCompareImpl;
exports.ordCharImpl = unsafeCompareImpl;

exports.ordArrayImpl = function (f) {
  return function (xs) {
    return function (ys) {
      let i = 0;
      let xlen = xs.length;
      let ylen = ys.length;
      while (i < xlen && i < ylen) {
        let x = xs[i];
        let y = ys[i];
        let o = f(x)(y);
        if (o !== 0) {
          return o;
        }
        i++;
      }
      if (xlen === ylen) {
        return 0;
      } else if (xlen > ylen) {
        return -1;
      } else {
        return 1;
      }
    };
  };
};
