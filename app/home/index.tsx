import { Dimensions, ScrollView, Text } from 'react-native'
import {
  ArrowDown,
  Article,
  Bell,
  CaretRight,
  Eye,
  HandSwipeLeft,
  MagnifyingGlass,
  Wallet,
} from 'phosphor-react-native'
import { green, red, yellow, zinc } from 'tailwindcss/colors'
import Animated, { FadeInRight } from 'react-native-reanimated'

import { useRouter } from '../../hooks/use-router'
import { useSession } from '../../hooks/use-session'

import { AnnouncementProvider } from '../../contexts/announcement'

import { Svg } from '../../components/ui/svg'
import { P } from '../../components/ui/p'
import { Div } from '../../components/ui/div'
import { Touchable } from '../../components/ui/touchable'

import { City } from '../../components/city'
import { Profile } from '../../components/profile'

import { Favorites } from './components/favorites'
import { MostRecent } from './components/most-recent'
import { HighestReturn } from './components/highest-return'
import { All } from './components/all'
import { Currency } from '../../components/ui/currency'
import { useState } from 'react'
import clsx from 'clsx'
import { Link } from '@react-navigation/native'

export function Home() {
  const { push } = useRouter()
  const { user } = useSession()

  const [seeMoney, setSeeMoney] = useState(true)

  return (
    <>
      <Div
        className="flex-row items-start pt-5 justify-between bg-[#305A96] relative"
        style={{ height: Dimensions.get('screen').height / 6.5 }}
      >
        <Div className="px-5">
          <Profile />

          <City />
        </Div>

        <Div className="flex-row items-center gap-x-2.5 px-5">
          {/** <Touchable
              className="items-center justify-center h-10 w-10 rounded-2xl bg-[#305A96]"
              onPress={() => push('notifications')}
            >
              <Svg component={Bell} size={16} weight="bold" inverted />
            </Touchable> */}

          <Touchable
            className="items-center justify-center h-10 w-10 rounded-2xl bg-blue-500/30"
            onPress={() => push('search')}
          >
            <Svg component={MagnifyingGlass} size={16} weight="bold" inverted />
          </Touchable>
        </Div>

        <Div className="absolute -bottom-12 h-24 w-full items-center justify-center">
          <Div
            className="h-full bg-white pl-7 pr-5 w-[90%] rounded-[28px] flex-row items-center justify-between border border-zinc-300"
            style={{ elevation: 5 }}
          >
            <Div>
              <P className="text-xs font-600 text-zinc-500 -tracking-wider mb-1.5">
                SEU SALDO É DE
              </P>

              <Div className="flex-row items-center">
                <P className="text-sm font-600 text-[#305A96] -tracking-widest mb-1 mr-1">
                  R$
                </P>

                <P className="text-4xl font-700 text-[#305A96] -tracking-widest">
                  {seeMoney ? user.saldo : '-'}
                </P>

                {seeMoney ? (
                  <P className="text-sm font-600 text-[#305A96] -tracking-widest">
                    ,00
                  </P>
                ) : null}
              </Div>
            </Div>

            <Div className="flex-row items-center gap-2">
              {/** <Touchable
                onPress={() => setSeeMoney((prev) => !prev)}
                className="h-10 w-10 bg-zinc-100 items-center justify-center rounded-[14px]"
              >
                <Svg
                  component={Eye}
                  color={zinc[700]}
                  size={16}
                  weight="bold"
                />
              </Touchable> */}

              <Touchable
                onPress={() => push('historic')}
                hitSlop={50}
                className="flex-row h-12 px-5 bg-[#305A96] items-center justify-center rounded-[16px] border-4 border-blue-200/70"
              >
                <Svg component={Article} size={16} weight="bold" inverted />

                <P className="text-xs font-500 ml-2 -tracking-wider text-white">
                  Extrato & Histórico
                </P>
              </Touchable>
            </Div>
          </Div>
        </Div>
      </Div>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Div className="items-start space-x-2.5 px-7">
          {/** <Div className="h-10 w-10 bg-green-300/30 items-center justify-center rounded-xl">
            <Svg
              component={Wallet}
              color={green[500]}
              size={16}
              weight="bold"
            />
          </Div> */}

          {/** <Animated.View
            entering={FadeInRight.delay(100)}
            className="bg-zinc-100 rounded-[25px] p-5 flex-1"
          >
            <Div className="h-10 w-10 bg-red-300/30 items-center justify-center rounded-xl">
              <Svg
                component={ArrowDown}
                color={red[500]}
                size={16}
                weight="bold"
              />
            </Div>

            <P className="mt-5 mb-1 text-xs font-700 text-zinc-500 -tracking-wider">
              TOTAL GASTO
            </P>

            <P className="text-lg font-500 -tracking-wider">R$ 0</P>
          </Animated.View> */}
        </Div>

        {/** <Div className="flex-row items-center space-x-2.5 px-5">
          <Animated.View
            entering={FadeInRight.delay(100)}
            className="bg-zinc-100 dark:bg-zinc-800 rounded-[25px] p-5 flex-1"
          >
            <Div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 items-center justify-center rounded-xl">
              <Svg component={ArrowDown} size={16} weight="bold" />
            </Div>

            <P className="mt-5 mb-1 text-xs font-700 text-zinc-500 -tracking-wider">
              TOTAL GASTO
            </P>

            <P className="text-lg font-500 -tracking-wider">R$ 56,00</P>
          </Animated.View>

          <Animated.View
            entering={FadeInRight.delay(100)}
            className="bg-zinc-100 dark:bg-zinc-800 rounded-[25px] p-5 flex-1"
          >
            <Div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 items-center justify-center rounded-xl">
              <Svg component={ArrowUp} size={16} weight="bold" />
            </Div>

            <P className="text-xs font-700 text-zinc-500 -tracking-wider mt-5 mb-1">
              TOTAL RETORNADO
            </P>

            <P className="text-lg font-500 -tracking-wider">R$ 12,34</P>
          </Animated.View>
        </Div> */}

        {/** <Favorites /> */}

        {/** <AnnouncementProvider>
          <MostRecent />

          <HighestReturn />
        </AnnouncementProvider> */}

        <All />
      </ScrollView>
    </>
  )
}
