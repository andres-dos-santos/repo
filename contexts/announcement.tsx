import { ReactNode, createContext, useState } from 'react'

import type { BranchDTO } from '../types/dtos/branch-dto'

export interface FAKE_Announcement extends BranchDTO {
  image: string
}

interface AnnouncementContextData {
  mostRecentData: FAKE_Announcement[]
  highestReturnData: FAKE_Announcement[]
  fullData: FAKE_Announcement[]
}

export const FAKE_DATA: FAKE_Announcement[] = [
  {
    razao: 'Zaal Loja Shopping',
    descricao: 'Tecnologia e computadores',
    categoria: 'Tecnologia e computadores',
    endereco: {
      bairro: 'Centro',
      cep: '23400500',
      cidadeNome: 'Três Rios',
      complemento: 'Centro',
      logradouro: '',
      numero: '23',
      paisNome: 'Brasil',
      uf: 'RJ',
    },
    id: 12,
    // price: 1234,
    // cashback: 89,
    image: '../assets/black-logo.png',
  },
  {
    razao: 'Sol e Neve',
    descricao: 'Doces e sorvetes',
    categoria: 'Tecnologia e computadores',
    endereco: {
      bairro: 'Centro',
      cep: '23400500',
      cidadeNome: 'Três Rios',
      complemento: 'Centro',
      logradouro: '',
      numero: '23',
      paisNome: 'Brasil',
      uf: 'RJ',
    },
    id: 11,
    // price: 1234,
    // cashback: 89,
    image: '../assets/stores/soleneve.png',
  },
  {
    razao: 'Shop15',
    descricao: 'Roupas e calçados',
    categoria: 'Tecnologia e computadores',
    endereco: {
      bairro: 'Centro',
      cep: '23400500',
      cidadeNome: 'Três Rios',
      complemento: 'Centro',
      logradouro: '',
      numero: '23',
      paisNome: 'Brasil',
      uf: 'RJ',
    },
    id: 17,
    // price: 1234,
    // cashback: 89,
    image: '../assets/stores/shop15.png',
  },
  {
    razao: 'Lumman',
    descricao: 'Roupas e calçados',
    categoria: 'Tecnologia e computadores',
    endereco: {
      bairro: 'Centro',
      cep: '23400500',
      cidadeNome: 'Três Rios',
      complemento: 'Centro',
      logradouro: '',
      numero: '23',
      paisNome: 'Brasil',
      uf: 'RJ',
    },
    id: 89,
    // price: 1234,
    // cashback: 89,
    image: '../assets/stores/lumman.png',
  },
]

export const AnnouncementContext = createContext({} as AnnouncementContextData)

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  // const toast = useToast()

  const [announcements] = useState<AnnouncementContextData>({
    fullData: FAKE_DATA,
    highestReturnData: [FAKE_DATA[1]],
    mostRecentData: [FAKE_DATA[0]],
  })

  /** useEffect(() => {
    // const testURL = 'https://edbe-138-59-121-98.ngrok-free.app/api/v1/anuncios?filialId=1'

    try {
      fetch('http://localhost:3000/announcements')
        .then((response) => response.json())
        .then((data) => {
          const mostRecentData = [data[0]]
          const highestReturnData = [data[1]]
          const fullData = data

          setAnnouncements({ mostRecentData, highestReturnData, fullData })
        })
    } catch (error) {
      toast.show('Não encontramos os anúncios.')
    }
  }, [toast]) */

  return (
    <AnnouncementContext.Provider value={{ ...announcements }}>
      {children}
    </AnnouncementContext.Provider>
  )
}
