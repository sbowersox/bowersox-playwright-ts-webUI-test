import { expect, test } from "../baseTest";

const username = process.env.LOGIN_USERNAME ?? '';
const password = process.env.LOGIN_PASSWORD ?? '';

interface TestData {
    id: number;
    application: string;
    task: string;
    column: string;
    tags: string[];
}

// Test data
const testData: Array<TestData> = [
    { id: 1, application: 'Web Application', task: 'Implement user authentication', column: 'To Do', tags: ['Feature', 'High Priority'] },
    { id: 2, application: 'Web Application', task: 'Fix navigation bug', column: 'To Do', tags: ['Bug'] },
    { id: 3, application: 'Web Application', task: 'Design system updates', column: 'In Progress', tags: ['Design'] },
    { id: 4, application: 'Mobile Application', task: 'Push notification system', column: 'To Do', tags: ['Feature'] },
    { id: 5, application: 'Mobile Application', task: 'Offline mode', column: 'In Progress', tags: ['Feature', 'High Priority'] },
    { id: 6, application: 'Mobile Application', task: 'App icon design', column: 'Done', tags: ['Design'] }
]

for (const { id, application, task, column, tags } of testData) {
    test.describe('Main Page Task and Tag Testing', { tag: ['@task', '@tag'] }, () => {

        test.beforeEach('Login', async ({ loginPage, mainPage }) => {

            await loginPage.goto();
            await loginPage.login(username, password)
            await mainPage.confirmHomePage();

        });

        test(`TEST-${id} - ${application}`, async ({ mainPage }) => {

            await mainPage.navigateToApplication(application);
            const isTaskInColumn = await mainPage.verifyTaskInColumn(task, column);
            expect(isTaskInColumn, 'Validate Task in correct column').toBeTruthy();
            const tagsInTask = await mainPage.getTaskTags(task);
            expect(tagsInTask.length, 'Validate tag count matches').toBe(tags.length);
            expect(tagsInTask, 'Validate tags match').toEqual(tags.sort());

        });

        test.afterEach('Logout', async ({ mainPage }) => {

            await mainPage.logout();

        });
    });
}