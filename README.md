# Painless Panes

## Repositories

This project consists of three repostitories:

1. Painless Panes (this repo) implements the app itself
2. [Painless Panes CV](https://github.com/avcopan/painless-panes-cv) implements the computer vision API used by the app
3. [Painless Panes Model](https://github.com/avcopan/painless-panes-model) provides scripts for generating and updating the Painless Panes window detection model, which is used by the computer vision API

## Accounts Needed for Basic Usage

The following accounts are needed for the app to run at all:

1. A [SendGrid account](https://sendgrid.com/pricing/) ($0+)
2. An AWS S3 Buckets account (pricing??)

Specifically, you will need an API Key for your SendGrid account, as well as a secret access key, an access key ID, and a bucket name for the AWS account (see section on Environment Variables) below.


## Running the App Locally

### Software Needed

You will need [Node.js](https://nodejs.org/en) and [Postgres](https://www.postgresql.org/) installed.

### Instructions

1. Create a database named `painless_panes`
2. Run the queries in `database.sql` to create the necessary tables
3. Run `npm install` in this directory
4. Figure out your network IP address and set your environment variables below accordingly, following the instructions below.
5. Run `npm run server`
6. Run `npm run client` and navigate to the `Network` address that logs to the screen to use the app
7. By running on the network IP address, you will be able to visit this address on your phone to test out the mobile behavior

Note that you will need the Computer Vision API to be either deployed or running locally in order for the computer vision component to work, although the app will run fine without it.

### Environment Variables

To run locally, the following environment variables must be set in a `.env` file.

```
PORT=8002
CLIENT_URL=https://<your network IP address>:5173
SERVER_URL=http://<your network IP address>:8002
SERVER_SESSION_SECRET=<your session secret>
SENDGRID_API_KEY=<API key for sendgrid>
SENDGRID_EMAIL=<sendgrid sender email address>
AWS_REGION=us-east-1
AWS_SECRET_ACCESS_KEY=<IAM user secret access key>
AWS_ACCESS_KEY_ID=<IAM user access key ID>
AWS_BUCKET=<bucket name>
DATABASE_USER=<postgres username, if your local installation requires authentication>
DATABASE_PASSWORD=<postgres password, if your local installation requires authentication>
```

Additionally, you will need to change the `CV_SERVER_ADDRESS` variable in `src/cv/cv.js` (line 4) to the address of your deployed Painless Panes CV API.

## Deploying the App

## Accounts for Deployment

To deploy the app, you will need a [Heroku account](https://www.heroku.com/pricing) ($5+) with the [Heroku Postgres add-on](https://elements.heroku.com/addons/heroku-postgresql) ($5+), in addition to the SendGrid and AWS S3 Buckets accounts.

## Heroku Set-up

For first-time deployment, you need to start with the following:
1. Install the heroku CLI
```
npm install -g heroku
```
2. Log in
```
heroku login
```
3. Create the app
```
heroku create painless-panes
```

## Heroku Environment Variables

You will need to set
```
heroku config:set CLIENT_URL=<heroku app URL, no trailing slash>
heroku config:set SERVER_URL=<heroku app URL, no trailing slash>
heroku config:set SERVER_SESSION_SECRET=<your session secret>
heroku config:set SENDGRID_API_KEY=<API key for sendgrid>
heroku config:set SENDGRID_EMAIL=<sendgrid sender email address>
heroku config:set AWS_REGION=us-east-1
heroku config:set AWS_SECRET_ACCESS_KEY=<IAM user secret access key>
heroku config:set AWS_ACCESS_KEY_ID=<IAM user access key ID>
heroku config:set AWS_BUCKET=<bucket name>
heroku config:set DATABASE_URL=<Heroku Postgres database URL>
```

## Deploy to Heroku

Once the app is created, you will use the following to deploy the current version:
```
git push heroku main
```
To open the app in a browser, you will use:
```
heroku open
```
