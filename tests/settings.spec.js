//Should I include preconditions to this test? If so? How?

import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage, RegisterPage, SettingsPage } from "../src/pages/index";

test.describe("Settings Page Tests", () => {
  let settingsPage;

  //Precondition:User log in and navigated to the Settings page before each test
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

    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.register(newUser.name, newUser.email, newUser.password);
  });

  test("User can navigate to the Settings page", async ({ page }) => {
    await page.goto("https://realworld.qa.guru/#/settings");
    await expect(page).toHaveURL("https://realworld.qa.guru/#/settings");
  });

  //User can insert URL of profile picture
  test("User can insert URL of profile picture", async ({ page }) => {
    let urlProfilePicture = faker.image.url(); // 'https://loremflickr.com/640/480?lock=1234'

    await settingsPage.insertUrlPicture(urlProfilePicture);
    await expect(settingsPage.profilePicture).toHaveAttribute(
      "src",
      urlProfilePicture
    );
  });
  //User can update name
  test("User can update name", async ({ page }) => {
    let name = faker.person.firstName;
    await settingsPage.updateName(name);
    await expect(settingsPage.nameField).toHaveValue(name);
  });

  //User can enter bio
  test("User can enter bio", async ({ page }) => {
    let bio = faker.music.genre();
    await settingsPage.enterUserBio(bio);
    await expect(settingsPage.bioField).toHaveValue(bio);
  });
  //User can update email
  test("User can update email", async ({ page }) => {
    let email = faker.internet.email();
    await settingsPage.updateEmail(email);
    await expect(settingsPage.emailField).toHaveValue(email);
  });
  //User can update password
  test("User can update password", async ({ page }) => {
    let password = faker.internet.password();
    await settingsPage.updatePassword(password);
    ///????
  });
  //User can update settings

  test("User can update settings", async ({ page }) => {
    await settingsPage.updateSettings();
  });
});
