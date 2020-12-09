const NrcCoverter = require("./index");

console.log(NrcCoverter.convertNrc("၈/မမန (နိုင်) 643434", "mm", "eng"));

console.log(NrcCoverter.converNumbers("0123456789", "eng", "mm"));
console.log(NrcCoverter.converNumbers("၀၁၂၃၄၅၆၇၈၉", "mm", "eng"));
