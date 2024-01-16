import { format } from "date-fns";

export function formatDate(d: Date) {
  return format(d, "do LLL yyy");
}

export function insertAtIndex<A>(value: A, index: number, arr: A[]): A[] {
  return [
    ...arr.slice(0, index),
    value,
    ...arr.slice(index)
  ]
}

export function append<A>(value: A, arr: A[]): A[] {
  return [...arr, value]
}

export function prepend<A>(value: A, arr: A[]): A[] {
  return [value, ...arr]
}
