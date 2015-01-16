var TransformStream = require('stream').Transform;
var util = require('util');

util.inherits(CompareStream, TransformStream);

function CompareStream(fn) {
  if (!(this instanceof CompareStream))
    return new CompareStream(fn);

  this._fn = fn;
  this._previous = null;

  TransformStream.call(this, {
    objectMode: true
  });
}

CompareStream.prototype._transform = function(chunk, encoding, done) {
  if (this._fn.length > 1) {
    this._fn(this._previous, chunk, done);
  } else {
    done(null, this._fn(this._previous, chunk));
  }
  this._previous = chunk;
};

module.exports = CompareStream;
