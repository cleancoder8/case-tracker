#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CaseTrackerStack } from '../lib/case-tracker-stack';

const app = new cdk.App();
const lambdaEnv = app.node.tryGetContext('lambda-env')
new CaseTrackerStack(app, 'CaseTrackerStack', {
    lambdaEnv: lambdaEnv
});
