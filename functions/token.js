function generatePass() {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEEFGIJKLMNOPQRSTUVWXYZ123456789_*@-';
    let pass = '';

    for (let i = 0; i < 16; i += 1) {
      pass += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return {
      token: pass,
    };
  }

module.exports = generatePass;
