/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react'
import * as Location from 'expo-location'
import { useToast } from 'react-native-toast-notifications'
import { Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { useAddress } from './use-address'

export function useLoadLocation() {
  const toast = useToast()

  const { setAddress } = useAddress()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      async function loadPermissionsAndLocation() {
        setLoading(true)

        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          setError(
            `você precisa clicar abaixo para permitir usar o local do seu ${
              Platform.OS === 'ios' ? 'iPhone' : 'Android'
            }`,
          )

          setLoading(false)

          toast.show('Siga as intruções para ligar o local.')

          setAddress(null)

          return
        }

        const { coords } = await Location.getCurrentPositionAsync({})

        const address = await Location.reverseGeocodeAsync(coords)

        setAddress(address[0])

        setLoading(false)
      }

      loadPermissionsAndLocation()

      return () => {
        isActive = false
      }
    }, [setAddress, toast]),
  )

  return { error, loading }
}
