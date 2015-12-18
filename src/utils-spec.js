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
