import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Player from '@/components/Player.vue'

vi.mock('howler')

const mockSongs = [
  { songName: 'Song 1', artist: 'Artist 1', musicPath: '/song1.mp3', coverPath: '/cover1.jpg' },
  { songName: 'Song 2', artist: 'Artist 2', musicPath: '/song2.mp3', coverPath: '/cover2.jpg' },
]

describe('Player.vue', () => {
  it('renders correctly with selected songs', () => {
    const wrapper = mount(Player, {
      props: {
        selectedSongs: mockSongs,
      },
    })

    expect(wrapper.find('h1').text()).toContain('Song 1')
    expect(wrapper.find('p').text()).toContain('Artist 1')
    expect(wrapper.find('img').attributes('src')).toBe('/cover1.jpg')
  })

  it('displays "No Song Selected" when no songs are provided', () => {
    const wrapper = mount(Player, {
      props: {
        selectedSongs: [],
      },
    })

    expect(wrapper.find('h1').text()).toBe('No Song Selected')
  })
})
