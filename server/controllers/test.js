import shell from 'shelljs';

export const test = async (req, res) => {
  try {
    shell.exec('curl ifconfig.me', (code, output) => {
      res.send(`${output}`);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
