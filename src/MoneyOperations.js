class MoneyOperations{
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


}