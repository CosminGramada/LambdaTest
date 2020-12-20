export default class BasePage {
  private static get toastMessage (): Promise<WebdriverIO.Element> {
    return $('.//div[@class=\'toast jam\']'); 
  }
  private static get acceptCookiesButton (): Promise<WebdriverIO.Element> {
    return $('.cbtn.btn_accept_ck'); 
  }
 
  async getSuccessfulLoginMessage(): Promise<string> {
    const message = await (await BasePage.toastMessage).getText();
    await (await BasePage.toastMessage).waitForDisplayed({reverse: true});

    //return the successful login message after removing the nasty 'x' button character and white spaces
    return message.trim().substring(1).trim();
  }

  async openUrl(url: string): Promise<void> {
    await browser.url(url);
    return BasePage.acceptCookies();
  }

  async openNewTab(url: string): Promise<void> {
    await browser.newWindow(url);
    return BasePage.acceptCookies();
  }

  private static async acceptCookies(): Promise<void> {
    await (await BasePage.acceptCookiesButton).waitForExist();
    return (await BasePage.acceptCookiesButton).click();
  }
}
