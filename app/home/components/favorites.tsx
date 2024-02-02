import { FlatList, Image } from 'react-native'

import { useFavorites } from '../../../hooks/use-favorites'

import { P } from '../../../components/ui/p'
import { Div } from '../../../components/ui/div'
import { Touchable } from '../../../components/ui/touchable'

export function Favorites() {
  const { favorites } = useFavorites()

  return favorites && favorites.length > 0 ? (
    <>
      <Div className="flex-row items-center justify-between px-7 my-10">
        <P className="text-xs font-500">FAVORITOS</P>

        <P className="text-xs font-500">{favorites.length}</P>
      </Div>

      <FlatList
        data={favorites}
        horizontal
        contentContainerStyle={{ gap: 16, paddingHorizontal: 28 }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={() => (
          <Touchable className="items-center justify-center h-20 w-20 bg-zinc-100 rounded-3xl">
            <Image
              alt=""
              source={require('../../../assets/black-logo.png')}
              className="w-[55px] h-[55px] rounded-full"
              resizeMode="contain"
            />
          </Touchable>
        )}
      />
    </>
  ) : null
}
