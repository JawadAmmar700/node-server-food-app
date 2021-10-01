const express = require("express")
const app = express()
const nodemailer = require("nodemailer")
require("dotenv").config()
const cors = require("cors")

// create cors middleware
const corsOptions = {
  // origin: process.env.HOST,
  origin: "*",
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Content-Length",
    "X-Requested-With",
    "Accept",
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
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

  // verify connection configuration

  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Sending Email using Node.js",
    text: `${email} has just subscribed`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
  res.json({ success: "Thanks for the subscribe" })
})

app.listen(5000, () => console.log("server is running on port 5000"))
