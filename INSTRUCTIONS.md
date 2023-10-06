### Create SendGrid Account

Follow [these instructions](https://www.passportjs.org/tutorials/email/setup/) to set up a SendGrid account.

You will need to enter your API key and the email you authenticated with SendGrid in the `SENDGRID_API_KEY` and `SENDGRID_EMAIL` environment variables.

### Verify S3 Bucket Access

Command line

1. Install AWS CLI (`https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html`)
2. Add a profile: `aws configure --profile painless-panes-dev`
3. Run `export AWS_PROFILE=painless-panes-dev`
4. Run `aws s3 ls s3://painless-panes/*YOUR USER ID HERE*/` (don't forget the slash at the end)

Console

1. Open `https://s3.console.aws.amazon.com/s3/buckets/painless-panes`
