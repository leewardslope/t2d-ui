import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

import installForem from './install-forem.js';

const installingDokku = async (ip, res, socket, appId, app, env) => {
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
    `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/dokku.yml --extra-vars "IP=${ip}"`
  );

  // console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  socket.emit(`server-notification-${appId}`, {
    message: `Finished, Installing dokku`,
  });
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Finished, Installing dokku`,
  });

  if (app.app === 'forem') {
    installForem(ip, res, socket, app, env);
  } else {
    socket.emit(`server-notification-${appId}`, {
      message: `For now, we only support Forem`,
    });
    socket.emit(`server-notification-msg-${appId}`, {
      message: `For now, we only support Forem`,
    });
    socket.disconnect();
  }
};

export default installingDokku;
