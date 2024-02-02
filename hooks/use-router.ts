import { useNavigation } from '@react-navigation/native'

import type { StackTypes } from '../types/routes'

export function useRouter() {
  const naigation = useNavigation<StackTypes>()

  return {
    back: naigation.goBack,
    push: naigation.navigate,
  }
}
