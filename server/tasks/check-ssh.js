import fs from 'fs';
import HttpError from '../models/https-error.js';
import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const checkSSH = async (ip, socket, res, req, next) => {
  const appId = req.params.aid;
  // shell.exec('pwd');
  if (`./tree/${ip}`) {
    shell.exec(`rm -rf ./tree/${ip}`); // this should not be async
  }

  let ping;
  try {
    ping = await execAsync(
      `ansible all -t tree -o -i ./ansible_inventory/${ip} -m ping`
    );
  } catch (error) {
    socket.emit(`server-notification-msg-${appId}`, {
      message: `Unable to connect to your server, please check update your Server Details`,
    });
    return next(
      new HttpError(
        `Unable to connect to your server, please check update your Server Details`,
        403
      )
    );
  }

  // console.log('stderr:', ping.stderr);
  if (ping.stderr) {
    socket.emit(`server-notification-msg-${appId}`, {
      message: `Unable to connect to your server, please check update your Server Details`,
    });
    return next(
      new HttpError(
        `Unable to connect to your server, please check update your Server Details`,
        403
      )
    );
  } else {
    fs.readFile(`tree/${ip}`, 'utf8', (err, jsonString) => {
      if (err) {
        console.log(err);
      } else {
        try {
          const data = JSON.parse(jsonString);
          if (data.ping === 'pong') {
            socket.emit(`server-notification-msg-${appId}`, {
              message: `Established Connection to your SSH Server`,
            });

            res.status(200).json({
              message: 'Established Connection to your SSH Server',
            });
          }
        } catch (error) {
          socket.emit(`server-notification-msg-${appId}`, {
            message: `Unable to connect to your server, please check update your SSH Keys`,
          });
          return next(
            new HttpError(
              `Unable to connect to your server, please check update your SSH Keys`,
              403
            )
          );
        }
      }
    });
  }
};

export default checkSSH;
