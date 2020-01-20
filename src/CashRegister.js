const SECOND_ARRAY_INDEX = 1
const FIRST_ARRAY_INDEX = 0
const COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
const NOT_ENOUGHT_MONEY_IN_CASH = { status: "INSUFFICIENT_FUNDS", change: [] }

class CashRegister{
    constructor(){
        this.actual_state =  {status: "OPEN", change: [["QUARTER", 0.5]]}
        this.cashValueArray = []
        this.cashKeyArray = []
        this.reverseCashValueArray = []
        this.reverseCashKeyArray = []
        this.currentCoinAmount = 0
        this.changeToReturn = []
    }

    execute(price, cash, moneyInCash){
        const newMoneyOperation = new MoneyOperations()
        
        const moneyReturn = newMoneyOperation.moneyReturn(cash, price) 
        const moneyInTheCash = newMoneyOperation.amountMoneyInCashRegister(moneyInCash)
        
        newMoneyOperation.putsMoneyInCashIfThereIsNot(moneyInCash)
        this.organiceTheMoney(moneyInCash)
        
        return this.thereIsChangeEnought(moneyInTheCash, moneyReturn)
    }
    
    // Private
            
    organiceTheMoney(moneyInCash) {
        const newConversions = new Conversions()
        const organizationArrays = newConversions.cashConvert(moneyInCash)

        this.cashKeyArray = organizationArrays [0]
        this.cashValueArray = organizationArrays [1]
        this.reverseCashKeyArray = organizationArrays [2]
        this.reverseCashValueArray = organizationArrays [3]
    }

    returnChange(status, change){
        this.actual_state.status = status
        this.actual_state.change = change

        return this.actual_state
    }

    thereIsChangeEnought(amountMoneyInCashRegister, moneyReturn){
        const notEnoughtMoneyInCash = amountMoneyInCashRegister < moneyReturn
        const changeDict = this.change(moneyReturn)
      
        if (notEnoughtMoneyInCash){return NOT_ENOUGHT_MONEY_IN_CASH}

        return this.returnChange ("OPEN", changeDict)    
    }

    timesSingleCoin(singleCoin, totalChange){
        return totalChange/singleCoin
    }

    change(moneyReturn){
        return this.countEachCoin(moneyReturn)        
    }

    countEachCoin(moneyReturn){
        this.moreMoneyThanCoin(this.reverseCashValueArray, moneyReturn, this.reverseCashKeyArray)

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


    
    

    