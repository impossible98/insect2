"use strict";

exports.unfoldr1ArrayImpl = function (isNothing) {
  return function (fromJust) {
    return function (fst) {
      return function (snd) {
        return function (f) {
          return function (b) {
            let result = [];
            let value = b;
            while (true) { // eslint-disable-line no-constant-condition
              let tuple = f(value);
              result.push(fst(tuple));
              let maybe = snd(tuple);
              if (isNothing(maybe)) return result;
              value = fromJust(maybe);
            }
          };
        };
      };
    };
  };
};
