"use strict";

exports.unfoldrArrayImpl = function (isNothing) {
  return function (fromJust) {
    return function (fst) {
      return function (snd) {
        return function (f) {
          return function (b) {
            let result = [];
            let value = b;
            while (true) { // eslint-disable-line no-constant-condition
              let maybe = f(value);
              if (isNothing(maybe)) return result;
              let tuple = fromJust(maybe);
              result.push(fst(tuple));
              value = snd(tuple);
            }
          };
        };
      };
    };
  };
};
