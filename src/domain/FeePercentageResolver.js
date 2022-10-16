// TODO: Create tests for this logic
const feePercentage = (amount) => {
    if (amount < 50) {
        return 1
    } else if (amount < 300) {
        return 0.95
    } else {
        return 0.85
    }
};

module.exports = feePercentage;
