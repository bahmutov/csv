const is = require('check-more-types')
const R = require('ramda')

function fromLists (names, list) {
  var sep = ','
  var sepRegex = new RegExp(sep, 'g')

  var titleLine = names.join(sep)
  var removeSeparator = function (str) {
    return String(str).replace(sepRegex, '')
  }
  var removeUndefined = function (val) {
    return is.defined(val) ? val : ''
  }

  var itemToTextLine = R.pipe(
    R.map(removeUndefined), // turn undefineds into empty strings
    R.map(removeSeparator), // make sure we do not have separator inside the values list
    R.join(sep) // join into single line
  )
  var lines = list.map(itemToTextLine)
  lines.unshift(titleLine)
  return lines.join('\n')
}

function fromObjects (names, properties, objects) {
  var objectToValues = R.pipe(
    R.pickAll(properties), // pick some properties from each objeect
    R.values // take values from picked properties
  )
  var list = objects.map(objectToValues)
  return fromLists(names, list)
}

module.exports = {
  fromLists: is.defend(fromLists,
    is.arrayOfStrings, 'need list of column names for first line',
    is.arrayOfArrays, 'need array of arrays'),

  fromObjects: is.defend(fromObjects,
    is.arrayOfStrings, 'need list of column names for first line',
    is.arrayOfStrings, 'need list of properties to extract from each object',
    is.array, 'need list of objects')
}
