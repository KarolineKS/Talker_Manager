const express = require('express');
const { readTalkerFile, insertTalkerFile } = require('./utils/readAndWriteFiles');
const { generatorIdTalker } = require('./utils/generatorIdTalker');
const { generatorToken } = require('./utils/generatorToken');
const {
  validateEmail,
  validateLogin,
  validatePassword,
} = require('./middlewares/validateLogin');
const { validateToken } = require('./middlewares/validateToken');
const { 
  validateName, 
  validateAge, 
  validateRate, validateWatchedAt, validateTalk } = require('./middlewares/validateTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor está rodando na porta ${PORT}`);
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkerFile();
  if (!talkers[0]) return res.status(200).json([]);
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkerFile();
  const { id } = req.params;
  const filteredTalker = talkers.find((talker) => talker.id === Number(id));

  if (!filteredTalker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filteredTalker);
});

app.post(
  '/login',
  validateLogin,
  validateEmail,
  validatePassword,
  async (_req, res) => res.status(200).json({ token: generatorToken() }),
);

app.post('/talker', validateToken, 
validateName, 
validateAge, 
validateTalk, validateWatchedAt, validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const id = await generatorIdTalker();
  const talker = {
    name,
    age,
    id,
    talk,
  };
  if (talker) await insertTalkerFile(talker);
  return res.status(201).json(talker);
});