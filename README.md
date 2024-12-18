# Playwright TypeScript WebUI Test

This repository contains a sample project for end-to-end testing of web applications using Playwright with TypeScript. The purpose of this project is to demonstrate how to set up and write automated tests for web user interfaces, ensuring that web applications function correctly across different browsers.

## Features

- **Playwright Integration**: Utilizes Playwright for browser automation.
- **TypeScript Support**: Written in TypeScript for type safety and better developer experience.
- **Cross-Browser Testing**: Tests can be run on multiple browsers including Chromium, Firefox, and WebKit.
- **Headless Testing**: Supports headless mode for faster test execution.
- **CI/CD Ready**: Easily integrable with continuous integration and continuous deployment pipelines.

## Getting Started

To get started with this project, follow the instructions below:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/bowersox-playwright-ts-webUI-test.git
    cd bowersox-playwright-ts-webUI-test
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Add credentials**:
    From the .env file, fill in the appropriate credentials to allow the test to run
    LOGIN_USERNAME=[username]
    LOGIN_PASSWORD=[password]
    The .env file is in the repo but is on gitignore so no local changes should be pushed back 

4. **Run tests**:
    ```bash
    npx playwright test
    ```

## Contributing

No contrabutions are being accepted at this time as for personal independendant training.

## License

This project is licensed under the MIT License.