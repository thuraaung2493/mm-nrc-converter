# NRC reference data

`nrc.json` is the single NRC dataset: 14 state numbers and 429 bilingual township
entries. Each record has a `state` (English string) and `townships` containing
`{ en, mm }` code pairs. State 9 includes both Nay Pyi Taw and Mandalay groups.

Codes absent from the bundled data are rejected by the modern API.

Number conversion uses a digit mapping in code. Township conversion uses the
complete codes in this dataset, so a separate syllable list is unnecessary.
