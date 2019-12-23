var ACTUAL_STATE =  {status: "OPEN", change: [["QUARTER", 0.5]]}
const NOT_ENOUGHT_MONEY_IN_CASH = { status: "INSUFFICIENT_FUNDS", change: [] }
const COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]

var cashDictionary = {}
var cashValueArray = []
var cashKeyArray = []
var currentCoinAmount = 0
var changeToReturn = []

function checkCashRegister(price, cash, currentMoneyInCash) {
    const sumCash = new cashRegister()
    return sumCash.cashRegisterOperate(price, cash, currentMoneyInCash)
}

class cashRegister{

    returnChange(status, change){
        ACTUAL_STATE.status = status
        ACTUAL_STATE.change = change

        return ACTUAL_STATE
    }

    cashRegisterOperate(price, cash, currentMoneyInCash){
        const isMoneyAfterChange = this.isMoneyAfterChange(cash, price) 
        const cashSum = this.cashSum(currentMoneyInCash)
        
        this.cidExists(currentMoneyInCash)
        this.cashArray(currentMoneyInCash)

        return this.thereAreChangeEnought(cashSum, isMoneyAfterChange, currentMoneyInCash)
    }

    thereAreChangeEnought(cashSum, isMoneyAfterChange){
        const notEnoughtMoneyInCash = cashSum < isMoneyAfterChange
        if (notEnoughtMoneyInCash){
            return NOT_ENOUGHT_MONEY_IN_CASH
        }

        const changeDict = this.change(isMoneyAfterChange)

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
        if (notCurrentMoneyInCash) {
            currentMoneyInCash = []
        }
        return currentMoneyInCash
    }

    isMoneyAfterChange(cash, price){
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

    change(isMoneyAfterChange){
        const reverseCashValueArray = cashValueArray.reverse()
        
        const changeToReturn = this.countEachCoin(reverseCashValueArray, isMoneyAfterChange)

        return changeToReturn
        
    }

    countEachCoin(reverseCashValueArray, isMoneyAfterChange){
        const reverseCashKeyArray = cashKeyArray.reverse()

        this.moreMoneyThanCoin(reverseCashValueArray, isMoneyAfterChange, reverseCashKeyArray)

        return changeToReturn
    }

    moreMoneyThanCoin(reverseCashValueArray, isMoneyAfterChange, reverseCashKeyArray){
        for (let count=0; count<=reverseCashValueArray.length; count++){
            var actualCoinAmount = reverseCashValueArray[count]
            var actualCoinPrice = COINPRICE[count]
            
            if (actualCoinPrice<isMoneyAfterChange){
                isMoneyAfterChange = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, isMoneyAfterChange)
                changeToReturn.push(reverseCashKeyArray[count], currentCoinAmount*actualCoinPrice)
            }   
        }
        return changeToReturn        
    }

    returnTimesAndRest(actualCoinPrice, actualCoinAmount, isMoneyAfterChange){
        var counter = 0
        while (this.testThereAreCoinsAndResult(counter, isMoneyAfterChange, actualCoinAmount, actualCoinPrice)){
        isMoneyAfterChange -= actualCoinPrice
        actualCoinAmount -= actualCoinPrice
        currentCoinAmount += 1
        }
        return isMoneyAfterChange
    }

    testThereAreCoinsAndResult(counter, isMoneyAfterChange, actualCoinAmount, actualCoinPrice){
        counter += 1
        if (isMoneyAfterChange<0){return false}
        if (isMoneyAfterChange<actualCoinPrice){return false}
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


    
    

    