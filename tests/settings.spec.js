import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage, RegisterPage, SettingsPage } from "../src/pages/index";

const url = "https://realworld.qa.guru";

test.describe("Settings Page Tests", () => {
  let settingsPage;
  let newUser;

  // Precondition: User is logged in
  test.beforeEach(async ({ page }) => {
    newUser = {
      bio: faker.music.genre(),
      email: faker.internet.email(),
      name: faker.person.firstName("female"),
      password: faker.internet.password(),
    };

    // Instantiate page objects
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    settingsPage = new SettingsPage(page);

    // Open the main page, register, and login
    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.register(newUser.name, newUser.email, newUser.password);
    await registerPage.signupButton.click();
    // await page.goto(`${url}/#/settings`);

    // Assert that the user is redirected to the home page after registration
    await expect(page).toHaveURL("https://realworld.qa.guru/#/");
    await page.goto(`${url}/#/settings`);
    await expect(page).toHaveURL(`${url}/#/settings`, { timeout: 10000 });
  });

  // test("Settings Page Tests", async ({ page }) => {
  //   // Test: User can navigate to the Settings page
  //   await test.step("User can navigate to the Settings page", async () => {
  //     await expect(page).toHaveURL(`${url}/#/settings`);
  //   });

  //User can insert URL of profile picture
  test("User can insert URL of profile picture", async () => {
    const urlProfilePicture = faker.image.url();

    await settingsPage.insertUrlPicture(urlProfilePicture);
    await settingsPage.updateSettings();

    await expect(settingsPage.profilePicture).toHaveAttribute(
      "value",
      urlProfilePicture
    );
  });

  // Test: User can update name

  test("User can update name", async () => {
    const name = faker.person.firstName();
    await settingsPage.updateName(name);
    await settingsPage.updateSettings();

    await expect(settingsPage.nameField).toHaveValue(name);
  });

  //   // Test: User can enter bio
  test("User can enter bio", async () => {
    const bio = faker.music.genre();
    await settingsPage.enterUserBio(bio);
    await settingsPage.updateSettings();

    await expect(settingsPage.bioField).toHaveValue(bio);
  });

  // Test: User can update email
  test("User can update email", async () => {
    const email = faker.internet.email();

    await settingsPage.updateEmail(email);
    await settingsPage.updateSettings();

    await expect(settingsPage.emailField).toHaveValue(email);
  });

  // Test: User can update password

  test("User can update password", async () => {
    const password = faker.internet.password();

    await settingsPage.updatePassword(password);
  });

  test("User is able to login with updated password", async () => {
    await settingsPage.logout();
    await settingsPage.login(newUser.email, newPassword);
    await expect(page).toHaveURL(`${url}/#/settings`, { timeout: 10000 });
  });
});
