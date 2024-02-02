export interface SignInResponse {
  token: string
  usuarioDTO: {
    cpf: string
    email: string
    id: number
    nome: string
    saldo: number
  }
}
