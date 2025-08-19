from typing import Optional

import httpx

from core.exceptions import BadRequestException


class OllamaClient:
    def __init__(self, url: str = "http://localhost:11434"):
        self.url = url

    async def generate(
        self,
        prompt: str,
        model: str = "llama3.1:8b",
        temperature: Optional[float] = 0.7,
    ) -> str:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.url}/api/generate",
                    json={
                        "prompt": prompt,
                        "model": model,
                        "temperature": temperature,
                        "stream": False,
                    },
                    timeout=60.0,  # optional timeout
                )
                response.raise_for_status()
                data = response.json()
                return data.get("response", "")
        except httpx.HTTPStatusError as exc:
            raise BadRequestException(f"Ollama API returned error: {exc.response.text}")
        except httpx.RequestError as exc:
            raise BadRequestException(f"Ollama API request failed: {exc}")
