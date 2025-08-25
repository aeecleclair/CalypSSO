# CalypSSO

Node project build as a Python module for Hyperion.
CalypSSO is composed of:

- A small and static Next.js frontend for Hyperion

## Next.js development

You can set Hyperion base url in a dotenv `/web/.env`

```bash
yarn install
yarn dev:web
```

### Pages

The base url of this project is `/calypsso`.

You will find:

- http://localhost:3000/calypsso/register
- http://localhost:3000/calypsso/activate?activation_token=12345
- http://localhost:3000/calypsso/activate?activation_token=12345&external=true
- http://localhost:3000/calypsso/recover
- http://localhost:3000/calypsso/reset-password?reset_token=12345
- http://localhost:3000/calypsso/login?client_id=Titan&response_type=code&scope=API&redirect_uri=https://localhost:8000/static.html&code_challenge=3sMJwwv1xfZK6yay-HkpseTGMUrmwWx5B9zVAxGfrb0=&code_challenge_method=S256
- http://localhost:3000/calypsso/change-password/?email=prenom.nom%40etu.ec-lyon.fr
- http://localhost:3000/calypsso/asset/?path=mypayment_terms_of_service

## Maizzle emails template

Email templates are build using [Maizzle](https://maizzle.com/).

To preview mails during development use:

```bash
yarn install
yarn dev:mail
```

Email contains escaped template strings:`@{{ variable_name }}` will be rendered by Maizzle as `{{ variable_name }}`. Then the Python module will process these expressions using Jinja2

Emails, layout and components are based on [maizzle base template repository and design](https://github.com/maizzle/maizzle).

You can set the frontmatter `preheader` of a mail to customize the text preview of the email. See [preview-text](https://maizzle.com/glossary#preview-text)

Variable starting with an underscore (ex: `_logo_url`) will be set globally by CalypSSO Python module.

## Build Python module

First you need to compile the Next.js project

```bash
yarn install
yarn build
```

The build pages will be located in the [/out](./out/) directory. The small Python package sources are located in [/python](./python/).

You can install it locally in an other python project using

```bash
pip install "path/to/calypsso"
```

To use it, you need to mount CalypSSO at the subpath `/calypsso`

For exemple with FastAPI, you could do:

```python
from fastapi import FastAPI

# Define your app
app = FastAPI(
    title="MyFastAPIApp",
)
# ...
# Mount CalypSSO app at the subpath /calypsso
calypsso = get_calypsso_app()
app.mount("/calypsso", calypsso)
```

## Make a release on Pypi

You **need** to edit CalypSSO version in [python/calypsso/\_\_about\_\_.py](./python/calypsso/__about__.py).
Then make a release on GitHub and add a tag. The tag should match `v*.*.*`.
