<p align="center">
  <img src="assets/branding/logo.png" alt="mm-nrc-converter logo" width="120" />
</p>

# mm-nrc-converter

Convert Myanmar NRC numbers between English and Myanmar, parse their components,
validate them against bundled township data, and get township codes for forms.
Works offline, with no runtime dependencies or API requests.

![mm-nrc-converter — an open-source project by Thura Aung](assets/branding/social-preview.jpg)

An open-source project by [Thura Aung](https://thuraaung2493.github.io/).

## Installation

```sh
npm install mm-nrc-converter
```

## Usage

```javascript
const nrc = require("mm-nrc-converter");

nrc.toEnglish("၁၂/လမန (နိုင်) ၀၀၁၂၃၄"); // "12/LaMaNa(N)001234"
nrc.toMyanmar("12/lamana(N)001234");     // "၁၂/လမန(နိုင်)၀၀၁၂၃၄"
nrc.convert("၈/မမန(နိုင်)၉၃၉၄၃၃");      // "8/MaMaNa(N)939433"
nrc.convert("8/MaMaNa(N)939433", "mm"); // "၈/မမန(နိုင်)၉၃၉၄၃၃"

nrc.isValid("12/LaMaNa(N)001234"); // true
nrc.isValid("1/LaMaNa(N)001234");  // false: township not in state 1

nrc.parse("၁၂/လမန(နိုင်)၀၀၁၂၃၄");
// {
//   state: "12", township: "LaMaNa", type: "N",
//   number: "001234", language: "mm"
// }

nrc.getTownships(12);       // English township codes for state 12
nrc.getTownships("၁၂", "mm"); // Myanmar township codes for state 12
```

TypeScript declarations are included. With an ESM TypeScript application, use
`import * as nrc from "mm-nrc-converter"`.

## Public API

| Function | Behavior |
| --- | --- |
| `toEnglish(input)` | Detect the input language and return canonical English. |
| `toMyanmar(input)` | Detect the input language and return canonical Myanmar. |
| `convert(input, to = "en")` | Convert to a chosen output language. |
| `parse(input)` | Return English-normalized components and the detected language, or `null`. |
| `isValid(input)` | Check the format, six-digit serial, and township/state pair. |
| `getTownships(state, language = "en")` | Return township codes in source order; unknown states return `[]`. |
| `convertNumbers(input, from = "eng", to = "mm")` | Convert digits in any string, preserving other characters. |

Language arguments accept `"en"`, `"mm"`, and the legacy English alias `"eng"`.
English township codes and type aliases are case-insensitive. All whitespace is
removed before parsing. Myanmar NRC input can contain English serial digits.
Serial numbers stay strings, preserving leading zeroes. Converting a value to
its existing language normalizes its spelling and spacing.

The supported types are `N` / `Naing` / `နိုင်` and `P` / `Pyu` / `ပြု`.
English output uses `N` and `P`. Other card types are not supported.
Validation checks the bundled reference and structure; it cannot verify issuance
or a person's identity.

`convert()`, `toEnglish()`, and `toMyanmar()` throw `RangeError` for invalid NRC
strings and `TypeError` for non-string inputs. For user-entered values, call
`parse()` or `isValid()` first; both safely handle non-string values. Unsupported
language arguments throw `RangeError`.

```javascript
nrc.convertNumbers("၀၀၁၂၃၄", "mm", "en"); // "001234"
nrc.convertNumbers("001234", "en", "mm"); // "၀၀၁၂၃၄"
```

## Existing API and migration

The existing names and positional signatures remain available:

```javascript
nrc.convertNrc("8/MaMaNa(N)939433", "eng", "mm");
nrc.autoConvertNrc("၈/မမန(နိုင်)၉၃၉၄၃၃");
nrc.detect("12/LaMaNa(N)001234", "eng"); // true; format check only
```

Prefer `toEnglish()` and `toMyanmar()` over positional `convertNrc()` calls.
`convert()` defaults to English; `autoConvertNrc()` toggles the detected language.
Legacy converters still accept serials of arbitrary length and return invalid
strings with whitespace removed. `transform()` and `removeAllSpace()` remain
exported for compatibility; new code does not need these utilities.

Behavior corrections apply to both APIs: complete strings are matched, repeated
`detect()` calls are deterministic, and conversions use the township's state.
Unknown township/state pairs are no longer partially translated by legacy
converters. Source-corrected township spellings replace the old spellings; old
codes absent from the new reference are no longer converted. `detect()` accepts
only the supported N/P types and their aliases, but does not check township
membership or serial length. Use `isValid()` for those checks.

Direct data imports now use `data/nrc.json`. The legacy `nrc-list.json`,
`pair-nrc-list.json`, and `numbers.json` files have been removed.

## Data and maintenance

The package bundles **429 township entries across 14 state numbers**. State 9
includes both Nay Pyi Taw and Mandalay groups.
See [data format details](data/README.md).

## Development

```sh
npm ci
npm test -- --runInBand
node example.js
```

[Examples](example.js) use the public package entry point. Tests cover conversion,
validation, data consistency, compatibility, and round trips for every bundled township.

## Releases

GitHub Actions checks pull requests and pushes to `main` on Node 22 and 24.
Publishing a stable GitHub release tagged `v<package-version>` runs tests and
publishes to npm through trusted publishing. The next release is `v2.0.0`.
See the [release setup guide](https://github.com/thuraaung2493/mm-nrc-converter/blob/main/RELEASING.md)
for the one-time npm configuration and release steps.

Author: [thuraaung2493](https://github.com/thuraaung2493) · License: ISC
