import { StatusBar } from 'expo-status-bar'
import { Image, SafeAreaView } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { ToastProvider } from 'react-native-toast-notifications'

import { useFonts } from './hooks/use-fonts'

import { SessionProvider } from './contexts/session'

import { Div } from './components/ui/div'
import { Spinner } from './components/ui/spinner'

import { Main } from './routes/main'
import { white } from 'tailwindcss/colors'

const client = new QueryClient()

export default function App() {
  const fontsLoaded = useFonts()

  if (!fontsLoaded) {
    return (
      <Div className="bg-red-550 flex-1 items-center justify-center">
        <StatusBar style="light" />

        <Image
          source={require('./assets/cashback-logo.png')}
          alt=""
          className="max-w-[100px] max-h-[100px]"
        />

        <Spinner size={18} className="absolute bottom-36" />
      </Div>
    )
  }

  return (
    <>
      <StatusBar backgroundColor={white} style="dark" />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={client}>
          <SafeAreaView className="flex-1 bg-white">
            <NavigationContainer>
              <ToastProvider>
                <SessionProvider>
                  <Main />
                </SessionProvider>
              </ToastProvider>
            </NavigationContainer>
          </SafeAreaView>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  )
}
