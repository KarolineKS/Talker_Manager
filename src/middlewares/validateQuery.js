const validateQueryDate = (req, res, next) => {
  const { date } = req.query;
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  const testData = regexData.test(date);
  if (!testData && date) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  next();
};

const validateRateQuery = (req, res, next) => {
  const { rate } = req.query;
  if (rate && (!Number.isInteger(Number(rate)) || Number(rate) < 1 || Number(rate) > 5)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = {

  validateQueryDate,
  validateRateQuery,
};