const {disbursementCalculate} = require("../domain/DisburmentsCalculatorService");

// TODO: year part is something to clarify
// I assume the input is the number of week in the year, but still could be another convention
const calculateDisbursement = (year, week) => {

    // TODO: Obtain orders using a repository
    const orders = []; // orderRepository.findOrdersCompletedToDisburse(year, week) // Here we already get completed orders

    const disbursements = disbursementCalculate(week, orders)

    // TODO: here I would persist the disbursements throught some repository
    //disbursementRepository.save(disbursements)

    // TODO: Pending to decide which result return
};