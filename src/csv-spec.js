const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('csv utils', () => {
  const csv = require('./csv')

  describe('from lists', () => {
    it('is a function', () => {
      la(is.fn(csv.fromLists))
    })

    describe('splits data', () => {
      const items = [
        ['joe', 21],
        ['mary', 20]
      ]
      const titles = ['name', 'age']

      it('can generate single csv', () => {
        const txt = csv.fromLists(titles, items)
        la(is.unemptyString(txt), txt)
      })

      it('can generate separate CSVs with 1 item', () => {
        const csvs = csv.fromLists(titles, items, 1)
        la(is.array(csvs), 'generated list of csvs', csvs)
        la(csvs.length === 2, '2 csv files', csvs)

        la(csvs[0].indexOf('name') !== -1, 'first CSV has title name')
        la(csvs[1].indexOf('name') !== -1, 'second CSV has title name')

        la(csvs[0].indexOf('joe') !== -1, 'first CSV has joe')
        la(csvs[1].indexOf('joe') === -1, 'second CSV has NO joe')

        la(csvs[0].indexOf('mary') === -1, 'first CSV has NO mary')
        la(csvs[1].indexOf('mary') !== -1, 'second CSV has mary')
      })
    })

    it('removes commas', () => {
      const item = ['foo,bar']
      const titles = ['column 1']
      const txt = csv.fromLists(titles, [item])
      la(is.unemptyString(txt), txt)
      la(txt.indexOf('foo,bar') === -1, 'removed comma', txt)
      la(txt.indexOf('foo') !== -1, 'has foo', txt)
      la(txt.indexOf('bar') !== -1, 'has bar', txt)
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
