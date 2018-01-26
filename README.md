# Wowser Math

[![Join chat](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat)](https://gitter.im/wowserhq/wowser)
[![Version](https://img.shields.io/npm/v/@wowserhq/math.svg?style=flat)](https://www.npmjs.org/package/@wowserhq/math)
[![Build Status](https://travis-ci.org/wowserhq/math.svg?branch=master)](https://travis-ci.org/wowserhq/math)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3be158e295dbdc73b17e/test_coverage)](https://codeclimate.com/github/wowserhq/math/test_coverage)

A 3D math library for Wowser.

Licensed under the **MIT** license, see LICENSE for more information.

## Usage

To install Wowser Math:

```sh
npm install @wowserhq/math
```

To use Wowser Math in an ES2015 module environment:

```js
import { Matrix4 } from '@wowserhq/math';

const matrix = new Matrix4();

matrix.scaleByNumber(4.0);
```

## Documentation

Wowser Math ships a complete set of jsdoc documentation.

To build a local copy of the documentation, check out the repo and run:

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
