const fs = require("fs").promises;
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const {
  emailValidation,
  passwordValidation,
  isObject,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
} = require("./src/core/validation");

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_CREATED_STATUS,
  PORT,
} = require("./src/common/httpStatus");

const file = "./talker.json";

const app = express();
app.use(bodyParser.json());

app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send("Hello World!");
});

app.get("/talker", async (_request, response) => {
  const mockData = await fs.readFile(file);
  if (!mockData) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(JSON.parse(mockData));
});

app.get("/talker/:id", async (_request, response) => {
  const mockData = await fs.readFile(file);
  const { id } = _request.params;
  const talker = JSON.parse(mockData).find(
    (talker) => talker.id === parseInt(id)
  );
  if (!talker) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      message: "Pessoa palestrante não encontrada",
    });
  }
  return response.status(HTTP_OK_STATUS).send(talker);
});

app.post("/login", ({ body }, response) => {
  const { email, password } = body;
  const token = crypto.randomBytes(16).toString("hex");
  if (isObject(emailValidation(email))) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send(emailValidation(email));
  }
  if (isObject(passwordValidation(password))) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send(passwordValidation(password));
  }
  return response.status(HTTP_OK_STATUS).send({ token: `${token}` });
});

app.post(
  "/talker",
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async ({ body }, response) => {
    const mockData = await fs.readFile(file);
    const talkersOnDataBase = JSON.parse(mockData);
    const { name, age, talk } = body;

    const newTalkerPeople = {
      name,
      age,
      id: talkersOnDataBase.length + 1,
      talk: { watchedAt: talk.watchedAt, rate: talk.rate },
    };

    talkersOnDataBase.push(newTalkerPeople);
    const databaseUpdateTalkers = JSON.parse(talkersOnDataBase);
    await fs.writeFile("talker.json", databaseUpdateTalkers);
    return response.status(HTTP_CREATED_STATUS).json(newTalkerPeople);
  }
);

app.listen(PORT, () => {
  console.log("Online in | http://localhost:3000/");
});
