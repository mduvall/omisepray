describe("Promise object", function() {
  it("should be defined as a global", function() {
    expect(Promise).toBeDefined();
  });
});

describe("Promise interface", function() {
  it("should implement the 'then' function", function() {
    var promise = new Promise(function(resolve, reject) {});

    expect(promise.then).toBeDefined();
    expect(promise.then()).toBeTruthy();
  });

  it("should have all states initally be undefined", function() {
    var promise = new Promise(function(resolve, reject) {});

    expect(promise.pending).toBeTruthy();
    expect(promise.fulfilled).not.toBeDefined();
    expect(promise.rejected).not.toBeDefined();
  });

  it("should catch errors for resolved function", function() {
    var promise = new Promise(function(resolve, reject) {
      throw new TypeError("lol whoopsies");
    });

    expect(promise.rejected).toBeTruthy();
  });
});

describe("states", function() {
  describe("pending", function() {
    it("should stay in the pending state without resolution", function() {
      var promise = new Promise(function(resolve, reject) {});
      expect(promise.pending).toBeTruthy();
    });

    it("should not stay in pending state after resolution", function() {
      var promise = new Promise(function(resolve, reject) {
        resolve("resolved this is");
      });
      expect(promise.pending).toBeFalsy();
    });

    it("should not stay in pending state after rejection", function() {
      var promise = new Promise(function(resolve, reject) {
        reject("rejected this is");
      });
      expect(promise.pending).toBeFalsy();
    });
  });

  describe("fulfilled", function() {
    it("should be in fulfilled state after resolution", function() {
      var promise = new Promise(function(resolve, reject) {
        resolve("resolved this is");
      });
      expect(promise.fulfilled).toBeTruthy();
    });

    it("should be in fulfilled state after resolution and trying to reject", function() {
      var promise = new Promise(function(resolve, reject) {
        resolve("resolved this is");
        reject("lol nope");
      });
      expect(promise.fulfilled).toBeTruthy();
      expect(promise.rejected).not.toBeDefined();
    });

    it("should stay undefined after rejection", function() {
      var promise = new Promise(function(resolve, reject) {
        reject("rejected this is");
      });
      expect(promise.fulfilled).not.toBeDefined();
    });
  });

  describe("rejected", function() {
    it("should stay undefined after resolution", function() {
      var promise = new Promise(function(resolve, reject) {
        resolve("resolved this is");
      });
      expect(promise.rejectd).not.toBeDefined();
    });

    it("should be in rejected state after rejection", function() {
      var promise = new Promise(function(resolve, reject) {
        reject("rejected this is");
      });
      expect(promise.rejected).toBeTruthy();
    });

    it("should be in rejected state after rejection and trying to resolve", function() {
      var promise = new Promise(function(resolve, reject) {
        reject("rejected this is");
        resolve("lol nice try");
      });
      expect(promise.rejected).toBeTruthy();
    });
  });
});

describe("then", function() {
  it("should be able to ignore onFulfilled and onRejected", function() {
    var promise = new Promise(function(resolve, reject) {}).then();
    expect(promise.toFulfill.length).toBe(0);
    expect(promise.toReject.length).toBe(0);
  });

  it("should be able to set onFulfilled and onRejected", function() {
    var accept = function() {},
        reject = function() {},
        promise = new Promise(function(resolve, reject) {}).then(
          accept,
          reject
        );

    expect(promise.toFulfill.length).toBe(1);
    expect(promise.toFulfill[0]).toBe(accept);
    expect(promise.toReject.length).toBe(1);
    expect(promise.toReject[0]).toBe(reject);
  });
});
