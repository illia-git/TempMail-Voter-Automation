# TempMail Voter Automation

This script automates the process of voting for a project on `vote.waysconf.com`. It uses temporary email addresses to vote for a specific project and then confirms the vote by accessing the verification link sent to the email.

## Background

This code was created during my employment at Artegence (Efigence). I was motivated by an email from our CEO asking us to vote for our company to secure the first place. Eager to make a significant impact, I noticed that the platform lacked protections like Captcha. I immediately began crafting this code. It's essential to note that this initiative was entirely my own and was not requested by anyone at Artegence. I alone am responsible for this action, and no one else should be held accountable.

## Features

- Uses `tempmail.lol` to generate temporary email addresses.
- Votes for a specific project using the provided project ID.
- Waits for the confirmation email to arrive.
- Extracts the confirmation link from the email and confirms the vote.
- Supports parallel execution to speed up the voting process.

## Dependencies

- `axios`: For making HTTP requests.
- `cheerio`: For parsing and manipulating HTML content.
- `tempmail.lol`: For generating temporary email addresses.

## How to Use

1. Ensure you have Node.js installed.
2. Clone the repository.
3. Install the required dependencies using `npm install`.
4. Run the script using `node main.mjs`.

## Configuration

The script contains several constants that can be modified:

- `VOTE_API_URL`: The API endpoint for voting.
- `REFERRER_URL`: The referrer URL.
- `PROJECT_ID`: The ID of the project you want to vote for.
- `EMAIL_WAIT_TIME`: The time to wait for the confirmation email (default is 10 seconds).
- `PARALLEL_EXECUTION_COUNT`: The number of parallel executions.
- `DELAY_BETWEEN_EXECUTIONS`: The delay between each execution in parallel mode.

## Disclaimer

Please use this script responsibly and ethically. Automating votes can be against the terms of service of many platforms. Ensure you have the necessary permissions and are not violating any rules or terms of service.
