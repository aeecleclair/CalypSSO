# CalypSSO

A small and static Next.js frontend for Hyperion

## Next.js development

You can set Hyperion base url in a dotenv `.env`

```bash
yarn install
yarn dev
```

## Pages

The base url of this project is `/calypsso`.

You will find:

- http://localhost:3000/calypsso/register
- http://localhost:3000/calypsso/activate?activation_token=12345
- http://localhost:3000/calypsso/recover
- http://localhost:3000/calypsso/reset-password?reset_token=12345
- http://localhost:3000/calypsso/login?client_id=Titan&response_type=code&scope=API&redirect_uri=https://localhost:8000/static.html&code_challenge=3sMJwwv1xfZK6yay-HkpseTGMUrmwWx5B9zVAxGfrb0=&code_challenge_method=S256

## Compilation

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
