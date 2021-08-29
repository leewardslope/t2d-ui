import shell from 'shelljs';
import fs from 'fs';

const checkSSH = () => {
  const sshSucceeded = () => {
    console.log(`working`);
    shell.exec('rm -rf ./tree/user1');
  };

  if ('./tree/user1') {
    shell.exec('rm -rf ./tree/user1');
  }

  shell.exec('ansible user1 -t tree -o -i ../ansible/inventory -m ping');

  fs.readFile('./tree/user1', 'utf8', (err, jsonString) => {
    if (err) {
      console.log(err);
    } else {
      try {
        const data = JSON.parse(jsonString);
        if (data.ping === 'pong') {
          sshSucceeded();
        }
      } catch (error) {
        console.log(failed);
      }
    }
  });
};

export default checkSSH;
