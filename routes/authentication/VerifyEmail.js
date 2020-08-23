const fs = require('fs');
const express = require('express');
const verifyEmail = express.Router();
const cors = require('cors');

verifyEmail.use(cors());

verifyEmail.get('/verifyEmail',async(req, res) => {
 
    let key = req.query.key; 

    //Here I am just checking that is there a key present in request query or not
    //Create your own logic to validate this key & show respective message.

    if(key)
    {
        res.writeHead(200,{'Content-Type': 'text/html'});
        fs.readFile('./emailTemplates/success.html',null,(error,data)=>{
            if(error)
            {
                res.write("Congratulations! Your email address was successfully verified. You can now login to your account.");
            }
            else
            {
                res.write(data);
            }
            res.end();
        });
        return true;
    }
    else
    {
        res.writeHead(404,{'Content-Type': 'text/html'});
        fs.readFile('./emailTemplates/error.html',null,(error,data)=>{
            if(error)
            {
                res.write("Oops something went wrong! The link you entered might be invalid. Please enter a correct link to verify your email address.");
            }
            else
            {
                res.write(data);
            }
            res.end();
        });
        return false;
    }
});

module.exports = verifyEmail;