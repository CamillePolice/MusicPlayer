import { describe, it, expect } from 'vitest'
import { formatTime } from '@/utils/date.util'

describe('formatTime', () => {
  it('should format seconds into mm:ss', () => {
    expect(formatTime(0)).toBe('0:00') // 0 seconds
    expect(formatTime(59)).toBe('0:59') // Less than a minute
    expect(formatTime(60)).toBe('1:00') // Exactly 1 minute
    expect(formatTime(75)).toBe('1:15') // 1 minute and 15 seconds
    expect(formatTime(3600)).toBe('60:00') // 1 hour
    expect(formatTime(3661)).toBe('61:01') // 1 hour, 1 minute, 1 second
  })

  it('should handle large numbers correctly', () => {
    expect(formatTime(86400)).toBe('1440:00') // 1 day in seconds
  })

  it('should pad single-digit seconds with a leading zero', () => {
    expect(formatTime(61)).toBe('1:01')
    expect(formatTime(122)).toBe('2:02')
  })
})
