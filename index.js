
/**
 * Module dependencies.
 */

var debug = require('debug')('osc-emitter')
  , dgram = require('dgram')
  , osc = require('osc-min')
  , EventEmitter = require('events').EventEmitter;

/**
 * Expose `OscEmitter`.
 */

module.exports = OscEmitter;

/**
 * `OscEmitter` constructor.
 */

function OscEmitter() {
  this._receivers = [];
  this._socket = dgram.createSocket('udp4');
}

/**
 * Inherits from `EventEmitter`.
 */

OscEmitter.prototype.__proto__ = EventEmitter.prototype;

/**
 * `EventEmitter#emit` recerence.
 */

var emit = EventEmitter.prototype.emit;

/**
 * Emit a OSC message.
 *
 * @param {String} address
 * @param {Mixed} argument
 */

OscEmitter.prototype.emit = function() {
  if (arguments.length < 1) {
    throw new TypeError('1 or more argument required.');
  }
  var socket = this._socket;
  var args = Array.prototype.slice.call(arguments);
  var message = osc.toBuffer({ address: args[0], args: args.slice(1) });

  this._receivers.forEach(function(receiver) {
    debug('send %j to %s:%s', args, receiver.host, receiver.port);
    socket.send(message, 0, message.length, receiver.port, receiver.host);
  });

  return this;
};

/**
 * Add a receiver.
 *
 * @param {String} host
 * @param {Number} port
 */

OscEmitter.prototype.add = function(host, port) {
  this.remove(host, port);
  this._receivers.push({ host: host, port: port });
  return this;
};

/**
 * Remove a receiver.
 *
 * @param {String} host
 * @param {Number} port
 */

OscEmitter.prototype.remove = function(host, port) {
  this._receivers = this._receivers.filter(function(receiver) {
    return !(receiver.host === host && receiver.port === port);
  });
  return this;
};
