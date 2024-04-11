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

## Todo

- Remove socket.io as it does not work with other implementations
- Implement an actual websocket server without express js `ws` using this [guide](https://www.pubnub.com/blog/nodejs-websocket-programming-examples/)
- Remove socket.io client from React and use the same guide above
- Verify the new websocket implementation can work with Spring
