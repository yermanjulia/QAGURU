import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { faker } from "@faker-js/faker";
import { MainPage, RegisterPage, SettingsPage } from "../src/pages/index";

test.describe.configure({ mode: "serial" });

const url = "https://realworld.qa.guru";
let mainPage;
let settingsPage;
let registerPage;
let newUser;

test.describe("Settings Page Tests", () => {
  // Precondition: User is logged in
  test.beforeEach(async ({ page }) => {
    newUser = {
      bio: faker.music.genre(),
      email: faker.internet.email(),
      name: faker.person.firstName("female"),
      password: faker.internet.password(),
    };

    // Instantiate page objects
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
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

  //User can insert URL of profile picture
  test("User can insert URL of profile picture", async ({ page }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    settingsPage = new SettingsPage(page);
    const urlProfilePicture = faker.image.url();

    await allure.owner("Julia Y");
    await allure.tags("smoke", "regression", "settings");
    await allure.severity("critical");
    await allure.epic("Web interface");
    await allure.feature("Essential features");
    await allure.story("Authentication");
    await allure.parentSuite("Tests for web interface");
    await allure.suite("Tests for essential features");
    await allure.subSuite("Tests for authentication");

    await settingsPage.insertUrlPicture(urlProfilePicture);
    await settingsPage.updateSettings();

    await expect(settingsPage.profilePicture).toHaveAttribute(
      "value",
      urlProfilePicture
    );
  });

  //   // Test: User can enter bio
  test("User can enter bio", async ({ page }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    settingsPage = new SettingsPage(page);
    const bio = faker.music.genre();
    await settingsPage.enterUserBio(bio);
    await settingsPage.updateSettings();

    // Verify that the bio field contains the expected value
    await expect(settingsPage.bioField).toHaveValue(bio);
  });

  // Test: User can update email and login with new credentials
  test.skip("User can update email and login with new credentials", async ({
    page,
  }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    settingsPage = new SettingsPage(page);
    const newEmail = faker.internet.email();

    // Update email
    await settingsPage.updateEmail(newEmail);
    await settingsPage.updateSettings();

    await expect(settingsPage.emailField).toHaveValue(newEmail);

    //Log out
    await mainPage.logout();
    await expect(page.getByText("Loading articles list...")).toBeVisible();
    await expect(page.getByText("Loading articles list...")).toBeHidden();
    await mainPage.loginLink.click();
    // Log in with the new email
    await mainPage.login(newEmail, newUser.password);
    // Verify login was successful
    await expect(page).toHaveURL("https://realworld.qa.guru/#/");
  });

  // Test: User can update password and able to login with updated password

  test.skip("User can update password and able to login with updated password", async ({
    page,
  }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    settingsPage = new SettingsPage(page);
    const newPassword = faker.internet.password();
    // Update password
    await settingsPage.updatePassword(newPassword);
    await settingsPage.updateSettings();

    //Log out
    await mainPage.logout();
    await expect(page.getByText("Loading articles list...")).toBeVisible();
    await expect(page.getByText("Loading articles list...")).toBeHidden();
    await mainPage.loginLink.click();
    // Log in with the new password
    await mainPage.login(newUser.email, newPassword);
    // Verify login was successful
    await expect(page).toHaveURL("https://realworld.qa.guru/#/");
  });
});
