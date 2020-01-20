

class Conversions {
  constructor(){
    this.cashDictionary = {}
    this.cashValueArray = []
    this.cashKeyArray = []
    this.reverseCashValueArray = []
    this.reverseCashKeyArray = []

  }

  cashConvert(moneyInCash) {
      const newConversions = new Conversions()
      const moneyInCashToArraysConversion = newConversions.cashArray(moneyInCash)
      
      this.cashKeyArray = moneyInCashToArraysConversion[FIRST_ARRAY_INDEX]
      this.cashValueArray = moneyInCashToArraysConversion[SECOND_ARRAY_INDEX]
      this.reverseCashValueArray = this.cashValueArray.reverse()
      this.reverseCashKeyArray = this.cashKeyArray.reverse()
      return [this.cashKeyArray, this.cashValueArray, this.reverseCashKeyArray, this.reverseCashValueArray]
  }

  cashArray(moneyInCash){
    for (let i = 0; i < moneyInCash.length; i++){
        this.cashDictionary[moneyInCash[i][FIRST_ARRAY_INDEX]] = moneyInCash[i][1]
        this.cashKeyArray.push(moneyInCash[i][FIRST_ARRAY_INDEX])
        this.cashValueArray.push(moneyInCash[i][SECOND_ARRAY_INDEX])
    }
    return [this.cashKeyArray, this.cashValueArray]
  }

  reverseArray(array){
    return array.reverse()
  }


  returnKeysArray(){
    return this.cashKeyArray
  }

  returnValuesArray(){
    return this.cashValueArray
  }

  sumsMoneyInCash(moneyInCash, resultArray){
    for (let i = 0; i < moneyInCash.length; i++){
        resultArray += moneyInCash[i][1]
    }
    return resultArray
  }
}