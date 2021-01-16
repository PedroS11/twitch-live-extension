import { getStorageData, setStorageData } from '../localStorage';

describe('localStorage', () => {
    let getItemSpy: any, setItemSpy: any;

    const key = 'keyItem';
    const data = 'RANDOM_DATA';

    beforeEach(() => {
        getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
        setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getStorageData', () => {
        beforeEach(() => {
            window.localStorage.setItem(key, data);
        });

        it('should get data from local storage by key', () => {
            const result = getStorageData(key);
            expect(result).toBe(data);
            expect(getItemSpy).toHaveBeenCalledTimes(1);
            expect(getItemSpy).toBeCalledWith(key);
        });

        it("should return null if the key doesn't exist", () => {
            const wrongKey = 'wrongKey';

            const result = getStorageData(wrongKey);
            expect(result).toBeNull;
            expect(getItemSpy).toHaveBeenCalledTimes(1);
            expect(getItemSpy).toBeCalledWith(wrongKey);
        });
    });

    describe('getStorageData', () => {
        it('should get data from local storage by key', () => {
            setStorageData(key, data);
            expect(setItemSpy).toHaveBeenCalledTimes(1);
            expect(setItemSpy).toBeCalledWith(key, data);
        });
    });
});
