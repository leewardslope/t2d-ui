import shell from 'shelljs';
import fs from 'fs';

const installingDokku = () => {
  shell.exec(
    'ansible-playbook -i ../ansible/IP ../ansible/playbooks/dokku.yml'
  );
};

export default installingDokku;
