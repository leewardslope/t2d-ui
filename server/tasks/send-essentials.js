import fs from 'fs';
import HttpError from '../models/https-error.js';
import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const sendEssentials = async (ip, socket, res, req, next) => {
  const appId = req.params.aid;
  try {
    res.setHeader('Content-Type', 'application/json');
    // Step 01 => Sending Files
    const send = await execAsync(
      `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/send/send.yml`
    );

    if (send.stderr) {
      return next(
        new HttpError(
          `Copying Essentials failed, contact us for more info`,
          403
        )
      );
    } else {
      socket.emit(`server-notification-msg-${appId}`, {
        message: `Copying Essentials successful`,
      });

      res.write({
        message: 'Copying Essentials successful',
      });
    }

    // Step 02 => Configuring Websocketd
    const websocketd = await execAsync(
      `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/send/websocketd.yml`
    );

    if (websocketd.stderr) {
      return next(
        new HttpError(
          `Configuring Websocketd failed, contact us for more info`,
          403
        )
      );
    } else {
      socket.emit(`server-notification-msg-${appId}`, {
        message: `Configured Websocketd`,
      });

      res.write({
        message: 'Configured Websocketd successful',
      });
    }

    // Step 03 => Configuring Webhook
    const webhook = await execAsync(
      `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/send/webhook.yml`
    );

    if (webhook.stderr) {
      return next(
        new HttpError(
          `Configuring Webhook failed, contact us for more info`,
          403
        )
      );
    } else {
      socket.emit(`server-notification-msg-${appId}`, {
        message: `Configured Webhook`,
      });

      res.write({
        message: 'Configured Webhook successful',
      });
    }
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

  res.end({
    status: 'Configured Essentials',
  });
};

export default sendEssentials;
