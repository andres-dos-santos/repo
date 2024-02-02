import { useMMKVObject } from 'react-native-mmkv'

export function useSearched() {
  const [searched, _setSearched] = useMMKVObject<string[]>(
    '@zaalcashback:searched',
    null,
  )

  function removeSearched(value: string) {
    _setSearched(searched.filter((item) => item !== value))
  }

  function setSearched(value: string) {
    if (searched && searched.length > 0) {
      if (!searched.find((item) => item === value)) {
        if (searched.length === 20) {
          const first = searched[0]

          const permanents = searched.filter((item) => item !== first)

          _setSearched([...permanents, value])
        } else {
          _setSearched(searched.length > 0 ? [...searched, value] : [value])
        }
      }
    } else {
      _setSearched([value])
    }
  }

  return { searched: searched || [], setSearched, removeSearched } as const
}
