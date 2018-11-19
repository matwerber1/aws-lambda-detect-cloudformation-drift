# aws-lambda-detect-cloudformation-drift

This project deploys a Lambda that triggers the DetectStackDrift API on each CloudFormation stack once every 24 hours via a CloudWatch Event. 

As of this writing (Nov 19 2018), the AWS Lambda runtime does not yet include the updated AWS Javascript SDK that supports DetectStackDrift.
Therefore, before deploying this project, you must locally install the latest SDK and include it as part of your upload artifacts; (step 3, below). 

# Deployment

1. Clone the repository
  ```sh
  git clone https://github.com/matwerber1/aws-lambda-set-cloudwatch-logs-retention
  ```

2. Within ./deploy.sh, replace YOUR_S3_BUCKET with an existing S3 bucket to use for uploading packaged template to CloudFormation. 
  
  ```sh
  BUCKET_NAME=_YOUR_S3_BUCKET
  ```

3. Navigate to the ./src directory and install the dependencies:
  
  ```sh
  npm install
  ```

4. OPTIONAL - within ./src/index.js, set config.debug to true to have the Lambda function output raw API responses to the function logs. 

5. Run deploy.sh

  ```sh
  ./deploy.sh
  ```