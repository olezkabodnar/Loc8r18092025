const User = require('../../app_api/models/users');

// GET login page
const login = function(req, res){
    res.render('login', {
        title: 'Login - Loc8r',
        pageHeader: {
            title: 'Login'
        },
        formFields: {
            email: {
                label: 'Email',
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
                label: 'Email',
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
        submitButton: 'Register',
        footerText: 'Already have an account?',
        footerLink: {
            text: 'Login here',
            url: '/login'
        }
    });
};

// POST register - uses passport-local-mongoose
const doRegister = async function(req, res, next) {
    console.log('Registration attempt for:', req.body.email);
    
    try {
        const user = new User({
            email: req.body.email,
            name: req.body.name
        });
        
        const registeredUser = await User.register(user, req.body.password);
        console.log('User registered successfully:', registeredUser.email);
        
        // Auto-login after registration
        req.login(registeredUser, function(err) {
            if (err) {
                console.error('Auto-login error:', err);
                return next(err);
            }
            console.log('Auto-login successful');
            req.flash('success', 'Successfully registered!');
            return res.redirect('/');
        });
    } catch (err) {
        console.error('Registration error:', err);
        req.flash('error', err.message);
        return res.redirect('/register');
    }
};

// POST login - manually authenticate using passport-local-mongoose
const doLogin = async function(req, res, next) {
    console.log('Login attempt for:', req.body.email);
    
    try {
        const { user, error } = await User.authenticate()(req.body.email, req.body.password);
        
        if (error || !user) {
            console.log('Login failed:', error ? error.message : 'User not found');
            req.flash('error', error ? error.message : 'Invalid email or password');
            return res.redirect('/login');
        }
        
        req.login(user, function(err) {
            if (err) {
                console.error('req.login error:', err);
                return next(err);
            }
            console.log('Login successful for:', user.email);
            req.flash('success', 'Welcome back!');
            return res.redirect('/');
        });
    } catch (err) {
        console.error('Login error:', err);
        req.flash('error', 'An error occurred during login');
        return res.redirect('/login');
    }
};

// GET logout
const logout = function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    });
    req.session.save(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

module.exports = {
  login,
  doLogin,
  register,
  doRegister,
  logout
};
