const NrcCoverter = require("./index");

console.log(NrcCoverter.convertNrc("၈/မမန (နိုင်) 643434", "mm", "eng"));
console.log(NrcCoverter.autoConvertNrc("၈/မမန (နိုင်) 643434"));
console.log(NrcCoverter.autoConvertNrc("11/MaMaNa (N) 643434"));

console.log(NrcCoverter.convertNumbers("0123456789", "eng", "mm"));
console.log(NrcCoverter.convertNumbers("၀၁၂၃၄၅၆၇၈၉", "mm", "eng"));

console.log(NrcCoverter.detect("၈/မမန (နိုင်) 643434", "mm"));
console.log(NrcCoverter.detect("11/MaMaNa (N) 643434", "mm"));
