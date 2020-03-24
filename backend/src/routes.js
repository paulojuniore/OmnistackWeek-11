const express = require('express');

const routes = express.Router();

routes.post('/users', (req, res) => {
  const param = req.body;
  console.log(param);
  return res.json({
    "evento": "Semana Omnistack 11",
    "aluno": "Paulo"
  })
});

module.exports = routes;