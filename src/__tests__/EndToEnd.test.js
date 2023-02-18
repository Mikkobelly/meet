import puppeteer from "puppeteer";

describe('show/hide an event details', () => {
    let browser;
    let page;
    jest.setTimeout(30000);

    beforeAll(async () => {

        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow actions by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default settings
        });

        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .toggleButton');
        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .toggleButton');
        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeNull();
    })

});

describe('filter events by city', () => {
    let browser;
    let page;
    jest.setTimeout(30000);

    beforeAll(async () => {

        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow actions by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default settings
        });

        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('user hasn’t searched for specific city, show upcoming events from all cities', async () => {
        const eventList = await page.$('.EventList');
        expect(eventList).toBeDefined();
    });

    test('user should see a list of suggestions when they search for city', async () => {
        await page.type('.city', 'Berlin', { delay: 100 });
        const suggestions = await page.$('.suggestions');
        expect(suggestions).toBeDefined();
    });

    test('When the user searches for city, a list of upcoming events in this city should be shown', async () => {
        await page.click('.suggestions li');
        const eventCount = await page.$$eval('.event', events => events.length);
        expect(eventCount).toBe(16);
    })

});