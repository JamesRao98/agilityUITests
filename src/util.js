import {readFileSync} from "fs";
import  {Builder, By} from 'selenium-webdriver';

export const parseXpaths = xpathFilename => Object.fromEntries(readFileSync(xpathFilename).toString().split('\n').splice(1).map(row => row.split(',')));

export const getDriver = async (browser, implicitWait) => {
    let driver = await new Builder().forBrowser(browser).build();
    await driver.manage().setTimeouts( { implicit: implicitWait } );
    return driver;
};

export const getElement = (driver, xpath) => driver.findElement(By.xpath(xpath));
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));