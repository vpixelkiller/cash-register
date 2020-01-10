class MoneyOperations{
  constructor (){
        this.changeToReturn = []
  }
  workingTest(){
    return 'money operations is working'
  }
  moneyReturn(cash, price){
    return cash - price
  }
  amountMoneyInCashRegister(moneyInCash){
    const resultArray = 0
    
    if (!moneyInCash){return resultArray}
    return this.sumsMoneyInCash(moneyInCash, resultArray)
  }

  sumsMoneyInCash(moneyInCash, resultArray){
    for (let i = 0; i < moneyInCash.length; i++){
        resultArray += moneyInCash[i][1]
    }
    return resultArray
  } 

  putsMoneyInCashIfThereIsNot(moneyInCash) {
      const notmoneyInCash = !moneyInCash

      if (notmoneyInCash) {moneyInCash = []}
      
      return moneyInCash
  }

  thereIsChangeEnought(amountMoneyInCashRegister, moneyReturn){
    const notEnoughtMoneyInCash = amountMoneyInCashRegister < moneyReturn
    if (notEnoughtMoneyInCash){return NOT_ENOUGHT_MONEY_IN_CASH}
    
    return true
  }
  
  change(moneyReturn, cashValueArray, cashKeyArray){
    const reverseCashValueArray = cashValueArray.reverse()
    const reverseCashKeyArray = cashKeyArray.reverse()

    return this.countEachCoin(reverseCashValueArray, moneyReturn, reverseCashKeyArray)        
  }
  
  returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn){
    while (this.testThereAreCoinsAndResult(moneyReturn, actualCoinAmount, actualCoinPrice)){
      moneyReturn = moneyReturn.toFixed(2)
      moneyReturn -= actualCoinPrice
      actualCoinAmount -= actualCoinPrice
      this.currentCoinAmount += 1
    }
    return moneyReturn
  }
  
  testThereAreCoinsAndResult(moneyReturn, actualCoinAmount, actualCoinPrice){
    if (moneyReturn < 0 || moneyReturn < actualCoinPrice || actualCoinAmount < actualCoinPrice) {
        return false
    } 
    return true
  }

  countEachCoin(reverseCashValueArray, moneyReturn, reverseCashKeyArray){
    this.moreMoneyThanCoin(reverseCashValueArray, moneyReturn, reverseCashKeyArray)

    return this.changeToReturn
}

  moreMoneyThanCoin(reverseCashValueArray, moneyReturn, reverseCashKeyArray){
      for (let count=0; count<=reverseCashValueArray.length; count++){
          var actualCoinAmount = reverseCashValueArray[count]
          var actualCoinPrice = COINPRICE[count]
          this.currentCoinAmount = 0
          moneyReturn = this.substractFromReturnAmount(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count)   
      }
      return this.changeToReturn        
  }

  substractFromReturnAmount(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count) {
    if (actualCoinPrice <= moneyReturn) {
        moneyReturn = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
        this.addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice)
    }
    return moneyReturn
  }


  addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice) {
    this.changeToReturn.push([reverseCashKeyArray[count], this.currentCoinAmount * actualCoinPrice])
  }
}