const express = require('express');
const { readTalkerFile } = require('./utils/readAndWriteFiles');

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
