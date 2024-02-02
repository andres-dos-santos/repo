/* eslint-disable react/display-name */
import { ComponentProps, ElementRef, forwardRef } from 'react'
import {
  BottomSheetFlatList,
  BottomSheetModal as Bottom,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { white, zinc } from 'tailwindcss/colors'
import clsx from 'clsx'

import { P } from './ui/p'

import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

export type BottomSheetRefType = BottomSheetModalMethods

type Ref = ElementRef<typeof Bottom>

type Props = ComponentProps<typeof Bottom>

const Root = forwardRef<Ref, Props>((props, ref) => {
  return (
    <BottomSheetModalProvider>
      <Bottom
        ref={ref}
        index={1}
        handleIndicatorStyle={{
          height: 2,
          width: 100,
          marginTop: 20,
          backgroundColor: zinc[800],
        }}
        backgroundStyle={{
          borderTopWidth: 1,
          borderTopColor: zinc[200],
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: white,
        }}
        {...props}
      >
        {props.children}
      </Bottom>
    </BottomSheetModalProvider>
  )
})

function Title(props: ComponentProps<typeof P>) {
  return (
    <P
      className={clsx(
        'font-400 text-xs text-zinc-500 my-10 px-5',
        props.className,
      )}
      {...props}
    >
      {props.children}
    </P>
  )
}

function FlatList(props: ComponentProps<typeof BottomSheetFlatList>) {
  return (
    <BottomSheetFlatList
      data={props.data}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      {...props}
    />
  )
}

export const BottomSheetModal = {
  Root,
  Title,
  FlatList,
}
