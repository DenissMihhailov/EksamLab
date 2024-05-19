const { expect } = require('chai');
const { calculatePercentage } = require('./calculatePercentage');

describe('calculatePercentage', () => {
    it('should return 0% if totalTasks is 0', () => {
        const result = calculatePercentage(0, 0);
        expect(result).to.equal('0%');
    });

    it('should return 0% if completedTasks is 0', () => {
        const result = calculatePercentage(10, 0);
        expect(result).to.equal('0%');
    });

    it('should return 100% if completedTasks equals totalTasks', () => {
        const result = calculatePercentage(10, 10);
        expect(result).to.equal('100%');
    });

    it('should return the correct percentage', () => {
        const result = calculatePercentage(10, 5);
        expect(result).to.equal('50%');
    });

    it('should round the percentage correctly', () => {
        const result = calculatePercentage(3, 1);
        expect(result).to.equal('33%');
    });

    it('should handle large numbers correctly', () => {
        const result = calculatePercentage(1000000, 750000);
        expect(result).to.equal('75%');
    });
});