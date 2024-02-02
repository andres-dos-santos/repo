import { FlatList } from 'react-native'
import { ArrowDown, ArrowUp } from 'phosphor-react-native'
import { green, red } from 'tailwindcss/colors'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { currency } from '../../lib/currency'

import { Header } from '../../components/header'

import { P } from '../../components/ui/p'
import { Div } from '../../components/ui/div'
import { Touchable } from '../../components/ui/touchable'
import { Svg } from '../../components/ui/svg'

import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export function Notifications() {
  /** const { data, isLoading } = useFetch<API<CashbackDTO>>(
    'load-all-cashbacks-query',
    `cashbacks?size=20`,
  ) */

  // console.log(JSON.stringify(data, null, 2))

  const data = null
  const isLoading = false

  return (
    <>
      <Header.Root>
        <Header.Left>
          <Header.Back />

          <Header.Title>Notificações</Header.Title>
        </Header.Left>
      </Header.Root>

      {data ? (
        <FlatList
          data={data.content}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Touchable className="flex-row items-start justify-between mb-5">
              <Div className="flex-row items-center gap-x-2">
                <Div
                  className={clsx(
                    'items-center justify-center h-10 w-10 rounded-full',
                    {
                      'bg-red-100/50': item.formaPagamento === 'DEBITO',
                      'bg-green-100/50': item.formaPagamento === 'CREDITO',
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
                  <P className="font-500">
                    {item.formaPagamento === 'CREDITO' ? 'Crédito' : 'Débito'}
                  </P>
                  <Div className="flex-row items-center gap-x-2">
                    <P className="font-400 text-xs text-zinc-500 max-w-[70%] truncate">
                      {item.descricao}
                    </P>
                    <P className="font-400 text-xs text-zinc-500">
                      {currency(item.valor)}
                    </P>
                  </Div>
                </Div>
              </Div>

              <P className="text-zinc-500 uppercase text-xs">
                {dayjs(item.dia).format('DD MMM')}
              </P>
            </Touchable>
          )}
        />
      ) : (
        <Div className="flex-1 items-center justify-center">
          <P className="font-400 text-xs text-zinc-400">
            Não temos notificações para você ainda
          </P>
        </Div>
      )}
    </>
  )
}
