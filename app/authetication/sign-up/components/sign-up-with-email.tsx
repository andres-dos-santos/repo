import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { View } from 'react-native'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  type SignUpWithEmailInput,
  SignUpWithEmailSchema,
} from '../../../../contexts/session'

import { useSession } from '../../../../hooks/use-session'

import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { Svg } from '../../../../components/ui/svg'
import { Touchable } from '../../../../components/ui/touchable'
import { P } from '../../../../components/ui/p'
import { Spinner } from '../../../../components/ui/spinner'

export function SignUpWithEmail() {
  const { signUp } = useSession()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, formState } = useForm<SignUpWithEmailInput>({
    resolver: zodResolver(SignUpWithEmailSchema),
    defaultValues: {
      cpf: '93030120031',
      email: 'andres.dosantos@gmail.com',
      nome: 'Andres dos Santos',
      senha: '123',
    },
  })

  async function onSubmit(input: SignUpWithEmailInput) {
    setLoading(true)

    await signUp(input).finally(() => setLoading(false))
  }

  return (
    <>
      <P className="font-300 -tracking-widest text-[38px] leading-[50px] my-10">
        preencha os campos abaixo
      </P>

      <Animated.View
        entering={FadeInDown.duration(200)}
        exiting={FadeOutDown.duration(100)}
        className="space-y-5"
      >
        <Input.Root>
          <Input.Label required error={formState.errors.nome?.message}>
            Nome
          </Input.Label>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <Input.Write
                onChangeText={field.onChange}
                value={field.value}
                placeholder="Digite seu nome"
              />
            )}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label required error={formState.errors.cpf?.message}>
            CPF
          </Input.Label>
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <Input.Write
                onChangeText={field.onChange}
                value={field.value}
                maxLength={11}
                keyboardType="number-pad"
                placeholder="Digite seu CPF"
              />
            )}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label required error={formState.errors.email?.message}>
            Email
          </Input.Label>
          <Controller
            name="email"
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
              <Spinner />
              <Button.Title className="ml-2.5">um momento...</Button.Title>
            </>
          ) : (
            <Button.Title>Enviar código</Button.Title>
          )}
        </Button.Root>
      </Animated.View>
    </>
  )
}
