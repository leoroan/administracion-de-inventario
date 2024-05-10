import winston, { transports } from "winston";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "cyan",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "white",
    debug: "blue",
  },
};

winston.addColors(customLevelsOptions.colors);

export const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new transports.Console({
      level: "debug",
    }),
    new transports.File({
      filename: "logs/dev/combined.log",
      level: "error",
      maxFiles: 7,
      maxsize: 5242880, // 5MB
      tailable: true,
    }),
  ],
  format: winston.format.combine(
    // winston.format.timestamp({ format: 'DD-MM-YYYY  HH:mm:ss' }),
    winston.format.colorize({ colors: customLevelsOptions.colors }),
    winston.format.simple()
  )
});

export const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new transports.Console({
      level: "info"
    }),
    new transports.File({
      filename: "logs/prod/error.log",
      level: "error",
      maxFiles: 10, 
      maxsize: 5242880, // 5MB
      tailable: true,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY  HH:mm:ss' }),
    winston.format.colorize({ colors: customLevelsOptions.colors }),
    winston.format.simple()
  )
});
