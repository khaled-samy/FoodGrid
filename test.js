const { test, expect } = require("@jest/globals");
const { myTest } = require("./logic.js");
describe("testing my test function", () => {
    test("should return ", () => {
        const acual = myTest(0);
        const expected = 1;
        expect(acual).toBe(expected)      
    })
})