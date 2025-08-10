# Dark Entities Backend

## Environment Variables

Create a `.env` file in this directory based on the provided `.env.example`:

```
DATABASE_URL=postgresql://postgres:password@localhost/darkentities
SECRET_KEY=changeme
ALLOW_ORIGINS=http://localhost:5173
```

`ALLOW_ORIGINS` controls which origins are allowed to access the API via
[CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS). The value is parsed as a
comma-separated list: whitespace is trimmed and empty items are discarded. If the
variable is missing or only contains empty values, the server falls back to `*`
and allows requests from any origin.

Use commas to specify multiple safe origins, e.g.:
`ALLOW_ORIGINS=https://frontend.example,https://admin.example`. For local
development you may leave it unset or explicitly set `ALLOW_ORIGINS=*`.

## Running locally

Install dependencies:

```
pip install -r requirements.txt
```

Start the development server:

```
uvicorn app.main:app --reload
```
