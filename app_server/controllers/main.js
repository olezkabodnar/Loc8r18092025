/* GET home page */
const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};


const index = function(req, res){
  res.render('index', { title: 'Express' });
};

// GET login page
const login = function(req, res){
    res.render('login', {
        title: 'Login - Loc8r',
        pageHeader: {
            title: 'Login'
        },
        formFields: {
            email: {
                label: 'Email address',
                placeholder: 'Email',
                type: 'email',
                name: 'email'
            },
            password: {
                label: 'Password',
                placeholder: 'Password',
                type: 'password',
                name: 'password'
            }
        },
        rememberMe: 'Remember me',
        submitButton: 'Login',
        footerText: "Don't have an account?",
        footerLink: {
            text: 'Register here',
            url: '/register'
        }
    });
};

// POST login - calls API
const doLogin = function(req, res){
    const path = '/api/login';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: {
            email: req.body.email,
            password: req.body.password
        }
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            res.status(500).render('error', {
                message: 'Error connecting to API',
                error: err
            });
        } else if (response.statusCode === 200) {
            res.redirect('/');
        } else if (response.statusCode === 404 || response.statusCode === 401) {
            res.status(response.statusCode).render('error', {
                message: body.message || 'Login failed',
                error: body
            });
        } else {
            res.status(response.statusCode).render('error', {
                message: 'Error logging in',
                error: body
            });
        }
    });
};

// GET register page
const register = function(req, res){
    res.render('register', {
        title: 'Register - Loc8r',
        pageHeader: {
            title: 'Register'
        },
        formFields: {
            name: {
                label: 'Name',
                placeholder: 'Name',
                type: 'text',
                name: 'name'
            },
            email: {
                label: 'Email address',
                placeholder: 'Email',
                type: 'email',
                name: 'email'
            },
            password: {
                label: 'Password',
                placeholder: 'Password',
                type: 'password',
                name: 'password'
            },
            reenterPassword: {
                label: 'Re-enter Password',
                placeholder: 'Password',
                type: 'password',
                name: 'reenter-password'
            }
        },
        rememberMe: 'Remember me',
        submitButton: 'Register',
        footerText: 'Already have an account?',
        footerLink: {
            text: 'Login here',
            url: '/login'
        }
    });
};

// POST register - calls API
const doRegister = function(req, res){
    const path = '/api/register';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            res.status(500).render('error', {
                message: 'Error connecting to API',
                error: err
            });
        } else if (response.statusCode === 201) {
            res.redirect('/login');
        } else if (response.statusCode === 400) {
            res.status(response.statusCode).render('error', {
                message: body.message || 'Registration failed',
                error: body
            });
        } else {
            res.status(response.statusCode).render('error', {
                message: 'Error registering user',
                error: body
            });
        }
    });
};



module.exports = {
  index,
  login,
  doLogin,
  register,
  doRegister
};
