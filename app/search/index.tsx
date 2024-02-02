import {
  CaretRight,
  MagnifyingGlass,
  WarningOctagon,
  X,
} from 'phosphor-react-native'
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { red, zinc } from 'tailwindcss/colors'
import { useMMKVString } from 'react-native-mmkv'

import { useSearched } from '../../hooks/use-searched'
import { useRouter } from '../../hooks/use-router'

import { Item } from '../../components/item'
import { Svg } from '../../components/ui/svg'
import { P } from '../../components/ui/p'
import { Header } from '../../components/header'
import { Div } from '../../components/ui/div'
import { ListHeader } from '../../components/list-header'

import { api } from '../../lib/api'

import type { API } from '../../types/api'
import type { BranchDTO } from '../../types/dtos/branch-dto'
import { useToast } from 'react-native-toast-notifications'
import { NavigateToDetails } from '../../types/navigation-to-details'

const INITIAL_DATA_STATE = {
  content: [],
  empty: true,
  number: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
}

export function Search() {
  const [jwt] = useMMKVString('@zaalcashback:jwt')

  const { searched, setSearched, removeSearched } = useSearched()
  const { push } = useRouter()
  const { show } = useToast()

  const [value, onChangeText] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<API<BranchDTO>>(INITIAL_DATA_STATE)

  async function onChangeSearchState(oldSearchValue?: string) {
    if (oldSearchValue || value.length > 0) {
      Keyboard.dismiss()

      setIsLoading(true)

      await api
        .get(`filiais?filtro=${oldSearchValue || value}`, jwt)
        .then((response: API<BranchDTO>) => {
          if (!response.empty) {
            value.length > 0 && setSearched(value)

            setData(response)
          } else {
            show('Nenhum resultado encontrado!', {
              icon: <Svg component={WarningOctagon} />,
              style: { borderRadius: 12, paddingHorizontal: 20 },
            })

            onChangeText('')
          }
        })
        .catch(() => {
          show('Algo deu errado!', {
            icon: <Svg component={WarningOctagon} />,
          })
        })
        .finally(() => setIsLoading(false))
    }
  }

  function onCancelSearch() {
    setData(INITIAL_DATA_STATE)

    onChangeText('')
  }

  function navigateToDetails(values: NavigateToDetails) {
    push('details', values)
  }

  return (
    <>
      <Header.Root>
        <Header.Left>
          <Header.Back />
          <Header.Title>Pesquisa</Header.Title>
        </Header.Left>
      </Header.Root>

      <Div className="flex-row items-center space-x-5 px-5 h-16 z-50">
        <Div className="flex-row items-center space-x-2 border border-zinc-200 h-[50px] rounded-2xl flex-1 bg-zinc-50 pl-4 pr-1.5">
          <Svg component={MagnifyingGlass} size={16} weight="bold" />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Pesquise pelo nome da loja"
            autoFocus
            className="font-400 text-zinc-800 text-[13px] flex-1"
            placeholderTextColor={zinc[400]}
            onSubmitEditing={() => onChangeSearchState()}
          />
          <TouchableOpacity
            hitSlop={30}
            activeOpacity={0.8}
            className="items-center justify-center h-9 w-9 rounded-[12px] bg-zinc-800 ml-auto border-2 border-zinc-600"
            onPress={() =>
              data.content.length > 0 ? onCancelSearch() : onChangeSearchState()
            }
          >
            {isLoading ? (
              <ActivityIndicator size={14} color={zinc[900]} />
            ) : data.content.length > 0 ? (
              <Svg component={X} inverted size={14} weight="bold" />
            ) : (
              <Svg component={CaretRight} inverted size={14} weight="bold" />
            )}
          </TouchableOpacity>
        </Div>
      </Div>

      <ListHeader.Root>
        <ListHeader.Title>
          {data.empty ? 'PESQUISAS ANTERIORES' : 'RESULTADO DA PESQUISA'}
        </ListHeader.Title>

        <ListHeader.ItemsNumber>
          {data.empty ? null : data.totalElements}
        </ListHeader.ItemsNumber>
      </ListHeader.Root>

      {data.content.length === 0 ? (
        <>
          {searched.length > 0 ? (
            <FlatList
              data={searched}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 40,
              }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    onChangeSearchState(item)

                    onChangeText(item)
                  }}
                  className="flex-row items-center justify-between mb-6"
                >
                  <P className="font-400 text-zinc-400 text-[13px]">{item}</P>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    hitSlop={40}
                    onPress={() => removeSearched(item)}
                  >
                    <Svg
                      component={X}
                      color={red[500]}
                      weight="bold"
                      size={14}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Div className="flex-1 items-center justify-center">
              <P className="font-400 text-xs text-zinc-400">
                Você não fez nenhuma pesquisa ainda
              </P>
            </Div>
          )}
        </>
      ) : (
        <FlatList
          data={data.content}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Item.Root
              onPress={() =>
                navigateToDetails({
                  branchId: item.id,
                  branchName: item.razao,
                  branchLocale: item.endereco.bairro,
                })
              }
            >
              <Item.Image
                alt=""
                source={require('../../assets/stores/lumman.png')}
              />

              <Item.Content>
                <Item.Title description={item.descricao}>
                  {item.razao}
                </Item.Title>

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
          )}
        />
      )}
    </>
  )
}
