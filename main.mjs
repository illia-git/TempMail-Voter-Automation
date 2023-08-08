import axios from 'axios';
import cheerio from 'cheerio';
import { TempMail } from 'tempmail.lol';

const VOTE_API_URL = 'https://vote.waysconf.com/api/vote';
const REFERRER_URL = 'https://vote.waysconf.com/ca24-redesign-of-credit-agricole-mobile-banking-app';
const PROJECT_ID = '64c29aa02960bbe7386ee146';
const EMAIL_WAIT_TIME = 10000;
const PARALLEL_EXECUTION_COUNT = 3;
const DELAY_BETWEEN_EXECUTIONS = 1000;

const HEADERS = {
  accept: 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7',
  'content-type': 'application/json',
  'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'Windows',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
};

const voteForProject = async (email) => {
  try {
    await axios.post(
      VOTE_API_URL,
      {
        projectId: PROJECT_ID,
        email,
        marketing: true,
      },
      {
        headers: HEADERS,
        referrer: REFERRER_URL,
      }
    );
  } catch (error) {
    console.error(`Error while voting for ${email}:`, error.message);
  }
};

const waitForEmail = (time) => new Promise((resolve) => setTimeout(resolve, time));

const getConfirmationLink = (emails) => {
  const htmlContent = emails[0]?.html;
  const $ = cheerio.load(htmlContent);
  return $('a[href^="https://vote.waysconf.com/ca24-redesign-of-credit-agricole-mobile-banking-app?verifyCode="]').attr('href');
};

const confirmVote = async (link) => {
  try {
    await axios.get(link);
  } catch (error) {
    console.error(`Error while confirming vote with link ${link}:`, error.message);
  }
};

const createEmailVoteAndConfirm = async (index) => {
  try {
    const tempmail = new TempMail();
    const { address, token } = await tempmail.createInbox();
    console.log(`Email Address ${index + 1}:`, address);

    await voteForProject(address);

    console.log(`Waiting for 10 seconds for the email ${index + 1}...`);
    await waitForEmail(EMAIL_WAIT_TIME);

    const emails = await tempmail.checkInbox(token);
    if (emails?.length) {
      console.log(`Received Emails ${index + 1}:`, emails);
      const confirmationLink = getConfirmationLink(emails);
      if (confirmationLink) {
        console.log(`Confirmation Link ${index + 1}:`, confirmationLink);
        await confirmVote(confirmationLink);
        console.log(`Vote confirmed ${index + 1}!`);
      }
    } else {
      console.log('No emails received in the given time.');
    }
  } catch (error) {
    console.error(`Error in createEmailVoteAndConfirm for index ${index}:`, error.message);
  }
};

const createEmailVoteAndConfirmParallel = async () => {
  const promises = Array.from({ length: PARALLEL_EXECUTION_COUNT }, async (_, index) => {
    await waitForEmail(index * DELAY_BETWEEN_EXECUTIONS);
    return createEmailVoteAndConfirm(index);
  });
  await Promise.all(promises);
};

createEmailVoteAndConfirmParallel();
