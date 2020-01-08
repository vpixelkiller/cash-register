const SECOND_ARRAY_INDEX = 1
const FIRST_ARRAY_INDEX = 0
const COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
const NOT_ENOUGHT_MONEY_IN_CASH = { status: "INSUFFICIENT_FUNDS", change: [] }

class cashRegister{
    constructor(){
        this.actual_state =  {status: "OPEN", change: [["QUARTER", 0.5]]}
        
        this.cashDictionary = {}
        this.cashValueArray = []
        this.cashKeyArray = []
        this.currentCoinAmount = 0
        this.changeToReturn = []
    }

    execute(price, cash, moneyInCash){
        return this.operate(price, cash, moneyInCash)
    }

    returnChange(status, change){
        this.actual_state.status = status
        this.actual_state.change = change

        return this.actual_state
    }

    operate(price, cash, moneyInCash){
        const moneyReturn = this.moneyReturn(cash, price) 
        const amountMoneyInCashRegister = this.amountMoneyInCashRegister(moneyInCash)
        
        this.thereIsMoneyInCashTrue(moneyInCash)
        this.cashArray(moneyInCash)

        return this.thereIsChangeEnought(amountMoneyInCashRegister, moneyReturn)
    }

    thereIsChangeEnought(amountMoneyInCashRegister, moneyReturn){
        const notEnoughtMoneyInCash = amountMoneyInCashRegister < moneyReturn
        if (notEnoughtMoneyInCash){return NOT_ENOUGHT_MONEY_IN_CASH}

        const changeDict = this.change(moneyReturn)

        return this.returnChange ("OPEN", changeDict)    
    }

    thereIsMoneyInCashTrue(moneyInCash){
        moneyInCash = this.putsMoneyInCashIfThereIsNot(moneyInCash)
    }

    putsMoneyInCashIfThereIsNot(moneyInCash) {
        const notmoneyInCash = !moneyInCash
        moneyInCash = this.itIsMoneyInCash(notmoneyInCash, moneyInCash)
        return moneyInCash
    }

    itIsMoneyInCash(notmoneyInCash, moneyInCash) {
        if (notmoneyInCash) {moneyInCash = []}
        return moneyInCash
    }

    moneyReturn(cash, price){
        return cash - price
    }

    timesSingleCoin(singleCoin, totalChange){
        return totalChange/singleCoin
    }

    cashArray(moneyInCash){
        for (let i = 0; i < moneyInCash.length; i++){
            this.cashDictionary[moneyInCash[i][FIRST_ARRAY_INDEX]] = moneyInCash[i][1]
            this.cashKeyArray.push(moneyInCash[i][FIRST_ARRAY_INDEX])
            this.cashValueArray.push(moneyInCash[i][SECOND_ARRAY_INDEX])
        }
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
        var counter = 0
        while (this.testThereAreCoinsAndResult(counter, moneyReturn, actualCoinAmount, actualCoinPrice)){
        moneyReturn = moneyReturn.toFixed(2)
        moneyReturn -= actualCoinPrice
        actualCoinAmount -= actualCoinPrice
        this.currentCoinAmount += 1
        }
        return moneyReturn
    }

    testThereAreCoinsAndResult(counter, moneyReturn, actualCoinAmount, actualCoinPrice){
        counter += 1
        if (moneyReturn<0){return false}
        if (moneyReturn<actualCoinPrice){return false}
        if (actualCoinAmount<actualCoinPrice){return false}
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


    
    

    