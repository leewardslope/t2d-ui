#! /bin/bash

## Always remember I can do this in users PC, or self-host myself.

## sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
## Adding Plugins

sudo dokku plugin:install https://github.com/dokku/dokku-http-auth.git

## Basic Setup

dokku apps:create t2d-shell
docker pull wettyoss/wetty
docker tag wettyoss/wetty:latest dokku/t2d-shell:latest

## Port forwarding

dokku domains:set t2d-shell t2d-shell.leewardslope.com
dokku proxy:ports-set t2d-shell http:80:3000 https:443:3000

## SSL Configuration

tar -cvf leewardslope.com.tar leewardslope.com.crt leewardslope.com.key
dokku certs:add t2d-shell < leewardslope.com.tar

## Adding SSH Keys in Docker Container with persistent volume

mkdir /var/lib/dokku/data/storage/t2d-shell
chown dokku:dokku /var/lib/dokku/data/storage/t2d-shell
dokku storage:mount t2d-shell /var/lib/dokku/data/storage/t2d-shell/:/usr/src/app

cp ~/.ssh/id_rsa /var/lib/dokku/data/storage/t2d-shell/id_rsa
echo $(cat ~/.ssh/id_rsa.pub) >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 644 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_rsa

## Setting ENV variables

dokku config:set --no-restart t2d-shell SSHHOST=VARIABLE_IP SSHUSER=dokku SSH_KEY=/usr/src/app/id_rsa TITLE=t2d-shell BASE=/

## Configuring basic authentication and deploying.

dokku http-auth:on t2d-shell basic_auth_username basic_auth_password
dokku tags:deploy t2d-shell latest

# These command might come in handy

# ```
# docker exec -it ID COMMAND
# docker cp .ssh/id_rsa a772596238a5:/usr/src/app/id_rsa
# dokku config:set t2d-shell SSHKEY=/usr/src/app/id_rsa
# ``` 
