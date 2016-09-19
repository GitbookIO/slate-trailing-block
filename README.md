# slate-trailing-block

[![NPM version](https://badge.fury.io/js/slate-trailing-block.svg)](http://badge.fury.io/js/slate-trailing-block)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-trailing-block.png?branch=master)](https://travis-ci.org/GitbookIO/slate-trailing-block)

Slate plugin to ensure a trailing block.

### Install

```
npm install slate-trailing-block
```

### Simple Usage

```js
import TrailingBlock from 'slate-trailing-block'

const plugins = [
  TrailingBlock({ type: 'paragraph' })
]
```

#### Arguments

This plugin accepts options to redefine the following block types:

- ``[type: String]`` — type for the trailing block

### Utilities

`slate-trailing-block` exports utilities and transforms:

#### `transforms.focusAtEnd`

`plugin.transforms.focusAtEnd(transform: Transform) => Transform`

Focus at the end of the last block.
