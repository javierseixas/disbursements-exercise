const { expect } = require("@jest/globals");
const {disbursementsCalculator} = require("../../src/domain/DisburmentsCalculatorService");

describe("calculate Disbursements", () => {
    it("returns a list of disbursements for just one order", () => {
        const orders = [
            {
                id: "abc",
                merchant_id: "saler",
                amount: 100.0
            }
        ];
        const disbursements = disbursementsCalculator.calculate(orders);

        const expected = [
            {
                amount: 95.0, // TODO: This amount will be calculated in a service of the
                week: 2, // TODO: How will assign this value
            }
        ];

        expect(disbursements).toEqual(expected);
    });
});