(function() {
  var root = this,
      Promise = function(func) {
        // TODO: add validation for func
        var promise = this,
            resolve = function(val) {
              if (!promise.pending) { return; }
              promise.changeState("fulfilled", val);
            },

            reject = function(val) {
              if (!promise.pending) { return; }
              promise.changeState("rejected", val);
            };

        promise.changeState("pending", null);

        try {
          // Try to resolve the function and pass in the current promise
          func(resolve, reject);
        } catch(e) {
          reject("error");
        }
      };

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
          this.pending = false;
          for (i = 0, len = this.toFulfill.length; i < len; i++) {
            this.toFulfill[i](val);
          }
          break;
        case "rejected":
          this.pending = false;
          for (i = 0, len = this.toReject.length; i < len; i++) {
            this.toReject[i](val);
          }
          break;
        default:
        // no default
      }
    },

    then: function(onFulfilled, onRejected) {
      var promise = new this.constructor(function() {});

      if (typeof onFulfilled === "function") {
        this.toFulfill.push(onFulfilled);
      } else {
        onFulfilled = undefined;
      }

      if (typeof onRejected === "function") {
        this.toReject.push(onRejected);
      } else {
        onRejected = undefined;
      }

      return promise;
    },
  };

  root.Promise = Promise;
}).call(this);