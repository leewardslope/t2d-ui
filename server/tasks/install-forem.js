import shell from 'shelljs';
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

const installForem = async (ip, res, socket, app, env) => {
  console.log(ip);
  console.log(res);
  console.log(socket.id);

  socket.emit(`server-notification-${appId}`, {
    message: `Came Here awesome`,
  });
  socket.emit(`server-notification-msg-${appId}`, {
    message: `Came here awesome`,
  });
  socket.disconnect();
};

export default installForem;
