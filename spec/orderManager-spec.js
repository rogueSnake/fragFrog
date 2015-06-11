var orderManager = require('../orderManager.js');

describe('orderManager', function () {
    it('should get orders for a specific turn', function () {
        orderManager.addOrder('Batman', 10, 25, 'north', {}, 616);
        orderManager.addOrder('Batman', 10, 24, 'north', {}, 617);
        orderManager.addOrder('Joker', 10, 20, 'north', {}, 616);
        orderManager.addOrder('Joker', 10, 19, 'north', {}, 617);

        expect(orderManager.getOrders(616).length).toBe(2);
    });
});

