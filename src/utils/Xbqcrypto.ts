/* eslint-disable @typescript-eslint/no-var-requires */
import * as varint from 'varint';
import { blake3 } from '@noble/hashes/blake3';

/**
 * A collection of utility functions for working with various data encoding and hashing formats.
 *
 * This module provides several functions for encoding and decoding data in various formats, including
 * `base58`, `varint`, and `blake3 hashes`.
 *
 * @module Xbqcrypto.ts
 */

import { signedBigIntUtils, unsignedBigIntUtils } from './encode_decode_int';
import { encode, decode } from '@web3pack/base58-check';

/**
 * Hashes data with blake3
 *
 * @param data - The data to hash
 * @returns The hash of the data with blake3
 */
export function hashBlake3(data: Uint8Array | string): Uint8Array {
  return blake3(data);
}

/**
 * Encodes a buffer or an Uint8Array to base58
 *
 * @param data - The data to encode
 * @returns The base58 encoded data as a string
 */
export function base58Encode(data: Buffer | Uint8Array): string {
  const bufData = Buffer.from(data);
  return encode(bufData);
}

/**
 * Decode a base58 encoded string to a buffer
 *
 * @param data - The base58 encoded string
 * @returns The decoded buffer
 */
export function base58Decode(data: string): Buffer {
  const decoded = decode(data);
  return decoded;
}

/**
 * Encodes a number or bigint to a varint encoded Uint8Array.
 *
 * @param data - The data to encode
 * @returns The varint encoded data as a Uint8Array
 */
export function varintEncode(data: number | bigint): Uint8Array {
  if (typeof data === 'bigint') {
    return unsignedBigIntUtils.encode(data as bigint);
  }
  return varint.encode(data);
}

/**
 * Decodes a varint encoded Uint8Array to a number
 *
 * @param data
 * @returns The decoded number
 */
export function varintDecode(data: Uint8Array): number {
  return varint.decode(data);
}
