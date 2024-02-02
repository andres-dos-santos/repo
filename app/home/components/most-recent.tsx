import { useContext } from 'react'

import { useRouter } from '../../../hooks/use-router'

import { AnnouncementContext } from '../../../contexts/announcement'

import { Item } from '../../../components/item'
import { P } from '../../../components/ui/p'
import { Div } from '../../../components/ui/div'

import type { NavigateToDetails } from '../../../types/navigation-to-details'
import { ListHeader } from '../../../components/list-header'

export function MostRecent() {
  const { push } = useRouter()

  const { mostRecentData } = useContext(AnnouncementContext)

  const recent = mostRecentData.length > 1 ? 'RECENTES' : 'RECENTE'

  function navigateToDetails(vavlues: NavigateToDetails) {
    push('details', vavlues)
  }

  return (
    <>
      <ListHeader.Root>
        <ListHeader.Title>MAIS {recent}</ListHeader.Title>
        <ListHeader.ItemsNumber>{mostRecentData.length}</ListHeader.ItemsNumber>
      </ListHeader.Root>

      <Div className="px-5">
        {mostRecentData.map((item) => (
          <Item.Root
            key={item.razao}
            onPress={() =>
              navigateToDetails({
                branchId: item.id,
                branchLocale: item.endereco.bairro,
                branchName: item.razao,
              })
            }
          >
            <Item.Image
              alt=""
              source={require('../../../assets/black-logo.png')}
            />

            <Item.Content>
              <Item.Title description={item.descricao}>{item.razao}</Item.Title>

              {/** <Item.Right>
                <Item.Until>
                  até R$ {`${item.price / 100}`.replace('.', ',')}
                </Item.Until>

                <Item.Cashback>
                  + R$ {`${item.cashback / 100}`.replace('.', ',')} cashback
                </Item.Cashback>
              </Item.Right> */}
            </Item.Content>
          </Item.Root>
        ))}
      </Div>
    </>
  )
}
