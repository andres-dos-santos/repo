import clsx from 'clsx'
import { ComponentProps, useState } from 'react'
import { Text, TextInput } from 'react-native'
import { zinc } from 'tailwindcss/colors'

import { P } from './p'
import { Div, type DivProps } from './div'

function Root(props: DivProps) {
  return <Div {...props}>{props.children}</Div>
}

interface LabelProps extends ComponentProps<typeof Text> {
  required?: boolean
  error?: string
}

function Label(props: LabelProps) {
  return (
    <P
      className={clsx('text-[13px] font-400 mb-1 ml-2', props.className)}
      {...props}
    >
      {props.children}
      {props.required && !props.error ? (
        <P className="text-red-500">*</P>
      ) : null}
      {props.error ? (
        <P className="text-[13px] font-400 text-red-500"> {props.error}</P>
      ) : null}
    </P>
  )
}

function Write(props: ComponentProps<typeof TextInput>) {
  const [focus, setFocus] = useState(false)

  return (
    <TextInput
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholderTextColor={zinc[400]}
      className={clsx(
        'text-zinc-900 text-sm font-400 px-4 bg-zinc-100 h-[50px] rounded-2xl w-full border border-zinc-100 flex-row items-center justify-center',
        {
          'border-[#305A96]': focus,
        },
        props.className,
      )}
      {...props}
    />
  )
}

export const Input = {
  Root,
  Label,
  Write,
}
