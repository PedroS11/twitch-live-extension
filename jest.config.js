/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	collectCoverage: true,
	preset: "ts-jest",
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],

	setupFilesAfterEnv: [
		"@testing-library/jest-dom/extend-expect",
		"./jest.setup.js",
	],

	testMatch: ["**/__tests__/*.(spec|test).+(ts|tsx|js)"],
	// Module file extensions for importing
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
