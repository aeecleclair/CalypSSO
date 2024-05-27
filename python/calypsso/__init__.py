from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

import importlib.resources

MODULE_PATH = importlib.resources.files(__package__)


def get_calypsso_app(hyperion_url: str) -> FastAPI:
    app = FastAPI()
    print(MODULE_PATH)

    @app.get(
        "/variables.json",
        status_code=200,
    )
    async def get_variables():
        return {"hyperion": hyperion_url}

    app.mount(
        "/",
        StaticFiles(directory=MODULE_PATH / "public"),
        name="calypsso",
    )
    return app
