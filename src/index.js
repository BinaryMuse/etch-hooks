import etch from 'etch'

const initializeHooks = new WeakMap()
const updateHooks = new WeakMap()

const _etchInitialize = etch.initialize.bind(etch)
const _etchUpdate = etch.update.bind(etch)

const generateHookedFunction = (hooks, originalFn, hookRunner) => {
  return (target) => {
    const hook = hooks.get(target)
    const result = originalFn(target)
    if (hook) hookRunner(hook, target, result)
    return result
  }
}

etch.initialize = generateHookedFunction(
  initializeHooks,
  _etchInitialize,
  (hook, target) =>{
    hook.call(target)
  }
)

etch.update = generateHookedFunction(
  updateHooks,
  _etchUpdate,
  (hook, target, result) =>{
    result.then(() => hook.call(target))
  }
)

const hooks = {
  onInitialize: function onInitialize (target, initializeHook) {
    initializeHooks.set(target, initializeHook)
  },

  onUpdate: function onUpdate (target, updateHook) {
    updateHooks.set(target, updateHook)
  }
}

export default hooks
