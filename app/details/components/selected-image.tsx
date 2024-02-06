import { Dimensions, Image } from 'react-native'
import { useContext } from 'react'
import { Ticket } from 'phosphor-react-native'

import { Touchable } from '../../../components/ui/touchable'
import { Svg } from '../../../components/ui/svg'
import { Div } from '../../../components/ui/div'
import { P } from '../../../components/ui/p'

import { DataContext } from '../contexts/data'

const { height, width } = Dimensions.get('screen')

export function SelectedImage() {
  const { content } = useContext(DataContext)

  return (
    <>
      <Touchable
        style={{ height: height / 2, width: width - 56 }}
        className="relative items-center mx-7 mt-5 justify-center"
      >
        <Image
          alt=""
          source={{ uri: `data:image/png;base64,${content?.imageURI}` }}
          className="rounded-2xl border-4 border-zinc-300"
          resizeMode="cover"
          style={{ height: height / 2, width: width - 56 }}
        />

        <Div className="absolute z-10 bottom-5 right-5 flex-row items-center p-5 rounded-2xl flex-1 bg-white border-4 border-zinc-300">
          <Svg component={Ticket} weight="duotone" />

          <P className="font-600 text-sm -tracking-widest ml-2.5">
            {content?.cupom}
          </P>
        </Div>
      </Touchable>
    </>
  )
}
