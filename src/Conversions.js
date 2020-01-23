
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
    const moneyInCashToArraysConversion = newConversions.cashCoinAndQuantity(moneyInCash)
    
    this.cashKeyArray = moneyInCashToArraysConversion[FIRST_ARRAY_INDEX]
    this.cashValueArray = moneyInCashToArraysConversion[SECOND_ARRAY_INDEX]
    this.reverseCashValueArray = this.cashValueArray.reverse()
    this.reverseCashKeyArray = this.cashKeyArray.reverse()
    return [this.cashKeyArray, this.cashValueArray, this.reverseCashKeyArray, this.reverseCashValueArray]
  }

  cashCoinAndQuantity(moneyInCash){
    for (let i = 0; i < moneyInCash.length; i++){
        this.cashDictionary[moneyInCash[i][FIRST_ARRAY_INDEX]] = moneyInCash[i][1]
        this.divideCoinAndQuantity(this.cashKeyArray, FIRST_ARRAY_INDEX, moneyInCash, i)
        this.divideCoinAndQuantity(this.cashValueArray, SECOND_ARRAY_INDEX, moneyInCash, i)
    }
    return [this.cashKeyArray, this.cashValueArray]
  }

  divideCoinAndQuantity(elementKind, savingSpace, moneyInCash, i){
    elementKind.push(moneyInCash[i][savingSpace])
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