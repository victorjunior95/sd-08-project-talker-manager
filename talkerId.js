// const express = require('express');

const getTalkerJson = require('./fs-talkers');

module.exports = async (req, res) => {
  const content = await getTalkerJson();
  const { id } = req.params;
  const talker = content.find((p) => p.id === +id);
  if (!talker) {
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  } res.status(200).json(talker);
};
