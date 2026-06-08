// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const jsforce = require("jsforce");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend Running");
// });


// app.get("/auth/login", (req, res) => {

//   const url =
//     `${process.env.LOGIN_URL}/services/oauth2/authorize` +
//     `?response_type=code` +
//     `&client_id=${process.env.CLIENT_ID}` +
//     `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

//   console.log("OAuth URL:");
//   console.log(url);

//   res.redirect(url);
// });

// app.get("/callback", async (req, res) => {

//   const code = req.query.code;

//   const conn = new jsforce.Connection({
//     oauth2: {
//       loginUrl: process.env.LOGIN_URL,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       redirectUri: process.env.REDIRECT_URI
//     }
//   });

//   try {

//     await conn.authorize(code);

//     res.send({
//       success: true,
//       accessToken: conn.accessToken,
//       instanceUrl: conn.instanceUrl
//     });

//   } catch (err) {

//     console.error(err);

//     res.status(500).send(err);
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log("Server Started");
// });