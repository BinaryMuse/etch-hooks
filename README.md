# etch-hooks

etch-hooks is a library to facilitate hooking into the [Etch](https://github.com/nathansobo/etch) component lifecycle.

**NOTE**: This library is deprecated since Etch 0.6.0+ has built-in hook support.

### Overview

It can be useful to hook into the Etch component lifecycle. etch-hooks allows you to hook into either (or both) of the `etch.initialize` and `etch.update` methods:

```javascript
import hooks from 'etch-hooks'

class MyComponent {
  constructor () {
    hooks.onInitialize(this, this.onUpdate)
    hooks.onUpdate(this, this.onUpdate)

    etch.initialize(this)
    // the `onInitialize` hook runs here
  }

  async update (props, children) {
    // ...
    await etch.update(this)
    // the `onUpdate` hook runs here;
    // remember that `etch.update` is asynchronous and returns a promise
  }

  onUpdate () {
    console.log("I've been rendered!")
  }

  render () {
    // ...
  }
}
```
