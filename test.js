var OscEmitter = require('./');

var emitter = new OscEmitter();

setTimeout(function() {
  console.log('emitting to /foo');  
  emitter.emit('/foo', 1, 2, 3);
}, 1000);

setTimeout(function() {
  console.log('emitting to /bar');
  emitter.emit('/bar', 'hello', 'world');
}, 2000);

emitter.add('localhost', 7400);
