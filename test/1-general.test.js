import assert from 'assert';
import dotenv from "dotenv";
import { getDriver, getElement, sleep, parseXpaths } from '../src/util.js';



describe("General", function() {
    this.timeout(120000);
    let driver;
    let xpaths;

    before(async () => {
        dotenv.config();
        driver = await getDriver(process.env.BROWSER, parseInt(process.env.IMPLICIT_WAIT));
        xpaths = parseXpaths(process.env.XPATH_FILENAME);
    })

    describe("Login", () => {
        it("should open login page", async () => {
            await driver.get(process.env.MANAGER_URL);
            await sleep(5000);
            let url = await driver.getCurrentUrl();
            assert.ok(url.includes("login"));
        })
    
        it("should enter email", async () => {
            let emailInput = await getElement(driver, xpaths["login-email-input"]);
            await emailInput.sendKeys(process.env.EMAIL);
            let value = await emailInput.getAttribute("value");
            assert.strictEqual(value, process.env.EMAIL);
        })
    
        it("should enter password", async () => {
            let emailInput = await getElement(driver, xpaths["login-password-input"]);
            await emailInput.sendKeys(process.env.PASSWORD);
            let value = await emailInput.getAttribute("value");
            assert.strictEqual(value, process.env.PASSWORD);
        })
    
        it("should redirect to manager", async () => {
            let btn = await getElement(driver, xpaths["login-button"]);
            await btn.click();
            await sleep(5000);
            let url = await driver.getCurrentUrl();
            assert.ok(url.includes(process.env.MANAGER_URL));
        })
    })
    
    describe("Sections", () => {
        it("should navigate to content section", async () => {
            let section = "content";

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes(section));
            assert.ok(url.includes(section));
        })
        it("should navigate to home section", async () => {
            let section = "home";

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes(section));
            assert.ok(url.includes(section));
        })
        it("should navigate to pages section", async () => {
            let section = "pages";

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes(section));
            assert.ok(url.includes(section));
        })

        it("should navigate to assets section", async () => {
            let section = "assets";

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes(section));
            assert.ok(url.includes("media"));
        })

        it("should navigate to models section", async () => {
            let section = "models"

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes("model"));
            assert.ok(url.includes(section));
        })

        it("should navigate to reports section", async () => {
            let section = "reports";

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes(section));
            assert.ok(url.includes(section));
        })

        it("should navigate to settings section", async () => {
            let section = "settings";

            let content = await getElement(driver, xpaths[`section-${section}`]);
            await content.click();
            await sleep(5000);
            let title = await driver.getTitle();
            let url = await driver.getCurrentUrl();
            assert.ok(title.toLowerCase().includes(section));
            assert.ok(url.includes(section));
        })
    })

    after(async () => {
        await driver.close();
    })
})