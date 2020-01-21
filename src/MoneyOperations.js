class MoneyOperations
{
  constructor ()
  {
    this.changeToReturn = []
    this.currentCoinAmount = 0
  }

  calculatesTheMoneyToReturn(cash, price){
    return cash - price
  }

  returnsTheMoneyInCash(moneyInCash){
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

  isThereChangeEnought(amountMoneyInCashRegister, moneyReturn){
    const notEnoughtMoneyInCash = amountMoneyInCashRegister < moneyReturn
    if (notEnoughtMoneyInCash){return NOT_ENOUGHT_MONEY_IN_CASH}
    
    return true
  }
  
  countEachCoinAmount(reverseCashValueArray, moneyReturn, reverseCashKeyArray){
    this.isThereMoreMoneyThanActualCoin(reverseCashValueArray, moneyReturn, reverseCashKeyArray)

    return this.changeToReturn
  }

  isThereMoreMoneyThanActualCoin(reverseCashValueArray, moneyReturn, reverseCashKeyArray){
    for (let count=0; count<=reverseCashValueArray.length; count++){
      var actualCoinAmount = reverseCashValueArray[count]
      var actualCoinPrice = COINPRICE[count]
      this.currentCoinAmount = 0
      moneyReturn = this.substractFromMoneyReturn(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count)   
    }
      return this.changeToReturn        
  }

  addCointypeAndPrice(keyList, coinAndQuantity)
  {
    keyList.push(coinAndQuantity)
    return keyList
  }

  returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn){
    while (this.testThereAreCoinsAndResult(moneyReturn, actualCoinAmount, actualCoinPrice)){
      moneyReturn = moneyReturn.toFixed(2)
      moneyReturn -= actualCoinPrice
      actualCoinAmount -= actualCoinPrice
      this.currentCoinAmount += 1
    }
    return [moneyReturn, this.currentCoinAmount]
}

  testThereAreCoinsAndResult(moneyReturn, actualCoinAmount, actualCoinPrice){
    const thereIsMoney = this.thereIsStillMoneyToReturn (moneyReturn)
    const notValidCoin = this.isActualCoinBiggerThanMoneyToReturn(moneyReturn, actualCoinPrice)
    const hasEnoughMoney = this.isActualCoinAmountBiggerThanActualCoinPrice(actualCoinAmount, actualCoinPrice)
    
    return !(thereIsMoney || notValidCoin || hasEnoughMoney)
  }

  thereIsStillMoneyToReturn(moneyReturn)
  {
    return moneyReturn <= 0
  }

  isActualCoinBiggerThanMoneyToReturn(moneyReturn, actualCoinPrice)
  {
    return moneyReturn < actualCoinPrice
  }

  isActualCoinAmountBiggerThanActualCoinPrice(actualCoinAmount, actualCoinPrice)
  {
    return actualCoinAmount < actualCoinPrice
  }

  substractFromMoneyReturn(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count) {
    moneyReturn = this.isThereEnouthMoneyReturnForSubstractActualCoinPrice(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count)
    return moneyReturn
  }

  isThereEnouthMoneyReturnForSubstractActualCoinPrice(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count) {
    if (this.isActualCoinPriceSmallerThanTheMoneyReturn(actualCoinPrice, moneyReturn)){
      moneyReturn = this.substractThisCoinPriceFromMoneyReturn(actualCoinPrice, actualCoinAmount, moneyReturn, reverseCashKeyArray, count)
    }
    return moneyReturn
  }

  isActualCoinPriceSmallerThanTheMoneyReturn(actualCoinPrice, moneyReturn) {
    return actualCoinPrice <= moneyReturn
  }

  substractThisCoinPriceFromMoneyReturn(actualCoinPrice, actualCoinAmount, moneyReturn, reverseCashKeyArray, count) {
    moneyReturn = this.timesSubstractedActualCoinAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
    this.addCoinToChangeToReturn(reverseCashKeyArray, count, actualCoinPrice)
    return moneyReturn
  }

  timesSubstractedActualCoinAndRest(actualCoinPrice, actualCoinAmount, moneyReturn){
    const newMoneyOperation = new MoneyOperations()

    const timesSubstractedActualCoinAndRest = newMoneyOperation.returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
   
    this.currentCoinAmount = timesSubstractedActualCoinAndRest[1]
    return moneyReturn = timesSubstractedActualCoinAndRest[0]
  }

  addCoinToChangeToReturn(reverseCashKeyArray, count, actualCoinPrice){
    this.changeToReturn.push([reverseCashKeyArray[count], this.currentCoinAmount * actualCoinPrice])
  }

  notEnoughtMoneyInCash(amountMoneyInCashRegister, moneyReturn){
    return amountMoneyInCashRegister < moneyReturn
  }

  changeOperate(reverseCashValueArray, moneyReturn, reverseCashKeyArray){
    const newMoneyOperation = new MoneyOperations()

    return newMoneyOperation.countEachCoinAmount(reverseCashValueArray, moneyReturn, reverseCashKeyArray)        
  }
}