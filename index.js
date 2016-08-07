module.exports = function (executor, context = null) {
  var parts = [];
  var proxy = new Proxy(function () {
    var returnVal = executor.call(context, parts);
    parts = [];
    return returnVal;
  }, {
    has() {
      return true;
    },
    get(object, prop) {
      parts.push(prop);
      return proxy;
    }
  });
  return proxy;
}
