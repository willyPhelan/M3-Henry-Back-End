const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(300).json(['Franco', 'Toni', 'Martu']);
});

app.post('/bodyData', (req, res) => {
  const { arg1, arg2 } = req.body;
  if(!arg1 || !arg2) return res.sendStatus(400);
  res.send('OK');
});

app.get('/queryDataSend', (req, res) => {
  const { q } = req.query;
  if(!q) return res.sendStatus(400);
  res.send(q);
});

app.get('/queryDataJson', (req, res) => {
  const { q } = req.query;
  if(!q) return res.sendStatus(400);
  res.json(q);
});

app.get('/paramsData/:id', (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  if(isNaN(numberId)) return res.sendStatus(400);
  res.json({
    id: numberId,
    msg: 'OK'
  });
});

app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/Logo.jpg');
});

module.exports = app;