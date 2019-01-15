const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
} else {
  logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }));
}

module.exports = logger;
