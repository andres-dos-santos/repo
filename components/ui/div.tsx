import { View, ViewProps } from 'react-native'

export type DivProps = ViewProps

export function Div(props: DivProps) {
  return <View {...props}>{props.children}</View>
}
