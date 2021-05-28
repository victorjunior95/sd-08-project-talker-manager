const fs = require('fs');

const searchTalker = (request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json'));
  const query = request.query.q || data;
  
  try {
    if (!query) return response.status(200).send(data);
    const qTalker = data.filter((talker) => talker.name.includes(query));
    response.status(200).send(qTalker);  
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = searchTalker;
