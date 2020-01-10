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

  it('returns how many coins of a value there are, with a given amount of money', ()=>{
    const actualCash = new CashRegister()
    const singleCoin = 0.01
    const totalChange = 0.5
    const expectedResult = 50

    const timesSingleCoin = actualCash.timesSingleCoin(singleCoin, totalChange)

    expect(timesSingleCoin).toEqual(expectedResult)
  })

  it('check if there is enought money in the chash for return the given change', ()=>{
    const actualCash = new CashRegister()
    const moneyInCashRegister = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const expectedResult = 0
    
    const sendActualTransaction = actualCash.amountMoneyInCashRegister(moneyInCashRegister)

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


describe('Money operations group', ()=>{
  it('Test connection', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const expectedResult = "money operations is working"

    const sendActualTransaction = newMoneyOperation.workingTest()

    expect(sendActualTransaction).toEqual(expectedResult)
  })

  it('returns the amount of money to return', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const price = 3.26
    const cash = 100
    const expectedResult = cash - price 

    const sendActualTransaction = newMoneyOperation.moneyReturn(cash, price)

    expect(sendActualTransaction).toEqual(expectedResult)
  })

  it('returns the amount money in cash', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const moneyInCash = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const expectedResult = 335.40999999999997

    const sendActualTransaction = newMoneyOperation.amountMoneyInCashRegister(moneyInCash)

    expect(sendActualTransaction).toEqual(expectedResult)


  })

  it('converts the dictionary in arrays', ()=>{
    const newMoneyOperation = new Conversions()
    const moneyInCash = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const keysArray = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"]
    const valuesArray = [1.01, 2.05, 3.1, 4.25, 90, 55, 20, 60, 100]
    const conversionsKeysArray = newMoneyOperation.returnKeysArray()
    const conversionsValuesArray = newMoneyOperation.returnValuesArray()
    const expectedResult = [keysArray, valuesArray]
    const receivedTransaction = [conversionsKeysArray, conversionsValuesArray]

    newMoneyOperation.cashArray(moneyInCash)

    expect(expectedResult).toEqual(receivedTransaction)
  })

  it('returns true if there is change enought', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const moneyInCash = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
    const moneyReturn = 233
    const moneyInCashRegister = newMoneyOperation.amountMoneyInCashRegister(moneyInCash)
    const receivedTransaction = newMoneyOperation.thereIsChangeEnought(moneyInCashRegister, moneyReturn)

    expect(true).toEqual(receivedTransaction)
  })

  it('returns the change', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const valuesArray = [1.01, 2.05, 3.1, 4.25, 90, 55, 20, 60, 100]
    const keysArray = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"]
    const moneyReturn = 233

    const kko = newMoneyOperation.change(moneyReturn, valuesArray, keysArray)
  })

})