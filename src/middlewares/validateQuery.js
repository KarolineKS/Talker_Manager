const validateQueryRate = (req, res, next) => {
  const { rate } = req.query;
  if (rate < 1 || rate > 5 || (!Number.isInteger(+rate) && typeof (+rate) !== 'number')) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateQueryDate = (req, res, next) => {
  const { date } = req.query;
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  const testData = regexData.test(date);
  if (!testData && date.length !== 0) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  next();
};

const validateRateQuery = (req, res, next) => {
  const { rate } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (!Number.isInteger(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = {
  validateQueryRate,
  validateQueryDate,
  validateRateQuery,
};