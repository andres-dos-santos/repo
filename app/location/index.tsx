import { Image, Linking, Platform, TouchableOpacity } from 'react-native'

import { useLoadLocation } from '../../hooks/use-load-location'
import { useAddress } from '../../hooks/use-address'
import { useRouter } from '../../hooks/use-router'

import { Button } from '../../components/ui/button'
import { P } from '../../components/ui/p'
import { Div } from '../../components/ui/div'

export function Location() {
  const { push } = useRouter()
  const { error, loading } = useLoadLocation()
  const { address } = useAddress()

  return (
    <>
      <Div className="flex-1 px-10 pt-14 relative">
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
        {loading ? (
          <P className="font-300 -tracking-widest text-[38px] leading-[50px] mt-10">
            encontrando sua cidade...
          </P>
        ) : (
          <>
            {address ? (
              <>
                <P className="font-300 -tracking-widest text-[38px] leading-[50px] mt-10 lowercase">
                  você está em{' '}
                  <P className="font-500">
                    {Platform.OS === 'ios' ? address.city : address.subregion}
                  </P>{' '}
                  e nós temos lojas parceiras perto de você
                </P>

                <Button.Root
                  className="absolute bottom-10 right-10 left-10"
                  onPress={() => push('home')}
                >
                  <Button.Title>Começar a usar</Button.Title>
                </Button.Root>
              </>
            ) : null}

            {error ? (
              <>
                <P className="font-300 -tracking-widest text-[38px] leading-[50px] mt-10 lowercase">
                  {error}
                </P>

                <Div className="mt-10 p-5 bg-zinc-100 rounded-lg">
                  <P className="font-700 text-sm">
                    COMO LIGAR O LOCAL DO CELULAR?
                  </P>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="mt-5"
                    onPress={() => Linking.openSettings()}
                  >
                    <P className="font-400 text-sm">
                      1 - <P className="text-blue-500">Clique aqui</P> para ir
                      até configurações.
                    </P>
                  </TouchableOpacity>

                  <P className="font-400 text-sm mt-2.5">
                    {`2 - Vá para Privacidade > Localização > Zaal Cashback`}
                  </P>

                  <P className="font-400 text-sm mt-2.5">
                    {`3 - Escolhar entre "Sempre" ou "Durante o uso do app"`}
                  </P>
                </Div>
              </>
            ) : null}
          </>
        )}
      </Div>
    </>
  )
}
