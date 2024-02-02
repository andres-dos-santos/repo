import clsx from 'clsx'

import { P, type PProps } from './p'
import { Touchable, type TouchableProps } from './touchable'

interface RootProps extends TouchableProps {
  variant?: 'outline' | 'fill'
}

function Root({ className, variant = 'fill', children, ...props }: RootProps) {
  return (
    <Touchable
      className={clsx(
        'h-[50px] rounded-2xl w-full flex-row items-center justify-center',
        {
          'border border-zinc-100': variant === 'outline',
          'bg-[#305A96] border border-[#305A96]': variant === 'fill',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Touchable>
  )
}

interface TitleProps extends PProps {
  variant?: 'outline' | 'fill'
}

function Title({
  variant = 'fill',
  children,
  className,
  ...props
}: TitleProps) {
  return (
    <P
      className={clsx(
        'font-500 text-sm',
        {
          'text-zinc-900': variant === 'outline',
          'text-white': variant === 'fill',
        },
        className,
      )}
      {...props}
    >
      {children}
    </P>
  )
}

export const Button = {
  Root,
  Title,
}
