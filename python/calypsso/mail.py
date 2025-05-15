import importlib

from fastapi.templating import Jinja2Templates

MODULE_PATH = importlib.resources.files(__package__)


mail_templates = Jinja2Templates(directory=str(MODULE_PATH / "mail_templates"))


def get_mail_account_activation(activation_url: str) -> str:
    """
    Return the mail template for account activation.
    """
    return mail_templates.get_template("account-activation.html").render(
        activation_url=activation_url,
    )


def get_mail_account_exist() -> str:
    """
    Return the mail template for account already existing.
    """
    return mail_templates.get_template("account-exist.html").render()


def get_mail_mail_migration_already_exist() -> str:
    """
    Return the mail template for already existing email when migrating email.
    """
    return mail_templates.get_template("mail-migration-already-exist.html").render()


def get_mail_mail_migration_confirm(confirmation_url: str) -> str:
    """
    Return the mail template for email migration confirmation.
    """
    return mail_templates.get_template("mail-migration-confirmation.html").render(
        confirmation_url=confirmation_url,
    )


def get_mail_myeclpay_device_activation(activation_url: str) -> str:
    """
    Return the mail template for MyECLPay device activation.
    """
    return mail_templates.get_template("myeclpay-device-activation.html").render(
        activation_url=activation_url,
    )


def get_mail_myeclpay_structure_transfer(confirmation_url: str) -> str:
    """
    Return the mail template for MyECLPay structure transfer validation.
    """
    return mail_templates.get_template("myeclpay-structure-transfer.html").render(
        confirmation_url=confirmation_url,
    )


def get_mail_myeclpay_tos_signed(tos_version: int) -> str:
    """
    Return the mail template to inform about TOS signature.
    """
    return mail_templates.get_template("myeclpay-tos-signed.html").render(
        tos_version=tos_version,
    )


def get_mail_reset_password_account_does_not_exist(register_url: str) -> str:
    """
    Return the mail template to inform that the account requested to change password does not exist.
    """
    return mail_templates.get_template(
        "reset-password-account-does-not-exist.html",
    ).render(register_url=register_url)


def get_mail_reset_password(confirmation_url: str) -> str:
    """
    Return the mail template for password reset confirmation.
    """
    return mail_templates.get_template("reset-password.html").render(
        confirmation_url=confirmation_url,
    )
