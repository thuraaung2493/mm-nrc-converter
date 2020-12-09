# mm-nrc-converter

This package will convert mm-format-nrc to eng-format-nrc or eng-format-nrc to mm-format-nrc.

## Usage

```javascript
const NrcCoverter = require("mm-nrc-converter");

console.log(NrcCoverter.convertNrc("၈/မမန (နိုင်) ၄၉၀၉၄၃", "mm", "eng"));
console.log(NrcCoverter.convertNrc("12/MaMaNa (N) 643434", "eng", "mm"));

// Convert myanmar numbers to english number (Bonus 😄😅)

console.log(NrcCoverter.converNumbers("0123456789", "eng", "mm"));
console.log(NrcCoverter.converNumbers("၀၁၂၃၄၅၆၇၈၉", "mm", "eng"));
```
