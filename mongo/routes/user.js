const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const { User , Course } = require("../db");

//User Routes 
router.post('/signup' , (req ,res) => {
    //Implement user signup logic
    const  username = req.body.username;
    const password = req.body.password;
    User.create({
        //if key value is same name don't write like username : username ,likho jo niche likhe hai vaisa
        username,
        password
    })
    res.json({
        message : "User created successfully"
    })
});

// In here get method same logic as admin you write its not give an error 
//because here we donot use any protected miidleware
router.get('/courses' , async(req ,res) => {
    //Implements listing all courses logic
         const response = await Course.find({});
         res.json({
            courses : response
         })

});

router.post('/courses/:courseId' , userMiddleware, async(req , res) => {
    //implements course purchase logic
       const courseId = req.params.courseId;
       const username = req.headers.username;
      await User.updateOne({
         username: username
       } , {
          "$push": {
            purchasedCourses: courseId
          }
       });

       res.json({
        message: "Purchase Completed!"
       })
});

router.get('/purchasedCourses' , userMiddleware, async(req , res) => {
    //implements fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });
   // console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
              "$in" : user.purchasedCourses
        }
    });
    res.json({
        courses : courses
    })

});

module.exports = router;



