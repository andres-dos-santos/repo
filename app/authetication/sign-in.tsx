import {
  Image,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { Eye, EyeSlash } from 'phosphor-react-native'
import clsx from 'clsx'

import { SignInInput, SignInSchema } from '../../contexts/session'

import { useSession } from '../../hooks/use-session'
import { useRouter } from '../../hooks/use-router'

import { Button } from '../../components/ui/button'
import { P } from '../../components/ui/p'
import { Input } from '../../components/ui/input'
import { Touchable } from '../../components/ui/touchable'
import { Div } from '../../components/ui/div'
import { Svg } from '../../components/ui/svg'
import { Spinner } from '../../components/ui/spinner'

export function SignIn() {
  const { signIn, user } = useSession()
  const { push } = useRouter()

  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, control, formState, reset } = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
  })

  async function onSubmit(input: SignInInput) {
    setLoading(true)

    await signIn(input).finally(() => setLoading(false))
  }

  useEffect(() => {
    if (user) reset({ usuario: user.email })
  }, [reset, user])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Div className="px-10 pt-14 flex-1 relative">
          <Div className="flex-row items-center justify-between">
            <Div className="flex-row items-center space-x-5">
              <Image
                source={require('../../assets/cashback-logo.png')}
                alt=""
                className="w-[50px] h-[50px]"
              />

              <P className="font-500 tracking-widest text-[13px]">
                ZAAL CASHBACK
              </P>
            </Div>
          </Div>

          <P className="font-300 -tracking-widest text-[38px] leading-[50px] my-10">
            entre com seus dados
          </P>

          <Animated.View
            entering={FadeInDown.duration(200)}
            exiting={FadeOutDown.duration(100)}
            className="space-y-3"
          >
            <Input.Root>
              <Input.Label required error={formState.errors.usuario?.message}>
                Email
              </Input.Label>
              <Controller
                name="usuario"
                control={control}
                render={({ field }) => (
                  <Input.Write
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Digite seu email"
                  />
                )}
              />
            </Input.Root>

            <Input.Root>
              <Input.Label required error={formState.errors.senha?.message}>
                Senha
              </Input.Label>

              <View className="relative">
                <Controller
                  name="senha"
                  control={control}
                  render={({ field }) => (
                    <Input.Write
                      onChangeText={field.onChange}
                      value={field.value}
                      secureTextEntry={!showPassword}
                      placeholder="***"
                    />
                  )}
                />

                <Touchable
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="absolute h-[50px] right-4 flex items-center justify-center"
                >
                  {showPassword ? (
                    <Svg component={Eye} size={16} />
                  ) : (
                    <Svg component={EyeSlash} size={16} />
                  )}
                </Touchable>
              </View>
            </Input.Root>

            <Button.Root onPress={handleSubmit(onSubmit)}>
              {loading ? (
                <>
                  <Spinner inverted />
                  <Button.Title className="ml-2.5">um momento...</Button.Title>
                </>
              ) : (
                <Button.Title>Avançar</Button.Title>
              )}
            </Button.Root>
          </Animated.View>

          <Touchable className="mt-10" onPress={() => push('sign-up')}>
            <P className="font-400 text-sm text-center text-zinc-500 -tracking-wide">
              Ainda não tem uma conta? <P>Clique aqui.</P>
            </P>
          </Touchable>
        </Div>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}
