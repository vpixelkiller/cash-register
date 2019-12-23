class cashRegister{
    execute(price, cash, currentMoneyInCash){
        return this.operate(price, cash, currentMoneyInCash)
    }

    constructor(){
        this.ACTUAL_STATE =  {status: "OPEN", change: [["QUARTER", 0.5]]}
        this.NOT_ENOUGHT_MONEY_IN_CASH = { status: "INSUFFICIENT_FUNDS", change: [] }
        this.COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]

        this.cashDictionary = {}
        this.cashValueArray = []
        this.cashKeyArray = []
        this.currentCoinAmount = 0
        this.changeToReturn = []
    }

    returnChange(status, change){
        this.ACTUAL_STATE.status = status
        this.ACTUAL_STATE.change = change

        return this.ACTUAL_STATE
    }

    operate(price, cash, currentMoneyInCash){
        const thereIsMoney = this.thereIsMoney(cash, price) 
        const cashSum = this.cashSum(currentMoneyInCash)
        
        this.cidExists(currentMoneyInCash)
        this.cashArray(currentMoneyInCash)

        return this.thereIsChangeEnought(cashSum, thereIsMoney, currentMoneyInCash)
    }

    thereIsChangeEnought(cashSum, thereIsMoney){
        const notEnoughtMoneyInCash = cashSum < thereIsMoney
        if (notEnoughtMoneyInCash){return this.NOT_ENOUGHT_MONEY_IN_CASH}

        const changeDict = this.change(thereIsMoney)

        return this.returnChange ("OPEN", [changeDict])    
    }

    cidExists(currentMoneyInCash){
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

    thereIsMoney(cash, price){
        return cash - price
    }

    timesSingleCoin(singleCoin, totalChange){
        return totalChange/singleCoin
    }

    cashArray(currentMoneyInCash){
        for (let i = 0; i < currentMoneyInCash.length; i++){
            this.cashDictionary[currentMoneyInCash[i][0]] = currentMoneyInCash[i][1]
            this.cashKeyArray.push(currentMoneyInCash[i][0])
            this.cashValueArray.push(currentMoneyInCash[i][1])
        }
        return this.cashDictionary
    }

    change(thereIsMoney){
        const reverseCashValueArray = this.cashValueArray.reverse()
        
        return this.countEachCoin(reverseCashValueArray, thereIsMoney)        
    }

    countEachCoin(reverseCashValueArray, thereIsMoney){
        const reverseCashKeyArray = this.cashKeyArray.reverse()

        this.moreMoneyThanCoin(reverseCashValueArray, thereIsMoney, reverseCashKeyArray)

        return this.changeToReturn
    }

    moreMoneyThanCoin(reverseCashValueArray, thereIsMoney, reverseCashKeyArray){
        for (let count=0; count<=reverseCashValueArray.length; count++){
            var actualCoinAmount = reverseCashValueArray[count]
            var actualCoinPrice = this.COINPRICE[count]
            
            if (actualCoinPrice<thereIsMoney){
                thereIsMoney = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, thereIsMoney)
                this.changeToReturn.push(reverseCashKeyArray[count], this.currentCoinAmount*actualCoinPrice)
            }   
        }
        return this.changeToReturn        
    }

    returnTimesAndRest(actualCoinPrice, actualCoinAmount, thereIsMoney){
        var counter = 0
        while (this.testThereAreCoinsAndResult(counter, thereIsMoney, actualCoinAmount, actualCoinPrice)){
        thereIsMoney -= actualCoinPrice
        actualCoinAmount -= actualCoinPrice
        this.currentCoinAmount += 1
        }
        return thereIsMoney
    }

    testThereAreCoinsAndResult(counter, thereIsMoney, actualCoinAmount, actualCoinPrice){
        counter += 1
        if (thereIsMoney<0){return false}
        if (thereIsMoney<actualCoinPrice){return false}
        if (actualCoinAmount<actualCoinPrice){return false}
        return true
    }

    cashSum(currentMoneyInCash){
        var resultArray = 0
        
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


    
    

    