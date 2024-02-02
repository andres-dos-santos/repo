import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

type StackNavigation = {
  home: undefined
  notifications: undefined
  historic: undefined
  'sign-in': undefined
  'sign-up': undefined
  profile: undefined
  location: undefined
  search: undefined
  'change-data': undefined
  verify: { email: string }
  details: { branchId: number; branchName: string; branchLocale: string }
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>
