export function prettyDate(time) {
  const date = new Date((time || '')
    .replace(/-/g, '/')
    .replace(/[TZ]/g, ''))

  const diff = (((new Date()).getTime() - date.getTime()) / 1000)
  const dayDiff = Math.floor(diff / 86400)

  if (isNaN(dayDiff) || dayDiff < 0) {
    return
  }

  return (
    dayDiff == 0 && (
    diff < 60 && 'just now' ||
    diff < 120 && '1 minute ago' ||
    diff < 3600 && Math.floor( diff / 60 ) + ' minutes ago' ||
    diff < 7200 && '1 hour ago' ||
    diff < 86400 && Math.floor( diff / 3600 ) + ' hours ago') ||
    dayDiff == 1 && 'Yesterday' ||
    dayDiff < 7 && dayDiff + ' days ago' ||
    dayDiff < 31 && Math.ceil( dayDiff / 7 ) + ' weeks ago'
  )
}
