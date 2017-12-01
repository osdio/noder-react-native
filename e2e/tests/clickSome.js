/// <reference path="../steps.d.ts" />
Feature('Click works as expected');

Before((I, initStep) => {
    initStep.toHome();
});

After((I) => {
    I.wait(2);
});

Scenario('Perform click some tab', (I, HomePage) => {
    HomePage.ensureOpen();
    I.wait(2);
    I.click('~问答');
    I.wait(2);
    I.click('~主页');
});

Scenario('Perform click some topic', (I, HomePage, generalPage) => {
    HomePage.ensureOpen();
    I.runOnAndroid(() => {
        I.wait(2);
        generalPage.swipeLeft();
        I.wait(2);
        generalPage.click(345, 345);
    });
});
