const express = require("express")
const nodemailer =  require("nodemailer") //Send emails from Node.js – easy as cake! 🍰✉️ 
const bodyParser = require("body-parser") // Node.js body parsing middleware.
const cors = require("cors")
require("dotenv").config()

// console.log(process.env.EMAIL_USER)

// express app
const app = express()


// for deployment purpose
// Serve frontend build
app.use(express.static("myportfolioweb/build"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "myportfolioweb/build", "build", "index.html" ))
})


// middleware 
app.use(cors())
app.use(bodyParser.json()) //parse JSON data



// nodemailer configuration
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // logger: true,
    // debug: true,
})

//kfop tity afep aqmc
// ozck yaag inve ywvd

// Email Endpoint
app.post("/send-email", (req, res)=>{
    const {name, email, message } = req.body

    const mailOptions = {
        from: "email",
        to: "ridwanabiola2000@gmail.com",
        subject: `New Hire Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
   }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log("Error sending email", error)
            return res.status(500).send({ messaage: "Error sending email!"})
        } else{
            console.log("email sent", info.response)
            console.log("Email sent successfully:", info.response);
            res.status(200).json({ messsage: "Email sent successfully!"})
        }
    }) 

})




const port = 4000
app.listen(port, "localhost", () =>{
    console.log(`server listening to port + ${port}`);
    
})









































// const express = require("express");
// const nodemailer = require("nodemailer"); // Send emails from Node.js
// const bodyParser = require("body-parser"); // Node.js body parsing middleware
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// // express app
// const app = express();

// // Serve frontend build for deployment
// app.use(express.static("myportfolioweb/build"));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "myportfolioweb/build", "index.html"));
// });

// // Middleware
// app.use(cors());
// app.use(bodyParser.json()); // Parse JSON data

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587, // Use 587 for TLS
//     secure: false, // Use TLS
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// // Email Endpoint
// app.post("/send-email", (req, res) => {
//     const { name, email, message } = req.body;

//     const mailOptions = {
//         from: process.env.EMAIL_USER, // Use the sender email from env variable
//         to: "ridwanabiola2000@gmail.com", // Replace with your destination email
//         subject: `New Hire Request from ${name}`,
//         text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error("Error sending email", error);
//             return res.status(500).json({ message: "Error sending email!", error: error.message });
//         } else {
//             console.log("Email sent successfully:", info.response);
//             res.status(200).json({ message: "Email sent successfully!" });
//         }
//     });
// });

// const port = 4000;
// app.listen(port, "localhost", () => {
//     console.log(`Server listening on port ${port}`);
// });
