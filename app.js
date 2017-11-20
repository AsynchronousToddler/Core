'use strict';
const fs = require('fs');
const AsynchronousToddlerCore = require('./src/index.js');

let options_file_path = process.env.OPTIONS_FILE || 'options.json';

fs.readFile(options_file_path, (file_error, file_content) => {
    if (file_error) {
        console.log(file_error);

        return process.exit(1);
    }

    try {
        let options = JSON.parse(file_content);
        let app = new AsynchronousToddlerCore(options);
        let port = process.env.PORT || 2400;

        app.listen(port).then(url => {
            return console.log('Listening [' + url + ']');
        }, listen_error => {
            console.log(listen_error);

            return process.exit(1);
        })
    } catch (json_error) {
        console.log(json_error);

        return process.exit(1);
    }
});