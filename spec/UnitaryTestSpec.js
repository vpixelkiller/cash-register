describe('Unitary test specs', ()=>{
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

  it('returns reversed the array sent',()=>{
    const newConversions = new Conversions()
    const valuesArray = [1.01, 2.05, 3.1, 4.25, 90, 55, 20, 60, 100]
    const keysArray = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"]
    const expectedKeyResult = keysArray.reverse()
    const expectedValueResult = valuesArray.reverse()

    const sentKeyTransaction = newConversions.reverseArray(keysArray)
    const sentValueTransaction = newConversions.reverseArray(valuesArray)

    expect(expectedKeyResult).toEqual(sentKeyTransaction)
    expect(expectedValueResult).toEqual(sentValueTransaction)
  })

  it('returns the amount to return for each coin', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const coinAndQuantity = ["FIVE", 50]
    const sendableEmptyReturn = []
    const sendableFullReturn = [["TWENTY", 60], ["TEN", 20]]
    const expectedEmptyArray = [coinAndQuantity]
    const expectedFullArray = [["TWENTY", 60], ["TEN", 20], ["FIVE", 50]]
    
    const emptyArrayTransaction = newMoneyOperation.addCointypeAndPrice(sendableEmptyReturn, coinAndQuantity)
    const fullArrayTransaction = newMoneyOperation.addCointypeAndPrice(sendableFullReturn, coinAndQuantity)
    
    expect(expectedEmptyArray).toEqual(emptyArrayTransaction)
    expect(expectedFullArray).toEqual(fullArrayTransaction)

  })

  it('there is money to return yet', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const expectedResult = false
    const expectedResultNeeded = true
    const moneyReturn = 0
    const moneyReturnNeeded = 1

    const NotMoneyToReturn = newMoneyOperation.thereIsMoneyToReturnYet(moneyReturn)
    const MoneyToReturn = newMoneyOperation.thereIsMoneyToReturnYet(moneyReturnNeeded )

    console.log('not: ' + NotMoneyToReturn, ' yes: ' + MoneyToReturn)
    expect (expectedResult).toEqual(NotMoneyToReturn)
    expect (expectedResultNeeded).toEqual(MoneyToReturn)
  })

  it('there is more money to return than actual coin', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const expectedResult = false
    const expectedResultBigger = true
    const moneyReturn = 1
    const moneyReturnBigger = 0.5
    const actualCoinPrice = 2

    const returnTransaction = newMoneyOperation.actualCoinBiggerThanMoneyToReturn(moneyReturn, actualCoinPrice)
    const returnTransactionBigger = newMoneyOperation.actualCoinBiggerThanMoneyToReturn(moneyReturn, moneyReturnBigger)

    expect (expectedResult).toEqual(returnTransaction)
    expect (expectedResultBigger).toEqual(returnTransactionBigger)
  })

  it('there is actual coin amount to substract this coin price', ()=>{
    const newMoneyOperation = new MoneyOperations()
    const expectedResult = false
    const actualCoinAmount = 0.5
    const actualCoinPrice = 2

    const returnTransaction = newMoneyOperation.actualCoinAmountBiggerThanActualCoinPrice(actualCoinAmount, actualCoinPrice)

    expect (expectedResult).toEqual(returnTransaction)
  })

})