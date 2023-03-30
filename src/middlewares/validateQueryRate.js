const validateQueryRate = (req, res, next) => {
  const { rate } = req.query;
  if (rate < 1 || rate > 5 || !Number.isInteger(+rate) || typeof (+rate) !== 'number') {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  
  next();
};

module.exports = validateQueryRate;