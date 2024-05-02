from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

import importlib.resources

MODULE_PATH = importlib.resources.files(__package__)


def get_calypsso_app() -> FastAPI:
    app = FastAPI()
    print(MODULE_PATH)

    app.mount(
        "/",
        StaticFiles(directory=MODULE_PATH / "public"),
        name="calypsso",
    )
    return app
