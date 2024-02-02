import clsx from 'clsx'
import { ArrowLeft } from 'phosphor-react-native'
import { Image, type ImageProps } from 'react-native'

import { useRouter } from '../hooks/use-router'

import { P, type PProps } from './ui/p'
import { Svg } from './ui/svg'
import { Div, type DivProps } from './ui/div'
import { Touchable, type TouchableProps } from './ui/touchable'

function Root(props: DivProps) {
  return (
    <Div
      className={clsx(
        'px-5 h-14 items-center justify-between flex-row',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </Div>
  )
}

function Left(props: DivProps) {
  return (
    <Div
      className={clsx('items-center space-x-2.5 flex-row', props.className)}
      {...props}
    >
      {props.children}
    </Div>
  )
}

function Back(props: TouchableProps) {
  const { back } = useRouter()

  return (
    <Touchable
      hitSlop={20}
      onPress={back}
      className={clsx('flex-row items-center gap-x-2.5', props.className)}
      {...props}
    >
      <Svg component={ArrowLeft} size={18} weight="bold" />
    </Touchable>
  )
}

function Photo(props: ImageProps) {
  return (
    <Image
      alt=""
      className={clsx('h-[40px] w-[40px] rounded-full', props.className)}
      {...props}
    />
  )
}

function Title(props: PProps & { description?: string }) {
  return (
    <Div className="ml-5">
      <P className="font-600 text-[15px] -tracking-wider uppercase">
        {props.children}
      </P>
      {props.description ? (
        <P className="font-500 text-[10px] mt-1 text-zinc-500">
          {props.description}
        </P>
      ) : null}
    </Div>
  )
}

export const Header = {
  Root,
  Left,
  Back,
  Photo,
  Title,
}
