(function() {
  var root = this,
      Promise = function(func) {
        // TODO: add validation for func
        var promise = this,
            resolvedPromise = function(val) {
              if (!promise.pending) {
                return;
              }

              asyncStateChange(promise, "fulfilled", val);
            },

            rejectedPromise = function(val) {
              if (!promise.pending) {
                return;
              }

              asyncStateChange(promise, "rejected", val);
            };

        asyncStateChange(promise, "pending", null);

        try {
          // Try to resolve the function and pass in the current promise
          func(resolvedPromise, rejectedPromise);
        } catch(e) {
          rejectedPromise("error");
        }
      };

  function later(func, args) {
    var f = function() {
      func(args);
    };

    if (typeof setImmediate === "function") {
      setImmediate(f);
    } else {
      setTimeout(f, 1);
    }
  }

  function asyncStateChange(promise, state, val) {
    later(function() {
      promise.changeState(state, val);
    });
  }

  // Promises/A+ 2.1: Promise defines the "then" function
  Promise.prototype = {
    constructor: Promise,
    pending: undefined,
    fulfilled: undefined,
    rejected: undefined,
    value: undefined,
    toFulfill: [],
    toReject: [],

    changeState: function(st, val) {
      // No state changes from 'fulfilled' or 'rejected'
      if (this.fulfilled || this.rejected) {
        return;
      }

      this[st] = true;
      this.value = val;

      // If the promise has been fulfilled or rejected, it is no longer pending
      if (st === "fulfilled" || st === "rejected") {
        this.pending = false;
      }
    },

    then: function(onFulfilled, onRejected) {
      var promise = new this.constructor(function() {});

      if (typeof onFulfilled === "function") {
        toFulfill.push(onFulfilled);
      } else {
        onFulfilled = undefined;
      }

      if (typeof onRejected === "function") {
        toReject.push(onRejected);
      } else {
        onRejected = undefined;
      }

      return true;
    },
  };

  root.Promise = Promise;
}).call(this);
