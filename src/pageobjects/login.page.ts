import BasePage from './base.page';

class LoginPage extends BasePage {
  private static get usernameInput (): Promise<WebdriverIO.Element> {
    return $('#username'); 
  }
  private static get passwordInput (): Promise<WebdriverIO.Element> {
    return $('#password'); 
  }
  private static get loginButton (): Promise<WebdriverIO.Element> {
    return $('button.applynow'); 
  }
 
  async login (username: string, password: string): Promise<void> {
    await (await LoginPage.usernameInput).setValue(username);
    await (await LoginPage.passwordInput).setValue(password);
    await (await LoginPage.loginButton).click();
  }
}

export default new LoginPage();
