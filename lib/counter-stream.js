var ReadableStream = require('stream').Readable;
var util = require('util');

util.inherits(CounterStream, ReadableStream);

function CounterStream(opt) {
  if (!(this instanceof CounterStream))
    return new CounterStream(opt);

  ReadableStream.call(this, opt);
  this._max = 10;
  this._index = 1;
}

CounterStream.prototype._read = function() {
  var i = this._index++;
  
  if (i > this._max) {
    this.push(null);
  } else {
    var str = '' + i;
    var buf = new Buffer(str, 'ascii');
    this.push(buf);
  }
};

module.exports = CounterStream
