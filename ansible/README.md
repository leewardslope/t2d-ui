# Purpose of this documentation

This documentation should act as a starting place for any future developers to get hold of the DevOps side of the Leewardslope. Going through this documentation will give you a quick overview of, "How ansible is being used in Leewardslope's t2d"

## Installation of Ansible

```
sudo apt-add-repository -y ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible
```

## Simple Dokku Installation Methods

This is not required, but mentioning these will provide some best practices of installing dokku. Here are few quick ways to install dokku.

### Dokku documentation Method

```
wget https://raw.githubusercontent.com/dokku/dokku/v0.25.1/bootstrap.sh
sudo DOKKU_TAG=v0.25.1 bash bootstrap.sh
```

### Deb based script

```
curl -s https://packagecloud.io/install/repositories/dokku/dokku/script.deb.sh | sudo bash
```

### When creating a server instance

Many cloud providers these days, use some kind of one click installer or cloud-init support to boot the server with pre-installed dokku, this can also be a preferred choice, but do care about the version and upgrade it to the latest version.

This small script, can not only help installing dokku, but also initiates an app.

```
#!/bin/bash
wget https://raw.githubusercontent.com/dokku/dokku/master/bootstrap.sh
sudo bash bootstrap.sh

export APP_NAME="node-js-app"
dokku apps:exists "$APP_NAME" || dokku apps:create "$APP_NAME"
dokku config:set "$APP_NAME" KEY=value
```

## Manual Installation via deb package

```
sudo apt-get update
sudo apt-get install debian-archive-keyring
sudo apt-get install curl gnupg apt-transport-https
touch /etc/apt/sources.list.d/dokku_dokku.list
```

Add these two dependencies into the above created file.

```
deb https://packagecloud.io/dokku/dokku/ubuntu/ trusty main
deb-src https://packagecloud.io/dokku/dokku/ubuntu/ trusty main
```

```
sudo apt-get update
sudo apt-get install dokku=0.25.1
```

## Installing Dokku using ansible

First create a `hosts` file with a group `dokku` and some host IP Addresses, for testing you can use your own VPS or just 127.0.0.1. And then create an ansible playbook and use that playbook.

`hosts`

```
[dokku]
127.0.0.1
```

`dokku.yml`

```
---
- hosts: dokku
  tasks:
  - name: dokku repo
    apt_repository:
      filename: dokku
      repo: 'deb https://packagecloud.io/dokku/dokku/ubuntu/  main'
      state: present

    - name: install dokku
      apt:
        pkg: dokku
        state: installed
        update_cache: true
```

Finally using the above two files to install dokku

```
ansible-playbook -i hosts -s dokku.yml
```

> If you look at the playbook, it is obvious that I'm recreating the above manual installation method.

### A quick side note

Now that we have a bare minimum ansible setup, we can iterate on this to provision actual Dokku applications. The following will create an app if it does not exist

```
---
- hosts: dokku
  tasks:
    - name: does the node-js-app app exist
      shell: dokku apps:exists node-js-app
      register: app_exists
      ignore_errors: True

    - name: create an app
      shell: dokku apps:create node-js-app
      when: app_exists.rc == 1
```

> There are much better ways, when dealing with remote hosts, like our own cfg and inventory files. There can always be a better alternative to optimise things, but we need to start at some point before optimizing.

## Ansible Galaxy

This is my personal preference, at least for now. This not only allows me to install dokku via ansible, but provide in build modules to do more.

```
ansible-galaxy install dokku_bot.ansible_dokku
```

With a very few lines of code we can actually install dokku in all our Remote Servers.

```
---
- hosts: all
  roles:
    - dokku_bot.ansible_dokku
```

A more holistic way of using this would be, something like this.

```
---
- hosts: all
  roles:
    - dokku_bot.ansible_dokku
    - geerlingguy.swap
  vars:
    # If you are running dokku on a small VPS, you'll most likely
    # need some swap to ensure you don't run out of RAM during deploys
    swap_file_size_mb: '2048'
    dokku_version: 0.19.13
    dokku_users:
      - name: yourname
        username: yourname
        ssh_key: "{{lookup('file', '~/.ssh/id_rsa.pub')}}"
    dokku_plugins:
      - name: clone
        url: https://github.com/crisward/dokku-clone.git
      - name: letsencrypt
        url: https://github.com/dokku/dokku-letsencrypt.git
  tasks:
    - name: create app
      dokku_app:
        # change this name in your template!
        app: &appname appname
    - name: environment configuration
      dokku_config:
        app: *appname
        config:
          # specify a email for dokku-letsencrypt
          DOKKU_LETSENCRYPT_EMAIL: email@example.com
          # specify port so `domains` can setup the port mapping properly
          PORT: "5000"
    - name: git clone
      # note you'll need to add a deployment key to the GH repo if it's private!
      dokku_clone:
        app: *appname
        repository: git@github.com:heroku/python-getting-started.git
    - name: add domain
      dokku_domains:
        app: *appname
        domains:
          - example.com
```

## Other useful resources.

- https://packagecloud.io/dokku/dokku
- https://galaxy.ansible.com/dokku_bot/ansible_dokku
- https://mikebian.co/using-ansible-to-deploy-elixir-applications-on-dokku/
- https://dokku.github.io/general/automating-dokku-setup
