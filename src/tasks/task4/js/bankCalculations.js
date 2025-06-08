const FEE_RATE = 0.03
const USD_RATE = 42.1
const EUR_RATE = 43.39
const MIN_BALANCE = 100

export const calculateBalances = balance => ({
  uah: Number(balance.toFixed(2)),
  usd: Number((balance / USD_RATE).toFixed(2)),
  eur: Number((balance / EUR_RATE).toFixed(2)),
})

export const calculateFee = amount => Number((amount * FEE_RATE).toFixed(2))

export const canWithdraw = (amount, balance) => {
  const fee = calculateFee(amount)
  return amount + fee <= balance
}

export const executeTransaction = (balance, amount, isDeposit) => {
  const fee = calculateFee(amount)
  return isDeposit ? balance + amount - fee : balance - amount - fee
}

export const getBalanceColor = lastTransaction =>
  lastTransaction === null ? '' : lastTransaction ? 'positive' : 'negative'

export const getCurrencyColor = amount =>
  amount >= MIN_BALANCE ? 'positive' : 'negative'
