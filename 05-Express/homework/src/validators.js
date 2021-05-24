const validateId = (req, res, err) => {
  if (!req.body.hasOwnProperty("id")) {
    res.status(err).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  }
};

const validateTitle = (req, res, err) => {
  console.log(`err ${err}`);
  if (!req.body.hasOwnProperty("title")) {
    res.status(err).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  }
};

const validateContents = (req, res, err) => {
  if (!req.body.hasOwnProperty("contents")) {
    res.status(err).send({
      error: "No se recibieron los parámetros necesarios para crear el POST",
    });
  }
};

const existId = (req, res, err, posts) => {
  let idExist = false;
  for (let i in posts) {
    //identifico si no está el id que busco
    if (posts[i]["id"] === req.body.id) {
      idExist = true;
    }
  }
  if (!idExist) {
    res
      .status(err)
      .send({ error: "El `id` indicado no corresponde con un Post existente" });
  }
};

module.exports = {
  validateId,
  validateTitle,
  validateContents,
  existId,
};
