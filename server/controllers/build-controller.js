import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

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
import shell from 'shelljs';
import checkSSH from '../tasks/check-ssh.js';
import installingDokku from '../tasks/installing-dokku.js';
import uninstallingDokku from '../tasks/uninstalling-dokku.js';

dotenv.config();
const encrypt = new Cryptr(process.env.CRYPTR_SECRET);

// I can essentially make it as a middleware => After check-auth and before rest of the routes.
export const checkConnection = async (req, res, next) => {
  const appId = req.params.aid;
  const userId = req.userData.userId;

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
      console.log(err);
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
      console.log(err);
      return next(
        new HttpError(
          `Unable to extract the provided SSH Key, Please try again later`,
          500
        )
      );
    }
  }

  // Checking required ENV variables.
  let env;
  if (app.app == 'Forem') {
    env = await Env.findOne({ appID: appId });
    if (!env) {
      // I know for sure, right now it should have at least one env.
      // Also, I should make tight validations so user will provide all the required ENV variables
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

  res.status(200).json({ message: 'Checking Passed, Moving to Step 02' });
};

export const establishConnection = async (req, res, next) => {
  // I can also, simple use this => checkSSH();
  const appId = req.params.aid;
  const userId = req.userData.userId;

  // const app = await App.findById(appId);
  const user = await User.findById(userId).populate('keys');
  const serverKey = user.keys[0];
  // const env = await Env.findOne({ appID: appId });

  // SSH Details
  const sshconfig = {
    host: serverKey.host,
    username: serverKey.username,
    identity: `./ssh_keys/${serverKey.host}`,
    //password: '',
  };

  // Connecting to the server using
  const ssh = new SSH2Promise(sshconfig);

  try {
    await ssh.connect();
    console.log(`Connection established with the user's server`);
  } catch (error) {
    return next(
      new HttpError(
        `Unable to connect to your server, please check update your SSH Keys`,
        403
      )
    );
  }

  res.status(200).json({
    message: 'Establish Connection to your SSH Server, Moving to Step 03',
  });
};

export const installDokku = async (req, res, next) => {
  const appId = req.params.aid;
  const userId = req.userData.userId;
  const socket = req.app.get('socket');
  // socket.emit('server-notification', { message: `Finished, Installing dokku` });

  // const app = await App.findById(appId);
  const user = await User.findById(userId).populate('keys');
  const serverKey = user.keys[0];
  // const env = await Env.findOne({ appID: appId });

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
  let failed = false;
  if (!isDokku) {
    res.status(200).json({
      message: `It might take upto 5 to 10 minutes to install dokku`,
    });
    installingDokku(serverKey.host);
    socket.emit('server-notification', {
      message: `Finished, Installing dokku`,
    });
    isDokku = true;
  } else {
    socket.emit('server-notification', {
      message: `Finished, Installing dokku`,
    });
    res.status(200).json({
      message: 'Dokku Already Installed, skipping Dokku Installation',
    });
  }

  // if (!failed && !isDokku) {
  //   res.status(200).json({
  //     message: 'Installation Done',
  //   });
  // }
  socket.disconnect();
};

// This way, you can chain multiple commands!
// try {
//   await ssh.exec('mkdir akhil');
// } catch (err) {
//   failed = true;
//   return next(new HttpError(`Unable to create folder akhil`, 403));
// }
