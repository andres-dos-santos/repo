import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { white } from 'tailwindcss/colors'
import { Platform } from 'react-native'

import { useSession } from '../hooks/use-session'

import { Home } from '../app/home'
import { Notifications } from '../app/notifications'
import { Historic } from '../app/historic'
import Profile from '../app/profile'

import { SignIn } from '../app/authetication/sign-in'
import { SignUp } from '../app/authetication/sign-up'
import { Verify } from '../app/authetication/verify'
import { Location } from '../app/location'
import { Details } from '../app/details'
import { Search } from '../app/search'
import { ChangeData } from '../app/profile/components/change-data'

const Stack = createNativeStackNavigator()

export function Main() {
  const { initialRouteName } = useSession()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: white,
          paddingTop: Platform.OS === 'ios' ? 60 : 30,
        },
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="sign-in" component={SignIn} />
      <Stack.Screen name="sign-up" component={SignUp} />

      <Stack.Screen name="location" component={Location} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="historic" component={Historic} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="verify" component={Verify} />
      <Stack.Screen name="details" component={Details} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="change-data" component={ChangeData} />
    </Stack.Navigator>
  )
}
