const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const  PORT = 8000;

/*const html = `
<ul>
   ${users.map((user) => `<li>${user.first_name}</li>`)}
   </ul>
   `;
   res.send(html); */

//Routes
app.get("/api/users" , (req , res) => {
    return res.json(users);
});

app
.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id) ;
    const  user = users.find((user) => user.id === id);
    return res.json(user);
})
.post((req, res) => {
    //TODO : CREATE A new user
    return res.json({status : "pending"});
})
.patch((req, res) => {
    //TODO : Edit the user with id
    return res.json({status : "pending"});
})
.delete((req, res) => {
    //TODO : Delete  the user with id 
    return res.json({status : "pending"});
})

app.listen(PORT , () => console.log(`Server Started at port ${PORT}`));