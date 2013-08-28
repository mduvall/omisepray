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
    finished: false,

    changeState: function(st, val) {
      var i,
          len;

      // No state changes from 'fulfilled' or 'rejected'
      if (this.fulfilled || this.rejected) {
        return;
      }

      this[st] = true;
      this.value = val;

      switch(st) {
        case "fulfilled":
          for (i = 0, len = toFulfill.length; i < len; i++) {
            toFulfill[i](val);
          }
          this.pending = false;
          break;
        case "rejected":
          for (i = 0, len = toReject.length; i < len; i++) {
            toReject[i](val);
          }
          this.pending = false;
          break;
        default:
        // no default
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

      return promise;
    },
  };

  root.Promise = Promise;
}).call(this);
