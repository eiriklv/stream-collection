var ReadableStream = require('stream').Readable;
var util = require('util');

util.inherits(RandomStream, ReadableStream);

function RandomStream(max, low, high) {
  if (!(this instanceof RandomStream))
    return new RandomStream(max, low, high);
  
  if (high < low) high = low;

  ReadableStream.call(this, {
    objectMode: true
  });

  this._low = low;
  this._high = high;
  this._max = max;
  this._index = 1;
}

RandomStream.prototype._read = function() {
  var i = this._index++;
  
  if (i > this._max) {
    this.push(null);
  } else {
    this.push(getRandomInt(this._low, this._high + 1));
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = RandomStream;

