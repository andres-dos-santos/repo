import { ArrowLeft } from 'phosphor-react-native'
import { ScrollView } from 'react-native'
import { useCallback, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

import { useRouter } from '../../hooks/use-router'
import { useFetch } from '../../hooks/use-fetch'

import { Svg } from '../../components/ui/svg'
import { P } from '../../components/ui/p'
import { Touchable } from '../../components/ui/touchable'
import { Div } from '../../components/ui/div'

import { DataProvider } from './contexts/data'

import type { AnnouncementDTO } from '../../types/dtos/announcement-dto'
import { BranchImage } from '../home/components/branch-image'
import { SelectedImage } from './components/selected-image'
import { Carousel } from './components/carousel'
import { SelectedDetails } from './components/selected-details'

type Props = {
  route: {
    params: { branchId: number; branchName: string; branchLocale: string }
  }
}

export function Details(props: Props) {
  const { branchId, branchLocale, branchName } = props.route.params

  const { data } = useFetch<AnnouncementDTO[]>(
    'load-all-announcements-query',
    `anuncios?filialId=${branchId}`,
  )

  const { back } = useRouter()

  /** const { addFavorite, favorites } = useFavorites()

  const favorite = favorites
    ? favorites.find((item) => item.id === Number(branchId))
    : false */

  const [index, setIndex] = useState(0)

  return (
    <Div className="flex-1 pt-12">
      <StatusBar style="dark" />

      <Div className="px-7 h-16 border-b border-b-zinc-200">
        <Div className="items-center justify-between flex-row">
          <Touchable
            hitSlop={20}
            onPress={back}
            className="flex-row items-center"
          >
            <Div className="mr-2.5">
              <Svg component={ArrowLeft} size={18} weight="bold" />
            </Div>

            <BranchImage id={branchId} size={40} />

            <Div className="ml-2.5">
              <P className="font-500 text-[15px]">{branchName}</P>
              <P className="font-500 text-[10px] mt-1 text-zinc-500">
                {branchLocale}
              </P>
            </Div>
          </Touchable>

          {/** <Touchable
            onPress={() =>
              addFavorite({ id: 0, image: '../../assets/black-logo.png' })
            }
            hitSlop={20}
            
          >
            <Svg component={Heart} size={20} color={favorite && '#c32c28'} />
          </Touchable> */}
        </Div>
      </Div>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <DataProvider branchId={branchId}>
          <SelectedImage />

          <Carousel />

          <SelectedDetails />
        </DataProvider>
      </ScrollView>
    </Div>
  )
}
