const express = require("express")
const app = express()
const nodemailer = require("nodemailer")
require("dotenv").config()
const cors = require("cors")

// create cors middleware
const corsOptions = {
  origin: process.env.HOST,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

app.get("/", (req, res) => {
  res.send("running")
})

app.post("/", async (req, res) => {
  const email = req.body.form_email
  console.log("jjjjjj")

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log("Server is ready to take our messages")
        resolve(success)
      }
    })
  })

  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Sending Email using Node.js",
    text: `${email} has just subscribed`,
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
        res.json({ success: "Thanks for the subscribe" })
      }
    })
  })
})

app.listen(5000, () => console.log("server is running on port 5000"))
