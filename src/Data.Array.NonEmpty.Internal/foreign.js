"use strict";

exports.fold1Impl = function (f) {
  return function (xs) {
    let acc = xs[0];
    let len = xs.length;
    for (let i = 1; i < len; i++) {
      acc = f(acc)(xs[i]);
    }
    return acc;
  };
};

exports.traverse1Impl = function () {
  function Cont(fn) {
    this.fn = fn;
  }

  let emptyList = {};

  let ConsCell = function (head, tail) {
    this.head = head;
    this.tail = tail;
  };

  function finalCell(head) {
    return new ConsCell(head, emptyList);
  }

  function consList(x) {
    return function (xs) {
      return new ConsCell(x, xs);
    };
  }

  function listToArray(list) {
    let arr = [];
    let xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }

  return function (apply) {
    return function (map) {
      return function (f) {
        let buildFrom = function (x, ys) {
          return apply(map(consList)(f(x)))(ys);
        };

        let go = function (acc, currentLen, xs) {
          if (currentLen === 0) {
            return acc;
          } else {
            let last = xs[currentLen - 1];
            return new Cont(function () {
              let built = go(buildFrom(last, acc), currentLen - 1, xs);
              return built;
            });
          }
        };

        return function (array) {
          let acc = map(finalCell)(f(array[array.length - 1]));
          let result = go(acc, array.length - 1, array);
          while (result instanceof Cont) {
            result = result.fn();
          }

          return map(listToArray)(result);
        };
      };
    };
  };
}();
