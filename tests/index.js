'use strict';

// 3rd-party modules

var test = require('tape');

// our modules

var BRN = require('../brn');

test('BRN constructor is a Function', function (t) {
  t.equal(typeof BRN, 'function');
  t.end();
});

test('BRN.isBRN(...)', function (t) {
  t.equal(BRN.isBRN('blah'), false, 'plain string is not a BRN');
  t.equal(BRN.isBRN('brn::::'), false, 'correct number of colons is not enough');

  t.equal(BRN.isBRN('brn:domain:type::id'), true, 'missin tenant is ok');
  t.equal(BRN.isBRN('brn:domain:type::*'), true, 'missing tenant with wildcard is ok');
  t.equal(BRN.isBRN('brn:domain:type::prefix*'), true, 'missing tenant with prefixed-wildcard is ok');
  t.equal(BRN.isBRN('brn:domain:type:tenant:id'), true, 'complete is ok');
  t.equal(BRN.isBRN('brn:domain:type:tenant:*'), true, 'complete with wildcard is ok');
  t.equal(BRN.isBRN('brn:domain:type:tenant:prefix*'), true, 'complete with prefixed-wildcard is ok');

  t.end();
});
