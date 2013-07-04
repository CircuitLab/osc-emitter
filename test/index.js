
var assert = require('assert');
var dgram = require('dgram');
var osc = require('osc-min');
var sock = dgram.createSocket('udp4');

sock.bind(31001);

describe('osc-emitter', function() {
  var OscEmitter = require('..');

  it('should expose OscEmitter constructor', function() {
    assert('function' === typeof OscEmitter);
    assert('OscEmitter' === OscEmitter.name);
  });

  describe('OscEmitter', function() {
    var emitter = new OscEmitter();
  
    it('#add()', function() {
      emitter.add('localhost', 31000);
      emitter.add('localhost', 31001);
      assert(2 === emitter._receivers.length);
    });
  
    it('#remove()', function() {
      emitter.remove('localhost', 31000);
      assert(1 === emitter._receivers.length);
    });
  
    it('#emit(number, number)', function(done) {
      sock.once('message', function(buf) {
        var message = osc.fromBuffer(buf);
        assert('/foo' === message.address);
        assert(2 === message.args.length);
        assert(1 === message.args[0].value);
        assert(2 === message.args[1].value);
        done();
      });
  
      setImmediate(function() {
        emitter.emit('/foo', 1, 2);
      });
    });
  
    it('#emit(string, string)', function(done) {
      sock.once('message', function(buf) {
        var message = osc.fromBuffer(buf);
        assert('/bar' === message.address);
        assert(2 === message.args.length);
        assert('hello' === message.args[0].value);
        assert('world' === message.args[1].value);
        done();
      });
  
      setImmediate(function() {
        emitter.emit('/bar', 'hello', 'world');
      });
    });
  });
});
