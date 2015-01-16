var TransformStream = require('stream').Transform;
var util = require('util');

util.inherits(FilterStream, TransformStream);

function FilterStream(fn) {
  if (!(this instanceof FilterStream)) 
    return new FilterStream(fn);

  this._fn = fn;

  TransformStream.call(this, {
    objectMode: true
  });
}

FilterStream.prototype._transform = function(chunk, encoding, done) {
  var predicate;
  var error;

  if (this._fn.length > 1) {
    this._fn(chunk, function(err, keep) {
      done(err, keep ? chunk : undefined);
    });
  } else {
    try {
      predicate = this._fn(chunk);
    } catch (e) {
      error = e;
    }
    done(error, predicate ? chunk : undefined);
  }
};

module.exports = FilterStream;
