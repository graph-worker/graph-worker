module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/**/*test.ts?(x)"],
  moduleFileExtensions: ["ts", "js"],

  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.test.json"
    }
  }
};
