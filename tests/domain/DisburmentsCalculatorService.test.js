const { expect } = require("@jest/globals");
const { calculate } = require("../../src/domain/DisburmentsCalculatorService");

describe("calculate Disbursements", () => {
    it("returns a list of disbursements for just one order", () => {
        const orders = [
            {
                id: "abc",
                merchant_id: "mer_1",
                amount: 100.0
            }
        ];
        const disbursements = calculate(orders);

        const expected = [
            {
                merchant_id: "mer_1",
                amount: 99.05, // TODO: This amount will be calculated in a service of the
                week: 2, // TODO: How will assign this value
            }
        ];

        expect(disbursements).toEqual(expected);
    });

    it("returns a list of disbursements for three orders of different merchants", () => {
        const orders = [
            {
                id: "abc",
                merchant_id: "mer_1",
                amount: 100.0
            },
            {
                id: "def",
                merchant_id: "mer_1",
                amount: 1400.0
            },
            {
                id: "ghi",
                merchant_id: "mer_2",
                amount: 40.0
            }
        ];
        const disbursements = calculate(orders);

        const expected = [
            {
                merchant_id: "mer_1",
                amount: 1487.25, // TODO: This amount will be calculated in a service of the
                week: 2, // TODO: How will assign this value
            },
            {
                merchant_id: "mer_2",
                amount: 39.6, // TODO: This amount will be calculated in a service of the
                week: 2, // TODO: How will assign this value
            }
        ];

        expect(disbursements).toEqual(expected);
    });
});