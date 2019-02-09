const assert = require('assert');

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url("http://google.com")
        browser.pause(2 * 1000)
    });
});