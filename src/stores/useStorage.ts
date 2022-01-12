import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function useStorage<Value>(
  key: string,
  initialValue: Value
): Writable<Value> {
  let serialize = JSON.stringify
  let deserialize = JSON.parse

  let storedValue: Value = deserialize(localStorage.getItem(key))

  let store = writable(storedValue ? storedValue : initialValue)
  store.subscribe((value) => localStorage.setItem(key, serialize(value)))

  return store
}
