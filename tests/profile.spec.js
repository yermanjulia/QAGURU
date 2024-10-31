import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
const url = "https://realworld.qa.guru/#/";

test.describe("Profile User page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);

    let userName = faker.person.firstName("female"); // 'Victoria'
    let userEmail = faker.internet.email(); // 'Victoria@gmail.com'
    let userPassword = faker.internet.password(); // 'Victoria'

    await page.getByRole("link", { name: "Sign up" }).click();
    await page.getByPlaceholder("Your Name").click();
    await page.getByPlaceholder("Your Name").fill(userName);
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(userEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(userPassword);
    await page.getByRole("button", { name: "Sign up" }).click();

    await page.getByText("julia2").click();
    await page.getByText("julia2").click();
    await expect(
      page.getByRole("link", { name: " New Article" })
    ).toBeVisible();
  });

  test(async ({ page }) => {
    //todo click on menu

    await page.locator(".dropdown-toggle").click();
    await page.getByRole("link", { name: "settings" }).click();
    await page.getByPlaceholder("Short bio about you").click();
    await page.getByPlaceholder("Short bio about you").fill(userBio);
    await page.getByRole("button", "Update Settings").click();

    await expect(page.getByPlaceholder("Short bio about you")).toBeVisible(
      userBio
    );
  });
});
