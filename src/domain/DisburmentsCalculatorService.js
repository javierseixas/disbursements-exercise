const feePercentage = require("./FeePercentageResolver");

const calculate = (orders) => {

    let reduce = orders.reduce((groupedOrders, order) => {

        /**
         * TODO: Here we could put a guard clause for checking that the order is completed. Even this is something that.
         * Even this is something declared in a previous layer, It is a good idea to check, since the cost is very low here
         */

        groupedOrders[order.merchant_id] = groupedOrders[order.merchant_id] || 0.0;

        groupedOrders[order.merchant_id] = order.amount + groupedOrders[order.merchant_id];

        return groupedOrders;
    }, {});

    let disbursementsAfterFee = [];

    for (const [merchant_id, grossAmount] of Object.entries(reduce)) {
            const disbursementFee = grossAmount * feePercentage(grossAmount) / 100;

            // TODO: Here I'm transforming to an entity. It should probably go to another place
            disbursementsAfterFee.push({ merchant_id, amount: grossAmount - disbursementFee, week: 2});
    }

    return disbursementsAfterFee;
};

module.exports = { calculate };