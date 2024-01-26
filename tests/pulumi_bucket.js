#!/usr/bin/env bun

import { $ } from "bun"
console.log('Running Pulumi resource check...')

const pulumiVersion = (await $`pulumilocal version`.text()).trim()
console.log(`Pulumi: ${pulumiVersion}`)

if (!pulumiVersion) throw 'Invalid Pulumi version.'

const awsCliVersion = (await $`aws --version`.text()).trim()
console.log(`AWS CLI: ${awsCliVersion}`)

if (!awsCliVersion) throw 'Invalid AWS CLI version.';

$.cwd('./pulumi')

const pipResults = await $`pip install -r requirements.txt`
if (pipResults.exitCode !== 0) throw pipResults.stderr.toString()

const pulumiResults = await $`pulumilocal up --yes --non-interactive `
if (pulumiResults.exitCode !== 0) throw pulumiResults.stderr.toString()

const bucketName = (await $`pulumilocal stack output bucket_name`.text()).trim()
console.log(`Checking if S3 bucket ${bucketName} exists...`)

const bucketResults = await $`aws s3 ls s3://${bucketName}`
if (bucketResults.exitCode !== 0) throw bucketResults.stderr.toString()
