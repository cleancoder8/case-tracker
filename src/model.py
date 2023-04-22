from typing import Optional
from pydantic import BaseModel


class Response(BaseModel):
    caseNumber: Optional[str]
    createdDate: Optional[str]
    agencyName: Optional[str]
    caseStatus: str
    dueDate: Optional[str]
    pastDue: Optional[str]
    numberOfDaysLeft: Optional[str]
