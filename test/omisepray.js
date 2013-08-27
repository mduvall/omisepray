describe("Promise object", function() {
  it("should be defined as a global", function() {
    expect(Promise).toBeDefined();
  });
});

describe("Promise interface", function() {
  it("should implement the 'then' function", function() {
    var promise = new Promise();

    expect(promise.then).toBeDefined();
    expect(promise.then()).toBeTruthy();
  });

  it("should have all states initally be undefined", function() {
    var promise = new Promise();

    expect(promise.pending).not.toBeDefined();
    expect(promise.fulfilled).not.toBeDefined();
    expect(promise.rejected).not.toBeDefined();
  });
});

describe("later", function() {
  it("should call setImmediate and not return any value", function() {

  });
});

describe("then", function() {

});