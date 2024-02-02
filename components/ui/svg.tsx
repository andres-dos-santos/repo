import clsx from 'clsx'
import { ComponentType } from 'react'
import { styled } from 'nativewind'
import { IconProps } from 'phosphor-react-native'

interface Props extends IconProps {
  component: ComponentType<IconProps>
  inverted?: boolean
}

export function Svg({
  component,
  inverted = undefined,
  color = undefined,
  ...props
}: Props) {
  const StyledIcon = styled(component)

  return (
    <StyledIcon
      className={clsx({
        'text-zinc-800': !color && !inverted,
        'text-white': !color && inverted,
      })}
      color={color}
      {...props}
    />
  )
}
