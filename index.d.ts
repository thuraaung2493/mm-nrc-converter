/** English accepts both the preferred `en` and the legacy `eng` spelling. */
export type Language = "en" | "eng" | "mm";

/** Components are normalized to English; serial numbers retain leading zeroes. */
export interface ParsedNrc {
  state: string;
  township: string;
  type: "N" | "P";
  number: string;
  language: "en" | "mm";
}

/** Convert to English by default. Throws for invalid NRC input. */
export function convert(input: string, to?: Language): string;
export function toEnglish(input: string): string;
export function toMyanmar(input: string): string;
export function parse(input: unknown): ParsedNrc | null;
/** Checks the bundled reference and format, not the identity or issuance of a card. */
export function isValid(input: unknown): boolean;
/** Returns a new array, or [] for an unknown state. */
export function getTownships(state: string | number, language?: Language): string[];
export function convertNumbers(input: string, from?: Language, to?: Language): string;

/** @deprecated Prefer toEnglish(), toMyanmar(), or convert(). */
export function convertNrc(input: string, from?: Language, to?: Language): string;
/** @deprecated Prefer an explicit output language with toEnglish() or toMyanmar(). */
export function autoConvertNrc(input: string): string;
/** Format check only. Defaults to English; does not validate state/township membership. */
export function detect(input: unknown, language?: Language): boolean;
/** @deprecated Internal utility retained for compatibility. */
export function removeAllSpace(input: string): string;
/** @deprecated Internal utility retained for compatibility. */
export function transform<T extends Record<string, unknown>, K extends keyof T>(source: T[], value: T[K], from: K, to: K): T[K];
