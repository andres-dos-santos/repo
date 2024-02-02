import { useMMKVObject } from 'react-native-mmkv'
import * as Location from 'expo-location'

interface Address
  extends Partial<Omit<Location.LocationGeocodedAddress, 'city' | 'region'>> {
  city: string
  region: string
}

export function useAddress() {
  const [address, setAddress] = useMMKVObject<Address | null>('location')

  return { address, setAddress } as const
}
