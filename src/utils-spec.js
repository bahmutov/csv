const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('ramda utils', () => {
  const R = require('./utils').R

  const double = x => x * 2
  const add3 = x => x + 3

  it('has pipe', () => {
    const pipe = R.pipe(double, add3)
    la(is.fn(pipe), 'expected pipe to return a fn', pipe)

    const result = pipe(5)
    la(result === 13, 'wrong result', result)
  })

  it('respects order', () => {
    const pipe = R.pipe(add3, double)
    la(is.fn(pipe), 'expected pipe to return a fn', pipe)

    const result = pipe(5)
    la(result === 16, 'wrong result', result)
  })
})

describe('check utils', () => {
  const check = require('./utils').is

  it('checks positive numbers', () => {
    la(check.positive(100), '100')
    la(!check.positive(-1), '-1')
    la(!check.positive(0), '0')
  })
})

describe('split list', () => {
  const split = require('./utils').split
  const list = ['foo', 'bar', 'baz']

  it('returns if undefined number', () => {
    const result = split(list)
    la(is.array(result), 'returns a list')
    la(result.length === 1)
    la(result[0] === list)
  })

  it('returns all', () => {
    const result = split(list, 100)
    la(is.array(result), 'returns a list')
    la(result.length === 1)
    la(result[0] === list)
  })

  it('returns individual', () => {
    const result = split(list, 1)
    la(is.array(result), 'returns a list')
    la(result.length === 3)
  })
})
