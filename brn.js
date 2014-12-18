'use strict';

var regexp = /^brn:(?:([\w-])+:){2}(?:([\w-])+)?:(?:\*|([\w-])*\*?)$/;

function BRN() {}

/**
 * @param {String} string incoming value to test
 * @return {Boolean} true if string is a valid BRN
 */
BRN.isBRN = function isBRN(string) {
  return regexp.test(string);
};

module.exports = BRN;
