import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly url: string;
    readonly page: Page;

    // Locators
    private readonly usernameTxt: Locator;
    private readonly passwordTxt: Locator;
    private readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = process.env['LOGIN_URL'] ?? '';
        
        // Locator assignments
        this.usernameTxt = page.getByLabel('Username');
        this.passwordTxt = page.getByLabel('Password');
        this.loginBtn = page.getByRole('button', { name: 'Sign in' });
    }

    // Behavior methods
    
    /**
     * Navigates to the login page
     */
    async goto(): Promise<void> {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
    };

    /**
     * Logs in to the application
     * @param username The username to login with
     * @param password The password to login with
     */
    async login (username: string, password: string): Promise<void> {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    };

}