import { useContext } from 'react'

import { Div } from '../../../components/ui/div'
import { P } from '../../../components/ui/p'
import { Item } from '../../../components/item'

import { AnnouncementContext } from '../../../contexts/announcement'

import { useRouter } from '../../../hooks/use-router'
import { NavigateToDetails } from '../../../types/navigation-to-details'
import { ListHeader } from '../../../components/list-header'

export function HighestReturn() {
  const { highestReturnData } = useContext(AnnouncementContext)

  const { push } = useRouter()

  function navigateToDetails(values: NavigateToDetails) {
    push('details', values)
  }

  return (
    <>
      <ListHeader.Root>
        <ListHeader.Title>MAIOR RETORNO</ListHeader.Title>
        <ListHeader.ItemsNumber>
          {highestReturnData.length}
        </ListHeader.ItemsNumber>
      </ListHeader.Root>

      <Div className="px-5">
        {highestReturnData.map((item) => (
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
              source={require('../../../assets/stores/soleneve.png')}
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
