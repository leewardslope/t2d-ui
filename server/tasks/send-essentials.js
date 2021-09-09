import fs from 'fs';
import HttpError from '../models/https-error.js';
import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const sendEssentials = async (ip, socket, res, req, next) => {
  const appId = req.params.aid;
  try {
    // using try catch as, there is a warning message in stderr.
    const { stdout, stderr } = await execAsync(
      `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/send/lib.yml`
    );
  } catch (error) {
    console.log(error);

    socket.emit(`server-notification-${appId}`, {
      message: `Setting up essentials failed`,
    });
    socket.emit(`server-notification-msg-${appId}`, {
      message: `Setting up essentials failed`,
    });

    return next(
      new HttpError(
        `Setting up essentials failed, contact us for more info`,
        403
      )
    );
  }
  socket.emit(`server-notification-${appId}`, {
    message: `Configured basic requirements`,
  });
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Configured basic requirements`,
  });
};

export default sendEssentials;
