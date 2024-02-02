import { Platform } from 'react-native'

import { useAddress } from '../hooks/use-address'

import { P } from './ui/p'

export function City() {
  const { address } = useAddress()

  return address ? (
    <P className="font-400 -tracking-wide text-xs text-white truncate mt-1">
      <P className="text-[10px] text-zinc-200">Você está em</P>{' '}
      {Platform.OS === 'ios' ? address.city : address.subregion}
    </P>
  ) : null
}
