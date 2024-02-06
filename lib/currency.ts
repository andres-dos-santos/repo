import { formatCurrency } from 'react-native-format-currency'

export function currency(amount: number) {
  const [_, value, value2] = formatCurrency({
    amount,
    code: 'BRL',
  })

  if (String(amount).includes('.')) {
    return `R$ ${value}`
  } else {
    return `R$ ${value},00`
  }
}
