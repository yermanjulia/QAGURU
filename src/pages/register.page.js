import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = this.page.getByPlaceholder("Email");
    this.passwordField = this.getByPlaceholder("Password");
    this.userNameField = this.page.getByPlaceholder("Your Name");
    this.signupButton = this.getByRole("button", { name: "Sign up" });
  }
  async register(userName, userEmail, userPassword) {
    await this.userNameField.click();
    await this.userNameField.fill(userName);
    await this.emailField.click();
    await this.emailField.fill(userEmail);
    await this.passwordField.click();
    await this.passwordField.fill(userPassword);
  }
}
