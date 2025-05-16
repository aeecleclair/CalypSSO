import importlib

from fastapi.templating import Jinja2Templates

from .web import logo_png_relative_url

MODULE_PATH = importlib.resources.files(__package__)


mail_templates = Jinja2Templates(directory=str(MODULE_PATH / "mail_templates"))


class MailTemplates:
    def __init__(
        self,
        product_name: str,
        payment_product_name: str,
        entity_name: str,
        entity_site_url: str,
        api_base_url: str,
    ):
        """
        product_name: Name of the product (e.g. "MyECL")
        payment_product_name: Name of the payment product (e.g. "MyECLPay")
        entity_name: Name of the entity (e.g. "ECLAIR")
        entity_site_url: Url of the entity site (e.g. "https://myecl.fr")
        base_url: Base URL of the application (e.g. "https://example.com/"). Must include a trailing slash.
        api_base_url: URL of the API serving CalypSSO
        primary_color: Primary color of the application (e.g. "#FF5733")
        """
        self.environment = {
            "_product_name": product_name,
            "_payment_product_name": payment_product_name,
            "_entity_name": entity_name,
            "_logo_url": api_base_url + logo_png_relative_url(),
            "_entity_site_url": entity_site_url,
        }

    def get_mail_account_activation(self, activation_url: str) -> str:
        """
        Return the mail template for account activation.
        """
        return mail_templates.get_template("account-activation.html").render(
            self.environment,
            activation_url=activation_url,
        )

    def get_mail_account_exist(self) -> str:
        """
        Return the mail template for account already existing.
        """
        return mail_templates.get_template("account-exist.html").render(
            self.environment,
        )

    def get_mail_mail_migration_already_exist(self) -> str:
        """
        Return the mail template for already existing email when migrating email.
        """
        return mail_templates.get_template("mail-migration-already-exist.html").render(
            self.environment,
        )

    def get_mail_mail_migration_confirm(self, confirmation_url: str) -> str:
        """
        Return the mail template for email migration confirmation.
        """
        return mail_templates.get_template("mail-migration-confirmation.html").render(
            self.environment,
            confirmation_url=confirmation_url,
        )

    def get_mail_myeclpay_device_activation(self, activation_url: str) -> str:
        """
        Return the mail template for MyECLPay device activation.
        """
        return mail_templates.get_template("myeclpay-device-activation.html").render(
            self.environment,
            activation_url=activation_url,
        )

    def get_mail_myeclpay_structure_transfer(self, confirmation_url: str) -> str:
        """
        Return the mail template for MyECLPay structure transfer validation.
        """
        return mail_templates.get_template("myeclpay-structure-transfer.html").render(
            self.environment,
            confirmation_url=confirmation_url,
        )

    def get_mail_myeclpay_tos_signed(self, tos_version: int) -> str:
        """
        Return the mail template to inform about TOS signature.
        """
        return mail_templates.get_template("myeclpay-tos-signed.html").render(
            self.environment,
            tos_version=tos_version,
        )

    def get_mail_reset_password_account_does_not_exist(self, register_url: str) -> str:
        """
        Return the mail template to inform that the account requested to change password does not exist.
        """
        return mail_templates.get_template(
            "reset-password-account-does-not-exist.html",
        ).render(self.environment, register_url=register_url)

    def get_mail_reset_password(self, confirmation_url: str) -> str:
        """
        Return the mail template for password reset confirmation.
        """
        return mail_templates.get_template("reset-password.html").render(
            self.environment,
            confirmation_url=confirmation_url,
        )
