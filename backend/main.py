import argparse

import uvicorn


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Start the FastAPI server with configurable host, port, and reload options."
    )

    parser.add_argument(
        "--port",
        "-p",
        type=int,
        default=8000,
        help="Port to run the server on (default: 8000).",
    )

    parser.add_argument(
        "--reload",
        "-r",
        action="store_true",
        help="Enable auto-reload on code changes.",
    )

    parser.add_argument(
        "--host",
        "-H",
        type=str,
        default="0.0.0.0",
        help="Host to run the server on (default: 0.0.0.0).",
    )

    args = parser.parse_args()

    print(f"Starting server at http://{args.host}:{args.port} (reload={args.reload})")

    uvicorn.run("core.server:app", host=args.host, port=args.port, reload=args.reload)


if __name__ == "__main__":
    main()
