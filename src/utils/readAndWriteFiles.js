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

const insertTalkerFile = async (login) => {
  try {
    const arrayTalkers = await readTalkerFile();
    arrayTalkers.push(login);
    return await fs.writeFile('src/talker.json', JSON.stringify(arrayTalkers, null, 2));
  } catch (e) {
    const err = new Error('Erro ao escrever no arquivo');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  readTalkerFile,
  insertTalkerFile,
};
