import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage, RegisterPage, SettingsPage } from "../src/pages/index";

//User navigates to the main page
const url = "https://realworld.qa.guru/#/";
let newUser;

test.describe("Sign up page", () => {
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

    // Navigate to main page and open registration
    await mainPage.open(url);
    await mainPage.goToRegister();

    //Register with new user data
    await registerPage.register(newUser.name, newUser.email, newUser.password);
  });

  test("User can register with valid credentials", async ({ page }) => {
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    //Assetion: Check if user is successfully registered
    await expect(page).toHaveURL("https://realworld.qa.guru/#/");
  });
});
