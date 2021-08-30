import shell from 'shelljs';
import fs from 'fs';

const installingDokku = IP => {
  shell.exec(
    `ansible-playbook -i ./ansible_inventory/${IP} ../ansible/playbooks/dokku.yml --extra-vars "IP=${IP}"`
  );
};

export default installingDokku;
