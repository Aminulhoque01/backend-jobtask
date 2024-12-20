import winston, { error } from "winston";
import path from 'path'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
   new winston.transports.Console(),
   new winston.transports.File({ filename: path.join(process.cwd(),'logs',"winston","success.log"), level: 'error' })
  ],
})
const errorlogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
   new winston.transports.Console(),
   new winston.transports.File({ filename: path.join(process.cwd(),'logs',"winston","error.log"), level: 'error' })
  ],
})

export { logger,errorlogger};