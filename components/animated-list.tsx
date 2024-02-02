import { useCallback, useContext, useRef } from 'react'
import {
  FlatList,
  FlatListProps,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { zinc } from 'tailwindcss/colors'
import RNRAnimated, { FadeInDown } from 'react-native-reanimated'
// import * as Clipboard from 'expo-clipboard'
// import { useToast } from 'react-native-toast-notifications'

import { AnimatedListContext } from '../contexts/animated-list'

import { P } from './ui/p'

const DIMENSIONS = Dimensions.get('screen')

type Props = Omit<FlatListProps<string>, 'renderItem' | 'data'>

function Root({ scrollEnabled, ...props }: Props) {
  const { setIndex, scrollX, data } = useContext(AnimatedListContext)

  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      )(event)
    },
    [scrollX],
  )

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index)
    } else {
      setIndex((state) => state)
    }
  }).current

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current

  // const { show } = useToast()

  /** async function copyToClipboard(value: string) {
    await Clipboard.setStringAsync(value).then(() => {
      show('Copiado!')
    })
  } */

  return (
    <FlatList
      data={data as any}
      horizontal
      scrollEnabled={scrollEnabled}
      style={{ width: DIMENSIONS.width }}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
      onScroll={handleOnScroll}
      onViewableItemsChanged={handleOnViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item }: any) => (
        <RNRAnimated.View
          entering={FadeInDown.delay(200)}
          className="items-center justify-center w-screen"
        >
          <RNRAnimated.Image
            alt=""
            className="absolute top-0 right-0 left-0"
            source={item.image}
            style={{
              width: DIMENSIONS.width,
              minHeight: DIMENSIONS.height / 2,
              height: DIMENSIONS.height / 2,
              maxHeight: DIMENSIONS.height / 2,
            }}
          />

          <View className="px-5">
            <P
              className="font-400 leading-6 text-[13px]"
              style={{ marginTop: DIMENSIONS.height / 2 - 90 }}
            >
              {item.description}
            </P>

            <View className="flex-row items-center justify-between gap-x-5 mt-5">
              <View className="flex-row items-center">
                <P className="text-2xl font-400 -tracking-widest">15%</P>
                <P className="text-sm tracking-normal font-400"> DE CASHBACK</P>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-row items-center bg-main justify-center h-10 rounded-xl flex-1 border-2 border-blue-200"
                // onPress={() => copyToClipboard('ZAAL15')}
              >
                <P className="text-sm -tracking-wider font-500 text-white">
                  ZAAL15
                </P>
              </TouchableOpacity>
            </View>
          </View>
        </RNRAnimated.View>
      )}
      {...props}
    />
  )
}

function Dots() {
  const { scrollX, data } = useContext(AnimatedListContext)

  const output = [zinc[300], '#305A96', zinc[300]]

  return (
    <View
      style={{
        top: DIMENSIONS.height / 2 + 70,
      }}
      className="w-screen h-10 items-center justify-center absolute"
    >
      <View className="flex-row items-center justify-center space-x-1">
        {data.map((_, idx) => {
          const backgroundColor = scrollX.interpolate({
            inputRange: [
              (idx - 1) * DIMENSIONS.width,
              idx * DIMENSIONS.width,
              (idx + 1) * DIMENSIONS.width,
            ],
            outputRange: output,
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              key={`${idx}`}
              className="w-[8px] h-[8px] rounded-full"
              style={{ backgroundColor }}
            />
          )
        })}
      </View>
    </View>
  )
}

function Empty() {
  return (
    <View className="mt-20 px-20">
      <P
        className="text-center text-zinc-800 text-xs font-400"
        numberOfLines={2}
      >
        Nada para mostrar em{' '}
        {/** <P className="font-700">{branch ? branch.nomeFantasia : null}</P> */}
      </P>
    </View>
  )
}

export const AnimatedList = {
  Root,
  Dots,
  Empty,
}
