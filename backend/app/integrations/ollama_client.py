import httpx


class OllamaClient:
    def __init__(self, url: str = "http://localhost:11434"):
        self.url = url

    async def generate(
        self,
        prompt: str,
        model: str = "llama2",
    ) -> str:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.url}/api/generate",
                json={
                    "prompt": prompt,
                    "model": model,
                },
            )

            response.raise_for_status()
            data = response.json()
            return data.get("response", "")
