const { readTalkerFile } = require('./readAndWriteFiles');

const generatorIdTalker = async () => {
  const talkerFile = await readTalkerFile();
  const arrayId = [];
  talkerFile.forEach(({ id }) => {
    arrayId.push(id);
  });
  const maxId = Math.max(...arrayId);
  return maxId + 1;
};

module.exports = {
  generatorIdTalker,
};