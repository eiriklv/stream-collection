var TransformStream = require('stream').Transform;
var util = require('util');

util.inherits(MemoryStream, TransformStream);

function MemoryStream(fn, len) {
  if (!(this instanceof MemoryStream))
    return new MemoryStream(fn, len);

  this._fn = fn;
  this._values = [];
  this._len = len;

  TransformStream.call(this, {
    objectMode: true
  });
}

MemoryStream.prototype._addToList = function(val) {
  if (!(this._values.length < this._len)) this._values.shift();
  this._values.push(val);
}

MemoryStream.prototype._transform = function(chunk, encoding, done) {
  if (this._fn.length > 1) {
    this._fn(this._values, chunk, done);
  } else {
    done(null, this._fn(this._values, chunk));
  }
  this._addToList(chunk);
};

module.exports = MemoryStream;
