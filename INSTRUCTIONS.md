# Email Authentication (Server-side)

### Install Dependencies

In this directory, run `npm install` to install the node dependencies.

### Create SendGrid Account

Follow [these instructions](https://www.passportjs.org/tutorials/email/setup/) to set up a SendGrid account.

You will need to enter your API key and the email you authenticated with SendGrid below in the `SENDGRID_API_KEY` and `SENDGRID_EMAIL` environment variables.

(Eventually, we will need a single API key along with an authenticated business email address for the project.)

### Set Environment Variables

Before setting your environment variables, run `npm run client` to figure out your
network IP address.
You should see something like this:
```
> vite --host

  VITE v4.4.9  ready in 672 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: https://10.0.1.200:5173/
```
The `Network` address at the bottom shows your network IP address and will be used as
the `CLIENT_URL` below.

The server URL will be accessible via HTTP at the same address on port 8002, so you will
set the `SERVER_URL` environment variable accordingly.

The following environment variables must be set in a `.env` file.

```
PORT=8002   # the port used by the server
DATABASE_URL=<URL to connect to database>
CLIENT_URL=https://10.0.1.200:5173
SERVER_URL=http://10.0.1.200:8002
CV_SERVER_URL=https://painless-panes-cv-25b4b9560fd0.herokuapp.com
SERVER_SESSION_SECRET=<your session secret>
SENDGRID_API_KEY=<API key for sendgrid>
SENDGRID_EMAIL=<sendgrid sender email address>

AWS_REGION=us-east-1
AWS_SECRET_ACCESS_KEY=<painless-panes-dev IAM user secret access key>
AWS_ACCESS_KEY_ID=<painless-panes-dev IAM user access key ID>
AWS_BUCKET=painless-panes
```

### Test with Postman

1. Submit a POST request to `http://localhost:8002/api/email/send` using the following raw/JSON body (put in your email address):

```
{
    "email": <your email address goes here>
}
```

2. Open your email and look for a message titled "Verify your Email". If you authenticated a personal sender email with SendGrid, it probably landed in your spam folder.
3. Click the "Sign In" link in that email.
4. Copy the magic link URL from your browser into a GET request. This will add a cookie to initiate a user session with your email.
5. Submit a GET request to `http://localhost:8002/api/user`. If the response contains your user ID and email, you are authenticated.

### Verify S3 Bucket Access

Command line

1. Install AWS CLI (`https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html`)
2. Add a profile: `aws configure --profile painless-panes-dev`
3. Run `export AWS_PROFILE=painless-panes-dev`
4. Run `aws s3 ls s3://painless-panes/*YOUR USER ID HERE*/` (don't forget the slash at the end)

Console

1. Open `https://s3.console.aws.amazon.com/s3/buckets/painless-panes`
