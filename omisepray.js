(function() {
  var root = this,
      Promise = function(resolveFunc, rejectFunc) {
        var promise = this,
            resolved = false,
            resolvedPromise = function(val) {
              if (resolved) {
                return;
              }
              resolved = true;
              resolve(promise, val);
            },
            rejectedPromise = function(val) {
              if (resolved) {
                return;
              }
              resolved = true;
              reject(promise, val);
            };

        try {
          // Try to resolve the function and pass in the current promise
          resolve(promise, null);
        } catch(e) {

        }
      };

  function later(func, args) {
    setImmediate(function() {
      func(args);
    });
  }

  function resolve(promise, val) {
    later(function() {
      promise.stateChange('resolved');
    }, null);
  }

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
