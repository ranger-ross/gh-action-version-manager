import { describe, expect, it } from 'vitest'
import { isMajorVersion, parseMajorVersion } from './utils'

describe('parseMajorVersion', () => {
  const CASES = [
    { input: 'v0.0.0', expected: 0 },
    { input: 'v0.1.0', expected: 0 },
    { input: 'v1.0.0', expected: 1 },
    { input: 'v1.1.0', expected: 1 },
    { input: 'v1.9.0', expected: 1 },
    { input: 'v1.9.1', expected: 1 },
    { input: 'v1.9.9', expected: 1 },
    { input: 'v2.4.0', expected: 2 },
    { input: 'v2.4.99', expected: 2 },
    { input: 'v2.0.0', expected: 2 },
    { input: 'v9.0.0', expected: 9 },
    { input: 'v10.0.0', expected: 10 },
    { input: 'v10.2.0', expected: 10 },
    { input: 'v10.9.0', expected: 10 },
    { input: 'v10.0.1', expected: 10 },
    { input: 'v11.0.0', expected: 11 },
    { input: 'v100.0.0', expected: 100 },
    { input: 'v100.0.0', expected: 100 },
  ]
  
  
  for (const c of CASES) {
    it(`should parse ${c.input} and get ${c.expected}`, () => {
      expect(parseMajorVersion(c.input)).toBe(c.expected)
    })
  }
})

describe('isMajorVersion', () => {
  it('should return true for valid major version strings starting with "v"', () => {
    expect(isMajorVersion('v1')).toBe(true);
    expect(isMajorVersion('v10')).toBe(true);
    expect(isMajorVersion('v100')).toBe(true);
  });

  it('should return true for valid major version strings without "v"', () => {
    expect(isMajorVersion('1')).toBe(true);
    expect(isMajorVersion('10')).toBe(true);
    expect(isMajorVersion('100')).toBe(true);
  });

  it('should return false for invalid version strings', () => {
    expect(isMajorVersion('')).toBe(false);
    expect(isMajorVersion('v')).toBe(false);
    expect(isMajorVersion('v1a')).toBe(false);
    expect(isMajorVersion('v1.0')).toBe(false);
    expect(isMajorVersion('v1.0.0')).toBe(false);
    expect(isMajorVersion('v1beta')).toBe(false);
    expect(isMajorVersion('v1.0.0-alpha')).toBe(false);
    expect(isMajorVersion('abc')).toBe(false);
    expect(isMajorVersion('vabc')).toBe(false);
    expect(isMajorVersion('1abc')).toBe(false);
    expect(isMajorVersion('1.0abc')).toBe(false);
  });
});
