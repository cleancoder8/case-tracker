from pydantic import BaseSettings


class Config(BaseSettings):
    case_tracker_url: str
    case_status_to_monitor: str
    notify_topic_arn: str
