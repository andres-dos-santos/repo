import { useContext } from 'react'
import dayjs from 'dayjs'
import { Warning } from 'phosphor-react-native'
import { yellow } from 'tailwindcss/colors'

import { DataContext } from '../contexts/data'

import { Div } from '../../../components/ui/div'
import { ListHeader } from '../../../components/list-header'
import { P } from '../../../components/ui/p'
import { Svg } from '../../../components/ui/svg'

export function SelectedDetails() {
  const { content } = useContext(DataContext)

  return (
    <>
      <Div>
        <ListHeader.Root>
          <ListHeader.Title>
            DETALHES DO ANÚNCIO{' '}
            {/** <P className="text-xs font-500 text-zinc-700 -tracking-wide">
            • Cupons de lojas parceiras
          </P>{' '} */}
          </ListHeader.Title>
        </ListHeader.Root>

        <Div className="px-7 pt-5">
          <P className="font-500">{content?.conteudo}</P>

          <Div className="flex-row items-center mt-5 mb-2.5">
            <Div className="flex-1 mr-1 flex-row items-center justify-between border border-zinc-200 bg-zinc-100 rounded-xl p-5">
              <P className="font-500 text-xs text-zinc-500">CUPOM</P>
              <P className="font-500">{content?.cupom}</P>
            </Div>

            <Div className="flex-1 ml-1 flex-row items-center justify-between border border-zinc-200 bg-zinc-100 rounded-xl p-5">
              <P className="font-500 text-xs text-zinc-500">DESCONTO</P>
              <P className="font-500">
                {content?.valorDesconto}
                {content?.tipoDesconto === 'PORCENTAGEM' ? '%' : null}
              </P>
            </Div>
          </Div>

          <Div className="flex-row items-center justify-between border border-zinc-200 bg-zinc-100 rounded-xl p-5">
            <P className="font-500 text-xs text-zinc-500">VALIDADE</P>
            <P className="font-500 -tracking-wider">
              {dayjs(content?.validade).format('DD [de] MMMM [de] YYYY')}
            </P>
          </Div>

          <Div className="flex-row items-center justify-between border border-yellow-500 bg-yellow-100 rounded-xl p-5 mt-2.5">
            <Svg
              component={Warning}
              size={25}
              weight="bold"
              color={yellow[500]}
            />

            <P className="font-500 text-[10px] uppercase leading-5 ml-5 flex-1">
              VÁLIDO ATÉ{' '}
              {dayjs(content?.validade).format('DD [de] MMMM [de] YYYY')} OU ATÉ
              ATINGIR A QUANTIDADE DE CUPONS DISPONÍVEIS
            </P>
          </Div>
        </Div>
      </Div>
    </>
  )
}
