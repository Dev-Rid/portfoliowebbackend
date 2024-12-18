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
    port: 587,
    secure: "false",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    logger: true,
    debug: true,
})



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