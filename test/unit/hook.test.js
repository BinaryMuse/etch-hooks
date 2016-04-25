/** @jsx etch.dom */

import etch from 'etch'

import hooks from '../../src/index'

// hook(etch)

describe('onInitialize', () => {
  it('runs hooks when a component initializes', () => {
    const actions = []

    class Component {
      constructor () {
        hooks.onInitialize(this, this.onInitialize)
        actions.push('init pre')
        etch.initialize(this)
        actions.push('init post')
      }

      onInitialize () {
        actions.push('init hook')
      }

      update () {}

      render() { return <div /> }
    }

    const comp = new Component()
    expect(actions).to.eql(['init pre', 'init hook', 'init post'])
  })
})

describe('onUpdate', () => {
  it('runs hooks when a component updates', async () => {
    const actions = []

    class Component {
      constructor () {
        hooks.onUpdate(this, this.onUpdate)
        etch.initialize(this)
      }

      onUpdate () {
        actions.push('update hook')
      }

      async update () {
        actions.push('update pre')
        await etch.update(this)
        actions.push('update post')
      }

      render() { return <div /> }
    }

    const comp = new Component()
    expect(actions).to.eql([])
    await comp.update()
    expect(actions).to.eql(['update pre', 'update hook', 'update post'])
    await comp.update()
    expect(actions).to.eql(['update pre', 'update hook', 'update post', 'update pre', 'update hook', 'update post'])
  })
})
