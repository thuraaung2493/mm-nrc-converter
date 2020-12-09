# mm-nrc-converter

This package will convert mm-format-nrc to eng-format-nrc or eng-format-nrc to mm-format-nrc.

## Usage

```javascript
const NrcConverter = require("mm-nrc-converter");

console.log(NrcConverter.convertNrc("၈/မမန (နိုင်) ၄၉၀၉၄၃", "mm", "eng"));
console.log(NrcConverter.convertNrc("12/MaMaNa (N) 643434", "eng", "mm"));

// Convert myanmar numbers to english number (Bonus 😄😅)

console.log(NrcConverter.converNumbers("0123456789", "eng", "mm"));
console.log(NrcConverter.converNumbers("၀၁၂၃၄၅၆၇၈၉", "mm", "eng"));
```
