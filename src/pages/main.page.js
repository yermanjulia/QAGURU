import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.signupLink = page.getByRole("link", { name: "Sign up" });
    this.profileDropdown = page.locator(
      ".nav-link.dropdown-toggle.cursor-pointer"
    );
    this.logoutButton = page.getByText("Logout");
    this.emailField = page.locator['[placeholder="Email"]'];
    this.passwordField = this.page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }
  async goToRegister() {
    await this.signupLink.click();
  }

  async logout() {
    await this.profileDropdown.waitFor();
    await this.profileDropdown.click();

    await this.logoutButton.waitFor();
    await this.logoutButton.click();
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);

    await this.loginButton.click();

    await this.page.waitForURL("https://realworld.qa.guru/#/");
  }
}
