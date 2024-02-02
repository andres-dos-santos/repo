export interface BranchDTO {
  id: number
  razao: string
  descricao: string
  categoria: string
  endereco: {
    cep: string
    bairro: string
    numero: string
    complemento: string
    logradouro: string
    cidadeNome: string
    uf: string
    paisNome: string
  }
}
