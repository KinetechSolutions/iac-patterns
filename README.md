# Consolidated IaC with LocalStack Demo

[![Dynamic Test Execution](https://github.com/KinetechSolutions/iac-patterns/actions/workflows/test.yaml/badge.svg)](https://github.com/KinetechSolutions/iac-patterns/actions/workflows/test.yaml)

This repository demonstrates how to use Pulumi, Terraform, and AWS CloudFormation with LocalStack for testing patterns for AWS infrastructure.

## Prerequisites

- Docker and Docker Compose
- Pulumi CLI (for Pulumi)
- Terraform CLI (for Terraform)
- AWS CLI (for CloudFormation and testing)

## Setup

1. Clone this repository.
2. Navigate to the repository directory.

## Running LocalStack

1. Start LocalStack using Docker Compose:
   ```sh
   docker-compose up -d
   ```

2. Verify that LocalStack is running:
   ```sh
   docker ps
   ```

## Deploying Infrastructure

Follow the instructions in each tool's directory (`pulumi`, `terraform`, `cloudformation`) to deploy infrastructure.

## Testing Infrastructure

After deploying infrastructure using any of the IaC tools, you can test the creation of resources using AWS CLI commands targeting LocalStack.

Example command to list S3 buckets:

```sh
aws --endpoint-url=http://localhost:4566 s3 ls
```

### Running Tests

Run the test script:

```sh
./tests/pulumi_bucket.js
```

## Cleaning Up

1. Follow the instructions in each tool's directory to clean up resources.
2. Stop and remove LocalStack container:
   ```sh
   docker-compose down
   ```

## Additional Notes

- This demo uses fixed AWS credentials (`test`) as specified in the `.env` file.
- Ensure that the AWS region and endpoint in your IaC scripts match those in LocalStack.