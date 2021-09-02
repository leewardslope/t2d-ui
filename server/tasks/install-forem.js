import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const installForem = async (ip, res, req, next, socket, app, env) => {
  console.log(ip);
  console.log(res);
  console.log(socket.id);

  const installationFailed = stage => {
    socket.emit(`server-notification-${appId}`, {
      message: `${stage} failed`,
    });
    socket.emit(`server-notification-msg-${appId}`, {
      message: `${stage} failed`,
    });

    return next(
      new HttpError(`${stage} failed, contact is for more info`, 403)
    );
  };

  const socketMessage = msg => {
    socket.emit(`server-notification-${appId}`, {
      message: msg,
    });

    socket.emit(`server-notification-msg-${appId}`, {
      message: msg,
    });
  };

  const appName = app.app; // name of the app, ex: forem, ghost.
  const appTitle = app.title; // name given by the user for his app.

  socket.emit(`server-notification-${appId}`, {
    message: `Starting Forem Installation`,
  });

  socket.emit(`server-notification-msg-${appId}`, {
    message: `Starting Forem Installation, might take 25-45 minutes, you can check logs for more info`,
  });

  // Step 01 => creating app
  socketMessage('Creating your App');

  const { createApp } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/apps/create.yml --extra-vars "appTitle=${appTitle}"`
  );

  if (createApp.stderr) {
    console.log('stderr:', createApp.stderr);
    installationFailed('creating app failed');
  }

  socketMessage('App created');

  // Step 02 => Installing plugins => later I will try to make a loop

  socketMessage('Installing required plugins');

  const { installingPlugins } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/plugins/add.yml --extra-vars "appTitle=${appTitle} file=plugins"`
  );

  if (installingPlugins.stderr) {
    console.log('stderr:', installingPlugins.stderr);
    installationFailed('installing plugins failed');
  }

  socketMessage('Plugins installed successfully');

  // Step 03 => Adding Buildpacks

  socketMessage('Adding required buildpacks');

  const { addingBuildpacks } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/buildpacks/add.yml --extra-vars "appTitle=${appTitle} file=buildpacks appName=${appName}"`
  );

  if (addingBuildpacks.stderr) {
    console.log('stderr:', addingBuildpacks.stderr);
    installationFailed('installing buildpacks failed');
  }

  socketMessage('Buildpacks installed successfully');

  // Step 04 => Scale and memory allocation

  socketMessage('Allocation Workers and Scale');

  const { scaleAndMemory } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/memory/scale.yml --extra-vars "appTitle=${appTitle} file=scale-memory appName=${appName}"`
  );

  if (scaleAndMemory.stderr) {
    console.log('stderr:', scaleAndMemory.stderr);
    installationFailed('Allocating Workers and Scaling');
  }

  socketMessage('Allocating Workers and Scaling was done successfully');

  // Step 05 => Creating and Linking databases

  socketMessage('Creating and Linking databases');

  const { createAndLinkDB } = await execAsync(
    `ansible-playbook -i ./ansible_inventory/${ip} ../ansible/playbooks/databases/create_and_link.yml --extra-vars "appTitle=${appTitle} file=databases appName=${appName}"`
  );

  if (createAndLinkDB.stderr) {
    console.log('stderr:', createAndLinkDB.stderr);
    installationFailed('Creating and Linking databases');
  }

  socketMessage('Creating and Linking databases was done successfully');

  socket.emit(`server-notification-${appId}`, {
    message: `Forem Installed successfully`,
  });
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Forem Installed successfully`,
  });
  socket.disconnect();
};

export default installForem;
