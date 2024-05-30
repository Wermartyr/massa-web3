import { Args } from '../../../src/basicElements/args'
import {
  U8,
  U16,
  U32,
  U64,
  I128_MAX,
  I128_MIN,
  U128_MAX,
  U256_MAX,
  boolToByte,
  byteToBool,
  bytesToF32,
  bytesToF64,
  bytesToI128,
  bytesToI16,
  bytesToI32,
  bytesToI64,
  bytesToStr,
  bytesToU128,
  bytesToU256,
  f32ToBytes,
  f64ToBytes,
  i128ToBytes,
  i16ToBytes,
  i32ToBytes,
  i64ToBytes,
  strToBytes,
  u128ToBytes,
  u256ToBytes,
} from '../../../src/basicElements/serializers'

describe('Serialization tests', () => {
  it('ser/deser with emojis', () => {
    const str = 'Hello world 🙂'
    expect(bytesToStr(strToBytes(str))).toEqual(str)
  })
  it('ser/deser Ascii', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    expect(bytesToStr(strToBytes(str))).toEqual(str)
  })
  it('ser/deser utf16 char', () => {
    const str = String.fromCharCode(0xd83d, 0xde42)
    expect(bytesToStr(strToBytes(str))).toEqual('🙂')
  })
  it('ser/deser bool', () => {
    let val = false
    expect(byteToBool(boolToByte(val))).toEqual(val)
    val = true
    expect(byteToBool(boolToByte(val))).toEqual(val)
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u8', () => {
    const val = 123
    expect(U8.fromBytes(U8.toBytes(U8.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('throws an error when trying to serialize a negative Uint8 value', () => {
    const negativeValue = -1n
    const args = new Args()

    expect(() => args.addU8(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a Uint8 value greater than 255', () => {
    const largeValue = 256n
    const args = new Args()

    expect(() => args.addU8(largeValue)).toThrow(
      `value ${largeValue} is too large for an U8.`
    )
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u16', () => {
    const val = 123
    expect(U16.fromBytes(U16.toBytes(U16.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('ser/deser i16', () => {
    const val = 123
    expect(bytesToI16(i16ToBytes(val))).toEqual(val)
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u32', () => {
    const val = 666
    expect(U32.fromBytes(U32.toBytes(U32.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('throws an error when trying to serialize a negative u32 value', () => {
    const negativeValue = -1n
    const args = new Args()

    expect(() => args.addU32(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a Uint32 value greater than 4294967295', () => {
    const largeValue = 4294967296n
    const args = new Args()

    expect(() => args.addU32(largeValue)).toThrow(
      `value ${largeValue} is too large for an U32.`
    )
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u64', () => {
    const val = BigInt(666)
    expect(U64.fromBytes(U64.toBytes(U64.fromNumber(val)))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u64 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU64(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a u64 value greater than 18446744073709551615', () => {
    const largeValue = BigInt('18446744073709551616')
    const args = new Args()

    expect(() => args.addU64(largeValue)).toThrow(
      `value ${largeValue} is too large for an U64.`
    )
  })
  it('ser/deser i128', () => {
    const val = -123456789123456789n
    expect(bytesToI128(i128ToBytes(val))).toEqual(val)
  })
  it('ser/deser i128', () => {
    const val = I128_MAX
    expect(bytesToI128(i128ToBytes(val))).toEqual(val)
  })
  it('ser/deser i128', () => {
    const val = I128_MIN
    expect(bytesToI128(i128ToBytes(val))).toEqual(val)
  })
  it('ser/deser u128', () => {
    const val = 123456789123456789n
    expect(bytesToU128(u128ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u128 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU128(negativeValue)).toThrow(
      `Unable to serialize invalid Uint128 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a u128 value greater than U128_MAX', () => {
    const largeValue = U128_MAX + 1n
    const args = new Args()

    expect(() => args.addU128(largeValue)).toThrow(
      `Unable to serialize invalid Uint128 value ${largeValue}`
    )
  })
  it('ser/deser u256', () => {
    const val = 123456789012345678901234567890n
    expect(bytesToU256(u256ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u256 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU256(negativeValue)).toThrow(
      `Unable to serialize invalid Uint256 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a u256 value greater than U256_MAX', () => {
    const largeValue = U256_MAX + 1n
    const args = new Args()

    expect(() => args.addU256(largeValue)).toThrow(
      `Unable to serialize invalid Uint256 value ${largeValue}`
    )
  })
  it('ser/deser i32', () => {
    const val = -666
    expect(bytesToI32(i32ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize an invalid int32 value', () => {
    const invalidValue = Math.pow(2, 31)
    const args = new Args()

    expect(() => args.addI32(invalidValue)).toThrow(
      `Unable to serialize invalid int32 value ${invalidValue}`
    )
  })
  it('ser/deser i64', () => {
    const val = BigInt(-666)
    expect(bytesToI64(i64ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize an invalid int64 value', () => {
    const invalidValue = BigInt('9223372036854775808')
    const args = new Args()

    expect(() => args.addI64(invalidValue)).toThrow(
      `Unable to serialize invalid int64 value ${invalidValue.toString()}`
    )
  })
  it('ser/deser f32', () => {
    const val = -666.666
    expect(bytesToF32(f32ToBytes(val))).toBeCloseTo(val, 0.001)
  })
  it('ser/deser f64', () => {
    const val = -666.666
    expect(bytesToF64(f64ToBytes(val))).toEqual(val)
  })
  it('ser/deser f64 max val', () => {
    const val = Number.MAX_VALUE
    expect(bytesToF64(f64ToBytes(val))).toEqual(val)
  })
  it('ser/deser empty string', () => {
    const str = ''
    expect(bytesToStr(strToBytes(str))).toEqual(str)
  })
  it('ser/deser empty Uint8Array', () => {
    const arr = new Uint8Array(0)
    expect(bytesToStr(arr)).toEqual('')
  })
})