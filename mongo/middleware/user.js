const { User } = require("../db") ;

function userMiddleware(req , res , next){
    //Implement user auth logic
    //You need to check the headers and validates the user from the user DB.
    //Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    //here we check username and password exist or not  in db 
    User.findOne({
              username : username,
              password : password
    })
    .then(function(value) {
       if(value){
           //it exist then it  goes routes folder adminRouter
           next();
       } else{
           res.status(403).json({
               msg : "User doesn't exist"
           })
       }
    })
}

module.exports = userMiddleware;