import { useColorScheme } from 'nativewind'
import { useCallback, useEffect } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import type { ColorSchemeSystem } from 'nativewind/dist/style-sheet/color-scheme'

export function useTheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()

  const [theme, _setTheme] = useMMKVString('@zaalcashback:theme', null)

  const setTheme = useCallback(
    (value?: typeof colorScheme) => {
      _setTheme(value || colorScheme === 'dark' ? 'light' : 'dark')

      // @ts-ignore
      // setColorScheme(theme || value)
    },
    [_setTheme, colorScheme, setColorScheme, theme],
  )

  useEffect(() => {
    !theme && setTheme('light')
  }, [setColorScheme, setTheme, theme])

  return { theme, setTheme, toggleTheme: toggleColorScheme }
}
