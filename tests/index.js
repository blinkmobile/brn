'use strict';

// 3rd-party modules

var test = require('tape');

// our modules

var BRN = require('../brn');

test('BRN constructor is a Function', function (t) {
  t.equal(typeof BRN, 'function');
  t.end();
});
