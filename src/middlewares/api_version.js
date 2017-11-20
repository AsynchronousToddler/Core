'use strict';

const semver = require('semver');
const restify_errors = require('restify-errors');

/*
 *
 * Gotta give credit where credit is due. Thanks to Marco Godinez for the original stack overflow answer which can be found
 * here: https://stackoverflow.com/a/29706259
 *
 */


module.exports = function (options) {
    options = options || {};
    let path_prefix = options.prefix || '';

    return function (request, response, next) {
        if(!request.url.startsWith(path_prefix)) {
             next();
        }

        request.original_url = request.url;
        request.url = request.url.replace(path_prefix, '');

        let pieces = request.url.replace(/^\/+/, '').split('/');
        let version = pieces[0];

        version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3');
        version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0');
        version = version.replace(/v(\d{1})/, '$1.0.0');

        if (semver.valid(version)) {
            request.url = path_prefix + request.url.substr(pieces[0].length + 1);
            request.headers = request.headers || {};
            request.headers['accept-version'] = version;
        } else {
            return next(new restify_errors.InvalidVersionError('This is an invalid version'));
        }

        next();
    }
};