import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.signupButton = page.getByRole("link", { name: "Sign up" });
  }
  async goToRegister() {
    await this.signupButton.click();
  }
}
