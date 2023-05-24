# Tabas.blog mobile app

## Running locally

Copy the `.env.sample` file & rename it `.env`
Seen expo runs it's own server, localhost will not resolve to your machine but the Metro server> So you need to get you machines local IP adress to fill in the variables in the env file.
When launching npm start, expo will display you machines local ip address under the qr code:

```bash
> Metro waiting on exp://192.168.1.17:19000
> Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

Alternatively you can get your local ip running this command :

- MacOS / Linux terminal:

```bash
ifconfig
```

- Windows cmd :

```cmd
ipconfig /all
```

Once you have launched the local stack from within `front` folder :

```bash
docker compose -f docker.compose.dev.yml up --build
```

you can run `npm start`
