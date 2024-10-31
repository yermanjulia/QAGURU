import { BasePage } from "./base.page";

export class SettingsPage extends BasePage {
  constructor(page) {
    super(page);

    this.urlProfilePicture = this.page.getByPlaceholder(
      "URL of profile picture"
    );
    this.nameField = this.page.getByPlaceholder("Your Name");
    this.bioField = this.page.getByPlaceholder("Short bio about you");
    this.emailField = this.page.getByPlaceholder("Email");
    this.passwordField = this.page.getByPlaceholder("New Password");
    this.updateSettingsButton = this.page.getByRole("button", {
      name: "Update Settings",
    });
  }
  async insertUrlPicture(url) {
    await this.urlProfilePicture.click();
    await this.urlProfilePicture.fill(url);
  }
  async updateName(name) {
    await this.nameField.click();
    await this.nameField.fill(name);
  }
  async enterUserBio(bio) {
    await this.bioField.click();
    await this.bioField.fill(bio);
  }
  async updateEmail(email) {
    await this.emailField.click();
    await this.emailField.fill(email);
  }
  async updatePassword(password) {
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }
  async updateSettings() {
    await this.updateSettingsButton.click();
  }
}
