import { ActivityIndicator, FlatList } from 'react-native'
import { ArrowDown, ArrowUp } from 'phosphor-react-native'
import { green, red } from 'tailwindcss/colors'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useCallback, useRef, useState } from 'react'

import { currency } from '../../lib/currency'

import { useFetch } from '../../hooks/use-fetch'

import { Div } from '../../components/ui/div'
import { Header } from '../../components/header'
import { Touchable } from '../../components/ui/touchable'
import { Svg } from '../../components/ui/svg'
import { P } from '../../components/ui/p'
import {
  BottomSheetModal,
  type BottomSheetRefType,
} from '../../components/bottom-sheet-modal'

import type { API } from '../../types/api'
import type { CashbackDTO } from '../../types/dtos/cashback-dto'

import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export function Historic() {
  const { data, isLoading } = useFetch<API<CashbackDTO>>(
    'load-all-cashbacks-query',
    `cashbacks?size=100`,
  )

  const [cashback, setCashback] = useState<CashbackDTO | null>(null)

  const ref = useRef<BottomSheetRefType>(null)

  const handleSelectCashback = useCallback((cashback: CashbackDTO) => {
    setCashback(cashback)

    ref.current.present()
  }, [])

  return (
    <>
      <Header.Root className='border-b border-zinc-200'>
        <Header.Left>
          <Header.Back />

          <Header.Title>Extrato & Histórico</Header.Title>
        </Header.Left>

        {isLoading ? <ActivityIndicator color="#305A96" size={14} /> : null}
      </Header.Root>

      {data && data.totalElements > 0 ? (
        <FlatList
          data={data.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Touchable
              onPress={() => handleSelectCashback(item)}
              className="flex-row items-start justify-between h-16"
            >
              <Div className="flex-row items-center gap-x-3">
                <Div
                  className={clsx(
                    'items-center justify-center h-12 w-12 rounded-2xl',
                    {
                      'bg-red-300/50': item.formaPagamento === 'DEBITO',
                      'bg-green-300/50': item.formaPagamento === 'CREDITO',
                    },
                  )}
                >
                  {item.formaPagamento === 'CREDITO' ? (
                    <Svg
                      component={ArrowUp}
                      color={green[500]}
                      size={14}
                      weight="bold"
                    />
                  ) : (
                    <Svg
                      component={ArrowDown}
                      color={red[500]}
                      size={14}
                      weight="bold"
                    />
                  )}
                </Div>

                <Div>
                  <P className="font-600 text-zinc-700 -tracking-widest">
                    {currency(item.valor)}
                  </P>

                  <P className="font-500 text-xs text-zinc-400 mt-1 max-w-[70%] truncate">
                    {item.descricao}
                  </P>
                </Div>
              </Div>

              <P className="text-zinc-500 uppercase font-500 text-xs">
                {dayjs(item.dia).format('DD MMM')}
              </P>
            </Touchable>
          )}
        />
      ) : !isLoading ? (
        <Animated.View
          entering={FadeInDown}
          className="flex-1 items-center justify-center"
        >
          <P className="font-400 text-xs text-zinc-500">
            Seu histórico está vazio
          </P>
        </Animated.View>
      ) : null}

      <BottomSheetModal.Root ref={ref} snapPoints={['50%', '80%']}>
        {cashback ? (
          <Div className="items-center justify-center">
            <Div className="my-10 flex-row items-center">
              <P className="items-center justify-center mr-2.5 font-500 uppercase">
                {dayjs(cashback.dia).format('DD [de] MMMM')}
              </P>

              <Div
                className={clsx(
                  'flex-row items-center justify-center h-8 px-2.5 border rounded-full',
                  {
                    'bg-red-300/50 border-red-500':
                      cashback.formaPagamento === 'DEBITO',
                    'bg-green-300/50 border-green-500':
                      cashback.formaPagamento === 'CREDITO',
                  },
                )}
              >
                <Svg
                  component={
                    cashback.formaPagamento !== 'CREDITO' ? ArrowDown : ArrowUp
                  }
                  size={14}
                  weight="bold"
                  color={
                    cashback.formaPagamento !== 'CREDITO'
                      ? red[500]
                      : green[500]
                  }
                />

                {cashback.formaPagamento !== 'CREDITO' ? (
                  <P className="text-sm font-500 ml-2.5 -tracking-wider text-red-500">
                    transação de crédito
                  </P>
                ) : (
                  <P className="text-sm font-500 ml-2.5 -tracking-wider text-green-500">
                    transação de débito
                  </P>
                )}
              </Div>
            </Div>

            <P className="text-3xl font-300">
              R$ {`${cashback.valor}`.replace('.', ',')}
            </P>

            <P className="text-lg font-500 mt-10">{cashback.filialNome}</P>
            <P className="text-sm my-1 font-400 text-zinc-500">
              {cashback.descricao}
            </P>

            {/** <Div className="flex-row items-center justify-center bg-zinc-200 h-20 px-10 my-10 rounded-full">
              <Svg component={Article} />

              <P className="text-sm font-500 ml-2.5 -tracking-wider">
                ver comprovante
              </P>
            </Div> */}
          </Div>
        ) : null}
      </BottomSheetModal.Root>
    </>
  )
}
