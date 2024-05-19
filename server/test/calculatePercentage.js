function calculatePercentage(totalTasks, completedTasks) {
    if (totalTasks === 0) {
        return '0%';
    }
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    return `${percentage}%`;
}

module.exports = { calculatePercentage };