import { isFirefox } from "../browserUtils";

describe("BrowserUtils", () => {
	let userAgentMock: jest.SpyInstance;

	beforeEach(() => {
		userAgentMock = jest.spyOn(navigator, "userAgent", "get");
	});

	it("should return true if the browser is Firefox", () => {
		userAgentMock.mockReturnValue(
			"\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0\"",
		);

		expect(isFirefox()).toBeTruthy();
	});

	it("should return false if the browser is not Firefox", () => {
		userAgentMock.mockReturnValue(
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
		);

		expect(isFirefox()).toBeFalsy();
	});
});
