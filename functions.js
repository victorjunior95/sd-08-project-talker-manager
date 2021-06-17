const fs = require('fs');

const readFile = () => {
  try {
    const talkersArr = fs.readFileSync('./talker.json', 'utf8');
    const jsonTalkersArr = JSON.parse(talkersArr);
    return jsonTalkersArr;
  } catch (err) {
    return err;
  }
};

function validateEmail(emailAdress) {
  const regexEmail = /\S+@\S+\.\S+/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } 
    return false;
}

const generateToken = (length) => {
    let result = '';
     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     const charactersLength = characters.length;
     for (let index = 0; index < length; index += 1) {
       result += characters.charAt(Math.floor(Math.random() 
    * charactersLength));
    }
    return result;
 };

module.exports = {
  readFile,
  validateEmail,
  generateToken,
};
