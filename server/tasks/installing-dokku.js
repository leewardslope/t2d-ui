import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const installingDokku = async (IP, socket, appId) => {
  // shell.exec(
  //   `ansible-playbook -i ./ansible_inventory/${IP} ../ansible/playbooks/dokku.yml --extra-vars "IP=${IP}"`
  // );

  socket.emit(`server-notification-${appId}`, {
    message: `Starting Dokku Installation`,
  });

  socket.emit(`server-notification-msg-${appId}`, {
    message: `Starting Dokku Installation`,
  });

  const { stdout, stderr } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${IP} ../ansible/playbooks/dokku.yml --extra-vars "IP=${IP}"`
  );

  // console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  socket.emit(`server-notification-${appId}`, {
    message: `Finished, Installing dokku`,
  });
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Finished, Installing dokku`,
  });
  socket.disconnect();
};

export default installingDokku;
