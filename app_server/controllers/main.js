/* GET home page */


const index = function(req, res){ 
res.render('index', { title: 'Express' }); 
};


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



module.exports = { 
index,
login,
register

};
