'use strict';

module.exports = function (request, response, body) {
    if (!body) {
        response.setHeader('Content-Type', 0);
        return null;
    }

    if (Buffer.isBuffer(body)) {
        body = body.toString('base64');
    }

    let pretty_print = 2;
    let query = request.query || {};

    if (query.pretty_print !== undefined) {
        let tmp_pretty_print = query.pretty_print;

        try {
            tmp_pretty_print = parseInt(tmp_pretty_print);

            if (tmp_pretty_print > 0 && tmp_pretty_print < 9) {
                pretty_print = tmp_pretty_print;
            }
        } catch (e) {

        }
    }

    body = JSON.stringify(body, null, pretty_print);
    response.setHeader('Content-Length', Buffer.byteLength(body));

    return body;
};