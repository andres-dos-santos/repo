import { ComponentProps } from 'react'
import { Image as RNImage } from 'react-native'

import { P, type PProps } from './ui/p'
import { Touchable, type TouchableProps } from './ui/touchable'
import { Div, type DivProps } from './ui/div'

function Root(props: TouchableProps) {
  return (
    <Touchable className="flex-row items-center mb-2.5 w-full" {...props}>
      {props.children}
    </Touchable>
  )
}

function Image(props: ComponentProps<typeof RNImage>) {
  return (
    <RNImage
      alt=""
      className="mr-5 w-[55px] h-[55px] rounded-full p-2.5"
      resizeMode="contain"
      {...props}
    />
  )
}

function Content(props: DivProps) {
  return (
    <Div className="flex-1 flex-row items-center justify-between" {...props}>
      {props.children}
    </Div>
  )
}

function Title(props: PProps & { description: string }) {
  return (
    <Div>
      <P className="font-500 -tracking-wide text-[15px]" {...props}>
        {props.children}
      </P>
      <P className="text-zinc-500 font-400 text-xs mt-0.5 -tracking-wide">
        {props.description}
      </P>
    </Div>
  )
}

function Right(props: DivProps) {
  return (
    <Div className="items-end" {...props}>
      {props.children}
    </Div>
  )
}

function Until(props: PProps) {
  return (
    <P className="font-500 -tracking-widest text-[15px]" {...props}>
      {props.children}
    </P>
  )
}

function Cashback(props: PProps) {
  return (
    <P
      className="text-zinc-500 font-500 text-xs mt-0.5 -tracking-wide"
      {...props}
    >
      {props.children}
    </P>
  )
}

export const Item = {
  Root,
  Image,
  Content,
  Title,
  Right,
  Until,
  Cashback,
}
