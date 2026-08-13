import os
import itertools
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq

# 🟢 FORCE OVERRIDE: Re-evaluates .env and bypasses cached system environment variables
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

# Parse multiple API keys
raw_keys = os.getenv("GROQ_API_KEYS", "")

# 🟢 ROBUST PARSING: Strips spaces, quotes, and newlines from each key in comma-separated list
api_keys = [
    k.strip().strip("'").strip('"') 
    for k in raw_keys.replace("\n", "").replace("\r", "").split(",") 
    if k.strip()
]

# Fallback: Check single key variable if GROQ_API_KEYS is not set
if not api_keys:
    single_key = os.getenv("GROQ_API_KEY")
    if single_key:
        api_keys = [single_key.strip().strip("'").strip('"')]

if not api_keys:
    raise ValueError("No Groq API keys found. Please define GROQ_API_KEYS in your .env file.")

# Thread-safe cycle iterator for Round-Robin key rotation
key_pool = itertools.cycle(api_keys)

# Pre-initialize Groq clients for each cleaned key
client_pool = {key: Groq(api_key=key) for key in api_keys}

print("=" * 60)
print(f"✅ Key Rotator Initialized with {len(api_keys)} Groq API Key(s):")
for k in api_keys:
    print(f"   🔑 Key Loaded: {k[:7]}...{k[-4:]}")
print("=" * 60)


def get_next_client() -> tuple[Groq, str]:
    """Retrieves the next Groq client and masked key in round-robin sequence."""
    next_key = next(key_pool)
    masked_key = f"{next_key[:7]}...{next_key[-4:]}"
    return client_pool[next_key], masked_key


app = FastAPI(
    title="MediSync GenAI Microservice (Groq Round-Robin)",
    version="2.0.0",
    description="Python AI service for MediSync using multi-key Groq rotation"
)

# 🟢 ENABLE CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    prompt: str
    context: str | None = "Pharmacy Assistant"


SYSTEM_PROMPT = """
You are MediBot, an expert pharmaceutical assistant integrated into the MediSync Pharmacy Management System.
Your core duty is to assist pharmacists by recommending substitute and alternative medicines when a requested drug is out of stock.

Guidelines:
1. Suggest alternative medicines that share the same active pharmaceutical ingredient (API), composition, and therapeutic effect.
2. Clearly state the substitute's drug class and usage context.
3. Keep answers concise, professional, and directly tailored for a pharmacist's quick reference during billing.
4. Always include a brief disclaimer: "Note: Substitutes should be verified by a registered pharmacist before dispensing."
"""


@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "provider": "Groq Llama-3.1",
        "total_keys_configured": len(api_keys)
    }


@app.post("/api/ai/chat")
async def generate_chat_response(request: ChatRequest):
    max_attempts = len(api_keys)
    last_error = None

    # 🟢 AUTOMATIC FAILOVER: Tries remaining keys in pool before throwing an error
    for attempt in range(max_attempts):
        client, key_alias = get_next_client()
        print(f"\n🔑 [Attempt {attempt + 1}/{max_attempts}] Querying Groq with Key: {key_alias}")
        print(f"📩 Prompt: {request.prompt} | Context: {request.context}")

        try:
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": f"Context: {request.context}\nUser Query: {request.prompt}"}
                ],
                temperature=0.3,
                max_tokens=500,
            )

            bot_reply = completion.choices[0].message.content
            print(f"✅ Groq Response Success using Key [{key_alias}]!")

            return {
                "success": True,
                "provider": "Groq (Llama-3.1)",
                "key_used": key_alias,
                "response": bot_reply
            }

        except Exception as e:
            last_error = str(e)
            print(f"⚠️ Key [{key_alias}] failed: {type(e).__name__} -> {str(e)}")
            print("🔄 Attempting automatic failover to next key in pool...")

    # If all keys in pool failed
    print(f"\n❌ ALL {max_attempts} GROQ KEYS FAILED!")
    raise HTTPException(
        status_code=500,
        detail=f"All Groq API keys failed. Last error: {last_error}"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)