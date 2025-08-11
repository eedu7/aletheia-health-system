from fastapi import APIRouter

router = APIRouter()


@router.get("/profile")
async def get_profile():
    # TODO: Get user profile
    return {"message": "Get profile"}
