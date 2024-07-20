import importlib.resources
import urllib.parse
from typing import Any

from starlette.staticfiles import StaticFiles

MODULE_PATH = importlib.resources.files(__package__)


def get_calypsso_app() -> StaticFiles:
    """
    Construct a Starlette StaticFiles application serving CalypSSO compiled ressources.

    This application MUST be mounted on the subpath `/calypsso`.

    Usage exemple with a FastAPI application `app`:
    ```python
    calypsso = get_calypsso_app()
    app.mount("/calypsso", calypsso)
    ```
    """
    return StaticFiles(directory=str(MODULE_PATH / "public"), html=True)


def exclude_none(original: dict[str, Any]) -> dict[str, Any]:
    return {k: v for k, v in original.items() if v is not None}


def get_error_relative_url(message: str) -> str:
    """
    Return CalypSSO error page relative url: `calypsso/error?message=...`
    """
    params = {"message": message}
    return f"calypsso/error?{urllib.parse.urlencode(exclude_none(params))}"


def get_reset_password_relative_url(reset_token: str) -> str:
    """
    Return CalypSSO reset password page relative url: `calypsso/reset-password?reset_token=...`
    """
    params = {"reset_token": reset_token}
    return f"calypsso/reset-password/?{urllib.parse.urlencode(exclude_none(params))}"


def get_register_relative_url(external: bool) -> str:
    """
    Return CalypSSO register page relative url: `calypsso/register?external=...`
    """
    params = {"external": external}
    return f"calypsso/register/?{urllib.parse.urlencode(exclude_none(params))}"


def get_activate_relative_url(activation_token: str, external: bool) -> str:
    """
    Return CalypSSO account activation page relative url: `calypsso/activate?activation_code=...`
    """
    params = {"activation_token": activation_token, "external": external}
    return f"calypsso/activate/?{urllib.parse.urlencode(exclude_none(params))}"


def get_login_relative_url(
    client_id: str,
    response_type: str,
    redirect_uri: str | None = None,
    scope: str | None = None,
    state: str | None = None,
    nonce: str | None = None,
    code_challenge: str | None = None,
    code_challenge_method: str | None = None,
    credentials_error: bool | None = None,
) -> str:
    """
    Return CalypSSO login page relative url: `calypsso/login?...`
    """
    params = {
        "client_id": client_id,
        "response_type": response_type,
        "redirect_uri": redirect_uri,
        "scope": scope,
        "state": state,
        "nonce": nonce,
        "code_challenge": code_challenge,
        "code_challenge_method": code_challenge_method,
        "credentials_error": credentials_error,
    }

    return f"calypsso/login/?{urllib.parse.urlencode(exclude_none(params))}"
