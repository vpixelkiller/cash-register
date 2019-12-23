var ACTUAL_STATE =  {status: "OPEN", change: [["QUARTER", 0.5]]}
const NOT_ENOUGHT_MONEY_IN_CASH = { status: "INSUFFICIENT_FUNDS", change: [] }
const COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]

var cashDictionary = {}
var cashValueArray = []
var cashKeyArray = []
var currentCoinAmount = 0
var changeToReturn = []

class cashRegister{
    execute(price, cash, currentMoneyInCash){
        return this.operate(price, cash, currentMoneyInCash)
    }

    returnChange(status, change){
        ACTUAL_STATE.status = status
        ACTUAL_STATE.change = change

        return ACTUAL_STATE
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
        if (notEnoughtMoneyInCash){return NOT_ENOUGHT_MONEY_IN_CASH}

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
            cashDictionary[currentMoneyInCash[i][0]] = currentMoneyInCash[i][1]
            cashKeyArray.push(currentMoneyInCash[i][0])
            cashValueArray.push(currentMoneyInCash[i][1])
        }
        return cashDictionary
    }

    change(thereIsMoney){
        const reverseCashValueArray = cashValueArray.reverse()
        
        return this.countEachCoin(reverseCashValueArray, thereIsMoney)        
    }

    countEachCoin(reverseCashValueArray, thereIsMoney){
        const reverseCashKeyArray = cashKeyArray.reverse()

        this.moreMoneyThanCoin(reverseCashValueArray, thereIsMoney, reverseCashKeyArray)

        return changeToReturn
    }

    moreMoneyThanCoin(reverseCashValueArray, thereIsMoney, reverseCashKeyArray){
        for (let count=0; count<=reverseCashValueArray.length; count++){
            var actualCoinAmount = reverseCashValueArray[count]
            var actualCoinPrice = COINPRICE[count]
            
            if (actualCoinPrice<thereIsMoney){
                thereIsMoney = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, thereIsMoney)
                changeToReturn.push(reverseCashKeyArray[count], currentCoinAmount*actualCoinPrice)
            }   
        }
        return changeToReturn        
    }

    returnTimesAndRest(actualCoinPrice, actualCoinAmount, thereIsMoney){
        var counter = 0
        while (this.testThereAreCoinsAndResult(counter, thereIsMoney, actualCoinAmount, actualCoinPrice)){
        thereIsMoney -= actualCoinPrice
        actualCoinAmount -= actualCoinPrice
        currentCoinAmount += 1
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


    
    

    