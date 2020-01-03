var currentCoinAmount = 0

class cashRegister{
    constructor(){
        this.SECOND_ARRAY_INDEX = 1
        this.FIRST_ARRAY_INDEX = 0
        this.ACTUAL_STATE =  {status: "OPEN", change: [["QUARTER", 0.5]]}
        this.NOT_ENOUGHT_MONEY_IN_CASH = { status: "INSUFFICIENT_FUNDS", change: [] }
        this.COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
        
        this.cashDictionary = {}
        this.cashValueArray = []
        this.cashKeyArray = []
        this.currentCoinAmount = 0
        this.changeToReturn = []
    }

    execute(price, cash, currentMoneyInCash){
        return this.operate(price, cash, currentMoneyInCash)
    }

    returnChange(status, change){
        this.ACTUAL_STATE.status = status
        this.ACTUAL_STATE.change = change

        console.log(this.ACTUAL_STATE)
        return this.ACTUAL_STATE
    }

    operate(price, cash, currentMoneyInCash){
        const moneyReturn = this.moneyReturn(cash, price) 
        const cashSum = this.cashSum(currentMoneyInCash)
        
        this.thereIsMoneyInCashTrue(currentMoneyInCash)
        this.cashArray(currentMoneyInCash)

        return this.thereIsChangeEnought(cashSum, moneyReturn)
    }

    thereIsChangeEnought(cashSum, moneyReturn){
        const notEnoughtMoneyInCash = cashSum < moneyReturn
        if (notEnoughtMoneyInCash){return this.NOT_ENOUGHT_MONEY_IN_CASH}

        const changeDict = this.change(moneyReturn)

        return this.returnChange ("OPEN", changeDict)    
    }

    thereIsMoneyInCashTrue(currentMoneyInCash){
        currentMoneyInCash = this.putsMoneyInCashIfThereIsNot(currentMoneyInCash)
    }

    putsMoneyInCashIfThereIsNot(currentMoneyInCash) {
        const notCurrentMoneyInCash = !currentMoneyInCash
        currentMoneyInCash = this.itIsMoneyInCash(notCurrentMoneyInCash, currentMoneyInCash)
        return currentMoneyInCash
    }

    itIsMoneyInCash(notCurrentMoneyInCash, currentMoneyInCash) {
        if (notCurrentMoneyInCash) {currentMoneyInCash = []}
        return currentMoneyInCash
    }

    moneyReturn(cash, price){
        return cash - price
    }

    timesSingleCoin(singleCoin, totalChange){
        return totalChange/singleCoin
    }

    cashArray(currentMoneyInCash){
        for (let i = 0; i < currentMoneyInCash.length; i++){
            this.cashDictionary[currentMoneyInCash[i][this.FIRST_ARRAY_INDEX]] = currentMoneyInCash[i][1]
            this.cashKeyArray.push(currentMoneyInCash[i][this.FIRST_ARRAY_INDEX])
            this.cashValueArray.push(currentMoneyInCash[i][this.SECOND_ARRAY_INDEX])
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
            var actualCoinPrice = this.COINPRICE[count]
            currentCoinAmount = 0
            if (actualCoinPrice<=moneyReturn){
                moneyReturn = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn)
                this.changeToReturn.push([reverseCashKeyArray[count], currentCoinAmount*actualCoinPrice])
            }   
        }
        return this.changeToReturn        
    }

    returnTimesAndRest(actualCoinPrice, actualCoinAmount, moneyReturn){
        var counter = 0
        while (this.testThereAreCoinsAndResult(counter, moneyReturn, actualCoinAmount, actualCoinPrice)){
        moneyReturn = moneyReturn.toFixed(2)
        moneyReturn -= actualCoinPrice
        actualCoinAmount -= actualCoinPrice
        currentCoinAmount += 1
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

    cashSum(currentMoneyInCash){
        const resultArray = 0
        
        if (!currentMoneyInCash){return resultArray}
        return this.sumsMoneyInCash(currentMoneyInCash, resultArray)
    }

    sumsMoneyInCash(currentMoneyInCash, resultArray){
        for (let i = 0; i < currentMoneyInCash.length; i++){
            resultArray += currentMoneyInCash[i][1]
        }
        return resultArray
    }
}


    
    

    