const assert = require('assert');

describe('test suite', () => {
    it('verify basic thing', () => {
        browser.url("http://google.com")
        browser.pause(2 * 1000)
    });
});