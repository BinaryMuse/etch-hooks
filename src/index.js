const hookedEtches = new WeakSet()

export default function hookEtch (etch) {
  // only hook each etch once
  if (hookedEtches.has(etch)) {
    return etch
  }

  hookedEtches.add(etch)

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

  export function onInitialize (target, initializeHook) {
    initializeHooks.set(target, initializeHook)
  },

  export function onUpdate (target, updateHook) {
    updateHooks.set(target, updateHook)
  }

  return etch
}
