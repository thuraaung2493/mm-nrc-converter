# Changelog

## 2.0.2

### Documentation

- Fix installation instructions and improve documentation in `README.md`.

### Branding

- Update project logo and GitHub social preview image.

## 2.0.1

### Package

- Rename the npm package from `mm-nrc-converter` to `@thuraaung2493/mm-nrc-converter`.

## 2.0.0

- Add `toEnglish()`, `toMyanmar()`, `convert()`, `parse()`, `isValid()`, and
  `getTownships()` for explicit conversion, validation, and form options.
- Bundle 429 bilingual township entries across 14 state numbers in `data/nrc.json`.
- Include TypeScript declarations and support the `en` language alias.
- Preserve leading zeroes, accept case-insensitive English codes and type aliases,
  and handle Myanmar codes containing `ဥ`.
- Fix repeated detection calls and match complete NRC strings.
- Add GitHub Actions CI and npm publishing from stable GitHub releases.

### Breaking changes

- Remove `data/nrc-list.json`, `data/pair-nrc-list.json`, and `data/numbers.json`.
  Direct data consumers must use the state-grouped `data/nrc.json` format.
- Conversion now respects township/state membership and corrected spellings.
  Legacy converters return invalid strings with whitespace removed instead of
  partially translating unknown or mismatched codes.
- `detect()` matches complete inputs and accepts only the supported N/P types
  and their aliases. It remains a format check; use `isValid()` for membership
  and six-digit serial validation.

Existing conversion function names and positional language arguments remain
available. See the README migration notes for usage examples.
