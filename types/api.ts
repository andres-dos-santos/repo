export interface API<D> {
  content: D[]
  totalElements: number
  totalPages: number
  empty: boolean
  number: number
  size: number
}
