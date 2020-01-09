

class Conversions {
  constructor(){
    this.cashDictionary = {}
    this.cashValueArray = []
    this.cashKeyArray = []
  }

  cashArray(moneyInCash){
    for (let i = 0; i < moneyInCash.length; i++){
        this.cashDictionary[moneyInCash[i][FIRST_ARRAY_INDEX]] = moneyInCash[i][1]
        this.cashKeyArray.push(moneyInCash[i][FIRST_ARRAY_INDEX])
        this.cashValueArray.push(moneyInCash[i][SECOND_ARRAY_INDEX])
    }
    return [this.cashKeyArray, this.cashValueArray]
  }

  returnKeysArray(){
    return this.cashKeyArray
  }

  returnValuesArray(){
    return this.cashValueArray
  }

}