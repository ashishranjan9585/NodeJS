const  jwt  = require('jsonwebtoken')

const jwtPassword = 'secret';
const zod = require('zod');

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);



/**
 * Generate a JWT for a given username and password
 * 
 * @param {string} username - The username to be included in the JWT payload.
 *                             Must be a valid email address.
 * 
 * @param {string} password - The password to be included  in the JWT payload ,
 *                            should  meet  the defined length requirement(e.g.. , 6 characters) 
 * 
 * @return {string|null} A JWT string if the username and password are valid
 *                       Return null if the username is not valid email or password does not meet the length requirement
 * 
 */

function signJwt(username , password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }
    const signature = jwt.sign({
        username
    } , jwtPassword);
    return signature;
   //console.log(signature);
}

/**
 * Verifying  a JWT  using a secret key 
 * 
 * @param {string} token - The JWT  string to verify
 * @return {boolean} Return true if the token is valid  and verified using the secret key.
 *                   Return false if the token is invalid , expired , or not verified
 *                   using the secret key.
 * 
 */

function verifyJwt(token){
   let ans = true ;
   try {
       jwt.verify(token , jwtPassword);
   } catch(e) {
      ans = false;
   }
   return ans;
}

/**
 *  Decodes  a JWT to reveal its payload without  verifying its authenticity
 * 
 * @param {string} token - The JWT string to decode
 * @returns {object| false} The decoded payload of the JWT  if the token is a valid JWT format.
 *                          Returns  false if the token is not a valid JWT format.
 * 
 */

function decodeJwt(token) {
     const  decoded = jwt.decode(token);
     if(decoded) {
        return true;
     }else {
        return false;
     }
}

module.exports = {
    signJwt,
    verifyJwt ,
    decodeJwt ,
    jwtPassword ,

}