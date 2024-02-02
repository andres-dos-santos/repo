import { ArrowClockwise } from 'phosphor-react-native'
import { useToast } from 'react-native-toast-notifications'

import { api } from '../../../../lib/api'

import { P } from '../../../../components/ui/p'
import { Svg } from '../../../../components/ui/svg'
import { Touchable } from '../../../../components/ui/touchable'

type Props = {
  email: string
}

export function RequestNewCode(props: Props) {
  const { show } = useToast()

  async function requestNewCode() {
    await api.get(`usuarios/codigoAticao/${props.email}`).then(() => {
      show('Código reenviado, verifique seu email.')
    })
  }

  return (
    <Touchable
      className="flex-row items-center justify-center space-x-2.5 mt-10"
      onPress={() => requestNewCode()}
    >
      <Svg component={ArrowClockwise} weight="bold" size={18} />
      <P className="font-500 text-[11px]">SOLICITAR NOVO CÓDIGO</P>
    </Touchable>
  )
}
