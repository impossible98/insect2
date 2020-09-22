"use strict";
/* global Symbol */

let hasArrayFrom = typeof Array.from === "function";
let hasStringIterator =
  typeof Symbol !== "undefined" &&
  Symbol != null &&
  typeof Symbol.iterator !== "undefined" &&
  typeof String.prototype[Symbol.iterator] === "function";
let hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
let hasCodePointAt = typeof String.prototype.codePointAt === "function";

exports._unsafeCodePointAt0 = function (fallback) {
  return hasCodePointAt
    ? function (str) { return str.codePointAt(0); }
    : fallback;
};

exports._codePointAt = function (fallback) {
  return function (Just) {
    return function (Nothing) {
      return function (unsafeCodePointAt0) {
        return function (index) {
          return function (str) {
            let length = str.length;
            if (index < 0 || index >= length) return Nothing;
            if (hasStringIterator) {
              let iter = str[Symbol.iterator]();
              for (let i = index;; --i) {
                let o = iter.next();
                if (o.done) return Nothing;
                if (i === 0) return Just(unsafeCodePointAt0(o.value));
              }
            }
            return fallback(index)(str);
          };
        };
      };
    };
  };
};

exports._countPrefix = function (fallback) {
  return function (unsafeCodePointAt0) {
    if (hasStringIterator) {
      return function (pred) {
        return function (str) {
          let iter = str[Symbol.iterator]();
          for (let cpCount = 0; ; ++cpCount) {
            let o = iter.next();
            if (o.done) return cpCount;
            let cp = unsafeCodePointAt0(o.value);
            if (!pred(cp)) return cpCount;
          }
        };
      };
    }
    return fallback;
  };
};

exports._fromCodePointArray = function (singleton) {
  return hasFromCodePoint
    ? function (cps) {
      // Function.prototype.apply will fail for very large second parameters,
      // so we don't use it for arrays with 10,000 or more entries.
      if (cps.length < 10e3) {
        return String.fromCodePoint.apply(String, cps);
      }
      return cps.map(singleton).join("");
    }
    : function (cps) {
      return cps.map(singleton).join("");
    };
};

exports._singleton = function (fallback) {
  return hasFromCodePoint ? String.fromCodePoint : fallback;
};

exports._take = function (fallback) {
  return function (n) {
    if (hasStringIterator) {
      return function (str) {
        let accum = "";
        let iter = str[Symbol.iterator]();
        for (let i = 0; i < n; ++i) {
          let o = iter.next();
          if (o.done) return accum;
          accum += o.value;
        }
        return accum;
      };
    }
    return fallback(n);
  };
};

exports._toCodePointArray = function (fallback) {
  return function (unsafeCodePointAt0) {
    if (hasArrayFrom) {
      return function (str) {
        return Array.from(str, unsafeCodePointAt0);
      };
    }
    return fallback;
  };
};
