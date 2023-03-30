const crypto = require('crypto');

const generatorToken = () => {
    const buffer = crypto.randomBytes(8);
    const token = buffer.toString('hex');
    return token;
};

module.exports = generatorToken;
