# csv
> Transforms list of objects into CSV text

[![NPM][csv-icon] ][csv-url]

[![Build status][csv-ci-image] ][csv-ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)
[![standard style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

    npm install --save @bahmutov/csv

## Use

```js
var csv = require('@bahmutov/csv')
// csv is object with 2 methods
```

### Creating CSV from lists

```js
var titles = ['Name', 'Age']
var values = [
    'Joe', 21,
    'Mary', 20
] 
csv.fromLists(titles, values);
/*
Name,Age
Joe,21
Mary,20
*/
```

You can pass maximum number of items as the last argument, returning a list of CSV texts

```js
var titles = ['Name', 'Age']
var values = [
    'Joe', 21,
    'Mary', 20
]
var maxLines = 1
csv.fromLists(titles, values, maxLines);
/*
['Name,Age
Joe,21',
'Name,Age
Mary,20']
*/
```

### Creating CSV from objects

You can select a subset of properties from an object.

```js
var titles = ['Name', 'Age']
var properties = ['name', 'age']
var values = [
    {name: 'Joe', age: 21, sex: 'male' },
    {name: 'Mary', age: 20, sex: 'female' }
] 
csv.fromObjects(titles, properties, values);
/*
Name,Age
Joe,21
Mary,20
*/
```

This method also accepts max number of items in a single CSV, returning a list of strings
in this case

```js
csv.fromObjects(titles, properties, values, 1);
/*
[`Name,Age
Joe,21`,
`Name,Age
Mary,20`]
*/
```

## Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue][issues] on Github

[issues]: https://github.com/bahmutov/csv/issues

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[csv-icon]: https://nodei.co/npm/@bahmutov/csv.png?downloads=true
[csv-url]: https://npmjs.org/package/@bahmutov/csv
[csv-ci-image]: https://travis-ci.org/bahmutov/csv.png?branch=master
[csv-ci-url]: https://travis-ci.org/bahmutov/csv
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
