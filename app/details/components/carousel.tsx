import { useContext } from 'react'
import { FlatList } from 'react-native'

import { Div } from '../../../components/ui/div'

import { CarouselItem } from './carousel-item'
import { DataContext } from '../contexts/data'

export function Carousel() {
  const { data } = useContext(DataContext)

  return (
    <Div className="flex-row items-center mt-5 gap-x-2">
      {data ? (
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 28, paddingRight: 80 }}
          horizontal
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <CarouselItem item={item} />}
        />
      ) : null}
    </Div>
  )
}
