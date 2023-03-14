const fs = require('fs/promises');

const readTalkerFile = async () => {
  try {
    const arrayTalkers = await fs.readFile('src/talker.json', 'utf8');
    return JSON.parse(arrayTalkers);
  } catch (e) {
    const err = new Error('Erro em abrir o arquivo');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  readTalkerFile,
};
