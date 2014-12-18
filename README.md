# brn

BlinkMobile Resource Name, just like Amazon's AWS ARN

## Usage

- BRNs are lowercase: uppercase inputs will result in lowercase output
- valid BRNs match `/^brn:(\w+):(\w+):(\w*):(\*|[\w\-]*\*?)$/`

### Node.JS

```javascript
var BRN = require('brn');

BRN.isBRN('blah'); // false
BRN.isBRN('brn::::'); // false

BRN.isBRN('brn:domain:type::id'); // true
BRN.isBRN('brn:domain:type::*'); // true
BRN.isBRN('brn:domain:type::prefix*'); // true
BRN.isBRN('brn:domain:type:tenant:id'); // true
BRN.isBRN('brn:domain:type:tenant:*'); // true
BRN.isBRN('brn:domain:type:tenant:prefix*'); // true

var brn;
brn = new BRN('blah');
brn.isValid(); // false

brn = new BRN('brn:domain:type:tenant:id')
brn.isValid(); // true
brn.domain; // 'domain'
brn.domain = 'blah';
brn.toString(); // 'brn:blah:type:tenant:id'
```

## Development and Testing

```shell
npm test
```
