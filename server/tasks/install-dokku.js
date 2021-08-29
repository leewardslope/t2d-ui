import shell from 'shelljs';
import fs from 'fs';

shell.exec(
  'ansible-playbook user1 -i ../ansible/inventory ../ansible/playbooks/dokku.yml '
);
