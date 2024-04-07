import { expect, test } from 'vitest'
import { parseMajorVersion } from './utils'


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
  test(`should parse ${c.input} and get ${c.expected}`, () => {
    expect(parseMajorVersion(c.input)).toBe(c.expected)
  })
}
