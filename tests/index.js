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

test('brn = new BRN("blah")', function (t) {
  var input = 'blah';
  var brn = new BRN(input);
  t.equal(brn.isValid(), false, 'brn.isValid() returns false');
  t.end();
});

test('brn = new BRN("brn:domain:type:tenant:id")', function (t) {
  var input = 'brn:domain:type:tenant:id';
  var brn = new BRN(input);
  t.equal(brn.isValid(), true, 'brn.isValid() returns true');
  t.equal('' + brn, input, '"" + brn returns "' + input + '"');
  t.end();
});

test('brn = new BRN("brn:domain:type::*")', function (t) {
  var input = 'brn:domain:type::*';
  var brn = new BRN(input);
  t.equal(brn.isValid(), true, 'brn.isValid() returns true');
  t.equal('' + brn, input, '"" + brn returns "' + input + '"');
  t.end();
});

test('updated = new BRN("brn:domain:type::*"); updated.tenant = "tenant"', function (t) {
  var input = 'brn:domain:type::*';
  var updated = 'brn:domain:type:tenant:*';
  var brn = new BRN(input);
  brn.tenant = 'tenant';
  t.equal(brn.isValid(), true, 'brn.isValid() returns true');
  t.equal('' + brn, updated, '"" + brn returns "' + updated + '"');
  t.end();
});

test('updated = new BRN("brn:domain:type::*"); updated.domain = "DOMAIN"', function (t) {
  var input = 'brn:domain:type::*';
  var updated = input;
  var brn = new BRN(input);
  brn.domain = 'DOMAIN';
  t.equal(brn.isValid(), true, 'brn.isValid() returns true');
  t.equal('' + brn, updated, '"" + brn returns lowercase "' + updated + '"');
  t.end();
});

test('JSON.stringify(new BRN("brn:domain:type:tenant:id"))', function (t) {
  var input = 'brn:domain:type:tenant:id';
  var brn = new BRN(input);
  var json = JSON.stringify(brn);
  var obj = JSON.parse(json);
  t.ok(obj, 'JSON output is truthy');
  t.equal(typeof obj, 'object', 'JSON output is an Object');
  t.deepEqual(obj, {
    domain: 'domain',
    type: 'type',
    tenant: 'tenant',
    id: 'id'
  }, 'JSON output is correct');
  t.end();
});

test('multiple BRN instances', function (t) {
  var a = new BRN('brn:a:a:a:a');
  var b = new BRN('brn:b:b:b:b');
  t.equal(a.domain, 'a', '1st BRN should not be confused by 2nd');
  t.equal(b.domain, 'b', '2nd BRN should not be confused by 1st');
  t.end();
});

test('(new BRN("brn:domain:type::id")).test(...)', function (t) {
  var brn = new BRN('brn:domain:type::id');
  t.equal(brn.test('brn:domain:type::id'), true, 'same BRN returns true');
  t.equal(brn.test('brn:blah:type::id'), false, 'new domain returns false');
  t.equal(brn.test('brn:domain:blah::id'), false, 'new type returns false');
  t.equal(brn.test('brn:domain:type::123'), false, 'new ID returns false');
  t.equal(brn.test('brn:domain:type::*'), false, 'wildcard ID returns false');
  t.equal(brn.test('brn:domain:type::abc*'), false, 'prefixed-wildcard ID returns false');
  t.end();
});

test('(new BRN("brn:domain:type::*")).test(...)', function (t) {
  var brn = new BRN('brn:domain:type::*');
  t.equal(brn.test('brn:domain:type::*'), false, 'wildcard ID returns false');
  t.equal(brn.test('brn:domain:type::abc*'), false, 'prefixed-wildcard ID returns false');
  t.equal(brn.test('brn:domain:type::123'), true, 'any ID returns true');
  t.end();
});

test('(new BRN("brn:domain:type::abc*")).test(...)', function (t) {
  var brn = new BRN('brn:domain:type::abc*');
  t.equal(brn.test('brn:domain:type::*'), false, 'wildcard ID returns false');
  t.equal(brn.test('brn:domain:type::abc*'), false, 'prefixed-wildcard ID returns false');
  t.equal(brn.test('brn:domain:type::123'), false, 'any ID returns false');
  t.equal(brn.test('brn:domain:type::abc123'), true, 'prefixed-matching ID returns true');
  t.end();
});
