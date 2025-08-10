# Dark Entities Backend

## Environment Variables

Create a `.env` file in this directory based on the provided `.env.example`:

```
DATABASE_URL=postgresql://postgres:password@localhost/darkentities
SECRET_KEY=changeme
ALLOW_ORIGINS=http://localhost:5173
```

Use commas to specify multiple origins when needed, e.g. `ALLOW_ORIGINS=http://localhost:5173,http://example.com`.

## Running locally

Install dependencies:

```
pip install -r requirements.txt
```

Start the development server:

```
uvicorn app.main:app --reload
```
