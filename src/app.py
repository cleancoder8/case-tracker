from model import Response
from requests import get
from aws_lambda_powertools.logging import Logger
from config import Config
import boto3

config = Config()
logger = Logger()


def _notify_user(new_status: str):
    client = boto3.client("sns")
    client.publish(
        TopicArn=config.notify_topic_arn,
        Message=f"Case updated to status :: {new_status}\n\n{config.case_tracker_url}",
        Subject="USCIS SAVE case has been updated",
    )


def handler(event, context):
    http_response = get(url=config.case_tracker_url)
    response = Response(**http_response.json() if http_response else {})
    if response.caseStatus != config.case_status_to_monitor:
        logger.info(
            {
                "msg": f"case status has been updated to {response.caseStatus}, notifying user"
            }
        )
        _notify_user(new_status=response.caseStatus)
