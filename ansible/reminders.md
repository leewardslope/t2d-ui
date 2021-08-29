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
