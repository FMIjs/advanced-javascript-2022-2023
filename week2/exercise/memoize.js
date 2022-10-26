function memoize(func) {
  var cache = {};
  return function () {
    var key = JSON.stringify(arguments);
    var result = cache[key];
    if (!result) {
      result = func.apply(undefined, arguments);
      cache[key] = result;
    }
    return result;
  };
}