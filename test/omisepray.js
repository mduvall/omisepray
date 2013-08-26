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
});
