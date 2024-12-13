import { test as baseTest } from '@playwright/test';
import { LoginPage } from './src/pages/LoginPage';
import { MainPage } from './src/pages/MainPage';

// Declare Test Fixtures type
type TestFixtures = {
    loginPage: LoginPage;
    mainPage: MainPage;
};

// Extend base test with each fixture declared in TestFixtures type
export const test = baseTest.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    }
});

export { expect } from '@playwright/test';
