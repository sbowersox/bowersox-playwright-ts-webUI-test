import { expect, Locator, Page } from "@playwright/test";

export class MainPage {

    private readonly page: Page

    // Locators
    private readonly projectsHeading: Locator;
    private readonly logoutBtn: Locator;
    private readonly projectBoardLoginHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locator assignments
        this.projectsHeading = page.getByRole('heading', { name: 'Projects' });
        this.logoutBtn = page.getByRole('button', { name: 'Logout' });
        this.projectBoardLoginHeading = page.getByRole('heading', { name: 'Project Board' });
    }

    // Behavior methods

    /**
     * Confirms that the user is on the Main Page by checking the URL and the heading
     * @returns  Promise<void>
     */
    async confirmHomePage(): Promise<void> {
        await expect(this.page, 'Validate URL').toHaveURL('https://animated-gingersnap-8cf7f2.netlify.app/');
        await expect(this.projectsHeading, 'Validate Project Heading Visible').toBeVisible();
        console.log('Navigated to the Main Page successfully');
    }

    /**
     * Logs out of the application
     * @returns Promise<void>
     */
    async logout(): Promise<void> {
        await this.logoutBtn.click();
        await expect(this.projectBoardLoginHeading, 'Validate on Login Page').toBeVisible();
        console.log('Logged out successfully');

    }

    /**
     * Navigates to the specified application
     * @param application The application to navigate to
     * @returns Promise<void>
     */
    async navigateToApplication(application: string): Promise<void> {
        const appLocator = this.page.getByRole('button', { name: application });
        const appHeading = this.page.getByRole('banner').getByRole('heading', { name: application });
        await appLocator.click();
        await expect(appHeading, 'Validate App Heading').toHaveText(application);
        console.log(`Navigated to the ${application} project board successfully`);
    };

    /**
     * Verifies that the Task is in the specified column
     * @param task The Task to verify
     * @param column The column to verify
     * @returns Promise<boolean>
     */
    async verifyTaskInColumn(task: string, column: string): Promise<boolean> {
        let isTaskPresent = false;
        const columnLocator = this.page.getByRole('heading', { name: column }).locator('//parent::div/div');
        const taskLocator = columnLocator.filter({ hasText: task });
        try {
            await expect(taskLocator).toBeVisible();
            isTaskPresent = true;
            console.log(`Task '${task}' found in column '${column}'`);
        } catch (error) {
            console.log(`Task '${task}' not found in column '${column}'`);
        }

        return isTaskPresent;

    }

    /**
     * Returns the tags that are present in the Task
     * @param task The task to get the tags from
     * @returns Promise<boolean>
     */
    async getTaskTags(task: string): Promise<string[]> {
        let taskTags: string[] = [];
        const taskLocator = this.page.getByRole('heading', { name: task }).locator('//parent::div/div/span');
        try {
            taskTags = await taskLocator.allInnerTexts();
            console.log(`Tags found in Task '${task}': ${taskTags}`);
        } catch (error) {
            console.log(`No tags found in Task '${task}'`);
        }

        return taskTags.sort();
    }

}