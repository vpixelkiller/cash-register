describe ('cashRegister_test',()=>{
 it('returns the expected result with the given values',()=>{
    const price = 19.5
    const paymentCoin = 20
    const moneyInCashRegister = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const expectedResult = {status: "OPEN", change: [["QUARTER", 0.5]]}
    const actualCash = new CashRegister()

    const returnChange = actualCash.execute(price, paymentCoin, moneyInCashRegister)

    expect(returnChange).toEqual(expectedResult)
  })

  it('check if there is enought money in the chash for return the given change', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const moneyInCashRegister = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const expectedResult = 0
    
    const sendActualTransaction = newMoneyOperation.returnsTheMoneyInCash(moneyInCashRegister)

    expect(sendActualTransaction).toBeGreaterThan(expectedResult)
  })

  it('returns an error if it doesnt has enought founds for change', ()=> {
    const price = 19.5
    const paymentCoin = 500
    const moneyInCashRegister = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const expectedResult = {status: "INSUFFICIENT_FUNDS", change: []}
    const actualCash = new CashRegister()

    const sendActualTransaction = actualCash.execute(price, paymentCoin, moneyInCashRegister)

    expect(sendActualTransaction).toEqual(expectedResult)
  })

  it('returns the correct change and the cash status "OPEN"', ()=> {
    const price = 3.26
    const paymentCoin = 100
    const moneyInCashRegister = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const expectedResult = {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
    const actualCash = new CashRegister()

    const sendActualTransaction = actualCash.execute(price, paymentCoin, moneyInCashRegister)

    expect(sendActualTransaction).toEqual(expectedResult)
  })
})


