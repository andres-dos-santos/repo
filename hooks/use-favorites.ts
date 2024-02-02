import { useCallback } from 'react'
import { useMMKVObject } from 'react-native-mmkv'

interface Favorite {
  id: number
  image: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>(
    '@zaalcashback:favorites',
    null,
  )

  const addFavorite = useCallback(
    (favorite: Favorite) => {
      const data = favorites || []

      const favoriteWithSameId = favorites?.find(
        (item) => item.id === favorite.id,
      )

      if (favoriteWithSameId) {
        setFavorites([
          ...data.filter((item) => item.id !== favoriteWithSameId.id),
        ])
      } else {
        setFavorites([...data, favorite])
      }
    },
    [favorites, setFavorites],
  )

  return { favorites: favorites || [], addFavorite } as const
}
