# brn

BlinkMobile Resource Name, just like Amazon's AWS ARN

## Usage

- BRNs are lowercase: uppercase inputs will result in lowercase output
- valid BRNs match `/^brn:(\w+):(\w+):(\w*):(\*|[\w\-]*\*?)$/`

### Node.JS

```javascript
var BRN = require('brn');

var brn = new BRN('brn:domain:type:tenant:id')
```

### API

Instances of `BRN` have `domain`, `type`, `tenant`, and `id` String properties.
Assign new values to them at any time to adjust a BRN if necessary.

```javascript
var brn = new BRN('brn:domain:type:tenant:id')
brn.domain; // 'domain'
brn.domain = 'blah'; // 'blah'
brn.toString(); // 'brn:blah:type:tenant:id'
```

We've also defined `BRN#toString()` and `BRN#toJSON`. Feel free to perform
string concatenation or JSON serialisation on BRNs.

```javascript
var brn = new BRN('brn:domain:type:tenant:id')
'' + brn; // 'brn:domain:type:tenant:id'
JSON.stringify(brn); // { domain: 'domain', ... }
```

#### BRN.isBRN(String input)

- @returns {Boolean}

```javascript
BRN.isBRN('blah'); // false
BRN.isBRN('brn::::'); // false

BRN.isBRN('brn:domain:type::id'); // true
BRN.isBRN('brn:domain:type::*'); // true
BRN.isBRN('brn:domain:type::prefix*'); // true
BRN.isBRN('brn:domain:type:tenant:id'); // true
BRN.isBRN('brn:domain:type:tenant:*'); // true
BRN.isBRN('brn:domain:type:tenant:prefix*'); // true
```

#### BRN#isValid()

- @returns {Boolean}

```javascript
var brn;
brn = new BRN('blah');
brn.isValid(); // false

brn = new BRN('brn:domain:type:tenant:id')
brn.isValid(); // true
```

#### BRN#test(input)

- @param {String|BRN} input a BRN to see if it matches this BRN's wildcard
- @returns {Boolean}

```javascript
var wildcard = new BRN('brn:domain:type:tenant:*');
wildcard.test('brn:domain:type:tenant:123'); // true
```

Notes:
- this ignores the `tenant` property for now
- if the input BRN also has a wildcard, then the result will always be `false`

#### BRN#isLessSpecificThan(input)

- @param {String|BRN} input a BRN to compare with the current BRN
- @returns {Boolean} true if the input BRN has fewer wildcards than this BRN

Notes:
- this ignores the `tenant` property for now


## Development and Testing

```shell
npm test
```
