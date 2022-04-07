![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

<table class="hide" width="100%" style='table-layout:fixed;'>
  <tr>
   <td>
    <a href="https://airtable.com/shrBpWkYV4K12PPNZ?prefill_clase=05-Express">
   <img src="https://static.thenounproject.com/png/204643-200.png" width="100"/>
   <br>
   Hacé click acá para dejar tu feedback sobre esta clase.
    </a>
   </td>
              <td>
      <a href="https://quiz.soyhenry.com/evaluation/new/606f7234656c8d23c2e60f8b">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/HSQuiz.svg/768px-HSQuiz.svg.png" width="100" height="100"/>
        <br>
        Hacé click acá completar el quiz teórico de esta lecture.
      </a>
   </td>
  </tr>
</table>

# Express

_Express.js_ o simplemente _Express_ es un framework diseñado para crear aplicaciones web y APIS. Está bajo la licencia [MIT](https://en.wikipedia.org/wiki/MIT_License), y es, tal vez, el framework web más usado en el ecosistema de Nodejs.

## Instalación

Vamos a iniciar una app nueva con `npm init` a la que vamos a llamar _expresstest_ y luego vamos a instalar express usando `npm`:

```bash
npm install express
```

Ahora vamos a crear un archivo `index.js` _( o con el nombre que hayan definido como entry point)_ y vamos a requerir 'express'.

```javascript
var express = require("express");
```

Cuando requerimos express, lo que nos devuelve la librería es una función, que envuelve toda la funcionalidad de express. Por eso, para inicializar una nueva applicación, vamos a crear una variable (comúnmente llamada `app`) y guardar en ella la ejecución de express.

```javascript
var express = require("express");
var app = express();
```

Dentro de nuestra nueva variable app, vamos a tener varias funciones. Una de ella es `listen()`, que tiene envuelto adentro a la función `http.createServer()` que habíamos usado para crear nuestro propio webserver. Ahora en vez de llamar esa función directamente llamamos a `listen()` y le pasamos un puerto.

```javascript
app.listen(3000);
```

Noten, que todo lo que hace express, lo pueden hacer ustedes también escribiendo el código, sólo es un montón de código preescrito que resuelve problemas muy comunes de una manera muy buena, justamente por eso es que es tan popular.

## Creando rutas

Ahora la variable `app` tiene asociado varios métodos que mapean a [métodos HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), también llamados 'verbos Http'. Con esto especificamos qué queremos que haga el servidor según el tipo de método http del request y la URL.

Agreguemos una ruta para `'/'` con el método GET. (_El método GET es el que hace el broswer por defecto cuando escribimos algo en la barra de direcciones_):

```javascript
app.get("/", function (req, res) {
  //Ruta para un GET a /
});
```

Como vemos, esto reemplaza la serie de `if`s que habiamos escrito para nuestro webserver antes. Además nos agrega la discriminación del método HTTP. Estos métodos reciben como parámetro un callback, el cual correran cuando llegue un request de este tipo al URL definido ( `/` en nuestro ejemplo). Noten que ese callback tiene siempre como parámetro dos variables, `req` por **request** y `res` por **response**, que envuelven los objetos `http.request` y `http.response` respectivamente, agregándole más funcionalidad.

```javascript
app.get("/", function (req, res) {
  res.send("Hola");
});
```

Como ejemplo, vamos a usar `res.send()` para enviar texto como respuesta. No fué necesario explicitar el `Content-type`, ya que _express_ se encarga de eso por nosotros tambien!

![Express-Example](/_src/assets/05-Express/expressexample.png)

Podemos ejecutar el server con `nodemon` y probar la URL `'/'` en el browser.

Agreguemos una nueva ruta `/api` y retornemos un objeto JSON. Para esto, express viene preparado con la función `json()` que recibe un objeto y lo pasa como response. Noten que no tuvimos que _Serializar_ el objeto! De esta forma _express_ nos ahorra mucho tiempo.

```javascript
app.get("/api", function (req, res) {
  var obj = {
    nombre: "prueba",
    framework: "express",
    ventaja: "serializó por nosotros",
  };
  res.json(obj);
});
```

Probemos el nuevo _endpoint_ en el browser:

![Express-Api](/_src/assets/05-Express/expressapi.png)

Veamos que más podemos hacer con _express_!

## Routing

Express nos ofrece muchísimas soluciones para varios problemas, es por eso que vamos a tener que aprender a leer y buscar en la documentación (que por cierto es muy buena) de _express_.

Veamos la documentación sobre [routing](https://expressjs.com/en/guide/routing.html).

Como vemos, hay varias formas de hacer las rutas usando las URL: Podemos hacerlo con un nombre fijo como veniamos haciendo o de hecho también podemos usar `strings patterns` y `regular expressions` tal que matcheen múltiples rutas, por ejemplo:

### Basadas en String Patterns

Esta ruta matcheará _acd_ y _abcd_:

```javascript
app.get("/ab?cd", function (req, res) {
  res.send("ab?cd");
});
```

Esta ruta matcheará _abcd_, _abbcd_, _abbbcd_, y así sucesivamente:

```javascript
app.get("/ab*cd", function (req, res) {
  res.send("ab*cd");
});
```

### Pasando parámetros en las rutas

Veamos como nos ayuda _express_ a capturar parámetros embebidos en la URL.

Veamos el siguiente ejemplo:

```javascript
app.get("/api/:id", function (req, res) {
  res.json({ parametro: req.params.id });
});
```

A la ruta `/api` le hemos agregado `/:id`, ahora _express_ va a parsear esa ruta, y va a tomar como parámetro lo que esté después de la primera `/` y lo vamos a poder acceder a través del nombre `id`. Por ejemplo en `/api/2` id va a tomar el valor `2`. En `/api/hola`, id va a tomar el valor `hola`.

Para mostrar el comportamiento, esa ruta a va a devolver un objeto json con la propiedad `parametro` y cuyo valor es el contenido de `id`. Los parámetros parseados por express los vamos a encontrar en `req.params` y el nombre que pusimos después de `:` en la ruta, en este caso `req.params.id`.

Probando en el browser:

![Params-gif](/_src/assets/05-Express/params.gif)

:D

Podemos agregar más de un parámtro por URL.
Prueben armar una ruta que maneje la siguiente URL: _/api/:id/:nombre/:valor_.

### Archivos Estáticos y Middleware

**Middleware**: hace referencia a código que existe entre dos capas de software, en el caso de _express_ a código que este entre el `request` y el `response`.

![Express-Middleware](/_src/assets/05-Express/life.png)

Veamos un ejemplo muy común de middlware en _express_. En casi todas las aplicaciones web vamos a tener archivos que queremos que se bajen siempre, por ejemplo: imágenes, archivos `.css` o `.js`, etc. Como sabemos, para poder acceder a estos archivos vamos a tener que crear para cada archivo una ruta tal que sean accesibles a través de una URL. Esto puede llegar a complicarse fácilmente, no?
Por suerte, _express_ ya pensó en esto y nos da un middleware para manejar estos _static files_ (se llaman estáticos porque no dependen de ningún input y no deben ser procesados de ninguna manera,siempre son iguales).

Digamos que queremos tener una carpeta donde guardamos todos los _archivo estáticos_, comúnmente esta carpeta tiene el nombre de `public`. Dentro de ella vamos a crear un archivo `.css` y guardar ahí una imagen.

\_\_Vamos a crear una ruta que devuelva un html que utilize el archivo `.css` que acabamos de crear y también que contenga la imagen.

```javascript
app.get("/static", function (req, res) {
  res.send(
    '<html><head> \
      <link href="/assets/style.css" rel="stylesheet"> \
      </head><body> \
      <p>Archivos estaticos rapido y facil!!</p>\
      <img src="/assets/imagen.jpg">\
      </body></html>'
  );
});
```

En el ejemplo requerimos los archivos estáticos en `/assets/`. Ahora para mapear todos los archivos que estén en esa carpeta a una ruta dentro de `/assets` (por ejemplo: `/assets/image.jpg`) de forma automática, vamos a usar el middleware `express.static` que viene por defecto con _express_.

Para agregarlo, vamos a usar la funcion `use()`, que le indica a _express_ para que use el middleware que le pasamos en el segundo parámetro, en las URL que le pasamos en el primero. Así que con lo siguiente le estamos diciendo que mapee las rutas de `/assets/` con el middelare _static_.

```javascript
app.use("/assets/", express.static(__dirname + "/public"));
```

El único parámetro que recibe _static_ es el nombre del directorio donde están los archivos estáticos, en nuestro ejemplo están en `/public`.

Ahora probemos la nueva ruta `/static/` y probemos si carga los archivos estáticos:

![pagina-static](/_src/assets/05-Express/expresstatic.png)

Como vemos la imagen, y vemos el párrafo de color rojo, sabemos que se cargaron correctamente los archivos estáticos!

Si accedemos a cada uno individualmente:

![pagina-static](/_src/assets/05-Express/static.gif)

Vemos que cada uno tiene su propia ruta dentro de `/assets/` y que fue mapeada automáticamente por _express.static_ a cada archivo dentro de la carpeta `public`. Muy potente, no? Such express!

## Nuestro propio Middleware con app.use()

Vimos que los middlewares pueden ser muy potentes. Pero como hacemos para crear uno propio?

_Express_ nos facilita esta tarea, ya que el callback pasamos en `app.use` tiene tres parámetros: los que ya conociamos `req` y `res` y uno nuevo, `next`. Lo que esto quiere decir es que cuando el request vaya a la ruta que especificamos en el primer argumento, en este caso `'/'`, _express_ va a ejecutar el callback, cuando encuentre la función `next()` le estamos indicando que corra el siguiente middleware, podemos pensar que todos los `app.get` que veniamos programando también son middleware, por lo tanto son esas funciones las que se ejecutaran luego.

```javascript
app.use("/", function (req, res, next) {
  console.log("Hicieron un Request a " + req.url);
  next();
});
middle;
```

Por lo tanto al hacer un request al servidor, primero se pasará por ese middleware (veremos el console log en la terminal) y luego se creará el response según lo que habiamos definido para esa ruta:

![middleware](/_src/assets/05-Express/middleware.gif)

Como se podrán imaginar, esta forma de trabajar de _express_ hace que sea super potente. Además hay muchísimos middlewares ya creados por otros desarrolladores que podremos usar. ¿Donde buscarlos? Sí, en npm! También pueden empezar por esta [lista de middleware creados por el equipo de _express_](http://expressjs.com/resources/middleware.html).

## Enviado datos al servidor

Por ahora nos habiamos concentado sólo en obtener contenido de nuestra app usando requests tipo **GET**, sin mandar datos nosotros (de hecho el único dato que enviamos fue como un parámetro en la URL).
Ahora veremos que hay distintas formas de enviar datos al servidor.

### Query String

Una forma de enviar datos es hacerlo en la URL a la que apuntamos el request. Para ello nos valemos de una serie de parámetros o datos que se incluyen en la URL. Normalmente distinguimos en la URL por un nombre y un valor separados por el signo igual, y se separan del endpoint por el caracter `?`, y entre cada variable por el signo `&`. Por ejemplo:

`www.com/index?nombredevalor1=valor1&nombredevalor2=valor2`

o

![query_string](/_src/assets/05-Express/queryString.png)

### POST y Forms

Otras formas de enviar datos al servidor es a través de Formularios. Ahora usaremos otro verbo HTTP, el **POST**.

![query_string](/_src/assets/05-Express/postform.png)

En este caso, los datos iran dentro del `body` del request, y lo que nos indica que es datos de un formulario es el `content-type` que estará seteado a `x-www-form-urlencoded'.

### POST y Ajax

También podemos enviar datos al servidor en formato JSON, donde también usamos POST, pero el `content-type` es ahora `application/json`. Por ejemplo en un request generado por AJAX. En este caso los datos también estarán en el `body` del request.

![ajax-post](/_src/assets/05-Express/postajax.png)

En fin, como vemos vamos a necesitar middleware para lograr procesar cada una de estas formar de recibir datos (pensando desde el lado del servidor).

## Tomando los Datos

De las anteriores, la forma más simple es tomar los parámetros enviados por el query string. Esto lo hacemos usando en nuestra ruta el objeto `req.query`. _Express_ busca y parsea el query string por si sólo y guarda los resultados en ese objeto. Veamos un ejemplo:

```javascript
app.get("/datos/", function (req, res) {
  res.json(req.query);
});
```

Corramos el servidor y probemos nuestra nueva ruta:

![query-string](/_src/assets/05-Express/queryString.gif)

Como vemos, _Express_ toma las variables del query string y al parsearla las guarda en un objeto cuyas propiedades son el nombre de esas variables junto con sus respectivos valores.

### Forms

Ahora, si queremos tomar datos que vienen de un formulario vamos a tener que usar un middleware, porque no es algo que _express_ haga _out of the box_.

Podríamos escribir el código nosotros mismos, pero ya alguien lo hizo por nosotros! El paquete que antes usábamos era `body-parser`. Hay muchos otros paquetes que hacen lo mismo, pero este era el más común para usar con _Express_. Puedes ver su documentación [aquí](https://github.com/expressjs/body-parser)
Pero ahora usamos `express.json()`, el cuál es un método ya incluído en express desde la versión 4.16.0.

Vamos a encontrar la documentación sobre como usarlo [aquí](https://expressjs.com/es/api.html).
También vamos a necesitar crear un formulario en html. Haremos que un GET en `/form` devuelva un formulario HTML simple. También creamos una nueva ruta, que reciba un POST en la misma URL.

```javascript
app.get("/form", function (req, res) {
  res.send(
    '<html><head> \
   <link href="/assets/style.css" rel="stylesheet"> \
   </head><body>\
    <form method="POST" action="/form">\
    Nombre <input name="nombre" type="text"><br>\
    Apellido <input name="apellido" type="text"><br>\
    Curso <input name="curso" type="text"><br>\
    <input type="submit">\
    </form>\
   </body></html>'
  );
});

app.use(express.urlencoded({ extended: false }));
app.post("/form", function (req, res) {
  res.json(req.body);
});
```

Le decimos a app que use el middelware `express.ulrencoded`.
Ahora vamos a ir a `/form` y vamos a probar submitear el formulario. Cuando hacemos el submit, el browser genera un request tipo POST, ese request será _capturado_ en la nueva ruta `.post()` que definimos y luego enviará como response el objeto `req.body`, que es donde `express.son()` guarda los datos procesados.

Vamos a probarlo:

![form-data](/_src/assets/05-Express/form.gif)

Excelente! con la ayuda del método `express.json()` que tiene express vamos a poder trabajar con las variables que recibiamos de un formulario.

### Ajax

Ok, ahora vemos el tercer escenario, en donde el cliente genera un request tipo POST que contenga datos en formato JSON.

En el escenario anterior le dijimos a app que use el método `express.urlconded` y ahora vamos a decirle que use el método `express.json`

```javascript
app.use(express.json());
app.post("/formjson", function (req, res) {
  res.json(req.body);
});
```

Ahora, para poder probar este _endpoint_ y enviar datos, vamos a usar una herramienta muy útil: [**POSTMAN**](https://www.getpostman.com/), que es una app (viene como extensión de Chrome y una app para Mac) que nos permite generar todo tipos de request HTTP, y nos va a ser de gran ayuda para probar nuestros endpoint y APIs.

_También probá usando un request generado desde una página con AJAX_

### POSTMAN

Veamos como usarlo para generar un post apuntado a `/formjson` y que envie data en formato JSON.

![Postman](/_src/assets/05-Express/postman.png)

Como vemos en la imagen, la interfaz es bastante intuitiva, a la izquierda seleccionamos qué tipo de http request queremos hacer (en el ejemplo hicimos un GET). Especificamos la URL ('/form') en este caso, y al apretar el botón SEND se genera el request.
Abajo podremos ver el resultado del mismo. En este caso, el servidor nos devolvió el html del formulario que habiamos creado en ese endpoint. Estos son los datos que recibe el browser cuando escribimos la URL en la barra de direcciones, pero el broswer al recibir los datos los parsea y los dibujo automáticamente, por eso vemos el formulario directamente.

Ahora, queremos probar hacer un **POST** a `/formjson`, por lo tanto vamos a cambiar la URL en postman y el tipo de request. Si probamos veremos el siguiente resultado: `{}`.

![Postman](/_src/assets/05-Express/postmanform.png)

Lo primero que queremos saber es si el request fué procesado con éxito, sabemos que sí porque el `status` que trajo el response es el número `200`, que significa **'Todo ok'** en el standart HTTP. También sabemos que ese endpoint nos debería devolver un JSON con los datos que hayamos enviado en el POST, como no había datos en el request, era esperable que recibamos un objeto vacío. Por lo tanto, hasta acá venimos bien.
Intentemos agregar datos al **POST** a ver que pasa:

![Postman](/_src/assets/05-Express/postman.gif)

Como vemos en la imagen de arriba, para agregar datos al post tenemos que ir a la pestaña `Body`, y allí seleccionar `raw`, y como tipo de datos usar `application/json`.
Luego completamos dentro del cuadro de texto con el objeto en formato JSON que queremos enviar (tengan cuidado con el formato, de hecho las dobles comillas con obligatorias para los nombres).
Luego de cargar los datos, hacemos click en **Send** y abajo vemos la respuesta, qué como habiamos dicho, tiene que ser el mismo objeto que hemos enviado. Todo funciona sin problemas!

_Con POSTMAN podemos emular varios request, de hecho podríamos haber emulado el formulario con esto. Intenten hacerlo ustedes: en `Body` pueden empezar seleccionando 'x-www-form-urlencoded'. ¿Cúal es la diferencia con 'form-data'?_

## Estructurando nuestra App

Al hacer una app compleja, en donde van a existir muchos endpoints, se puede poner muy engorroso mantener todo en un mismo archivo. Por eso, vamos algunos patrones para mantener la aplicación lo más ordenada posible.

**Esto también es muy personal, cada uno puede estructurar su aplicación de la forma que le resulte más fácil de mantener y entender. _Cuando trabajen en equipo tienen que estar de acuerdo en esto!!_**

_Express_ tiene un generador de projectos (parecido al `npm init` pero más potente) llamado `express-generator`. Podemos ver su documentación [aquí](http://expressjs.com/en/starter/generator.html). Vamos a instalarlo y crear un proyecto usándolo.

`npm install express-generator -g`
`express myapp -e`

Para este ejemplo he creado una app con el nombre 'myapp' y le indiqué que el template engine a usar será `EJS`.
Veamos todos los archivos que _express-generator_ creó por nosotros:

```bash
create : myapp
create : myapp/package.json
create : myapp/app.js
create : myapp/views
create : myapp/views/index.ejs
create : myapp/views/error.ejs
create : myapp/public
create : myapp/routes
create : myapp/routes/index.js
create : myapp/routes/users.js
create : myapp/bin
create : myapp/bin/www
create : myapp/public/javascripts
create : myapp/public/stylesheets
create : myapp/public/stylesheets/style.css
```

Como vemos, se creó un `package.json` donde están listadas las dependencias de nuestro proyecto, por lo tanto lo primero que deberíamos hacer es entrar a la carpeta del proyecto y hacer un `npm install`.

Ahora veamos un el archivo `app.js`. En ese archivo el generador incluyó a la app varios middleware de uso muy común (entre ellos están `express.json` y `express.static`).

```javascript
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
```

Nos podemos imaginar que la carpeta `/public` es donde estará todo nuestro ḿaterial estático (images, .css, .js, etc..). En la carpeta `/views` estarán los templates del projecto. Y también vemos una tercera carpeta de recursos que es la carpeta `/routes`, en ella guardaremos las rutas de cada endpoint de nuestra aplicación.
Si investigamos un archivo autogenerados que están dentro de esa carpeta, por ejemplo `/routes/index.js` veremos que está pensado para se importado ya que tiene el `module.exports` al final.

```javascript
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
```

De hecho, si volvemos a mirar `app.js` vemos que importa como módulos a los archivos dentro de `/routes`.

```javascript
var routes = require("./routes/index");
var users = require("./routes/users");
```

Un concepto nuevo que no habiamos visto, es la función `express.Router()`, que es un middleware de _express_ para facilitarnos el uso de rutas. En vez de poner las rutas directamente en la `app` vamos a cargarlas de la misma forma pero en el `router`, luego exportamos el objeto `router` en cada archivo y dentro de `app.js` vamos requerirlo y cargalos en nuestra app:

```javascript
app.use("/", routes);
app.use("/users", users);
```

Hay que notar que cuando usamos `app.use` y le pasamos un `Router` también le pasamos un path, esto quiere decir que las rutas definidas dentro del `Router` que les pasamos serán accesibles desde el path origin que le pasamos. Por ejemplo:

Como en el archivo `routes/users.js` tenemos una ruta para el URL `/`, al cargarlo usando `app.use()` en `/users`, ese path será accesible en el path `/users/`. Para que se entienda mejor, creé una nueva ruta dentro de `users.js` con la URL `/api`, esa ruta será accesible desde `/users/api/`, ya que cargamos ese `Router` en `/users`. ;D

## Cross-Origin Resource Sharing (CORS)

Por razones de seguridad, los navegadores sólo permiten que se carguen recursos que provengan del mismo origen. Dos URL tienen el mismo origen si el protocolo , el puerto y el host son los mismos para ambos. Esto es lo que llamamos Same-Origin Policy (SOP). Esta política ya viene por default en los navegadores y controla las interacciones entre orígenes diferentes ayudando así a aislar documentos potencialmente maliciosos y reduciendo posibles ataques.

Ejemplos de URL con mismo origen:

```bash
http://e-commerce.com/admin/orders   //Mismo origen, Path diferente

http://e-commerce.com/user/me        //Mismo origen, Path diferente
```

Sin embargo, muchas veces necesitamos cargar en nuestro sitio recursos provenientes de otro origen, por ejemplo, cuando utilizamos una fuente distinta o queremos mostrar una imágen. ¿Qué pasaría si quisiéramos realizar una petición a un servidor con un dominio diferente? En ese caso, veríamos un error como este:

![CORS Blocking](/_src/assets/05-Express/cors.png)

¿Qué está pasando? Desde ‘<http://localhost:3001>’ se realizó una petición a ‘<http://localhost:3004/second-server>’ y el navegador bloqueó la solicitud por política de CORS (Cross-Origin Resource Sharing). A diferencia de la política del mismo origen (SOP) este mecanismo nos permite, mediante el uso de cabeceras HTTP adicionales, acceder a recursos desde un dominio, un protocolo o un puerto diferente al del documento que lo generó. Este tipo de solicitudes se denominan de origen cruzado.

Ejemplos de URL con distinto origen:

```js
https://e-commerce.com/user/me      //Diferente protocolo

http://api.e-commerce.com/user/me   //Diferente host
```

### Access-Control-Allow-Origin

Para habilitar una petición de origen cruzado debemos incluir una cabecera denominada Access-Control-Allow-Origin en la respuesta de la petición, donde debe indicarse el dominio al que se le quiere dar permiso. Es decir, en nuestro ejemplo el servidor que está utilizando el puerto 3004 debería incluir en su respuesta  a la solicitud de localhost.3001 un header Access-Control-Allow-Origin donde se indica el dominio al que se le quiere dar permiso.

```js
Access-Control-Allow-Origin: 'http://localhost:3001'
```

De esta forma, el navegador comprobará dichas cabeceras y si coinciden con el dominio de origen que realizó la petición, ésta se permitirá. En el ejemplo anterior, la cabecera tiene el valor <http://localhost:3001>, pero en algunos casos el valor puede ser un "*". El asterisco indica que se permiten peticiones de origen cruzado a cualquier dominio.

![Headers](/_src/assets/05-Express/headers.png)

Además de ese, existen otros cors headers. Algunos de ellos son:

- Access-Control-Allow-Origin: ¿qué origen está permitido?
- Access-Control-Allow-Credentials: ¿también se aceptan solicitudes cuando el modo de credenciales es include?
- Access-Control-Allow-Headers: ¿qué cabeceras pueden utilizarse?
- Access-Control-Allow-Methods: ¿qué métodos de petición HTTP están permitidos?
- Access-Control-Expose-Headers: ¿qué cabeceras pueden mostrarse?
- Access-Control-Max-Age: ¿cuándo pierde su validez la solicitud preflight?
- Access-Control-Request-Headers: ¿qué header HTTP se indica en la solicitud preflight?
- Access-Control-Request-Method: ¿qué método de petición HTTP se indica en la solicitud preflight?

Otra forma que tenemos para habilitar las solicitudes CORS pueden ser librerías que manejen las autorizaciones por nosotros a modo de middleware. Por ejemplo, el módulo [cors](https://www.npmjs.com/package/cors).

## Homework

Completa la tarea descrita en el archivo [README](https://github.com/soyHenry/FT-M3/tree/master/05-Express/homework/)
