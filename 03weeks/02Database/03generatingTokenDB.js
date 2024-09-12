//signup - name  , password and email put them in the database.
//signin - check username and password from the database and return the token.
//users - header put token and return all the users from the databaase except the current user.

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const jwtPassword = 'secret_key';

const  app = express();
app.use(express.json());

mongoose.connect('DATABASE_URL/users_weeks',
  {
    useNewUrlParser: true, 
});

const User = mongoose.model('User' ,
{
   name : String,
   email : String,
   password : String 
});

//Signup route
app.post('/signup' , async(req ,res) => {
    try {
       const {email , name , password} = req.body;
       //Check if  user with given email already exists
       const existingUser = await User.findOne({ email });
       if(existingUser) {
           return res.status(400).json({ message: 'User with this email already exists' });

       }
       //Create new user
       const user = new User({name , email , password});
       await user.save();
       res.status(201).json({message: 'User created successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
});

//Login route
app.post('/signin', async (req, res) => {
    try {
        const {email , password} = req.body;
        // Check if user with given email address
        const user = await User.findOne({ email });
        if(!user || user.password !== password){
             return res.status(401).json({ message: 'Invalid credentials'});
      }

      //Generate JWT token 
      const token = jwt.sign({ userId : user._id } , jwtPassword);
       res.status(200).json({ token });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User route
app.get('/users' , async(req ,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token , jwtPassword);
        const  userId = decoded.userId;
        //Exclude the current user
        const users = await User.find({_id : { $ne: userId } });
        res.status(200).json({ users });

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
