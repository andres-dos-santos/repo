import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useCallback, useState } from 'react'
import { X } from 'phosphor-react-native'

import { useRouter } from '../../../hooks/use-router'

import { P } from '../../../components/ui/p'
import { Touchable } from '../../../components/ui/touchable'
import { Button } from '../../../components/ui/button'
import { Div } from '../../../components/ui/div'

import { SignUpWithEmail } from './components/sign-up-with-email'

type LoginMethod = 'email' | 'google' | 'apple'

const METHOD = {
  email: <SignUpWithEmail />,
}

export function SignUp() {
  const { push } = useRouter()

  const [loginMethod, setLoginMethod] = useState<LoginMethod | null>('email')

  const handleSelectLoginMethod = useCallback((method: LoginMethod | null) => {
    setLoginMethod(method)
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Div className="px-10 pt-14 flex-1 relative">
          <Div className="flex-row items-center justify-between ">
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

          {loginMethod ? (
            <>
              <TouchableOpacity
                className="absolute right-0 -top-[200px] flex-row items-center my-10 space-x-2.5"
                onPress={() => handleSelectLoginMethod(null)}
              >
                <P className="font-500 text-[13px]">FECHAR</P>
                <View className="border border-zinc-200 rounded-full h-10 w-10 items-center justify-center">
                  <X size={14} weight="bold" />
                </View>
              </TouchableOpacity>

              {METHOD[loginMethod]}

              <Touchable className="mt-10" onPress={() => push('sign-in')}>
                <P className="font-400 text-sm text-center text-zinc-500 -tracking-wide">
                  Já possui uma conta? <P>Clique aqui.</P>
                </P>
              </Touchable>
            </>
          ) : (
            <>
              <P className="font-300 -tracking-widest text-[38px] leading-[50px] mt-10">
                receba os melhores cashbacks das lojas da sua cidade
              </P>

              {/** <Button.Root className="bg-[#ff4343] border-red-400 mb-2.5 mt-10">
                <Button.Title className="text-zinc-900 dark:text-white">
                  Continuar com Google
                </Button.Title>
              </Button.Root>

              <Button.Root>
                <Button.Title>Continuar com Apple</Button.Title>
              </Button.Root> */}

              <Button.Root
                variant="outline"
                onPress={() => handleSelectLoginMethod('email')}
                className="mb-2.5 mt-10"
              >
                <Button.Title variant="outline">Iniciar com email</Button.Title>
              </Button.Root>

              <Touchable className="mt-10" onPress={() => push('sign-in')}>
                <P className="font-400 text-sm text-center text-zinc-500 -tracking-wide">
                  Já possui uma conta? <P>Clique aqui.</P>
                </P>
              </Touchable>
            </>
          )}
        </Div>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}
