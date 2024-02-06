import { useContext, useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

import { URL } from '../../../lib/api'

import { Touchable } from '../../../components/ui/touchable'


import { AnnouncementDTO } from '../../../types/dtos/announcement-dto'
import { DataContext } from '../contexts/data'

type Props = {
  item: AnnouncementDTO
}

export function CarouselItem(props: Props) {
  const { setContent, data, content } = useContext(DataContext)

  const [jwt] = useMMKVString('@zaalcashback:jwt')

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${URL}anuncios/${props.item.id}/imagem`, {
      headers: {
        Authorization: jwt,
        'Content-Type': 'image/png',
      },
    })
      .then((response) => response.blob())
      .then((data) => {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base = reader.result.toString().split(',')[1]

          setImage(base)
        }

        reader.readAsDataURL(data)
      })
  }, [jwt, props.item.id])

  useEffect(() => {
    if (data && !content?.imageURI) setContent({ ...data[0], imageURI: image })
  }, [content?.imageURI, data, image, setContent])

  return (
    <Touchable
      onPress={() => setContent({ ...props.item, imageURI: image })}
      className="items-center justify-center"
    >
      <Image
        alt=""
        source={{ uri: `data:image/png;base64,${image}` }}
        className="h-[150px] mr-5 border-4 border-zinc-300 rounded-2xl w-[150px]"
        resizeMode="contain"
      />
    </Touchable>
  )
}
