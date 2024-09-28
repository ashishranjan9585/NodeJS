# Middlewares, Global Catches & Zod
## Understanding Middlewares:
- Middleware is a function in Express.js that have access to the request object(req), the response object(res), and the next middleware function in the application's request-response cycle.
- Middleware functions can performs a variety of tasks, including modifying the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack.

**Imagine a Busy Hospital:**
Thing of a hospital where there's a doctor, patients waiting in line, and a few helpful assistants making sure everything runs smoothly.
 1. **Doctor's Cabin (`Application Logic`)** :
    - The doctor is like the main brain of our hospital - ready to help patients with their problems.
 2. **Waiting Room (`Callback Queue`)** :
    - The waiting room is where patients hang out before seeing the doctor. Each patient has a unique situation.
 3. **Intermediates (`Middleware`)** :
    - Before a patient sees a doctor, there are some helpers doing important tasks.
    - One helper checks if patients have the right paperwork, This is like ensuring everyone is who they say they are (`Authentication`).
    - Another helper does quick health checks - like making sure patients' blood pressure is okay.
      This is similar to checking if the information coming to the doctor is healthy and makes sense `(Input Validation)`
      
 ![Untitled](https://github.com/user-attachments/assets/9b31ae4f-6e51-4061-9083-55f5cb85a96c)

 **Type of Middleware:**
  - **Application-level middleware:** Bound to an instance of the express application.
  - **Router-level middleware:** Bound to an instance of `express.Router()`.
  - **Error-handling middleware:** Takes four arguments (err, req, res, next).
  - **Built-in middleware:** Provided by Express, such as `express.json()` and `express.static()`.
  - **Third-party middleware:** Created by the community, such as body-parser, morgan, etc.
    
#### Example 1.
```javascript
 const express = require('express')
const app = express()

app.get('/" , (req , res) => {
  res.send('Hello World!')
})
app.listen(3000)
```
#### Example 2.
```javascript
 const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Route-specific middleware
const checkUser = (req, res, next) => {
  if (req.query.user === 'admin') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

app.get('/admin', checkUser, (req, res) => {
  res.send('Welcome Admin!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
