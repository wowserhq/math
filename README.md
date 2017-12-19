# Wowser Math

[![Version](https://img.shields.io/npm/v/wowser-math.svg?style=flat)](https://www.npmjs.org/package/wowser-math)
[![Build Status](https://travis-ci.org/wowserhq/wowser-math.svg?branch=master)](https://travis-ci.org/wowserhq/wowser-math)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7ef6d7ffe594af216f6b/test_coverage)](https://codeclimate.com/github/wowserhq/wowser-math/test_coverage)

A 3D math library for Wowser.

Licensed under the **MIT** license, see LICENSE for more information.

## Usage

To install `wowser-math`:

```sh
npm install wowser-math
```

To use `wowser-math` in an ES2015 module environment:

```js
import { Matrix4 } from 'wowser-math';

const matrix = new Matrix4();

matrix.scaleByNumber(4.0);
```

## Documentation

`wowser-math` ships a complete set of jsdoc documentation.

To build a local copy of the documentation, check out the `wowser-math` repo and run:

```sh
npm run doc
```

A documentation directory will be created at the root level. The documentation can be viewed in a
web browser.

## Compatibility

Wowser Math should work with any browser that has native support for:

* ES2015 Classes
* Generators
* `const` and `let` scoping
* Typed Arrays

Currently, the browser support targets are the latest 2 major versions of Chrome, Firefox, Safari,
and Edge.

Additionally, Node 8.7+ is supported.
