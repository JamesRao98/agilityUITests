import assert from 'assert';
import dotenv from "dotenv";
import { getDriver, getElement, sleep, parseXpaths } from '../src/util.js';



describe("Content", function() {
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

    describe("Create Content Model", () => {
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

        it("should navigate to content models", async () => {
            let contentModelsButton = await getElement(driver, xpaths["models-content-button"]);
            await contentModelsButton.click();
            await sleep(5000);
            let url = await driver.getCurrentUrl();
            assert.ok(url.includes("contentmodels"));
        })

        it("should open add content model flyout", async () => {
            let addContentModelButton = await getElement(driver, xpaths["models-add-content-button"]);
            await addContentModelButton.click();
            await sleep(5000);
            let addContentModelFlyoutTitle = await getElement(driver, xpaths["models-add-content-flyout-title"]);
            let title = await addContentModelFlyoutTitle.getAttribute("innerHTML")
            assert.strictEqual(title, "Add a Content Model");
        })

        it("should enter name in new content model flyout", async () => {
            let contentModelFlyoutNameInput = await getElement(driver, xpaths["models-add-content-flyout-name-input"]);
            let modelName = "Test Model";
            await contentModelFlyoutNameInput.sendKeys(modelName);
            let value = await contentModelFlyoutNameInput.getAttribute("value");
            assert.strictEqual(value, modelName);
        })

        it("should save new content model", async () => {
            let contentModelFlyout
        })
    })

    after(async () => {
        await driver.close()
    })
})