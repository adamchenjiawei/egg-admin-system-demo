'use strict';

module.exports = app => {
    app.post('/login', 'users.login');
    app.post('/register', 'users.register');
};
