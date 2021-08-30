import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const installingDokku = async IP => {
  // shell.exec(
  //   `ansible-playbook -i ./ansible_inventory/${IP} ../ansible/playbooks/dokku.yml --extra-vars "IP=${IP}"`
  // );

  const { stdout, stderr } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${IP} ../ansible/playbooks/dokku.yml --extra-vars "IP=${IP}"`
  );

  // console.log('stdout:', stdout);
  console.log('stderr:', stderr);
};

export default installingDokku;
