import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const uninstallingDokku = async IP => {
  // shell.exec(
  //   'ansible-playbook -i ../ansible/IP ../ansible/playbooks/uninstall_dokku.yml'
  // );

  const { stdout, stderr } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${IP} ../ansible/playbooks/uninstall_dokku.yml`
  );

  // console.log('stdout:', stdout);
  console.log('stderr:', stderr);
};

export default uninstallingDokku;
