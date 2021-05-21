function randomCharacter(length) {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result.push(characters.charAt(Math.floor(Math.random() 
 * charactersLength)));
   }
   return result.join('');
}

module.exports = randomCharacter;
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript