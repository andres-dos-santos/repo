import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

export type TouchableProps = TouchableOpacityProps

export function Touchable(props: TouchableProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      {props.children}
    </TouchableOpacity>
  )
}
