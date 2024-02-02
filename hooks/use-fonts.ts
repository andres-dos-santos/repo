import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useGoogleFonts,
} from '@expo-google-fonts/inter'
import { Roboto_700Bold } from '@expo-google-fonts/roboto'

export function useFonts() {
  const [fontsLoaded] = useGoogleFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Roboto_700Bold,
  })

  return fontsLoaded
}
