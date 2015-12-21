(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["csv"] = factory();
	else
		root["csv"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// my own tiny implementations of needed methods
	const is = __webpack_require__(1).is
	const R = __webpack_require__(1).R
	const split = __webpack_require__(1).split

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	      const checkIndex = 2 * k
	      if (checkIndex >= args.length) {
	        return
	      }
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

	function positive (x) {
	  return typeof x === 'number' && x > 0
	}

	function split (list, N) {
	  if (list.length <= N || typeof N === 'undefined') {
	    return [list]
	  }
	  var parts = []
	  var k
	  for (k = 0; k < list.length; k += N) {
	    parts.push(list.slice(k, k + N))
	  }
	  return parts
	}

	module.exports = {
	  is: {
	    defined: defined,
	    defend: defend,
	    arrayOfStrings: arrayOfStrings,
	    arrayOfArrays: arrayOfArrays,
	    array: Array.isArray,
	    positive: positive
	  },
	  R: {
	    pipe: pipe,
	    map: curry2(map),
	    join: curry2(join),
	    pickAll: curry2(pickAll),
	    values: values
	  },
	  split: split
	}


/***/ }
/******/ ])
});
;