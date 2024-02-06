import { ReactNode, createContext, useEffect, useState } from 'react'

import { useFetch } from '../../../hooks/use-fetch'

import type { AnnouncementDTO } from '../../../types/dtos/announcement-dto'

type Ads = AnnouncementDTO & { imageURI?: string }

type DataContextType = {
  data: Ads[]

  setContent(content: Ads): void
  content: Ads
}

type Props = { children: ReactNode; branchId: number }

export const DataContext = createContext({} as DataContextType)

export function DataProvider(props: Props) {
  const [ads, setAds] = useState<Ads[]>([])

  const { data } = useFetch<AnnouncementDTO[]>(
    'load-all-announcements-query',
    `anuncios?filialId=${props.branchId}`,
  )

  const [content, setContent] = useState<Ads | null>(null)

  useEffect(() => {
    data && data.length > 0 && setAds(data)
  }, [data])

  return (
    <DataContext.Provider value={{ data: ads, content, setContent }}>
      {props.children}
    </DataContext.Provider>
  )
}
