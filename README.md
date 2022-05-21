# New Dog Alerts
This application uses the the [Petfinder API v2.0](https://www.petfinder.com/developers/v2/docs/) to fetch dogs and [Mailjet](https://www.mailjet.com/) to send emails.

## Installation

```shell
git clone https://github.com/NGatti1997/new-dog-alerts.git
cd new-dog-alerts
npm install
```

## Setup
You must have a mailgun account and a Petfinder API Key.

Configure the app by including a `.env` file in the project root and define the following variables:
variable | value
--- | ---
PETFINDER_API_KEY | Petfinder API key or Client ID
PETFINDER_SECRET_KEY | Petfinder secret key
MJ_FROM_EMAIL | MailJet sender email address
MJ_FROM_NAME | MailJet sender name
MJ_API_KEY | MailJet API Key
MJ_SECRET_KEY | MailJet Secret Key
MG_DOMAIN | Mailgun domain
CHECK_FREQUENCY_MINUTES | How often you plan on checking for new dogs, this affects how recent dogs must have been updated to be counted as new, as well as how often checks are run
NEW_DOGS_RECIPIENTS | Comma-separated email addresses to receieve new dog alerts
ERROR_RECIPIENTS | Comma-separated email addresses to receive error emails (e.g. failed to fetch)
ZIP_CODE | Location to search for dogs
SEARCH_DISTANCE | Search radius
DOG_AGE | Age of dog on PetFinder. Options are baby, young, adult, senior (comma separated list)
DOG_SIZE | Size of dog on PetFinder. Options are small, medium, large, xlarge (comma separated list)

## Usage
Running `index.js`  starts a node-cron instance that finds dogs that have been updated/added to Petfinder since `CHECK_FREQUENCY_MINUTES` ago and sends an email to `NEW_DOGS_RECIPIENTS` with these dogs. Dogs without photos are not included.

Run this process with

```shell
npm run start
```

or

```shell
node index
```
