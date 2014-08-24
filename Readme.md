
# osc-emitter

[![Build Status](https://travis-ci.org/CircuitLab/osc-emitter.svg?branch=master)](https://travis-ci.org/CircuitLab/osc-emitter)

A tiny OSC message emitter.

## Installation

npm:

    $ npm install osc-emitter

## Usage

Example:

```js
var OscEmitter = require('osc-emitter')
  , emitter = new OscEmitter();

emitter.add('localhost', 7400);

emitter.emit('/foo', 1, 2, 3);
emitter.emit('/bar', 'hello', 'world');
```

## License

The MIT License

Copyright (c) 2013 Circuit Lab. &lt;info@uniba.jp&gt;
