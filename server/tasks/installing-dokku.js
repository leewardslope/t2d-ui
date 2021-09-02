import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

import installForem from './install-forem.js';
console.log(`came here`);

const installingDokku = async (ip, res, req, next, socket, appId, app, env) => {
  console.log(`came here`);
  socket.emit(`server-notification-${appId}`, {
    message: `Starting Dokku Installation`,
  });

  socket.emit(`server-notification-msg-${appId}`, {
    message: `Starting Dokku Installation`,
  });

  try {
    console.log(`came here`);
    const { stdout, stderr } = await execAsync(
      `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/dokku.yml --extra-vars "IP=${ip}"`
    );
    console.log('came here', stderr);
  } catch (error) {
    console.log(error);

    console.log('stderr:', stderr);

    socket.emit(`server-notification-${appId}`, {
      message: `Dokku installation failed`,
    });
    socket.emit(`server-notification-msg-${appId}`, {
      message: `Dokku installation failed`,
    });

    return next(
      new HttpError(`Dokku installation failed, contact is for more info`, 403)
    );
  }

  console.log(`ok ok`);

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
