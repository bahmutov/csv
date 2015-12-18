function defined (x) {
  return typeof x !== 'undefined'
}

function toArray () {
  return Array.prototype.slice.call(arguments, 0)
}

function defend (fn) {
  const args = toArray.apply(null, arguments).slice(1)
  return function () {
    const values = toArray.apply(null, arguments)
    values.map((x, k) => {
      if (!args[2 * k](x)) {
        throw new Error(args[2 * k + 1])
      }
    })
    return fn.apply(null, values)
  }
}

function isString (x) {
  return typeof x === 'string'
}

function arrayOfStrings (arr) {
  return Array.isArray(arr) &&
    arr.every(isString)
}

function arrayOfArrays (arr) {
  return Array.isArray(arr) &&
    arr.every(Array.isArray)
}

function pipe () {
  const fns = toArray.apply(null, arguments)
  return function () {
    var result = toArray.apply(null, arguments)
    fns.forEach(fn => {
      result = fn.apply(null, result)
      result = [result]
    })
    return result[0]
  }
}

function curry2 (fn, strict2) {
  return function curried (a) {
    if (strict2 && arguments.length > 2) {
      throw new Error('Curry2 function ' + fn.name +
        ' called with too many arguments ' + arguments.length)
    }
    if (arguments.length === 2) {
      return fn(arguments[0], arguments[1])
    }
    return function second (b) {
      return fn(a, b)
    }
  }
}

function map (cb, items) {
  return items.map(cb)
}

function join (sep, items) {
  return items.join(sep)
}

function pickAll (names, obj) {
  return names.map(key => obj[key])
}

function values (obj) {
  return pickAll(Object.keys(obj), obj)
}

module.exports = {
  is: {
    defined: defined,
    defend: defend,
    arrayOfStrings: arrayOfStrings,
    arrayOfArrays: arrayOfArrays,
    array: Array.isArray
  },
  R: {
    pipe: pipe,
    map: curry2(map),
    join: curry2(join),
    pickAll: curry2(pickAll),
    values: values
  }
}
