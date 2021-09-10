import { validationResult } from 'express-validator';
// import mongoose from 'mongoose';

import HttpError from '../models/https-error.js';
import App from '../models/app-schema.js';
import User from '../models/user-schema.js';
import Env from '../models/env-schema.js';
import Ssh from '../models/ssh-schema.js';

import SSH2Promise from 'ssh2-promise';
// import SFTP from 'ssh2-promise/lib/sftp';
import fs from 'fs';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import checkSSH from '../tasks/check-ssh.js';
import sendEssentials from '../tasks/send-essentials.js';
import installingDokku from '../tasks/installing-dokku.js';
import installForem from '../tasks/install-forem.js';
import uninstallingDokku from '../tasks/uninstalling-dokku.js';

dotenv.config();
const encrypt = new Cryptr(process.env.CRYPTR_SECRET);

// I can essentially make it as a middleware => After check-auth and before rest of the routes.
export const checkConnection = async (req, res, next) => {
  const appId = req.params.aid;
  const userId = req.userData.userId;
  const socket = req.app.get('socket');

  // Checking existence of App
  let app;
  try {
    app = await App.findById(appId);
  } catch (error) {
    return next(new HttpError('Unable to locate the app', 404));
  }

  // Backed user validation.
  let user;
  if (app.creator.toString() !== userId) {
    return next(
      new HttpError('You are not allowed to use/update this app', 403)
    );
  } else {
    user = await User.findById(userId).populate('keys');
  }

  // console.log(user.keys);

  // Checking the existence of SSH Keys
  if (user.keys.length === 0) {
    await socket.emit(`server-notification-msg-${appId}`, {
      message: `You haven't configured your Server, please add at least one SSH Key`,
    });
    socket.disconnect();

    return next(
      new HttpError(
        `You haven't configured your Server, please add at least one SSH Key`,
        403
      )
    );
  } else {
    // Based on user requirement, I will extract the key, for now, I will use [0]
    const serverKey = user.keys[0];
    const encrypted = serverKey.identity;
    const decryptedString = encrypt.decrypt(encrypted);

    // Saving Key in node server filesystem.
    try {
      await fs.writeFileSync(`./ssh_keys/${serverKey.host}`, decryptedString);
    } catch (err) {
      await socket.emit(`server-notification-msg-${appId}`, {
        message: `Unable to extract the provided SSH Key, Please try again later`,
      });
      socket.disconnect();
      return next(
        new HttpError(
          `Unable to extract the provided SSH Key, Please try again later`,
          500
        )
      );
    }
    try {
      await fs.writeFileSync(
        `./ansible_inventory/${serverKey.host}`,
        `${serverKey.host} ansible_ssh_user=root ansible_ssh_private_key=../server/ssh_keys/${serverKey.host}`
      );
    } catch (err) {
      await socket.emit(`server-notification-msg-${appId}`, {
        message: `Unable to extract the provided SSH Key, Please try again later`,
      });
      socket.disconnect();
      return next(
        new HttpError(
          `Unable to extract the provided SSH Key, Please try again later`,
          403
        )
      );
    }
  }

  // Checking required ENV variables.

  let env;
  if (app.app == 'Forem') {
    env = await Env.findOne({ appID: appId });

    if (!env) {
      await socket.emit(`server-notification-msg-${appId}`, {
        message: `Unable to extract the provided SSH Key, Please try again later`,
      });
      socket.disconnect();
      return next(
        new HttpError(
          `You haven't configured the required ENV variables, Please configure them`,
          403
        )
      );
    }

    let envJson = [];
    for (var i = 0; i < env.var.length; i++) {
      envJson.push({
        env: env.var[i],
        value: env.val[i],
      });
    }

    const envJsonString = JSON.stringify(envJson);

    try {
      await fs.writeFileSync(
        `../apps/Forem/store/${user.keys[0].host}.json`,
        envJsonString
      );
    } catch (err) {
      console.log(err);
      return next(
        new HttpError(
          `Unable to process your ENV variables, Please try again later`,
          500
        )
      );
    }

    if (!env) {
      // I know for sure, right now it should have at least one env.
      // Also, I should make tight validations so user will provide all the required ENV variable
      return next(
        new HttpError(
          `You haven't configured your ENV variables, please add them by "Editing your APP"`,
          403
        )
      );
    }
  } else if (app.app === 'Wordpress') {
    console.log('Wordpress Logic goes here');
  }

  res
    .status(200)
    .json({ message: 'Found SSH Key, Trying to establish connection' });
};

export const establishConnection = async (req, res, next) => {
  const socket = req.app.get('socket');
  // I can also, simple use this => checkSSH();
  const appId = req.params.aid;
  const userId = req.userData.userId;
  socket.emit(`server-notification-msg-${appId}`, {
    message: `..... Build Started .....`,
  });
  // const app = await App.findById(appId);
  const user = await User.findById(userId).populate('keys');
  const serverKey = user.keys[0];
  // const env = await Env.findOne({ appID: appId });
  await checkSSH(serverKey.host, socket, res, req, next);
};

export const send = async (req, res, next) => {
  const socket = req.app.get('socket');
  // I can also, simple use this => checkSSH();
  const appId = req.params.aid;
  const userId = req.userData.userId;
  socket.emit(`server-notification-${appId}`, {
    message: `Configuring Basic Essentials`,
  });

  socket.emit(`server-notification-msg-${appId}`, {
    message: `Configuring Basic Essentials`,
  });

  const user = await User.findById(userId).populate('keys');
  const serverKey = user.keys[0];

  await sendEssentials(serverKey.host, socket, res, req, next);
};

export const installDokku = async (req, res, next) => {
  const appId = req.params.aid;
  const userId = req.userData.userId;
  const socket = req.app.get('socket');
  // socket.emit('server-notification', { message: `Finished, Installing dokku` });

  const app = await App.findById(appId);
  const user = await User.findById(userId).populate('keys');
  const serverKey = user.keys[0];
  const env = await Env.findOne({ appID: appId });

  // SSH Details
  const sshconfig = {
    host: serverKey.host,
    username: serverKey.username,
    identity: `./ssh_keys/${serverKey.host}`,
    //password: '',
  };

  // Connecting to the server using
  const ssh = new SSH2Promise(sshconfig);

  const isDokku = await ssh.exec('which dokku');
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Checking pre-installed dokku`,
  });

  if (!isDokku) {
    socket.emit(`server-notification-${appId}`, {
      message: `It might take upto 5 to 10 minutes to install dokku`,
    });
    socket.emit(`server-notification-msg-${appId}`, {
      message: `It might take upto 5 to 10 minutes to install dokku`,
    });
    res.status(200).json({
      message: `It might take upto 5 to 10 minutes to install dokku`,
    });
    installingDokku(serverKey.host, res, req, next, socket, appId, app, env);
  } else {
    socket.emit(`server-notification-msg-${appId}`, {
      message: `Dokku Already Installed`,
    });
    res.status(200).json({
      message: 'Dokku Already Installed, moving to app Installation',
    });

    if (app.app === 'Forem') {
      installForem(serverKey.host, res, req, next, socket, appId, app, env);
    } else {
      socket.emit(`server-notification-${appId}`, {
        message: `For now, we only support Forem`,
      });
      socket.emit(`server-notification-msg-${appId}`, {
        message: `For now, we only support Forem`,
      });
      // socket.disconnect();
    }
  }

  // if (!failed && !isDokku) {
  //   res.status(200).json({
  //     message: 'Installation Done',
  //   });
  // }
};

// This way, you can chain multiple commands!
// try {
//   await ssh.exec('mkdir akhil');
// } catch (err) {
//   failed = true;
//   return next(new HttpError(`Unable to create folder akhil`, 403));
// }
