# TempMail Voter Automation

## Description
`TempMail Voter Automation` is a Node.js script designed to automate the process of creating temporary email addresses using the TempMail.lol API, casting votes on the WaysConf platform, and confirming those votes through email verification. The script is set to run in a loop, allowing for multiple votes to be cast using different email addresses.

## Features
- **Automated Email Creation**: Generates temporary email addresses seamlessly.
- **Automated Voting**: Casts votes on the WaysConf platform using the generated email addresses.
- **Email Verification**: Waits for the confirmation email and automatically confirms the vote.
- **Looped Execution**: The entire process can be repeated multiple times without manual intervention.

## Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/illia-git/TempMail-Voter-Automation.git
   ```

2. **Navigate to the Directory**:
   ```bash
   cd TempMail-Voter-Automation
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Script**:
   ```bash
   node main.mjs
   ```

## Usage

Once you've set up the script, it will:
1. Create a new temporary email address.
2. Use this email to cast a vote on the WaysConf platform.
3. Wait for the confirmation email.
4. Confirm the vote by simulating the confirmation click.
5. Repeat the process for a specified number of iterations.

## Customization

- **Number of Iterations**: You can change the number of iterations by modifying the loop count in the main function.
- **Wait Time**: Adjust the `EMAIL_WAIT_TIME` constant if you want to change the waiting duration for the confirmation email.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
