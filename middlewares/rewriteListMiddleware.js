const fs = require('fs');

const rewriteList = (listString) => {
  fs.writeFile('talker.json', listString, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = rewriteList;