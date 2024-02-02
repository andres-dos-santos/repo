import { Image } from 'react-native'

import { useEffect, useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import { URL as APIURL } from '../../../lib/api'

type Props = {
  id: number
}

export function BranchImage(props: Props) {
  const [jwt] = useMMKVString('@zaalcashback:jwt')

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${APIURL}filiais/1/logo`, {
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
      .catch((error) => console.log(error))
  }, [jwt])

  return (
    <Image
      source={{ uri: `data:image/png;base64,${image}` }}
      style={{ width: 50, height: 50 }}
      alt=""
    />
  )
}
