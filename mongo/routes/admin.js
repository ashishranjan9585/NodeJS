const  { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

//does not mean , this handles the /signup endpoint it handle Admin routes 
//ROUTER USE  FOR BETTER well structure our application
//Admin Routes
router.post('/signup' , async (req ,res) => {
    //implement admin signup logic
    const username  = req.body.username;
    const password  = req.body.password;

    //CHECK if a user with this username already exists 
    await Admin.create({
        username: username,
        password: password
    })
     res.json({
            message: "Admin created Successfully"
        })

});

router.post('/courses' , adminMiddleware , async(req ,res) =>{
    //implements course creation logic
    const title  = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //if u want to validate all these thing then using zod

    const  newCourse = await Course.create({
        title: title ,
        description: description,
        imageLink: imageLink,
        price: price
    })
    res.json({
        message : "Course created Successfully" , courseId: newCourse._id
    })

});

router.get('/courses' , adminMiddleware , async(req ,res)=> {
    //implements fetching all courses logic
    const response  = await Course.find({});
    res.json({
        courses : response
    })

});

module.exports = router;

