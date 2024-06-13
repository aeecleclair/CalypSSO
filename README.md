# CalypSSO

A Next.js small and static frontend for Hyperion

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
- http://localhost:3000/calypsso/activate
- http://localhost:3000/calypsso/recover
- http://localhost:3000/calypsso/reset-password
- http://localhost:3000/calypsso/login

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
