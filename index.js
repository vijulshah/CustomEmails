//dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//routes
const Signup = require('./routes/authentication/Signup');
const VerifyEmail = require('./routes/authentication/VerifyEmail');
//initialize app
const app = express();
const port = process.env.PORT || 4000;
app.listen(port,() => {
    console.log('Web server listening on port '+port);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

//authentication
app.use("/auth",Signup);
app.use("/auth",VerifyEmail);