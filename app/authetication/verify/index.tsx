import { ArrowClockwise, Backspace } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView } from 'react-native'

import { useSession } from '../../../hooks/use-session'

import { P } from '../../../components/ui/p'
import { Touchable } from '../../../components/ui/touchable'
import { Svg } from '../../../components/ui/svg'
import { Div } from '../../../components/ui/div'
import { RequestNewCode } from './components/request-new-code'

const KEYBOARD_DATA = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '',
  '0',
  'backspace',
]

type Props = {
  route: { params: { email: string } }
}

export function Verify(props: Props) {
  const { user, checkEmail } = useSession()

  const email = (user && user.email) || props.route.params.email

  const [first, second] = email.split('@')

  const [code, setCode] = useState<string[]>([])

  function handleRemoveLastCode() {
    setCode((prev) => prev.slice(0, -1))
  }

  useEffect(() => {
    if (code.length === 6) {
      checkEmail(code, email)
    }
  }, [checkEmail, code, email])

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 50,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Div className="px-10 pt-14">
        <Div className="flex-row items-center justify-between">
          <Div className="flex-row items-center space-x-5">
            <Image
              source={require('../../../assets/cashback-logo.png')}
              alt=""
              className="w-[50px] h-[50px]"
            />

            <P className="font-500 tracking-widest text-[13px]">
              ZAAL CASHBACK
            </P>
          </Div>
        </Div>

        <P className="text-sm text-zinc-600 font-400 mt-10">
          Informe o código de 6 dígitos enviado para o e-mail{' '}
          <P className="font-500">
            {first.substring(0, 3)}...@{second}
          </P>
        </P>

        <P className="font-300 -tracking-widest text-[38px] leading-[50px] mt-10 mb-5">
          verifique seu código
        </P>

        <Div className="h-[60px] w-full bg-zinc-100 items-center justify-center my-10">
          <P className="font-500 tracking-[5px]">{code}</P>
        </Div>

        <FlatList
          contentContainerStyle={{ rowGap: 5, columnGap: 5 }}
          data={KEYBOARD_DATA}
          numColumns={3}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Touchable
              disabled={item === '' || code.length === 6}
              onPress={() =>
                item === 'backspace'
                  ? handleRemoveLastCode()
                  : setCode((prev) => [...prev, item])
              }
              className="h-[60px] flex-1 bg-zinc-100 items-center justify-center"
            >
              {item === 'backspace' ? (
                <Svg component={Backspace} size={20} />
              ) : (
                <P className="text-[15px] font-500">{item}</P>
              )}
            </Touchable>
          )}
        />

        <RequestNewCode email={email} />
      </Div>
    </ScrollView>
  )
}
