'use strict'

const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');
class Mylogger {
    constructor() {
        const formatPrint = format.printf(
            ({level, message, context, requestId, timestamp, metadata}) => {
                const returnStr = `${timestamp} - ${level} - ${context}-${requestId}-${message}-${JSON.stringify(metadata)}`
                return returnStr
            }
        )

        this.logger = createLogger({
            format: format.combine(
                format.timestamp( {format: 'YYYY-MM-DD HH:mm:ss'}),
                formatPrint
            ),
            transport: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    filename: 'application-info-%DATE%.info.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '1m',
                    maxFiles: '14d',
                    format: format.combine(
                        format.timestamp( {format: 'YYYY-MM-DD HH:mm:ss'}),
                        formatPrint
                    ),
                    level: 'info'
                }),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    filename: 'application-error-%DATE%.error.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '1m',
                    maxFiles: '14d',
                    format: format.combine(
                        format.timestamp( {format: 'YYYY-MM-DD HH:mm:ss'}),
                        formatPrint
                    ),
                    level: 'error'
                })
            ]
        })
    }

    commonParams(params) {
        let context, req, metadata
        if (!Array.isArray(params)) {
            context = params
        } else {
            [context, req, metadata] = params;
        }

        const requestId = req.requestId || 'unknown'
        return {
            requestId,
            context,
            metadata
        }
    }

    log(messages, params) {
        const paramLog = this.commonParams(params);
        const logObject = Object.assign({messages}, paramLog)
        this.logger.info(logObject)
    }
    error(messages, params) {
        const paramLog = this.commonParams(params);
        const logObject = Object.assign({messages}, paramLog)
        this.logger.error(logObject)
    }
}

module.exports = new Mylogger();