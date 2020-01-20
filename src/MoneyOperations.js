class MoneyOperations
{
  constructor ()
  {
    this.changeToReturn = []
    this.currentCoinAmount = 0
  }
  workingTest(){
    return 'money operations is working'
  }

  moneyReturn(cash, price){
    return cash - price
  }

  moneyInCash(moneyInCash){
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

  substractFromReturnAmount(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count)
  {
    if (actualCoinPrice <= moneyReturn) {
      moneyReturn = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
      this.addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice)
    }
    return moneyReturn
  }

  addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice) {
    this.changeToReturn.push([reverseCashKeyArray[count], this.currentCoinAmount * actualCoinPrice])
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
    const notValidCoin = this.actualCoinBiggerThanMoneyToReturn(moneyReturn, actualCoinPrice)
    const hasEnoughMoney = this.actualCoinAmountBiggerThanActualCoinPrice(actualCoinAmount, actualCoinPrice)
    
    return !(thereIsMoney || notValidCoin || hasEnoughMoney)
  }

  thereIsStillMoneyToReturn(moneyReturn)
  {
    return moneyReturn <= 0
  }

  actualCoinBiggerThanMoneyToReturn(moneyReturn, actualCoinPrice)
  {
    return moneyReturn < actualCoinPrice
  }

  actualCoinAmountBiggerThanActualCoinPrice(actualCoinAmount, actualCoinPrice)
  {
    return actualCoinAmount < actualCoinPrice
  }

  isThereMoreMoneyThanCoin(moneyReturn, reverseCashValueArray, actualCoinAmount, reverseCashKeyArray){
    for (let count=0; count<=reverseCashValueArray.length; count++){
      var actualCoinAmount = reverseCashValueArray[count]
      var actualCoinPrice = COINPRICE[count]
      this.currentCoinAmount = 0
      moneyReturn = this.substractFromReturnAmount(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count)   
    }
  }

  substractFromReturnAmount(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count) {
    moneyReturn = this.enouthMoneyReturnForSubstractActualCoinPrice(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count)
    return moneyReturn
  }

  enouthMoneyReturnForSubstractActualCoinPrice(actualCoinPrice, moneyReturn, actualCoinAmount, reverseCashKeyArray, count) {
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
    this.addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice)
    return moneyReturn
  }

  timesSubstractedActualCoinAndRest(actualCoinPrice, actualCoinAmount, moneyReturn){
    const newMoneyOperation = new MoneyOperations()
    const timesSubstractedActualCoinAndRest = newMoneyOperation.returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
    moneyReturn = timesSubstractedActualCoinAndRest[0]
    this.currentCoinAmount = timesSubstractedActualCoinAndRest[1]
    return moneyReturn
  }

  addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice){
    this.changeToReturn.push([reverseCashKeyArray[count], this.currentCoinAmount * actualCoinPrice])
  }


  
}