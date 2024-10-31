//Should I include preconditions to this test? If so? How?

import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage, RegisterPage, SettingsPage } from "../src/pages/index";

//User navigates to the Settings page
test("User can navigate to the Settings page", async ({ page }) => {
  const mainPage = new MainPage(page);
  const settingsPage = new SettingsPage(page);

  await mainPage.goToSettings();
});
//Test case (User can insert URL of profile picture)
test("User can insert URL of profile picture", async ({ page }) => {
  let urlProfilePicture = faker.image.url(); // 'https://loremflickr.com/640/480?lock=1234'

  await settingsPage.insertUrlPicture(urlProfilePicture);
});
//Test case (User can update name)
test("User can update name", async ({ page }) => {
  let name = faker.person.firstName;
  await settingsPage.updateName(name);
});

//Test case (User can enter bio)
test("User can enter bio", async ({ page }) => {
  let bio = faker.music.genre();
  await settingsPage.enterUserBio(bio);
});
//Test case (User can update email)
test("User can update email", async ({ page }) => {
  let email = faker.internet.email();
  await settingsPage.updateEmail(email);
});
//Test case (User can update password)
test("User can update password", async ({ page }) => {
  let password = faker.internet.password();
  await settingsPage.updatePassword(password);
});
//Test case (User can update settings)

test("User can update settings", async ({ page }) => {
  await settingsPage.updateSettings();
});
