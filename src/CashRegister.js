var ACTUAL_STATE =  {status: "OPEN", change: [["QUARTER", 0.5]]}
const COINPRICE = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
var cashDictionary = {}
var cashValueArray = []
var cashKeyArray = []
var currentCoinAmount = 0
var changeToReturn = []

function checkCashRegister(price, cash, cid) {
    const sumCash = new cashRegister()
    return sumCash.cashRegisterOperate(price, cash, cid)
}

class cashRegister{

    returnChange(status, change){
        ACTUAL_STATE.status = status
        ACTUAL_STATE.change = change
        console.log(ACTUAL_STATE)
        return ACTUAL_STATE
    }


    cashRegisterOperate(price, cash, cid){
        if (!cid){cid = []}
        const result = cash - price
        if (this.cashSum(cid) < result){return {status: "INSUFFICIENT_FUNDS", change: []}}
        this.cashArray (cid)
        const changeDict = this.change(result, cid)
        console.log(changeDict)
        return this.returnChange ("OPEN", [changeDict])
    }


    timesSingleCoin(singleCoin, totalChange){
        return totalChange/singleCoin
    }

    cashArray(cid){
        for (let i = 0; i < cid.length; i++){
            cashDictionary[cid[i][0]] = cid[i][1]
            cashKeyArray.push(cid[i][0])
            cashValueArray.push(cid[i][1])
        }
        return cashDictionary
    }

    change(result, cid){
        const reverseCashValueArray = cashValueArray.reverse()
        const reverseCashKeyArray = cashKeyArray.reverse()
        var substractResult = result

        for (var i=0; i<=reverseCashValueArray.length; i++){
            const singleCoins = this.timesSingleCoin(COINPRICE[i], reverseCashValueArray[i])
            const actualCoinAmount = reverseCashValueArray[i]
            const actualCoinPrice = COINPRICE[i]

            if (actualCoinPrice<substractResult){
                substractResult = this.returnTimesAndRest(actualCoinPrice, actualCoinAmount, substractResult)
                changeToReturn.push(reverseCashKeyArray[i], currentCoinAmount*actualCoinPrice)
            }   
        }
        return changeToReturn
        
    }
    
    returnTimesAndRest(actualCoinPrice, actualCoinAmount, substractResult){
        do {
            substractResult -= actualCoinPrice
            actualCoinAmount -= actualCoinPrice
            currentCoinAmount += 1
        } while (substractResult>0 || actualCoinAmount<actualCoinPrice)
        return substractResult
    }

    cashSum(cid){
        var resultArray = 0
        
        if (!cid){return resultArray}

        for (let i = 0; i < cid.length; i++){
            resultArray += cid[i][1]
        }

        return resultArray

    }
}


    
    

    