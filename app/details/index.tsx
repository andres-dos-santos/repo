import { ArrowLeft, Heart } from 'phosphor-react-native'
import { Animated, Image } from 'react-native'
import { useRef, useState } from 'react'
import clsx from 'clsx'

import { useRouter } from '../../hooks/use-router'
import { useFavorites } from '../../hooks/use-favorites'
import { useFetch } from '../../hooks/use-fetch'

import { AnimatedListContext } from '../../contexts/animated-list'

import { Svg } from '../../components/ui/svg'
import { P } from '../../components/ui/p'
import { Touchable } from '../../components/ui/touchable'
import { Div } from '../../components/ui/div'
import { AnimatedList } from '../../components/animated-list'

import { AnnouncementDTO } from '../../types/dtos/announcement-dto'
import { StatusBar } from 'expo-status-bar'
import { white } from 'tailwindcss/colors'

const DATA = [
  {
    description:
      'Desfrute de imagens nítidas e detalhes impressionantes com o nosso monitor Full HD.',
    image: require('../../assets/ads/ads1.jpg'),
  },
  {
    description:
      'Potência e desempenho se unem no nosso PC equipado com processador Core i3. Supere desafios do dia a dia com velocidade e eficiência, seja para multitarefas ou entretenimento.',
    image: require('../../assets/ads/ads2.jpg'),
  },
  {
    description:
      'O controle do PlayStation 5, conhecido como DualSense, é uma peça de tecnologia impressionante. Com um design ergonômico, possui gatilhos adaptáveis.',
    image: require('../../assets/ads/ads3.jpg'),
  },
  {
    description:
      'Desfrute de imagens nítidas e detalhes impressionantes com o nosso monitor Full HD. Uma experiência visual envolvente e cristalina para elevar o seu entretenimento.',
    image: require('../../assets/ads/ads4.jpg'),
  },
  {
    description: 'Adentre um mundo épico de magia e aventura com Baldurs Gate!',
    image: require('../../assets/ads/ads5.jpg'),
  },
]

type Props = {
  route: {
    params: { branchId: string; branchName: string; branchLocale: string }
  }
}

export function Details(props: Props) {
  const { branchId, branchLocale, branchName } = props.route.params

  const { data, isLoading } = useFetch<AnnouncementDTO[]>(
    'load-all-announcements-query',
    `anuncios?filialId=1`,
  )
  console.log('data', data)

  const { back } = useRouter()

  /** const { addFavorite, favorites } = useFavorites()

  const favorite = favorites
    ? favorites.find((item) => item.id === Number(branchId))
    : false */

  const scrollX = useRef(new Animated.Value(0)).current

  const [index, setIndex] = useState(0)

  const test = true

  return (
    <Div className="flex-1 pt-2.5">
      <Div className="border-b border-b-zinc-200 px-5 h-14">
        <Div className="items-center justify-between flex-row">
          <Touchable
            hitSlop={20}
            activeOpacity={0.8}
            onPress={back}
            className="flex-row items-center gap-x-2.5"
          >
            <Svg component={ArrowLeft} size={18} weight="bold" />

            <Image
              alt=""
              source={require('../../assets/black-logo.png')}
              className="h-[40px] w-[40px] rounded-full"
            />

            <Div>
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
            activeOpacity={0.8}
          >
            <Svg component={Heart} size={20} color={favorite && '#c32c28'} />
          </Touchable> */}
        </Div>
      </Div>

      {test ? (
        <>
          <Touchable className="absolute right-0 top-20 z-50 bg-zinc-900/90 py-2.5 px-5 border border-r-0 border-zinc-700 rounded-l-full">
            <P className="font-500 text-[11px] text-white">FALTA 1 DIA</P>
          </Touchable>

          <AnimatedListContext.Provider
            value={{ setIndex, index, scrollX, data: DATA }}
          >
            <AnimatedList.Root />

            <AnimatedList.Dots />
          </AnimatedListContext.Provider>

          <Div className="absolute bottom-0 p-5 w-screen">
            <Div className="flex-row items-center justify-between mb-5">
              <P className="font-500 text-[13px]">MAIS ANÚNCIOS</P>
              <P className="font-500 text-[13px]">{DATA.length}</P>
            </Div>

            <Div className="flex-row items-center gap-x-2">
              {DATA.map((item, idx) => (
                <Touchable
                  key={idx}
                  onPress={() => setIndex(idx)}
                  activeOpacity={0.8}
                  className={clsx('items-center justify-center', {
                    'border-4 border-zinc-900 rounded-xl': index === idx,
                    'border-4 border-zinc-900 rounded-2xl': index !== idx,
                  })}
                >
                  <Image
                    alt=""
                    source={item.image}
                    className="h-[50px] w-[50px] rounded-xl"
                    resizeMode="center"
                  />
                </Touchable>
              ))}
            </Div>
          </Div>

          {/** <AnimatedListContext.Provider
            value={{ setIndex, index, scrollX, data: DATA }}
          >
            <AnimatedList.Root />

            <AnimatedList.Dots />
          </AnimatedListContext.Provider>

          <Div className="absolute bottom-0 p-5 w-screen">
            <Div className="flex-row items-center justify-between mb-5">
              <P className="font-500 text-[13px]">MAIS ANÚNCIOS</P>
              <P className="font-500 text-[13px]">{DATA.length}</P>
            </Div>

            <Div className="flex-row items-center gap-x-2">
              {DATA.map((item, idx) => (
                <Touchable
                  key={idx}
                  onPress={() => setIndex(idx)}
                  activeOpacity={0.8}
                  className={clsx('items-center justify-center', {
                    'border-4 border-zinc-900 rounded-xl': index === idx,
                    'border-4 border-zinc-900 rounded-2xl': index !== idx,
                  })}
                >
                  <Image
                    alt=""
                    source={item.image}
                    className="h-[50px] w-[50px] rounded-xl"
                    resizeMode="center"
                  />
                </Touchable>
              ))}
            </Div>
          </Div> */}
        </>
      ) : (
        <Div className="flex-1 px-5 py-20 items-center justify-center">
          <P className="font-400 text-xs text-zinc-400">
            {branchName} não tem nenhum anúncio ainda
          </P>
        </Div>
      )}
    </Div>
  )
}
