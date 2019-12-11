describe ('cashRegister_test',()=>{
  it('checkCashRegister returns an object',()=>{
    //arrange
    const cashRegister = new checkCashRegister()
    //act

    //assert
    expect(typeof cashRegister).toEqual("object")
  })


 it('checkCashRegister returns {status: "OPEN", change: [["QUARTER", 0.5]]}',()=>{

    const actualCash = new cashRegister()

    const returnChange = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

    expect(returnChange).toEqual({status: "OPEN", change: [["QUARTER", 0.5]]})
  })

  it('times coins content a change', ()=>{
    const actualCash = new cashRegister()
    const singleCoin = 0.01
    const totalChange = 0.5

    const timesSingleCoin = actualCash.timesSingleCoin(singleCoin, totalChange)

    expect(timesSingleCoin).toEqual(50)
  })

  it('checCashRegister has enought cash for change', ()=>{
    const actualCash = new cashRegister()

    const sendActualTransaction = cashSum([["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
   
    expect(sendActualTransaction).toBeGreaterThan(0)

  })

  it('checCashRegister returns {status: "INSUFFICIENT_FUNDS", change: []} if cash is less than change', ()=> {
    const actualCash = new cashRegister()

    const sendActualTransaction = checkCashRegister(19.5, 500, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
    // console.log(sendActualTransaction)

    expect(sendActualTransaction).toEqual({status: "INSUFFICIENT_FUNDS", change: []})
  })



})