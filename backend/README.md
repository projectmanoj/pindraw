# Monorepo using UV Workspaces

## Server

```bash
uv run api
uv run ws
```

## Apps

1. http : main backend
2. ws: websocket backend

```bash
uv init apps/http  --package --name http
uv init apps/ws  --package --name ws
uv init packages/db --package --name db
```

```bash

uv run --package db db
```

```bash
# Make db a dependency of payment-service
uv add --package db ./apps/payment-service
# Verify dependencies
cat ./apps/payment-service/pyproject.toml
```

```bash

uv sync --all-packages
uv build --all-packages
```

## Add and remove Apps

### add

```bash
uv init apps/tempapp --package --name tempapp
# ROOT: pyproject.toml
# dependencies = [ "tempapp" ]
# [tool.uv.sources]
# tempapp = { workspace = true }
# [tool.uv.workspace]
# members = ["apps/*", "packages/*"]
uv sync --all-packages
uv run tempp tempapp
```

### remove

```bash
uv remove tempapp
rm -r apps/tempapp
```
