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
        
        const moneyReturn = newMoneyOperation.calculatesTheMoneyToReturn(cash, price) 
        const moneyInTheCash = newMoneyOperation.returnsTheMoneyInCash(moneyInCash)
        
        newMoneyOperation.putsMoneyInCashIfThereIsNot(moneyInCash)
        this.organiceTheMoney(moneyInCash)
        
        if (newMoneyOperation.notEnoughtMoneyInCash(moneyInTheCash, moneyReturn)) {return NOT_ENOUGHT_MONEY_IN_CASH}

        return this.returnChange ("OPEN", this.getChangeResult(moneyReturn))    
    }
    
    
    // Private
    
    getChangeResult(moneyReturn) {
        const newMoneyOperation = new MoneyOperations()

        return newMoneyOperation.changeOperate(this.reverseCashValueArray, moneyReturn, this.reverseCashKeyArray)
    }

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
}


    
    

    