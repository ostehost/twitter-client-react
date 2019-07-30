// Reducer to be tested
import sortItems from '../../lib/sortItems';

describe('sortItems', () => {

    test('"test" sort is correct', () => {
        let items = [{
            test: 1
        }, {
            test: 2
        }];
        sortItems(items, 'test', 1)
        expect(items).toEqual(items);
    });

    test('"test" sort is correct', () => {
        let items = [{
            test: 1
        }, {
            test: 2
        }];
        sortItems(items, 'test', -1)
        expect(items).toEqual(items);
    });

    test('"created_at" sort is correct', () => {
        let items = [{
            created_at: new Date(2018, 11)
        }, {
            created_at: new Date(2018, 10)
        }];
        sortItems(items, 'created_at', 1)
        expect(items).toEqual(items);
    });

    test('"created_at" sort is correct', () => {
        let items = [{
            created_at: new Date(2018, 11)
        }, {
            created_at: new Date(2018, 10)
        }];
        sortItems(items, 'created_at', -1)
        expect(items).toEqual(items);
    });
});