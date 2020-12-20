import BasePage from './base.page';

class ThankYouPage extends BasePage {
  private static get successMessage (): Promise<WebdriverIO.Element> {
    return $('#message p');
  }
 
  async getMessage (): Promise<string> {
    return (await ThankYouPage.successMessage).getText();
  }
}

export default new ThankYouPage();
