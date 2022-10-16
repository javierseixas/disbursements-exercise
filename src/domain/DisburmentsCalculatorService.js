// TODO: This should be moved to another service probably
const feePercentatge = (amount) => {
    if (amount < 50) {
        return 1
    } else if (amount < 300) {
        return 0.95
    } else {
        return 0.85
    }
};

const calculate = (orders) => {

    let reduce = orders.reduce((groupedOrders, order) => {
        groupedOrders[order.merchant_id] = groupedOrders[order.amount] || 0.0;

        groupedOrders[order.merchant_id] = order.amount + groupedOrders[order.merchant_id];

        return groupedOrders;
    }, {});

    let disbursementsAfterFee = [];

    for (const [merchant_id, grossAmount] of Object.entries(reduce)) {
            const disbursementFee = grossAmount * feePercentatge(grossAmount) / 100;

            // TODO: Here I'm transforming to an entity. It should probably go to another place
            disbursementsAfterFee.push({ amount: grossAmount * disbursementFee, week: 2});
    }

    return disbursementsAfterFee;
};

module.exports = { calculate };