'use strict';

const restify = require('restify');
const MiddlewareAPIVersion = require('./middlewares/api_version.js');
const FormatterJSON = require('./formatters/json.js');
const PackageJSON = require('../package.json');

class AsynchronousToddlerCore {
    constructor(options) {
        this.options = options;
        this.server = restify.createServer({
            name: 'asynchronoustoddler.com',
            formatters: {
                'application/json; q=0.4': FormatterJSON
            },
            version: PackageJSON.version
        });

        this.server.pre(MiddlewareAPIVersion({prefix: '/api'}));
        this.server.pre(restify.plugins.pre.dedupeSlashes());

        this.server.use(restify.plugins.acceptParser(this.server.acceptable));
        this.server.use(restify.plugins.queryParser({
            mapParams: true,
            allowDots: true,
            parameterLimit: 25,
            strictNullHandling: true
        }));
        this.server.use(restify.plugins.bodyParser({
            mapParams: true
        }));
        this.server.use(restify.plugins.gzipResponse());
        this.server.get('/hello', (request, response, next) => {
            response.send(request.headers);

            return next();
        })
    }

    listen(port) {
        return new Promise((resolve, reject) => {
            this.server.listen(port, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(this.server.url);
            })
        });
    }
}

module.exports = AsynchronousToddlerCore;