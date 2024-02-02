import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native'
import { white, zinc } from 'tailwindcss/colors'

type Props = ActivityIndicatorProps & {
  inverted?: boolean
}

export function Spinner(props: Props) {
  const color = props.inverted ? white : zinc[900]

  return <ActivityIndicator size={14} color={color} {...props} />
}
