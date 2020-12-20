import BasePage from './base.page';
import {Payment, PurchaseFactors, PurchaseFrequency} from '../utils/enums';

class QuestionnairePage extends BasePage {
  //Id selector
  private static get emailInput (): Promise<WebdriverIO.Element> {
    return $('#developer-name');
  }

  //Id selector
  private static get populateButton (): Promise<WebdriverIO.Element> {
    return $('#populate');
  }

  //Attribute selector
  private static async purchaseFrequencyRadioButton (radioButtonLabel: string): Promise<WebdriverIO.Element> {
    return $(`[for='${radioButtonLabel}'] input`);
  }

  // Xpath selector
  private static async purchaseFactorCheckbox (checkboxLabel: string): Promise<WebdriverIO.Element> {
    return $(`.//div[@class='checkbox']/.//*[text()='${checkboxLabel}']/input`);
  }

  //JS selector
  private static get paymentSelect (): Promise<WebdriverIO.Element> {
    return $(() => {
      return document.querySelector('#preferred-payment');
    });
  }

  private static get previouslyPurchasedCheckbox (): Promise<WebdriverIO.Element> {
    return $('[name=\'tried-ecom\']');
  }

  private static get ratingSlider (): Promise<WebdriverIO.Element> {
    return $('#slider');
  }

  private static get ratingSliderButton (): Promise<WebdriverIO.Element> {
    return $('.ui-slider-handle');
  }

  private static async ratingSliderTarget (rating: number): Promise<WebdriverIO.Element> {
    return $(`.//div[@class='slider-value' and text()=${rating}]`);
  }

  private static get uploadButton (): Promise<WebdriverIO.Element> {
    return $('input#file');
  }

  private static get submitButton (): Promise<WebdriverIO.Element> {
    return $('#submit-button');
  }

  /**
   * Enter email address, click Populate button and accept the alert
   * @param email Email address
   * @private
   */
  async populateEmailAddress(email: string): Promise<void> {
    await (await QuestionnairePage.emailInput).setValue(email);

    await (await QuestionnairePage.populateButton).waitForClickable();
    await (await QuestionnairePage.populateButton).click();

    if (browser.capabilities.browserName.toLowerCase() !== 'safari') {
      await browser.acceptAlert();
    }
    else {
      await browser.keys(['Enter']);
      await browser.keys(['Escape']);
    }
  }

  async answerPurchaseFrequencyQuestion(): Promise<void> {
    return (await QuestionnairePage.purchaseFrequencyRadioButton(QuestionnairePage.getRandomValueFromEnum(PurchaseFrequency))).click();
  }

  async answerPurchaseDecisiveFactorsQuestion(): Promise<void> {
    const values = QuestionnairePage.getRandomValuesFromEnum(PurchaseFactors);
    for (const value of values) {
      await (await QuestionnairePage.purchaseFactorCheckbox(value)).click();
    }
  }

  async answerPrefferredPaymentQuestion(): Promise<void> {
    return (await QuestionnairePage.paymentSelect).selectByVisibleText(QuestionnairePage.getRandomValueFromEnum(Payment));
  }

  async answerPreviousPurchaseQuestion(): Promise<void> {
    return (await QuestionnairePage.previouslyPurchasedCheckbox).click();
  }

  async leaveAnExperienceRating(rating: number): Promise<void> {
    await browser.pause(5000);
    const slider = await QuestionnairePage.ratingSlider;
    await slider.dragAndDrop(await QuestionnairePage.ratingSliderTarget(rating));
    await browser.pause(5000);
  }

  async getExperienceRating(): Promise<number> {
    const handle = await QuestionnairePage.ratingSliderButton;

    //get the handle style left value
    const handleStyle = (await handle.getAttribute('style'))
      .split(':')[1]
      .replace('%','')
      .replace(';','')
      .trim();
    const ratingNumberFromStyle = Math.trunc(Number(handleStyle) / 10) + 1;

    //From the style value, in order to double check that the rating is the correct one,
    // we can also validate the handle position vs the rating position
    const handleLocation = await handle.getLocation();
    const ratingFromStyleLocation = await (await QuestionnairePage.ratingSliderTarget(ratingNumberFromStyle)).getLocation();
    if (handleLocation.x - ratingFromStyleLocation.x < 15) {
      return ratingNumberFromStyle;
    }
    return null;
  }

  async uploadImage(filePath: string): Promise<void> {
    await browser.execute(
      'arguments[0].style.display = \'block\'',
      (await QuestionnairePage.uploadButton)
    );
    const remoteFilePath = await browser.uploadFile(filePath);
    console.log('x' + browser.capabilities.browserName.toLowerCase() + 'x' + remoteFilePath);
    await (await QuestionnairePage.uploadButton).waitForDisplayed();
    return (await QuestionnairePage.uploadButton).setValue(remoteFilePath);
  }

  async getUploadConfirmation(): Promise<string> {
    const message = await browser.getAlertText();
    await browser.acceptAlert();
    return message;
  }

  async submitForm(): Promise<void> {
    await (await QuestionnairePage.submitButton).waitForDisplayed();
    return (await QuestionnairePage.submitButton).click();
  }

  private static getRandomValueFromEnum<T>(type: T): string {
    const rand = Math.floor(Math.random() * Object.keys(type).length);
    return type[Object.keys(type)[rand]];
  }

  private static getRandomValuesFromEnum<T>(type: T): string[] {
    const arr = Object.keys(type);
    let len = arr.length;

    let numberOfValues = Math.floor(Math.random() * Object.keys(type).length);
    const result = new Array(numberOfValues),
      taken = new Array(len);

    while (numberOfValues--) {
      const x = Math.floor(Math.random() * len);
      const value = arr[x in taken ? taken[x] : x];
      result[numberOfValues] = type[value];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
} 

export default new QuestionnairePage();
