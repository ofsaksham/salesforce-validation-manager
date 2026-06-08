require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jsforce = require("jsforce");

const app = express();

app.use(cors());
app.use(express.json());

let sfConn = null;

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/auth/login", (req, res) => {
  const url =
    `${process.env.LOGIN_URL}/services/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const conn = new jsforce.Connection({
    oauth2: {
      loginUrl: process.env.LOGIN_URL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    },
  });

  try {
    await conn.authorize(code);

    sfConn = conn;

    const userInfo = await conn.identity();

    const userEmail = userInfo.email;
    const username = userInfo.username;


    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Salesforce Login Success</title>

    <style>
    body{
      margin:0;
      font-family:Arial,sans-serif;
      background:#f4f7fb;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
    }

    .card{
      background:white;
      padding:40px;
      width:500px;
      border-radius:16px;
      box-shadow:0 8px 25px rgba(0,0,0,0.15);
      text-align:center;
    }

    .success{
      color:#28a745;
      font-size:28px;
      font-weight:bold;
      margin-bottom:20px;
    }

    .info{
      margin:12px 0;
      font-size:18px;
    }

    .btn{
      display:inline-block;
      margin-top:25px;
      padding:12px 25px;
      background:#0176d3;
      color:white;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
    }

    .btn:hover{
      background:#005fb2;
    }
    </style>
    </head>

    <body>

    <div class="card">

    <div class="success">
    ☁️ Salesforce Login Successful
    </div>

    <div class="info">
    <b>Username:</b><br>
    ${username}
    </div>

    <div class="info">
    <b>Email:</b><br>
    ${userEmail}
    </div>

    <a class="btn" href="http://localhost:3000">
    Go To Validation Manager
    </a>

    <p style="margin-top:20px;color:#666;">
    Redirecting to Validation Manager in 3 seconds...
    </p>

    </div>

    <script>
    setTimeout(() => {
      window.location.href = "http://localhost:3000";
    }, 3000);
    </script>

    </body>
    </html>


    `);

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/validation-rules", async (req, res) => {
  try {
    if (!sfConn) {
      return res.status(401).json({
        message: "Please login to Salesforce first",
      });
    }

    const result = await sfConn.tooling.query(
      `SELECT Id, ValidationName, Active
       FROM ValidationRule`
    );

    res.json(result.records);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.post("/toggle-rule", async (req, res) => {
  try {
    if (!sfConn) {
      return res.status(401).send("Please login first");
    }

    const { ruleName, active } = req.body;

    const metadata = await sfConn.metadata.read(
      "ValidationRule",
      `Account.${ruleName}`
    );

    metadata.active = active;

    const result = await sfConn.metadata.update(
      "ValidationRule",
      metadata
    );

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});

