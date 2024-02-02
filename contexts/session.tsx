import { z } from 'zod'
import { ReactNode, createContext, useCallback, useMemo } from 'react'
import { useMMKVObject, useMMKVString } from 'react-native-mmkv'
import { WarningOctagon } from 'phosphor-react-native'
import { useToast } from 'react-native-toast-notifications'
import dayjs from 'dayjs'
import { red, white } from 'tailwindcss/colors'

import { useRouter } from '../hooks/use-router'

import { api } from '../lib/api'

import { Svg } from '../components/ui/svg'

import type { UserDTO } from '../types/dtos/user-dto'
import type { SignUpResponse } from '../types/responses/signup-response'
import type { SignInResponse } from '../types/responses/login-response'
import { useAddress } from '../hooks/use-address'

export const SignUpWithEmailSchema = z.object({
  email: z.string({ required_error: 'é obrigatório.' }).email(),
  nome: z
    .string({ required_error: 'é obrigatório.' })
    .min(3, 'deve ter ao menos 3 caracateres.'),
  cpf: z
    .string({ required_error: 'é obrigatório.' })
    .length(11, 'deve ter 11 caracteres.'),
  senha: z.string({ required_error: 'é obrigatório.' }),
})

export type SignUpWithEmailInput = z.infer<typeof SignUpWithEmailSchema>

export const SignInSchema = z.object({
  usuario: z
    .string({ required_error: 'é obrigatório.' })
    .email({ message: 'inválido' }),
  senha: z.string({ required_error: 'é obrigatório.' }),
})

export type SignInInput = z.infer<typeof SignInSchema>

type User = UserDTO

type VerifyBody = {
  email: string
  codigo: string
}

interface SessionContextData {
  user: User | null
  initialRouteName: string

  checkEmail(code: string[], email: string): void
  setUser(user: User | null): void
  signIn(input: SignInInput): Promise<void>
  signUp(input: SignUpWithEmailInput): Promise<void>
  signOut(): void
}

export const SessionContext = createContext({} as SessionContextData)

export function SessionProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  const { show } = useToast()
  const { address } = useAddress()

  const [user, _setUser] = useMMKVObject<User | null>(
    '@zaalcashback:user',
    null,
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [JWT, _setJWT] = useMMKVString('@zaalcashback:jwt', null)
  const [verifiedAt, _setVerifiedAt] = useMMKVString(
    '@zaalcashback:verified-at',
    null,
  )

  const initialRouteName = useMemo(() => {
    if (!user) {
      return 'sign-up'
    }

    if (user && !verifiedAt) {
      return 'verify'
    }

    if (user && verifiedAt && JWT) {
      return 'home'
    }

    if (user && verifiedAt && !JWT) {
      return 'sign-in'
    }
  }, [JWT, user, verifiedAt])

  const checkEmail = useCallback(
    async (code: string[], email: string) => {
      try {
        await api.post<VerifyBody, unknown>('usuarios/ativacao', {
          codigo: code.join(''),
          email,
        })

        _setVerifiedAt(dayjs(new Date()).format('YYYY-MM-DD'))
      } catch (error) {
        show('Não foi possível validar seu email!')
      } finally {
        push('sign-in')
      }
    },
    [_setVerifiedAt, push, show],
  )

  const signIn = useCallback(
    async (input: SignInInput) => {
      try {
        const json = await api.post<SignInInput, SignInResponse>(
          'login',
          input,
          undefined,
        )

        if (json) {
          _setUser(json.usuarioDTO)

          _setJWT(json.token)

          _setVerifiedAt(dayjs(new Date()).format('YYYY-MM-DD'))

          address ? push('home') : push('location')
        } else {
          throw new Error('Algo deu errado, verifique tudo!')
        }
      } catch (error) {
        show(error.message, {
          icon: <Svg component={WarningOctagon} color={white} />,
          style: { borderRadius: 50, backgroundColor: red[500] },
        })
      }
    },
    [_setJWT, _setUser, _setVerifiedAt, address, push, show],
  )

  const signUp = useCallback(
    async (input: SignUpWithEmailInput) => {
      try {
        const json = await api.post<SignUpWithEmailInput, SignUpResponse>(
          'usuarios',
          input,
          undefined,
        )

        if (json) {
          _setUser(json)

          push('verify', { email: input.email })
        } else {
          throw new Error('Algo deu errado, verifique tudo!')
        }
      } catch (error) {
        show(error.message, {
          icon: <Svg component={WarningOctagon} color={white} />,
          style: { borderRadius: 50, backgroundColor: red[500] },
        })
      }
    },
    [_setUser, push, show],
  )

  const signOut = useCallback(() => {
    push('sign-in')

    _setUser({
      cpf: null,
      email: null,
      id: null,
      nome: null,
      saldo: null,
    })

    _setJWT('')
  }, [_setJWT, _setUser, push])

  return (
    <SessionContext.Provider
      value={{
        user,
        initialRouteName,

        checkEmail,
        signIn,
        signOut,
        signUp,
        setUser: _setUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
