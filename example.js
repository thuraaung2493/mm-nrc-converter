const nrc = require("./index");

console.log(nrc.toEnglish("၁၂/လမန (နိုင်) ၀၀၁၂၃၄"));
console.log(nrc.toMyanmar("12/lamana(N)001234"));
console.log(nrc.parse("၈/မမန(နိုင်)၉၃၉၄၃၃"));
console.log(nrc.isValid("12/LaMaNa(N)001234"));
console.log(nrc.getTownships(12, "mm"));
console.log(nrc.convertNumbers("၀၁၂၃၄၅၆၇၈၉", "mm", "en"));
