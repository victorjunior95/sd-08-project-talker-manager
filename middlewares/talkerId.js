const readTalker = require('../services/readTalker');

module.exports = async (req, res) => {
    const reqId = req.params.id;
    const read = await readTalker();
    // console.log(read);
    const talk = read.find(({ id }) => id === Number(reqId));
    // console.log(talk);

    if (talk) {
       return res.status(200).json(talk);
    }

    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};
