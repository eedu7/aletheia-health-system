from enum import StrEnum


class SenderType(StrEnum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"
