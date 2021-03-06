import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

import installForem from './install-forem.js';

const installingDokku = async (ip, res, req, next, socket, appId, app, env) => {
  socket.emit(`server-notification-${appId}`, {
    message: `Starting Dokku Installation`,
  });

  socket.emit(`server-notification-msg-${appId}`, {
    message: `Starting Dokku Installation`,
  });

  try {
    // using try catch as, there is a warning message in stderr.
    const { stdout, stderr } = await execAsync(
      `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/dokku.yml --extra-vars "IP=${ip}"`
    );

    // console.log('came here', stderr);
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

  socket.emit(`server-notification-${appId}`, {
    message: `Finished, Installing dokku`,
  });
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Finished, Installing dokku`,
  });

  if (app.app === 'Forem') {
    installForem(ip, res, req, next, socket, appId, app, env);
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
