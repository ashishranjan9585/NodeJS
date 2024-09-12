const {Admin} = require("../db");

//MiddleWare for handling  auth 
function adminMiddleware(req ,res, next) {
     //Implement admin auth logic 
     //You need to check the headers and validate the admin from the admin DB.
     //CHECK readme for the exact headers to be expected

     const username = req.headers.username;
     const password = req.headers.password;

     //here we check username and password exist or not  in db 
     Admin.findOne({
               username : username,
               password : password
     })
     .then(function(value) {
        if(value){
            //it exist then it  goes routes folder adminRouter
            next();
        } else{
            res.status(403).json({
                msg : "Admin doesn't exist"
            })
        }
     })
}

module.exports = adminMiddleware;