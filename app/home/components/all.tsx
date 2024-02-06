import { ActivityIndicator, Dimensions, FlatList } from 'react-native'

import { P } from '../../../components/ui/p'
import { Touchable } from '../../../components/ui/touchable'
import { Div } from '../../../components/ui/div'
import { ListHeader } from '../../../components/list-header'

import { BranchImage } from './branch-image'

import { useRouter } from '../../../hooks/use-router'
import { useFetch } from '../../../hooks/use-fetch'

import type { API } from '../../../types/api'
import type { BranchDTO } from '../../../types/dtos/branch-dto'
import type { NavigateToDetails } from '../../../types/navigation-to-details'
import { StatusBar } from 'expo-status-bar'

export function All() {
  const { push } = useRouter()

  const { data, isLoading } = useFetch<API<BranchDTO>>(
    'load-all-branches-query',
    'filiais',
  )

  function navigateToDetails(values: NavigateToDetails) {
    push('details', values)
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#305A96" />

      <ListHeader.Root>
        <ListHeader.Title>
          TODOS{' '}
          <P className="text-xs font-500 text-zinc-700 -tracking-wide">
            • Sugestões para você
          </P>{' '}
        </ListHeader.Title>
        <ListHeader.ItemsNumber>
          {data ? data.totalElements : 0}
        </ListHeader.ItemsNumber>
      </ListHeader.Root>

      {data ? (
        <FlatList
          data={data.content}
          keyExtractor={(item) => item.razao}
          contentContainerStyle={{ paddingHorizontal: 28 }}
          renderItem={({ item }) => (
            <Touchable
              onPress={() =>
                navigateToDetails({
                  branchId: item.id,
                  branchName: item.razao,
                  branchLocale: item.endereco.bairro,
                })
              }
              className="flex-row items-center mb-5"
            >
              <Div className="mr-5 w-[55px] h-[55px] rounded-full border items-center justify-center border-zinc-200 bg-zinc-100 p-2.5">
                <BranchImage id={item.id} />

                {/** {item.image ? null : <Svg component={Storefront} size={16} />} */}
              </Div>

              <Div className="flex-1 flex-row items-center justify-between">
                <Div>
                  <P className="font-500 -tracking-wide text-[15px]">
                    {item.razao}
                  </P>
                  <P className="text-zinc-500 font-400 text-xs mt-0.5 -tracking-wide">
                    {item.descricao}
                  </P>
                </Div>
              </Div>
            </Touchable>
          )}
        />
      ) : isLoading ? (
        <Div
          className="px-5 items-center justify-center"
          style={{ height: Dimensions.get('screen').height / 2 }}
        >
          <ActivityIndicator size={14} color="#305A96" />
        </Div>
      ) : (
        <Div
          className="px-5 items-center justify-center"
          style={{ height: Dimensions.get('screen').height / 2 }}
        >
          <P className="font-400 text-xs text-zinc-400">
            Ainda não temos anúncios para você.
          </P>
        </Div>
      )}
    </>
  )
}
