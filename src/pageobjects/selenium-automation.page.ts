import BasePage from './base.page';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

class SeleniumAutomationPage extends BasePage {
  private static get jenkinsIcon (): Promise<WebdriverIO.Element> {
    return $('.//img[contains(@src,\'jenkins\')]');
  }
 
  async downloadImage (): Promise<string> {
    await (await SeleniumAutomationPage.jenkinsIcon).waitForClickable();
    const imageUrl = await (await SeleniumAutomationPage.jenkinsIcon).getAttribute('src');
    console.log(imageUrl);

    const downloadUrl = new URL(imageUrl);
    const fullPath = downloadUrl.pathname;
    const splitPath = fullPath.split('/');
    const fileName = splitPath.splice(-1).pop();

    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    fs.writeFileSync(path.join(__dirname,fileName), buffer);

    return path.join(__dirname,fileName);
  }
}

export default new SeleniumAutomationPage();
