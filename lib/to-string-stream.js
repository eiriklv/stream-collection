var TransformStream = require('stream').Transform;
var util = require('util');

util.inherits(ToStringStream, TransformStream);

function ToStringStream() {
  if (!(this instanceof ToStringStream))
    return new ToStringStream();

  TransformStream.call(this, {
    objectMode: true
  });
}

ToStringStream.prototype._transform = function(chunk, encoding, done) {
  var output;
  var error;

  try {
    output = chunk.toString();
  } catch (e) {
    error = e;
  }

  done(error, output);
};

module.exports = ToStringStream;
