import * as puppeteer from 'puppeteer';

const launchOptions = {
  headless: false,
  args: ['--no-sandbox'],
};

const loginUrl = 'https://attendance.moneyforward.com/employee_session/new';
const OFFICE_ACCOUNT_NAME = process.env.OFFICE_ACCOUNE_NAME;
const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;

export const dakoku = async (type: 'clockin'| 'clockout') => {
  const browser: puppeteer.Browser = await puppeteer.launch(launchOptions);
  const page: puppeteer.Page = await browser.newPage();
  try {
    await page.goto(loginUrl);
    await page.type('#employee_session_form_office_account_name', OFFICE_ACCOUNT_NAME!);
    await page.type('#employee_session_form_account_name_or_email', LOGIN_EMAIL!);
    await page.type('#employee_session_form_password', LOGIN_PASSWORD!);

    await page.click('.attendance-before-login-card-button input');
    await page.waitForSelector('.attendance-card-time-stamp-button.attendance-text-link');
    const elements = await page.$$('.attendance-card-time-stamp-button.attendance-text-link');
    if (type === 'clockin') {
      await elements[0].click();
      console.log('出勤成功');
    } else {
      await elements[1].click();
      console.log('退勤成功');
    }
  } finally {
    await browser.close();
  }
}
