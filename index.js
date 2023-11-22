function getLoyaltyPoints(userId, callback) {
    setTimeout(() => {
        const points = Math.floor(Math.random() * 100);
        callback(null, points);
    }, 2000);
}

function getLoyaltyPointsPromise(userId) {
    return new Promise((resolve, reject) => {
        getLoyaltyPoints(userId, (error, points) => {
            if (error) {
                reject(error);
            } else {
                resolve(points);
            }
        });
    });
}

function checkDiscountEligibilityWithCallback(userId, callback) {
    getLoyaltyPoints(userId, (error, points) => {
        if (error) {
            callback(error, null);
        } else {
            const eligibilityCriteria = '50 loyalty points or more';
            const isEligible = points > 50;
            callback(null, { points, isEligible, eligibilityCriteria });
        }
    });
}

function checkDiscountEligibilityWithPromise(userId) {
    return getLoyaltyPointsPromise(userId)
        .then((points) => {
            const eligibilityCriteria = '50 loyalty points or more';
            const isEligible = points > 50;
            return { points, isEligible, eligibilityCriteria };
        });
}

const userIdCallback = 123;
checkDiscountEligibilityWithCallback(userIdCallback, (error, result) => {
    if (error) {
        console.error('Callback Error:', error);
    } else {
        console.log('Callback Result: User has', result.points, 'loyalty points. Eligible for discount:', result.isEligible, 'Criteria:', result.eligibilityCriteria);
    }
});

const userIdPromise = 123;
checkDiscountEligibilityWithPromise(userIdPromise)
    .then((result) => {
        console.log('Promise Result: User has', result.points, 'loyalty points. Eligible for discount:', result.isEligible, 'Criteria:', result.eligibilityCriteria);
    })
    .catch((error) => {
        console.error('Promise Error:', error);
    });
