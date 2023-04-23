from pydantic import BaseSettings


class Config(BaseSettings):
    """_summary_

    Args:
        BaseSettings (_type_): _description_
    """
    case_tracker_url: str
    case_status_to_monitor: str
    notify_topic_arn: str
