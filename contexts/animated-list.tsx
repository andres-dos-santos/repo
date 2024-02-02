import { Dispatch, SetStateAction, createContext } from 'react'

interface Announcement {
  description: string
  image: any
}

interface AnimatedListContextProps {
  setIndex: Dispatch<SetStateAction<number>>
  index: number
  scrollX: any
  data: Announcement[]
}

export const AnimatedListContext = createContext({} as AnimatedListContextProps)
