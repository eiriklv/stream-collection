var ReadableStream = require('stream').Readable;
var util = require('util');

util.inherits(SourceWrapperStream, ReadableStream);

function SourceWrapperStream(source, opts) {
  if (!(this instanceof SourceWrapperStream))
    return new SourceWrapperStream(source, opts);

  ReadableStream.call(this, {
    objectMode: true
  });

  var self = this;
  this._source = source;

  this._source[opts.onData] = function(chunk) {
    if (!self.push(chunk))
      self._source[opts.readStop]();
  };

  this._source[opts.onEnd] = function() {
    self.push(null);
  };
}

SourceWrapperStream.prototype._read = function(size) {
  this._source[opts.readStart]();
};

