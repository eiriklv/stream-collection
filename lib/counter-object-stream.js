var ReadableStream = require('stream').Readable;
var util = require('util');

util.inherits(CounterStream, ReadableStream);

function CounterStream(max) {
  if (!(this instanceof CounterStream))
    return new CounterStream(max);
  
  this._max = max;
  this._index = 1;

  ReadableStream.call(this, {
    objectMode: true
  });
}

CounterStream.prototype._read = function() {
  var i = this._index++;
  
  if (i > this._max) {
    this.push(null);
  } else {
    this.push({
      count: i
    });
  }
};

module.exports = CounterStream;
