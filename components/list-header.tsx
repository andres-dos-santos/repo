import { TextProps, ViewProps } from 'react-native'
import clsx from 'clsx'

import { P } from './ui/p'
import { Div } from './ui/div'

function Root(props: ViewProps) {
  return (
    <Div className={clsx("flex-row items-center justify-between my-7 px-7", props.className)}>
      {props.children}
    </Div>
  )
}

function Title(props: TextProps) {
  return <P className="text-xs text-zinc-400 font-700">{props.children}</P>
}

function ItemsNumber(props: TextProps) {
  return <P className="text-xs font-500">{props.children}</P>
}

export const ListHeader = {
  Root,
  Title,
  ItemsNumber,
}
