var TransformStream = require('stream').Transform;
var util = require('util');
var _ = require('lodash');

util.inherits(ChangeStream, TransformStream);

function ChangeStream() {
  if (!(this instanceof ChangeStream))
    return new ChangeStream();

  this._previous = null;

  TransformStream.call(this, {
    objectMode: true
  });
}

ChangeStream.prototype._transform = function(data, encoding, done) {
  var isEqual = _.isEqual(this._previous, data);

  if (!isEqual) this.push(data);
  this._previous = data;
  done();
};

module.exports = ChangeStream;
