const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('csv utils', () => {
  const csv = require('./csv')

  describe('from lists', () => {
    it('is a function', () => {
      la(is.fn(csv.fromLists))
    })

    it('returns CSV text', () => {
      const item = ['foo', 'bar', 'baz']
      const titles = ['col 1', 'col 2', 'col 3']
      const txt = csv.fromLists(titles, [item])
      la(is.unemptyString(txt), txt)
      la(/col\ 1/.test(txt))
      la(/col\ 2/.test(txt))
      la(/foo/.test(txt))
      la(/bar/.test(txt))
      la(/baz/.test(txt))
    })

    it('can handle numbers', () => {
      const item = ['foo', 'bar', 42]
      const titles = ['col 1', 'col 2', 'col 3']
      const txt = csv.fromLists(titles, [item])
      la(is.unemptyString(txt))
      la(/42/.test(txt))
    })
  })

  describe('from objects', () => {
    it('has to csv function', () => {
      la(is.fn(csv.fromObjects))
    })

    it('raises exception without objects', () => {
      function withoutObjects () {
        csv.fromObjects(['column 1', 'column 2'], ['foo', 'bar'])
      }
      la(is.raises(withoutObjects))
    })

    it('returns CSV text', function () {
      var list = [{
        foo: 'foo',
        bar: 'bar'
      }]
      var txt = csv.fromObjects(['column 1', 'column 2'], ['foo', 'bar'], list)
      la(is.unemptyString(txt))
      la(/column\ 1/.test(txt))
      la(/column\ 2/.test(txt))
      la(/foo/.test(txt))
      la(/bar/.test(txt))
    })

    it('strips commas from the text', () => {
      var list = [{
        foo: 'foo,foo',
        bar: 'bar,bar,bar'
      }]
      var txt = csv.fromObjects(['column 1', 'column 2'], ['foo', 'bar'], list)
      la(/foofoo/.test(txt))
      la(/barbarbar/.test(txt))
    })
  })
})
