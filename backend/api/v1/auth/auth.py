from fastapi import APIRouter

router = APIRouter()


@router.post("/register")
async def register():
    # TODO: Register new user
    return {"message": "Register"}


@router.post("/login")
async def login():
    # TODO: Login user
    return {"message": "Login"}


@router.post("/social/google")
async def google_login():
    # TODO: Google Login
    return {"message": "Google Login"}
