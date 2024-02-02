import { Eye, EyeSlash, WarningOctagon } from 'phosphor-react-native'
import { z } from 'zod'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'

import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Svg } from '../../../components/ui/svg'
import { Touchable } from '../../../components/ui/touchable'
import { Div } from '../../../components/ui/div'
import { Header } from '../../../components/header'

const ChangeDataSchema = z.object({
  email: z.string({ required_error: 'é obrigatório.' }).email(),
  name: z.string({ required_error: 'é obrigatório.' }),
  cpf: z
    .string({ required_error: 'é obrigatório.' })
    .length(11, 'deve ter 11 caracteres.'),
  password: z.string(),
})

type ChangeDataInput = z.infer<typeof ChangeDataSchema>

export function ChangeData() {
  const { show } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [changePassword, setChangePassword] = useState(false)

  const { handleSubmit, control } = useForm<ChangeDataInput>({
    resolver: zodResolver(ChangeDataSchema),
    defaultValues: {
      name: 'Andres dos Santos',
    },
  })

  function onSubmit(input: ChangeDataInput) {
    // jogar para a api
    try {
      // console.log(input)
      // push(`/verify/${input.email}`)
    } catch (error) {
      show('Algo deu errado!', { icon: <Svg component={WarningOctagon} /> })
    }
  }

  return (
    <Div className="flex-1">
      <Header.Root>
        <Header.Left>
          <Header.Back />
          <Header.Title>ALTERE SEUS DADOS</Header.Title>
        </Header.Left>
      </Header.Root>

      <Div className="px-5 mt-10">
        <Animated.View
          entering={FadeInDown.duration(200)}
          exiting={FadeOutDown.duration(100)}
          className="space-y-3"
        >
          <Input.Root>
            <Input.Label required>Nome</Input.Label>
            <Controller
              name="name"
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

          {changePassword ? (
            <>
              <Input.Root className="my-3">
                <Input.Label required>Senha</Input.Label>

                <Div className="relative">
                  <Controller
                    name="password"
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
                </Div>
              </Input.Root>

              <Input.Root>
                <Input.Label required>Confirmar senha</Input.Label>

                <Controller
                  name="password"
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
              </Input.Root>
            </>
          ) : null}

          <Button.Root onPress={handleSubmit(onSubmit)}>
            <Button.Title>
              {changePassword ? 'Enviar código' : 'Mudar nome'}
            </Button.Title>
          </Button.Root>

          <Button.Root
            variant="outline"
            onPress={() => setChangePassword((prev) => !prev)}
          >
            <Button.Title variant="outline">
              {!changePassword
                ? 'Alterar senha'
                : 'Permanecer com a mesma senha'}
            </Button.Title>
          </Button.Root>
        </Animated.View>
      </Div>
    </Div>
  )
}
