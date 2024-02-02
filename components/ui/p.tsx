import clsx from 'clsx'
import { Text, TextProps } from 'react-native'

export type PProps = TextProps

export function P(props: PProps) {
  return (
    <Text className={clsx('text-zinc-900', props.className)} {...props}>
      {props.children}
    </Text>
  )
}
