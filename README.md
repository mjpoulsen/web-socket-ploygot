# web-socket-ploygot

Web Socket Implementations in Various Programming Languages

## Commands

## Profiles

Given this application uses Nginx as a reverse proxy and the project is meant to demonstrate web sockets with various languages, a profile must be sent when running Docker Compose.

The acceptable profiles include:

- c++
- express
- python
- spring

### Dev

```bash
docker-compose -f docker-compose-dev.yaml --profile PROFILE up --build
```

### Prod

```bash
docker-compose build
docker-compose --profile PROFILE up -d
```
