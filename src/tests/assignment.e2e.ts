import LoginPage from '../pageobjects/login.page';
import Constants from '../utils/constants';
import QuestionnairePage from '../pageobjects/questionnaire.page';
import SeleniumAutomationPage from '../pageobjects/selenium-automation.page';
import ThankYouPage from '../pageobjects/thank-you.page';

describe('User', () => {
  /**
   * NOTE:
   * Added all 17 steps from the assigment in a single test (as this it what I understood from the request),
   * however I feel they should be split into multiple tests each with it's own validations and more atomic
   */
  it('should be able to perform all actions from assigment', async () => {
    //Login
    await LoginPage.openUrl(Constants.AUTOMATION_DEMO_URL);
    await LoginPage.login(Constants.USERNAME, Constants.PASSWORD);
    expect(await LoginPage.getSuccessfulLoginMessage()).toBe(Constants.SUCCESSFUL_LOGIN_MESSAGE);

    //alert
    await QuestionnairePage.populateEmailAddress(Constants.EMAIL_ADDRESS);

    //How frequently do you make a purchase on an eCommerce website?
    await QuestionnairePage.answerPurchaseFrequencyQuestion();

    //Which are the decisive factors before making an eCommerce purchase?
    await QuestionnairePage.answerPurchaseDecisiveFactorsQuestion();

    //What mode of payment do you prefer usually?
    await QuestionnairePage.answerPrefferredPaymentQuestion();

    //I have made an eCommerce purchase in the last 1 year
    await QuestionnairePage.answerPreviousPurchaseQuestion();

    //How would you rate the recent experience of your eCommerce purchase?
    await QuestionnairePage.leaveAnExperienceRating(Constants.QUESTION_EXPERIENCE_RATING);
    expect(await QuestionnairePage.getExperienceRating()).toBe(Constants.QUESTION_EXPERIENCE_RATING);
    const currentWindow = await browser.getWindowHandle();

    //Navigate to the Selenium Automation page
    await QuestionnairePage.openNewTab(Constants.SELENIUM_AUTOMATION_URL);

    const imagePath = await SeleniumAutomationPage.downloadImage();

    await browser.switchToWindow(currentWindow);

    //Upload
    await QuestionnairePage.uploadImage(imagePath);
    expect(await QuestionnairePage.getUploadConfirmation()).toBe(Constants.SUCCESSFUL_UPLOAD_MESSAGE);

    //Submit form
    await QuestionnairePage.submitForm();

    expect(await ThankYouPage.getMessage()).toBe(Constants.SUCCESSFUL_SUBMIT_MESSAGE);
  });

  afterAll(async () => {
    await browser.closeWindow();
  });

});

