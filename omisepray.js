(function() {
  var root = this,
      Promise = function(resolveFunc) {

      },
      later = function(func, args) {
        setImmediate(function() {
          func(args);
        });
      };

  // Promises/A+ 2.1: Promise defines the 'then' function
  Promise.prototype = {
    constructor: Promise,
    pending: undefined,
    fulfilled: undefined,
    rejected: undefined,

    then: function(onFulfilled, onRejected) {
      var promise = new this.constructor(function() {});

      if (typeof onFulfilled !== "function") {
        onFulfilled = undefined;
      }

      if (typeof onRejected !== "function") {
        onRejected = undefined;
      }
    },
  };

  root.Promise = Promise;
}).call(this);
