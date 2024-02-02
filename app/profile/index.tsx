import { UserCircle } from 'phosphor-react-native'

import { useSession } from '../../hooks/use-session'
import { useRouter } from '../../hooks/use-router'

import { Header } from '../../components/header'

import { P } from '../../components/ui/p'
import { Svg } from '../../components/ui/svg'
import { Touchable } from '../../components/ui/touchable'
import { Div } from '../../components/ui/div'

import { LogOut } from './components/logout'

import { version } from '../../package.json'
import { api } from '../../lib/api'

export default function Profile() {
  const { user } = useSession()
  const { push } = useRouter()

  return (
    <Div className="flex-1">
      <Header.Root>
        <Header.Left>
          <Header.Back />

          <Header.Photo
            alt=""
            source={require('../../assets/black-logo.png')}
          />

          {user ? (
            <Header.Title description={user.email}>{user.nome}</Header.Title>
          ) : null}
        </Header.Left>
      </Header.Root>

      <Touchable
        onPress={async () => await api.remove().then(() => push('sign-up'))}
        className="h-14 max-h-[56px] flex-row items-center space-x-5"
      >
        <P className="font-500 text-xs">
          REMOVER andres.dosantosbritoamaral@gmail.com
        </P>
      </Touchable>

      <Div className="px-5 mt-10">
        <Touchable
          onPress={() => push('change-data')}
          className="h-14 max-h-[56px] flex-row items-center space-x-5"
        >
          <Svg component={UserCircle} size={28} />
          <P className="font-500 text-xs">SEUS DADOS</P>
        </Touchable>

        {/** <ChangeTheme /> */}
      </Div>

      <Div className="absolute bottom-10 mx-auto w-full items-center justify-center">
        <P className="font-400 text-[11px] mb-1.5">
          Pensado e criado por Zaal Tecnologia
        </P>
        <P className="font-400 text-[11px]">Versão {version}</P>
      </Div>

      <LogOut />
    </Div>
  )
}
