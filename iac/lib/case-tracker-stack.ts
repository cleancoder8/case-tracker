import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as sns from "aws-cdk-lib/aws-sns"
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions"
import * as targets from "aws-cdk-lib/aws-events-targets"
import * as events from 'aws-cdk-lib/aws-events'
export interface CaseTrackerStackProps extends StackProps {
    readonly lambdaEnv: any;
}
export class CaseTrackerStack extends Stack {
    constructor(scope: Construct, id: string, props?: CaseTrackerStackProps) {
        super(scope, id, props);
        const lambdaEnv = props?.lambdaEnv
        const topic = new sns.Topic(this, "case-status", {
            topicName: "case-status"
        })
        topic.addSubscription(new subscriptions.EmailSubscription('ayush_dhar@outlook.com'));
        lambdaEnv.NOTIFY_TOPIC_ARN = topic.topicArn
        const schedulerFunction = new lambda.Function(this, 'SchedulerFunction', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'app.handler',
            code: lambda.Code.fromAsset("../src"),
            environment: lambdaEnv
        });
        topic.grantPublish(schedulerFunction)
        const eventRule = new events.Rule(this, 'scheduleRule', {
            schedule: events.Schedule.cron({ minute: '1' }),
        });
        eventRule.addTarget(new targets.LambdaFunction(schedulerFunction))

    }
}
