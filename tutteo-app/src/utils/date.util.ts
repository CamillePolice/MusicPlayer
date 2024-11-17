/**
 * Format the number of seconds to hh:mm
 *
 * @param secs
 * @returns
 */
export const formatTime = (secs: number) => {
  const minutes = Math.floor(secs / 60)
  const seconds = Math.floor(secs % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
