import { Div } from '../../../components/ui/div'
import { P } from '../../../components/ui/p'

import { useFetch } from '../../../hooks/use-fetch'

import type { CashbackDetailsDTO } from '../../../types/dtos/cashback-details-dto'

export function CashbackDetails() {
  const { data } = useFetch<CashbackDetailsDTO>(
    'get-cashback-details-query',
    'cashbacks/detalhe',
  )

  const [integer, float] = data ? String(data.saldo).split('.') : [0, 0]

  return (
    <Div>
      <P className="text-xs font-600 text-zinc-500 -tracking-wider mb-1.5">
        SEU SALDO É DE
      </P>

      <Div className="flex-row items-center">
        <P className="text-sm font-600 text-[#305A96] -tracking-widest mb-1 mr-1">
          R$
        </P>

        <P className="text-4xl font-700 text-[#305A96] -tracking-[4px]">
          {integer}
        </P>

        <P className="text-sm font-600 text-[#305A96] -tracking-widest">
          , {float}
        </P>
      </Div>
    </Div>
  )
}
