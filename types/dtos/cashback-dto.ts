export interface CashbackDTO {
  id: number
  descricao: string
  dia: string
  filialNome: string
  formaPagamento: 'CREDITO' | 'DEBITO'
  valor: number
  filialId: number
}
