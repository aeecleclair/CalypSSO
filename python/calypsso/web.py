import importlib.resources
import urllib.parse
from enum import Enum
from typing import Any

from starlette.staticfiles import StaticFiles

MODULE_PATH = importlib.resources.files(__package__)


class TypeMessage(str, Enum):
    invalid_client_id = "invalid_client_id"
    mismatching_redirect_uri = "mismatching_redirect_uri"
    user_not_member_of_allowed_group = "user_not_member_of_allowed_group"
    user_account_type_not_allowed = "user_account_type_not_allowed"
    mypayment_structure_transfer_success = "mypayment_structure_transfer_success"
    mypayment_wallet_device_activation_success = (
        "mypayment_wallet_device_activation_success"
    )
    mypayment_wallet_device_already_activated_or_revoked = (
        "mypayment_wallet_device_already_activated_or_revoked"
    )
    token_expired = "token_expired"  # noqa: S105


class Asset(str, Enum):
    privacy = "privacy"
    terms_and_conditions = "terms_and_conditions"
    mypayment_terms_of_service = "mypayment_terms_of_service"
    support = "support"


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


def logo_png_relative_url() -> str:
    """
    Return CalypSSO logo relative url: `calypsso/logo.png`
    """
    return "calypsso/logo.png"


def get_message_relative_url(message_type: TypeMessage) -> str:
    """
    Return CalypSSO message page relative url: `calypsso/message?type=...`
    """
    params = {"type": message_type.value}
    return f"calypsso/message?{urllib.parse.urlencode(exclude_none(params))}"


def get_asset_relative_url(asset: Asset) -> str:
    """
    Return CalypSSO asset page relative url: `calypsso/asset?path=...`
    """
    params = {"path": asset.value}
    return f"calypsso/asset?{urllib.parse.urlencode(exclude_none(params))}"


def get_reset_password_relative_url(reset_token: str) -> str:
    """
    Return CalypSSO reset password page relative url: `calypsso/reset-password?reset_token=...`
    """
    params = {"reset_token": reset_token}
    return f"calypsso/reset-password/?{urllib.parse.urlencode(exclude_none(params))}"


def get_register_relative_url(external: bool, email: str | None = None) -> str:
    """
    Return CalypSSO register page relative url: `calypsso/register?external=...`
    """
    params = {"external": external, "email": email}
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
