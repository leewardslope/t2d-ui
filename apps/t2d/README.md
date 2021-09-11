> The required dockerfile do build this image should be uploaded via ansible into /opt/t2d. The docker file is located in `lib/docker/Dockerfile`

> For reference, I'm also placing the Dockerfile in this repo, but this will not be uploaded to users server.key

---

# Must have plugins

<!-- sudo dokku plugin:install https://github.com/dokku/dokku-http-auth.git -->

```
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git

```

## Installation

```
dokku apps:create t2d
docker build -t dokku/t2d /opt/t2d/Dockerfile
dokku domains:set t2d t2d-${userID}.leewardslope.com
dokku proxy:ports-set t2d http:80:4445 https:443:4445
```

## Mounting storage

```
mkdir /var/lib/dokku/data/storage/t2d
cp -r /opt/t2d /var/lib/dokku/data/storage
chown dokku:dokku /var/lib/dokku/data/storage/t2d
dokku storage:mount t2d-shell /var/lib/dokku/data/storage/t2d:/usr/src/app
```

## Enabling ssl for wss

```
dokku config:set t2d --no-restart DOKKU_LETSENCRYPT_EMAIL=admin@leewardslope.com
dokku letsencrypt:enable t2d
```

## deploying t2d, for websocketd

```
dokku tags:deploy t2d latest
```

---

## usage

use this app-url => `wss://t2d-${userID}.leewardslope.com` in serverActivity, to display the activity of the users dokku instance.
