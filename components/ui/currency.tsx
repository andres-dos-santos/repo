import { Text, TextProps } from 'react-native'
import { zinc } from 'tailwindcss/colors'

export type CurrencyProps = TextProps

export function Currency(props: CurrencyProps) {
  return (
    <Text style={{ fontFamily: 'Roboto_700Bold', color: zinc[700] }} {...props}>
      {props.children}
    </Text>
  )
}
