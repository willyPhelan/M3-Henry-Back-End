// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
// server.use(bodyParser.json());
server.use(express.json());

// TODO: your code to handle requests

server.post("/posts", (req, res) => {
  //verifico si no existe la propiedad "title"
  if (!req.body.hasOwnProperty("title")) {
    res.status(STATUS_USER_ERROR).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  } else if (!req.body.hasOwnProperty("contents")) {
    res.status(STATUS_USER_ERROR).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  }

  //para asignar un id a cada post, mido el tamaño del array y sumo 1 para no empezar en 0
  let id = posts.length + 1;
  let post = {
    id,
    title: req.body.title,
    contents: req.body.contents,
  };

  posts.push(post);
  res.send(post);
});

server.get("/posts", (req, res) => {
  //verifico si la query tiene "term"
  if (req.query.term) {
    //////Intenté con un for pero al siempre retornar algo, tenía undefined cuando no encontraba el term
    // let results = posts.map((p) => {
    //   //map retorna un nuevo array
    //   if (
    //     p["title"].includes(req.query.term) ||
    //     p["contents"].includes(req.query.term)
    //   ) {
    //     return p;
    //   }
    // });

    let results = [];
    //verifico si el "term" está en la propiedad title o contents
    for (let i in posts) {
      if (
        posts[i]["title"].includes(req.query.term) ||
        posts[i]["contents"].includes(req.query.term)
      ) {
        //si se encuentra en la propiedad, ingreso el post al array resultado
        results.push(posts[i]);
      }
    }
    res.send(results);
  }

  //si no tiene "term" mando todos los posts
  res.send(posts);
});

server.put("/posts", (req, res) => {
  //verifico si no existe la propiedad "id"
  if (!req.body.hasOwnProperty("id")) {
    res.status(STATUS_USER_ERROR).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  } else if (!req.body.hasOwnProperty("title")) {
    res.status(STATUS_USER_ERROR).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  } else if (!req.body.hasOwnProperty("contents")) {
    res.status(STATUS_USER_ERROR).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  }

  let idExist = false;
  for (let i in posts) {
    //identifico si no está el id que busco
    if (posts[i]["id"] === req.body.id) {
      idExist = true;
    }
  }
  if (!idExist) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: "El `id` indicado no corresponde con un Post existente" });
  }

  //actualizo el post
  for (let i in posts) {
    if (posts[i]["id"] === req.body.id) {
      posts[i]["title"] = req.body.title;
      posts[i]["contents"] = req.body.contents;
      res.send(posts[i]);
    }
  }
});

server.delete("/posts", (req, res) => {
  //verifico si no existe la propiedad "id"
  if (!req.body.hasOwnProperty("id")) {
    res.status(STATUS_USER_ERROR).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  }

  let idExist = false;
  for (let i in posts) {
    //identifico si no está el id que busco
    if (posts[i]["id"] === req.body.id) {
      idExist = true;
    }
  }
  if (!idExist) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: "El `id` indicado no corresponde con un Post existente" });
  }

  //Elimino el post
  posts.splice(req.query.id, 1);
  res.send({ success: true });
});

module.exports = { posts, server };
