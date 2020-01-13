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
        const amountMoneyInCashRegister = newMoneyOperation.amountMoneyInCashRegister(moneyInCash)
        
        newMoneyOperation.putsMoneyInCashIfThereIsNot(moneyInCash)
        this.cashConvert(moneyInCash)
   
        return this.thereIsChangeEnought(amountMoneyInCashRegister, moneyReturn)
    }

    cashConvert(moneyInCash) {
        const newConversions = new Conversions()

        const moneyInCashToArraysConversion = newConversions.cashArray(moneyInCash)

        this.cashKeyArray = moneyInCashToArraysConversion[FIRST_ARRAY_INDEX]
        this.cashValueArray = moneyInCashToArraysConversion[SECOND_ARRAY_INDEX]
    }

    returnChange(status, change){
        this.actual_state.status = status
        this.actual_state.change = change

        return this.actual_state
    }

    thereIsChangeEnought(amountMoneyInCashRegister, moneyReturn){
        const notEnoughtMoneyInCash = amountMoneyInCashRegister < moneyReturn
        if (notEnoughtMoneyInCash){return NOT_ENOUGHT_MONEY_IN_CASH}


        const changeDict = this.change(moneyReturn)

        return this.returnChange ("OPEN", changeDict)    
    }

    timesSingleCoin(singleCoin, totalChange){
        return totalChange/singleCoin
    }

    change(moneyReturn){
        const reverseCashValueArray = this.cashValueArray.reverse()
        return this.countEachCoin(reverseCashValueArray, moneyReturn)        
    }

    countEachCoin(reverseCashValueArray, moneyReturn){
        const reverseCashKeyArray = this.cashKeyArray.reverse()
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
        const newMoneyOperation = new MoneyOperations()

        if (actualCoinPrice <= moneyReturn) {
            moneyReturn = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
            this.addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice)
        }
        return moneyReturn
    }

    addEachAmonutEachCoinKind(reverseCashKeyArray, count, actualCoinPrice) {
        this.changeToReturn.push([reverseCashKeyArray[count], this.currentCoinAmount * actualCoinPrice])
    }

    returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn){
        const newMoneyOperation = new MoneyOperations()

        while (newMoneyOperation.testThereAreCoinsAndResult(moneyReturn, actualCoinAmount, actualCoinPrice)){
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
}


    
    

    