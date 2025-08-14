from http import HTTPStatus


class CustomException(Exception):
    code = HTTPStatus.BAD_GATEWAY
    status_code = HTTPStatus.BAD_GATEWAY
    message = HTTPStatus.BAD_GATEWAY.description

    def __init__(self, message: str | None = None) -> None:
        self.message = message
