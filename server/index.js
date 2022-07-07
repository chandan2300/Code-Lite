const express = require("express");
const cors = require("cors");
const Axios = require("axios");
var request = require("request");
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
  let clientId = "26cae8ed2e266343a40195392c1c97d1";
  let clientSecret =
    "2ad3fb72e46263c0bf052de7b7f13851b1ffa3b464f758fccadb93e7d3d8f79f";
  var program = {
    script: req.body.code,
    language: req.body.language,
    stdin: req.body.input,
    versionIndex: "4",
    clientId,
    clientSecret,
  };
  // let config = {
  //   method: "post",
  //   url: "https://api.jdoodle.com/v1/execute",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: program,
  // };
  // //calling the code compilation API
  // Axios(config)
  //   .then((response) => {
  //     res.send(response.data);
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
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
