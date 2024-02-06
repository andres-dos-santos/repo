import { Image } from 'react-native'

import { useEffect, useState } from 'react'
import { useMMKVString } from 'react-native-mmkv'

import clsx from 'clsx'
import { URL } from '../../../lib/api'
import { Div } from '../../../components/ui/div'

type Props = {
  id: number | string
  size?: number
}

export function BranchImage(props: Props) {
  const [jwt] = useMMKVString('@zaalcashback:jwt')

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${URL}filiais/${props.id}/logo`, {
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
  }, [jwt, props.id])

  return (
    <Div
      className="rounded-full items-center justify-center"
      style={{ width: props.size + 5 || 55, height: props.size + 5 || 55 }}
    >
      <Image
        source={{ uri: `data:image/png;base64,${image}` }}
        style={{
          width: props.size || 50,
          height: props.size || 50,
          borderRadius: 9999,
        }}
        resizeMode="contain"
        alt=""
      />
    </Div>
  )
}
