import { StringDecoder } from 'string_decoder';
import { Buffer } from 'buffer';

/**
 * Converts utf-16 string to a Uint8Array.
 *
 * @param str - the string to convert
 *
 * @returns the converted string
 */
export function strToBytes(str: string): Uint8Array {
  if (!str.length) {
    return new Uint8Array(0);
  }
  return new Uint8Array(Buffer.from(str, 'utf-8'));
}

/**
 * Converts Uint8Array to a string.
 *
 * @param arr - the array to convert
 *
 * @returns the converted array
 */
export function bytesToStr(arr: Uint8Array): string {
  if (!arr.length) {
    return '';
  }
  return new StringDecoder('utf8').write(Buffer.from(arr));
}
