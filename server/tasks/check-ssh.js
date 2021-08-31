import fs from 'fs';
import HttpError from '../models/https-error.js';
import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const checkSSH = async (IP, socket, res, req, next) => {
  const appId = req.params.aid;
  // shell.exec('pwd');
  if (`./tree/${IP}`) {
    shell.exec(`rm -rf tree/${IP}`); // this should not be async
  }

  const ping = await execAsync(
    `ansible ${IP} -t tree -o -i ../ansible/inventory -m ping`
  );
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
    fs.readFile(`tree/${IP}`, 'utf8', (err, jsonString) => {
      if (err) {
        console.log(err);
      } else {
        try {
          const data = JSON.parse(jsonString);
          if (data.ping === 'pong') {
            socket.emit(`server-notification-msg-${appId}`, {
              message: `Establish Connection to your SSH Server`,
            });
            res.status(200).json({
              message:
                'Establish Connection to your SSH Server, Installing Dokku',
            });
            shell.exec(`rm -rf tree/${IP}`);
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
