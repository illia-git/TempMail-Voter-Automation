import { TempMail } from "tempmail.lol";
import fetch from "node-fetch";

const VOTE_API_URL = "https://vote.waysconf.com/api/vote";
const REFERRER_URL = "https://vote.waysconf.com/ca24-redesign-of-credit-agricole-mobile-banking-app";
const PROJECT_ID = "64c29aa02960bbe7386ee146";
const EMAIL_WAIT_TIME = 10000;

const createHeaders = () => ({
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
  "content-type": "application/json",
  "sec-ch-ua": '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "Windows",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
});

const voteForProject = async (email) => {
  await fetch(VOTE_API_URL, {
    headers: createHeaders(),
    referrer: REFERRER_URL,
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify({
      projectId: PROJECT_ID,
      email,
      marketing: true,
    }),
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
};

const waitForEmail = (time) => new Promise((resolve) => setTimeout(resolve, time));

const getConfirmationLink = (emails) => {
  const linkRegex = /href="(https:\/\/vote\.waysconf\.com\/ca24-redesign-of-credit-agricole-mobile-banking-app\?verifyCode=[^"]+)"/;
  const match = emails[0].html.match(linkRegex);
  return match && match[1];
};

const confirmVote = async (link) => {
  await fetch(link);
};

const createEmailVoteAndConfirmLoop = async () => {
  const tempmail = new TempMail();

  for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i + 1}...`);
    try {
      const inbox = await tempmail.createInbox();
      console.log("Email Address:", inbox.address);

      await voteForProject(inbox.address);

      console.log(`Waiting for ${EMAIL_WAIT_TIME / 1000} seconds for the email...`);
      await waitForEmail(EMAIL_WAIT_TIME);

      const emails = await tempmail.checkInbox(inbox.token);
      if (emails && emails.length > 0) {
        console.log("Received Emails:", emails);
        const confirmationLink = getConfirmationLink(emails);
        if (confirmationLink) {
          console.log("Confirmation Link:", confirmationLink);
          await confirmVote(confirmationLink);
          console.log("Vote confirmed!");
        }
      } else {
        console.log("No emails received in the given time.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};

createEmailVoteAndConfirmLoop();
