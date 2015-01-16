var ReadableStream = require('stream').Readable;
var asap = require('asap');
var util = require('util');

util.inherits(EventStream, ReadableStream);

function EventStream(source, eventName) {
  if (!(this instanceof EventStream))
    return new EventStream(source, eventName);

  ReadableStream.call(this, {
    objectMode: true
  });

  var self = this;

  this._source = source;
  this._event = eventName;

  this._source.on(eventName, function(data) {
    asap(self.push.bind(self, data));
  });
}

EventStream.prototype._read = function() {};

module.exports = EventStream;
