import shell from 'shelljs';
import fs from 'fs';

const uninstallingDokku = () => {
  shell.exec(
    'ansible-playbook -i ../ansible/IP ../ansible/playbooks/uninstall_dokku.yml'
  );
};

export default uninstallingDokku;
