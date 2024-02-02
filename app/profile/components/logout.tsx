import { SignOut } from 'phosphor-react-native'
import { useCallback, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { red } from 'tailwindcss/colors'

import { Button } from '../../../components/ui/button'
import { P } from '../../../components/ui/p'
import { Touchable } from '../../../components/ui/touchable'

import { BottomSheetModal } from '../../../components/bottom-sheet-modal'

import { useSession } from '../../../hooks/use-session'
import { useRouter } from '../../../hooks/use-router'

export function LogOut() {
  const bottomSheetModalRef = useRef(null)

  const snapPoints = useMemo(() => ['40%', '90%'], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const { push } = useRouter()
  const { signOut } = useSession()

  function handleLogout() {
    bottomSheetModalRef.current?.present()

    signOut()
  }

  return (
    <>
      <Touchable
        onPress={handlePresentModalPress}
        className="mt-auto mx-5 mb-24 flex-1 h-14 max-h-[56px] flex-row items-center justify-center bg-red-100/50 rounded-2xl"
      >
        <SignOut size={18} color={red[500]} weight="bold" />
        <P className="font-500 text-xs text-red-500 ml-1.5">SAIR</P>
      </Touchable>

      <BottomSheetModal.Root
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <View className="px-5">
          <P className="font-300 -tracking-widest text-[38px] leading-[50px] mt-10 lowercase">
            quer mesmo
            <P className="font-500"> perder</P> cashbacks próximos de você?
          </P>

          <View className="flex-row items-center w-full space-x-2 mt-5">
            <Button.Root
              onPress={handleLogout}
              variant="outline"
              className="flex-1 border-red-500"
            >
              <Button.Title variant="outline" className="text-red-500">
                Sim, perder!
              </Button.Title>
            </Button.Root>

            <Button.Root className="flex-1" onPress={() => push('home')}>
              <Button.Title>Ver promoções</Button.Title>
            </Button.Root>
          </View>
        </View>
      </BottomSheetModal.Root>
    </>
  )
}
