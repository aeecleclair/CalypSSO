import importlib

from jinja2 import Environment, FileSystemLoader, select_autoescape

from .web import logo_png_relative_url

MODULE_PATH = importlib.resources.files(__package__)


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
        self.environment_variables = {
            "_product_name": product_name,
            "_payment_product_name": payment_product_name,
            "_entity_name": entity_name,
            "_logo_url": api_base_url + logo_png_relative_url(),
            "_entity_site_url": entity_site_url,
        }

        loader = FileSystemLoader(str(MODULE_PATH / "mail_templates"))
        self.jinja_env = Environment(
            loader=loader,
            autoescape=select_autoescape(
                default_for_string=True,
                default=True,
            ),
        )

    def get_mail_account_invitation(self, creation_url: str) -> str:
        """
        Return the mail template for account invitation.
        """
        return self.jinja_env.get_template("account-invitation.html").render(
            self.environment_variables,
            creation_url=creation_url,
        )

    def get_mail_account_activation(self, activation_url: str) -> str:
        """
        Return the mail template for account activation.
        """
        return self.jinja_env.get_template("account-activation.html").render(
            self.environment_variables,
            activation_url=activation_url,
        )

    def get_mail_account_exist(self) -> str:
        """
        Return the mail template for account already existing.
        """
        return self.jinja_env.get_template("account-exist.html").render(
            self.environment_variables,
        )

    def get_mail_account_invitation_required(self) -> str:
        """
        Return the mail template for account invitation required.
        """
        return self.jinja_env.get_template("account-invitation-required.html").render(
            self.environment_variables,
        )

    def get_mail_account_merged(self, deleted_mail: str, kept_mail: str) -> str:
        """
        Return the mail template for successful account merged.
        """
        return self.jinja_env.get_template("account-merged.html").render(
            self.environment_variables,
            deleted_mail=deleted_mail,
            kept_mail=kept_mail,
        )

    def get_mail_mail_migration_already_exist(self) -> str:
        """
        Return the mail template for already existing email when migrating email.
        """
        return self.jinja_env.get_template("mail-migration-already-exist.html").render(
            self.environment_variables,
        )

    def get_mail_mail_migration_confirm(self, confirmation_url: str) -> str:
        """
        Return the mail template for email migration confirmation.
        """
        return self.jinja_env.get_template("mail-migration-confirmation.html").render(
            self.environment_variables,
            confirmation_url=confirmation_url,
        )

    def get_mail_mypayment_device_activation(self, activation_url: str) -> str:
        """
        Return the mail template for MyPayment device activation.
        """
        return self.jinja_env.get_template("mypayment-device-activation.html").render(
            self.environment_variables,
            activation_url=activation_url,
        )

    def get_mail_mypayment_structure_transfer(self, confirmation_url: str) -> str:
        """
        Return the mail template for MyPayment structure transfer validation.
        """
        return self.jinja_env.get_template("mypayment-structure-transfer.html").render(
            self.environment_variables,
            confirmation_url=confirmation_url,
        )

    def get_mail_mypayment_tos_signed(self, tos_version: int, tos_url: str) -> str:
        """
        Return the mail template to inform about TOS signature.
        """
        return self.jinja_env.get_template("mypayment-tos-signed.html").render(
            self.environment_variables,
            tos_version=tos_version,
            tos_url=tos_url,
        )

    def get_mail_reset_password_account_does_not_exist(self, register_url: str) -> str:
        """
        Return the mail template to inform that the account requested to change password does not exist.
        """
        return self.jinja_env.get_template(
            "reset-password-account-does-not-exist.html",
        ).render(self.environment_variables, register_url=register_url)

    def get_mail_reset_password(self, confirmation_url: str) -> str:
        """
        Return the mail template for password reset confirmation.
        """
        return self.jinja_env.get_template("reset-password.html").render(
            self.environment_variables,
            confirmation_url=confirmation_url,
        )
