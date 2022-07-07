const express = require("express");
const cors = require("cors");
const Axios = require("axios");
var request = require("request");
require("dotenv").config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language === "python") {
    language = "py";
  }

  let data = {
    code: code,
    language: language,
    input: input,
  };
  let config = {
    method: "post",
    url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  //calling the code compilation API
  Axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.post("/runner", (req, res) => {
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;
  console.log(language);
  let clientId = process.env.API_CLIENTID;
  let clientSecret = process.env.API_CLIENTSECRET;
  var program = {
    script: req.body.code,
    language: req.body.language,
    stdin: req.body.input,
    versionIndex: "4",
    clientId,
    clientSecret,
  };
  request(
    {
      url: process.env.API_URI,
      method: "POST",
      json: program,
    },
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      return res.status(201).send(body);
    }
  );
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
