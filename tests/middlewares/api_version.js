'use strict';

const chai = require('chai');
const MiddlewareAPIVersion = require('../../src/middlewares/api_version.js');
const expect = chai.expect;

class MockupRequest {
    constructor(url, headers) {
        this.url = url;
        this.headers = headers || {};
    }
}

it('Should set accept-version to 1.0.0 and change url to /hello with /api/v1.0.0/hello [prefix: api]', (done) => {
    let request = new MockupRequest('/api/v1.0.0/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion({
        prefix: '/api'
    });

    func(request, {}, (err) => {
        expect(err).to.be.undefined;
        expect(request.headers['accept-version']).to.equal('1.0.0');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/api/v1.0.0/hello');
        expect(request.url).to.equal('/hello');
        done();
    })
});

it('Should set accept-version to 1.0.0 and change url to /hello with /api/v1.0/hello [prefix: api]', (done) => {
    let request = new MockupRequest('/api/v1.0/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion({
        prefix: '/api'
    });

    func(request, {}, (err) => {
        expect(err).to.be.undefined;
        expect(request.headers['accept-version']).to.equal('1.0.0');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/api/v1.0/hello');
        expect(request.url).to.equal('/hello');
        done();
    })
});

it('Should set accept-version to 1.0.0 and change url to /hello with /api/v1/hello [prefix: api]', (done) => {
    let request = new MockupRequest('/api/v1/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion({
        prefix: '/api'
    });

    func(request, {}, (err) => {
        expect(err).to.be.undefined;
        expect(request.headers['accept-version']).to.equal('1.0.0');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/api/v1/hello');
        expect(request.url).to.equal('/hello');
        done();
    })
});

it('Should throw a InvalidVersionError when an invalid version is provided [prefix: api]', (done) => {
    let request = new MockupRequest('/api/vInvalid/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion({
        prefix: '/api'
    });

    func(request, {}, (err) => {
        expect(err.name).to.equal('InvalidVersionError');
        expect(err.message).to.equal('This is an invalid version');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/api/vInvalid/hello');
        done();
    })
});

it('Should set accept-version to 1.0.0 and change url to /hello with /v1.0.0/hello [no prefix]', (done) => {
    let request = new MockupRequest('/v1.0.0/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion();

    func(request, {}, (err) => {
        expect(err).to.be.undefined;
        expect(request.headers['accept-version']).to.equal('1.0.0');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/v1.0.0/hello');
        expect(request.url).to.equal('/hello');
        done();
    })
});

it('Should set accept-version to 1.0.0 and change url to /hello with /v1.0/hello [no prefix]', (done) => {
    let request = new MockupRequest('/v1.0/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion();

    func(request, {}, (err) => {
        expect(err).to.be.undefined;
        expect(request.headers['accept-version']).to.equal('1.0.0');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/v1.0/hello');
        expect(request.url).to.equal('/hello');
        done();
    })
});

it('Should set accept-version to 1.0.0 and change url to /hello with /v1/hello [no prefix]', (done) => {
    let request = new MockupRequest('/v1/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion();

    func(request, {}, (err) => {
        expect(err).to.be.undefined;
        expect(request.headers['accept-version']).to.equal('1.0.0');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/v1/hello');
        expect(request.url).to.equal('/hello');
        done();
    })
});

it('Should throw a InvalidVersionError when an invalid version is provided [no prefix]', (done) => {
    let request = new MockupRequest('/vInvalid/hello', {
        host: 'asynchronoustoddler.com'
    });
    let func = MiddlewareAPIVersion();

    func(request, {}, (err) => {
        expect(err.name).to.equal('InvalidVersionError');
        expect(err.message).to.equal('This is an invalid version');
        expect(request.headers['host']).to.equal('asynchronoustoddler.com');
        expect(request.original_url).to.equal('/vInvalid/hello');
        done();
    })
});