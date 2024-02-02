import { useQuery } from '@tanstack/react-query'
import { useMMKVString } from 'react-native-mmkv'

import { api } from '../lib/api'

export function useFetch<D>(key: string, url: string) {
  const [jwt] = useMMKVString('@zaalcashback:jwt')

  const { data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: async () => await api.get(url, jwt),
  })

  return { data: data as D, isLoading, error }
}
