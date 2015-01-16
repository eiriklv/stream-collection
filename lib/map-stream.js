var TransformStream = require('stream').Transform;
var util = require('util');

util.inherits(MapStream, TransformStream);

function MapStream(fn) {
  if (!(this instanceof MapStream)) 
    return new MapStream(fn);

  this._fn = fn;

  TransformStream.call(this, {
    objectMode: true
  });
}

MapStream.prototype._transform = function(chunk, encoding, done) {
  if (this._fn.length > 1) {
    this._fn(chunk, done);
  } else {
    done(null, this._fn(chunk));
  }
};

module.exports = MapStream;
