var TransformStream = require('stream').Transform;
var util = require('util');

util.inherits(StringifyStream, TransformStream);

function StringifyStream() {
  if (!(this instanceof StringifyStream))
    return new StringifyStream();

  TransformStream.call(this, {
    objectMode: true
  });
}

StringifyStream.prototype._transform = function(chunk, encoding, done) {
  var output;
  var error;

  try {
    output = JSON.stringify(chunk) + '\n';
  } catch (e) {
    error = e;
  }

  done(error, output);
};

module.exports = StringifyStream;
