import { isWindows } from '../operatingSystem';

describe('OperatingSystem', () => {
    let appVersionMock: jest.SpyInstance;

    beforeEach(() => {
        appVersionMock = jest.spyOn(navigator, 'appVersion', 'get');
    });

    it('should return true if the SO is windows', () => {
        appVersionMock.mockReturnValue('5.0 (Windows; en-US)');

        expect(isWindows()).toBeTruthy();
    });

    it('should return false if the SO is not windows', () => {
        appVersionMock.mockReturnValue(
            '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        );

        expect(isWindows()).toBeFalsy();
    });
});
