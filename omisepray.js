(function() {
  var root = this,
      Promise = function() {};

  // Promises/A+ 2.1: Promise defines the 'then' function
  Promise.prototype.then = function() {
    return true;
  };

  root.Promise = Promise;
}).call(this);
