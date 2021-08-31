## Use this to remind myself about the packages and galaxies

This servers as the package.json of ansible

### Galaxies used

ansible-galaxy install dokku_bot.ansible_dokku
ansible-galaxy collection install ansible.posix

### During the first connection.

We will add all the necessary things like, our ssh keys and edit sudoers.

```
ansible-playbook -i IP playbooks/add_public_keys.yml
```

### To watch an ansible node for

```
watch -n 1 who
```

## Cloudflare API Calls

### Random Example

```
EMAIL="akhil@example.com"; \
KEY="08n46q4ofo0v5pc3u3g3eu517o69axu8s6ml4"; \
ZONE_ID="8b717207bcee4047af2e9dff95832996"; \
TYPE="A"; \
NAME="example.com"; \
CONTENT="203.0.113.50"; \
PROXIED="true"; \
TTL="1"; \
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/" \
    -H "X-Auth-Email: $EMAIL" \
    -H "X-Auth-Key: $KEY" \
    -H "Content-Type: application/json" \
    --data '{"type":"'"$TYPE"'","name":"'"$NAME"'","content":"'"$CONTENT"'","proxied":'"$PROXIED"',"ttl":'"$TTL"'}' \
    | python -m json.tool;
```

### Via Token

```
TOKEN="ZsJcjFDfHxaVnEjjfDdvgpFDHF6jsUGVvyzd6M8R"; \
ZONE_ID="8b717207bcee4047af2e9dff95832996"; \
TYPE="A"; \
NAME="example.com"; \
CONTENT="203.0.113.50"; \
PROXIED="true"; \
TTL="1"; \
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"type":"'"$TYPE"'","name":"'"$NAME"'","content":"'"$CONTENT"'","proxied":'"$PROXIED"',"ttl":'"$TTL"'}' \
    | python -m json.tool;
```
