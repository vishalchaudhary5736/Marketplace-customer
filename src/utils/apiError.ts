export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong. Please try again.') {
  if (typeof err === 'object' && err !== null && 'data' in err) {
    const data = (err as { data?: { message?: string | string[] } }).data
    if (Array.isArray(data?.message)) return data.message[0]
    if (typeof data?.message === 'string') return data.message
  }
  if (typeof err === 'object' && err !== null && 'error' in err) {
    return 'Cannot reach the server. Check your connection.'
  }
  return fallback
}