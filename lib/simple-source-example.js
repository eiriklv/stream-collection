module.exports = SimpleSource;

function SimpleSource(delay) {
    if (!(this instanceof SimpleSource))
    return new SimpleSource(delay);

    var interval;

    var data = {
        name: 'Hello world',
        number: 1
    };

    this.onData = function() {
        console.log('no onData method implemented');
    };

    this.onEnd = function() {
        console.log('no onEnd method implemented');
    };

    this.readStart = function() {
        interval = setTimeout(this.onData.bind(this, data), delay);
    };

    this.readStop = function() {
        console.log('calling to .readStop()');
        clearTimeout(interval);
    };
}
