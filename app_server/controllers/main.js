/* GET home page */


const index = function(req, res){ 
res.render('index', { title: 'Express' }); 
};


const login = function(req, res){ 
res.render('login', { title: 'Express' }); 
};



module.exports = { 
index 

};
