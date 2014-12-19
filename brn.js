'use strict';

/** @private @constant */
var REGEXP = /^brn:(\w+):(\w+):(\w*):(\*|[\w\-]*\*?)$/;

/** @private @constant */
var WILDCARD = '[\\w\\-]+';

/** @private @constant */
var PROPS = ['domain', 'type', 'tenant', 'id'];

/**
 * @constructor
 * @param {String} string initialisation value to parse
 * @return {BRN} object with parse results
 */
function BRN(string) {
  var match;
  if (!string || typeof string !== 'string') {
    return this;
  }
  match = string.match(REGEXP);
  if (match) {
    this.domain = match[1];
    this.type = match[2];
    this.tenant = match[3];
    this.id = match[4];
  } else {
    this.domain = '';
    this.type = '';
    this.tenant = '';
    this.id = '';
  }
}

/**
 * @private
 * @param {Object} context the value to use as `this` in the setter|getter
 * @param {String} prop the name of the property to hook
 * @returns {Object} the context value that was passed in
 */
function configureStringProperty(context, prop) {
  return Object.defineProperty(context, prop, {
    set: function (value) {
      if (typeof value !== 'string') {
        return this['_' + prop];
      }
      this['_' + prop] = value.toLowerCase();
      return this['_' + prop];
    },
    get: function () {
      return this['_' + prop];
    }
  });
}

PROPS.forEach(function (name) {
  configureStringProperty(BRN.prototype, name);
});

/** @returns {String} e.g. brn:domain:type:tenant:id */
BRN.prototype.toString = function toString() {
  return 'brn:' + this.domain + ':' + this.type + ':' + this.tenant + ':' + this.id;
};

/** @returns {Boolean} does this BRN currently conform to the specification? */
BRN.prototype.isValid = function isValid() {
  return !!(this.domain && this.type && this.id && BRN.isBRN(this.toString()));
};

/** @returns {Object} new Object with only values desirable for JSON output */
BRN.prototype.toJSON = function toJSON() {
  var obj;
  if (!this.isValid()) {
    return {};
  }
  obj = {
    domain: this.domain,
    type: this.type,
    id: this.id
  };
  if (this.tenant) {
    obj.tenant = this.tenant;
  }
  return obj;
};

/**
 * @param {BRN} input BRN to test against this BRN
 * @returns {Boolean} does this BRN's wildcard, etc match the input BRN?
 */
BRN.prototype.test = function test(input) {
  var regexp;
  if (!input || typeof input !== 'object' || !input instanceof BRN) {
    input = new BRN(input);
  }
  if (!this.isValid() || !input.isValid() || input.id.indexOf('*') !== -1) {
    return false;
  }
  regexp = new RegExp(this.toString().replace('*', WILDCARD));
  return regexp.test(input.toString());
};

/**
 * @static
 * @param {String} string incoming value to test
 * @return {Boolean} true if string is a valid BRN
 */
BRN.isBRN = function isBRN(string) {
  return REGEXP.test(string);
};

module.exports = BRN;
