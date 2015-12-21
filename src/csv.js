// my own tiny implementations of needed methods
const is = require('./utils').is
const R = require('./utils').R
const split = require('./utils').split

function removeUndefined (val) {
  return is.defined(val) ? val : ''
}

function fromLists (names, list, maxItemsPerCSV) {
  var sep = ','
  var sepRegex = new RegExp(sep, 'g')

  var titleLine = names.join(sep)
  var removeSeparator = function (str) {
    return String(str).replace(sepRegex, '')
  }

  var itemToTextLine = R.pipe(
    R.map(removeUndefined), // turn undefineds into empty strings
    R.map(removeSeparator), // make sure we do not have separator inside the values list
    R.join(sep) // join into single line
  )

  var lines = list.map(itemToTextLine)

  if (is.positive(maxItemsPerCSV)) {
    var parts = split(lines, maxItemsPerCSV)
    return parts.map(function (part) {
      part.unshift(titleLine)
      return part.join('\n')
    })
  } else {
    lines.unshift(titleLine)
    return lines.join('\n')
  }
}

function fromObjects (names, properties, objects, maxItemsPerCSV) {
  var objectToValues = R.pipe(
    R.pickAll(properties), // pick some properties from each objeect
    R.values // take values from picked properties
  )
  var list = objects.map(objectToValues)
  return fromLists(names, list, maxItemsPerCSV)
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
