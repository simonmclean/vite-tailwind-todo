import { format } from 'date-fns'

export function formatDate(d: Date) {
  return format(d, 'do LLL yyy')
}
