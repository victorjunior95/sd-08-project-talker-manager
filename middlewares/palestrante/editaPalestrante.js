// TODO terminar req 05

// const fs = require('fs');

// const editaPalestrante = async (request, response, _next) => {
//   const { id } = request.params;
//   const palestrantes = await JSON.parse(fs.readFile('./talker.json'));

//   palestrantes.findIndex((talker) => talker.id === Number(id));

//   await fs.writeFile('./talker.json', JSON.stringify(palestrantes));

//   response.status(200).json();
// };

// module.exports = editaPalestrante;
