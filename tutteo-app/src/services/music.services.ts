import type { Music } from '@/types/music.types'

export const getMusics = async (): Promise<Music[]> => {
  const musicFiles = import.meta.glob('@/assets/musics/*')
  const coverFiles = import.meta.glob('@/assets/covers/*')

  // Utility to process paths
  const processPaths = (paths: Record<string, any>): Record<string, string> => {
    return Object.entries(paths).reduce<Record<string, string>>((result, [fullPath]) => {
      const filename = fullPath.substring(fullPath.lastIndexOf('/') + 1, fullPath.lastIndexOf('.'))
      result[filename] = fullPath
      return result
    }, {})
  }

  const musicPaths = processPaths(musicFiles)
  const coverPaths = processPaths(coverFiles)

  const musicList: Music[] = Object.entries(musicPaths).map(([filename, musicPath]) => {
    const match = filename.match(/(.+)\s-\s(.+)/)
    const songName = match?.[1]?.trim() || 'Unknown'
    const artist = match?.[2]?.trim() || 'Unknown'
    const coverPath = coverPaths[songName] || ''

    return {
      coverPath,
      musicPath,
      artist,
      songName,
    }
  })

  return musicList
}
