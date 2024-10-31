import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage, RegisterPage, SettingsPage } from "../src/pages/index";

//User navigates to the main page
const url = "https://realworld.qa.guru/#/";
let newUser;
//???? What page is this we trying to describe?
test.describe("Sign up page ?", () => {
  test.beforeEach(async ({ page }) => {
    newUser = {
      bio: faker.music.genre(),
      email: faker.internet.email(),
      name: faker.person.firstName("female"),
      password: faker.internet.password(),
    };
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.open(url);
    await registerPage.register(newUser.name, newUser.email, newUser.password);
    await mainPage.goToRegister();
  });

  test("User can change bio", async ({ page }) => {
    const mainPage = new MainPage(page);
    //Should this test case be in the register page?
    const settingsPage = new SettingsPage(page);

    await mainPage.goToSettings();
    await settingsPage.updateProfile(newUser.bio);
    let profileInfo = await settingsPage.getProfile();
    await expect(profileInfo.bio).toHaveText(newUser.bio);
  });
});
