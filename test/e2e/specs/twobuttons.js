/* eslint-disable no-undef */

module.exports = {
    twobuttons(browser) {
        browser
            .url('http://localhost:8080/twobuttons/')
            .waitForElementVisible('.twobuttons', 1000)
            .assert.containsText('.twobuttons .result1', '')
            .assert.containsText('.twobuttons .result2', '');

        browser.enterValue('.twobuttons-input', 'e2e-test');

        browser.click('.twobuttons-btn1');
        browser.expect.element('.twobuttons .result2').text.to.equal('');
        browser.expect.element('.twobuttons .result1').text.to.not.equal('');

        browser.click('.twobuttons-btn2');
        browser.expect.element('.twobuttons .result2').text.to.not.equal('');
        browser.expect.element('.twobuttons .result1').text.to.not.equal('');

        browser.enterValue('.twobuttons-input', 'hello world!');

        browser.click('.twobuttons-btn1')
            .assert.containsText('.twobuttons .result1', 'hello world!');

        browser.click('.twobuttons-btn2')
            .assert.containsText('.twobuttons .result2', 'hello world!')
            .assert.containsText('.twobuttons .result1', 'hello world!');

        browser.end();
    },
};
