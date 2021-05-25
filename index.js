const fs = require("fs").promises;
const express = require("express");
const bodyParser = require("body-parser");

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  PORT,
} = require("./src/common/defs");

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

app.listen(PORT, () => {
  console.log("Online in | http://localhost:3000/");
});
