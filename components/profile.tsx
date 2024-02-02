import { useSession } from '../hooks/use-session'
import { useRouter } from '../hooks/use-router'

import { P } from './ui/p'
import { Touchable } from './ui/touchable'

export function Profile() {
  const { user } = useSession()
  const { push } = useRouter()

  const name = user ? user.nome?.split(' ')[0] || user.nome : false

  return (
    <Touchable
      onPress={() => push('profile')}
      className="flex-row items-center"
    >
      <P className="text-[13px] font-500 uppercase text-white">
        OLÁ{name ? `, ${name}` : ''}{' '}
      </P>
    </Touchable>
  )
}
