# list of extras we send to users server and their basic usage.

## Websocketd
### Installation
We migrate the file from our server to user PC, via Ansible. Also, This is the first thing we do when we have a successful connection.

Preferable, we will have a small dedicated space for t2d in user's PC, `/opt/t2d` and will save this here.

Along with this, we will also add, an automatically generated `hook.yml` with a random string which we save in user's database.

### Usage
#### Setup
```
chmod +x /opt/t2d/websocketd
```
#### Start
```
/opt/t2d/websocketd -port=4444 tail -f /opt/t2d/log.txt
```

#### Stop
```
killall -9 websocketd
```


---

## Webhook
### Installation
```
sudo apt-get install webhook
```
### usage
#### To Start
The hooks
```
webhook -port 4445 -hooks /opt/t2d/webhook/hooks.yml &
```
#### To Kill
```
killall -9 webhook
```

