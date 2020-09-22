"use strict";

exports.new = function (val) {
  return () => {
    return { value: val };
  };
};

exports.read = function (ref) {
  return () => {
    return ref.value;
  };
};

exports["modify'"] = function (f) {
  return function (ref) {
    return () => {
      let t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};

exports.write = function (val) {
  return function (ref) {
    return () => {
      ref.value = val;
      return {};
    };
  };
};
