import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useGoogleFonts,
} from '@expo-google-fonts/inter'

export function useFonts() {
  const [fontsLoaded] = useGoogleFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  return fontsLoaded
}
