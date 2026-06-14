from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase
from unittest.mock import patch

from calypsso import mail


class MailTemplatesTest(TestCase):
    def test_account_exist_uses_reset_password_url(self) -> None:
        with TemporaryDirectory() as temporary_directory:
            module_path = Path(temporary_directory)
            template_directory = module_path / "mail_templates"
            template_directory.mkdir()
            (template_directory / "account-exist.html").write_text(
                '<a href="{{ reset_password_url }}">reset it</a>',
                encoding="utf-8",
            )

            with patch.object(mail, "MODULE_PATH", module_path):
                templates = mail.MailTemplates(
                    product_name="MyECL",
                    payment_product_name="MyECLPay",
                    entity_name="ECLAIR",
                    entity_site_url="https://myecl.fr",
                    api_base_url="https://api.myecl.fr/",
                )
                rendered_mail = templates.get_mail_account_exist(
                    "https://myecl.fr/reset-password",
                )

        assert 'href="https://myecl.fr/reset-password"' in rendered_mail  # noqa: S101
