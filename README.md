# brn

BlinkMobile Resource Name, just like Amazon's AWS ARN

## Usage

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
```
