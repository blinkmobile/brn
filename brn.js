'use strict';

var regexp = /^brn:(\w+):(\w+):(\w*):(\*|[\w\-]*\*?)$/;

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
  match = string.match(regexp);
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

function configureStringProperty(context, prop) {
  Object.defineProperty(context, prop, {
    set: function (value) {
      if (typeof value !== 'string') {
        return this['_' + prop];
      }
      this['_' + prop] = value.toLowerCase();
      return this['_' + prop];
    }.bind(context),
    get: function () {
      return this['_' + prop];
    }.bind(context)
  });
}

['domain', 'type', 'tenant', 'id'].forEach(function (name) {
  configureStringProperty(BRN.prototype, name);
});

BRN.prototype.toString = function toString() {
  return 'brn:' + this.domain + ':' + this.type + ':' + this.tenant + ':' + this.id;
};

BRN.prototype.isValid = function isValid() {
  return !!(this.domain && this.type && this.id && BRN.isBRN(this.toString()));
};

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
 * @param {String} string incoming value to test
 * @return {Boolean} true if string is a valid BRN
 */
BRN.isBRN = function isBRN(string) {
  return regexp.test(string);
};

module.exports = BRN;
