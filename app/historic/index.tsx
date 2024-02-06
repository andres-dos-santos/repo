import { ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { CaretRight, Storefront } from 'phosphor-react-native'
import dayjs from 'dayjs'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useCallback, useRef, useState } from 'react'

import { currency } from '../../lib/currency'

import { useFetch } from '../../hooks/use-fetch'

import { Div } from '../../components/ui/div'
import { Header } from '../../components/header'
import { Touchable } from '../../components/ui/touchable'
import { P } from '../../components/ui/p'
import {
  BottomSheetModal,
  type BottomSheetRefType,
} from '../../components/bottom-sheet-modal'

import type { API } from '../../types/api'
import type { CashbackDTO } from '../../types/dtos/cashback-dto'

import 'dayjs/locale/pt-br'
import { BranchImage } from '../home/components/branch-image'
import { CashbackDetailsDTO } from '../../types/dtos/cashback-details-dto'
import { ListHeader } from '../../components/list-header'
import { useRouter } from '../../hooks/use-router'

dayjs.locale('pt-br')

export function Historic() {
  const { data, isLoading } = useFetch<API<CashbackDTO>>(
    'load-all-cashbacks-query',
    `cashbacks?size=100`,
  )

  const { data: cashbackDetails } = useFetch<CashbackDetailsDTO>(
    'load-cashback-details-query',
    `cashbacks/detalhe`,
  )

  const { push } = useRouter()

  const [cashback, setCashback] = useState<
    (CashbackDTO & { total: number }) | null
  >(null)

  const ref = useRef<BottomSheetRefType>(null)

  const handleSelectCashback = useCallback(
    (cashback: CashbackDTO & { total: number }) => {
      setCashback(cashback)

      ref.current.present()
    },
    [],
  )

  const uniqueArray = data.content.reduce((acc, obj) => {
    const found = acc.find((item) => item.filialId === obj.filialId)
    if (!found) {
      acc.push({ filialId: obj.filialId, total: obj.valor, ...obj })
    } else {
      found.total += obj.formaPagamento === 'CREDITO' ? obj.valor : 0
    }

    return acc
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Header.Root className="border-b border-zinc-200">
        <Header.Left>
          <Header.Back />

          <Header.Title>Extrato & Cashbacks</Header.Title>
        </Header.Left>

        {isLoading ? <ActivityIndicator color="#305A96" size={14} /> : null}
      </Header.Root>

      <ListHeader.Root className="border-b border-zinc-200">
        <ListHeader.Title>TRANSAÇÕES</ListHeader.Title>
      </ListHeader.Root>

      <Div className="flex-row items-center justify-between w-full px-7">
        <Div className="flex-1 items-center justify-center">
          <P className="text-[11px] font-500">SEU SALDO</P>
          <P className="text-[17px] -tracking-widest text-[#305A96] font-600 mt-2.5">
            {currency(cashbackDetails.saldo)}
          </P>
        </Div>

        <Div className="flex-1 items-center justify-center">
          <P className="text-[11px] font-500">RECEBIDO</P>
          <P className="text-[17px] -tracking-widest text-green-500 font-600 mt-2.5">
            {currency(cashbackDetails.totalRecebido)}
          </P>
        </Div>

        <Div className="flex-1 items-center justify-center">
          <P className="text-[11px] font-500">UTILIZADO</P>
          <P className="text-[17px] -tracking-widest text-red-500 font-600 mt-2.5">
            {currency(cashbackDetails.totalUtilizado)}
          </P>
        </Div>
      </Div>

      <ListHeader.Root className="border-b border-zinc-200">
        <ListHeader.Title>DETALHES DOS CASHBACKS</ListHeader.Title>
      </ListHeader.Root>

      {data && data.totalElements > 0 ? (
        <FlatList
          data={uniqueArray}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 28, paddingVertical: 0 }}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Touchable
              onPress={() => handleSelectCashback(item)}
              className="flex-row items-center justify-between h-16 mb-2.5"
            >
              <Div className="flex-row items-center gap-x-3">
                {/** <Div
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
                </Div> */}
                <BranchImage id={item.filialId} />

                <Div>
                  <P className="font-600 text-green-500 -tracking-widest">
                    {currency(item.total.toFixed(2))}
                  </P>

                  <P className="font-500 text-xs mt-1 truncate">
                    {item.filialNome}
                  </P>
                </Div>
              </Div>

              <CaretRight size={14} weight="bold" />
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
          <Div className="justify-center p-7">
            <Div className="flex-row items-center">
              <BranchImage id={cashback.filialId} />
              <P className="text-[15px] ml-5 font-500">{cashback.filialNome}</P>
            </Div>

            <Div className="flex-row items-center justify-between w-full my-10">
              <Div className="flex-1 items-center justify-center">
                <P className="text-[11px] font-500">SEU SALDO</P>
                <P className="text-[17px] -tracking-widest text-[#305A96] font-600 mt-2.5">
                  {currency(cashbackDetails.saldo)}
                </P>
              </Div>

              <Div className="flex-1 items-center justify-center">
                <P className="text-[11px] font-500">RECEBIDO</P>
                <P className="text-[17px] -tracking-widest text-green-500 font-600 mt-2.5">
                  {currency(cashback.total.toFixed(2))}
                </P>
              </Div>

              <Div className="flex-1 items-center justify-center">
                <P className="text-[11px] font-500">UTILIZADO</P>
                <P className="text-[17px] -tracking-widest text-red-500 font-600 mt-2.5">
                  {currency(cashbackDetails.totalUtilizado)}
                </P>
              </Div>
            </Div>

            <Touchable
              onPress={() =>
                push('details', {
                  branchId: cashback.filialId,
                  branchLocale: 'Centro',
                  branchName: cashback.filialNome,
                })
              }
              className="flex-row items-center justify-between p-5 bg-zinc-100 rounded-xl"
            >
              <Div className="flex-row items-center">
                <Storefront size={16} weight="bold" />
                <P className="font-500 text-[13px] ml-2.5">Ver na loja</P>
              </Div>

              <CaretRight size={16} weight="bold" />
            </Touchable>
          </Div>
        ) : null}
      </BottomSheetModal.Root>
    </ScrollView>
  )
}
